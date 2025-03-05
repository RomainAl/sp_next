"use client";

import { Button } from "@/components/ui/button";
import { useAudioUserStore } from "@/store/audio.user.store";
import { useEffect } from "react";

export default function Home() {
  const audioContext = useAudioUserStore((store) => store.audioContext);
  const audioAnalyser = useAudioUserStore((store) => store.audioAnalyser);
  console.log("TEST RENDERED");
  useEffect(() => {
    if (!audioContext) {
      return;
    }
    audioAnalyser?.connect(audioContext.destination);
    audioContext.resume();
    console.log("resume");
    return () => {
      audioContext?.suspend();
      audioAnalyser?.disconnect();
      console.log("suspend");
    };
  }, [audioContext, audioAnalyser]);

  return (
    <>
      <div className="flex h-screen w-screen flex-col items-center justify-center gap-7">
        <Button>RIEN</Button>
      </div>
    </>
  );
}
