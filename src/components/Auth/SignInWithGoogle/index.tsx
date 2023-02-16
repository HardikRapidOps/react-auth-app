import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useAddUserData } from "../../../hooks/useUserData";

type JwtDecodeProps = {
  email: string;
  name: string;
  given_name: string;
  sub: string;
};

export const SignInWithGoogle = () => {
  const navigate = useNavigate();

  const { mutate: addUser } = useAddUserData();

  const successHandler = async (credentialResponse: {
    credential?: string;
  }) => {
    const userData = jwtDecode<JwtDecodeProps>(
      credentialResponse.credential ?? ""
    );
    const userExists = await axios.get(
      `http://localhost:4000/users?email=${userData.email}`
    );
    const userObj = {
      email: userData.email,
      fullName: userData.name,
      username: userData.given_name,
      sub: userData.sub,
    };
    if (!userExists.data.length) {
      addUser(userObj);
    }
    localStorage.setItem("user", JSON.stringify(userObj));
    navigate("/");
  };

  const errorHandler = () => {
    console.log("Login Failed");
  };

  return (
    <GoogleLogin onSuccess={successHandler} onError={errorHandler} useOneTap />
  );
};
