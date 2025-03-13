import { createDevice, Device } from "@rnbo/js";
import { createRef, RefObject } from "react";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

type audioStoreType = {
  audioContext: AudioContext | null;
  audioAnalyser: AnalyserNode | null;
  filter: Device | null;
  gain: GainNode | null;
  nikedal: Device | null;
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
    filter: null,
    gain: null,
    nikedal: null,
    instrus: new Array(4),
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
  const gain = ctx.createGain();
  ctx.resume();
  const instrus = useAudioUserStore.getState().instrus;
  let filter = null;
  let nikedal = null;
  for (let i = 0; i < instrus.length; i++) {
    try {
      const path = `/instru${i}`;
      instrus[i] = await loadRNBO(path, ctx);
    } catch (e) {
      console.error(e);
      console.error("Impossible de charger les instrus !");
    }
  }
  try {
    const path = "/filter";
    filter = await loadRNBO(path, ctx);
  } catch (e) {
    console.error(e);
    console.error("Impossible de charger filter !");
  }

  try {
    const path = "/nikedal";
    nikedal = await loadRNBO(path, ctx);
  } catch (e) {
    console.error(e);
    console.error("Impossible de charger nikedal !");
  }

  useAudioUserStore.setState({
    audioContext: ctx,
    audioContextRef: ctxRef,
    filter: filter,
    nikedal: nikedal,
    gain: gain,
    audioAnalyser: ctx.createAnalyser(),
    instrus: instrus,
    peerSound: ctx.createMediaStreamDestination(),
  });
};

const loadRNBO = async (path: string, ctx: AudioContext) => {
  const rawPatcher = await fetch(`${path}/patch.export.json`);
  const patcher = await rawPatcher.json();
  const dependenciesResponse = await fetch(`${path}/dependencies.json`);
  let dependencies = await dependenciesResponse.json();
  dependencies = dependencies.map((d: { id: string; file: string }) => (d.file ? Object.assign({}, d, { file: `${path}/` + d.file }) : d));
  const device = await createDevice({ context: ctx, patcher: patcher });
  if (dependencies.length) await device.loadDataBufferDependencies(dependencies);
  return device;
};
