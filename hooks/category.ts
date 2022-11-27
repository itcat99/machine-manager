import { api } from "@/api";
import {
  categoryAtom,
  categoryListAtom,
  categoryTreeAtom,
} from "atoms/category";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

export const useCategory = () => {
  const [categoryList, setCategoryList] = useRecoilState(categoryListAtom);
  const [category, setCategory] = useRecoilState(categoryAtom);
  const [categoryTree, setCategoryTree] = useRecoilState(categoryTreeAtom);
  const [loading, setLoading] = useState(false);

  const handleTreeData = (
    current: CategoryI,
    category: { [key: string]: CategoryI[] }
  ) => {
    const { id } = current;
    const res = Object.assign({}, current);

    res.children = category[id];
    if (res.children && res.children.length) {
      res.children = res.children.map((item) => {
        return handleTreeData(item, category);
      });
    }

    return res;
  };

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
    let tree: CategoryI[] = [];

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

    tree = collection["TOP"];
    tree = tree.map((item) => handleTreeData(item, collection));

    setCategory(collection);
    setCategoryTree(tree);
  };

  useEffect(() => {
    if ((categoryList && categoryList.length) || loading) return;

    (async () => {
      setLoading(true);
      const res = await api.selectCategoryAll();
      setCategoryList(res);
      handleData(res);

      setLoading(false);
    })().catch((err) => console.error(err));
  }, [categoryList, loading]);

  return {
    loading,
    category,
    categoryList,
    categoryTree,
  };
};
