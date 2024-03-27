import { useMutation } from "@tanstack/react-query";
import request from "../../../../config/request";

export const useDeleteSubCategory = () => {
  return useMutation({
    mutationFn: (id: string) =>
      request.delete(`/category/${id}/`).then((res) => res.data),
  });
};
