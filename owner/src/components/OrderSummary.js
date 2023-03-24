import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import OrderSummaryFoodCard from "./OrderSummaryFoodCard";
import InlineButtonLoader from "./InlineButtonLoader";
import Loader from "./Loader";

// import io from 'socket.io-client';
// const socket = io("http://localhost:4000");

const OrderSummary = () => {
  const { state } = useLocation();
  const [summaryData, setSummaryData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:4000/order/fetchOneOrder?id=${state}`
      );
      console.log(response);
      setSummaryData(response.data.order);
      setLoading(false);
    })();
  }, []);

  const getDistance = (lat1, lon1, lat2, lon2) => {
    console.log("===", lat1, lon1, lat2, lon2);
    const R = 6371; // Radius of the earth in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in km
    return distance.toFixed(2);
  };

  const handleOrder = async () => {
    axios
      .get(`http://localhost:4000/order/acceptOrder?id=${state}`)
      .then((response) => {
        console.log("=====>>>",response);
        if (response?.data?.response) { 
          setSummaryData(response?.data?.response);
        }
      })
      .catch((e) => console.log("===e", e));
  };

  let qty = 0;
  if (summaryData != null) {
    summaryData.products.map((product) => (qty += product.quantity));
  }
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="bg-gradient-to-bl from-indigo-200 via-red-200 to-yellow-100 ">
          <div className="flex flex-wrap mx-5">
            <div className="w-full sm:w-2/3 p-5">
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
                        {summaryData != null ? summaryData.customer.name : ""}
                      </td>
                    </tr>
                    <tr>
                      <td className="text-slate-700 text-lg text-semibold pr-5 ">
                        Mobile No.
                      </td>
                      <td className="text-black capitalize bg-white w-full bg-opacity-20 pl-2 rounded">
                        {summaryData != null ? summaryData.customer.number : ""}
                      </td>
                    </tr>
                    <tr>
                      <td className="text-slate-700 text-lg text-semibold pr-5">
                        E-mail
                      </td>
                      <td className="text-black capitalize bg-white w-full bg-opacity-20 pl-2 rounded">
                        {summaryData != null ? summaryData.customer.email : ""}
                      </td>
                    </tr>
                    <tr>
                      <td className="text-slate-700 text-lg text-semibold pr-5">
                        Address
                      </td>
                      <td className="text-black capitalize bg-white w-full bg-opacity-20 pl-2 rounded">
                        {summaryData != null
                          ? summaryData.customer.address[0].area +
                            " " +
                            summaryData.customer.address[0].city +
                            " " +
                            summaryData.customer.address[0].state +
                            "-" +
                            summaryData.customer.address[0].pincode
                          : ""}
                      </td>
                    </tr>
                  </table>
                </div>
              </div>

              <div className="shadow-md rounded bg-white bg-opacity-40 p-3 flex flex-wrap gap-2">
                <h1 className="text-2xl w-full font-normal capitalize border-b-2 border-black mb-4 pb-2">
                  Customer order Details
                </h1>
                {summaryData != null ? (
                  summaryData.products.map((product) => (
                    <OrderSummaryFoodCard product={product} />
                  ))
                ) : (
                  <></>
                )}
              </div>
              {summaryData != null && summaryData.courierBoyotpNumber ? (
                <div className="shadow-md rounded bg-white bg-opacity-40 p-3">
                  <h1 className="text-2xl font-normal capitalize border-b-2 border-black mb-4 pb-2">
                    Delivery Boy Details
                  </h1>
                  <div>
                    <table className="table-auto border-spacing-y-3 border-separate">
                      <tr className="">
                        <td className="text-slate-700 text-lg text-semibold pr-5 w-1/6">
                          Name
                        </td>
                        <td className="text-black capitalize bg-white w-screen bg-opacity-20 pl-2 rounded ">
                          {summaryData != null &&
                            summaryData.deliveryBoy != null &&
                            summaryData.deliveryBoy.name}
                        </td>
                      </tr>
                      <tr>
                        <td className="text-slate-700 text-lg text-semibold pr-5 ">
                          Mobile No.
                        </td>
                        <td className="text-black capitalize bg-white w-full bg-opacity-20 pl-2 rounded">
                          {summaryData != null &&
                            summaryData.deliveryBoy != null &&
                            summaryData.deliveryBoy.number}
                        </td>
                      </tr>
                      <tr>
                        <td className="text-slate-700 text-lg text-semibold pr-5">
                          E-mail
                        </td>
                        <td className="text-black capitalize bg-white w-full bg-opacity-20 pl-2 rounded">
                          {summaryData != null &&
                            summaryData.deliveryBoy != null &&
                            summaryData.deliveryBoy.email}
                        </td>
                      </tr>
                      <tr>
                        <td className="text-slate-700 text-lg text-semibold pr-5">
                          Address
                        </td>
                        <td className="text-black capitalize bg-white w-full bg-opacity-20 pl-2 rounded">
                          {/* {summaryData != null && summaryData.deliveryBoy != null &&  summaryData.deliveryBoy.address[0].area +
                          " " +
                          summaryData.deliveryBoy.address[0].city +
                          " " +
                          summaryData.deliveryBoy.address[0].state +
                          "-" +
                          summaryData.deliveryBoy.address[0].pincode
                          } */}
                        </td>
                      </tr>
                    </table>
                  </div>
                </div>
              ) : (
                <></>
              )}
            </div>
            <div className="w-full sm:w-1/3 px-5 sm:p-5">
              <div className="shadow-md rounded h-full bg-white bg-opacity-40 p-3">
                <h1 className="text-2xl font-normal capitalize border-b-2 border-black mb-4 pb-2">
                  Order summary
                </h1>
                <div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-2">
                      <div className="text-slate-500  text-semibold ">
                        Sub Total
                      </div>
                      <div className="text-slate-800 font-medium capitalize bg-white bg-opacity-20 rounded">
                        {summaryData != null ? summaryData.total : ""}
                      </div>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <div className="text-slate-500  text-semibold">
                        Quantity
                      </div>
                      <div className="text-slate-800 font-medium capitalize bg-white bg-opacity-20 rounded">
                        {qty}
                      </div>
                    </div>
                    <div className="flex items-center justify-between gap-2 pb-2 border-b border-black">
                      <div className="text-slate-500  text-semibold">
                        Charges
                      </div>
                      <div className="text-slate-800 font-medium capitalize bg-white bg-opacity-20 rounded">
                        50
                      </div>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <div className="text-black  text-lg font-semibold text-semibold">
                        Total
                      </div>
                      <div className="text-black text-lg font-semibold capitalize bg-white bg-opacity-20 rounded">
                        {summaryData != null ? summaryData.total + 50 : 0}
                      </div>
                    </div>
                    {summaryData?.customer?.latitude &&
                      summaryData?.customer?.longitude &&
                      summaryData?.resturant?.latitude &&
                      summaryData?.resturant?.longitude && (
                        <div className="flex items-center justify-between gap-2">
                          <div className="text-black  text-lg font-semibold text-semibold">
                            Total Distance
                          </div>
                          <div className="text-black text-lg font-semibold capitalize bg-white bg-opacity-20 rounded">
                            {getDistance(
                              summaryData?.customer?.latitude,
                              summaryData?.customer?.longitude,
                              summaryData?.resturant?.latitude,
                              summaryData?.resturant?.longitude
                            ) + " km"}
                          </div>
                        </div>
                      )}
                  </div>
                  <div className="pt-5">
                    {summaryData !== null && summaryData.courierBoyotpNumber ? (
                      loading ? (
                        <InlineButtonLoader />
                      ) : summaryData.status === "delivered" ? (
                        <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded text-green-600 bg-green-200 last:mr-0 mr-1">
                          delivered Successfully
                        </span>
                      ) : (
                        <div>
                          Courier-Boy OTP :
                          <span className="font-semibold text-lg">
                            {" "}
                            {summaryData.courierBoyotpNumber}
                          </span>
                        </div>
                      )
                    ) : (
                      <button
                        onClick={handleOrder}
                        className="inline-block mt-3 bg-transparent hover:text-white hover:bg-emerald-600 -bottom-4 font-bold  rounded border border-current px-8 py-[6px] text-xs uppercase  text-emerald-600 transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:text-emereld-500"
                      >
                        Accept Order
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderSummary;
