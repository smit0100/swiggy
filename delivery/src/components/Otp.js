import React, { useEffect, useRef } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import InlineButtonLoader from "./InlineButtonLoader";
import { corierLogIn, userData } from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import swal from "sweetalert";
import { Images } from "../Assets";
import OTPTimer from "./OTPTimer";
const BgImages = [Images.Bg_LogIn1, Images.Bg_LogIn2, Images.Bg_LogIn3];
const Otp = () => {
  const [searchParams] = useSearchParams();
  const [isDisable, setIsDisable] = useState(false);
  const [otp, setOTP] = useState(["", "", "", "", "", ""]);
  const [bgIndex, setBgIndex] = useState(null);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const refs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState('')
  const id = searchParams.get("id");
  const email = searchParams.get("email");

  console.log(email);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  function getRandomIndex() {
    return Math.floor(Math.random() * BgImages.length);
  }
  useEffect(() => {
    setBgIndex(getRandomIndex());
    setIsTimerRunning(true);
  }, []);
  useEffect(() => {
    refs[0]?.current?.focus();
  }, []);
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
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(otp.join(""));
  };
  const handleClick = async (e) => {
    e.preventDefault();
    setIsDisable(true);
    console.log(id, otp);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASEURL}/courier/verify`,
        {
          id,
          otp: otp.join(""),
        }
      );
      console.log("======resss", response.data.user);
      dispatch(userData(response.data.user));
      dispatch(corierLogIn(true));
      localStorage.setItem("isCorierLogIn", JSON.stringify(true));
      localStorage.setItem(
        "deliveryData",
        JSON.stringify(response?.data?.user)
      );
      swal("SuccessFully register", "", "success");
      setIsDisable(false);
      if (response.data.user.isApproved == "pending") {
        navigate("/status");
      } else {
        navigate("/");
      }
    } catch (err) {
      console.log(err);
      if (err?.response?.status === 401 || err?.response?.status === 404) {
        swal(`${err?.response?.data?.message}`, "", "error");
        setIsDisable(false);
        return;
      }
    }
  };

  function hideEmail(email) {
    let index = email.indexOf("@");
    let hidden = email.substr(5, index).replace(/./g, "*");
    return email.substr(0, 5) + hidden + email.substring(index);
  }
  const handleResend = () => {
    setOTP(["", "", "", "", "", ""]);
    setIsTimerRunning(true);
    refs[0].current.focus();
  };
  const handleTimerComplete = () => {
    setIsTimerRunning(false);
  };
  return (
    <div className="flex items-center justify-center flex-1 min-h-screen bg-black bg-opacity-30 backdrop-blur-sm">
      <img
        src={BgImages[bgIndex]}
        className="w-full h-full object-cover absolute mix-blend-overlay"
      />
      <div className="relative flex flex-col m-6 space-y-8 max-w-full bg-white shadow-md rounded-2xl md:flex-row md:space-y-0">
        <div className="relative">
          <img
            src={Images.Product1}
            alt="img"
            className="w-[400px] h-full hidden rounded-l-2xl md:block object-cover"
          />
          <div className="absolute hidden bottom-10 right-6 p-6 bg-white bg-opacity-30 backdrop-blur-sm rounded drop-shadow-lg md:block">
            <span className="text-white text-xl">
              Our aim is not just to serve meal, it's a journey through taste
              and ambiance.
            </span>
          </div>
        </div>
        <div className="flex flex-col justify-center p-8 md:p-14">
          <span className="mb-3 text-4xl font-bold">OTP verification</span>
          <span className="font-light text-gray-400 mb-8">
            {`Food Point ,OTP`}
          </span>
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
                  value={digit}
                  onChange={(event) => handleChange(event, index)}
                  required
                />
              ))}
            </div>
          </form>
          <div className="mt-4 text-center">
            {isTimerRunning > 0 ? (
              <OTPTimer onTimerComplete={handleTimerComplete} />
            ) : (
              <button
                className="text-blue-500 underline"
                onClick={handleResend}
              >
                Resend OTP
              </button>
            )}
          </div>
          <button
            className="w-full bg-white h-14 text-black p-2 mt-5 rounded-lg hover:bg-black hover:text-white hover:border duration-200 border border-gray-300"
            onClick={handleClick}
          >
            Submit OTP
          </button>
        </div>
      </div>
    </div>
  );
};

export default Otp;
