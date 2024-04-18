import { Button, GetProp, Image, Input, UploadFile, UploadProps } from "antd";
import { Form } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import Dragger from "antd/es/upload/Dragger";
import React from "react";

export type Categories = {
  id: string;
  title: string;
  parent: {
    id: string;
    title: string;
  };
  image?: {
    file: File;
    fileList: FileList;
  };
};

export interface formSubmit {
  submit: (data: Categories) => void;
  initialValues?: {
    title?: string;
    image?: {
      file: File | string;
      fileList: FileList | string;
    };
  };
  isPending: boolean;
}

export const Forms: React.FC<formSubmit> = ({
  submit,
  initialValues,
  isPending,
}) => {
  const [fileList, setFileList] = React.useState<UploadFile[]>([]);

  const onchange: UploadProps["onChange"] = ({ fileList }) => {
    setFileList(fileList);
  };
  type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as FileType);
        reader.onload = () => resolve(reader.result as string);
      });
    }

    const img = document.createElement("img");
    img.src = src;

    const imgWindow = window.open();
    imgWindow?.document.write(img.outerHTML);
  };

  return (
    <Form
      name="basic"
      style={{ maxWidth: 600 }}
      onFinish={submit}
      layout="vertical"
      initialValues={{ title: initialValues?.title }}
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
        rules={
          initialValues
            ? [{ required: false }]
            : [{ required: true, message: "Image upload is mandatory" }]
        }
      >
        <Dragger
          listType="picture-card"
          multiple={false}
          maxCount={1}
          beforeUpload={() => false}
          fileList={fileList}
          onChange={onchange}
          onPreview={onPreview}
          action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
          accept=".png, .jpg, .svg, .jpeg "
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
      {initialValues && !fileList.length && (
        <Image
          width={200}
          height={150}
          style={{ objectFit: "contain" }}
          src={
            typeof initialValues?.image == "string" ? initialValues.image : ""
          }
        />
      )}
      <Form.Item>
        <Button loading={isPending} type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
