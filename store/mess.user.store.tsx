import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { admin2userDataType } from "./shared.store";

const initAdmin2UserData: admin2userDataType = {
  goto: undefined,
  getStream: undefined,
  flashes_time: 1000,
  flashes_trig: 0,
  gain: 1,
  elonMode: 0,
};

export const useMessUserStore = create(
  devtools<admin2userDataType>(() => ({
    ...initAdmin2UserData,
  }))
);

export const setGoto = (goto: string) => {
  useMessUserStore.setState({ goto });
};

export const setInitMessUserStore = () => {
  useMessUserStore.setState(initAdmin2UserData);
};

export const initFlashTrig = () => {
  useMessUserStore.setState({ flashes_trig: 0 });
};
