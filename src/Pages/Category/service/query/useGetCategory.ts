import { useQuery } from "@tanstack/react-query";
import request from "../../../../config/request";

export interface CategoryType {
  count: number;
  next: null | string;
  previous: null | string;
  results: {
    children: {}[];
    id: number;
    image: string;
    title: string;
  }[];
}
export const useGetCategory = (id: string = "id", page: number = 1) => {
  console.log(id, page);

  return useQuery({
    queryKey: ["category", id, page],
    queryFn: () => {
      return request
        .get<CategoryType>(`/category/?ordering=${id}`, {
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
