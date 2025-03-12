"use client";

import { SoundwaveCanvas } from "@/components/soundwaveCanvas";
import { useAudioUserStore } from "@/store/audio.user.store";
import { useMessUserStore } from "@/store/mess.user.store";
import { setSoundVisualizerParams } from "@/store/shared.store";
import { useEffect, useRef } from "react";
import { useWindowSize } from "usehooks-ts";

export default function Home() {
  const audioContext = useAudioUserStore((store) => store.audioContext);
  const analyser = useAudioUserStore((store) => store.audioAnalyser);
  const gain = useAudioUserStore((store) => store.gain);
  const nikedal = useAudioUserStore((store) => store.nikedal);
  const { width = 0, height = 0 } = useWindowSize();
  const refAudio = useRef<HTMLAudioElement>(null);
  const gain_value = useMessUserStore((store) => store.gain);

  useEffect(() => {
    if (gain && gain_value) gain.gain.value = gain_value;
  }, [gain_value, gain, audioContext]);

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
    if (audioContext && analyser && gain && nikedal) {
      analyser.disconnect();
      gain.disconnect();
      nikedal.node.connect(gain).connect(analyser).connect(audioContext.destination);
      if (refAudio.current) {
        refAudio.current.muted = false;
        const source = audioContext.createMediaElementSource(refAudio.current);
        source.connect(gain);
        audioContext.resume();
      }
    }
    return () => {
      analyser?.disconnect();
      audioContext?.suspend();
    };
  }, [audioContext, analyser, gain, nikedal]);

  return (
    <>
      <div className="flex h-screen w-screen flex-col items-center justify-center gap-7">
        {/* <audio className="hidden" src="/nikedal.mp3" ref={refAudio} autoPlay={true} controls={false} loop muted></audio> */}
        <SoundwaveCanvas
          onClick={() => {
            refAudio?.current?.play();
          }}
          width={width}
          height={height}
          analyser={analyser}
        />
      </div>
    </>
  );
}
