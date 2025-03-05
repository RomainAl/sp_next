import { nanoid } from "nanoid";
import type { DataConnection, MediaConnection } from "peerjs";
import Peer from "peerjs";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { useAudioUserStore } from "./audio.user.store";
import { admin2userDataType, user2adminDataType } from "./mess.type.store";
import { useMessUserStore } from "./mess.user.store";

type webrtcUserStoreType = {
  username: string;
  id: string;
  peer: Peer | null;
  peerData: DataConnection | null;
  peerMedia: MediaConnection | null;
  stream: MediaStream | null;
  mediaconstraints: MediaStreamConstraints[];
};

// WEBRTC :
const randomId = "ID" + nanoid(6) + String(Date.now());
const adminId = "admin";

export const useWebrtcUserStore = create(
  devtools<webrtcUserStoreType>(() => ({
    username: "Elon",
    id: randomId,
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
  // if (!util.supports.data) throw new Error("E_01");
  // if (!util.supports.audioVideo) throw new Error("E_02");

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
    const peerData_ = useWebrtcUserStore.getState().peerData;
    if (!peerData_ || !peerData_.open) {
      const peerData = peer.connect(adminId);
      peerData.on("open", () => {
        console.log(peerData.peer + " - peerData is open");

        peerData.send({ conn: "Connected !", name: useWebrtcUserStore.getState().username });

        peerData.on("data", (data) => {
          console.log(peerData.peer + " - sent mess :");
          console.log(data);
          const mess = data as admin2userDataType;
          if (mess.goto) {
            useMessUserStore.setState({ goto: mess.goto });
          }
          if (mess.getStream) {
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

export const peerSound2peerMedia = async () => {
  const peerMedia = useWebrtcUserStore.getState().peerMedia;
  const peerSound = useAudioUserStore.getState().peerSound;
  if (peerSound) {
    if (peerMedia && peerMedia.open) {
      const audioSender = peerMedia.peerConnection.getSenders().find((s) => s.track?.kind === "audio");
      if (audioSender) audioSender.replaceTrack(peerSound.stream.getTracks()[0]);
    } else {
      console.log("TODO : PEERJS CALL DONT LIKE peerSound !?");
      await peerMediaCall();
      peerSound2peerMedia();
      // const peer = useWebrtcUserStore.getState().peer;
      // const peerMedia = peer?.call(adminId, peerSound); // TODO GLOUPS PEERJS !??!
      // useWebrtcUserStore.setState({ peerMedia });
    }
  }
};

export const setStream = async () => {
  const constraints = useWebrtcUserStore.getState().mediaconstraints;
  navigator.mediaDevices.getUserMedia(constraints[0]).then((stream) => {
    useWebrtcUserStore.setState({ stream });
  });
};

export const sendMess = (mess: user2adminDataType) => {
  const peerData = useWebrtcUserStore.getState().peerData;
  if (peerData?.open) peerData?.send(mess);
};
