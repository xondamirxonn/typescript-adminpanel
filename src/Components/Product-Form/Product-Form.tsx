import {
  Button,
  Form,
  Image,
  Input,
  InputNumber,
  Select,
  Switch,
  UploadFile,
  UploadProps,
  message,
} from "antd";
import { useGetSubCategory } from "../../Pages/Sub-Category/services/query/useGetSubCategory";
import Dragger from "antd/es/upload/Dragger";
import React, { useState } from "react";
import { InboxOutlined } from "@ant-design/icons";

interface ProductType {
  count: number;
  next: null | string;
  previous: null | string;

  category: string;
  id: number;
  image: {
    file: File;
    fileList: FileList;
  };
  is_available: boolean;
  is_new: boolean;
  price: string;
  title: string;
}

interface formSubmit {
  submit: (data: ProductType) => void;
  isPending: boolean;
  initialValue?: {
    category: string;
    id: number;
    image: {
      file: File;
      fileList: FileList;
    };
    is_available: boolean;
    is_new: boolean;
    price: string;
    title: string;
  };
}

export const ProductForm: React.FC<formSubmit> = ({
  submit,
  initialValue,
  isPending,
}) => {
  const { data } = useGetSubCategory();

  const onChange = (checked: boolean) => {
    console.log(`switch to ${checked}`);
  };
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const onchangeImg: UploadProps["onChange"] = ({ fileList }) => {
    setFileList(fileList);
  };
  return (
    <Form layout="vertical" onFinish={submit} initialValues={initialValue}>
      <Form.Item
        hasFeedback
        name={"category"}
        hidden={initialValue ? true : false}
        rules={
          initialValue
            ? [{ required: false }]
            : [{ required: true, message: "Select is required" }]
        }
      >
        <Select
          defaultValue={"Parent Category"}
          options={data?.results.map((item) => ({
            value: item.id,
            label: item.title,
          }))}
        />
      </Form.Item>
      <div style={{ display: "flex", gap: "1rem" }}>
        <Form.Item label={"New"} name={"is_new"}>
          <Switch onChange={onChange} />
        </Form.Item>
        <Form.Item label={"Available"} name={"is_available"}>
          <Switch onChange={onChange} />
        </Form.Item>
      </div>

      <Form.Item
        name={"title"}
        rules={
          initialValue
            ? [{ required: false }]
            : [{ required: true, message: "Title is required" }]
        }
        hasFeedback
      >
        <Input />
      </Form.Item>

      <Form.Item
        name={"price"}
        rules={
          initialValue
            ? [{ required: false }]
            : [{ required: true, message: "Price is requried" }]
        }
        hasFeedback
      >
        <InputNumber<number>
          formatter={(value) =>
            `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          }
          parser={(value) =>
            value?.replace(/\$\s?|(,*)/g, "") as unknown as number
          }
          // onChange={onChange}
          style={{ width: "100%" }}
        />
      </Form.Item>
      <Form.Item
        name={"image"}
        hasFeedback
        rules={
          initialValue
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
      {initialValue && !fileList.length && (
        <Image
          width={200}
          height={150}
          style={{ objectFit: "contain", display: "block" }}
          src={typeof initialValue?.image == "string" ? initialValue.image : ""}
        />
      )}

      <Form.Item>
        <Button
          loading={isPending}
          style={{ width: "150px" }}
          htmlType="submit"
        >
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
