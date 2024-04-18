import { useNavigate, useParams } from "react-router-dom";
import { Forms } from "../../Components/Form/Form";
import { useEditBrand } from "./services/mutation/useEditBrand";
import { Spin, message } from "antd";
import { useSingleBrand } from "./services/query/useSingleBrand";
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
export const EditBrand = () => {
  const { id } = useParams();
  const { data, isLoading } = useSingleBrand(id);
  const { mutate, isPending } = useEditBrand(id);
  const navigate = useNavigate();
  const EditBrand = (data: BrandType) => {
    const formData = new FormData();
    formData.append("title", data.title);
    if (data.image) formData.append("image", data.image.file);

    mutate(formData, {
      onSuccess: () => {
        message.success("Brand changed successfully");
        navigate("/brand");
      },
      onError: (error) => {
        message.error(error.message);
      },
    });
  };
  return isLoading ? (
    <Spin fullscreen size="large" />
  ) : (
    <Forms
      isPending={isPending}
      submit={EditBrand}
      initialValues={{ title: data?.title, image: data?.image }}
    />
  );
};
