"use client";

import { SoundwaveCanvas } from "@/components/soundwaveCanvas";
import { Slider } from "@/components/ui/slider";
import { useAudioUserStore } from "@/store/audio.user.store";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useWindowSize } from "usehooks-ts";

export default function Home() {
  const searchParams = useSearchParams();
  const audioContext = useAudioUserStore((store) => store.audioContext);
  const intruNb: number = searchParams.has("n") ? Number(searchParams.get("n")) : 0;
  const instru = useAudioUserStore((store) => store.instrus[intruNb]);
  const analyser = useAudioUserStore((store) => store.audioAnalyser);

  const { width = 0 } = useWindowSize();
  const sliderValChange = (sliderName: string, value: number) => {
    const param = instru?.parametersById.get(sliderName);
    if (param) {
      param.value = value;
    }
  };

  useEffect(() => {
    if (!audioContext || !instru || !analyser) {
      return;
    }
    analyser.disconnect();
    instru.node.connect(analyser);
    analyser.connect(audioContext.destination);
    audioContext.resume();
    return () => {
      analyser?.disconnect();
      instru?.node.disconnect();
      audioContext?.suspend();
    };
  }, [audioContext, instru, analyser]);

  return (
    <>
      <div className="flex h-screen w-screen flex-col items-center justify-center gap-7">
        <p>Instru n°{intruNb}</p>
        <div className="flex w-2/3 flex-col rounded-full border border-primary/50 bg-background shadow transition-colors">
          <SoundwaveCanvas width={width} height={width / 5} analyser={analyser} />
        </div>
        <div className="flex w-2/3 flex-col gap-4">
          {instru?.parameters.map((param) => (
            <div key={param.name} className="flex flex-col items-center justify-center gap-2">
              <h2>{param.name}</h2>
              <Slider
                min={param.min}
                max={param.max}
                step={(param.max - param.min) / 10}
                defaultValue={[param.initialValue]}
                onValueChange={(value) => sliderValChange(param.name, value[0])}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
