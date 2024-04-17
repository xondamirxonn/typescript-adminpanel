import { useQuery } from "@tanstack/react-query";
import request from "../../../../config/request";
interface ProductVariantType {
  count: number;
  next: null | string;
  previous: null | string;
  results: {
    attribute_value: [];
    id: number;
    images: [];
    is_available: boolean;
    other_detail: string;
    price: string;
    price_with_discount: null | string;
    product: number;
    quantity: number;
    title: string;
  }[];
}
export const useGetProductVariant = () => {
  return useQuery({
    queryKey: ["product-variant"],
    queryFn: () =>
      request
        .get<ProductVariantType>("/product_variant/")
        .then((res) => res.data),
  });
};
