import { Button, Form, Image, Input, UploadFile, UploadProps } from "antd";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";
import Dragger from "antd/es/upload/Dragger";
import { InboxOutlined } from "@ant-design/icons";
interface BannerType {
  count: null | number;
  next: null | number;
  previous: null | number;

  created_at: string;
  description: string;
  id: number;
  image: {
    file: File;
    fileList: FileList;
  };
  title: string;
  updated_at: string;
}
interface formSubmit {
  submit: (data: BannerType) => void;
  isPending: boolean;
  initialValues?: {
    // results: {
    description: string;
    id: 9;
    image: {
      file: File;
      fileList: FileList;
    };
    title: string;
    // }[];
  };
}

export const BannerForm: React.FC<formSubmit> = ({
  submit,
  isPending,
  initialValues,
}) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const onchangeImg: UploadProps["onChange"] = ({ fileList }) => {
    setFileList(fileList);
  };
  const [value, setValue] = useState("");

  const handleChange = (content: any) => {
    setValue(content);
  };
  return (
    <Form onFinish={submit} layout="vertical" initialValues={initialValues}>
      <Form.Item label="Title" name={"title"}>
        <Input />
      </Form.Item>
      <Form.Item name={"image"}>
        <Dragger
          listType="picture-card"
          multiple={false}
          maxCount={1}
          beforeUpload={() => false}
          accept=".png, .jpg, .svg, .jpeg "
          fileList={fileList}
          onChange={onchangeImg}
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
      <Form.Item name={"description"} label="Description">
        <ReactQuill
          
          value={value}
          onChange={handleChange}
        />
      </Form.Item>

      <Button htmlType="submit" loading={isPending} type="primary">
        Submit
      </Button>
    </Form>
  );
};
