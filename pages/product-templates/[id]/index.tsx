import { api } from "@/api";
import { Descriptions, Tag } from "antd";
import { productSpecAtom } from "atoms/productSpec";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

import classes from "./style.module.scss";

export default () => {
  const { query, push } = useRouter();
  const { id } = query;
  const [data, setData] = useState<ProductSpecI>();
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(true);
  const productSpecList = useRecoilValue(productSpecAtom);

  useEffect(() => {
    if (!id) return;
    const _current = productSpecList.find((item) => item.id === id);
    if (_current) setData(_current);
    else
      api
        .selectProductSpecOne(id as string)
        .then((res) => setData(res))
        .catch(() => setErr(true));
  }, [id]);

  if (err) return <section id="defaultLayoutContent">Error NOT Found</section>;
  if (!data) return <section id="defaultLayoutContent"></section>;
  return (
    <section id="defaultLayoutContent" className={classes["product-templates"]}>
      <Descriptions bordered title={`${data?.name} 产品模板`}>
        <Descriptions.Item label="名称" span={3}>
          {data.name || "-"}
        </Descriptions.Item>
        <Descriptions.Item label="分类" span={1}>
          {data.category ? data.category.name : "-" || "-"}
        </Descriptions.Item>
        <Descriptions.Item label="分类描述" span={2}>
          {data.category ? data.category.description : "-" || "-"}
        </Descriptions.Item>
        <Descriptions.Item label="参数" span={3}>
          {data?.params.map((item, index) => {
            return (
              <Link href={`/params/${item.id}`} key={`${item.id}_${index}`}>
                {/* <Tag className={classes.tag}>{item.name}</Tag> */}
                {item.name}、
              </Link>
            );
          })}
        </Descriptions.Item>
      </Descriptions>
    </section>
  );
};
