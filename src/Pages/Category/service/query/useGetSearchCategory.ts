import { useQuery } from "@tanstack/react-query";

import request from "../../../../config/request";
import { CategoryType } from "./useGetCategory";

export const useGetSearchCategory = (title = "") => {
  return useQuery({
    queryKey: ["search-category", title],
    queryFn: () =>
      request
        .get<CategoryType>("/category/", { params: { search: title } })
        .then((res) => res.data),
  });
};
