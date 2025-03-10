"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { sendMess, useWebrtcAdminStore } from "@/store/webrtc.admin.store";
import { useEffect, useRef } from "react";

export default function Home() {
  const callingVideoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const userS = useWebrtcAdminStore((store) => store.userS);

  useEffect(() => {
    userS.forEach((user, i) => {
      if (callingVideoRefs.current && callingVideoRefs.current[i]) {
        callingVideoRefs.current[i].srcObject = user.stream;
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
        <div key={user.id} className={cn("flex w-1/3 gap-5 p-0")}>
          <Card className="m-0 size-fit p-0">
            <CardHeader className="m-0 items-center p-0">
              <CardTitle className="m-0 p-0 text-xs">{user.name}</CardTitle>
            </CardHeader>
            <CardContent className="m-0 justify-center p-0">
              <video
                ref={(input) => {
                  callingVideoRefs.current[i] = input;
                }}
                className="size-full rounded-lg brightness-125 contrast-100 grayscale"
                playsInline
                autoPlay
              />
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
}
