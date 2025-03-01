/* eslint-disable  @typescript-eslint/no-explicit-any */
"use client";
import { useContext, useEffect } from "react";
import { MIDIContext } from "../lib/midi/midi-provider";
import { EventName } from "../lib/midi/types";

export const useSubscribe = (event: EventName, cb: (args: any) => void) => {
  const { emitter } = useContext(MIDIContext);
  useEffect(() => {
    const id = emitter.subscribe(event, cb);
    return () => {
      emitter.unsubscribe("note", id);
    };
  }, [emitter, cb, event]);
};
