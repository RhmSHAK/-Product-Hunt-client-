import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://last-project-12-sever.vercel.app',
    
  });

const UseAxiosPublic = () => {
    return axiosPublic;
};

export default UseAxiosPublic;