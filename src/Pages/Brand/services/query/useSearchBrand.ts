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

export const useSearchBrand = (title = "") => {
  return useQuery({
    queryKey: ["search-brand", title],
    queryFn: () =>
      request
        .get<Brands>("/brand/", { params: { search: title } })
        .then((res) => res.data),
  });
};
