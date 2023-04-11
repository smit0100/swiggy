import axios from "axios";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userData } from "../redux/user/userSlice";
import StripeCheckout from "react-stripe-checkout";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { cartData } from "../redux/cart/cartSlice";
import { toast } from "react-toastify";
import { FiEdit, FiTrash2 } from "react-icons/fi";

const CheckoutPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [address, setaddress] = useState("");
  const [addressError, setAddressError] = useState("");
  const [city, setCity] = useState("");
  const [cityError, setCityError] = useState("");
  const [state, setState] = useState("");
  const [stateError, setStateError] = useState("");
  const [pincode, setPincode] = useState("");
  const [pincodeError, setPincodeError] = useState("");
  const [selectedAddress, setSelectedAddress] = useState("");

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const user = useSelector((state) => state.userData.user);
  const cart = useSelector((state) => state.cartData.cart);
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
  const makePayment = async (token) => {
    console.log("this is token", token);
    const header = {
      "Content-Type": "application/json",
    };
    try {
      axios
        .post(`${process.env.REACT_APP_BASEURL}/payment`, {
          customer: user._id,
          addressId: selectedAddress,
        })
        .then((response) => {
          handleDelivery(address);
          console.log("=====payment res:::", response);
          swal("Order place successfully..", "", "success");
          navigate("/");
          dispatch(cartData(null));
        })
        .catch((e) => {
          handleDelivery(address);
          console.log("===error payment:::", e);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelivery = async (address) => {
    console.log("hello how are you");
    let pr =
      cart != null &&
      cart.product.map((item) => {
        return {
          product: item.product._id,
          quantity: item.quantity,
        };
      });

    if (user != null && cart != null) {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BASEURL}/order/create`,
          {
            customer: user._id,
            total: cart.total,
            resturant: cart.resturant,
            address,
          }
        );
        // console.log(response);
      } catch (err) {
        console.log(err);
      }
    }
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASEURL}/user/addAddress`,
        {
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
      toast.success("🔥Address saved successfully.");
    } catch (err) {
      console.log(err);
    }
  };

  const handlePayment = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASEURL}/payment/create-checkout-session`
      );
    } catch (err) {
      console.log(err);
    }
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
      console.log(err);
    }
  };

  return (
    <>
      <div className="pt-28 rounded-md">
        <div className=" px-14 justify-center">
          <div className="mb-5 shadow-md rounded-tl-3xl md:w-[50%] rounded-br-3xl bg-orange-700 bg-opacity-40 ">
            <h1 className="text-2xl font-normal text-white capitalize border-b-4 border-yellow-300 p-5">
              Logged in
            </h1>
            <div className="bg-orange-200 pl-5 rounded-br-3xl">
              <table className="table-auto border-spacing-y-3 border-separate">
                <tr className="">
                  <td className="text-white text-lg text-semibold pr-5 w-1/6">
                    {user != null && user.name}
                  </td>
                  <td className="text-white font-semibold capitalize bg-opacity-20 p-1 px-2 border-l-2 border-black">
                    {user != null && user.number}
                  </td>
                </tr>
              </table>
            </div>
          </div>
          <div className="mb-12 shadow-md rounded-bl-3xl rounded-tr-3xl bg-orange-700 bg-opacity-40 ">
            <p className="text-2xl font-normal text-white capitalize px-5 pt-5">
              Select delivery address
            </p>
            <p className="font-[400] text-slate-500 px-5 pb-5 border-b-4 border-yellow-300">
              You have a saved address in this location
            </p>
            <div className="bg-orange-200 pl-5 py-5 rounded-bl-3xl">
              <div className="flex flex-wrap gap-5">
                {user !== null &&
                  user.address.length !== 0 &&
                  user.address.map((address, i) => (
                    <div className="w-full md:w-[32%] sm:w-[49%] flex shadow-black hover:shadow-xl bg-orange-100 p-3 rounded-3xl">
                      <div className="flex flex-row w-full p-1 sm:block justify-between">
                        <div>
                          <HiOutlineLocationMarker className="text-center" />
                        </div>
                        <div className="py-2">
                          <p className="font-semibold text-xl">
                            Address {i + 1}
                          </p>
                          <p className="w-10/12 font-[350] text-slate-500">
                            {address.area +
                              " " +
                              address.city +
                              " " +
                              address.state +
                              "-" +
                              address.pincode}
                          </p>

                          <div className="flex justify-start items-center mt-4 ">
                            <StripeCheckout
                              stripeKey={
                                process.env.REACT_APP_PUBLIC_KEY_PAYMENT
                              }
                              token={makePayment}
                              namee="buy product"
                              amount={String(Number(cart?.total) * 100)}
                              currency="INR"
                            >
                              <button
                                className="text-center hover:bg-black text-black hover:text-white p-2 px-5 rounded-2xl uppercase duration-200 border border-black"
                                onClick={() => {
                                  setSelectedAddress(address._id);
                                }}
                              >
                                deliver here
                              </button>
                            </StripeCheckout>
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
                    </div>
                  ))}

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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showModal ? (
        <>
          <div className="justify-center items-center flex  fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-xl font-semibold">Add New Address</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className=" text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                      X
                    </span>
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
                        className="px-3 py-3 resize-none placeholder-slate-300 text-slate-600 relative  bg-white rounded text-sm border border-slate-300 outline-none focus:outline-none focus:ring w-full pl-10"
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
                        className="px-3 py-3 placeholder-slate-300 text-slate-600 relative bg-white rounded text-sm border border-slate-300 outline-none focus:outline-none focus:ring w-full pl-10"
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
                        id="state"
                        placeholder="Your state name"
                        onBlur={handleState}
                        onChange={handleState}
                        className="px-3 py-3 placeholder-slate-300 text-slate-600 relative bg-white rounded text-sm border border-slate-300 outline-none focus:outline-none focus:ring w-full pl-10"
                      />
                    </div>
                    <span className="text-red-500 text-sm">{stateError}</span>
                    <label htmlFor="pincode">Pincode</label>
                    <div className="relative flex w-full flex-wrap items-stretch mb-3">
                      <span className="z-10 h-full leading-snug font-normal  text-center text-slate-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                        <i className="fas fa-location"></i>
                      </span>
                      <input
                        type="number"
                        value={pincode}
                        onBlur={handlePincode}
                        onChange={handlePincode}
                        placeholder="Enter picode"
                        id="pincode"
                        className="px-3 py-3 placeholder-slate-300 text-slate-600 relative bg-white  rounded text-sm border border-slate-300 outline-none focus:outline-none focus:ring w-full pl-10"
                      />
                    </div>
                    <span className="text-red-500 text-sm">{pincodeError}</span>
                  </form>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={(e) => {
                      setShowModal(false);
                      handleSubmit(e);
                    }}
                  >
                    Save Address
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};
export default CheckoutPage;
