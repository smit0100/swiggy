import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import swal from "sweetalert";
import { useEffect } from "react";
import InlineButtonLoader from "./InlineButtonLoader";
import { toast } from "react-toastify";

const ChangePasswordPopup = ({ setChangePassword }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [oldPasswordError, setOldPasswordError] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");
  const [cnpass, setCnpass] = useState("");
  const [cnPassError, setCnPassError] = useState("");

  const [disabled, setDisabled] = useState(true);
  const [nameError, setNameError] = useState("");
  const [numberError, setNumberError] = useState("");
  const [emailError, setEmailError] = useState("");

  const [isValid, setIsValid] = useState(false);
  const [isValidLoading, setIsValidLoading] = useState(false);
  const user = useSelector((state) => state.userData.user);
  useEffect(() => {
    if (
      oldPassword &&
      newPassword &&
      cnpass &&
      oldPasswordError == "" &&
      newPasswordError == "" &&
      cnPassError == ""
    ) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  }, [
    oldPassword,
    newPassword,
    cnpass,
    oldPasswordError,
    newPasswordError,
    cnPassError,
  ]);
  const handleOldPassword = (e) => {
    setOldPassword(e.target.value);
    if (oldPassword === null || oldPassword === "") {
      setOldPasswordError("You not leave it empty");
    } else {
      setOldPasswordError("");
    }
  };

  const handleCpass = (e) => {
    setCnpass(e.target.value);
    if (newPassword === e.target.value) {
      setCnPassError("");
    } else {
      setCnPassError("please enter same password");
    }
    handledisable();
  };

  const handlePassword = (e) => {
    setNewPassword(e.target.value);
    if (e.target.value.length < 8) {
      setNewPasswordError("password must be 8 character");
    } else {
      setNewPasswordError("");
    }
    if (e.target.value == cnpass) {
      setCnPassError("");
    } else {
      setCnPassError("please enter same password");
    }
    handledisable();
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    console.log(oldPassword, newPassword);
    try {
      setIsValidLoading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_BASEURL}/resturant/changepassword`,
        {
          userId: user._id,
          oldPass: oldPassword,
          newPass: newPassword,
        }
      );
      toast.success("👌Password changed successfully");
      setChangePassword(false);
      setIsValidLoading(false);

    } catch (err) {
      setIsValidLoading(false);
      console.log("====err",err);
      if (err.response.status == 401) {
        toast.error(err?.response?.data?.messag + "☹️");
      }
    }
  };

  const handledisable = () => {
    if (
      nameError.length === 0 &&
      numberError.length === 0 &&
      emailError.length === 0
    ) {
      console.log("hheydfljdskflsfd");
      setDisabled(!disabled);
      console.log(disabled);
    }
  };

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto md:w-1/3 my-6 mx-auto max-w-3xl">
          <div className="border-0 px-5 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Change Your Password
              </h3>
              <button
                type="button"
                onClick={() => setChangePassword(false)}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
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
                <label htmlFor="password">Old Password</label>
                <div className="relative flex w-full flex-wrap items-stretch mb-3 pt-2">
                  <span className="z-10 h-full leading-snug font-normal text-center flex  text-slate-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                    <i className="fas fa-lock-open"></i>
                  </span>
                  <input
                    type="text"
                    value={oldPassword}
                    onBlur={handleOldPassword}
                    onChange={handleOldPassword}
                    id="password"
                    placeholder="Enter Old Password"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                  />
                </div>
                <span className="text-red-500 text-sm">{oldPasswordError}</span>
                <label htmlFor="newpassword">New Password</label>
                <div className="relative flex w-full flex-wrap items-stretch mb-3 pt-2">
                  <span className="z-10 h-full leading-snug font-normal  text-center text-slate-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                    <i className="fas fa-unlock"></i>
                  </span>
                  <input
                    type="text"
                    value={newPassword}
                    onBlur={handlePassword}
                    onChange={handlePassword}
                    id="newpassword"
                    placeholder="Enter New Password"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                  />
                </div>
                <span className="text-red-500 text-sm">{newPasswordError}</span>

                <label htmlFor="rnewpassword">Confirm New Password</label>
                <div className="relative flex w-full flex-wrap items-stretch mb-3 pt-2">
                  <span className="z-10 h-full leading-snug font-normal  text-center text-slate-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                    <i className="fas fa-lock"></i>
                  </span>
                  <input
                    type="text"
                    value={cnpass}
                    onBlur={handleCpass}
                    onChange={handleCpass}
                    id="rnewpassword"
                    placeholder="Re-enter New Password"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                  />
                </div>
                <span className="text-red-500 text-sm">{cnPassError}</span>
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
                  handleChangePassword(e);
                }}
              >
                {isValidLoading ? <InlineButtonLoader /> : "Save"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25  fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default ChangePasswordPopup;
