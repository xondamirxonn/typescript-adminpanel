import { useCreateCategory } from "./service/mutation/useCreateCategory";

import { Forms } from "../../Components/Form/Form";
import { Tabs, TabsProps, message } from "antd";
import { Link, } from "react-router-dom";

type Categories = {
  title: string;
  image?: {
    file: File;
    fileList: FileList;
  };
};
export const CreateCategory = () => {
  const { mutate } = useCreateCategory();

  const addCategory = (data: Categories) => {
    const formData = new FormData();
    formData.append("title", data.title);
    if (data.image) formData.append("image", data.image.file);
    formData.append("parent", "");

    mutate(formData, {
      onSuccess: () => {
        message.success("Category added successfully");
      },
      onError: () => {
        message.error("error");
      },
    });
  };

  const onChange = (key: string) => {
    console.log(key);
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Create Category",
      children: <Forms submit={addCategory} />
    },
    {
      key: "2",
      label: <Link to={"/create-sub-category"}>Create Sub Category</Link>,
    },
  ];

  // const submit = (value: TypeCategory) => {
  //   const formData = new FormData();
  //   formData.append("title", value.title);
  //   if (value.image) formData.append("image", value.image.file);
  //   formData.append("parent", "");

  //   mutate(formData, {
  //     onSuccess: () => {
  //       message.success("success");
  //     },
  //     onError: () => {
  //       message.error("error");
  //     },
  //   });
  //   console.log(formData);
  // };

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
    <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
  );
};
