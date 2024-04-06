import { useQuery } from "@tanstack/react-query";
import request from "../../../../config/request";

interface Brands {
  count: number;
  next: string | null;
  previous: string | null;
  results: {
    id: string;
    image: string;
    title: string;
  }[];
}

export const useFilterPaginationBran = (
  id: string = "id",
  page: number = 1
) => {
  console.log(id, page);

  return useQuery({
    queryKey: ["pagination-brand", id, page],
    queryFn: () => {
      return request
        .get<Brands>(`/brand/?ordering=${id}`, {
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
