import { Button, Form, Input, Select, SelectProps, Space } from "antd";
import { useGetSubCategory } from "../../Pages/Sub-Category/services/query/useGetSubCategory";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

type AttributeCreate = {
  title: string;
  category: {}[];
  values: {
    value: string;
  }[];
};

interface formSubmit {
  submit: (data: AttributeCreate) => void;
}

export const CreateAttributeForm: React.FC<formSubmit> = ({ submit }) => {
  const { data } = useGetSubCategory();
  console.log(data);


  const options: SelectProps["options"] = data?.results.map((item) => {
    return {
      label: item.title,
      value: item.id,
    };
  });

  // const finish = (data: any) => {
  //   console.log(data);
  // };

  return (
    <Form layout="vertical" onFinish={submit}>
      <Form.Item label="Title" name={"title"}>
        <Input />
      </Form.Item>
      <Form.Item name={"category"}>
        <Select
          mode="multiple"
          style={{ width: "100%" }}
          placeholder="select one sub category"
          defaultValue={[]}
          optionLabelProp="label"
          options={options}
          optionRender={(option) => (
            <Space>
              <span aria-label={option.data.value}>{option.data.value}</span>
              {option.data.label}
            </Space>
          )}
        />
      </Form.Item>
      <Form.Item name="values" style={{ marginTop: "50px" }}>
        <Form.List name={"values"}>
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space
                  key={key}
                  style={{ display: "flex", marginBottom: 8 }}
                  align="baseline"
                >
                  <Form.Item
                    name={[name, "value"]}
                    {...restField}
                    rules={[{ required: true, message: "Missing first name" }]}
                  >
                    <Input placeholder="First Name" />
                  </Form.Item>

                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Add field
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form.Item>
      {/* </Form.Item> */}

      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form>
  );
};
