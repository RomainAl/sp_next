import { create } from "zustand";
import { devtools } from "zustand/middleware";

export type admin2userDataType = {
  goto?: string;
  getStream?: { call: boolean; goto: string } | undefined;
};

export type user2adminDataType = {
  name?: string;
  currentInstaVid?: number;
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
  rectSize_: 10,
  gain: 10.0,
  color: "rgb(229, 115, 51)",
  smoothingTimeConstant: 1.0,
  rand: 0,
  stroke: false,
};

export const useSoundVisualizerParamsStore = create(
  devtools<soundVisualiserParamsType>(() => ({
    ...initSoundVisualizerParams,
  }))
);
