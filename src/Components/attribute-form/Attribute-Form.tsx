import { Button, Card, Form, Input, Space, message } from "antd";
import { CloseOutlined, MinusCircleOutlined } from "@ant-design/icons";
import React from "react";
import { useDeleteAttributeValue } from "../../Pages/Sub-Category/Attribute/services/mutation/useDeleteAttributeValue";
type AttributeType = {
  items: [{ title: string; values: [{ value: string }] }];
};
export interface attribueSubmit {
  submit: (data: AttributeType) => void;
  initialValue?: {
    attributes: {
      id: string | null;
      title: string;
      values: {
        id: string | null;
        value: string;
      }[];
    }[];
  };
}
export const AttributeForm: React.FC<attribueSubmit> = ({
  submit,
  initialValue,
}) => {
  const { mutate } = useDeleteAttributeValue();
  const [form] = Form.useForm();
  const DeleteValue = (id: string) => {
    mutate(id, {
      onSuccess: () => {
        console.log("o'chirildi");
        message.success("Success");
      },
      onError: (error) => {
        message.error(error.name);
      },
    });
  };
  return (
    <Form
      form={form}
      name="dynamic_form_complex"
      style={{ maxWidth: "100%" }}
      autoComplete="off"
      layout="vertical"
      onFinish={submit}
    >
      <Form.List name="items" initialValue={initialValue?.attributes}>
        {(fields, { add, remove }) => (
          <div
            style={{
              display: "grid",
              rowGap: 16,
              flexDirection: "column",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "2rem",
            }}
          >
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
                          rowGap: 20,
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
                                DeleteValue(
                                  initialValue?.attributes.values?.id
                                );
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
      <Button
        htmlType="submit"
        type="primary"
        style={{ width: "20%", marginTop: "1.5rem" }}
      >
        Send
      </Button>
    </Form>
  );
};
