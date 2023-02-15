import axios from "axios";
import { useQuery } from "react-query";

const fetchUsers = () => {
  return axios.get("http://localhost:4000/users");
};

export const useUsersData = () => {
  return useQuery("users", fetchUsers);
};
