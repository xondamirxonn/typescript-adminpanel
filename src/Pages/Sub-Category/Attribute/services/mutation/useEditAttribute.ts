import { useMutation } from "@tanstack/react-query";
import request from "../../../../../config/request";

export const useEditAttribute = (id: string) => {
  return useMutation({
    mutationFn: (data) =>
      request.patch(`/category_edit/${id}/`, data).then((res) => res.data),
  });
};
