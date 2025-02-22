"use client";

import SoundwaveCanvas from "@/components/soundwaveCanvas";
import { Slider } from "@/components/ui/slider";
import { useUserAudioStore } from "@/store/useraudio.store";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useWindowSize } from "usehooks-ts";

export default function Home() {
  const searchParams = useSearchParams();
  const audioContext = useUserAudioStore((store) => store.audioContext);
  const intruNb: number = searchParams.has("n") ? Number(searchParams.get("n")) : 0;
  const instrus = useUserAudioStore((store) => store.instrus);
  const instru = instrus[intruNb];
  const analyser = useUserAudioStore((store) => store.audioAnalyser);

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
    audioContext.resume();
    instrus.map((instru) => instru.node.disconnect());
    instru.node.connect(analyser);
    analyser.connect(audioContext.destination);
    return () => {
      analyser.disconnect();
      instrus.map((instru) => instru.node.disconnect());
      audioContext.suspend();
    };
  }, [audioContext, instrus, instru, analyser]);

  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen w-screen gap-7">
        {/* <canvas ref={canvasRef} className="absolute top-0 h-full w-full left-0 z-0" width={width} height={height}></canvas> */}
        <p>Instru n°{intruNb}</p>
        <div className="w-2/3 rounded-full border border-primary/50 bg-background shadow transition-colors">
          <SoundwaveCanvas width={width} height={width / 5} />
        </div>
        <div className="flex flex-col w-2/3 gap-4">
          {instru?.parameters.map((param) => (
            <div key={param.name} className="flex flex-col gap-2 justify-center items-center">
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
