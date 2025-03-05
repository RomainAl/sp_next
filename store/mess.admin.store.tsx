import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { admin2userDataType } from "./mess.type.store";

const initAdmin2UserData: admin2userDataType = {
  goto: "facestime", // FOR USER CONNECTION GOTO
};

export const useMessAdminStore = create(
  devtools<admin2userDataType>(() => ({
    ...initAdmin2UserData,
  }))
);

export const setCurrentPage = (goto: string) => {
  useMessAdminStore.setState({ goto });
};

export const setInitMessUserStore = () => {
  useMessAdminStore.setState(initAdmin2UserData);
};
