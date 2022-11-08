import { useRecoilState } from "recoil";
import { productsAtom } from "atoms/product";
import { useEffect, useState } from "react";
import { api } from "@/api";

export const useProduct = () => {
  const [products, setProducts] = useRecoilState(productsAtom);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (products && products.length) return;

    (async () => {
      setLoading(true);
      const res = await api.selectProductAll();
      setProducts(res);
      setLoading(false);
    })().catch((err) => console.error(err));
  }, [products]);

  return {
    loading,
    products,
  };
};
