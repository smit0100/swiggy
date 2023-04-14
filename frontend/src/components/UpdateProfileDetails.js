import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { userData } from "../redux/user/userSlice";
import swal from "sweetalert";
import InlineButtonLoader from "./InlineButtonLoader";

const UpdateProfileDetails = ({ setupdateProfile }) => {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [number, setNumber] = useState("");
  const [numberError, setNumberError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [disabled, setDisabled] = useState(true);

  const [isValid, setIsValid] = useState(false);
  const [isValidLoading, setIsValidLoading] = useState(false);

  const [newAddress, setNewAddress] = useState({});
  const [otp, setOtp] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.userData.user);

  useEffect(() => {
    setName(user?.name);
    setEmail(user?.email);
    setNumber(user?.number);
  }, []);
  useEffect(() => {
    if (
      name &&
      email &&
      number &&
      nameError.length === 0 &&
      emailError.length === 0 &&
      numberError.length === 0
    ) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  }, [name, email, number, nameError, emailError, numberError]);
  const [otpTab, setOtpTab] = useState(false);

  const changeProfileDetails = async (e) => {
    e.preventDefault();
    console.log(email, number, name);
    setIsValidLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASEURL}/user/update`,
        {
          userId: user._id,
          email,
          number,
          name,
        }
      );
      console.log(response);
      if (response.status === 201) {
        setOtpTab(!otpTab);
        setNewAddress(response.data.newDetails);
      } else {
        // add redux
        dispatch(userData(response.data.user));
        localStorage.setItem("userData", JSON.stringify(response?.data?.user));
        swal("Profile updated successfully", "", "success");
      }
      setupdateProfile(false);
      setIsValidLoading(false);
    } catch (err) {
      if (err.response.status == 409) {
        swal(`${err.response.data.message}`, "", "error");
      }
      setIsValidLoading(false);
    }
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
    console.log("hello from email");
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

  function SubmitButton() {
    if (
      name &&
      email &&
      number &&
      nameError.length === 0 &&
      emailError.length === 0 &&
      numberError.length === 0
    ) {
      return (
        <button
          className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
          type="button"
          onClick={(e) => {
            setupdateProfile(false);
            changeProfileDetails(e);
          }}
        >
          Save Update
        </button>
      );
    } else {
      return (
        <button
          className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
          type="button"
          onClick={(e) => {
            setupdateProfile(false);
            changeProfileDetails(e);
          }}
          disabled
        >
          Save Update
        </button>
      );
    }
  }

  const handledisable = () => {
    if (
      nameError.length === 0 &&
      numberError.length === 0 &&
      emailError.length === 0
    ) {
      setDisabled(!disabled);
      // console.log(disabled)
    }
  };

  const otpSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASEURL}/user/verify`,
        {
          id: user._id,
          otp,
          newAddress,
        }
      );
      dispatch(userData(response.data.user));
      localStorage.setItem("userData", JSON.stringify(response?.data?.user));
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative my-6 mx-auto w-auto md:w-1/3">
          <div className="border-0 px-5 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900">
                Update Your Profile
              </h3>
              <button
                type="button"
                onClick={() => setupdateProfile(false)}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>
            <div className="relative p-6 flex-auto space-x-4">
              <form className="flex flex-col">
                <label htmlFor="name">Name</label>
                <div className="relative flex w-full flex-wrap items-stretch mb-3 pt-2">
                  <span className="z-10 h-full leading-snug font-normal text-center flex  text-slate-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                    <i className="fas fa-user"></i>
                  </span>
                  <input
                    type="text"
                    value={name}
                    onBlur={handleName}
                    onChange={handleName}
                    id="name"
                    placeholder="Enter Your Name"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 pl-10"
                  />
                </div>
                <span className="text-sm text-red-500">{nameError}</span>
                <label htmlFor="number">Number</label>
                <div className="relative flex w-full flex-wrap items-stretch mb-3 pt-2">
                  <span className="z-10 h-full leading-snug font-normal  text-center text-slate-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                    <i className="fas fa-phone"></i>
                  </span>
                  <input
                    type="text"
                    value={number}
                    onBlur={handleNumber}
                    onChange={handleNumber}
                    id="number"
                    placeholder="Enter Your Number"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 pl-10"
                  />
                </div>
                <span className="text-sm text-red-500">{numberError}</span>
                {/* <label htmlFor="email">Email</label>
                <div className="relative flex w-full flex-wrap items-stretch mb-3 pt-2">
                  <span className="z-10 h-full leading-snug font-normal  text-center text-slate-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                    <i className="fas fa-envelope"></i>
                  </span>
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter Your Email"
                    value={email}
                    onBlur={handleEmail}
                    onChange={handleEmail}
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 pl-10"
                  />
                </div>
                <span className="text-sm text-red-500">{emailError}</span> */}
              </form>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
              <button
                type="button"
                disabled={isValid}
                className={`${
                  isValid ? "bg-black" : "hover:bg-white hover:text-black"
                } w-full bg-black text-white p-2 rounded-lg hover:border duration-200 border border-gray-300`}
                onClick={(e) => {
                  changeProfileDetails(e);
                }}
              >
                {isValidLoading ? <InlineButtonLoader /> : "Save"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>

      {/* otp component  */}
      {otpTab && (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 px-5 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-xl font-semibold">Enter your OTP</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setOtpTab(!otpTab)}
                  >
                    <span className=" text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                      X
                    </span>
                  </button>
                </div>
                <div className="relative p-6 flex-auto space-x-4">
                  <form className="flex flex-col">
                    <label htmlFor="otp">Enter your OTP</label>
                    <div className="relative flex w-full flex-wrap items-stretch mb-3 pt-2">
                      <span className="z-10 h-full leading-snug font-normal text-center flex  text-slate-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                        <i className="fas fa-user"></i>
                      </span>
                      <input
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        id="otp"
                        placeholder="Enter Your OTP"
                        className="px-3 py-3 placeholder-slate-300 text-slate-600 relative bg-white rounded text-sm border border-slate-300 outline-none focus:outline-none focus:ring w-full pl-10"
                      />
                    </div>
                  </form>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setOtpTab(!otpTab)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={(e) => {
                      setOtpTab(!otpTab);
                      otpSubmit(e);
                    }}
                  >
                    Submit OTP
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      )}
    </>
  );
};

export default UpdateProfileDetails;
