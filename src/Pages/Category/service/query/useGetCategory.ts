import { useQuery } from "@tanstack/react-query";

import request from "../../../../config/request";
import { CategoryType } from "./usePaginationGetCategory";

export const useGetCategory = () => {
  return useQuery({
    queryKey: ["category"],
    queryFn: () =>
      request.get<CategoryType>("/category/").then((res) => res.data),
  });
};
