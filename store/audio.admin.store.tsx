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

export const setAudioAnalyser = () => {
  const ctx = useAudioAdminStore.getState().audioContext;
  const audioAnalyser = useAudioAdminStore.getState().audioAnalyser;
  navigator.mediaDevices
    .getUserMedia({
      audio: {
        sampleRate: 44100,
        sampleSize: 16,
        noiseSuppression: false,
        echoCancellation: false,
        channelCount: 1,
        autoGainControl: true,
      },
      video: false,
    })
    .then((stream) => {
      const source = ctx?.createMediaStreamSource(stream);
      if (audioAnalyser) {
        source?.connect(audioAnalyser);
        useAudioAdminStore.setState({ audioAnalyser });
      }
    });
};
