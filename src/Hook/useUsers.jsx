import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";


const useUsers = () => {
    const axiosSecure = useAxiosSecure();
    const {  data: user = []} = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
          const res = await axiosSecure.get('/user');
          return res.data;
        },
      })
      return [user]
};

export default useUsers;