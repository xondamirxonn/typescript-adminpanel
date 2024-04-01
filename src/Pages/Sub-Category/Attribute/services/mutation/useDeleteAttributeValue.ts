import { useMutation } from "@tanstack/react-query";
import request from "../../../../../config/request";

export const useDeleteAttributeValue = () => {
  return useMutation({
    mutationFn: (id: string) =>
      request.delete(`/attribute-value/${id}/`).then((res) => res.data),
  });
};
