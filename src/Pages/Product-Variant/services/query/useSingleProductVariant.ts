import { useQuery } from "@tanstack/react-query";
import request from "../../../../config/request";

export const useSingleProductVariant = (id: string | undefined) => {
  return useQuery({
    queryKey: ["product-variant-single"],
    queryFn: () =>
      request.get(`/product_variant/${id}/`).then((res) => res.data),
  });
};
