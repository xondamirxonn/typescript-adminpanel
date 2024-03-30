import { useMutation } from "@tanstack/react-query";
import request from "../../../../../config/request";
interface Attribute {
  attributes: {
    attribute_id: null | string;
    title: string;
    values: {
      value: string;
      value_id: null | string;
    }[];
  }[];
  category_id: string;
}
export const useCreateAttribute = () => {
  return useMutation({
    mutationFn: (data: Attribute) =>
      request
        .patch<Attribute>("/api/category_edit/", data)
        .then((res) => res.data),
  });
};
