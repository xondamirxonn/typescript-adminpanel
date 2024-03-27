import { Button, Image, Input, UploadFile, UploadProps } from "antd";
import { Form } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import Dragger from "antd/es/upload/Dragger";
import React from "react";

type Categories = {
  title: string;
  image?: {
    file: File;
    fileList: FileList;
  };
};

export interface formSubmit {
  submit: (data: Categories) => void;
  initialValues?: {
    title?: string;
    image?: string;
  };
}

export const Forms: React.FC<formSubmit> = ({ submit, initialValues }) => {
  const [fileList, setFileList] = React.useState<UploadFile[]>([]);

  const onchange: UploadProps["onChange"] = ({ fileList }) => {
    setFileList(fileList);
  };
console.log(initialValues?.title);

  return (
    <Form
      name="basic"
      style={{ maxWidth: 600 }}
      initialValues={{ title: initialValues?.title }}
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
      <Form.Item
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
      {initialValues && !fileList.length && <Image width={200} height={150} style={{objectFit: "contain"}} src={initialValues.image} />}
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
