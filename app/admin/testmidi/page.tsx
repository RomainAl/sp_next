"use client";
import { Button } from "@/components/ui/button";
import { useAudioUserStore } from "@/store/audio.user.store";
import { MIDIVal, MIDIValInput } from "@midival/core";
import { useEffect } from "react";

export default function Home() {
  const audioContext = useAudioUserStore((store) => store.audioContext);
  const instru = useAudioUserStore((store) => store.instrus[0]);
  const analyser = useAudioUserStore((store) => store.audioAnalyser);

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

  const connect = () => {
    MIDIVal.connect().then((access) => {
      console.log(access);
      console.log("Input Devices", access.inputs);
      console.log("Output Devices", access.outputs);
      if (!access.inputs) {
        console.warn("No inputs yet");
        return;
      }
      const input = new MIDIValInput(access.inputs[0]);
      console.log(input);
      input.onAllControlChange(({ control, value }) => {
        console.log(control + " " + value);
        // console.log(`[CC] ${ControlChangeToReadableName[control]}: ${value}`);
      });
    });
  };

  return (
    <>
      <div className="flex h-screen w-screen flex-col items-center justify-center gap-7">
        <Button onClick={() => connect()}>TEST</Button>
      </div>
    </>
  );
}
