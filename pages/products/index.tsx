import Link from "next/link";
import { Input, Space, Table } from "antd";

import { useProduct } from "hooks/product";
import { TableHeader } from "components/TableHeader";
import { useState } from "react";

export default function Products() {
  const { products: data } = useProduct();
  const [keyword, setKeyword] = useState<string>();

  return (
    <section id="defaultLayoutContent">
      <Table
        dataSource={data.filter((item) =>
          keyword ? item.params.产品名称?.includes(keyword) : true
        )}
        rowKey="id"
        title={() => (
          <TableHeader
            title={
              <Space>
                <h2>产品列表</h2>
                <Link href="/products/create">新建产品</Link>
              </Space>
            }
            onSearch={(value) => setKeyword(value)}
          />
        )}
        columns={[
          {
            key: "id",
            dataIndex: "id",
            title: "产品名称",
            render(value, record) {
              return (
                <Link href={`/products/${value}`}>
                  {record.params["产品名称"] || "-"}
                </Link>
              );
            },
          },
          {
            key: "id",
            dataIndex: "id",
            title: "产品编码",
            render(_, record) {
              return <span>{record.params["产品编码"] || "-"}</span>;
            },
          },
          {
            key: "id",
            dataIndex: "id",
            title: "产品系列",
            render(_, record) {
              return <span>{record.params["产品系列"] || "-"}</span>;
            },
          },
          {
            key: "id",
            dataIndex: "id",
            title: "产品模板",
            render(_, record) {
              return (
                <Link href={`/product-templates/${record.product_spec["id"]}`}>
                  {record.product_spec["name"] || "-"}
                </Link>
              );
            },
          },
        ]}
      />
    </section>
  );
}
