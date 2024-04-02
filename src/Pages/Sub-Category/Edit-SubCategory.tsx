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

// interface DataType {
//   key: string;
//   image: string;
//   id: string;
//   title: string;
// }
interface AttributeType {
  items: { title: string; values: { value: string }[] }[];
}
export const EditSubCategory = () => {
  const { id } = useParams();
  const { data, isLoading } = useSingleEditData(id);
  console.log(data);

  const { mutate } = useEditCategory(id);
  const { mutate: editAttribute } = useCreateAttribute();

  console.log(data);

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
    const value = { attributes, category_id: null };
    editAttribute(value, {
      onSuccess: () => {
        message.success("Success");
        console.log(value);
      },
      onError: (error) => {
        message.error(error.message);
      },
    });
  };

  const onChange = (key: string) => {
    console.log(key);
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Edit Sub Category",
      children: (
        <Forms
          submit={EditSubCategory}
          initialValues={{ title: data?.title, image: data?.image }}
        />
      ),
    },
    {
      key: "2",
      label: "Attributes",
      children: (
        <AttributeForm
          submit={editAttributeSubmit}
          initialValue={data}
          data={data}
        />
      ),
    },
  ];
  return isLoading ? (
    <Spin fullscreen />
  ) : (
    <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
  );
};
