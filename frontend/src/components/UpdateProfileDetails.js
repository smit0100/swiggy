import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { userData } from "../redux/user/userSlice";
import swal from "sweetalert";

const UpdateProfileDetails = ({ setupdateProfile }) => {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [number, setNumber] = useState("");
  const [numberError, setNumberError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [disabled, setDisabled] = useState(true);

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

  const [otpTab, setOtpTab] = useState(false);

  const changeProfileDetails = async (e) => {
    e.preventDefault();
    console.log(email, number, name);
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
    } catch (err) {
      if (err.response.status == 409) {
        swal(`${err.response.data.message}`, "", "error");
      }
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
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          <div className="border-0 px-5 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-xl font-semibold">Update Your Profile</h3>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => setupdateProfile(false)}
              >
                <span className=" text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                  X
                </span>
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
                    className="px-3 py-3 placeholder-slate-300 text-slate-600 relative bg-white rounded text-sm border border-slate-300 outline-none focus:outline-none focus:ring w-full pl-10"
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
                    className="px-3 py-3 placeholder-slate-300 text-slate-600 relative bg-white rounded text-sm border border-slate-300 outline-none focus:outline-none focus:ring w-full pl-10"
                  />
                </div>
                <span className="text-sm text-red-500">{numberError}</span>
                <label htmlFor="email">Email</label>
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
                    className="px-3 py-3 placeholder-slate-300 text-slate-600 relative bg-white rounded text-sm border border-slate-300 outline-none focus:outline-none focus:ring w-full pl-10"
                  />
                </div>
                <span className="text-sm text-red-500">{emailError}</span>
              </form>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setupdateProfile(false)}
              >
                Close
              </button>
              {SubmitButton()}
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
