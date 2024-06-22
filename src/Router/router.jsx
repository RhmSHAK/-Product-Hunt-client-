import { createBrowserRouter } from "react-router-dom";
import Main from "../LayOut/Main";
import LogIn from "../Page/LogIn/LogIn";
import SingUp from "../Page/SingUp/SingUp";
import DeshBoard from "../LayOut/DeshBoard";
import MyProfile from "../Component/UserDashboard/MyProfile";
import AddProducts from "../Component/UserDashboard/AddProducts";
import MyProducts from "../Component/UserDashboard/MyProducts";
import StatisticsPage from "../Component/AdminDashBoard/StatisticsPage";
import ManageUsers from "../Component/AdminDashBoard/ManageUsers";
import ManageCoupons from "../Component/AdminDashBoard/ManageCoupons";
import Home from "../Page/Home/Home/Home";
import UpdateItem from "../Component/UpdateItem/UpdateItem";
import ProductReview from "../Component/ModeratorDashboard/ProductReview";
import ReportedContents from "../Component/ModeratorDashboard/ReportedContents";
import ProductsDetails from "../Page/Home/ProductsDetails/ProductsDetails";
import FeatureProducts from "../Page/Home/FeatureProducts/FeatureProducts";
import Products from "../Page/Products/Products";
import Payment from "../Component/Paymnet/Payment";
import PaymentGet from "../Component/Paymnet/PaymentGet";
import PrivateRouter from "./PrivateRouter";


export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        {
          path: '/',
          element: <Home></Home>
        },
        {
            path: '/login',
            element: <LogIn></LogIn>
        },
        {
            path: '/singUp',
            element: <SingUp></SingUp>
        },
        {
            path: '/featureProducts',
            element: <FeatureProducts></FeatureProducts>
        },
        {
          path: '/details/:id',
          element: <ProductsDetails></ProductsDetails>,
          loader: ({params})=> fetch(`https://last-project-12-sever.vercel.app/featured/${params.id}`)
        },
        {
          path: '/products',
          element: <PrivateRouter><Products></Products></PrivateRouter>,
          
        },
        // {
        //   path: '/dateway',
        //   element: <PaymentGet></PaymentGet>
        // }
        
      ]
    },

    {
      path: 'dashboard',
      element: <DeshBoard></DeshBoard>,
      children:[
        //normal user
        {
          path: 'my_profile',
          element: <MyProfile></MyProfile>
        },
        {
          path: 'add_products',
          element: <AddProducts></AddProducts>
        },
        {
          path: 'my_products',
          element: <MyProducts></MyProducts>
        },
        {
          path: 'updateItem/:id',
          element: <UpdateItem></UpdateItem>,
          loader: ({params})=> fetch(`https://last-project-12-sever.vercel.app/featured/${params.id}`)
        },
        {
           path: 'payment',
           element:<Payment></Payment>
        },


        //admin router
        {
          path: 'statistics',
          element: <StatisticsPage></StatisticsPage>
        },
        {
          path: 'manage_users',
          element: <ManageUsers></ManageUsers>
        },
        {
          path: 'manage_coupons',
          element: <ManageCoupons></ManageCoupons>
        },

        //moderator
        {
          path: 'Product_Review',
          element: <ProductReview></ProductReview>
        },
        {
          path: 'Reported_Contents',
          element: <ReportedContents></ReportedContents>
        }
       
      ]
    }
  ]);