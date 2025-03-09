import { create } from "zustand";
import { devtools } from "zustand/middleware";

type audioStoreType = {
  audioContext: AudioContext | null;
  audioAnalyser: AnalyserNode | null;
  peerSound: MediaStreamAudioDestinationNode | null;
  merger: ChannelMergerNode | null;
};

export const useAudioAdminStore = create(
  devtools<audioStoreType>(() => ({
    audioContext: null,
    audioAnalyser: null,
    peerSound: null,
    merger: null,
  }))
);

export const setAdminAudio = () => {
  const ctx = new AudioContext();
  ctx.resume();
  const merger = ctx.createChannelMerger(ctx.destination.maxChannelCount);
  merger.channelInterpretation = "discrete";
  merger.connect(ctx.destination);
  useAudioAdminStore.setState({
    audioContext: ctx,
    audioAnalyser: ctx.createAnalyser(),
    peerSound: ctx.createMediaStreamDestination(),
    merger: merger,
  });
};
