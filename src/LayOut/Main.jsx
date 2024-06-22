import { Outlet, useLocation } from "react-router-dom";
import NavBer from "../Page/Shared/NavBer";
import Footer from "../Page/Shared/Footer";
//import Footer from "../Page/Shared/Footer"

const Main = () => {
    const location = useLocation();
    console.log(location);
    const noHeaderFooter = location.pathname.includes('/login') || location.pathname.includes('/singUp') ;
    return (
        <div>
            { noHeaderFooter ||<NavBer></NavBer>}

            <Outlet></Outlet>

            {/* <Footer></Footer> */}
            <Footer></Footer>
            
        </div>
    );
};

export default Main;