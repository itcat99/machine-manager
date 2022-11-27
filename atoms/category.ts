import { atom } from "recoil";

export const categoryAtom = atom<{ [key: string]: CategoryI[] }>({
  key: "category",
  default: undefined,
});

export const categoryListAtom = atom<CategoryI[]>({
  key: "categoryList",
  default: [],
});

export const categoryTreeAtom = atom<CategoryI[]>({
  key: "categoryTree",
  default: [],
});
