import { useMutation } from "@tanstack/react-query";
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

export const useCreateProduct = () => {
  return useMutation({
    mutationFn: (data: FormData) =>
      request
        .post<ProductType>("/product/", data, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => res.data),
  });
};
