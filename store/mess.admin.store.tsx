import { create } from "zustand";
import { devtools } from "zustand/middleware";

export type messDataType = {
  currentPage: string;
  message?: string;
};

const initMessUserStore = {
  currentPage: "insta",
  message: undefined,
};

export const useMessAdminStore = create(
  devtools<messDataType>(() => ({
    ...initMessUserStore,
  }))
);

export const setCurrentPage = (currentPage: string) => {
  useMessAdminStore.setState({ currentPage });
};

export const setInitMessUserStore = () => {
  useMessAdminStore.setState(initMessUserStore);
};
