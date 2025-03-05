"use client";

import { AudioMeter } from "@/components/audioMeter";
import { useWebrtcAdminStore } from "@/store/webrtc.admin.store";
import { useEffect, useRef } from "react";

export default function Home() {
  const callingVideoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const userS = useWebrtcAdminStore((store) => store.userS);
  const handleCall = () => {
    console.log(userS);
  };

  const handleData = () => {
    userS.forEach((user) => {
      if (user.peerData?.open) user.peerData?.send({ goto: "instru?n=0" });
      if (user.peerData?.open) user.peerData?.send({ getStream: { call: true, goto: "/facestime" } });
    });
  };

  useEffect(() => {
    userS.forEach((user, i) => {
      if (callingVideoRefs.current && callingVideoRefs.current[i]) {
        callingVideoRefs.current[i].srcObject = user.stream;
        user.stream?.getTracks().forEach((t) => {
          console.log(t.kind);
        });
      }
    });
  }, [userS]);

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <button onClick={handleCall}>call</button>
      <button onClick={handleData}>data</button>
      <div className="flex size-full flex-wrap justify-evenly gap-4">
        {userS.map((user, i) => (
          <div key={user.id} className=" flex w-1/3 flex-col items-center gap-4 rounded-lg border border-orange-400">
            <p>{user.name}</p>
            <video
              ref={(input) => {
                callingVideoRefs.current[i] = input;
              }}
              className="w-auto"
              playsInline
              autoPlay
            />
            <div className="aspect-square w-full">
              <AudioMeter stream={user.stream} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
