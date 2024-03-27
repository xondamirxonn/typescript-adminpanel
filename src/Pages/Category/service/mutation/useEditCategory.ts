import { useMutation } from "@tanstack/react-query";
import request from "../../../../config/request";
import { CreateCategory } from "../../../Create-Category/service/mutation/useCreateCategory";

export const useEditCategory = (id: string | undefined) => {
  return useMutation({
    mutationFn: (data: FormData) =>
      request
        .put<CreateCategory>(`/category/${id}/`, data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => res.data),
  });
};
