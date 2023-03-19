import "./App.css";
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Home from "./pages/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Directory from "./components/Directory";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useState, useEffect } from "react";
import PageNotFound from "./components/PageNotFound";
import ForgotPassword from "./components/ForgotPassword";
import SearchPage from "./pages/SearchPage";
import CartPage from "./pages/CartPage";
import Otp from "./components/Otp";
import CheckoutPage from "./pages/CheckoutPage";
import Payment from "./components/StripeComponent";
import StripeComponent from "./components/StripeComponent";
import ResturantPage from "./pages/ResturantPage";
import UserProfile from "./pages/UserProfile";
import OrderDetails from "./pages/OrderDetails";
import { useSelector } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import Notification from "./components/Notification";
import { requestForToken } from "./firebase";

const stripePromise = loadStripe(
  "pk_test_51MTNlMSCDtK5iouBSvzN781pJDRfpPgm1nv9yDY4YgX2WcxSFPlz3cBJNN7ywPw1nBikAckdFmNAoc1r0q1ezjNq00rlfYIMca"
);
function App() {
  const user = useSelector((state) => state.userData.user);
  const [tokenFound, setTokenFound] = useState(false);
  useEffect(() => {
    getFcmToken();
  }, []);
  const getFcmToken = () => {
    const temp = localStorage.getItem("fcmToken");
    if (temp == null) {
      requestForToken(setTokenFound);
    }
  };
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Home />}>
        <Route index element={<Directory />} />
        <Route path="restaurant/:restaurantId" element={<ResturantPage />} />
        <Route path="search" element={<SearchPage />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="otp" element={<Otp />} />
        <Route path="forgotpassword" element={<ForgotPassword />} />

        {/* {user!=null ?<> */}
        <Route path="cart" element={<CartPage />} />
        <Route path="profile" element={<UserProfile />} />
        <Route path="checkout" element={<CheckoutPage />} />
        <Route path="payment" element={<StripeComponent />} />
        <Route path="userprofile" element={<UserProfile />} />
        <Route path="orderDetails/:orderId" element={<OrderDetails />} />
        {/* </>:<></>} */}
        <Route path="/*" element={<PageNotFound />} />
      </Route>
    )
  );
  return (
    <div>
      <ToastContainer/>
      <RouterProvider router={router} />
      <Notification />
    </div>
  );
}

export default App;
