import { Input, Table } from "antd";
import { TableHeader } from "components/TableHeader";
import { useCategory } from "hooks/category";
import { useState } from "react";
import classes from "./style.module.scss";

export default function Category() {
  const { categoryList } = useCategory();
  const [keyword, setKeyword] = useState<string>();

  return (
    <section id="defaultLayoutContent" className={classes.category}>
      <Table
        pagination={{
          pageSize: 15,
        }}
        title={() => (
          <TableHeader
            title="产品分类"
            onSearch={(value) => setKeyword(value)}
          />
          // <section className={classes.header}>
          //   <h2>产品分类</h2>
          //   <Input.Search
          //     className={classes.search}
          //     placeholder="搜索名称"
          //     onSearch={(value) => setKeyword(value)}
          //     allowClear
          //   />
          // </section>
        )}
        dataSource={categoryList.filter((item) =>
          keyword ? item.name.includes(keyword) : true
        )}
        rowKey="id"
        columns={[
          { key: "id", dataIndex: "id", title: "ID" },
          {
            key: "name",
            dataIndex: "name",
            title: "名称",
          },
          // { key: "code", dataIndex: "code", title: "编码" },
          {
            key: "level",
            dataIndex: "level",
            title: "分级",
            filters: [
              { text: "Level 1", value: 1 },
              { text: "Level 2", value: 2 },
              { text: "Level 3", value: 3 },
              { text: "Level 4", value: 4 },
            ],
            onFilter: (value, record) => record.level === value,
          },
          { key: "description", dataIndex: "description", title: "描述" },
        ]}
      ></Table>
    </section>
  );
}
