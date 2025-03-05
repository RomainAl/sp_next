import { create } from "zustand";
import { devtools } from "zustand/middleware";

type audioStoreType = {
  audioContext: AudioContext | null;
  audioAnalyser: AnalyserNode | null;
  peerSound: MediaStreamAudioDestinationNode | null;
};

export const useAudioAdminStore = create(
  devtools<audioStoreType>(() => ({
    audioContext: null,
    audioAnalyser: null,
    peerSound: null,
  }))
);

export const setAdminAudio = () => {
  const ctx = new AudioContext();
  ctx.resume();

  useAudioAdminStore.setState({
    audioContext: ctx,
    audioAnalyser: ctx.createAnalyser(),
    peerSound: ctx.createMediaStreamDestination(),
  });
};
