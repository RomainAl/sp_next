"use client";

import { peerMediaCall, setStream, useWebrtcStore } from "@/store/webrtc.store";
import { useEffect, useRef } from "react";

export default function Home() {
  const myVideoRef = useRef<HTMLVideoElement>(null);
  const peerData = useWebrtcStore((store) => store.peerData);
  const peerMedia = useWebrtcStore((store) => store.peerMedia);
  const stream = useWebrtcStore((store) => store.stream);

  const handleStream = async () => {
    await setStream();
  };

  const handleCall = async () => {
    await peerMediaCall();
  };

  const handleData = () => {
    peerData?.send({ maman: "tamemere3" });
    console.log(peerData);
  };

  const handleCloseData = () => {
    peerData?.send({ maman: "tamemere3" });
    peerData?.close();
  };

  const handleClose = () => {
    peerMedia?.close();
    console.log(peerMedia);
  };

  useEffect(() => {
    if (myVideoRef.current) {
      myVideoRef.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <div className="flex flex-col items-center justify-center p-12">
      <p> ID: {peerData?.peer}</p>
      <video className="w-full" playsInline ref={myVideoRef} autoPlay />
      <button onClick={handleStream}>stream</button>
      <button onClick={handleCall}>call</button>
      <button onClick={handleData}>data</button>
      <button onClick={handleClose}>Close stream</button>
      <button onClick={handleCloseData}>Close data</button>
      <button
        onClick={() => {
          console.log(peerData);
        }}
      >
        console peer
      </button>
    </div>
  );
}
