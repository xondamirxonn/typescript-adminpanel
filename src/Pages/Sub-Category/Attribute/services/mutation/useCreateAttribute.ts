import { useMutation } from "@tanstack/react-query";
import request from "../../../../../config/request";
interface Attribute {
  attributes: {
    attribute_id: null;
    title: string;
    values: {
      value: string;
      value_id: null;
    }[];
  }[];
  category_id: string | null | undefined;
}
export const useCreateAttribute = () => {
  return useMutation({
    mutationFn: (data: Attribute) =>
      request
        .patch<Attribute>("/api/category_edit/", data)
        .then((res) => res.data),
  });
};
