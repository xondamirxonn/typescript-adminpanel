import { useGetProductVariant } from "./services/query/useGetProductVariant";

export const ProductVariant = () => {
  const { data } = useGetProductVariant();
  console.log(data);

  return <div>Product Variant</div>;
};
