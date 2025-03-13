"use client";

import { SoundwaveCanvas } from "@/components/soundwaveCanvas";
import { Slider } from "@/components/ui/slider";
import { useAudioUserStore } from "@/store/audio.user.store";
import { initSoundVisualizerParams, setSoundVisualizerParams } from "@/store/shared.store";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { useWindowSize } from "usehooks-ts";

export default function Home() {
  const searchParams = useSearchParams();
  const audioContext = useAudioUserStore((store) => store.audioContext);
  const intruNb: number = searchParams.has("n") ? Number(searchParams.get("n")) : 0;
  const instru = useAudioUserStore((store) => store.instrus[intruNb]);
  const analyser = useAudioUserStore((store) => store.audioAnalyser);
  const refOutports = useRef<HTMLParagraphElement>(null);
  const { width = 0 } = useWindowSize();
  const sliderValChange = (sliderName: string, value: number) => {
    const param = instru?.parametersById.get(sliderName);
    if (param) {
      param.value = value;
    }
  };
  setSoundVisualizerParams(initSoundVisualizerParams);

  useEffect(() => {
    if (!audioContext || !instru || !analyser) {
      return;
    }
    console.log("LOG INSTRU");
    analyser.disconnect();
    instru.node.connect(analyser);
    analyser.connect(audioContext.destination);
    audioContext.resume();
    if (instru.outports.length < 1) {
      return;
    } else {
      instru.messageEvent.subscribe((ev) => {
        // Ignore message events that don't belong to an outport
        if (instru.outports.findIndex((elt) => elt.tag === ev.tag) < 0) return;
        // Message events have a tag as well as a payload
        if (refOutports.current) {
          refOutports.current.innerHTML = `<strong>${ev.tag}</strong> : ${ev.payload}`;
        }
      });
    }
    return () => {
      console.log("TODO : NORMALEMENT KILL HERE");
      //   console.log("KILL INSTRU");
      //   analyser?.disconnect();
      //   instru?.node.disconnect();
      //   audioContext?.suspend();
      //   instru.messageEvent.removeAllSubscriptions();
      //   console.log(instru.node);
    };
  }, [audioContext, instru, analyser]);

  useEffect(() => {
    console.log("IN INSTRU");
    return () => {
      analyser?.disconnect();
      instru?.node.disconnect();
      audioContext?.suspend();
      try {
        instru?.messageEvent?.removeAllSubscriptions();
      } catch (e) {
        console.log(e);
      }
      console.log(instru.messageEvent);
      console.log("TODO : OUT INSTRU (ETRANGE POURQUOI MARCHE PAS AVANT ?!)");
    };
  }, []);

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
                step={(param.max - param.min) / 100}
                defaultValue={[param.initialValue]}
                onValueChange={(value) => sliderValChange(param.name, value[0])}
              />
            </div>
          ))}
        </div>
        <p className="text-sm text-primary" ref={refOutports}></p>
      </div>
    </>
  );
}
