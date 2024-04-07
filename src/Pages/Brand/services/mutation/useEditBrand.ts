import { useMutation } from "@tanstack/react-query";
import request from "../../../../config/request";

interface BrandType {
  id: string;
  title: string;
  parent: {
    id: string;
    title: string;
  };
  image?: {
    file: File;
    fileList: FileList;
  };
}

export const useEditBrand = (id: string | undefined) => {
  return useMutation({
    mutationFn: (data: FormData) =>
      request
        .patch<BrandType>(`/brand/${id}/`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => res.data),
  });
};
