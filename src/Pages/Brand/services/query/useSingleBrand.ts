import { useQuery } from "@tanstack/react-query";
import request from "../../../../config/request";

interface BrandType {
  id: string;
  title: string;
  parent: {
    id: string;
    title: string;
  };
  image?: {
    file: File;
    fileList: FileList;
  };
}

export const useSingleBrand = (id: string | undefined) => {
  return useQuery({
    queryKey: ["brand-single", id],
    queryFn: () =>
      request.get<BrandType>(`/brand/${id}/`).then((res) => res.data),
  });
};
