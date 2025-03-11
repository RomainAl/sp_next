"use client";

import { SoundwaveCanvas } from "@/components/soundwaveCanvas";
import { useAudioUserStore } from "@/store/audio.user.store";
import { setSoundVisualizerParams } from "@/store/shared.store";
import { peerMediaCall, useWebrtcUserStore } from "@/store/webrtc.user.store";
import { useEffect, useTransition } from "react";
import { useWindowSize } from "usehooks-ts";

export default function Home() {
  const audioContext = useAudioUserStore((store) => store.audioContext);
  const analyser = useAudioUserStore((store) => store.audioAnalyser);
  const { width = 0, height = 0 } = useWindowSize();
  const stream = useWebrtcUserStore((store) => store.stream);
  const [pending, startTransition] = useTransition();
  console.log(pending);

  useEffect(() => {
    setSoundVisualizerParams({
      fftSize: 512,
      rectSize: 10,
      rectSize_: 10,
      gain: 1,
      color: "white",
      smoothingTimeConstant: 1.0,
      rand: 0,
      stroke: false,
    });
  }, []);

  useEffect(() => {
    if (!audioContext || !analyser) {
      return;
    }
    if (!stream) startTransition(() => peerMediaCall({ constraintsNb: 2 }));
    analyser.disconnect();
    if (stream) {
      analyser.connect(audioContext.destination);
      const source = audioContext.createMediaStreamSource(stream);
      source.connect(analyser);
      audioContext.resume();
    }
    return () => {
      analyser?.disconnect();
      audioContext?.suspend();
      stream?.getTracks().forEach((track) => {
        track.stop();
      });
    };
  }, [audioContext, analyser, stream]);

  return (
    <>
      <div className="flex h-screen w-screen flex-col items-center justify-center gap-7">
        <SoundwaveCanvas width={width} height={height} analyser={analyser} />
      </div>
    </>
  );
}
