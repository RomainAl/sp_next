import { createDevice, Device } from "@rnbo/js";
import { createRef, RefObject } from "react";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

type audioStoreType = {
  audioContext: AudioContext | null;
  audioAnalyser: AnalyserNode | null;
  instrus: Device[];
  peerSound: MediaStreamAudioDestinationNode | null;
  audioContextRef: RefObject<AudioContext | null>;
  // params: Array<Array<ICreateDeviceParameters>>;
  setAudioContext: (context: AudioContext) => void;
  setInstru: (instru: Device) => void;
};

export const useAudioUserStore = create(
  devtools<audioStoreType>((set) => ({
    audioContext: null,
    audioAnalyser: null,
    instrus: new Array(1),
    peerSound: null,
    audioContextRef: createRef<AudioContext>(),
    // params: new Array(2),
    setAudioContext: (audioContext: AudioContext) => {
      set((state) => {
        if (!state.audioContext) {
          const audioAnalyser = audioContext.createAnalyser();
          return { ...state, audioContext, audioAnalyser };
        } else {
          return {};
        }
      });
    },
    setInstru: (instru: Device) => {
      set((state) => {
        if (state.audioContext) {
          return { ...state, instru1: instru };
        } else {
          return {};
        }
      });
    },
    // setInstru: async () => {
    //   const rawPatcher = await fetch("instru1/patch.export.json");
    //   const patcher = await rawPatcher.json();
    //   console.log("patcher", patcher);
    //   const ctx = new AudioContext();
    //   console.log("ctx", ctx);
    //   const instru1 = await createDevice({ ctx, patcher });
    //   set((state) => {
    //     if (state.audioContext) {
    //       return { ...state, instru1 };
    //       // return {};
    //     } else {
    //       return {};
    //     }
    //   });
    // },
  }))
);

export const setUserAudio = async () => {
  const ctx = new AudioContext();
  const ctxRef = createRef<AudioContext | null>();
  ctxRef.current = ctx;
  ctx.resume();
  const instrus = useAudioUserStore.getState().instrus;
  // const params = useAudioUserStore.getState().params;
  for (let i = 0; i < instrus.length; i++) {
    try {
      const path = "instrus/instru";
      const rawPatcher = await fetch(`${path}${i}/patch.export.json`);
      const patcher = await rawPatcher.json();
      const dependenciesResponse = await fetch(`${path}${i}/dependencies.json`);
      let dependencies = await dependenciesResponse.json();
      dependencies = dependencies.map((d: { id: string; file: string }) => (d.file ? Object.assign({}, d, { file: `${path}${i}/` + d.file }) : d));
      instrus[i] = await createDevice({ context: ctx, patcher: patcher }); // TOTO : Type of RNBO params : ICreateDeviceParameters
      if (dependencies.length) await instrus[i].loadDataBufferDependencies(dependencies);
      // params[i] = instrus[i].parameters; // TODO pourquoi array/array/truc ?!
    } catch (e) {
      console.error(e);
      console.error("Impossible de charger les effets !");
    }
  }
  useAudioUserStore.setState({
    audioContext: ctx,
    audioContextRef: ctxRef,
    audioAnalyser: ctx.createAnalyser(),
    instrus: instrus,
    peerSound: ctx.createMediaStreamDestination(),
  });
};
