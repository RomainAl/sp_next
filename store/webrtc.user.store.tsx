import { nanoid } from "nanoid";
import type { DataConnection, MediaConnection } from "peerjs";
import Peer, { util } from "peerjs";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

type webrtcUserStoreType = {
  username: string;
  id: string;
  peer: Peer | null;
  peerData: DataConnection | null;
  peerMedia: MediaConnection | null;
  stream: MediaStream | null;
  mediaconstraints: MediaStreamConstraints[];
};

type messDataType = {
  goto?: string;
  message?: string;
  getStream?: { call: boolean; goto: string } | undefined;
};

export const useMessUserStore = create(
  devtools<messDataType>(() => ({
    goto: undefined,
    getStream: undefined,
  }))
);

export const setGoto = (goto: string) => {
  useMessUserStore.setState({ goto });
};

// WEBRTC :
const randomId = "ID" + nanoid(6);
const adminId = "admin";
export const useWebrtcUserStore = create(
  devtools<webrtcUserStoreType>(() => ({
    username: randomId,
    id: randomId + String(Date.now()),
    // username: localStorage.getItem("username") ?? randomId,
    // id: localStorage.getItem("id") ?? randomId + String(Date.now()),
    peer: null,
    peerData: null,
    peerMedia: null,
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
  useWebrtcUserStore.setState({ username });
};

export const createPeer = async () => {
  if (!util.supports.data) throw new Error("E_01");
  if (!util.supports.audioVideo) throw new Error("E_02");
  let peer = useWebrtcUserStore.getState().peer;
  if (!peer) {
    peer = new Peer(useWebrtcUserStore.getState().id, {
      host: "192.168.10.2",
      port: 443,
      path: "/socket",
      debug: 2,
      key: "smartphonics",
    });
  }

  peer.on("open", (id) => {
    console.log(id + " - my peer is open");
  });
  useWebrtcUserStore.setState({ peer });
};

export const peerDataConn = async () => {
  const peer = useWebrtcUserStore.getState().peer;
  if (!peer) createPeer();

  if (peer && peer.open) {
    const peerData = peer.connect(adminId);
    peerData.on("open", () => {
      console.log(peerData.peer + " - peerData is open");

      peerData.send({ conn: "Connected !", name: useWebrtcUserStore.getState().username });

      peerData.on("data", (data) => {
        console.log(peerData.peer + " - sent mess :");
        console.log(data);
        const mess = data as messDataType;
        console.log(mess);
        if (mess.goto) {
          useMessUserStore.setState({ goto: mess.goto });
        }
        if (mess.getStream) {
          console.log("totototot");
          useMessUserStore.setState({ getStream: mess.getStream });
        }
      });

      peerData.on("close", () => {
        console.log(peerData.peer + " - peerData is closed");
        try {
          peerDataConn();
        } catch (e) {
          console.log(e);
        }
      });

      peerData.on("error", (e) => {
        console.log(peerData.peer + " - peerData is closed (error) : ");
        console.log(e.message);
        try {
          peerDataConn();
        } catch (e) {
          console.log(e);
        }
      });
      useWebrtcUserStore.setState({ peerData });
    });
  }
};

export const peerMediaCall = async () => {
  const stream = useWebrtcUserStore.getState().stream;
  const peerMedia = useWebrtcUserStore.getState().peerMedia;
  if (stream && stream.active) {
    if (peerMedia && peerMedia.open) {
      peerMedia.peerConnection.getSenders().forEach((s, i) => s.replaceTrack(stream.getTracks()[i]));
    } else {
      const peer = useWebrtcUserStore.getState().peer;
      const peerMedia = peer?.call(adminId, stream);
      useWebrtcUserStore.setState({ peerMedia });
    }
  } else {
    const constraints = useWebrtcUserStore.getState().mediaconstraints;
    navigator.mediaDevices
      .getUserMedia(constraints[0])
      .then((stream) => {
        useWebrtcUserStore.setState({ stream });
      })
      .then(() => peerMediaCall());
  }
};

export const setStream = async () => {
  const constraints = useWebrtcUserStore.getState().mediaconstraints;
  navigator.mediaDevices.getUserMedia(constraints[0]).then((stream) => {
    useWebrtcUserStore.setState({ stream });
  });
};
