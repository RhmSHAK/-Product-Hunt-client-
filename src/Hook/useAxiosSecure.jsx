import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Proviter/AuthProviders";


const axiosSecure = axios.create({
    baseURL: 'https://last-project-12-sever.vercel.app',
    
  });

const useAxiosSecure = () => {

  const navigate = useNavigate();
    const {LogOut} = useContext(AuthContext);

    axiosSecure.interceptors.request.use(function (config) {
        const token = localStorage.getItem('access-token')
        //console.log();
        console.log('request stopped by interceptors', token);
        config.headers.authorization = `Bearer ${token}`;
        return config;

        
      }, function (error) {
        // Do something with request error
        return Promise.reject(error);
      })

      //401 and 403
      axiosSecure.interceptors.response.use(function (response) {
        
        return response;
      }, async (error) => {
        const status = error.response.status;
        console.log('status error in the interceptor', status);
        if(status === 401 || status === 403){
            console.log('401 &403 error');
              await LogOut();
              navigate('/login');
        }
        
        return Promise.reject(error);
      });

    return axiosSecure;
};

export default useAxiosSecure;