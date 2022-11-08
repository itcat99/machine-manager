import { api } from "@/api";
import { categoryAtom, categoryListAtom } from "atoms/category";
import { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";

export const useCategory = () => {
  const [categoryList, setCategoryList] = useRecoilState(categoryListAtom);
  const [category, setCategory] = useRecoilState(categoryAtom);
  const [loading, setLoading] = useState(false);

  /**
   * data to tree struct
   * @param list
   */
  const handleData = (list: CategoryI[]) => {
    /** 按level排序 */
    const _list = [...list].sort((a, b) => a.level - b.level);
    let collection: { [key: string]: CategoryI[] } = {
      TOP: [],
    };

    _list.forEach((category) => {
      const { level, id } = category;

      switch (level) {
        case 1: {
          if (!collection["TOP"].find((item) => item.id === id)) {
            collection["TOP"].push(category);
          }
          break;
        }
        default: {
          const idStr = id.split(":")[1];
          const parentId = `category:${idStr.slice(0, idStr.length - 2)}`;

          if (!collection[parentId]) {
            collection = Object.assign({}, collection, {
              [parentId]: [Object.assign({}, category)],
            });
          } else {
            collection[parentId].push(Object.assign({}, category));
          }
          break;
        }
      }
    });

    setCategory(collection);
  };

  useEffect(() => {
    if ((categoryList && categoryList.length) || loading) return;

    (async () => {
      setLoading(true);
      const res = await api.selectCategoryAll();
      setCategoryList(res);
      handleData(res);
      console.log("AAA");
      setLoading(false);
    })().catch((err) => console.error(err));
  }, [categoryList, loading]);

  return {
    loading,
    category,
    categoryList,
  };
};
