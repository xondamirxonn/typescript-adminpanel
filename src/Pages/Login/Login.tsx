import { Button, Form, type FormProps, Input, Card, message } from "antd";
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
  const { mutate, isPending } = usePostLogin();
  const navigate = useNavigate();
  const onFinish = (data: Login) => {
    console.log(data);

    mutate(data, {
      onSuccess: (data) => {
        navigate("/");
        Cookies.set("user-token", data.token, { expires: 7 });
      },
      onError: () => {
        message.error("Username or Password is invalide");
      },
    });
    console.log(data);
  };
  return (
    <div
      style={{
        // background: "rgb(206,199,207)",
        background:
          "linear-gradient(281deg, rgba(206,199,207,1) 0%, rgba(162,190,199,1) 19%, rgba(214,205,221,1) 38%, rgba(177,220,227,1) 59%, rgba(193,192,212,1) 78%, rgba(148,170,233,1) 100%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
        padding: 0,
        margin: 0,
      }}
    >
      <Card

        title="Login"
        hoverable
        style={{
          width: "40%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          cursor: "context-menu"
        }}
      >
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{
            display: "grid",
            justifyContent: "center",
            marginLeft: "35%",
          }}
          initialValues={{
            phone_number: "+" + 998977109944,
            password: 87654321,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item<Login>
            label="Username"
            name="phone_number"
            rules={[{ required: true, message: "Please input your username!" }]}
            style={{ width: "600px" }}
          >
            <Input />
          </Form.Item>

          <Form.Item<Login>
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button loading={isPending} type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};
