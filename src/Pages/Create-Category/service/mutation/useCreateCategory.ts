import { useMutation } from "@tanstack/react-query";
import request from "../../../../config/request";
export interface CreateCategory {
  id: string;
  title: string;
  image: {
    file: File;
    fileList: FileList;
  };
  children: {
    id: string;
    title: string;
    image: string;
  };
  attributes: {
    id: string | null;
    title: string;
    values: {
      id: string | null;
      value: string;
    }[];
  }[];
}
export const useCreateCategory = () => {
  return useMutation({
    mutationFn: (data: FormData) =>
      request
        .post<CreateCategory>("/category/", data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => res.data),
  });
};
