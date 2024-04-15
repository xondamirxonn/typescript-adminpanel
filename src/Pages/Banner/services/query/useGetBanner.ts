import { useQuery } from "@tanstack/react-query";
import request from "../../../../config/request";
interface BannerType {
  count: null | number;
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
export const useGetBanner = () => {
  return useQuery({
    queryKey: ["banner"],
    queryFn: () => request.get<BannerType>("/banner/").then((res) => res.data),
  });
};
