import { useMutation } from "@tanstack/react-query";
import { request } from "../../../../config/request";
interface LoginData {
  phone_number: string;
  password: string;
}
export const usePostLogin = () => {
  return useMutation({
    mutationFn: (data: LoginData) =>
      request.post("api/admin-login", data).then((res) => res.data),
  });
};
