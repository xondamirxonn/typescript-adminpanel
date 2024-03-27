import { Tabs, TabsProps, message } from "antd";
import { Link } from "react-router-dom";
import { SubCategoryForm } from "../../Components/SubCategory-Form/SubCategoryForm";
import { useCreateCategory } from "../Create-Category/service/mutation/useCreateCategory";
type Categories = {
  title: string;
  image?: {
    file: File;
    fileList: FileList;
  };
  parent: number,
  children: {
    id: number;
    title: string;
    parent: {
      id?: number;
    };
  };
};

export const CreateSubCategory = () => {
  const { mutate, isPending } = useCreateCategory();

  const onChange = (key: string) => {
    console.log(key);
  };
  const SubCategoryAdd = (data: Categories) => {
    const formData = new FormData();
    console.log(data);

    formData.append("title", data.title);
    
      formData.append("parent",data.parent);
    if (data.image) {
      formData.append("image", data.image.file);
    }

    mutate(formData, {
      onSuccess: (res) => {
        console.log(res);
        message.success("Subcategory added successfully");
      },
    });
  };
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: <Link to={"/create-category"}>Create Category</Link>,
    },
    {
      key: "2",
      label: <Link to={"/create-sub-category"}>Create Sub Category</Link>,
      children: <SubCategoryForm isPending={isPending} submit={SubCategoryAdd}  />,
    },
  ];
  return <Tabs defaultActiveKey="2" items={items} onChange={onChange}  />;
};
