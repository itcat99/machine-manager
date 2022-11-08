import { Button, Cascader, Form, Input, message, Select } from "antd";
import { useCategory } from "hooks/category";
import { useParams } from "hooks/params";
import { useProductSpec } from "hooks/productSpec";
import { useEffect, useRef, useState } from "react";

export default function () {
  const { category } = useCategory();
  const { params } = useParams();
  const { createProductSPec } = useProductSpec();
  const [options, setOptions] = useState(category ? category["TOP"] : []);
  const [creating, setCreating] = useState(false);
  const [form] = Form.useForm();
  const maxLevel = useRef(0);

  useEffect(() => {
    if (!category) return;

    const keys = Object.keys(category);

    Object.values(category).forEach((list) => {
      const item = list[0];
      if (item.level > maxLevel.current) {
        maxLevel.current = item.level;
      }
    });

    setOptions(
      category["TOP"].map((item) => {
        if (keys.includes(item.id))
          return Object.assign({}, item, { isLeaf: false });
        else return item;
      })
    );
  }, [category]);

  if (!category) return <article id="defaultLayoutContent"></article>;

  return (
    <article id="defaultLayoutContent">
      <header>新建产品模板</header>
      <section>
        <Form
          form={form}
          title="新建产品模板"
          onReset={() => form.resetFields()}
          onFinish={(values) => {
            const formData = Object.assign({}, values);

            // if (formData["category"])
            formData["category"] =
              formData["category"][formData["category"].length - 1].split(
                ":"
              )[1];

            // if (formData["params"])
            formData["params"] = params
              .filter((item) => formData["params"].includes(item.id))
              .map((item) => item.name);

            const { name, ...data } = formData;

            setCreating(true);
            createProductSPec(name, data)
              .then(() => {
                message.success("创建成功！");
                form.resetFields();
              })
              .catch((err) => console.error(err))
              .finally(() => setCreating(false));
          }}
        >
          <Form.Item
            label="名称"
            name="name"
            required
            rules={[{ required: true }]}
          >
            <Input placeholder="请输入产品模板名称" />
          </Form.Item>
          <Form.Item
            label="分类"
            name="category"
            required
            rules={[{ required: true, message: "请选择分类" }]}
          >
            <Cascader
              changeOnSelect
              fieldNames={{ label: "name", value: "id" }}
              options={options}
              onChange={(value) => {
                console.log("value", value);
              }}
              loadData={(select) => {
                const keys = Object.keys(category);
                const current = select[select.length - 1];
                let children = category[current.id as string] as any;
                current.loading = false;

                if (children) {
                  if (children[0].level < maxLevel.current)
                    children = children.map((item: any) => {
                      return {
                        ...item,
                        isLeaf: keys.includes(item.id) ? false : true, // 当此子项的id在keys里时，不为叶子结点
                      };
                    });

                  current.children = children;
                }

                setOptions([...options]);
              }}
            />
          </Form.Item>
          <Form.Item
            label="参数"
            name="params"
            required
            rules={[{ required: true, message: "请选择参数" }]}
          >
            <Select
              mode="multiple"
              fieldNames={{ label: "name", value: "id" }}
              options={params}
            />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" type="primary" loading={creating}>
              创建
            </Button>
            <Button htmlType="reset">重置</Button>
          </Form.Item>
        </Form>
      </section>
    </article>
  );
}
