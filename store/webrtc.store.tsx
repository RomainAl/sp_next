import { nanoid } from "nanoid";
import type { DataConnection, MediaConnection } from "peerjs";
import Peer, { util } from "peerjs";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

type webrtcStoreType = {
  username: string;
  id: string;
  peer: Peer | null;
  peerData: DataConnection | null;
  peerMedia: MediaConnection | null;
  peersData: DataConnection[];
  peersMedia: MediaConnection[];
  stream: MediaStream | null;
  mediaconstraints: MediaStreamConstraints[];
};

const randomId = "ID_" + nanoid(6);
const adminId = "admin";

export const useWebrtcStore = create(
  devtools<webrtcStoreType>(() => ({
    username: randomId,
    id: randomId + String(Date.now()),
    // username: localStorage.getItem("username") ?? randomId,
    // id: localStorage.getItem("id") ?? randomId + String(Date.now()),
    peer: null,
    peerData: null,
    peerMedia: null,
    peersData: [],
    peersMedia: [],
    stream: null,
    mediaconstraints: [
      {
        audio: {
          noiseSuppression: true,
          echoCancellation: true,
        },
        video: {
          width: { ideal: 320 },
          height: { ideal: 180 },
          frameRate: { ideal: 10 },
          facingMode: "user",
        },
      },
      {
        audio: {
          noiseSuppression: true,
          echoCancellation: true,
        },
        video: {
          width: { ideal: 320 },
          height: { ideal: 180 },
          frameRate: { ideal: 10 },
          facingMode: "environment",
        },
      },
      {
        audio: {
          sampleRate: 44100,
          sampleSize: 16,
          noiseSuppression: false,
          echoCancellation: false,
          channelCount: 1,
          autoGainControl: true,
          volume: 1,
        },
        video: false,
      },
    ],
  }))
);

export const setUserName = (username: string) => {
  useWebrtcStore.setState({ username });
};

export const setPeer = () => {
  if (!util.supports.data) throw new Error("E_01");
  if (!util.supports.audioVideo) throw new Error("E_02");
  let peer = useWebrtcStore.getState().peer;
  if (!peer) {
    peer = new Peer(useWebrtcStore.getState().username === adminId ? adminId : useWebrtcStore.getState().id, {
      host: "192.168.10.2",
      port: 443,
      path: "/socket",
      debug: 2,
      key: "smartphonics",
    });
  }

  peer.on("open", (id) => {
    console.log("MY PEER ID IS: " + id);

    // DATA :
    if (id !== adminId) peerDataConnection();

    peer.on("connection", (peerData) => {
      peerData.on("open", () => {
        peerData.on("data", (data) => {
          console.log("Received", data);
        });
        peerData.on("close", () => {
          console.log("(ZUSTAND) CLOSE DATA FROM " + peerData.peer);
          useWebrtcStore.setState((state) => ({
            peersData: state.peersData.filter((p) => p.peer !== peerData.peer),
          }));
        });
        peerData.on("error", () => {
          console.log("(ZUSTAND) ERROR DATA FROM " + peerData.peer);
          useWebrtcStore.setState((state) => ({
            peersData: state.peersData.filter((p) => p.peer !== peerData.peer),
          }));
        });
        if (id === adminId) {
          // TODO !!!!!
          useWebrtcStore.setState((state) => ({
            peersData: [...state.peersData, peerData],
          }));
        } else {
          useWebrtcStore.setState({ peerData });
        }
      });
    });

    // MEDIA :
    peer.on("call", (peerMedia) => {
      peerMedia.answer();
      peerMedia.on("stream", () => {
        console.log("(ZUSTAND) RECEIVE STREAM FROM " + peerMedia.peer);
      });
      peerMedia.on("close", () => {
        console.log("(ZUSTAND) CLOSE STREAM FROM " + peerMedia.peer);
        useWebrtcStore.setState((state) => ({
          peersMedia: state.peersMedia.filter((p) => p.peer !== peerMedia.peer),
        }));
      });
      peerMedia.on("error", () => {
        console.log("(ZUSTAND) ERROR STREAM FROM " + peerMedia.peer);
        useWebrtcStore.setState((state) => ({
          peersMedia: state.peersMedia.filter((p) => p.peer !== peerMedia.peer),
        }));
      });

      useWebrtcStore.setState((state) => ({
        peersMedia: [...state.peersMedia, peerMedia],
      }));
    });
  });

  useWebrtcStore.setState({ peer });
};

export const peerDataConnection = () => {
  const peer = useWebrtcStore.getState().peer;
  if (!peer) setPeer();
  const peerData = peer?.connect(adminId);
  console.log(peer);
  console.log("CONNECT TO ADMIN !");
  peerData?.on("open", () => {
    peerData?.send("Hello! I'm client n°" + peer?.id);
  });
  useWebrtcStore.setState({ peerData });
};

export const peersDataConnection = async () => {
  const peer = useWebrtcStore.getState().peer;
  fetch("http://localhost:9000/socket/peerjs/peers")
    .then((r) => r.json())
    .then((ids) =>
      ids.forEach((id: string) => {
        if (id === "admin") {
          return;
        } else {
          console.log(id);
          const peerData = peer?.connect(id);
          peerData?.on("open", () => {
            peerData?.send("Hello! I'm admin n°" + peer?.id);
            useWebrtcStore.setState((state) => ({
              peersData: [...state.peersData, peerData],
            }));
          });
        }
      })
    );
}; // TODO

export const peerMediaCall = async () => {
  const stream = useWebrtcStore.getState().stream;
  if (stream != null) {
    const peer = useWebrtcStore.getState().peer;
    const peerMedia = peer?.call(adminId, stream);
    useWebrtcStore.setState({ peerMedia });
  } else {
    const constraints = useWebrtcStore.getState().mediaconstraints;
    navigator.mediaDevices.getUserMedia(constraints[0]).then((stream) => {
      useWebrtcStore.setState({ stream });
      peerMediaCall();
    });
  }
};

export const setStream = async () => {
  const constraints = useWebrtcStore.getState().mediaconstraints;
  navigator.mediaDevices.getUserMedia(constraints[0]).then((stream) => {
    useWebrtcStore.setState({ stream });
  });
};
