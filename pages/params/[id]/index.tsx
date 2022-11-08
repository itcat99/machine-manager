import { api } from "@/api";
import { Descriptions } from "antd";
import { paramsAtom } from "atoms/param";
import { useRouter } from "next/router";
import { useState } from "react";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

export default function () {
  const { query } = useRouter();
  const { id } = query;

  const [data, setData] = useState<ParamI>();
  const [err, setErr] = useState(false);
  const [params, setParams] = useRecoilState(paramsAtom);

  useEffect(() => {
    if (!id) return;
    const _current = params.find((item) => item.id === id);
    if (_current) setData(_current);
    else
      api
        .selectParamOne(id as string)
        .then((res) => {
          setData(res);
          setParams([...params, res]);
        })
        .catch(() => {
          setErr(true);
        });
  }, [id]);

  if (err) return <section id="defaultLayoutContent">Error NOT Found</section>;
  if (!data) return <section id="defaultLayoutContent"></section>;
  return (
    <section id="defaultLayoutContent">
      <Descriptions bordered title={`${data.name}参数详情`}>
        <Descriptions.Item label="名称" span={2}>
          {data.name}
        </Descriptions.Item>
        <Descriptions.Item label="单位" span={1}>
          {data.unit || "-"}
        </Descriptions.Item>
        <Descriptions.Item label="参数组">
          {data.param_group.name}
        </Descriptions.Item>
        <Descriptions.Item label="别名">
          {data.aliases ? data.aliases.toString() : "-"}
        </Descriptions.Item>
      </Descriptions>
    </section>
  );
}
