import { useMutation } from "@tanstack/react-query";
import request from "../../../../config/request";
interface CreateCategory {
  id: number;
  title: string;
  image: {
    file: File;
    fileList: FileList;
  };
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
