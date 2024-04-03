import { useQuery } from "@tanstack/react-query";
import request from "../../../../../config/request";

export const useGetAttribute = () => {
  return useQuery({
    queryKey: ["attribute-data"],
    queryFn: (data) => request.get("/attribute/", data).then((res) => res.data),
  });
};
