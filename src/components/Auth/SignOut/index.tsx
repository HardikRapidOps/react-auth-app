import { Button } from "antd";
import { useNavigate } from "react-router-dom";

export const SignOut = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/sign-in");
  };

  return (
    <Button danger onClick={logout}>
      Log out
    </Button>
  );
};
