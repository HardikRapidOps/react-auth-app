import { Button, Form, Input, message } from "antd";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAddUserData } from "../../../hooks/useUserData";
import { SignInWithGoogle } from "../SignInWithGoogle";

type OnFinishProps = {
  email: string;
  fullName: string;
  username: string;
  password: string;
};

export const SignUp = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const { mutate: addUser } = useAddUserData();

  const onFinish = async (values: OnFinishProps) => {
    try {
      const userExists = await axios.get(
        `http://localhost:4000/users?email=${values.email}`
      );
      if (userExists.data.length) {
        return messageApi.open({
          type: "error",
          content: "User account already exists",
        });
      }
      addUser(values);
      messageApi.open({
        type: "success",
        content: "User account created successfully",
      });
    } catch (err) {
      console.log(err);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {contextHolder}
      <h1>Sign up</h1>
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
          label="Full name"
          name="fullName"
          rules={[
            {
              required: true,
              message: "Please input your full name!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
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
        Have an account? <Link to="/sign-in">Log in</Link>
      </p>
    </div>
  );
};
