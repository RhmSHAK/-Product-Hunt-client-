
import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../Proviter/AuthProviders";
import Loading from "../Page/Loading/Loading";



const PrivateRouter = ({children}) => {
     const {user, loading} = useContext(AuthContext);

    const location = useLocation();
    

    if(loading) {
        return <Loading></Loading>
    }

    if(user) {
        return children;
    }
    return <Navigate to='/login' state={{from: location}} replace></Navigate>;
};

export default PrivateRouter;