import { useQuery } from "@tanstack/react-query";
import request from "../../../../config/request";
interface ProductType {
  count: number;
  next: null | string;
  previous: null | string;
  results: {
    category: number;
    id: number;
    image: string;
    is_available: boolean;
    is_new: boolean;
    price: string;
    title: string;
  }[];
}
export const useSearchProduct = (search: string) => {
  return useQuery({
    queryKey: ["search-product", search],
    queryFn: () =>
      request
        .get<ProductType>("/product/", { params: { search } })
        .then((res) => res.data),
  });
};
