import { useQuery } from "@tanstack/react-query";
import request from "../../../../../config/request";

interface AttributeType {
  count: number;
  next: null | number;
  previous: null | number;
  results: {
    id: string;
    category: {}[];
    category_title: {
      title: string;
    }[];
    title: string;
    values: {
      id: string;
      value: string;
    }[];
  }[];
}

export const useGetAttribute = () => {
  return useQuery({
    queryKey: ["attribute-data"],
    queryFn: (data) =>
      request.get<AttributeType>("/attribute/", data).then((res) => res.data),
  });
};
