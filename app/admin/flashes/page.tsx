"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { sendMess, useWebrtcAdminStore } from "@/store/webrtc.admin.store";
import { useEffect, useRef } from "react";

export default function Home() {
  const callingVideoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const userS = useWebrtcAdminStore((store) => store.userS);

  useEffect(() => {
    userS.forEach((user, i) => {
      if (callingVideoRefs.current && callingVideoRefs.current[i]) {
        if (user.stream && user.stream.active) callingVideoRefs.current[i].srcObject = user.stream;
      }
    });
  }, [userS]);

  return (
    <div className="flex h-screen w-screen flex-wrap items-start text-center">
      <Button
        onClick={() => {
          sendMess({ flashes_trig: Date.now() });
        }}
      >
        FLASH
      </Button>
      {userS.map((user, i) => (
        <div key={user.id} className={cn("flex w-1/10 gap-2 p-0")}>
          <video
            ref={(input) => {
              callingVideoRefs.current[i] = input;
            }}
            className="size-full brightness-125 contrast-200 hue-rotate-180"
            playsInline
            autoPlay
          />
        </div>
      ))}
    </div>
  );
}
