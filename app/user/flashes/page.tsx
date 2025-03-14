"use client";

import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";
import { useMessUserStore } from "@/store/mess.user.store";
import { flash, peerMediaCall, useWebrtcUserStore } from "@/store/webrtc.user.store";
import { useEffect, useRef, useState, useTransition } from "react";
import { useTimeout } from "usehooks-ts";

export default function Home() {
  const myVideoRef = useRef<HTMLVideoElement>(null);
  const peerData = useWebrtcUserStore((store) => store.peerData);
  const stream = useWebrtcUserStore((store) => store.stream);
  const flashes_trig = useMessUserStore((store) => store.flashes_trig);
  // const flashes_time = useMessUserStore((store) => store.flashes_time);
  const [pending, startTransition] = useTransition();
  const [invert, setInvert] = useState(false);
  const [flashLoc, setFlashLoc] = useState(false);

  useTimeout(() => setInvert(false), invert ? 100 : null);
  useTimeout(
    () => {
      flash(false);
      setFlashLoc(false);
    },
    flashLoc ? 30 : null
  );

  useEffect(() => {
    if (myVideoRef.current) {
      myVideoRef.current.srcObject = stream;
    }
    console.log("TODO : FAIRE MIEUX ! 1");
    startTransition(() => peerMediaCall({ constraintsNb: 1 }));
    return () => {
      console.log("TODO : FAIRE MIEUX ! 2");
      stream?.getTracks().forEach((track) => {
        track.stop();
      });
    };
  }, [stream, peerData]);

  useEffect(() => {
    if (flashes_trig !== 0) {
      setInvert(true);
      setFlashLoc(true);
      flash(true);
    }
  }, [flashes_trig]);

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-7">
      {pending && <Spinner size="xlarge"></Spinner>}
      <video
        className={cn("hue-rotate-180 brightness-125 contrast-200 size-full", { hidden: pending, invert: invert })}
        playsInline
        ref={myVideoRef}
        autoPlay
        muted
      />
    </div>
  );
}
