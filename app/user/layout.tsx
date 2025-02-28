"use client";

import { Call } from "@/components/call";
import { peerDataConnection, peerMediaCall, useWebrtcStore } from "@/store/webrtc.store";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Id, Slide, toast, ToastContainer } from "react-toastify";

type adminDataType = {
  href?: string;
  message?: string;
  call?: { call: boolean; href: string };
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const peerData = useWebrtcStore((store) => store.peerData);
  const toast_err = useRef<Id>(null);
  const [call, setCall] = useState<boolean>(false);
  // const call = useRef<boolean>(false);
  const router = useRouter();
  const [callValidation, setCallValidation] = useState<boolean>(false);
  const adminData = useRef<adminDataType | null>(null);
  console.log("call :" + call);
  console.log("callValidation : " + callValidation);
  console.log(adminData.current);

  if (callValidation) {
    peerMediaCall();
    // setCall(false);
    setCall(false);
    setCallValidation(false);
    // if (adminData.current?.call?.href) router.push("/user/" + adminData.current.call.href);
  }

  useEffect(() => {
    console.log(peerData);
    console.log(peerData?.open);
    if (!peerData) peerDataConnection();

    peerData?.on("data", (data) => {
      console.log(data);
      adminData.current = data as adminDataType;
      if (adminData.current.call) {
        router.push("/user/" + adminData.current.call.href);
        setCall(true);
      }
      if (adminData.current.href) router.push("/user/" + adminData.current.href);
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
      toast.success("Connection ok !", { className: "rounded-lg bg-accent text-sm" });
    });
    return () => {
      peerData?.close();
    };
  }, [peerData, router]);

  return (
    <>
      {call && <Call setCallValidation={setCallValidation} />}
      <main>{children}</main>
      <ToastContainer draggable transition={Slide} position="top-center" theme="dark" className="mt-1 w-full gap-2 px-8" />
    </>
  );
}
