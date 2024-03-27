import { useMutation } from "@tanstack/react-query";
import request from "../../../../config/request";

export const useDeleteSubCategory = () => {
  return useMutation({
    mutationFn: (id: number) =>
      request.delete(`/category/${id}/`).then((res) => res.data),
  });
};
