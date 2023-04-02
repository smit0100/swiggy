import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { setCurrentColor, userData, userLogIn } from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import swal from "sweetalert";
import InlineButtonLoader from "./InlineButtonLoader";
import { useCookies } from "react-cookie";
import { requestForToken } from "../firebase";
import { Images } from "../Assets";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
const BgImages = [Images.Bg_LogIn1, Images.Bg_LogIn2, Images.Bg_LogIn3];

export default function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passError, setPassError] = useState("");
  const [loading, setLoading] = useState(false);
  const [tokenFound, setTokenFound] = useState(false);
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    getFcmToken();
    dispatch(setCurrentColor("white"))
  }, []);
  const getFcmToken = () => {
    const temp = localStorage.getItem("fcmToken");
    if (temp == null) {
      requestForToken(setTokenFound);
    }
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
    var regex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    if (!regex.test(e.target.value)) {
      setEmailError("Please enter valid email address");
    } else {
      setEmailError("");
    }
  };

  const handlePassword = (e) => {
    setPass(e.target.value);
    if (e.target.value.length < 8) {
      setPassError("password must be 8 character");
    } else {
      setPassError("");
    }
  };

  const googleAuth = () => {
    window.open(
      `${process.env.REACT_APP_BASEURL}/auth/google/callback`,
      "self"
    );
  };

  function SubmitButton() {
    if (email && pass && emailError.length === 0 && passError.length === 0) {
      return (
        <button
          className="bg-black/30 border-1 border-black/50 active:bg-black/50 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
          type="button"
          onClick={handleSubmit}
        >
          {loading ? <InlineButtonLoader /> : "Login"}
        </button>
      );
    } else {
      return (
        <button
          className="bg-black/30 border-1 border-black/50 active:bg-black/50 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
          type="button"
          disabled
        >
          Login
        </button>
      );
    }
  }

  const handleSubmit = async () => {
    console.log("hey");
    setLoading(true);
    try {
      let fcmToken = "";
      const temp = localStorage.getItem("fcmToken");
      if (temp != null) {
        fcmToken = temp;
      }
      console.log("===fcmToken", fcmToken);
      const response = await axios.post(
        `${process.env.REACT_APP_BASEURL}/user/login`,
        {
          email,
          password,
          fcmToken,
        }
      );

      // console.log("=====ress", response);
      dispatch(userData(response?.data?.user));

      dispatch(userLogIn(true));
      localStorage.setItem("isUserLogIn", JSON.stringify(true));
      localStorage.setItem("userData", JSON.stringify(response?.data?.user));
      swal("SuccessFully Login", "", "success");
      setLoading(false);
      navigate("/");
    } catch ({ response }) {
      // console.log("===error", response);
      if (
        response?.status === 400 ||
        response?.status === 401 ||
        response?.status === 402
      ) {
        swal(`${response?.data?.message}`, "", "error");
        setLoading(false);
        return;
      }
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
          >
            Sign in
          </button>
          <Link
            to="/register"
            className="w-full mt-5 text-center hover:bg-black text-black hover:text-white p-2 rounded-lg duration-200 border border-gray-300"
            // onClick={() => {
            //   clearState();
            // }}
          >
            Sign up
          </Link>
          <span className="w-full text-center mt-2 text-gray-500">or</span>
          <div className="flex mt-3">
            {/* <button className="w-full hover:bg-black text-black hover:text-white p-2 rounded-lg duration-200 border border-gray-300 flex items-center justify-center">
            <BsFacebook className="w-5 mr-1" color="blue"/>
            Facebook
          </button>
          <div style={{ width: "10%" }} /> */}
            <button
              className="w-full hover:bg-black text-black hover:text-white p-2 rounded-lg duration-200 border border-gray-300 flex items-center justify-center"
              onClick={googleAuth}
            >
              <FcGoogle className="w-5 mr-1" />
              Google
            </button>
          </div>
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
