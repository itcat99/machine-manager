import { atom } from "recoil";

export const productSpecAtom = atom<ProductSpecI[]>({
  key: "productSpeces",
  default: [],
});
