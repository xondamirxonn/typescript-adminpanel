import { useQuery } from "@tanstack/react-query";
import request from "../../../../config/request";

interface SubCategory {
  count: number;
  next: null | string;
  previous: null | string;
  results: {
    id: number;
    title: string;
    image: string;
  }[];
}
export const useGetSubCategory = () => {
  return useQuery({
    queryKey: ["sub-category"],
    queryFn: () =>
      request.get<SubCategory>("/api/subcategory/").then((res) => res.data),
  });
};
