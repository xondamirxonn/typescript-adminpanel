import { message } from "antd";
import { BannerForm } from "../../Components/Banner-Form/Banner-Form";
import { useCreateBanner } from "./services/mutation/useCreateBanner";
import { useNavigate } from "react-router-dom";
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
export const CreateBanner = () => {
  const { mutate, isPending } = useCreateBanner();
  const navigate = useNavigate();
  const CreateBannerSumbit = (data: BannerType) => {
    const formData = new FormData();
    formData.append("title", data.title);
    if (data.image) formData.append("image", data.image.file);
    formData.append("description", data.description);
    mutate(formData, {
      onSuccess: () => {
        message.success("Banner created successfully");
        navigate("/banner");
      },
      onError: (error) => {
        message.error(error.name);
      },
    });
  };
  return (
    <div>
      <BannerForm submit={CreateBannerSumbit} isPending={isPending} />
    </div>
  );
};
