import { useQuery } from "@tanstack/react-query";
import request from "../../../../config/request";

interface ProductType {
  count: number;
  next: null | string;
  previous: null | string;
  results: {
    category: number;
    id: number;
    image: string;
    is_available: boolean;
    is_new: boolean;
    price: string;
    title: string;
  }[];
}
export const useGetPaginationProduct = (
  id: string = "id",
  page: number = 1
) => {
  console.log(id, page);

  return useQuery({
    queryKey: ["product", id, page],
    queryFn: () => {
      return request
        .get<ProductType>(`/product/?ordering=${id}`, {
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
