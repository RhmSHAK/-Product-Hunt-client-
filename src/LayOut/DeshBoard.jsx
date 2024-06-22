import { NavLink, Outlet } from "react-router-dom";
import { FaAd, FaBook, FaCalendar,  FaHome, FaList,  FaShoppingCart, FaUser, FaUtensils } from "react-icons/fa";
import useAdmin from "../Hook/useAdmin";
import useModerator from "../Hook/useModerator";
//import useAdmin from "../Hook/useAdmin";

const DeshBoard = () => {
    //const isAdmin = useAdmin();
    const [isAdmin] = useAdmin();
    const [isModerator] = useModerator();
    return (
        <div className="flex">


        {/* side bar */}
        <div className="w-64 min-h-screen bg-blue-300">
           <ul className="menu p-4">
                {
                    isAdmin ? 
                   <>
               <p className="text-2xl font-bold text-center">Admin Dashboard</p>
               <div className="divider"></div>
                  <li> 
                   <NavLink to="/dashboard/statistics">
                    
                       Statistics Page
                       </NavLink> 
                   </li>

                <li> 
                   <NavLink to="/dashboard/manage_users">
                    
                       Manage Users
                       </NavLink> 
                   </li>

                <li> 
                   <NavLink to="/dashboard/manage_coupons">
                       
                       Manage Coupons
                       </NavLink> 
                   </li>
                
                   
                 </>
                   :
                   isModerator?
                   <>
                   <p className="text-2xl font-bold text-center">Moderator Dashboard</p>
                   <div className="divider"></div>
                   <li>
                               <NavLink to="/dashboard/Product_Review">
                                   
                                  Product Review Queue
                               </NavLink>
                           </li>
                   <li>
                    <NavLink to="/dashboard/Reported_Contents">
                                   
                                   Reported Contents
                               </NavLink>
                           </li>
                   </>:

                   <>
                     <p className="text-2xl font-bold text-center">User Dashboard</p>
                     <div className="divider"></div>
                           <li>
                               <NavLink to="/dashboard/my_profile">
                                   
                                   My Profile
                               </NavLink>
                           </li>

                           <li>
                               <NavLink to="/dashboard/add_products">
                                
                                   Add Products
                               </NavLink>
                           </li>

                           <li>
                               <NavLink to="/dashboard/my_products">
                                   
                                   My Products
                               </NavLink>
                           </li>
                           
                   </>
                }
                    
                    {/* share nav links */}
                   <div className="divider"></div>

                   <li> 
                   <NavLink to="/">
                       <FaHome></FaHome>
                       Home
                       </NavLink> 
                   </li>

                   
           </ul>
        </div>

        {/* dashboard content */}
        <div className="flex-1 p-8">
             <Outlet></Outlet>
        </div>
   </div>
    );
};

export default DeshBoard;