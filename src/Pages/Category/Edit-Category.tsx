import { useNavigate, useParams } from "react-router-dom";
import { Forms } from "../../Components/Form/Form";
import { useSingleEditData } from "./service/query/useSingleEditData";
import { useEditCategory } from "./service/mutation/useEditCategory";
import { Categories } from "../Create-Category/Create-category";
import { message } from "antd";

export const EditCategory = () => {
  const { id } = useParams();
  const { data } = useSingleEditData(id);
  const {mutate} = useEditCategory(id)
  const navigate = useNavigate()
  console.log(data);
  console.log(data?.title);

  console.log(id);
    const EditSubmit = (data: Categories) => {
      const formData = new FormData();
      formData.append("title", data.title);
      if (data.image) formData.append("image", data.image.file);
      formData.append("parent", "");

      mutate(formData, {
        onSuccess: () => {
          message.success("Category changed successfully");
          setTimeout(() => {
            navigate("/category")
          }, 3_500);
        },
        onError: () => {
          message.error("error");
        },
      });
    };

  return (
    <div>
      <Forms submit={EditSubmit} initialValues={{ title: data?.title, image: data?.image }} />
    </div>
  );
};
