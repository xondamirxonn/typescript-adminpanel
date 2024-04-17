import { useQuery } from "@tanstack/react-query";
import request from "../../../../config/request";

export const useSearchBanner = (search: string) => {
  return useQuery({
    queryKey: ["search-banner", search],
    queryFn: () =>
      request.get("/banner/", { params: { search } }).then((res) => res.data),
  });
};
