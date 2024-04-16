import { useParams } from "react-router-dom";
import { useEditBanner } from "./services/mutation/useEditBanner";
import { useGetBannerSingleData } from "./services/query/useGetBannerSingleData";
import { BannerForm } from "../../Components/Banner-Form/Banner-Form";
import { Spin, message } from "antd";
interface BannerType {
  count: null | number;
  next: null | number;
  previous: null | number;

  created_at: string;
  description: string;
  id: number;
  image: {
    file: File;
    fileList: FileList;
  };
  title: string;
  updated_at: string;
}
export const BannerSingleData = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetBannerSingleData(id);
  const { mutate, isPending } = useEditBanner(id);
  console.log(id);
  console.log(data);
  const EditBanner = (data: BannerType) => {
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("description", data.description);
    if (data.image && (data.image.file as File))
      formData.append("image", data.image.file);
    mutate(formData, {
      onSuccess: () => {
        message.success("Success");
      },
      onError: (error) => {
        message.error(error.name);
      },
    });
  };
  return isLoading ? (
    <Spin fullscreen size="large" />
  ) : (
    <div>
      <BannerForm
        submit={EditBanner}
        isPending={isPending}
        initialValues={data}
      />
    </div>
  );
};
