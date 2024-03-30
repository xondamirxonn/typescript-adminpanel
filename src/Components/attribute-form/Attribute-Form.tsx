import { Button, Card, Form, Input, Space } from "antd";
import { CloseOutlined, MinusCircleOutlined } from "@ant-design/icons";
import React from "react";

export interface attribueSubmit {
  submit: (data: any) => void;
  initialValue?: {
    items: [
      {
        attribute_id: null | string;
        title: string;
        values: [
          {
            value: string;
            value_id: null | string;
          }
        ];
      }
    ];
  };
}
export const AttributeForm: React.FC<attribueSubmit> = ({
  submit,
  initialValue,
}) => {
  const [form] = Form.useForm();

  return (
    <Form
      
      form={form}
      name="dynamic_form_complex"
      style={{ maxWidth: 600 }}
      autoComplete="off"
      layout="vertical"
      onFinish={submit}
      initialValues={{ items: [{}] }}
    >
      <Form.List name="items">
        {(fields, { add, remove }) => (
          <div style={{ display: "flex", rowGap: 16, flexDirection: "column" }}>
            {fields.map((field) => (
              <Card
                size="small"
                title={`Item ${field.name + 1}`}
                key={field.key}
                extra={
                  <CloseOutlined
                    onClick={() => {
                      remove(field.name);
                    }}
                  />
                }
              >
                <Form.Item label="Name" name={[field.name, "title"]}>
                  <Input />
                </Form.Item>

                <Form.Item label="List">
                  <Form.List name={[field.name, "values"]}>
                    {(subFields, subOpt) => (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          rowGap: 16,
                        }}
                      >
                        {subFields.map((subField) => (
                          <Space key={subField.key}>
                            <Form.Item noStyle name={[subField.name, "value"]}>
                              <Input placeholder="first" />
                            </Form.Item>

                            <MinusCircleOutlined
                              onClick={() => {
                                subOpt.remove(subField.name);
                              }}
                            />
                          </Space>
                        ))}
                        <Button
                          type="dashed"
                          onClick={() => subOpt.add()}
                          block
                        >
                          + Add Sub Item
                        </Button>
                      </div>
                    )}
                  </Form.List>
                </Form.Item>
              </Card>
            ))}

            <Button type="dashed" onClick={() => add()} block>
              + Add Item
            </Button>
          </div>
        )}
      </Form.List>
      <Button htmlType="submit" type="primary" style={{width: "20%", marginTop: "1.5rem"}}>Send</Button>
    </Form>
  );
};
