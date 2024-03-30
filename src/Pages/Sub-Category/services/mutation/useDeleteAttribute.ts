import { useMutation } from "@tanstack/react-query";
import request from "../../../../config/request";

export const useDeleteAttribute = () => {
  return useMutation({
    mutationFn: (id: string) =>
      request.delete(`/category_edit/${id}/`).then((res) => res.data),
  });
};
