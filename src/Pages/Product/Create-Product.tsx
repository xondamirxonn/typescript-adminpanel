import { message } from "antd";
import { ProductForm } from "../../Components/Product-Form/Product-Form";
import { useCreateProduct } from "./services/mutation/useCreateProduct";
import { useNavigate } from "react-router-dom";

interface ProductType {
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

export const CreateProduct = () => {
  const { mutate, isPending } = useCreateProduct();
  const navigate = useNavigate()
  const CreateProduct = (data: ProductType) => {
    
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
        message.success("success");
        navigate("/product")
      },
      onError: (error) => {
        message.error(error.message);
      },
    });
  };
  return (
    <div>
      <ProductForm isPending={isPending} submit={CreateProduct} />
    </div>
  );
};
