import { Button, Form, Input, message } from "antd";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { SignInWithGoogle } from "../SignInWithGoogle";

export const SignIn = () => {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = async (values) => {
    const userExists = await axios.get(
      `http://localhost:4000/users?email=${values.email}`
    );
    if (!userExists.data.length) {
      return messageApi.open({
        type: "error",
        content: "User account does not exists",
      });
    }
    if (
      userExists.data[0].password &&
      userExists.data[0].password !== values.password
    ) {
      return messageApi.open({
        type: "error",
        content: "User password is incorrect",
      });
    }
    localStorage.setItem("user", JSON.stringify(userExists.data[0]));
    messageApi.open({
      type: "success",
      content: "User logged in successfully",
    });
    navigate("/");
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {contextHolder}
      <h1>Log in</h1>
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      <h4>OR</h4>
      <SignInWithGoogle />
      <p>
        Don't have an account? <Link to="/sign-up">Sign up</Link>
      </p>
    </div>
  );
};
