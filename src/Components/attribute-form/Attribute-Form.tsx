import { Button, Card, Form, Input, Space, Spin, message } from "antd";
import { CloseOutlined, MinusCircleOutlined } from "@ant-design/icons";
import React from "react";
import { useDeleteAttributeValue } from "../../Pages/Sub-Category/Attribute/services/mutation/useDeleteAttributeValue";
import { CreateCategory } from "../../Pages/Create-Category/service/mutation/useCreateCategory";
import { useDeleteAttribute } from "../../Pages/Sub-Category/Attribute/services/mutation/useDeleteAttribute";
import { useQueryClient } from "@tanstack/react-query";
type AttributeType = {
  items: [{ title: string; values: [{ value: string }] }];
};
export interface attribueSubmit {
  submit: (data: AttributeType) => void;
  isLoading: boolean;
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
  data?: CreateCategory;
}
export const AttributeForm: React.FC<attribueSubmit> = ({
  submit,
  initialValue,
  data,
  isLoading,
}) => {
  const { mutate } = useDeleteAttributeValue();
  const { mutate: Attribute } = useDeleteAttribute();
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const DeleteValue = (id: string) => {
    mutate(id, {
      onSuccess: () => {
        message.success("Success");
      },
      onError: (error) => {
        message.error(error.message);
      },
    });
  };

  const DeleteAttribute = (id: string) => {
    Attribute(id, {
      onSuccess: () => {
        message.success("Success");
        queryClient.invalidateQueries({ queryKey: ["single-data"] });
      },
      onError: (error) => {
        message.error(error.message);
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
            {isLoading ? (
              <Spin />
            ) : (
              fields.map((field) => (
                <Card
                  size="small"
                  title={`Item ${field.name + 1}`}
                  key={field.key}
                  extra={
                    <Button
                      type="text"
                      disabled={
                        !data?.attributes[field.key]?.values.length
                          ? false
                          : true
                      }
                    >
                      <CloseOutlined
                        onClick={() => {
                          remove(field.name);
                          const deleteAttribute =
                            initialValue?.attributes[field.key].id;
                          if (deleteAttribute) DeleteAttribute(deleteAttribute);
                        }}
                      />
                    </Button>
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
                              <Form.Item
                                noStyle
                                name={[subField.name, "value"]}
                              >
                                <Input placeholder="first" />
                              </Form.Item>

                              <MinusCircleOutlined
                                onClick={() => {
                                  subOpt.remove(subField.name);
                                  const deletedValueId =
                                    initialValue?.attributes?.[field.key]
                                      ?.values[subField.key]?.id;
                                  if (deletedValueId) {
                                    DeleteValue(deletedValueId);
                                  }
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
              ))
            )}

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
