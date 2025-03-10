"use client";

import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";
import { initFlashTrig, useMessUserStore } from "@/store/mess.user.store";
import { flash, peerMediaCall, useWebrtcUserStore } from "@/store/webrtc.user.store";
import { useEffect, useRef, useTransition } from "react";

export default function Home() {
  const myVideoRef = useRef<HTMLVideoElement>(null);
  const peerData = useWebrtcUserStore((store) => store.peerData);
  const stream = useWebrtcUserStore((store) => store.stream);
  const flashes_trig = useMessUserStore((store) => store.flashes_trig);
  const flashes_time = useMessUserStore((store) => store.flashes_time);
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    if (myVideoRef.current) {
      myVideoRef.current.srcObject = stream;
    }
    startTransition(() => peerMediaCall({ constraintsNb: 1 }));
    return () => {
      stream?.getTracks().forEach((track) => {
        track.stop();
      });
    };
  }, [stream, peerData]);

  useEffect(() => {
    if (flashes_trig !== 0) {
      flash(true);
      console.log("flashing");
      const flashTimeout = setTimeout(() => {
        flash(false);
        console.log("stop flashing");
      }, flashes_time);
      return () => {
        clearInterval(flashTimeout);
        initFlashTrig();
      };
    }
  }, [flashes_trig, flashes_time]);

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-7">
      {pending && <Spinner size="xlarge"></Spinner>}
      <video className={cn("grayscale brightness-125 contrast-100 size-full", { hidden: pending })} playsInline ref={myVideoRef} autoPlay />
    </div>
  );
}
