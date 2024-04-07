import { useQuery } from "@tanstack/react-query";
import request from "../../../../config/request";

export const useSingleProduct = (id: string | undefined) => {
  return useQuery({
    queryKey: ["prodcut-single"],
    queryFn: () => request.get(`/product/${id}/`).then((res) => res.data),
  });
};
