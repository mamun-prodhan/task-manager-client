import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";

const useProfile = () => {
  // tanstack query
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  const {
    data: loggedInUser = {},
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["loggedInUser", user?.email],
    queryFn: async () => {
      const res = await axiosPublic.get(`/users?email=${user?.email}`);
      return res.data;
    },
  });
  return [loggedInUser, refetch, isLoading];
};

export default useProfile;
