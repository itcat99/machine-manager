import { Descriptions } from "antd";
import { useProduct } from "hooks/product";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function () {
  const { id } = useRouter().query;
  const { products } = useProduct();
  const [product, setProduct] = useState<ProductI>();

  useEffect(() => {
    setProduct(products.find((item) => item.id === id));
  }, [products, id]);

  console.log("product", product);

  if (!product) return <article id="defaultLayoutContent"></article>;

  const { 产品名称, ...others } = product.params;

  return (
    <article id="defaultLayoutContent">
      <Descriptions title="产品详情" bordered>
        <Descriptions.Item label="产品名称" span={3}>
          {产品名称 || "-"}
        </Descriptions.Item>
        {Object.entries(others).map(([key, value], index) => {
          return (
            <Descriptions.Item key={`${key}_${index}`} label={key}>
              {value || "-"}
            </Descriptions.Item>
          );
        })}
      </Descriptions>
    </article>
  );
}
