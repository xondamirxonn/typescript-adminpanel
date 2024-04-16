import { InboxOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Image,
  Input,
  Select,
  UploadFile,
  UploadProps,
} from "antd";
import Dragger from "antd/es/upload/Dragger";
import React from "react";
import { usePaginationGetCategory } from "../../Pages/Category/service/query/usePaginationGetCategory";

// type Categories = {
//   id: number;
//   title: string;
//   image?: {
//     file: File;
//     fileList: FileList;
//   };
// };
export type Categories = {
  title: string;
  image?: {
    file: File;
    fileList: FileList;
  };
  parent: number;
  children: {
    id: number;
    title: string;
    parent: {
      id?: number;
    };
  };
};
export interface formSubmit {
  submit: (data: Categories) => void;
  isPending: boolean;
  initialValue?: {
    title?: string;
    image?: string;
  };
}

export const SubCategoryForm: React.FC<formSubmit> = ({
  submit,
  isPending,
  initialValue,
}) => {
  const { data: categoryData } = usePaginationGetCategory();
  const [fileList, setFileList] = React.useState<UploadFile[]>([]);

  const onchange: UploadProps["onChange"] = ({ fileList }) => {
    setFileList(fileList);
  };

  return (
    <Form
      name="basic"
      style={{ maxWidth: 600 }}
      initialValues={{ title: initialValue?.title }}
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
          options={categoryData?.data.results.map((item) => ({
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
      {initialValue && !fileList.length && (
        <Image
          width={200}
          height={150}
          style={{ objectFit: "contain" }}
          src={initialValue.image}
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
