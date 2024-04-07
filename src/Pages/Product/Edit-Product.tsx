import { Spin, message } from "antd";
import { ProductForm } from "../../Components/Product-Form/Product-Form";
import { useSingleProduct } from "./services/query/useSingleProduct";
import { useParams } from "react-router-dom";
import { useEditProduct } from "./services/mutation/useEditProduct";

interface EditProductType {
  count: number;
  next: null | string;
  previous: null | string;

  category: string;
  id: number;
  image: {
    file: File;
    fileList: FileList;
  };
  is_available: boolean;
  is_new: boolean;
  price: string;
  title: string;
}

export const EditProduct = () => {
  const { id } = useParams();
  const { data, isLoading } = useSingleProduct(id);
  const { mutate, isPending } = useEditProduct(id);
  console.log(id);
  console.log(data);

  const EditProduct = (data: EditProductType) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("price", data.price);
    formData.append("category", data.category);
    if (data.is_available === undefined) {
      formData.append("is_available", "false");
    } else {
      formData.append("is_available", data.is_available.toString());
    }
    if (data.is_new === undefined) {
      formData.append("is_new", "false");
    } else {
      formData.append("is_new", data.is_new.toString());
    }
    if (data.image) formData.append("image", data.image.file);
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
      <ProductForm
        isPending={isPending}
        submit={EditProduct}
        initialValue={data}
      />
    </div>
  );
};
