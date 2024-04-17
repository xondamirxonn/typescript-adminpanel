import { useQuery } from "@tanstack/react-query";
import request from "../../../../config/request";
interface SubCategoryType {
  count: number;
  next: string | null;
  previous: null | string;
  results: {
    id: number;
    image: string;
    parent: { id: number; title: string }[];
    title: string;
  }[];
}
export const usePaginationSubCategory = (
  id: string = "id",
  page: number = 1
) => {
  return useQuery({
    queryKey: ["category", id, page],
    queryFn: () => {
      return request
        .get<SubCategoryType>(`/api/subcategory/?ordering=${id}`, {
          params: { offset: page, limit: 5 },
        })
        .then((res) => {
          return {
            data: res.data,
            pageSize: Math.ceil(res.data.count),
          };
        });
    },
  });
};
