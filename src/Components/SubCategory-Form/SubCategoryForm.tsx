import { InboxOutlined, LoadingOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  Select,
  Spin,
  UploadFile,
  UploadProps,
} from "antd";
import Dragger from "antd/es/upload/Dragger";
import React from "react";
import { useGetCategory } from "../../Pages/Category/service/query/useGetCategory";

type Categories = {
  id: number,
  title: string;
  image?: {
    file: File;
    fileList: FileList;
  };
  children: {
    parent: number;
    title: string;
    image: string;
  }[];
};

export interface formSubmit {
  submit: (data: Categories) => void;
  isPending: boolean
}

export const SubCategoryForm: React.FC<formSubmit> = ({
  submit,
  isPending
}) => {
  const { data: categoryData } = useGetCategory();
  const [fileList, setFileList] = React.useState<UploadFile[]>([]);

  const onchange: UploadProps["onChange"] = ({ fileList }) => {
    setFileList(fileList);
  };

  return (
    <Form
      name="basic"
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={submit}
      layout="vertical"
      autoComplete="off"
    >
      <Form.Item
        label="title"
        name="title"
        rules={[{ required: true, message: "Please input your title!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item name="parent">
        <Select
          defaultValue={"Categories"}
          options={categoryData?.results.map((item: Categories) => ({
            value: item.id,
            label: item.title,
          }))}
        />
      </Form.Item>
      <Form.Item
        name="image"
        rules={[{ required: true, message: "please insert a picture " }]}
      >
        <Dragger
          listType="picture-card"
          multiple={false}
          maxCount={1}
          beforeUpload={() => false}
          fileList={fileList}
          onChange={onchange}
        >
          <p className="ant-upload-drag-icon">
            {" "}
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
          <p className="ant-upload-hint">
            Support for a single or bulk upload. Strictly prohibited from
            uploading company data or other banned files.
          </p>
        </Dragger>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" disabled={isPending}>
          {isPending ? (
            <Spin
              indicator={<LoadingOutlined style={{ fontSize: 24, color: "white" }} spin />}
            />
          ) : (
            "Submit"
          )}
        </Button>
      </Form.Item>
    </Form>
  );
};
