"use client";

import { SoundwaveCanvas } from "@/components/soundwaveCanvas";
import { Slider } from "@/components/ui/slider";
import { useAudioAdminStore } from "@/store/audio.admin.store";
import { setSoundVisualizerParams } from "@/store/shared.store";
import { sendMess } from "@/store/webrtc.admin.store";
import { useEffect, useRef } from "react";
import { useWindowSize } from "usehooks-ts";

export default function Home() {
  const audioContext = useAudioAdminStore((store) => store.audioContext);
  const analyser = useAudioAdminStore((store) => store.audioAnalyser);
  const { width = 0, height = 0 } = useWindowSize();
  const refAudio = useRef<HTMLAudioElement>(null);

  setSoundVisualizerParams({
    fftSize: 128,
    rectSize: 400,
    rectSize_: 400,
    gain: 1,
    color: "white",
    smoothingTimeConstant: 1.0,
    rand: 0,
    stroke: true,
  });

  useEffect(() => {
    if (!audioContext || !analyser) {
      return;
    }
    analyser.disconnect();
    if (refAudio.current) {
      refAudio.current.play();
      const source = audioContext.createMediaElementSource(refAudio.current);
      source.connect(analyser); //.connect(audioContext.destination);
      audioContext.resume();
    }
    return () => {
      analyser?.disconnect();
      audioContext?.suspend();
    };
  }, [audioContext, analyser]);

  return (
    <>
      <div className="flex h-screen w-screen flex-col items-center justify-center gap-7">
        <audio className="hidden" src="/nikedal.mp3" ref={refAudio} autoPlay={false} controls={false} loop></audio>
        <Slider className="w-1/3" min={0} max={1} step={0.01} defaultValue={[1]} onValueChange={(value) => sendMess({ gain: value[0] })} />
        <SoundwaveCanvas width={width} height={height} analyser={analyser} />
      </div>
    </>
  );
}
