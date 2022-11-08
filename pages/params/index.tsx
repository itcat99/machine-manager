import { Table } from "antd";
import { useParams } from "hooks/params";

export default function () {
  const { params } = useParams();

  if (!params || !params.length)
    return <section id="defaultLayoutContent"></section>;
  return (
    <section id="defaultLayoutContent">
      <Table
        dataSource={params}
        rowKey="id"
        pagination={{
          pageSize: 15,
        }}
        columns={[
          { key: "id", dataIndex: "id", title: "ID" },
          { key: "name", dataIndex: "name", title: "名称" },
          { key: "param_group", dataIndex: "param_group", title: "参数组" },
          { key: "position", dataIndex: "position", title: "位置" },
        ]}
      ></Table>
    </section>
  );
}
