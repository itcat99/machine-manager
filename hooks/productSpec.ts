import { api } from "@/api";
import { productSpecAtom } from "atoms/productSpec";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

export const useProductSpec = () => {
  const [productSpec, setProductSpec] = useRecoilState(productSpecAtom);
  const [loading, setLoading] = useState(false);

  const fetchAllProductSpec = async () => {
    setLoading(true);
    const res = await api.selectProductSpecAll();
    setProductSpec(res);
    setLoading(false);
  };

  /** 新建并且更新当前的产品模板列表 */
  const createProductSPec = async (
    id: string,
    data: { category: string; params: string[] }
  ) => {
    const createRes = await api.createProductSpecOne(id, data);
    console.log("create res", createRes);

    await fetchAllProductSpec();
  };

  useEffect(() => {
    if (productSpec && productSpec.length) return;
    fetchAllProductSpec().catch((err) => console.error(err));
  }, []);

  return {
    loading,
    productSpec,
    fetchAllProductSpec,
    createProductSPec,
  };
};
