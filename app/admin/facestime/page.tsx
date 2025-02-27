"use client";

import { peersDataConnection, useWebrtcStore } from "@/store/webrtc.store";
import { useEffect, useRef } from "react";

export default function Home() {
  const callingVideoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  // const callingVideoRef = useRef<HTMLVideoElement>(null);
  const peersData = useWebrtcStore((store) => store.peersData);
  const peersMedia = useWebrtcStore((store) => store.peersMedia);
  const handleCall = () => {};

  const handleData = () => {
    console.log(peersData);
    console.log(peersMedia);
    peersDataConnection();
    peersData?.forEach((peerData) => {
      if (peerData.open) peerData.send({ href: "/instru?n=0" });
    });
  };
  useEffect(() => {
    console.log("USE EFFECT RENDDER");
    peersMedia.forEach((peerMedia, i) =>
      peerMedia.on("stream", (stream) => {
        console.log("STREEAMM ENTER !");
        console.log(stream);
        if (callingVideoRefs.current && callingVideoRefs.current[i]) {
          callingVideoRefs.current[i].srcObject = stream;
        }
      })
    );
  }, [peersMedia]);

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <button onClick={handleCall}>call</button>
      <button onClick={handleData}>data</button>
      <div className="flex size-full flex-wrap justify-evenly gap-4">
        {peersMedia.map((peerMedia, i) => (
          <div key={peerMedia.peer} className=" flex w-1/3 flex-col items-center gap-4 rounded-lg border border-orange-400">
            <p>{peerMedia.peer}</p>
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
