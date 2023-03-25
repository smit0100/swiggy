import "./App.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Home from "./pages/Home";
import Directory from "./components/Directory";
import Login from "./components/Login";
import Register from "./components/Register";
import ForgotPassword from "./components/ForgotPassword";
import Otp from "./components/Otp";
import OrderSummary from "./components/OrderSummary";
import Status from "./components/Status";
import UserProfile from "./pages/UserProfile";
import OrderDetail from "./components/OrderDetail";
import { useDispatch, useSelector } from "react-redux";
import PageNotFound from "./components/PageNotFound";
import { corierLogIn, userData } from "./redux/user/userSlice";
import { useEffect, useState } from "react";
import Notification from "./components/Notification";
import { requestForToken } from "./firebase";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ContactUs from "./pages/ContactUs";

function App() {
  const dispatch = useDispatch();
  const isLogIn = useSelector((state) => state.userData.isCorierLogIn);
  const [tokenFound, setTokenFound] = useState(false);

  useEffect(() => {
    const temp = localStorage.getItem("isCorierLogIn");
    if (temp != undefined && temp != null) {
      dispatch(corierLogIn(JSON.parse(temp)));
    }
    const deliveryData = localStorage.getItem("deliveryData");
    if (deliveryData != undefined && deliveryData != null) {
      dispatch(userData(JSON.parse(deliveryData)));
    }
  }, []);

  useEffect(() => {
    getFcmToken();
  }, []);
  const getFcmToken = () => {
    const temp = localStorage.getItem("fcmTokenDelivery");
    console.log("===tempp", temp);
    if (temp == null) {
      requestForToken(setTokenFound);
    }
  };
  const router = createBrowserRouter(
    createRoutesFromElements(
      isLogIn ? (
        <Route path="/" element={<Home />}>
          <Route index element={<Directory />} />
          <Route path="status" element={<Status />} />
          <Route path="profile" element={<UserProfile />} />
          <Route path="orderdetails" element={<OrderDetail />} />
          <Route path="ordersummary" element={<OrderSummary />} />
          <Route path="contactus" element={<ContactUs />} />
          <Route path="/*" element={<PageNotFound />} />
        </Route>
      ) : (
        <Route path="/" element={<Home />}>
          <Route index element={<Directory />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forgotpassword" element={<ForgotPassword />} />
          <Route path="otp" element={<Otp />} />
          <Route path="/*" element={<PageNotFound />} />
        </Route>
      )
    )
  );

  return (
    <>
      <ToastContainer theme="dark" pauseOnHover={true} />
      <RouterProvider router={router} />
      <Notification />
    </>
  );
}

export default App;
