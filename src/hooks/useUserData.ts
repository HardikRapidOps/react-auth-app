import axios from "axios";
import { useMutation, useQuery } from "react-query";

type AddUserProps = {
  email: string;
  fullName: string;
  username: string;
  sub?: string;
  password?: string;
};

type UseUserDataProps = {
  enabled: boolean;
  email: string;
};

const fetchUser = (email: string) => {
  return axios.get(`http://localhost:4000/users?email=${email}`);
};

const addUser = (user: AddUserProps) => {
  return axios.post("http://localhost:4000/users", user);
};

export const useUserData = ({ enabled = true, email }: UseUserDataProps) => {
  return useQuery(["users", email], () => fetchUser(email), {
    enabled,
  });
};

export const useAddUserData = () => {
  return useMutation(addUser);
};
