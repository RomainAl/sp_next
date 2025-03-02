"use client";

import { useWebrtcAdminStore } from "@/store/webrtc.admin.store";
import { useEffect, useRef } from "react";

export default function Home() {
  const callingVideoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const userS = useWebrtcAdminStore((store) => store.userS);
  const handleCall = () => {};

  const handleData = () => {
    console.log(userS);
    userS.forEach((user) => {
      // if (user.peerData?.open) user.peerData?.send({ goto: "instru?n=0" });
      if (user.peerData?.open) user.peerData?.send({ getStream: { call: true, goto: "/facestime" } });
    });
  };

  console.log("Render outside useEffect !");
  useEffect(() => {
    console.log("Render useEffect !");
    userS.forEach((user, i) =>
      user.peerMedia?.on("stream", (stream) => {
        console.log("STREEAMM ENTER !");
        console.log(stream);
        if (callingVideoRefs.current && callingVideoRefs.current[i]) {
          callingVideoRefs.current[i].srcObject = stream;
        }
      })
    );
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
          </div>
        ))}
      </div>
    </div>
  );
}
