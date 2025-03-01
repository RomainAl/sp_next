"use client";
import { Button } from "@/components/ui/button";
import { MIDIVal, MIDIValInput } from "@midival/core";

export default function Home() {
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
        console.log(control + " " + value);
        // console.log(`[CC] ${ControlChangeToReadableName[control]}: ${value}`);
      });
    });
  };
  return (
    <div>
      <Button onClick={() => connect()}>TEST</Button>
    </div>
  );
}
