import { message } from "antd";
import { Forms } from "../../Components/Form/Form";
import { useCreateBrand } from "./services/mutation/useCreateBrand";

interface BrandType {
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
}

export const CreateBrand = () => {
  const { mutate } = useCreateBrand();

  const CreateBrand = (data: BrandType) => {
    const formData = new FormData();
    formData.append("title", data.title);
    if (data.image) formData.append("image", data.image.file);
    // formData.append("parent", "");
    mutate(formData, {
      onSuccess: () => {
        message.success("Success");
      },
      onError: (error) => {
        message.error(error.name);
      },
    });
  };
  return <Forms submit={CreateBrand} />;
};
