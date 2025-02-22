"use client";

import { Button } from "@/components/ui/button";
import { setUserAudio, useUserAudioStore } from "@/store/useraudio.store";
import NoSleep from "@zakj/no-sleep";
import { LoaderCircle } from "lucide-react";
import { useTransition } from "react";

export default function Home() {
  const audioContext = useUserAudioStore((store) => store.audioContext);
  const [loading, startTransition] = useTransition();
  const noSleep = new NoSleep();

  const loadSPData = async () => {
    noSleep.enable(); // TOTO
    startTransition(async () => {
      await setUserAudio();
    });
  };
  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen gap-4">
      <p>tests smart.phonics</p>
      {!audioContext && (
        <Button onClick={loadSPData}>LOAD{loading && <LoaderCircle size={16} strokeWidth={2.25} className="animation-spin" />}</Button>
      )}
    </div>
  );
}
