import { useQuery } from "@tanstack/react-query";
import request from "../../../../config/request";
import { CreateCategory } from "../../../Create-Category/service/mutation/useCreateCategory";

export const useSingleEditData = (id: string | undefined) => {
  return useQuery({
    queryKey: ["single-data", id],
    queryFn: () =>
      request.get<CreateCategory>(`/category/${id}/`).then((res) => res.data),
  });
};
