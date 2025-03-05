"use client";
import { SoundwaveCanvas } from "@/components/soundwaveCanvas";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useAudioUserStore } from "@/store/audio.user.store";
import { MIDIVal, MIDIValInput } from "@midival/core";
import { useEffect, useRef, useState } from "react";
import { useWindowSize } from "usehooks-ts";

export default function Home() {
  const audioContext = useAudioUserStore((store) => store.audioContext);
  const instru = useAudioUserStore((store) => store.instrus[0]);
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
    audioContext.resume();
    instru.node.connect(analyser);
    analyser.connect(audioContext.destination);
    return () => {
      analyser.disconnect();
      instru.node.disconnect();
      audioContext.suspend();
    };
  }, [audioContext, instru, analyser]);

  const ref = useRef<HTMLInputElement | null>(null);
  const [val, setVal] = useState("0");
  const connect = () => {
    MIDIVal.connect().then((access) => {
      console.log(access);
      console.log("Input Devices", access.inputs[0]);
      console.log("Output Devices", access.outputs);
      if (!access.inputs) {
        console.warn("No inputs yet");
        return;
      }
      const input = new MIDIValInput(access.inputs[0]);
      console.log(input);
      input.onAllControlChange(({ control, value }) => {
        setVal(String(value / 128));
        console.log(control + " " + value);
        // console.log(`[CC] ${ControlChangeToReadableName[control]}: ${value}`);
      });
    });
  };

  return (
    <>
      <div className="flex h-screen w-screen flex-col items-center justify-center gap-7">
        <Button onClick={() => connect()}>TEST</Button>
        <p>Instru n°{0}</p>
        <div className="flex w-2/3 flex-col rounded-full border border-primary/50 bg-background shadow transition-colors">
          <SoundwaveCanvas width={width} height={width / 5} />
          {/* <canvas ref={canvasRef} className="h-full w-full" width={width} height={width / 5}></canvas> */}
        </div>
        <input ref={ref} type="range" min="0" max="1" value={val} step="0.01" onChange={(e) => console.log(e)} />
        <div className="flex w-2/3 flex-col gap-4">
          {instru?.parameters.map((param, i) => (
            <div key={param.name} className="flex flex-col items-center justify-center gap-2">
              <h2>{param.name}</h2>
              {i === 2 ? (
                <Slider
                  min={param.min}
                  max={param.max}
                  step={(param.max - param.min) / 10}
                  defaultValue={[param.initialValue]}
                  onValueChange={(value) => sliderValChange(param.name, value[0])}
                />
              ) : (
                <Slider
                  min={param.min}
                  max={param.max}
                  step={(param.max - param.min) / 10}
                  defaultValue={[param.initialValue]}
                  onValueChange={(value) => sliderValChange(param.name, value[0])}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
