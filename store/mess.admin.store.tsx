import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { admin2userDataType } from "./shared.store";
import { sendMess } from "./webrtc.admin.store";

const initAdmin2UserData: admin2userDataType = {
  goto: "nikedal", // FOR USER CONNECTION GOTO
};

export const useMessAdminStore = create(
  devtools<admin2userDataType>(() => ({
    ...initAdmin2UserData,
  }))
);

export const setCurrentPage = (goto: string) => {
  useMessAdminStore.setState({ goto });
  sendMess({ goto });
};

export const setInitMessUserStore = () => {
  useMessAdminStore.setState(initAdmin2UserData);
};
