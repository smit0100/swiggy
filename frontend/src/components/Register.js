import React, { useEffect, useState } from "react";
import axios from "axios";
import { createSearchParams, Link, useNavigate } from "react-router-dom";
// import { useSelector } from 'react-redux';
import InlineButtonLoader from "./InlineButtonLoader";

import swal from "sweetalert";

import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
import { Images } from "../Assets";
import { setCurrentColor } from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
const BgImages = [Images.Bg_LogIn1, Images.Bg_LogIn2, Images.Bg_LogIn3];
export default function Register() {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [number, setNumber] = useState("");
  const [numberError, setNumberError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [pass, setPass] = useState("");
  const [passError, setPassError] = useState("");
  const [cpass, setCpass] = useState("");
  const [cpassError, setCpassError] = useState("");
  const [check, SetCheck] = useState(false);
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(setCurrentColor("white"))
  }, [])
  
  const handledisable = () => {
    if (
      nameError.length === 0 &&
      numberError.length === 0 &&
      emailError.length === 0 &&
      passError.length === 0 &&
      cpass.length === 0
    ) {
      setDisabled(!disabled);
      console.log(disabled);
    }
  };
  const handleSignUp = () => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const nameRegex = /^[\sA-Za-z]+$/;
    const regx = /^[789]\d{9}$/;
    if (name.trim() == "") {
      toast.error("Name is required!", { duration: 1000 });
    } else if (!nameRegex.test(name)) {
      toast.error("Name is not valid!", { duration: 1000 });
    } else if (number.trim() == "") {
      toast.error("Mobile number is required!", { duration: 1000 });
    } else if (!regx.test(number)) {
      toast.error("Mobile number is not valid!", { duration: 1000 });
    } else if (email.trim() == "") {
      toast.error("Email is required!", { duration: 1000 });
    } else if (!regex.test(email)) {
      toast.error("This is not a valid email format!", { duration: 1000 });
    } else if (pass.trim() == "") {
      toast.error("Password is not valid", { duration: 1000 });
    } else if (pass.length < 5) {
      toast.error("Password must be more than 4 characters", {
        duration: 1000,
      });
    } else if (cpass.trim() == "") {
      toast.error("Confirm password is not valid", { duration: 1000 });
    } else if (cpass != pass) {
      toast.error("Confirm password does not match", { duration: 1000 });
    } else if (!check) {
      toast.error("Please agree with our privacy", { duration: 1000 });
    } else {
      handleSubmit();
    }
  };
  function SubmitButton() {
    if (
      name &&
      email &&
      number &&
      pass &&
      check &&
      cpass &&
      nameError.length === 0 &&
      emailError.length === 0 &&
      numberError.length === 0 &&
      passError.length === 0 &&
      cpassError.length === 0
    ) {
      return (
        <button
          className="bg-black/30 border-1 border-black/50 active:bg-black/50 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
          type="button"
          onClick={handleSubmit}
        >
          {" "}
          {loading ? <InlineButtonLoader /> : "Register Account"}{" "}
        </button>
      );
    } else {
      return (
        <button
          className="bg-black/30 border-1 border-black/50 active:bg-black/50 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
          type="button"
          disabled
        >
          {" "}
          Register Account{" "}
        </button>
      );
    }
  }

  const googleAuth = () => {
    window.open(
      `${process.env.REACT_APP_BASEURL}/auth/google/callback`,
      "self"
    );
  };

  const facebookAuth = () => {
    window.open(
      `${process.env.REACT_APP_BASEURL}/auth/facebook/callback`,
      "self"
    );
  };

  const handleName = (e) => {
    setName(e.target.value);
    var regex = /^[\sA-Za-z]+$/;

    if (!regex.test(e.target.value)) {
      setNameError("please enter valid name");
    } else {
      setNameError("");
    }
    handledisable();
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
    var regex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    if (!regex.test(e.target.value)) {
      setEmailError("Please enter valid email address");
    } else {
      setEmailError("");
    }
    handledisable();
  };

  const handleNumber = (e) => {
    setNumber(e.target.value);
    const regx = /^[789]\d{9}$/;
    if (!regx.test(e.target.value)) {
      setNumberError("please enter valid number");
    } else {
      setNumberError("");
    }
    handledisable();
  };

  const handleCpass = (e) => {
    setCpass(e.target.value);
    if (pass === e.target.value) {
      setCpassError("");
    } else {
      setCpassError("please enter same password");
    }
    handledisable();
  };

  const handlePassword = (e) => {
    setPass(e.target.value);
    if (e.target.value.length < 8) {
      setPassError("password must be 8 character");
    } else {
      setPassError("");
    }
    if (e.target.value === cpass) {
      setCpassError("");
    } else {
      setCpassError("please enter same password");
    }
    handledisable();
  };

  // const user = useSelector(state => state.userData.user);
  const handleSubmit = async () => {
    setLoading(true);
    console.log(name, email, number, pass);
    try {
      let fcmToken = "";
      const temp = localStorage.getItem("fcmToken");
      if (temp != null) {
        fcmToken = temp;
      }
      const response = await axios.post(
        `${process.env.REACT_APP_BASEURL}/user/create`,
        {
          name,
          email,
          number,
          password: pass,
          fcmToken,
        }
      );
      setLoading(false);
      console.log(response.data);

      navigate({
        pathname: "/otp",
        search: createSearchParams({
          id: response.data.user._id,
          email: response.data.user.email,
        }).toString(),
      });
    } catch (err) {
      console.log(err);
      if (err.response?.status === 409) {
        swal(`${err.response?.data?.message}`, "", "error");
        setLoading(false);
        return;
      }
    }
  };
  return (
    // <>
    //   {
    //     loading &&
    //     <div className="absolute w-screen h-screen bg-black/20 z-50"></div>
    //   }
    //   <div className="relative h-screen w-screen ">
    //     <img src="https://i.ibb.co/dL8GQvF/4.png" className="absolute w-screen h-screen blur-[3px]" alt="background" />
    //     <div className="flex content-center items-center justify-center h-full w-screen ">
    //       <div className="w-full sm:w-8/12 md:w-6/12 lg:w-4/12 px-4">
    //         <div className="relative bg-white/60 flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
    //           <div className="rounded-t mb-0 px-6">
    //             <div className="text-center mb-3">
    //               <h6 className="text-blueGray-500 text-sm font-bold pt-5 ">
    //                 Sign up with
    //               </h6>
    //             </div>
    //             <div className="btn-wrapper text-center">

    //               <button
    //                 className="bg-white active:bg-blueGray-50 text-blueGray-700 px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
    //                 type="button"
    //                 onClick={googleAuth}
    //               >
    //                 <img
    //                   alt="google logo"
    //                   className="w-5 mr-1"
    //                   src="./svg/google.svg"
    //                 />
    //                 Google
    //               </button>
    //             </div>
    //             <hr className="mt-6 border-b-1 border-blueGray-300" />
    //           </div>
    //           <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
    //             <div className="text-blueGray-400 text-center mb-3 font-bold">
    //               <small>Or sign up with credentials</small>
    //             </div>
    //             <form>
    //               <div className="relative w-full mb-3">
    //                 <label
    //                   className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
    //                   htmlFor="grid-password"
    //                 >
    //                   Name
    //                 </label>
    //                 <input
    //                   type="text"
    //                   value={name}
    //                   onChange={handleName}
    //                   onBlur={handleName}
    //                   className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
    //                   placeholder="Name"
    //                 />
    //                 <span className="text-sm text-red-500">{nameError}</span>
    //               </div>

    //               <div className="relative w-full mb-3">
    //                 <label
    //                   className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
    //                   htmlFor="grid-password"
    //                 >
    //                   Phone No.
    //                 </label>
    //                 <input
    //                   type="text"
    //                   className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
    //                   placeholder="Phone no"
    //                   value={number}
    //                   onChange={handleNumber}
    //                   onBlur={handleNumber}
    //                 />
    //                 <div className="text-sm text-red-500">{numberError}</div>

    //               </div>

    //               <div className="relative w-full mb-3">
    //                 <label
    //                   className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
    //                   htmlFor="grid-password"
    //                 >
    //                   Email
    //                 </label>
    //                 <input
    //                   type="email"
    //                   className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
    //                   placeholder="Email"
    //                   value={email}
    //                   onChange={handleEmail}
    //                   onBlur={handleEmail}
    //                 />
    //                 <div className="text-sm text-red-500">{emailError}</div>
    //               </div>

    //               <div className="relative w-full mb-3">
    //                 <label
    //                   className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
    //                   htmlFor="grid-password"
    //                 >
    //                   Password
    //                 </label>
    //                 <input
    //                   type="password"
    //                   className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
    //                   placeholder="Password"
    //                   value={pass}
    //                   onChange={handlePassword}
    //                   onBlur={handlePassword}
    //                 />
    //                 <div className="text-sm text-red-500">{passError}</div>
    //               </div>

    //               <div className="relative w-full mb-3">
    //                 <label
    //                   className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
    //                   htmlFor="grid-password"
    //                 >
    //                   Confirm Password
    //                 </label>
    //                 <input
    //                   type="password"
    //                   className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
    //                   placeholder="Password"
    //                   value={cpass}
    //                   onChange={handleCpass}
    //                   onBlur={handleCpass}

    //                 />
    //                 <div className="text-sm text-red-500">{cpassError}</div>
    //               </div>

    //               <div>
    //                 <label className="inline-flex items-center cursor-pointer">
    //                   <input
    //                     checked={check}
    //                     onChange={(e) => SetCheck(!check)}
    //                     id="customCheckLogin"
    //                     type="checkbox"
    //                     className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"

    //                   />
    //                   <span className="ml-2 text-sm font-semibold text-blueGray-600">
    //                     I agree with the{" "}
    //                     <Link
    //                       to="/privacypolicy"
    //                       className="text-blue-500 border-b-[1px] border-blue-500"
    //                     >
    //                       Privacy Policy
    //                     </Link>
    //                   </span>

    //                 </label>

    //               </div>
    //               {SubmitButton()}

    //             </form>
    //           </div>
    //         </div>
    //         <div className="flex flex-wrap mt-6 relative">
    //           <div className="w-1/2">
    //           </div>
    //           <div className="w-1/2 text-right">
    //             <Link to="/login" className="text-blueGray-200">
    //               <div className="text-white text-md">Sign In...</div>
    //             </Link>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>

    // </>
    <div className="flex items-center justify-center flex-1 min-h-screen bg-black bg-opacity-30 backdrop-blur-sm">
      <img
        src={BgImages[0]}
        className="w-full h-full object-cover absolute mix-blend-overlay"
      />
      <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-md rounded-2xl md:flex-row md:space-y-0 mt-24">
        <div className="flex flex-col justify-center p-8 md:p-10">
          <span className="mb-3 text-4xl font-bold">Sign up</span>
          <span className="font-light text-gray-400 mb-8">
            {`${"Wellcome ,"} Please enter your details`}
          </span>
          <div className="pb-4">
            <span className="mb-2 text-md">Name</span>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
              name="email"
              value={name}
              placeholder="Enter name"
              id="email"
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <div className="pb-4">
            <span className="mb-2 text-md">Phone no.</span>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
              name="email"
              value={number}
              maxLength={10}
              placeholder="Enter mobile no"
              id="email"
              onChange={(event) => setNumber(event.target.value)}
            />
          </div>
          <div className="pb-4">
            <span className="mb-2 text-md">Email</span>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
              name="email"
              value={email}
              placeholder="example@company.com"
              id="email"
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className="pb-4">
            <span className="mb-2 text-md">Password</span>
            <input
              type="password"
              name="pass"
              placeholder="Enter password"
              id="pass"
              value={pass}
              className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
              onChange={(event) => setPass(event.target.value)}
            />
          </div>
          <div className="pb-4">
            <span className="mb-1 text-md">Confirm Password</span>
            <input
              type="password"
              name="pass"
              id="pass"
              placeholder="Re-enter password"
              value={cpass}
              className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
              onChange={(event) => setCpass(event.target.value)}
            />
          </div>
          <div className="flex justify-between w-full pb-2">
            <div className="mr-24">
              <input
                type="checkbox"
                name="ch"
                id="ch"
                className="mr-2"
                checked={check}
                onChange={(e) => {
                  SetCheck(!check)
                }}
              />
              <span className="ml-2 text-sm font-semibold text-blueGray-600">
                I agree with the{" "}
                <Link
                  to="/privacyPolicy"
                  className="text-blue-500 border-b-[1px] border-blue-500"
                  onClick={()=>dispatch(setCurrentColor("slate-800"))}
                >
                  Privacy Policy
                </Link>
              </span>
            </div>
            <span className="w-36" />
          </div>
          <button
            className="w-full bg-black text-white p-2 rounded-lg hover:bg-white hover:text-black hover:border duration-200 border border-gray-300"
            onClick={handleSignUp}
          >
            {loading ? <InlineButtonLoader /> : "Sign up"}
          </button>
          <Link
            className="w-full mt-3 hover:bg-black text-center text-black hover:text-white p-2 rounded-lg duration-200 border border-gray-300"
            to="/login"
          >
            Sign in
          </Link>
          {/* <span className="w-full text-center mt-2 text-gray-500">or</span> */}
          {/* <div className="flex mt-3">
            <button
              className="w-full hover:bg-black text-black hover:text-white p-2 rounded-lg duration-200 border border-gray-300 flex items-center justify-center"
              onClick={googleAuth}
            >
              <FcGoogle className="w-5 mr-1" />
              Google
            </button>
          </div> */}
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
