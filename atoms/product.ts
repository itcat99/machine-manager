import { atom } from "recoil";

export const productsAtom = atom<ProductI[]>({
  key: "products",
  default: [],
});
