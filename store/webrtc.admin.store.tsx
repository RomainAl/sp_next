import type { DataConnection, MediaConnection } from "peerjs";
import Peer from "peerjs";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { setInstaCurrentVid } from "./insta.admin.store";
import { useMessAdminStore } from "./mess.admin.store";
import { admin2userDataType, user2adminDataType, useToastStore } from "./shared.store";

type userType = {
  id: string;
  name: string;
  peerData: DataConnection | null;
  peerMedia: MediaConnection | null;
  stream: MediaStream | null;
};

export type webrtcBiterateType = {
  id: string;
  bitrate: number;
  bit: number;
  time: number;
};

type webrtcAdminStoreType = {
  peer: Peer | null;
  userS: userType[];
  bitrates: webrtcBiterateType[];
};

export const useWebrtcAdminStore = create(
  devtools<webrtcAdminStoreType>(() => ({
    peer: null,
    userS: [],
    bitrates: [],
  }))
);

export const createPeer = () => {
  // PEER :
  // if (!util.supports.data) throw new Error("E_01");
  // if (!util.supports.audioVideo) throw new Error("E_02");
  let peer = useWebrtcAdminStore.getState().peer;
  if (!peer) {
    peer = new Peer("admin", {
      host: "192.168.10.2",
      port: 443,
      path: "/socket",
      debug: 2,
      key: "smartphonics",
    });
  }

  // PEER DATA :
  peer.on("open", (id) => {
    console.log(id + " - my peer is open");
    peer.on("connection", (peerData) => {
      console.log(peerData.peer + " - peerData is conn");
      peerData.on("open", () => {
        console.log(peerData.peer + " - peerData is open");

        peerData.on("data", (data) => {
          console.log(peerData.peer + " - sent mess :");
          console.log(data);
          const userData = data as user2adminDataType;
          if (userData.name) {
            console.log("TODO : PEER MOCHE !");
            peerData.send({ goto: useMessAdminStore.getState().goto });
            const user_ = useWebrtcAdminStore.getState().userS.find((u) => u.id === peerData.peer);
            const user: userType = {
              id: peerData.peer,
              name: userData.name,
              peerData: peerData,
              peerMedia: user_?.peerMedia ?? null,
              stream: user_?.stream ?? null,
            };
            const B: webrtcBiterateType = { id: peerData.peer, bitrate: 0, bit: 0, time: Date.now() };
            useWebrtcAdminStore.setState((state) => ({
              userS: [...state.userS.filter((p) => p.id !== peerData.peer), user],
              bitrates: [...state.bitrates.filter((p) => p.id !== peerData.peer), B],
            }));
          }
          if (userData.toast) {
            useToastStore.setState({ title: userData.toast.title, message: "" });
          }
          if (userData.currentInstaVid) {
            setInstaCurrentVid(userData.currentInstaVid);
          }
        });

        peerData.on("close", () => {
          console.log(peerData.peer + " - peerData is closed");
          useWebrtcAdminStore.setState((state) => ({
            userS: state.userS.filter((p) => p.id !== peerData.peer),
            bitrate: state.bitrates.filter((p) => p.id !== peerData.peer),
          }));
        });

        peerData.on("error", (e) => {
          console.log(peerData.peer + " - peerData is closed (error) : ");
          console.log(e.message);
          useWebrtcAdminStore.setState((state) => ({
            userS: state.userS.filter((p) => p.id !== peerData.peer),
            bitrate: state.bitrates.filter((p) => p.id !== peerData.peer),
          }));
        });
      });
    });

    // PEER MEDIA:
    peer.on("call", (peerMedia) => {
      peerMedia.answer();
      peerMedia.on("stream", (stream) => {
        console.log(peerMedia.peer + " - is streaming");
        console.log("TODO : PEER MOCHE !");
        const user_ = useWebrtcAdminStore.getState().userS.find((u) => u.id === peerMedia.peer);
        const user: userType = {
          id: peerMedia.peer,
          name: user_?.name ?? "",
          peerData: user_?.peerData ?? null,
          peerMedia: peerMedia,
          stream: stream,
        };
        useWebrtcAdminStore.setState((state) => ({ userS: [...state.userS.filter((p) => p.id !== peerMedia.peer), user] }));
      });

      peerMedia.on("close", () => {
        console.log(peerMedia.peer + " - peerMedia is closed");
        // useWebrtcAdminStore.setState((state) => ({
        //   userS: [...state.userS.filter((p) => p.id !== peerMedia.peer)],
        // }));
        const user_ = useWebrtcAdminStore.getState().userS.find((u) => u.id === peerMedia.peer);
        const user: userType = {
          id: peerMedia.peer,
          name: user_?.name ?? "",
          peerData: user_?.peerData ?? null,
          peerMedia: null,
          stream: null,
        };
        useWebrtcAdminStore.setState((state) => ({ userS: [...state.userS.filter((p) => p.id !== peerMedia.peer), user] }));
      });

      peerMedia.on("error", (e) => {
        console.log(peerMedia.peer + " - peerMedia is closed (error) :");
        console.log(e.message);
        // useWebrtcAdminStore.setState((state) => ({
        //   userS: [...state.userS.filter((p) => p.id !== peerMedia.peer)],
        // }));
        const user_ = useWebrtcAdminStore.getState().userS.find((u) => u.id === peerMedia.peer);
        const user: userType = {
          id: peerMedia.peer,
          name: user_?.name ?? "",
          peerData: user_?.peerData ?? null,
          peerMedia: null,
          stream: null,
        };
        useWebrtcAdminStore.setState((state) => ({ userS: [...state.userS.filter((p) => p.id !== peerMedia.peer), user] }));
      });
    });
  });

  useWebrtcAdminStore.setState({ peer });
};

export const setBitrates = ({ id, bitrate, bit, time }: webrtcBiterateType) => {
  const bitrateUpdate: webrtcBiterateType = { id, bitrate, bit, time };
  useWebrtcAdminStore.setState((state) => ({ bitrates: [...state.bitrates.filter((p) => p.id !== id), bitrateUpdate] }));
};

export const sendMess = (mess: admin2userDataType) => {
  const userS = useWebrtcAdminStore.getState().userS;
  userS.forEach((user) => {
    if (user.peerData?.open) user.peerData.send(mess);
  });
};
