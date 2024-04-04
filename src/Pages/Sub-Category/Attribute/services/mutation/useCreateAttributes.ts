import { useMutation } from "@tanstack/react-query";
import request from "../../../../../config/request";
interface CreateAttribute {
  title: string;
  category: {}[];
  values: {
    value: string;
  }[];
}
export const useCreateAttributes = () => {
  return useMutation({
    mutationFn: (data: CreateAttribute) =>
      request
        .post<CreateAttribute>("/attribute/", { attr_list: [data] })
        .then((res) => res.data),
  });
};
