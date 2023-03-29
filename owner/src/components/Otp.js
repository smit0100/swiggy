import React, { useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

import { ownerLogIn, userData } from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import swal from "sweetalert";
const Otp = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const email = searchParams.get("email");
  const [otp, setOTP] = useState(["", "", "", "", "", ""]);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(otp.join(""));
  };

  const handleChange = (event, index) => {
    const value = event.target.value;
    setOTP((prevOTP) => {
      const newOTP = [...prevOTP];
      newOTP[index] = value;
      return newOTP;
    });
    if (value && refs[index + 1]) {
      refs[index + 1].current.focus();
    } else if (!value && refs[index - 1]) {
      refs[index - 1].current.focus();
    }
  };

  const refs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const handleClick = async (e) => {

    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/resturant/verify",
        {
          id,
          otp:otp.join(""),
        }
      );
      console.log("====>>",response.data);
      dispatch(userData(response.data.rest));
      dispatch(ownerLogIn(true));
      localStorage.setItem("isOwnerLogIn", JSON.stringify(true));
      localStorage.setItem("ownerData", JSON.stringify(response?.data?.rest));
      swal("SuccessFully register", "", "success");
      navigate("/");
    } catch (err) {
      console.log(err);
      if (err?.response?.status === 401 || err?.response?.status === 404) {
        swal(`${err?.response?.data?.message}`, "", "error");
        return;
      }
    }
  };

  function hideEmail(email) {
    var index = email.indexOf("@");
    var hidden = email.substr(5, index).replace(/./g, "*");
    return email.substr(0, 5) + hidden + email.substring(index);
  }

  return (
    <div className=" bg-blue-500 flex flex-col items-center justify-center min-h-screen">
        <div className="max-w-lg mx-auto md:max-w-lg">
          <div className="w-full">
            <div className="bg-white p-5 rounded-2xl text-center">
              <h1 className="text-2xl font-bold">OTP Verification</h1>
              <div className="flex flex-col mt-4">
                <span>Enter the OTP you received at</span>
                <span className="font-bold">{hideEmail(email)}</span>
              </div>
              <form
                onSubmit={handleSubmit}
                className="flex flex-col items-center my-5"
              >
                <div className="flex justify-center">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      type="text"
                      min="0"
                      max="9"
                      ref={refs[index]}
                      className={`w-12 h-12 sm:w-16 sm:h-16 mx-2 text-center text-3xl font-bold border border-gray-400 rounded-lg`}
                      maxLength={1}
                      placeholder="-"
                      value={digit}
                      onChange={(event) => handleChange(event, index)}
                      required
                    />
                  ))}
                </div>
              </form>
              <div className="flex justify-center text-center mt-5">
                <a className="flex items-center text-blue-700 hover:text-blue-900 cursor-pointer">
                  <span className="font-bold">Resend OTP</span>
                  <i className="bx bx-caret-right ml-1"></i>
                </a>
              </div>

              <button
                onClick={handleClick}
                className="inline-block mt-3 bg-white hover:text-white hover:bg-blue-600 -bottom-4 font-bold  rounded border border-current px-8 py-[6px] text-xs uppercase  text-blue-600 transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:text-blue-500"
              >
                submit otp
              </button>
            </div>
          </div>
        </div>
    </div>
  );
};

export default Otp;
