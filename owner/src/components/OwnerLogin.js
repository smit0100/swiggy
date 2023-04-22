import axios from "axios";
import React, { useState, useEffect } from "react";
import { createSearchParams, Link, useNavigate } from "react-router-dom";

import { ownerLogIn, setCurrentColor, userData } from "../redux/user/userSlice";
import InlineButtonLoader from "./InlineButtonLoader";
import { useDispatch } from "react-redux";
import swal from "sweetalert";
import { Images } from "../Assets";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
import { requestForToken } from "../firebase";

const BgImages = [Images.Bg_LogIn1, Images.Bg_LogIn2, Images.Bg_LogIn3];

export default function OwnerLogin() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passError, setPassError] = useState("");
  const [tokenFound, setTokenFound] = useState(false);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const dispatch = useDispatch();
  useEffect(() => {
    getFcmToken();
    setCurrentColor("white");
  }, []);

  const getFcmToken = () => {
    const temp = localStorage.getItem("fcmTokenOwner");
    console.log("===temp", temp);
    if (temp == null) {
      requestForToken(setTokenFound);
    }
  };
  const handleLogIn = () => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (email == "") {
      toast.error("Email is required!", { duration: 1000 });
    } else if (!regex.test(email)) {
      toast.error("This is not a valid email format!", { duration: 1000 });
    } else if (password == "") {
      toast.error("Password is required", { duration: 1000 });
    } else if (password.length < 5) {
      toast.error("Password must be more than 4 characters", {
        duration: 1000,
      });
    } else {
      handleSubmit();
    }
  };

  const googleAuth = () => {
    window.open("http://localhost:4000/auth/google/callback", "self");
  };

  const handleSubmit = async () => {
    try {
      let fcmToken = "";
      const temp = localStorage.getItem("fcmTokenOwner");
      if (temp != null) {
        fcmToken = temp;
      }
      console.log("===fcmtoken:::", fcmToken);
      setLoading(true);
      const response = await axios.post(
        "http://localhost:4000/resturant/login",
        {
          email,
          password,
          fcmToken,
        }
      );
      console.log(response);
      if (response.status == 212) {
        navigate({
          pathname: "/otp",
          search: createSearchParams({
            id: response.data.rest._id,
            email: response.data.rest.email,
          }).toString(),
        });
      } else if (response.status === 200) {
        console.log("owner login res::", response);
        dispatch(userData(response.data.rest));
        dispatch(ownerLogIn(true));
        localStorage.setItem("isOwnerLogIn", JSON.stringify(true));
        localStorage.setItem("ownerData", JSON.stringify(response?.data?.rest));
        swal("SuccessFully Login", "", "success", {
          buttons: false,
          timer: 1000,
        });
        setLoading(false);
        navigate("/");
      } else {
        setLoading(false);
      }
    } catch (err) {
      if (
        err?.response?.status === 400 ||
        err?.response?.status === 404 ||
        err?.response?.status === 402
      ) {
        toast.error(err?.response?.data?.message);
      }
      setLoading(false);
    }
  };
  return (
    <div className="flex items-center justify-center flex-1 min-h-screen bg-black bg-opacity-30 backdrop-blur-sm">
      <img
        src={BgImages[1]}
        className="w-full h-full object-cover absolute mix-blend-overlay"
      />
      <div className="relative flex flex-col m-6 mt-24 space-y-8 bg-white shadow-md rounded-2xl md:flex-row md:space-y-0">
        <div className="flex flex-col justify-center p-8 md:p-14">
          <span className="mb-3 text-4xl font-bold">Log in</span>
          <span className="font-light text-gray-400 mb-8">
            {`Welcom back! ,Please enter your details`}
          </span>
          <div className="py-4">
            <span className="mb-2 text-md">Email</span>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
              name="email"
              value={email}
              placeholder="email"
              id="email"
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className="py-4">
            <span className="mb-2 text-md">Password</span>
            <input
              type="password"
              name="pass"
              placeholder="password"
              id="pass"
              value={password}
              className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <div className="flex justify-between w-full pt-4">
            <div className="mr-24 w-40" />
            <Link
              to={"/forgotpassword"}
              className="font-bold text-md cursor-pointer hover:underline"
            >
              Forgot password
            </Link>
          </div>
          <button
            className="w-full bg-black text-white p-2 rounded-lg mt-2 hover:bg-white hover:text-black hover:border duration-200 border border-gray-300"
            onClick={handleLogIn}
            disabled={loading}
          >
            {loading ? <InlineButtonLoader /> : "Sign in"}
          </button>
          <Link
            to="/ownerRegister"
            className="w-full mt-5 text-center hover:bg-black text-black hover:text-white p-2 rounded-lg duration-200 border border-gray-300"
            // onClick={() => {
            //   clearState();
            // }}
          >
            Sign up
          </Link>
        </div>
        <div className="relative">
          <img
            src={Images.Product1}
            alt="img"
            className="w-[400px] h-full hidden rounded-r-2xl md:block object-cover"
          />
          <div className="absolute hidden bottom-10 right-6 p-6 bg-white bg-opacity-30 backdrop-blur-sm rounded drop-shadow-lg md:block">
            <span className="text-white text-xl">
              Our aim is not just to serve meal, it's a journey through taste
              and ambiance.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
