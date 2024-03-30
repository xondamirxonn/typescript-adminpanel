import { useParams } from "react-router-dom";
import { useEditCategory } from "../Category/service/mutation/useEditCategory";
import { useSingleEditData } from "../Category/service/query/useSingleEditData";
import { Spin, Tabs, TabsProps, message } from "antd";
import { Forms } from "../../Components/Form/Form";
import { AttributeForm } from "../../Components/attribute-form/Attribute-Form";
// import { useEditAttribute } from "./Attribute/services/mutation/useEditAttribute";

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
export const EditSubCategory = () => {
  const { id } = useParams();
  const { data, isLoading } = useSingleEditData(id);
  // const { mutate: editAttribute } = useEditAttribute(id);
  console.log(data);

 
  const { mutate } = useEditCategory(id);
  // const {mutate: deleteAttribute} = useDeleteAttribute()
  // const queryClient = useQueryClient()
  console.log(data);

  const EditSubCategory = (data: SubCategroyEdit) => {
    const formData = new FormData();
    formData.append("title", data.title);
    if (data.image) formData.append("image", data.image.file);

    mutate(formData, {
      onSuccess: () => {
        message.success("Sub Category changed successfully");
        // setTimeout(() => {
        //   navigate("/category");
        // }, 3_500);
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
      children: <AttributeForm  />,
    },
  ];
  return isLoading ? (
    <Spin fullscreen />
  ) : (
    <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
  );
};
