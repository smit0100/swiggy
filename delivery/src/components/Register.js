import React, { useState } from "react";
import axios from "axios";
import { createSearchParams, Link, useNavigate } from "react-router-dom";
// import { useSelector } from 'react-redux';

import swal from "sweetalert";
import InlineButtonLoader from "./InlineButtonLoader";

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

  // const user = useSelector(state => state.userData.user);

  const navigate = useNavigate();

  const handledisable = () => {
    if (
      nameError.length === 0 &&
      numberError.length === 0 &&
      emailError.length === 0 &&
      passError.length === 0 &&
      cpass.length === 0
    ) {
      console.log("hheydfljdskflsfd");
      setDisabled(!disabled);
      console.log(disabled);
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
          {loading ? <InlineButtonLoader /> : "Register Account"}
        </button>
      );
    } else {
      return (
        <button
          className="bg-black/30 border-1 border-black/50 active:bg-black/50 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
          type="button"
          disabled
        >
          Register Account
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

  const handleSubmit = async () => {
    setLoading(true);
    console.log("hey");
    console.log(name, email, number, pass);
    try {
      let fcmToken = "";
      const temp = localStorage.getItem("fcmTokenDelivery");
      if (temp != null) {
        fcmToken = temp;
      }
      const response = await axios.post(
        `${process.env.REACT_APP_BASEURL}/courier/register`,
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
      if (err?.response?.status === 409) {
        swal(`${err.response?.data?.message}`, "", "error");
        return;
      }
    }
  };
  return (
    <>
      {loading && (
        <div className="absolute w-screen h-screen bg-black/20 z-50"></div>
      )}
      <div className="relative h-screen w-screen ">
        <img
          src="https://i.ibb.co/dL8GQvF/4.png"
          className="absolute w-screen h-screen blur-[3px]"
          alt="background"
        />
        <div className="flex content-center items-center justify-center h-full w-screen ">
          <div className="w-full sm:w-8/12 md:w-6/12 lg:w-4/12 px-4">
            <div className="relative bg-white/60 flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
              <div className="rounded-t mb-0 px-6">
                <div className="text-center mb-3">
                  <h6 className="text-blueGray-500 text-sm font-bold pt-5 ">
                    Sign up with
                  </h6>
                </div>
                <div className="btn-wrapper text-center">
                  <button
                    className="bg-white active:bg-blueGray-50 text-blueGray-700 px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                    type="button"
                    onClick={googleAuth}
                  >
                    <img
                      alt="google logo"
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
                  <small>Or sign up with credentials</small>
                </div>
                <form>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={handleName}
                      onBlur={handleName}
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Name"
                    />
                    <span className="text-sm text-red-500">{nameError}</span>
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Phone No.
                    </label>
                    <input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Phone no"
                      value={number}
                      onChange={handleNumber}
                      onBlur={handleNumber}
                    />
                    <div className="text-sm text-red-500">{numberError}</div>
                  </div>

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

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Password"
                      value={cpass}
                      onChange={handleCpass}
                      onBlur={handleCpass}
                    />
                    <div className="text-sm text-red-500">{cpassError}</div>
                  </div>

                  <div>
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        checked={check}
                        onChange={(e) => SetCheck(!check)}
                        id="customCheckLogin"
                        type="checkbox"
                        className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                      />
                      <span className="ml-2 text-sm font-semibold text-blueGray-600">
                        I agree with the{" "}
                        <Link
                          href="#pablo"
                          className="text-blue-500 border-b-[1px] border-blue-500"
                          onClick={(e) => e.preventDefault()}
                        >
                          Privacy Policy
                        </Link>
                      </span>
                    </label>
                  </div>
                  {SubmitButton()}
                  {/* <div className="text-center mt-6">

                    <button className="bg-black/30 border-1 border-black/50 active:bg-black/50 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150" type="submit" value="Create Account" disabled={true} onClick={handleSubmit}> create account</button>
                  </div> */}
                </form>
              </div>
            </div>
            <div className="flex flex-wrap mt-6 relative">
              <div className="w-1/2"></div>
              <div className="w-1/2 text-right">
                <Link to="/login" className="text-blueGray-200">
                  <div className="text-white text-md">Sign In...</div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
