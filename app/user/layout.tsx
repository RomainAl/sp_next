"use client";

import { peerDataConnection, useWebrtcStore } from "@/store/webrtc.store";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { Id, Slide, toast, ToastContainer } from "react-toastify";

type adminData = {
  href?: string;
  message?: string;
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const peerData = useWebrtcStore((store) => store.peerData);
  const toast_err = useRef<Id>(null);
  const router = useRouter();

  useEffect(() => {
    peerData?.on("data", (data) => {
      const toto = data as adminData;
      if (toto.href) router.push("/user/" + toto.href);
    });

    const reconnection = (e: string) => {
      const mess = "Désolé, perte de connection ! (Error : E_03 - " + e + ")";
      console.log(mess);
      toast_err.current = toast.error(mess, {
        className: "rounded-lg bg-destructive text-sm",
        autoClose: false,
      });
      try {
        peerDataConnection();
      } catch {
        router.push("/");
      }
    };

    peerData?.on("close", () => {
      reconnection("close");
    });
    peerData?.on("error", (e) => {
      console.log(e);
      reconnection("error");
    });

    peerData?.on("open", () => {
      if (toast_err.current) toast.dismiss(toast_err.current);
      toast.success("Reconnection ok !", { className: "rounded-lg bg-accent text-sm" });
    });
  }, [peerData, router]);

  return (
    <>
      <main>{children}</main>
      <ToastContainer draggable transition={Slide} position="top-center" theme="dark" className="mt-1 w-full gap-2 px-8" />
    </>
  );
}
