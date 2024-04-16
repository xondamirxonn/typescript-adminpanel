import { useMutation } from "@tanstack/react-query";
import request from "../../../../config/request";
interface BannerType {
  count: null | number;
  next: null | number;
  previous: null | number;
  results: {
    created_at: string;
    description: null | string;
    id: number;
    image: string;
    title: string;
    updated_at: string;
  }[];
}
export const useCreateBanner = () => {
  return useMutation({
    mutationFn: (data: FormData) =>
      request
        .post<BannerType>("/banner/", data, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => res.data),
  });
};
