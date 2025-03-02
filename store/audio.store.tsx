import { createDevice, Device } from "@rnbo/js";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

type audioStoreType = {
  audioContext: AudioContext | null;
  audioAnalyser: AnalyserNode | null;
  instrus: Device[];
  peerSound: MediaStreamAudioDestinationNode | null;
  // params: Array<Array<ICreateDeviceParameters>>;
  setAudioContext: (context: AudioContext) => void;
  setInstru: (instru: Device) => void;
};

export const useAudioStore = create(
  devtools<audioStoreType>((set) => ({
    audioContext: null,
    audioAnalyser: null,
    instrus: new Array(1),
    peerSound: null,
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
  ctx.resume();
  const instrus = useAudioStore.getState().instrus;
  // const params = useAudioStore.getState().params;
  for (let i = 0; i < instrus.length; i++) {
    try {
      console.log("Loading instru", i);
      const rawPatcher = await fetch(`instru${i}/patch.export.json`);
      const patcher = await rawPatcher.json();
      const dependenciesResponse = await fetch(`instru${i}/dependencies.json`);
      let dependencies = await dependenciesResponse.json();
      dependencies = dependencies.map((d: { id: string; file: string }) => (d.file ? Object.assign({}, d, { file: `./instru${i}/` + d.file }) : d));
      instrus[i] = await createDevice({ context: ctx, patcher: patcher }); // TOTO : Type of RNBO params : ICreateDeviceParameters
      if (dependencies.length) await instrus[i].loadDataBufferDependencies(dependencies);
      console.log(instrus[i].parameters);
      // params[i] = instrus[i].parameters; // TODO pourquoi array/array/truc ?!
    } catch (e) {
      console.error(e);
    }
  }
  useAudioStore.setState({
    audioContext: ctx,
    audioAnalyser: ctx.createAnalyser(),
    instrus: instrus,
    peerSound: ctx.createMediaStreamDestination(),
  });
};
