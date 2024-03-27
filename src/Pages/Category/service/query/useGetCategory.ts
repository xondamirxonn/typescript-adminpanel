import { useQuery } from "@tanstack/react-query";
import request from "../../../../config/request";

export interface CategoryType {
  count: number;
  next: null | string;
  previous: null | string;
  results: {
    children: [];
    id: number;
    image: string;
    title: string;
  }[];
}
export const useGetCategory = () => {
  return useQuery({
    queryKey: ["category"],
    queryFn: () => request.get<CategoryType>("/category/").then((res) => res.data),
  });
};
