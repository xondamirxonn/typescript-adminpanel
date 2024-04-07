import { useMutation } from "@tanstack/react-query";
import request from "../../../../config/request";

interface BrandType {
  id: number;
  title: string;
  image: string;
}

export const useCreateBrand = () => {
  return useMutation({
    mutationFn: (data: FormData) =>
      request
        .post<BrandType>("/brand/", data, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => res.data),
  });
};
