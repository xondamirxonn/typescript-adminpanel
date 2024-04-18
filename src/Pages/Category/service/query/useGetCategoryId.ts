import { useQuery } from '@tanstack/react-query'
import request from '../../../../config/request'

export const useGetCategoryId = (id: string | undefined) => {
  return useQuery({
    queryKey: ["category_id"],
    queryFn: () => request.get(`/category/${id}/`).then((res) => res.data),
  });
};
