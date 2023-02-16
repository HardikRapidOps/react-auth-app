import { SignOut } from "../Auth/SignOut";

export const Home = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <>
      <h2>Welcome {user?.fullName}</h2>
      <SignOut />
    </>
  );
};
