import { create } from "zustand";
import { devtools } from "zustand/middleware";

export type admin2userDataType = {
  goto?: string;
  getStream?: { call: boolean; goto: string } | undefined;
  toast?: toastStoreType;
  flashes_trig?: number;
  flashes_time?: number;
  gain?: number;
};

export type user2adminDataType = {
  name?: string;
  currentInstaVid?: number;
  toast?: toastStoreType;
};

export type soundVisualiserParamsType = {
  fftSize: number;
  rectSize: number;
  rectSize_: number;
  gain: number;
  color: string;
  smoothingTimeConstant: number;
  rand: number;
  stroke: boolean;
};

export const initSoundVisualizerParams: soundVisualiserParamsType = {
  fftSize: 512,
  rectSize: 5,
  rectSize_: 5,
  gain: 10.0,
  color: "rgb(229, 115, 51)",
  smoothingTimeConstant: 1.0,
  rand: 0,
  stroke: false,
};

type toastStoreType = {
  title: string;
  message?: string;
};

export const useToastStore = create(
  devtools<toastStoreType>(() => ({
    title: "",
    message: "",
  }))
);

export const useSoundVisualizerParamsStore = create(
  devtools<soundVisualiserParamsType>(() => ({
    ...initSoundVisualizerParams,
  }))
);

export const setSoundVisualizerParams = (params: soundVisualiserParamsType) => {
  useSoundVisualizerParamsStore.setState(params);
};

export const setSoundVisualizerParamsRectSize_ = (rectSize_: number) => {
  useSoundVisualizerParamsStore.setState({ rectSize_ });
};
