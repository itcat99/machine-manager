import { useRef, useState, useEffect } from "react";
import { Button, Space, Table, TableProps } from "antd";
import { useRouter } from "next/router";
import { api } from "@/api";
import { useSetRecoilState } from "recoil";
import { productSpecAtom } from "atoms/productSpec";
import Link from "next/link";

import { TableHeader } from "components/TableHeader";

export default function ProductTemplates() {
  const [data, setData] = useState<ProductSpecI[]>([]);
  const [loading, setLoading] = useState(true);
  const { push, pathname } = useRouter();
  const setProductSpec = useSetRecoilState(productSpecAtom);
  const [keyword, setKeyword] = useState<string>();

  const columns = useRef<TableProps<ProductSpecI>["columns"]>([
    {
      key: "name",
      dataIndex: "name",
      title: "名称",
      render(value, record) {
        return <Link href={`${pathname}/${record.id}`}>{value}</Link>;
      },
    },
    {
      key: "category",
      dataIndex: "category",
      title: "分类",
      render(value) {
        if (!value) return <span>NULL</span>;

        return <span>{value.name}</span>;
      },
    },
  ]);

  const fetchData = async () => {
    setLoading(true);
    const res = await api.selectProductSpecAll();
    setData(res);
    setProductSpec(res);

    setLoading(false);
  };

  useEffect(() => {
    fetchData().catch((err) => console.error(err));
  }, []);

  return (
    <section id="defaultLayoutContent">
      <Table
        loading={loading}
        title={() => (
          <TableHeader
            onSearch={(value) => setKeyword(value)}
            title={
              <Space>
                <h2>产品模板列表</h2>
                <Link href="/product-templates/create">新建模板</Link>
              </Space>
            }
          />
        )}
        pagination={{
          pageSize: 15,
        }}
        dataSource={data.filter((item) =>
          keyword ? item.name.includes(keyword) : true
        )}
        rowKey="id"
        columns={columns.current}
      />
    </section>
  );
}
