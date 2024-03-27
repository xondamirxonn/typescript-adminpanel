import { Button, Form, type FormProps, Input } from "antd";
import { usePostLogin } from "./service/mutation/usePostLogin";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export const Login = () => {
  const token = Cookies.get("user-token");
  if (token) {
    window.location.replace("/");
  }
  type Login = {
    phone_number: string;
    password: string;
  };
  const onFinishFailed: FormProps<Login>["onFinishFailed"] = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const { mutate } = usePostLogin();
  const navigate = useNavigate();
  const onFinish = (data: Login) => {
    console.log(data);

    mutate(data, {
      onSuccess: (data) => {
        navigate("/");
        Cookies.set("user-token", data.token, { expires: 7 });
        
      },
    });
    console.log(data);
  };
  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ display: "grid", justifyContent: "center" }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item<Login>
        label="Username"
        name="phone_number"
        rules={[{ required: true, message: "Please input your username!" }]}
        style={{ width: "600px" }}
      >
        <Input  />
      </Form.Item>

      <Form.Item<Login>
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
