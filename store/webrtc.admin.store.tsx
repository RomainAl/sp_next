import type { DataConnection, MediaConnection } from "peerjs";
import Peer from "peerjs";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { useMessAdminStore } from "./mess.admin.store";

type userType = { id: string; name: string; peerData: DataConnection | null; peerMedia: MediaConnection | null };

type webrtcAdminStoreType = {
  peer: Peer | null;
  userS: userType[];
};

type userDataType = {
  href?: string;
  message?: string;
  call?: { call: boolean; href: string };
  name?: string;
};

export const useWebrtcAdminStore = create(
  devtools<webrtcAdminStoreType>(() => ({
    peer: null,
    userS: [],
  }))
);

export const createPeer = async () => {
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
          const userData = data as userDataType;
          if (userData.name) {
            console.log("TODO : PEER MOCHE !");
            peerData.send({ goto: useMessAdminStore.getState().currentPage });
            const user_ = useWebrtcAdminStore.getState().userS.find((u) => u.id === peerData.peer);
            const user: userType = { id: peerData.peer, name: userData.name, peerData: peerData, peerMedia: user_?.peerMedia ?? null };
            useWebrtcAdminStore.setState((state) => ({
              userS: [...state.userS.filter((p) => p.id !== peerData.peer), user],
            }));
          }
        });
        peerData.on("close", () => {
          console.log(peerData.peer + " - peerData is closed");
          useWebrtcAdminStore.setState((state) => ({
            userS: state.userS.filter((p) => p.id !== peerData.peer),
          }));
        });
        peerData.on("error", (e) => {
          console.log(peerData.peer + " - peerData is closed (error) : ");
          console.log(e.message);
          useWebrtcAdminStore.setState((state) => ({
            userS: state.userS.filter((p) => p.id !== peerData.peer),
          }));
        });
      });
    });

    // PEER MEDIA:
    peer.on("call", (peerMedia) => {
      peerMedia.answer();
      peerMedia.on("stream", () => {
        console.log(peerMedia.peer + " - is streaming");
        console.log("TODO : PEER MOCHE !");
        const user_ = useWebrtcAdminStore.getState().userS.find((u) => u.id === peerMedia.peer);
        const user: userType = { id: peerMedia.peer, name: user_?.name ?? "", peerData: user_?.peerData ?? null, peerMedia: peerMedia };
        useWebrtcAdminStore.setState((state) => ({ userS: [...state.userS.filter((p) => p.id !== peerMedia.peer), user] }));
      });
      peerMedia.on("close", () => {
        console.log(peerMedia.peer + " - peerMedia is closed");
        useWebrtcAdminStore.setState((state) => ({
          userS: [...state.userS.filter((p) => p.id !== peerMedia.peer)],
        }));
      });
      peerMedia.on("error", (e) => {
        console.log(peerMedia.peer + " - peerMedia is closed (error) :");
        console.log(e.message);
        useWebrtcAdminStore.setState((state) => ({
          userS: [...state.userS.filter((p) => p.id !== peerMedia.peer)],
        }));
      });
    });
  });

  useWebrtcAdminStore.setState({ peer });
};
