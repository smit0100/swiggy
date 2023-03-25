import React from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import InlineButtonLoader from "./InlineButtonLoader";
import { userData } from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import swal from "sweetalert";
const Otp = () => {
  const [otp, setOtp] = useState("");
  const [searchParams] = useSearchParams();
  const [isDisable, setIsDisable] = useState(false);

  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState('')
  const id = searchParams.get("id");
  const email = searchParams.get("email");

  console.log(email);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const handleClick = async (e) => {
    e.preventDefault();
    setIsDisable(true);
    console.log(id, otp);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASEURL}/courier/verify`,
        {
          id,
          otp,
        }
      );
      console.log(response.data.user);
      dispatch(userData(response.data.user));
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
    var index = email.indexOf("@");
    var hidden = email.substr(5, index).replace(/./g, "*");
    return email.substr(0, 5) + hidden + email.substring(index);
  }

  return (
    <div className="h-screen bg-blue-500 py-20 px-3 ">
      <div className="container mx-auto mt-36">
        <div className="max-w-sm mx-auto md:max-w-lg">
          <div className="w-full">
            <div className="bg-white h-64 py-3 rounded text-center">
              <h1 className="text-2xl font-bold">OTP Verification</h1>
              <div className="flex flex-col mt-4">
                <span>Enter the OTP you received at</span>
                <span className="font-bold">{hideEmail(email)}</span>
              </div>
              <input
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                type="email"
                className="mt-6 pl-5  py-4 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring ease-linear transition-all duration-150 font-bold w-1/3 border-2 border-black"
                placeholder="Enter your otp..."
              />

              <div className="flex justify-center text-center mt-5">
                <Link className="flex items-center text-blue-700 hover:text-blue-900 cursor-pointer">
                  <span className="font-bold">Resend OTP</span>
                  <i className="bx bx-caret-right ml-1"></i>
                </Link>
              </div>

              <button
                onClick={handleClick}
                disabled={isDisable}
                className={`inline-block mt-3    ${
                  isDisable
                    ? "bg-blue-600 "
                    : " duration-150 hover:shadow-xl bg-transparent hover:text-white"
                } -bottom-4 bg-blue-600 text-white font-bold  rounded border border-current px-8 py-[6px] text-xs uppercase `}
              >
                {isDisable ? <InlineButtonLoader /> : "submit otp"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Otp;
