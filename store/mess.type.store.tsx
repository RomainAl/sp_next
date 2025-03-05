export type admin2userDataType = {
  goto?: string;
  getStream?: { call: boolean; goto: string } | undefined;
};

export type user2adminDataType = {
  name?: string;
  currentInstaVid?: number;
};
