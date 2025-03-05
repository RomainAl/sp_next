import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { admin2userDataType } from "./shared.store";

const initAdmin2UserData: admin2userDataType = {
  goto: undefined,
  getStream: undefined,
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
