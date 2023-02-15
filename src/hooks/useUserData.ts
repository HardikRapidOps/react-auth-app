import axios from "axios";
import { useMutation, useQuery } from "react-query";

const fetchUser = (email) => {
  return axios.get(`http://localhost:4000/users?email=${email}`);
};

const addUser = (user) => {
  return axios.post("http://localhost:4000/users", user);
};

export const useUserData = ({ enabled = true, email }) => {
  return useQuery(["users", email], () => fetchUser(email), {
    enabled,
  });
};

export const useAddUserData = () => {
  return useMutation(addUser);
};
