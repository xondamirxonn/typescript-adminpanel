import { useQuery } from "@tanstack/react-query";
import request from "./../../../../config/request";

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

export const useGetBrand = () => {
  return useQuery({
    queryKey: ["brand"],
    queryFn: () => request.get<Brands>("/brand/").then((res) => res.data),
  });
};
