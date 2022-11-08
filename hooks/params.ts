import { api } from "@/api";
import { paramsAtom } from "atoms/param";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

export const useParams = () => {
  const [params, setParams] = useRecoilState(paramsAtom);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if ((params && params.length) || loading) return;

    (async () => {
      setLoading(true);
      const res = await api.selectParamAll();
      setParams(res);
      setLoading(false);
    })().catch((err) => console.error(err));
  }, [params]);

  return {
    params,
    loading,
  };
};
