import React, { useRef, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { userData, userLogIn } from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import swal from "sweetalert";
import { Images } from "../Assets";
import OTPTimer from "./OTPTimer";
const BgImages = [Images.Bg_LogIn1, Images.Bg_LogIn2, Images.Bg_LogIn3];
const Otp = () => {
  //   const [otp, setOtp] = useState("");
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const id = searchParams.get("id");
  const email = searchParams.get("email");
  const [otp, setOTP] = useState(["", "", "", "", "", ""]);
  const [bgIndex, setBgIndex] = useState(null);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const refs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(otp.join(""));
  };
  function getRandomIndex() {
    return Math.floor(Math.random() * BgImages.length);
  }
  useEffect(() => {
    setBgIndex(getRandomIndex());
    setIsTimerRunning(true);
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
  console.log(email);
  const handleClick = async (e) => {
    e.preventDefault();
    console.log(id, otp);
    if (otp.join("") == "") {
      toast.error("OTP is required 😡", { theme: "dark", autoClose: 2000 });
    } else if (otp.join("").trim().length == 0) {
      toast.error("OTP is required 😡", { theme: "dark", autoClose: 2000 });
    } else if (isNaN(otp.join(""))) {
      toast.error("😡 OTP must be a number");
    } else if (otp.join("").trim().length !== 6) {
      toast.error("OTP must be 6 digits 😡", {
        theme: "dark",
        autoClose: 2000,
      });
    } else {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BASEURL}/user/verify`,
          {
            id,
            otp: otp.join(""),
          }
        );
        console.log("====", response);
        dispatch(userData(response?.data?.user));

        dispatch(userLogIn(true));
        localStorage.setItem("isUserLogIn", JSON.stringify(true));
        localStorage.setItem("userData", JSON.stringify(response?.data?.user));
        swal("SuccessFully register", "", "success");
        navigate("/");
      } catch (err) {
        console.log(err);
        if (err.response?.status === 401 || err.response?.status === 404) {
          toast.error(`${err.response?.data.message}`);
          return;
        }
      }
    }
  };

  function hideEmail(email) {
    var index = email.indexOf("@");
    var hidden = email.substr(5, index).replace(/./g, "*");
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
    // <div className="h-screen bg-blue-500 py-20 px-3 ">
    //   <div className="container mx-auto mt-36">
    //     <div className="max-w-sm mx-auto md:max-w-lg">
    //       <div className="w-full">
    //         <div className="bg-white h-64 py-3 rounded text-center">
    //           <h1 className="text-2xl font-bold">OTP Verification</h1>
    //           <div className="flex flex-col mt-4">
    //             <span>Enter the OTP you received at</span>
    //             <span className="font-bold">{hideEmail(email)}</span>
    //           </div>
    //           <input
    //             value={otp}
    //             onChange={(e) => setOtp(e.target.value)}
    //             type="email"
    //             className="mt-6 pl-5  py-4 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring ease-linear transition-all duration-150 font-bold w-1/3 border-2 border-black"
    //             placeholder="Enter your otp..."
    //           />

    //           <div className="flex justify-center text-center mt-5">
    //             <Link className="flex items-center text-blue-700 hover:text-blue-900 cursor-pointer">
    //               <span className="font-bold">Resend OTP</span>
    //               <i className="bx bx-caret-right ml-1"></i>
    //             </Link>
    //           </div>

    //           <button
    //             onClick={handleClick}
    //             className="inline-block mt-3 bg-white hover:text-white hover:bg-blue-600 -bottom-4 font-bold  rounded border border-current px-8 py-[6px] text-xs uppercase  text-blue-600 transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:text-blue-500"
    //           >
    //             submit otp
    //           </button>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
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
