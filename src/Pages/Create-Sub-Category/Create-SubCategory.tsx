import { Tabs, TabsProps, message } from "antd";
import { SubCategoryForm } from "../../Components/SubCategory-Form/SubCategoryForm";
import { useCreateCategory } from "../Create-Category/service/mutation/useCreateCategory";
import { AttributeForm } from "../../Components/attribute-form/Attribute-Form";
import { useCreateAttribute } from "../Sub-Category/Attribute/services/mutation/useCreateAttribute";
import { useEffect, useState } from "react";
type Categories = {
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

interface AttributeType {
  items: {
    title: string;

    values: { value: string }[];
  }[];
}

export const CreateSubCategory = () => {
  const { mutate, isPending } = useCreateCategory();
  const { mutate: attribute } = useCreateAttribute();
  const [atrId, setAtrId] = useState("");
  const [activeKey, setActiveKey] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [formSubmit, setFormSubmit] = useState(false);
  const onChange = (key: string) => {
    console.log(key);
  };

  const attribueSubmit = (data: AttributeType) => {
    console.log(data);

    const attributes = data.items.map((item) => {
      return {
        attribute_id: null,
        title: item.title,
        values: item?.values?.map((item2) => {
          return { value: item2.value, value_id: null };
        }),
      };
    });
    const value = { attributes, category_id: atrId };
    attribute(value, {
      onSuccess: () => {
        message.success("Success");
        console.log(value);
      },
      onError: (error) => {
        message.error(error.message);
      },
    });
  };
  const SubCategoryAdd = (data: Categories) => {
    const formData = new FormData();

    formData.append("title", data.title);

    formData.append("parent", String(data.parent));
    if (data.image) {
      formData.append("image", data.image.file);
    }

    mutate(formData, {
      onSuccess: (res) => {
        console.log(res);
        setAtrId(String(res.data.id));
        message.success("Subcategory added successfully");
        setFormSubmit(true);
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
      label: "Create Sub Category",
      children: (
        <SubCategoryForm isPending={isPending} submit={SubCategoryAdd} />
      ),
    },
    {
      key: "2",
      label: "Create Attribute",
      children: <AttributeForm submit={attribueSubmit} />,
      disabled: disabled,
    },
  ];
  return <Tabs activeKey={activeKey} items={items} onChange={onChange} />;
};
