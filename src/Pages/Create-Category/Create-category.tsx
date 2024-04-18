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
  const { mutate, isPending } = useCreateCategory();
  const [activeKey, setActiveKey] = useState("1");
  const [disabled, setDisabled] = useState(true);
  const [categoryId, setCategoryId] = useState("");
  const [formSubmit, setFormSubmit] = useState(false);
  const navigate = useNavigate();
  const addCategory = (data: Categories) => {
    const formData = new FormData();
    formData.append("title", data.title);
    if (data.image) formData.append("image", data.image.file);
    formData.append("parent", "");

    mutate(formData, {
      onSuccess: (res) => {
        message.success("Category created successfully");
        setFormSubmit(true);
        setCategoryId(String(res.data.id));
      },
      onError: () => {
        message.error("error");
      },
    });
  };

  const SubCategoryCreate = (data: Categories) => {
    const formData = new FormData();

    formData.append("title", data.title);

    formData.append("parent", categoryId);
    if (data.image) {
      formData.append("image", data.image.file);
    }

    mutate(formData, {
      onSuccess: () => {
        message.success(
          "SubCategory created successfully"
        );
        setFormSubmit(true);

        navigate("/category");
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

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Create Category",
      children: <Forms isPending={isPending} submit={addCategory} />,
    },
    {
      key: "2",
      label: `Create Sub Category`,
      children: <Forms isPending={isPending} submit={SubCategoryCreate} />,
      disabled: disabled,
    },
  ];

  return <Tabs activeKey={activeKey} items={items} />;
};
