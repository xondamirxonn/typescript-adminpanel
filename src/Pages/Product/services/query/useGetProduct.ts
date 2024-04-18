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
export const useGetProduct = () => {
  return useQuery({
    queryKey: ["product-pagination"],
    queryFn: () => {
      return request.get<ProductType>(`/product/`).then((res) => res.data);
    },
  });
};
