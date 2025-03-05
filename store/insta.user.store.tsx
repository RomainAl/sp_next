import { create } from "zustand";
import { devtools } from "zustand/middleware";

type instaUserStoreType = {
  currentVid: number;
};

export const useInstaUserStore = create(
  devtools<instaUserStoreType>(() => ({
    currentVid: 0,
  }))
);

export const setInstaCurrentVid = (currentVid: number) => {
  useInstaUserStore.setState({ currentVid });
};
