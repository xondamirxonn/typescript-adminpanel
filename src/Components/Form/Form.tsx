import { Button, Input, Upload, UploadFile, UploadProps, message } from "antd";
import { Form, type FormProps } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import Dragger from "antd/es/upload/Dragger";
import React from "react";

type Categories = {
  parentId: number,
  title: string;
  image?: {
    file: File;
    fileList: FileList;
  };
};

export interface formSubmit {
  submit: (data: Categories) => void;
}

export const Forms: React.FC<formSubmit> = ({ submit }) => {
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
      <Form.Item<Categories>
        label="title"
        name="title"
        rules={[{ required: true, message: "Please input your title!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item<Categories>
        name={"image"}
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
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
