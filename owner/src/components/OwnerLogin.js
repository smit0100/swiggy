import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// import FacebookLogin from 'react-facebook-login';
import { ownerLogIn, userData } from "../redux/user/userSlice";
import InlineButtonLoader from "./InlineButtonLoader";
import { useDispatch } from "react-redux";
import swal from "sweetalert";

export default function OwnerLogin() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passError, setPassError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const googleAuth = () => {
    window.open("http://localhost:4000/auth/google/callback", "self");
  };
  console.log(googleAuth);
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
          {loading ? <InlineButtonLoader /> : "Login"}
        </button>
      );
    }
  }
  //facebook login
  // const responseFacebook = (response) => {
  //   if (response != null) {
  //     dispatch(userData(response))
  //     navigate('/');
  //   } else {
  //     console.log("error",response);
  //     }
  // }
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
          password: pass,
          fcmToken,
        }
      );
      console.log("owner login res::", response);
      dispatch(userData(response.data.rest));
      dispatch(ownerLogIn(true));
      localStorage.setItem("isOwnerLogIn", JSON.stringify(true));
      localStorage.setItem("ownerData", JSON.stringify(response?.data?.rest));
      swal("SuccessFully Login", "", "success", {
        buttons: false,
        timer: 1000
      });
      setLoading(false);
      navigate("/");
    } catch (err) {
      console.log(err);
      if (
        err?.response?.status === 400 ||
        err?.response?.status === 401 ||
        err?.response?.status === 402
      ) {
        swal(
          `${err?.response?.status === 402
            ? err?.response?.data?.message
            : err?.response?.data?.message
          }`,
          "",
          "error"
        );
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
                    className="bg-white active:bg-blueGray-50 text-blueGray-700  px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                    type="button"
                  >
                    <img
                      alt="github"
                      className="w-5 mr-1"
                      src="./svg/facebook.svg"
                    />
                    Facebook
                  </button>
                  <button
                    className="bg-white active:bg-blueGray-50 text-blueGray-700 px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                    type="button"
                  >
                    <img
                      alt="google"
                      className="w-5 mr-1"
                      src="./svg/google.svg"
                      onClick={googleAuth}
                    />
                    Google
                  </button>
                  {/* <FacebookLogin
                      textButton="facebook"
                      appId="878193710074579"
                      autoLoad={false}
                      fields="name,email,picture"
                      callback={responseFacebook}
                      cssclassName="bg-white active:bg-blueGray-50 text-blueGray-700 px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                      icon={<img
                        alt="google"
                        className="w-5 mr-1"
                        src="./svg/google.svg"
                      />}
                    /> */}
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
                    {/* <button
                      className="bg-black/30 border-1 border-black/50 active:bg-black/50 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="button"
                      onClick={handleSubmit}
                    >
                      Sign In
                    </button> */}
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
                <Link to="/ownerRegister" className="text-blueGray-200">
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

// import React from 'react'

// const OwnerLogin = () => {
//   return (
//     <div>
//       <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
//   <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
//     <div className="mb-4">
//       <label className="block text-gray-700 font-bold mb-2" for="username">
//         Email
//       </label>
//       <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Enter your username"/>
//     </div>
//     <div className="mb-6">
//       <label className="block text-gray-700 font-bold mb-2" for="password">
//         Password
//       </label>
//       <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="Enter your password"/>
//     </div>
//     <div className="flex items-center justify-between">
//       <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
//         Sign In
//       </button>
//       <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
//         Forgot Password?
//       </a>
//     </div>
//   </form>
// </div>

//     </div>
//   )
// }

// export default OwnerLogin
