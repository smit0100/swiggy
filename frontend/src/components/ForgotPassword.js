import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import InlineButtonLoader from "./InlineButtonLoader";
import { Images } from "../Assets";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setCurrentColor } from "../redux/user/userSlice";

const BgImages = [Images.Bg_LogIn1, Images.Bg_LogIn2, Images.Bg_LogIn3];

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  // const [otp, setOtp] = useState('')
  const [otpError, setOtpError] = useState("");
  const [pass, setPass] = useState("");
  const [passError, setPassError] = useState("");
  const [cpass, setCpass] = useState("");
  const [cpassError, setCpassError] = useState("");
  const [otpShow, setOtpShow] = useState(false);
  const [id, setId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [otp, setOTP] = useState(["", "", "", "", "", ""]);
  const refs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];

  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setCurrentColor("white"));
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
  const handleEmail = (e) => {
    setEmail(e.target.value);
    var regex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    if (!regex.test(e.target.value)) {
      setEmailError("Please enter valid email address");
    } else {
      setEmailError("");
    }
  };

  const handleCpass = (e) => {
    setCpass(e.target.value);
    if (pass == e.target.value) {
      setCpassError("");
    } else {
      setCpassError("please enter same password");
    }
  };

  const handlePass = (e) => {
    setPass(e.target.value);
    if (e.target.value.length < 8) {
      setPassError("password must be 8 character");
    } else {
      setPassError("");
    }
    if (e.target.value == cpass) {
      setCpassError("");
    } else {
      setCpassError("please enter same password");
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:4000/user/forgotpassword",
        {
          email,
        }
      );
      console.log("===us", response);
      if (response.status === 205) {
        console.log("something wrogn");
        toast.error("Opps, User not exists ☹️");
        setLoading(false);
      } else {
        console.log(response);
        setId(response.data.user._id);
        setOtpShow(true);
        setLoading(false);
        setPass("");
        setCpass("");
        setCpassError("");
        setPassError("");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSavePassword = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:4000/user/verfiyotp",
        {
          id,
          otp: otp.join(""),
          newPassword: pass,
        }
      );
      // console.log(response);
      if (response.status === 205) {
        toast.error("Wrong OTP, try again ☹️");
        setLoading(false);
      } else {
        toast.success("🔥 Password Forgot Successfully.");
        setPass("");
        setCpass("");
        setLoading(false);
        setEmail("");
        navigate("/login");
      }
    } catch (err) {
      if (err?.response?.status == 404 || err?.response?.status == 500) {
        toast.error(err?.response?.data?.messag + "☹️");
      }
      setLoading(false);
      console.log(err);
    }
  };
  function ResetBtn() {
    if (!otpShow) {
      if (email && emailError.length === 0) {
        return (
          <button
            className="w-full px-4 py-2 font-bold text-white bg-red-500 rounded-full hover:bg-red-700 focus:outline-none focus:shadow-outline"
            type="button"
            onClick={handleClick}
            disabled={loading}
          >
            {loading ? <InlineButtonLoader /> : "Forgot Password"}
          </button>
        );
      } else {
        return (
          <button
            className="w-full px-4 py-2 font-bold text-white bg-red-500 rounded-full hover:bg-red-700 focus:outline-none focus:shadow-outline"
            type="button"
            disabled
          >
            Forgot Password
          </button>
        );
      }
    } else {
      if (
        email &&
        emailError.length === 0 &&
        pass &&
        cpass &&
        passError.length === 0 &&
        cpassError.length === 0 &&
        otp.join("").length == 6 &&
        !isNaN(otp.join(""))
      ) {
        return (
          <button
            className="w-full px-4 py-2 font-bold text-white bg-red-500 rounded-full hover:bg-red-700 focus:outline-none focus:shadow-outline"
            type="button"
            onClick={handleSavePassword}
            disabled={loading}
          >
            {loading ? <InlineButtonLoader /> : "Forgot Password"}
          </button>
        );
      } else {
        return (
          <button
            className="w-full px-4 py-2 font-bold text-white bg-red-500 rounded-full hover:bg-red-700 focus:outline-none focus:shadow-outline"
            type="button"
            disabled
          >
            Forgot Password
          </button>
        );
      }
    }
  }

  return (
    <div className="font-mono flex items-center justify-center flex-1 min-h-screen bg-black bg-opacity-30 backdrop-blur-sm">
      <img
        src={BgImages[2]}
        className="w-full h-full object-cover absolute mix-blend-overlay"
      />
      <div className="relative flex flex-col m-6 mt-24 space-y-8 bg-white shadow-md rounded-2xl md:flex-row md:space-y-0 w-full xl:w-3/4 lg:w-11/12">
        <div className="w-full h-auto lg:flex bg-white hidden  lg:w-1/2 bg-cover rounded-l-lg">
          <img
            src="https://i.ibb.co/MPxMSmN/forgotpassword.jpg"
            alt="img"
            className="py-10 bg-white rounded-md"
          />
        </div>
        <div className="lg:w-1/2 bg-white p-5 rounded-lg lg:rounded-l-none">
          <div className="px-8 mb-4 text-center">
            <h3 className="pt-4 mb-2 text-2xl">Forgot Your Password?</h3>
            <p className="mb-4 text-sm text-gray-700">
              We get it, stuff happens. Just enter your email address below and
              we'll send you a link to reset your password!
            </p>
          </div>
          <form className="px-8 pt-6 pb-8 mb-4 bg-white rounded">
            <div className="mb-4">
              <label
                className="block mb-2 text-sm font-bold text-gray-700"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                placeholder="Enter email"
                onChange={handleEmail}
                onBlur={handleEmail}
                disabled={otpShow}
                className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
              />
              <div className="text-sm text-red-500">{emailError}</div>
            </div>
            {otpShow && email && emailError.length === 0 && (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col items-center my-5"
              >
                <label
                  className="block self-start mb-2 text-sm font-bold text-gray-700"
                  htmlFor="otp"
                >
                  OTP
                </label>
                <div className="flex justify-center">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      type="text"
                      min="0"
                      max="9"
                      ref={refs[index]}
                      className={`w-12 h-12 sm:w-12 sm:h-12 mx-2 text-center text-2xl font-bold border border-gray-400 rounded-lg`}
                      maxLength={1}
                      value={digit}
                      onChange={(event) => handleChange(event, index)}
                      required
                    />
                  ))}
                </div>
              </form>
            )}

            <div>
              {email &&
                otpShow &&
                emailError.length === 0 &&
                otpError.length === 0 && (
                  <>
                    <div className="mb-4">
                      <label
                        className="block mb-2 text-sm font-bold text-gray-700"
                        htmlFor="password"
                      >
                        New password
                      </label>
                      <input
                        type="password"
                        id="password"
                        value={pass}
                        onChange={handlePass}
                        placeholder="New password"
                        onBlur={handlePass}
                        className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                      />
                      <div className="text-sm text-red-500">{passError}</div>
                    </div>
                    <div className="mb-4">
                      <label
                        className="block mb-2 text-sm font-bold text-gray-700"
                        htmlFor="password"
                      >
                        Confirm new password
                      </label>
                      <input
                        className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                        id="password"
                        type="password"
                        value={cpass}
                        onChange={handleCpass}
                        onBlur={handleCpass}
                        placeholder="Confirm new password"
                      />
                      <div className="text-sm text-red-500">{cpassError}</div>
                    </div>
                  </>
                )}
            </div>

            <div className="mb-6 text-center">{ResetBtn()}</div>
            <hr className="mb-6 border-t" />
            <div className="text-center">
              <Link
                className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                to="/register"
              >
                Create an Account!
              </Link>
            </div>
            <div className="text-center">
              <Link
                className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                to="/login"
              >
                Already have an account? Login!
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
