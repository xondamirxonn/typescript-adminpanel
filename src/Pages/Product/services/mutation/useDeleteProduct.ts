import { useMutation } from "@tanstack/react-query";
import request from "../../../../config/request";

export const useDeleteProduct = () => {
  return useMutation({
    mutationFn: (id: number) =>
      request.delete(`/product/${id}/`).then((res) => res.data),
  });
};
