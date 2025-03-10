"use client";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";
import { changeFacingMode, flash, peerMediaCall, useWebrtcUserStore } from "@/store/webrtc.user.store";
import { useEffect, useRef, useTransition } from "react";

export default function Home() {
  const myVideoRef = useRef<HTMLVideoElement>(null);
  const peerData = useWebrtcUserStore((store) => store.peerData);
  const stream = useWebrtcUserStore((store) => store.stream);
  const [pending, startTransition] = useTransition();
  useEffect(() => {
    if (myVideoRef.current) {
      myVideoRef.current.srcObject = stream;
    }
    startTransition(() => peerMediaCall({ constraintsNb: 0 }));
    return () => {
      stream?.getTracks().forEach((track) => {
        track.stop();
      });
    };
  }, [stream, peerData]);

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-7">
      <Button
        onClick={() => {
          changeFacingMode("user");
          peerMediaCall({ constraintsNb: 0 });
        }}
      >
        CHANGE MODE USER
      </Button>
      <Button
        onClick={() => {
          changeFacingMode("environment");
          peerMediaCall({ constraintsNb: 1 });
        }}
      >
        CHANGE MODE ENVIR
      </Button>
      <Button
        onClick={() => {
          flash(true);
        }}
      >
        FLASH
      </Button>
      <Button
        onClick={() => {
          flash(false);
        }}
      >
        PAS FLASH
      </Button>
      {pending && <Spinner size="xlarge"></Spinner>}
      <video className={cn("size-full", { hidden: pending })} playsInline ref={myVideoRef} autoPlay />
    </div>
  );
}
