import { useQuery } from "@tanstack/react-query";
import UseAxiosPublic from "./UseAxiosPublic";


const useReview = () => {
    const axiosPublic = UseAxiosPublic()
    const {  data: reviews = []} = useQuery({
        
        queryKey: ['reviews'],
        
        queryFn: async () => {
          const res = await axiosPublic.get('/review');
          return res.data;
        },
      })

      return [reviews]
};

export default useReview;