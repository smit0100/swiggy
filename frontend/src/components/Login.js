import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { userData } from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import swal from "sweetalert";
import InlineButtonLoader from "./InlineButtonLoader";
import { useCookies } from "react-cookie";

export default function Login() {
  const [cookies, setCookie] = useCookies(["access_token", "refresh_token"]);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passError, setPassError] = useState("");
  const [loading, setLoading] = useState(false);
  const [coordinates, setCoordinates] = useState({
    latitude: 21.19215,
    longitude: 72.88799,
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) =>
        setCoordinates({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }),
      (error) => console.error(error)
    );
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
    console.log(email, pass);
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
          password: pass,
          fcmToken,
          coordinates,
        }
      );
      let expires = new Date();
      expires.setTime(expires.getTime() + response.data.expires_in * 1000);
      setCookie("access_token", response.data.token, {
        path: "/",
        maxAge: 24 * 60 * 60 * 1000,
      });

      // console.log("=====ress", response);
      dispatch(userData(response?.data?.user));
      swal("SuccessFully Login", "", "success");
      setLoading(false);
      navigate("/");
    } 
    catch ({ response }) {
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

  return (
    <>
      <div className="relative h-screen w-screen">
        <img
          src="https://i.ibb.co/dL8GQvF/4.png"
          className="absolute w-[98.5vw] h-screen blur-[3px]"
          alt="background"
        />
        <div className="flex content-center items-center justify-center h-full w-screen ">
          <div className="w-full sm:w-8/12 md:w-6/12 lg:w-4/12 px-4">
            <div className="relative bg-white/60 flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-3">
                  <h6 className="text-blueGray-500 text-sm font-bold">
                    Sign in with
                  </h6>
                </div>
                <div className="btn-wrapper text-center">
                 
                  <button
                    className="bg-white active:bg-blueGray-50 text-blueGray-700 px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                    type="button"
                    onClick={googleAuth}
                  >
                    <img
                      alt="google"
                      className="w-5 mr-1"
                      src="./svg/google.svg"
                    />
                    Google
                  </button>
                   
                </div>
                <hr className="mt-6 border-b-1 border-blueGray-300" />
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <div className="text-blueGray-400 text-center mb-3 font-bold">
                  <small>Or sign in with credentials</small>
                </div>
                <form>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Email"
                      value={email}
                      onChange={handleEmail}
                      onBlur={handleEmail}
                    />
                    <div className="text-sm text-red-500">{emailError}</div>
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Password"
                      value={pass}
                      onChange={handlePassword}
                      onBlur={handlePassword}
                    />
                    <div className="text-sm text-red-500">{passError}</div>
                  </div>
                  <div>
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        id="customCheckLogin"
                        type="checkbox"
                        className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                      />
                      <span className="ml-2 text-sm font-semibold text-blueGray-600">
                        Remember me
                      </span>
                    </label>
                  </div>
                  <div className="text-center mt-6">
                   
                    {SubmitButton()}
                  </div>
                </form>
              </div>
            </div>

            <div className="flex flex-wrap mt-6 relative">
              <div className="w-1/2">
                <a
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  className="text-blueGray-200"
                >
                  <Link to="/forgotpassword">
                    <small className="text-white">Forgot password?</small>
                  </Link>
                </a>
              </div>
              <div className="w-1/2 text-right">
                <Link to="/register" className="text-blueGray-200">
                  <small className="text-white">Create new account</small>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
