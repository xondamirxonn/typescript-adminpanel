import { useQuery } from "@tanstack/react-query";
import { request } from "../../../../config/request";


 interface Category {
   title: string;
   id: number;
   image: string;
 }
export const useGetCategory = () => {
 
  return useQuery({
    queryKey: ["category"],
    queryFn: () => request.get<Category>("/category/").then((res) => res.data),
  });
};
