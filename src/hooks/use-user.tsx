import { useQuery } from "@tanstack/react-query";
import { Navigate } from "react-router";
import { userQuery } from "../api/queries";

const useUser = () => {
  const { data, error } = useQuery(userQuery());

  if (error) {
    return <Navigate to="/" />;
  }

  if (data) {
    return {
      user: data,
      isLoading: false,
    };
  }

  return {
    user: null,
    isLoading: true,
  };
};

export default useUser;
