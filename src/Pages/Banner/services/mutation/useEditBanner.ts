import { useMutation } from "@tanstack/react-query";
import request from "../../../../config/request";

export const useEditBanner = (id: string | undefined) => {
  return useMutation({
    mutationFn: (data: FormData) =>
      request
        .patch(`/banner/${id}/`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => res.data),
  });
};
