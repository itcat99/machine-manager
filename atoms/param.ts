import { atom } from "recoil";

export const paramsAtom = atom<ParamI[]>({
  key: "params",
  default: [],
});
