import { create } from "zustand";
import { devtools } from "zustand/middleware";

type instaUserStoreType = {
  currentVid: number;
  vidNb: number;
};

export const initInstaUserStore = {
  currentVid: 0,
  vidNb: 50,
};

export const useInstaUserStore = create(devtools<instaUserStoreType>(() => ({ ...initInstaUserStore })));

export const setInstaCurrentVid = (currentVid: number) => {
  useInstaUserStore.setState({ currentVid });
};
