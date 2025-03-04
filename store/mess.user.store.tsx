import { create } from "zustand";
import { devtools } from "zustand/middleware";

export type messDataType = {
  goto?: string;
  message?: string;
  getStream?: { call: boolean; goto: string } | undefined;
};

const initMessUserStore = {
  goto: undefined,
  getStream: undefined,
};

export const useMessUserStore = create(
  devtools<messDataType>(() => ({
    ...initMessUserStore,
  }))
);

export const setGoto = (goto: string) => {
  useMessUserStore.setState({ goto });
};
export const setInitMessUserStore = () => {
  useMessUserStore.setState(initMessUserStore);
};
