import { useCreateCategory } from "./service/mutation/useCreateCategory";

import { Forms } from "../../Components/Form/Form";
import { Tabs, TabsProps, message } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export type Categories = {
  id: string;
  title: string;
  image?: {
    file: File;
    fileList: FileList;
  };
};
export const CreateCategory = () => {
  const { mutate } = useCreateCategory();
  const [activeKey, setActiveKey] = useState("1");
  const [disabled, setDisabled] = useState(true);
  const [categoryId, setCategoryId] = useState();
  const [formSubmit, setFormSubmit] = useState(false);
  const navigate = useNavigate()
  const addCategory = (data: Categories) => {
    const formData = new FormData();
    formData.append("title", data.title);
    if (data.image) formData.append("image", data.image.file);
    formData.append("parent", "");

    mutate(formData, {
      onSuccess: (res) => {
        message.success("Category added successfully");
        setFormSubmit(true);
        setCategoryId(res);
        console.log(res);
        
      },
      onError: () => {
        message.error("error");
      },
    });
  };

  const SubCategoryCreate = (data: Categories) => {
    const formData = new FormData();

    formData.append("title", data.title);

    formData.append("parent", categoryId?.data.id);
    if (data.image) {
      formData.append("image", data.image.file);
    }

    mutate(formData, {
      onSuccess: (res) => {
        console.log(res);

        message.success("Subcategory added successfully");
        setFormSubmit(true);
        setTimeout(() => {
          navigate("/category")
        }, 3_500);
      },
      onError: (error) => {
        message.error(error.name);
      },
    });
  };
  useEffect(() => {
    if (formSubmit) {
      setActiveKey("2");
      setDisabled(false);
    }
  });

  const onChange = (key: string) => {
    console.log(key);
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Create Category",
      children: <Forms submit={addCategory} />,
    },
    {
      key: "2",
      label: `Create Sub Category`,
      children: <Forms submit={SubCategoryCreate} />,
      disabled: disabled,
    },
  ];
  console.log(items);

  return (
    // <Form
    //   name="basic"
    //   labelCol={{ span: 8 }}
    //   wrapperCol={{ span: 16 }}
    //   style={{ maxWidth: 600 }}
    //   initialValues={{ remember: true }}
    //   onFinish={addCategory}
    //   onFinishFailed={onFinishFailed}
    //   autoComplete="off"
    // >
    //   <Form.Item<Categories>
    //     label="title"
    //     name="title"
    //     rules={[{ required: true, message: "Please input your title!" }]}
    //   >
    //     <Input />
    //   </Form.Item>
    //   <Form.Item<Categories> name={"image"}>
    //     <Dragger
    //       listType="picture-card"
    //       multiple={false}
    //       maxCount={1}
    //       {...props}
    //     >
    //       <p className="ant-upload-drag-icon">
    //         {" "}
    //         <InboxOutlined />
    //       </p>
    //       <p className="ant-upload-text">
    //         Click or drag file to this area to upload
    //       </p>
    //       <p className="ant-upload-hint">
    //         Support for a single or bulk upload. Strictly prohibited from
    //         uploading company data or other banned files.
    //       </p>
    //     </Dragger>
    //   </Form.Item>
    //   <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
    //     <Button type="primary" htmlType="submit">
    //       Submit
    //     </Button>
    //   </Form.Item>
    // </Form>
    // <Forms submit={addCategory} />
    <Tabs activeKey={activeKey} items={items} onChange={onChange} />
  );
};
