import React, { useEffect, useState } from "react";
import axios from "axios";
import { userData } from "../redux/user/userSlice";
import { useSelector, useDispatch } from "react-redux";
import swal from "sweetalert";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import InlineButtonLoader from "./InlineButtonLoader";
import { toast } from "react-toastify";

const UserAddress = () => {
  const user = useSelector((state) => state.userData.user);

  const [updateAddress, setUpdateAddress] = useState(false);
  const [changeAddress, setChangeAddress] = useState("");

  const [showModal, setShowModal] = useState(false);

  const [address, setaddress] = useState("");
  const [addressError, setAddressError] = useState("");
  const [city, setCity] = useState("");
  const [cityError, setCityError] = useState("");
  const [state, setState] = useState("");
  const [stateError, setStateError] = useState("");
  const [pincode, setPincode] = useState("");
  const [pincodeError, setPincodeError] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [isValidAdd, setIsValidAdd] = useState(false);
  const [isAddLoading, setIsAddLoading] = useState(false);
  const [isValidLoading, setIsValidLoading] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    if (
      address &&
      city &&
      state &&
      pincode &&
      addressError.length === 0 &&
      cityError.length === 0 &&
      stateError.length === 0 &&
      pincodeError.length === 0
    ) {
      setIsValidAdd(false);
      setIsValid(false);
    } else {
      setIsValidAdd(true);
      setIsValid(true);
    }
  }, [
    address,
    city,
    state,
    pincode,
    addressError,
    cityError,
    stateError,
    pincodeError,
  ]);

  const handleAddress = (e) => {
    setaddress(e.target.value);
    if (address === null || address === "") {
      setAddressError("Please enter address");
    } else {
      setAddressError("");
    }
  };

  const handleCity = (e) => {
    setCity(e.target.value);
    if (city === null || city === "") setCityError("Please Enter city name");
    else setCityError("");
  };

  const handleState = (e) => {
    setState(e.target.value);
    if (state === null || state === "")
      setStateError("Please enter state name");
    else setStateError("");
  };

  const handlePincode = (e) => {
    setPincode(e.target.value);
    const regex = /^\d{6}$/;
    if (!regex.test(e.target.value)) setPincodeError("Enter correct pincode");
    else if (pincode === null || pincode === "")
      setPincodeError("You not leave it empty");
    else setPincodeError("");
  };

  const handleSubmitForAddress = async (e) => {
    e.preventDefault();
    setIsAddLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASEURL}/user/addAddress`,
        {
          itemId: changeAddress,
          userId: user._id,
          area: address,
          city: city,
          state: state,
          pincode: pincode,
        }
      );
      console.log(response.data.response);
      dispatch(userData(response.data.response));
      localStorage.setItem(
        "userData",
        JSON.stringify(response?.data?.response)
      );
      setaddress("");
      setCity("");
      setState("");
      setPincode("");
      toast.success("🔥Address saved successfully.");
      setIsAddLoading(false);
      setShowModal(false);
    } catch (err) {
      console.log(err);
      setIsAddLoading(false);
    }
  };

  const handelChangeAddress = async (e) => {
    e.preventDefault();
    setIsValidLoading(true);
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BASEURL}/user/editAddress`,
        {
          itemId: changeAddress,
          userId: user._id,
          area: address,
          city: city,
          state: state,
          pincode: pincode,
        }
      );
      console.log(response.data);
      dispatch(userData(response.data.response));
      localStorage.setItem(
        "userData",
        JSON.stringify(response?.data?.response)
      );
      setaddress("");
      setCity("");
      setState("");
      setPincode("");
      setChangeAddress("");
      swal("Address changed successfully", "", "success");
      setIsValidLoading(false);
    } catch (err) {
      if (err.response.status == 500) {
        swal(`${err.response.data.message}`, "", "error");
      }
      setIsValidLoading(false);
    }
  };
  const handleDelete = (ids) => {
    swal({
      title: "Are you sure! you want to delete this address?",
      icon: "warning",
      buttons: ["NO", "YES"],
      cancelButtonColor: "#DD6B55",
      confirmButtonColor: "#DD6B55",
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        addressDelete(ids);
      }
    });
  };
  const addressDelete = async (id) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASEURL}/user/delteAddress?userId=${user._id}&itemId=${id}`
      );
      dispatch(userData(response.data.response));
      localStorage.setItem(
        "userData",
        JSON.stringify(response?.data?.response)
      );
      toast.success("🔥Address deleted successfully.");
    } catch (err) {
      if (err) {
        swal("something went wrong", "", "error");
      }
    }
  };

  const fillAddress = (address, city, state, pincode) => {
    setaddress(address);
    setCity(city);
    setState(state);
    setPincode(pincode);
  };
  const clearAddress = () => {
    setaddress("");
    setCity("");
    setState("");
    setPincode("");
    setChangeAddress("");
    setAddressError("");
    setCityError("");
    setStateError("");
    setPincodeError("");
  };

  return (
    <div>
      {/* all address list  */}
      <div className="flex flex-wrap gap-2 justify-center">
        {user !== null && user.address && user.address.length !== 0 ? (
          user.address.map((address, i) => (
            <div className=" w-full md:w-[32%] sm:w-[49%] flex shadow-black hover:shadow-xl bg-orange-100 p-3 rounded-3xl">
              <div className="flex flex-row w-full sm:block justify-between">
                <div className="flex flex-col">
                  <HiOutlineLocationMarker className="text-center" />
                  <p className="font-semibold text-xl">Address {i + 1}</p>
                  <p className="w-10/12 font-[350] text-slate-500">
                    {address.area +
                      " " +
                      address.city +
                      " " +
                      address.state +
                      "-" +
                      address.pincode}
                  </p>
                  <p className="font-semibold text-sm uppercase py-5 ">
                    16 mins
                  </p>
                </div>
                <div className="sm:block space-y-2  flex flex-col justify-end">
                  <button
                    onClick={() => {
                      setUpdateAddress(true);
                      setChangeAddress(address._id);
                      fillAddress(
                        address.area,
                        address.city,
                        address.state,
                        address.pincode
                      );
                    }}
                    className="rounded-full bg-orange-100 hover:text-white hover:bg-black -bottom-4 font-bold  border-2 border-black w-fit p-2 ml-1 text-xs uppercase  transition hover:scale-110 hover:shadow-xl focus:outline-none text-black"
                  >
                    <FiEdit size={20} className="hover:scale-110" />
                  </button>
                  <button
                    className=" inline-block bg-orange-100 hover:text-white hover:bg-red-600 -bottom-4 font-bold  rounded-full border-2 border-red-600 w-fit p-2 ml-1 text-xs uppercase  text-red-600 transition hover:scale-110 hover:shadow-xl focus:outline-none"
                    onClick={() => {
                      handleDelete(address._id);
                    }}
                  >
                    <FiTrash2 size={20} className="hover:scale-110" />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <></>
        )}

        {/* add new address component  */}
        <div className="w-full md:w-[32%] sm::w-[49%] flex shadow-black hover:shadow-xl  bg-orange-100 p-3 rounded-3xl">
          <div className="py-2 flex-1">
            <HiOutlineLocationMarker className="text-center" />
            <p className="font-semibold text-xl">Add New Address</p>
            <button
              className="w-[50%] text-center hover:bg-black text-black hover:text-white p-2 rounded-lg duration-200 border border-black uppercase mt-5"
              type="button"
              onClick={() => setShowModal(true)}
            >
              add new
            </button>
            {showModal && (
              <>
                <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                  <div className="relative my-6 mx-auto w-auto md:w-1/3">
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                      <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-xl font-semibold text-gray-900">
                          Add New Address
                        </h3>
                        <button
                          type="button"
                          onClick={() => {
                            setShowModal(false);
                            clearAddress();
                          }}
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
                          <label htmlFor="address">Address</label>
                          <div className="relative flex w-full flex-wrap items-stretch mb-3">
                            <span className="z-10 h-full leading-snug font-normal text-center flex  text-slate-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                              <i className="fas fa-location"></i>
                            </span>
                            <textarea
                              type="text"
                              id="address"
                              value={address}
                              onBlur={handleAddress}
                              onChange={handleAddress}
                              placeholder="Enter your address"
                              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 pl-10"
                            ></textarea>
                          </div>
                          <span className="text-red-500 text-sm">
                            {addressError}
                          </span>
                          <label htmlFor="city">City</label>
                          <div className="relative flex w-full flex-wrap items-stretch mb-3">
                            <span className="z-10 h-full leading-snug font-normal  text-center text-slate-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                              <i className="fas fa-map"></i>
                            </span>
                            <input
                              type="text"
                              value={city}
                              onBlur={handleCity}
                              onChange={handleCity}
                              id="city"
                              placeholder="Your city name"
                              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 pl-10"
                            />
                          </div>
                          <span className="text-red-500 text-sm">
                            {cityError}
                          </span>
                          <label htmlFor="state">state</label>
                          <div className="relative flex w-full flex-wrap items-stretch mb-3">
                            <span className="z-10 h-full leading-snug font-normal  text-center text-slate-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                              <i className="fas fa-map"></i>
                            </span>
                            <input
                              type="text"
                              id="state"
                              placeholder="Your state name"
                              onBlur={handleState}
                              onChange={handleState}
                              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 pl-10"
                            />
                          </div>
                          <span className="text-red-500 text-sm">
                            {stateError}
                          </span>
                          <label htmlFor="pincode">Pincode</label>
                          <div className="relative flex w-full flex-wrap items-stretch mb-3">
                            <span className="z-10 h-full leading-snug font-normal  text-center text-slate-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                              <i className="fas fa-location"></i>
                            </span>
                            <input
                              type="text"
                              maxLength={6}
                              value={pincode}
                              onBlur={handlePincode}
                              onChange={handlePincode}
                              placeholder="Enter picode"
                              id="pincode"
                              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 pl-10"
                            />
                          </div>
                          <span className="text-red-500 text-sm">
                            {pincodeError}
                          </span>
                        </form>
                      </div>
                      {/*footer*/}
                      <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                        <button
                          type="button"
                          disabled={isValidAdd}
                          className={`${
                            isValidAdd
                              ? "bg-black"
                              : "hover:bg-white hover:text-black"
                          } w-full bg-black text-white p-2 rounded-lg hover:border duration-200 border border-gray-300`}
                          onClick={(e) => {
                            handleSubmitForAddress(e);
                          }}
                        >
                          {isAddLoading ? (
                            <InlineButtonLoader />
                          ) : (
                            "Save Address"
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* update your Address  */}
      {updateAddress ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative my-6 mx-auto w-auto md:w-1/3">
              <div className="border-0 px-5 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                  <h3 className="text-xl font-semibold text-gray-900">
                    Edit Address
                  </h3>
                  <button
                    type="button"
                    onClick={() => {
                      setUpdateAddress(false);
                      clearAddress();
                    }}
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
                <div className="relative px-6 pt-6 flex-auto space-x-4">
                  <form className="flex flex-col">
                    <label htmlFor="address">Address</label>
                    <div className="relative flex w-full flex-wrap items-stretch mb-3">
                      <span className="z-10 h-full leading-snug font-normal text-center flex  text-slate-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                        <i className="fas fa-location"></i>
                      </span>
                      <textarea
                        type="text"
                        id="address"
                        value={address}
                        onBlur={handleAddress}
                        onChange={handleAddress}
                        placeholder="Enter your address"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 pl-10"
                      ></textarea>
                    </div>
                    <span className="text-red-500 text-sm">{addressError}</span>
                    <label htmlFor="city">City</label>
                    <div className="relative flex w-full flex-wrap items-stretch mb-3">
                      <span className="z-10 h-full leading-snug font-normal  text-center text-slate-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                        <i className="fas fa-map"></i>
                      </span>
                      <input
                        type="text"
                        value={city}
                        onBlur={handleCity}
                        onChange={handleCity}
                        id="city"
                        placeholder="Your city name"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 pl-10"
                      />
                    </div>
                    <span className="text-red-500 text-sm">{cityError}</span>
                    <label htmlFor="state">state</label>
                    <div className="relative flex w-full flex-wrap items-stretch mb-3">
                      <span className="z-10 h-full leading-snug font-normal  text-center text-slate-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                        <i className="fas fa-map"></i>
                      </span>
                      <input
                        type="text"
                        value={state}
                        id="state"
                        placeholder="Your state name"
                        onBlur={handleState}
                        onChange={handleState}
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 pl-10"
                      />
                    </div>
                    <span className="text-red-500 text-sm">{stateError}</span>
                    <label htmlFor="pincode">Pincode</label>
                    <div className="relative flex w-full flex-wrap items-stretch mb-3">
                      <span className="z-10 h-full leading-snug font-normal  text-center text-slate-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                        <i className="fas fa-location"></i>
                      </span>
                      <input
                        type="text"
                        value={pincode}
                        onBlur={handlePincode}
                        onChange={handlePincode}
                        placeholder="Enter picode"
                        id="pincode"
                        maxLength={6}
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 pl-10"
                      />
                    </div>
                    <span className="text-red-500 text-sm">{pincodeError}</span>
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
                      setUpdateAddress(false);
                      handelChangeAddress(e);
                      clearAddress();
                    }}
                  >
                    {isValidLoading ? <InlineButtonLoader /> : "Save"}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </div>
  );
};

export default UserAddress;
