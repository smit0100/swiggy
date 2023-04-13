import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentColor, userData } from "../redux/user/userSlice";
import swal from "sweetalert";
import { useEffect } from "react";
import InlineButtonLoader from "./InlineButtonLoader";
import { toast } from "react-toastify";
const RestaurantRegister = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isValid, setIsValid] = useState(true);
  const [isSaveValid, setSaveIsValid] = useState(true);

  const owner = useSelector((state) => state.userData.user);
  const [restaurant, setRestaurent] = useState({
    restaurantName: "",
    restaurantAddress: "",
    area: "",
    city: "",
    state: "",
    pincode: "",
    ownerName: "",
  });

  const [bankNpan, setBankNpan] = useState({
    accountno: "",
    confirmAccountno: "",
    acType: "",
    ifsc: "",
    panno: "",
    panholdername: "",
  });

  const [banknpanError, setBanknpanError] = useState({
    accountno: "",
    confirmAccountno: "",
    ifsc: "",
    panno: "",
    panholdername: "",
  });
  const { accountno, confirmAccountno, ifsc, panno, panholdername, acType } =
    bankNpan;
  const {
    restaurantName,
    restaurantAddress,
    area,
    city,
    state,
    pincode,
    ownerName,
  } = restaurant;

  const [tabOpen, setTabOpen] = useState(1);
  const [pancardPhoto, setPanCardPhoto] = useState(null);
  const [bankDetailsPhoto, setBankDetailsPhoto] = useState(null);
  const [bg1, setBg1] = useState(null);
  const [bg2, setBg2] = useState(null);
  const [bg3, setBg3] = useState(null);

  const [loading, setLoading] = useState(false);

  // error handling section
  const [errorHandle, setErrorHandle] = useState({
    restaurantName: "",
    restaurantAddress: "",
    area: "",
    city: "",
    state: "",
    pincode: "",
    ownerName: "",
  });

  useEffect(() => {
    dispatch(setCurrentColor("black"));
  }, []);
  useEffect(() => {
    if (
      restaurantName &&
      restaurantAddress &&
      area &&
      city &&
      pincode &&
      state &&
      ownerName &&
      errorHandle.restaurantName.length === 0 &&
      errorHandle.restaurantAddress.length === 0 &&
      errorHandle.area.length === 0 &&
      errorHandle.city.length === 0 &&
      errorHandle.state.length === 0 &&
      errorHandle.pincode.length === 0 &&
      errorHandle.ownerName.length === 0
    ) {
      if (
        accountno &&
        confirmAccountno &&
        ifsc &&
        panno &&
        panholdername &&
        acType &&
        banknpanError.accountno === "" &&
        banknpanError.confirmAccountno === "" &&
        banknpanError.ifsc === "" &&
        banknpanError.panno === "" &&
        banknpanError.panholdername === "" &&
        bg1 != null &&
        bg2 != null &&
        bg3 != null &&
        pancardPhoto != null &&
        bankDetailsPhoto != null
      ) {
        setSaveIsValid(false);
      } else {
        setSaveIsValid(true);
      }
      setIsValid(false);
    } else {
      setSaveIsValid(true);
      setIsValid(true);
    }
  }, [
    restaurantName,
    restaurantAddress,
    area,
    city,
    pincode,
    state,
    ownerName,
    errorHandle.restaurantName,
    errorHandle.restaurantAddress,
    errorHandle.area,
    errorHandle.city,
    errorHandle.state,
    errorHandle.pincode,
    errorHandle.ownerName,
    accountno,
    confirmAccountno,
    ifsc,
    panno,
    panholdername,
    acType,
    banknpanError,
    banknpanError,
    banknpanError,
    banknpanError,
    banknpanError,
    bg1,
    bg2,
    bg3,
    pancardPhoto,
    bankDetailsPhoto,
  ]);

  const handleRestaurantName = (e) => {
    setRestaurent({ ...restaurant, [e.target.name]: e.target.value });
    console.log(restaurantName);
    if (restaurantName === null || restaurantName === "") {
      setErrorHandle({
        ...errorHandle,
        [e.target.name]: "Enter your shop name",
      });
    } else {
      setErrorHandle({ ...errorHandle, [e.target.name]: "" });
    }
  };
  const handleRestaurantAddress = (e) => {
    setRestaurent({ ...restaurant, [e.target.name]: e.target.value });
    if (restaurantAddress === null || restaurantAddress === "") {
      setErrorHandle({
        ...errorHandle,
        [e.target.name]: "Enter your shop address",
      });
    } else {
      setErrorHandle({ ...errorHandle, [e.target.name]: "" });
    }
  };
  const handleArea = (e) => {
    setRestaurent({ ...restaurant, [e.target.name]: e.target.value });
    if (area === null || area === "") {
      setErrorHandle({
        ...errorHandle,
        [e.target.name]: "Please Enter area name",
      });
    } else {
      setErrorHandle({ ...errorHandle, [e.target.name]: "" });
    }
  };
  const handlePincode = (e) => {
    setRestaurent({ ...restaurant, [e.target.name]: e.target.value });
    const regex = /^\d{6}$/;
    if (!regex.test(e.target.value)) {
      setErrorHandle({
        ...errorHandle,
        [e.target.name]: "Enter correct pincode",
      });
    } else {
      setErrorHandle({ ...errorHandle, [e.target.name]: "" });
    }
  };
  const handleCity = (e) => {
    setRestaurent({ ...restaurant, [e.target.name]: e.target.value });
    if (city === null || city === "") {
      setErrorHandle({
        ...errorHandle,
        [e.target.name]: "Please Enter city name",
      });
    } else {
      setErrorHandle({ ...errorHandle, [e.target.name]: "" });
    }
  };
  const handleState = (e) => {
    setRestaurent({ ...restaurant, [e.target.name]: e.target.value });
    if (state === null || state === "") {
      setErrorHandle({
        ...errorHandle,
        [e.target.name]: "Please Enter state name",
      });
    } else {
      setErrorHandle({ ...errorHandle, [e.target.name]: "" });
    }
  };
  const handleOwnerName = (e) => {
    setRestaurent({ ...restaurant, [e.target.name]: e.target.value });
    var regex = /^[\sA-Za-z]+$/;
    if (!regex.test(e.target.value)) {
      setErrorHandle({ ...errorHandle, [e.target.name]: "Enter your name" });
    } else {
      setErrorHandle({ ...errorHandle, [e.target.name]: "" });
    }
  };

  const handleACno = (e) => {
    setBankNpan({ ...bankNpan, [e.target.name]: e.target.value });
    var regex = /^\d{11,18}$/;
    if (!regex.test(e.target.value)) {
      setBanknpanError({
        ...banknpanError,
        [e.target.name]: "Please enter your account no",
      });
    } else {
      setBanknpanError({ ...banknpanError, [e.target.name]: "" });
    }
  };

  const handleConfirmACno = (e) => {
    setBankNpan({ ...bankNpan, [e.target.name]: e.target.value });
    console.log(e.target.value, bankNpan.confirmAccountno);
    var regex = /^\d{11,18}$/;
    if (!regex.test(e.target.value)) {
      setBanknpanError({
        ...banknpanError,
        [e.target.name]: "Please re-enter your account no",
      });
    } else if (e.target.value != bankNpan.accountno) {
      setBanknpanError({
        ...banknpanError,
        [e.target.name]: "please enter same account number",
      });
    } else {
      setBanknpanError({ ...banknpanError, [e.target.name]: "" });
    }
  };

  const handleAcType = (e) => {
    setBankNpan({ ...bankNpan, [e.target.name]: e.target.value });
    console.log(e.target.value);
    console.log(bankNpan);
  };

  const handleifsc = (e) => {
    setBankNpan({ ...bankNpan, [e.target.name]: e.target.value });
    var regex = /^[A-Za-z]{4}\d{7}$/;
    if (!regex.test(e.target.value)) {
      setBanknpanError({
        ...banknpanError,
        [e.target.name]: "Please enter bank IFSC code",
      });
    } else {
      setBanknpanError({ ...banknpanError, [e.target.name]: "" });
    }
  };
  const handlepanno = (e) => {
    setBankNpan({ ...bankNpan, [e.target.name]: e.target.value });
    var regex = /^[A-Z]{5}\d{4}[A-Z]{1}$/;
    if (!regex.test(e.target.value)) {
      setBanknpanError({
        ...banknpanError,
        [e.target.name]: "Please enter valid PAN number",
      });
    } else {
      setBanknpanError({ ...banknpanError, [e.target.name]: "" });
    }
  };

  const handlepanholder = (e) => {
    setBankNpan({ ...bankNpan, [e.target.name]: e.target.value });
    var regex = /^[\sA-Za-z]+$/;
    if (!regex.test(e.target.value)) {
      setBanknpanError({
        ...banknpanError,
        [e.target.name]: "Please enter your name",
      });
    } else {
      setBanknpanError({ ...banknpanError, [e.target.name]: "" });
    }
  };

  // for next step
  function handleFirstForm(e) {
    if (
      restaurantName &&
      restaurantAddress &&
      area &&
      city &&
      pincode &&
      state &&
      ownerName &&
      errorHandle.restaurantName.length === 0 &&
      errorHandle.restaurantAddress.length === 0 &&
      errorHandle.area.length === 0 &&
      errorHandle.city.length === 0 &&
      errorHandle.state.length === 0 &&
      errorHandle.pincode.length === 0 &&
      errorHandle.ownerName.length === 0
    ) {
      return (
        <button
          onClick={() => setTabOpen(2)}
          className={`${
            isValid ? "bg-black" : "hover:bg-white hover:text-black"
          } md:w-1/3 w-full bg-black text-white p-2 rounded-lg mt-4 hover:border duration-200 border border-gray-300`}
        >
          Next {">"}
        </button>
      );
    } else {
      return (
        <button
          disabled
          onClick={() => setTabOpen(2)}
          className={`${
            isValid ? "bg-black" : "hover:bg-white hover:text-black"
          } md:w-1/3 w-full bg-black text-white p-2 rounded-lg mt-4 hover:border duration-200 border border-gray-300`}
        >
          Next {">"}
        </button>
      );
    }
  }
  async function handleUpload(e) {
    e.preventDefault();
    const id = toast.loading(`Processing your request\n,Please wait...`);
    const formData = new FormData();

    const address = {
      street: restaurantAddress,
      area: area,
      state: state,
      city: city,
      pincode: pincode,
    };

    const bankDetails = {
      ACnumber: bankNpan?.accountno,
      IFSC: bankNpan?.ifsc,
      actype: bankNpan?.acType,
    };

    const pancardDetail = {
      holderName: bankNpan.panholdername,
      number: bankNpan.panno,
    };

    formData.append("bank", bankDetailsPhoto);
    formData.append("pancard", pancardPhoto);
    formData.append("address", JSON.stringify(address));
    formData.append("name", restaurantName);
    formData.append("ownerName", ownerName);
    formData.append("bg1", bg1);
    formData.append("bg2", bg2);
    formData.append("bg3", bg3);
    formData.append("bankDetails", JSON.stringify(bankDetails));
    formData.append("panCard", JSON.stringify(pancardDetail));
    formData.append("id", owner._id);
    console.log("=====formData", formData);
    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:4000/resturant/add",
        formData
      );
      console.log(res);
      setLoading(false);
      navigate("/");
      toast.update(id, {
        render: "Request created successfully👌",
        type: "default",
        isLoading: false,
        autoClose: 2000,
        closeOnClick: true,
        draggable: true,
        pauseOnHover: false,
      });
      toast.dismiss(id);
      dispatch(userData(res.data.response));
      localStorage.setItem("ownerData", JSON.stringify(res?.data?.response));
      swal("Registration successfully", "", "success");
    } catch (err) {
      console.log(err);
    }
  }

  const handleLogOut = () => {
    swal({
      title: "Are you Sure! you want to go back?",
      icon: "warning",
      buttons: ["NO", "YES"],
      cancelButtonColor: "#DD6B55",
      confirmButtonColor: "#DD6B55",
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        navigate("/");
      }
    });
  };
  return (
    <div className="pt-24">
      <div className="mx-2 md:mx-10 flex flex-wrap">
        <div className="w-full sm:w-[25%] p-5">
          <ul className="space-y-3">
            <li
              className={`text-lg ${
                true
                  ? "border-blue-800 border-2"
                  : "bg-black border-slate-200 border-2"
              } font-mono font-semibold text-blue-800 pl-5 py-2  rounded-3xl hover:pl-8 duration-300`}
            >
              Restaurant information
            </li>

            <li className="bg-black h-1 w-full rounded-full"></li>
            <li
              className={`text-base ${
                tabOpen == 1
                  ? "border-slate-700 border-2"
                  : "bg-slate-200 border-slate-200 border-2"
              } font-mono font-semibold text-black pl-5 py-2 cursor-pointer  rounded-3xl hover:pl-8 duration-300 hover:border-black hover:text-white hover:bg-black`}
              onClick={() => setTabOpen(1)}
            >
              Restaurant Details
            </li>
            <li
              className={`text-base ${
                tabOpen == 2
                  ? "border-slate-700 border-2"
                  : "bg-slate-200 border-slate-200 border-2"
              } font-mono font-semibold text-black pl-5 py-2 cursor-pointer  rounded-3xl hover:pl-8 duration-300 hover:border-black hover:text-white hover:bg-black`}
              onClick={() => setTabOpen(2)}
            >
              Other Details
            </li>
            <li
              className={`text-base ${"bg-slate-200 border-slate-200 border-2"} font-mono font-semibold text-black pl-5 py-2 cursor-pointer  rounded-3xl hover:pl-8 duration-300 hover:border-black hover:text-white hover:bg-black`}
              onClick={handleLogOut}
            >
              Cancel
            </li>
          </ul>
        </div>

        {/* Restaurant information  */}
        {tabOpen === 1 && (
          <div className="w-full sm:w-3/4">
            <form className="lg:px-16 lg:py-10 p-5 bg-slate-200 lg:w-10/12 hover:shadow-2xl duration-300 shadow-lg lg:mx-10 rounded-2xl my-5">
              <h1 className="font-bold text-2xl">&bull; Restaurant Details</h1>
              <h3 className="text-slate-500 mb-10 pl-5 text-xs">
                Name, Address and location
              </h3>
              <div className="flex flex-wrap mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Restaurant name
                  </label>
                  <input
                    className="appearance-none duration-300 focus:shadow-2xl block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded-md py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                    id="grid-first-name"
                    type="text"
                    placeholder="Restaurant name"
                    name="restaurantName"
                    value={restaurantName}
                    onBlur={handleRestaurantName}
                    onChange={handleRestaurantName}
                  />
                  <span className="text-sm text-red-500">
                    {errorHandle.restaurantName}
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap mb-6">
                <div className="w-full px-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Address
                  </label>
                  <textarea
                    className="appearance-none duration-300 focus:shadow-2xl block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded-md py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                    type="text"
                    placeholder="Address"
                    value={restaurantAddress}
                    name="restaurantAddress"
                    onChange={handleRestaurantAddress}
                    onBlur={handleRestaurantAddress}
                  />
                  <span className="text-sm text-red-500">
                    {errorHandle.restaurantAddress}
                  </span>
                </div>
              </div>
              <h1 className="font-bold text-2xl">
                &bull; Restaurant address details
              </h1>
              <h3 className="text-slate-500 mb-5 pl-5 text-xs">
                Address details are basis the restaurant location mentioned
                above
              </h3>
              <div className="flex flex-wrap mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Area
                  </label>
                  <input
                    className="appearance-none duration-300 focus:shadow-2xl block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded-md py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                    id="grid-first-name"
                    type="text"
                    value={area}
                    placeholder="Area"
                    name="area"
                    onChange={handleArea}
                    onBlur={handleArea}
                  />
                  <span className="text-sm text-red-500">
                    {errorHandle.area}
                  </span>
                </div>
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Pin code
                  </label>
                  <input
                    className="appearance-none duration-300 focus:shadow-2xl block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded-md py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                    id="grid-first-name"
                    type="text"
                    placeholder="Pin code"
                    name="pincode"
                    value={pincode}
                    onChange={handlePincode}
                    onBlur={handlePincode}
                  />
                  <span className="text-sm text-red-500">
                    {errorHandle.pincode}
                  </span>
                </div>
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    City
                  </label>
                  <input
                    className="appearance-none block duration-300 focus:shadow-2xl w-full bg-gray-100 text-gray-700 border border-gray-200 rounded-md py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                    id="grid-first-name"
                    type="text"
                    placeholder="City"
                    value={city}
                    onChange={handleCity}
                    onBlur={handleCity}
                    name="city"
                  />
                  <span className="text-sm text-red-500">
                    {errorHandle.city}
                  </span>
                </div>
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    State
                  </label>
                  <input
                    className="appearance-none duration-300 block focus:shadow-2xl w-full bg-gray-100 text-gray-700 border border-gray-200 rounded-md py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                    id="grid-first-name"
                    type="text"
                    placeholder="State"
                    onChange={handleState}
                    onBlur={handleState}
                    value={state}
                    name="state"
                  />
                  <span className="text-sm text-red-500">
                    {errorHandle.state}
                  </span>
                </div>
              </div>
            </form>
            <form className="lg:p-16 p-5 bg-slate-200 lg:w-10/12 hover:shadow-2xl duration-300 shadow-lg lg:mx-10 rounded-2xl my-5">
              <h1 className="font-bold text-2xl">
                &bull; Restaurant Owner name
              </h1>
              <h3 className="text-slate-500 mb-5 pl-5 text-xs">
                Your Customer will call on this nanme for general enquiries
              </h3>
              <div className="flex flex-wrap mb-6">
                <div className="w-full px-3 mb-6 md:mb-0">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Restaurant name
                  </label>
                  <input
                    className="appearance-none duration-300 focus:shadow-2xl block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded-md py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                    onChange={handleOwnerName}
                    onBlur={handleOwnerName}
                    value={ownerName}
                    type="text"
                    id="name"
                    name="ownerName"
                    placeholder="Owner full name"
                  />
                  <span className="text-sm text-red-500">
                    {errorHandle.ownerName}
                  </span>
                  <div className="flex justify-end pt-12">
                    {handleFirstForm()}
                  </div>
                </div>
              </div>
            </form>
          </div>
        )}

        {/* Upload images  */}
        {tabOpen === 2 && (
          <div className="w-full sm:w-3/4">
            <form className="lg:px-16 lg:py-10 p-5 bg-slate-200 hover:shadow-2xl duration-500 lg:w-10/12 shadow-lg lg:mx-10 rounded-2xl my-5">
              <h1 className="font-bold text-2xl">&bull; Bank details</h1>
              <h3 className="text-slate-500 mb-10 pl-5 text-xs">
                Let us know where to diposit your money
              </h3>
              <div className="flex flex-wrap mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Account number
                  </label>
                  <input
                    className="appearance-none duration-500 focus:shadow-2xl block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded-md py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                    id="grid-first-name"
                    type="text"
                    name="accountno"
                    onChange={handleACno}
                    onBlur={handleACno}
                    placeholder="Bank account number"
                  />
                  <span className="text-sm text-red-500">
                    {banknpanError.accountno}
                  </span>
                </div>
                <div className="w-full md:w-1/2 px-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Re-enter Account number
                  </label>
                  <input
                    className="appearance-none duration-500 focus:shadow-2xl block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded-md py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                    id="grid-last-name"
                    type="text"
                    name="confirmAccountno"
                    placeholder="Re-enter account number"
                    onChange={handleConfirmACno}
                    onBlur={handleConfirmACno}
                  />

                  <span className="text-sm text-red-500">
                    {banknpanError.confirmAccountno}
                  </span>
                </div>
                <div className="w-full lg:w-1/2 px-3 mb-6 md:mb-0">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Account type
                  </label>
                  <div className="relative">
                    <select
                      className="block duration-500 focus:shadow-2xl appearance-none w-full bg-gray-100 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                      name="acType"
                      onChange={handleAcType}
                      onBlur={handleAcType}
                    >
                      <option value="">Select account type</option>
                      <option value="saving">Saving account</option>
                      <option value="current">Current account</option>
                    </select>
                  </div>
                </div>
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    IFSC code
                  </label>
                  <input
                    className="appearance-none duration-500 focus:shadow-2xl block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded-md py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                    id="grid-first-name"
                    type="text"
                    name="ifsc"
                    onChange={handleifsc}
                    onBlur={handleifsc}
                    placeholder="Bank IFSC code"
                  />
                  <span className="text-sm text-red-500">
                    {banknpanError.ifsc}
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap mb-2">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Upload passbook photo
                  </label>
                  <div className="mt-4">
                    <label className="block">
                      <span className="sr-only">Choose profile photo</span>
                      <input
                        type="file"
                        className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-1 file:border-violet-500 file:text-sm file:font-semibold   file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
                        onChange={(e) => setBankDetailsPhoto(e.target.files[0])}
                        id="formFile"
                        name="bank"
                      />
                    </label>
                  </div>
                </div>
              </div>
            </form>
            <form className="lg:px-16 lg:py-10 p-5 bg-slate-200 hover:shadow-2xl duration-500 lg:w-10/12 shadow-lg lg:mx-10 rounded-2xl my-5">
              <h1 className="font-bold text-2xl">&bull; PAN detail</h1>
              <h3 className="text-slate-500 mb-10 pl-5 text-xs">
                Let us know where to diposit your money
              </h3>
              <div className="flex flex-wrap mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    PAN Number
                  </label>
                  <input
                    className="appearance-none duration-500 focus:shadow-2xl block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded-md py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                    id="grid-first-name"
                    type="text"
                    name="panno"
                    onChange={handlepanno}
                    onBlur={handlepanno}
                    placeholder="PAN Number"
                  />
                  <span className="text-sm text-red-500">
                    {banknpanError.panno}
                  </span>
                </div>
                <div className="w-full md:w-1/2 px-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    PAN holder name
                  </label>
                  <input
                    className="appearance-none duration-500 focus:shadow-2xl block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded-md py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                    id="grid-last-name"
                    type="text"
                    name="panholdername"
                    onChange={handlepanholder}
                    onBlur={handlepanholder}
                    placeholder="PAN holder name"
                  />
                  <span className="text-sm text-red-500">
                    {banknpanError.panholdername}
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap mb-2">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Upload PAN card image
                  </label>
                  <div className="mt-4">
                    <label className="block">
                      <span className="sr-only">Choose PAN card image</span>
                      <input
                        name="pancard"
                        className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-1 file:border-violet-500 file:text-sm file:font-semibold   file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
                        onChange={(e) => setPanCardPhoto(e.target.files[0])}
                        type="file"
                        id="formFile"
                      />
                    </label>
                  </div>
                </div>
              </div>
            </form>
            <form className="lg:px-16 lg:pt-10 p-5 bg-slate-200 hover:shadow-2xl duration-500 lg:w-10/12 shadow-lg lg:mx-10 rounded-2xl my-5">
              <h1 className="font-bold text-2xl">&bull; Restaurant Images</h1>
              <h3 className="text-slate-500 mb-10 pl-5 text-xs">
                Let us know how your restaurant looks like
              </h3>
              <div className="flex flex-wrap mb-2">
                <div className="w-full px-3 mb-6 md:mb-0">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 ">
                    Upload image 1
                  </label>
                  <div className="mt-2">
                    <label className="block">
                      <span className="sr-only">Choose image 1</span>
                      <input
                        className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-1 file:border-violet-500 file:text-sm file:font-semibold   file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
                        name="bg1"
                        type="file"
                        id="formFile"
                        onChange={(e) => setBg1(e.target.files[0])}
                      />
                    </label>
                  </div>
                </div>
                <div className="w-full px-3 mb-6 md:mb-0">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-4">
                    Upload image 2
                  </label>
                  <div className="mt-2">
                    <label className="block">
                      <span className="sr-only">Choose image 2</span>
                      <input
                        className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-1 file:border-violet-500 file:text-sm file:font-semibold   file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
                        name="bg2"
                        type="file"
                        id="formFile"
                        onChange={(e) => setBg2(e.target.files[0])}
                      />
                    </label>
                  </div>
                </div>
                <div className="w-full px-3 mb-6 md:mb-0">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-4">
                    Upload image 3
                  </label>
                  <div className="mt-2">
                    <label className="block">
                      <span className="sr-only">Choose image 3</span>
                      <input
                        className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-1 file:border-violet-500 file:text-sm file:font-semibold   file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
                        name="bg3"
                        type="file"
                        id="formFile"
                        onChange={(e) => setBg3(e.target.files[0])}
                      />
                    </label>
                  </div>
                  <div className="text-center mt-5">
                    <button
                      className={`${
                        isSaveValid
                          ? "bg-black"
                          : "hover:bg-white hover:text-black"
                      } md:w-1/3 w-full bg-black text-white p-2 rounded-lg mt-4 hover:border duration-200 border border-gray-300`}
                      onClick={handleUpload}
                      disabled={isSaveValid}
                    >
                      {loading ? <InlineButtonLoader /> : "Save"}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantRegister;
