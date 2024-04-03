import { useParams } from "react-router-dom";
import { useEditCategory } from "../Category/service/mutation/useEditCategory";
import { useSingleEditData } from "../Category/service/query/useSingleEditData";
import { Spin, Tabs, TabsProps, message } from "antd";
import { Forms } from "../../Components/Form/Form";
import { AttributeForm } from "../../Components/attribute-form/Attribute-Form";
import { useCreateAttribute } from "./Attribute/services/mutation/useCreateAttribute";

export type SubCategroyEdit = {
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

interface AttributeType {
  items: { title: string; values: { value: string }[] }[];
}
export const EditSubCategory = () => {
  const { id } = useParams();
  const { data: subCategory, isLoading } = useSingleEditData(id);
  const { mutate } = useEditCategory(id);
  const { mutate: editAttribute } = useCreateAttribute();

  const EditSubCategory = (data: SubCategroyEdit) => {
    const formData = new FormData();
    formData.append("title", data.title);
    if (data.image) formData.append("image", data.image.file);

    mutate(formData, {
      onSuccess: () => {
        message.success("Sub Category changed successfully");
      },
      onError: () => {
        message.error("error");
      },
    });
  };

  const editAttributeSubmit = (data: AttributeType) => {
    const attributes = data.items.map((item) => {
      return {
        attribute_id: null,
        title: item.title,
        values: item?.values?.map((item2) => {
          return { value: item2.value, value_id: null };
        }),
      };
    });

    const value = { attributes, category_id: subCategory?.id };
    editAttribute(value, {
      onSuccess: () => {
        message.success("Success");
      },
      onError: (error) => {
        message.error(error.message);
      },
    });
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Edit Sub Category",
      children: (
        <Forms
          submit={EditSubCategory}
          initialValues={{
            title: subCategory?.title,
            image: subCategory?.image,
          }}
        />
      ),
    },
    {
      key: "2",
      label: "Attributes",
      children: (
        <AttributeForm
          submit={editAttributeSubmit}
          initialValue={subCategory}
          data={subCategory}
        />
      ),
    },
  ];
  return isLoading ? (
    <Spin fullscreen />
  ) : (
    <Tabs defaultActiveKey="1" items={items} />
  );
};
