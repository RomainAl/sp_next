"use client";

import { peerMediaCall, setStream, useWebrtcUserStore } from "@/store/webrtc.user.store";
import { useEffect, useRef } from "react";

export default function Home() {
  const myVideoRef = useRef<HTMLVideoElement>(null);
  const peerData = useWebrtcUserStore((store) => store.peerData);
  const peerMedia = useWebrtcUserStore((store) => store.peerMedia);
  const stream = useWebrtcUserStore((store) => store.stream);

  const handleStream = async () => {
    await setStream();
  };

  const handleCall = async () => {
    await peerMediaCall();
  };

  const handleData = () => {
    if (peerData?.open) peerData?.send({ maman: "tamemere3" });
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
    return () => {
      stream?.getTracks().forEach((track) => {
        track.stop();
      });
    };
  }, [stream, peerData]);

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-7">
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
          console.log(peerMedia);
        }}
      >
        console peer
      </button>
    </div>
  );
}
