import { useEffect, useState } from "react";
import { Button, Form, Input, message, Select, Space } from "antd";
import { useProductSpec } from "hooks/productSpec";
import { api } from "@/api";

export default function () {
  const { productSpec, loading } = useProductSpec();
  const [currentTemplate, setCurrentTemplate] = useState<ProductSpecI>();
  const [form] = Form.useForm();

  return (
    <article id="defaultLayoutContent">
      <Form
        form={form}
        onReset={() => form.resetFields()}
        onFinish={(values) => {
          const { product_spec, ...params } = values;
          const formData = {
            product_spec,
            params,
          };

          api
            .createProductOne(formData)
            .then(() => {
              form.resetFields();
              message.success("创建产品成功！");
            })
            .catch((err) => console.error(err));
        }}
      >
        <Form.Item
          label="选择产品模板"
          name="product_spec"
          required
          rules={[{ required: true }]}
        >
          <Select
            fieldNames={{ label: "name", value: "id" }}
            options={productSpec || []}
            onChange={(value) => {
              const current = productSpec.find((item) => item.id === value);
              console.log("current", current);
              if (current) setCurrentTemplate(current);
            }}
          />
        </Form.Item>
        {currentTemplate ? (
          currentTemplate.params.length ? (
            currentTemplate.params.map((item, index) => {
              const { id, name, unit } = item;

              return (
                <Form.Item
                  key={`${id}_${index}`}
                  label={name}
                  name={name}
                  required
                  rules={[{ required: true, message: `请填写 ${name}` }]}
                >
                  <Input
                    placeholder={`请输入${name}`}
                    addonAfter={unit ? <span>{unit}</span> : null}
                  />
                </Form.Item>
              );
            })
          ) : (
            <span>没有可输入的参数</span>
          )
        ) : null}
        <Form.Item>
          <Space>
            <Button
              type="primary"
              htmlType="submit"
              disabled={!currentTemplate}
            >
              创建
            </Button>
            <Button htmlType="reset" disabled={!currentTemplate}>
              重置
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </article>
  );
}
