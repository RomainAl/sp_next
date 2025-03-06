import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { initInstaUserStore } from "./insta.user.store";

type instaAdminStoreType = {
  id: number;
  views: number;
};

export const useInstaAdminStore = create(
  devtools<{ videoViews: instaAdminStoreType[] }>(() => ({
    videoViews: new Array(initInstaUserStore.vidNb).fill({ id: 0, views: 0 }),
  }))
);

export const setInstaCurrentVid = (currentVid: number) => {
  const videoViews = useInstaAdminStore.getState().videoViews;
  videoViews[currentVid] = { id: currentVid, views: videoViews[currentVid].views + 1 };
  useInstaAdminStore.setState({ videoViews });
};
