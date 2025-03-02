"use client";

import { Call } from "@/components/call";
import { peerDataConnection, peerMediaCall, setHref, useWebrtcStore } from "@/store/webrtc.store";
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
  const href = useWebrtcStore((store) => store.href);
  const toast_err = useRef<Id>(null);
  const [call, setCall] = useState<boolean>(false);
  // const call = useRef<boolean>(false);
  const router = useRouter();
  const [callValidation, setCallValidation] = useState<boolean>(false);
  // const adminData = useRef<adminDataType | null>(null);
  console.log("call :" + call);
  console.log("callValidation : " + callValidation);
  // console.log(adminData.current);

  useEffect(() => {
    console.log("TAMERE1");
    if (href) {
      router.push("/user/" + href);
      console.log("TAMERE1");
    }
    return () => {
      console.log("TAMERE3");
      // setHref(null);
    };
  }, [href, router]);

  if (callValidation) {
    peerMediaCall();
    setCall((p) => !p);
    setCallValidation((p) => !p);
    // if (adminData.current?.call?.href) router.push("/user/" + adminData.current.call.href);
  }

  useEffect(() => {
    console.log(peerData);
    console.log(peerData?.open);
    if (!peerData) peerDataConnection();
    peerData?.on("open", () => {
      peerData?.send("Hello! I'm client n°" + "jesais pas");
      if (toast_err.current) toast.dismiss(toast_err.current);
      toast.success("Connection ok !", { className: "rounded-lg bg-accent text-sm" });

      peerData?.on("data", (data) => {
        console.log(data);
        const toto = data as adminDataType;
        // adminData.current = data as adminDataType;
        // if (adminData.current.call) {
        //   router.push("/user/" + adminData.current.call.href);
        //   setCall(true);
        // }
        // if (adminData.current.href) router.push("/user/" + adminData.current.href);
        if (toto.href) setHref(toto.href);
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
