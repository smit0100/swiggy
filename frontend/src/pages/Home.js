import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { userData, userLogIn } from "../redux/user/userSlice";

import { cartData } from "../redux/cart/cartSlice";
import MainNav from "../components/Nav/MainNav";

const Home = () => {
  const dispatch = useDispatch();
  const isUser = useSelector((state) => state.userData.user);

  useEffect(() => {
    if (isUser != null) {
      (async () => {
        try {
          const response = await axios.get(
            `${process.env.REACT_APP_BASEURL}/cart/${isUser._id}`
          );
          dispatch(cartData(response.data.data.cart));
        } catch (err) {
          console.log(err);
        }
      })();
    }
  }, [isUser]);

  useEffect(() => {
    (async () => {
      try {
        const data = await axios.get(
          `${process.env.REACT_APP_BASEURL}/auth/login/success`,
          { withCredentials: true }
        );
        console.log("this is something", data);
        if (data.status === 201) {
          const isExist = await axios.get(
            `${process.env.REACT_APP_BASEURL}/user/isExist`,
            { withCredentials: true }
          );
          console.log("check this exist",isExist);
          if (isExist?.data?.user != null) {
            dispatch(userData(isExist?.data?.user));
            dispatch(userLogIn(true));
            localStorage.setItem("isUserLogIn", JSON.stringify(true));
            localStorage.setItem("userData", JSON.stringify(isExist?.data?.user));
          }else{
            dispatch(userData(null));
            dispatch(userLogIn(false));
            localStorage.setItem("isUserLogIn", JSON.stringify(false));
            localStorage.setItem("userData", JSON.stringify(null));
          }
        } else {
          dispatch(userData(data?.data?.user));
          dispatch(userLogIn(true));
          localStorage.setItem("isUserLogIn", JSON.stringify(true));
          localStorage.setItem("userData", JSON.stringify(data?.data?.user));
        }
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  return (
    <>
      <div className="bg-orange-100">
        <MainNav />
        <Outlet />
        <Footer />
      </div>
    </>
  );
};

export default Home;
