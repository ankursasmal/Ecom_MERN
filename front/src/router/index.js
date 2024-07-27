import {
    createBrowserRouter,
   } from "react-router-dom";
   
import App from '../App'
import Home from "../pages/Home";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import AdminPanal from "../pages/AdminPanal";
import AllUser from "../pages/AllUser";
import AllProduct from "../pages/AllProduct";
import Error from "../pages/Error";
import CatagoryWiseAllProductShowHome from "../component/CatagoryWiseAllProductShowHome";
import ClickMultipluSameProduct from "../component/ClickMultipluSameProduct";
import SpecificItemPage from "../component/SpecificItemPage";
import Cart from "../pages/Cart";
import SearchPage from "../component/SearchPage";
import Order from "../pages/Order";
import BecomeSeller from "../component/BecomeSeller";
import MyOrders from "../component/MyOrders";
   
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App/>,
      children:[{
        path: "",
      element:<Home/>,
    },
    {
      path: "/signup",
      element:<Signup/>,

  },{
    path: "/login",
    element:<Login/>,

   },
    {
      path: "/admin-panal",
      element:<AdminPanal/>,
    },
    {
      path: "/all-user",
      element:<AllUser/>,
    },
    {
      path: "/all-product",
      element:<AllProduct/>,
    },
    {
      path: "/catagory-product/:category",
      element:<CatagoryWiseAllProductShowHome/>,
    },
    {
      path: "/same-catagoryItems/:category",
      element:<ClickMultipluSameProduct/>,
    },
    {
      path: "/specific-Product/:id",
      element:<SpecificItemPage/>,
    },
    {
      path: "/cart",
      element:<Cart/>,
    },
    {
      path: "/searchItems",
      element:<SearchPage/>,
    },
    {
      path: "/order",
      element:<Order/>,
    },
    {
      path: "/seller",
      element:<BecomeSeller/>,
    },{
      path: "/my-order",
      element:<MyOrders/>,
    },
     
    {path:"*",
      element:<Error/>,

    }
  ]

},  


  ]);
  
  export default router