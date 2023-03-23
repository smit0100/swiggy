import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Home from "./pages/Home";
import Directory from "./components/Directory";
import RestaurantRegister from "./components/RestaurantRegister";
import OwnerLogin from "./components/OwnerLogin";
import OwnerRegister from "./components/OwnerRegister";
import { useSelector } from "react-redux";
import LoginRegister from "./components/LoginRegister";
import Otp from "./components/Otp";
import PrivacyPolicy from "./components/PrivacyPolicy";
import OrderDetail from "./components/OrderDetail";
import AddProduct from "./components/AddProduct";
import OrderSummary from "./components/OrderSummary";
import ListOfProducts from "./components/ListOfProducts";
import OwnerProfile from "./pages/OwnerProfile";
import PageNotFound from "./components/PageNotFound";
import Notification from "./components/Notification";
import { requestForToken } from "./firebase";
import { useState } from "react";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ownerLogIn, userData } from "./redux/user/userSlice";
import { useDispatch } from 'react-redux';

function App() {
  const dispatch = useDispatch()
  const owner = useSelector((state) => state.userData.isOwnerLogIn);
  console.log("===owner",owner);
  const [tokenFound, setTokenFound] = useState(false);
  useEffect(() => {
    const temp = localStorage.getItem("isOwnerLogIn");
    if (temp != undefined && temp != null) {
      dispatch(ownerLogIn(JSON.parse(temp)))
    }
    const tempOwner = localStorage.getItem("ownerData");
    if (tempOwner != undefined && tempOwner != null) {
      dispatch(userData(JSON.parse(tempOwner)))
    }
  }, []);
  useEffect(() => {
    getFcmToken();
  }, []);
  const getFcmToken = () => {
    const temp = localStorage.getItem("fcmTokenOwner");
    console.log("===temp",temp);
    if (temp == null) {
      requestForToken(setTokenFound);
    }
  };
  const router = createBrowserRouter(
    createRoutesFromElements(
      !owner ? (
        <Route path="/" element={<LoginRegister />}>
          <Route index element={<OwnerLogin />} />
          <Route path="/ownerRegister" element={<OwnerRegister />} />
          <Route path="/otp" element={<Otp />} />
          <Route path="/privacyPolicy" element={<PrivacyPolicy />} />
          <Route path="/*" element={<PageNotFound />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />

        </Route>
      ) : (
        <Route path="/" element={<Home />}>
          <Route index element={<Directory />} />
          <Route path="/orderdetails" element={<OrderDetail />} />
          <Route path="/ordersummary" element={<OrderSummary />} />
          <Route path="/addproduct" element={<AddProduct />} />
          <Route path="/listofproducts" element={<ListOfProducts />} />
          <Route path="/privacyPolicy" element={<PrivacyPolicy />} />
          <Route path="/resturantRegister" element={<RestaurantRegister />} />
          <Route path="/ownerprofile" element={<OwnerProfile />} />
          <Route path="contactus" element={<ContactUs />} />

          <Route path="/*" element={<PageNotFound />} />
        </Route>
      )
    )
  );

  return (
    <div className="App">
      <ToastContainer />
      <RouterProvider router={router} />
      <Notification />
    </div>
  );
}

export default App;
