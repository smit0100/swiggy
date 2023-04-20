import axios from "axios";
import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import OrderSummaryFoodCard from "./OrderSummaryFoodCard";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setCurrentColor } from "../redux/user/userSlice";
import InlineButtonLoader from "./InlineButtonLoader";
import UserReviewCard from "./UserReviewCard";

// import io from 'socket.io-client';
// const socket = io("http://localhost:4000");

const OrderSummary = () => {
  const { state } = useLocation();
  const [userData, setUserData] = useState(null);
  const user = useSelector((state) => state.userData.user);
  const [resturantOtp, setresturantOtp] = useState(null);
  const [customerOtp, setcustomerOtp] = useState();
  const [otp, setOTP] = useState(["", "", "", "", "", ""]);

  const [resturanthandle, setresturanthandle] = useState(false);
  const [customerhandle, setcustomerhandle] = useState(null);
  const [isValid, setIsValid] = useState(false);
  const refs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];

  console.log(state);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setCurrentColor("black"));
  }, []);
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/order/fetchOneOrder?id=${state}`
        );
        console.log(response);
        setUserData(response.data.order);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [resturanthandle, customerhandle]);
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
  // acceptfromresturant
  const handleResturantOtp = async (e) => {
    e.preventDefault();
    console.log("/sd,fds,fsf,===>", otp.join(""));
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
      setIsValid(true);
      axios
        .post(`http://localhost:4000/courier/acceptfromresturant`, {
          id: userData != null ? userData._id : null,
          otp: otp.join(""),
          userfcmToken: userData?.customer?.fcmToken,
        })
        .then((res) => {
          console.log("-==res", res);
          if (res?.data?.order) {
            toast.success("Order picked successfully", {
              theme: "dark",
              autoClose: 2000,
            });
            console.log("===ress otp", res);
            setresturantOtp(null);
            setOTP(["", "", "", "", "", ""]);
            setresturanthandle(!resturanthandle);
            setIsValid(false);
          }
          if (res?.data?.message == "please check ones otp") {
            toast.error("OTP is wrong, please check once");
            setIsValid(false);
          }
        })
        .catch((e) => {
          console.log("===eee", e);
        });
    }
  };

  const handleCutomerOtp = async (e) => {
    e.preventDefault();
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
      setIsValid(true);
      axios
        .post(`http://localhost:4000/courier/deliver`, {
          id: userData != null ? userData._id : 0,
          otp: otp.join(""),
          ownerfcmToken: userData?.resturant?.fcmToken,
          deleveryBoyId: userData?.deliveryBoy?._id,
        })
        .then((res) => {
          if (res?.data?.order) {
            toast.success("Order delivered successfully 🔥", {
              theme: "dark",
              autoClose: 2000,
            });
            console.log("===ress otp", res);
            setcustomerOtp(null);
            setOTP(["", "", "", "", "", ""]);
            setcustomerhandle(!customerhandle);
            setIsValid(false);
          }
          if (res?.data?.message == "please check ones otp") {
            toast.error("OTP is wrong, please check once");
            setIsValid(false);
          }
        })
        .catch((e) => {
          console.log("===eee", e);
        });
    }
  };
  return (
    <>
      <div className="bg-gradient-to-bl from-indigo-200 via-red-200 to-yellow-100 pt-24">
        <div className="flex flex-wrap mx-5">
          {/* left side  panel*/}
          <div className="w-full sm:w-2/3 p-5">
            {/* Customer details  */}
            <div className="mb-2 shadow-md rounded bg-white bg-opacity-40 p-3">
              <h1 className="text-2xl font-normal capitalize border-b-2 border-black mb-4 pb-2">
                Customer Details
              </h1>
              <div>
                <table className="table-auto border-spacing-y-3 border-separate">
                  <tr className="">
                    <td className="text-slate-700 text-lg text-semibold pr-5 w-1/6">
                      Name
                    </td>
                    <td className="text-black capitalize bg-white w-screen bg-opacity-20 pl-2 rounded ">
                      {userData !== null ? userData.customer?.name : ""}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-slate-700 text-lg text-semibold pr-5 ">
                      Mobile No.
                    </td>
                    <td className="text-black capitalize bg-white w-full bg-opacity-20 pl-2 rounded">
                      {userData !== null ? userData.customer?.number : ""}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-slate-700 text-lg text-semibold pr-5">
                      E-mail
                    </td>
                    <td className="text-black  bg-white w-full bg-opacity-20 pl-2 rounded">
                      {userData !== null ? userData.customer?.email : ""}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-slate-700 text-lg text-semibold pr-5">
                      Delivery Address
                    </td>
                    <td className="text-black capitalize bg-white w-full bg-opacity-20 pl-2 rounded">
                      {userData !== null
                        ? userData?.customer?.address[0]?.area +
                          " " +
                          userData?.customer?.address[0]?.city +
                          " " +
                          userData?.customer?.address[0]?.state +
                          " - " +
                          userData?.customer?.address[0]?.pincode
                        : ""}
                    </td>
                  </tr>
                </table>
              </div>
            </div>

            {/* customer order details  */}
            <div className="shadow-md rounded bg-white bg-opacity-40 p-3 flex flex-wrap gap-2">
              <h1 className="text-2xl w-full font-normal capitalize border-b-2 border-black mb-4 pb-2">
                Customer order Details
              </h1>
              {userData != null ? (
                userData.products.map((product) => (
                  <OrderSummaryFoodCard product={product} />
                ))
              ) : (
                <></>
              )}
            </div>

            {/* Restaurant details  */}
            <div className="shadow-md rounded bg-white bg-opacity-40 p-3">
              <h1 className="text-2xl font-normal capitalize border-b-2 border-black mb-4 pb-2">
                Restaurant Details
              </h1>
              <div>
                <table className="table-auto border-spacing-y-3 border-separate">
                  <tr className="">
                    <td className="text-slate-700 text-lg text-semibold pr-5 w-1/6">
                      Name
                    </td>
                    <td className="text-black capitalize bg-white w-screen bg-opacity-20 pl-2 rounded ">
                      {userData != null ? userData?.resturant?.name : ""}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-slate-700 text-lg text-semibold pr-5 ">
                      Mobile No.
                    </td>
                    <td className="text-black capitalize bg-white w-full bg-opacity-20 pl-2 rounded">
                      {userData != null ? userData?.resturant?.number : ""}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-slate-700 text-lg text-semibold pr-5">
                      E-mail
                    </td>
                    <td className="text-black bg-white w-full bg-opacity-20 pl-2 rounded">
                      {userData != null ? userData?.resturant?.email : ""}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-slate-700 text-lg text-semibold pr-5">
                      Shipping Address
                    </td>
                    <td className="text-black capitalize bg-white w-full bg-opacity-20 pl-2 rounded">
                      {userData !== null
                        ? userData?.resturant?.address?.area +
                          " " +
                          userData?.resturant?.address?.city +
                          " " +
                          userData?.resturant?.address?.state +
                          " - " +
                          userData?.resturant?.address?.pincode
                        : ""}
                    </td>
                  </tr>
                </table>
              </div>
            </div>
          </div>

          {/* right side panel  */}
          <div className="w-full sm:w-1/3 px-5 mb-3 sm:mb-0 sm:p-5">
            <div className="shadow-md rounded h-full bg-white bg-opacity-40 p-3">
              <h1 className="text-2xl font-normal capitalize border-b-2 border-black mb-4 pb-2">
                Order summary
              </h1>
              <div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <div className="text-slate-500  text-semibold ">
                      Restaurant Name
                    </div>
                    <div className="text-slate-800 font-medium capitalize bg-white bg-opacity-20 rounded ">
                      {userData != null ? userData?.resturant?.name : ""}
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <div className="text-slate-500  text-semibold ">
                      Sub-total
                    </div>
                    <div className="text-slate-800 font-medium capitalize bg-white bg-opacity-20 rounded">
                      ₹{userData != null ? userData?.total : 0}
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-2 pb-2 border-b border-black">
                    <div className="text-slate-500  text-semibold">Charges</div>
                    <div className="text-slate-800 font-medium capitalize bg-white bg-opacity-20 rounded">
                      0
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <div className="text-black  text-lg font-semibold text-semibold">
                      Total
                    </div>
                    <div className="text-black text-lg font-semibold capitalize bg-white bg-opacity-20 rounded">
                      ₹{userData != null ? userData?.total : 0}
                    </div>
                  </div>
                </div>
                {userData != null && userData?.status === "accept" ? (
                  <div className="flex flex-col">
                    <h2 className="my-2 text-lg text-black">
                      Enter Restaurant Otp
                    </h2>
                    <form
                      onSubmit={() => {}}
                      className="flex flex-col items-center mb-5"
                    >
                      <div className="flex justify-center">
                        {otp.map((digit, index) => (
                          <input
                            key={index}
                            type="text"
                            min="0"
                            max="9"
                            ref={refs[index]}
                            className={`w-8 h-8 sm:w-12 sm:h-12 mx-2 text-center text-base sm:text-2xl font-bold border border-gray-400 rounded-lg`}
                            maxLength={1}
                            value={digit}
                            onChange={(event) => handleChange(event, index)}
                            required
                          />
                        ))}
                      </div>
                    </form>
                    <button
                      type="button"
                      disabled={isValid}
                      className={`${
                        isValid ? "bg-black" : "hover:bg-white hover:text-black"
                      } w-full bg-black text-white p-2 rounded-lg mt-2   hover:border duration-200 border border-gray-300`}
                      onClick={handleResturantOtp}
                    >
                      {isValid ? <InlineButtonLoader /> : "Submit"}
                    </button>
                  </div>
                ) : (
                  <></>
                )}
                {userData != null && userData.status === "on the way" ? (
                  <div className="flex flex-col">
                    <h2 className="my-2 text-lg text-black">
                      Enter Customer Otp
                    </h2>
                    <form
                      onSubmit={() => {}}
                      className="flex flex-col items-center mb-5"
                    >
                      <div className="flex justify-center">
                        {otp.map((digit, index) => (
                          <input
                            key={index}
                            type="text"
                            min="0"
                            max="9"
                            ref={refs[index]}
                            className={`w-8 h-8 sm:w-12 sm:h-12 mx-2 text-center text-base sm:text-2xl font-bold border border-gray-400 rounded-lg`}
                            maxLength={1}
                            value={digit}
                            onChange={(event) => handleChange(event, index)}
                            required
                          />
                        ))}
                      </div>
                    </form>
                    <button
                      onClick={handleCutomerOtp}
                      disabled={isValid}
                      className={`${
                        isValid ? "bg-black" : "hover:bg-white hover:text-black"
                      } w-full bg-black text-white p-2 rounded-lg mt-2   hover:border duration-200 border border-gray-300`}
                    >
                      {isValid ? <InlineButtonLoader /> : "Submit"}
                    </button>
                  </div>
                ) : (
                  <></>
                )}

                {userData != null && userData?.status === "delivered" ? (
                  <>
                    <h2 className="text-lg font-medium my-1">Order Status</h2>

                    <span className="text-xs font-semibold font-mono inline-block py-1 px-2 uppercase rounded text-green-600 bg-green-200 last:mr-0 mr-1">
                      delivered Successfully
                    </span>
                  </>
                ) : (
                  <></>
                )}
              </div>
              {
                  userData?.isreviewGiven.forDeliveryBoy === true ?
                    <UserReviewCard review={userData?.deliveryBoyReview}/> : <></>
                  
                }
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderSummary;
