import { useQuery } from "@tanstack/react-query";
import request from "../../../../config/request";

export const useGetBannerSingleData = (id: string | undefined) => {
  return useQuery({
    queryKey: ["banner-single", id],
    queryFn: () => request.get(`/banner/${id}/`).then((res) => res.data),
  });
};
