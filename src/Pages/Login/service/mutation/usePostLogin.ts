import { useMutation } from "@tanstack/react-query";
import request from "../../../../config/request";

interface Login {
  phone_number: string;
  password: string;
}
export const usePostLogin = () => {
  return useMutation({
    mutationFn: (data: Login) =>
      request.post("/api/admin-login/", data).then((res) => res.data),
  });
};
