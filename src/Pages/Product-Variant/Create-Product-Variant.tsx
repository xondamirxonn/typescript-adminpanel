import { useGetProduct } from "../Product/services/query/useGetProduct";

export const CreateProductVariant = () => {
  const { data } = useGetProduct();

  console.log(data);

  return <div>Create-Product-Variant</div>;
};
