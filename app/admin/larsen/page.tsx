"use client";

import { cn } from "@/lib/utils";
import { useWebrtcAdminStore } from "@/store/webrtc.admin.store";
import { useEffect, useRef } from "react";

export default function Home() {
  const callingAudioRefs = useRef<(HTMLAudioElement | null)[]>([]);
  const userS = useWebrtcAdminStore((store) => store.userS);

  useEffect(() => {
    userS.forEach((user, i) => {
      if (callingAudioRefs.current && callingAudioRefs.current[i]) {
        if (user.stream && user.stream.active) callingAudioRefs.current[i].srcObject = user.stream;
      }
    });
  }, [userS]);

  return (
    <div className="flex h-screen w-screen flex-wrap items-start text-center">
      {userS.map((user, i) => (
        <div key={user.id} className={cn("flex w-1/10 gap-2 p-0")}>
          <audio
            ref={(input) => {
              callingAudioRefs.current[i] = input;
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
