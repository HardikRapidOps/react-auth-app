import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useAddUserData } from "../../../hooks/useUserData";

export const SignInWithGoogle = () => {
  const navigate = useNavigate();

  const { mutate: addUser } = useAddUserData();

  const successHandler = async (credentialResponse) => {
    const userData = jwtDecode(credentialResponse.credential);
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

  const errorHandler = (error) => {
    console.log("Login Failed", error);
  };

  return (
    <GoogleLogin onSuccess={successHandler} onError={errorHandler} useOneTap />
  );
};
