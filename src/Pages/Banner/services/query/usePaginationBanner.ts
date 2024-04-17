import { useQuery } from "@tanstack/react-query";
import request from "../../../../config/request";
interface BannerType {
  count: number;
  next: null | number;
  previous: null | number;
  results: {
    created_at: string;
    description: null | string;
    id: number;
    image: string;
    title: string;
    updated_at: string;
  }[];
}
export const usePaginationBanner = (id: string = "id", page: number = 1) => {
  return useQuery({
    queryKey: ["category", id, page],
    queryFn: () => {
      return request
        .get<BannerType>(`/banner/?ordering=${id}`, {
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
