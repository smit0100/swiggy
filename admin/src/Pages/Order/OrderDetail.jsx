import React, { useEffect, useState } from "react";
import Order from "../../Apis/Order";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { Blocks } from "react-loader-spinner";
import { Images } from "../../Assets";
import { FoodCard } from "../../Components";

export default function OrderDetail() {
  const { state } = useLocation();
  const [summaryData, setSummaryData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getOrder(state);
  }, []);
  const getOrder = (id) => {
    setLoading(true);
    Order.GetOneOrder(id)
      .then((response) => {
        console.log("=====ress", response);
        if (response?.order) {
          setSummaryData(response?.order);
        }
        setLoading(false);
      })
      .catch((e) => {
        console.log("===e", e);
        setLoading(false);
        toast.error("Something went wrong, please try again");
      });
  };
  console.log("====summaryData", summaryData);
  let qty = 0;
  if (summaryData != null) {
    summaryData.products.map((product) => (qty += product.quantity));
  }
  return (
    <div>
      {loading ? (
        <div className="w-full flex items-center justify-center">
          <Blocks
            visible={loading}
            height="80"
            width="80"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
          />
        </div>
      ) : (
        <div className="bg-gradient-to-tr from-teal-300 to-violet-500 min-h-screen rounded-3xl py-5">
          <div className="flex flex-wrap">
            <div className="w-full sm:w-2/3 p-5">
              <div className="mb-2 shadow-md rounded-tl-3xl rounded-br-3xl bg-white bg-opacity-40 ">
                <h1 className="text-2xl font-normal text-white capitalize border-b-4 border-yellow-300 p-5">
                  Customer Details
                </h1>
                <div className="bg-white pl-5 rounded-br-3xl dark:bg-neutral-700">
                  <table className="table-auto border-spacing-y-3 border-separate">
                    <tr className="">
                      <td className="text-slate-700 dark:text-white text-lg text-semibold pr-5 w-1/6">
                        Name
                      </td>
                      <td className="text-slate-500 font-semibold capitalize dark:bg-slate-300 bg-blue-400 w-full md:w-5/6 bg-opacity-20 p-2 rounded">
                        {summaryData != null ? summaryData?.customer?.name : ""}
                      </td>
                    </tr>
                    <tr>
                      <td className="text-slate-700 dark:text-white text-lg text-semibold pr-5 ">
                        Mobile No.
                      </td>
                      <td className="text-slate-500 font-semibold capitalize bg-blue-400 dark:bg-slate-300 w-full md:w-5/6 bg-opacity-20 p-2 rounded ">
                        {summaryData != null
                          ? summaryData?.customer?.number
                          : ""}
                      </td>
                    </tr>
                    <tr>
                      <td className="text-slate-700 dark:text-white text-lg text-semibold pr-5">
                        E-mail
                      </td>
                      <td className="text-slate-500 font-semibold capitalize bg-blue-400 dark:bg-slate-300 w-full md:w-5/6 bg-opacity-20 p-2 rounded ">
                        {summaryData != null
                          ? summaryData?.customer?.email
                          : ""}
                      </td>
                    </tr>
                    <tr>
                      <td className="text-slate-700 dark:text-white text-lg text-semibold pr-5">
                        Address
                      </td>
                      <td className="text-slate-500 font-semibold capitalize bg-blue-400 dark:bg-slate-300 w-full md:w-5/6 bg-opacity-20 p-2 rounded ">
                        {summaryData != null
                          ? summaryData?.customer?.address[0].area +
                            " " +
                            summaryData?.customer?.address[0].city +
                            " " +
                            summaryData?.customer?.address[0].state +
                            "-" +
                            summaryData?.customer?.address[0].pincode
                          : ""}
                      </td>
                    </tr>
                  </table>
                </div>
              </div>
              {summaryData?.products?.length > 0 && (
                <div className="mb-2 shadow-md rounded-tr-3xl rounded-bl-3xl bg-white bg-opacity-40 ">
                  <h1 className="text-2xl font-normal text-white capitalize border-b-4 border-yellow-300 p-5">
                    Customer Order Details
                  </h1>
                  <div className="bg-white p-5 rounded-bl-3xl dark:bg-neutral-700">
                    <div className="flex flex-wrap">
                      {summaryData != null ? (
                        summaryData?.products?.map((product, index) => (
                          <FoodCard product={product} key={index} />
                        ))
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                </div>
              )}
              {summaryData != null && summaryData?.courierBoyotpNumber && (
                <div className="mb-2 shadow-md rounded-tl-3xl rounded-br-3xl bg-white bg-opacity-40 ">
                  <h1 className="text-2xl font-normal text-white capitalize border-b-4 border-yellow-300 p-5">
                    Delivery Boy Details
                  </h1>
                  <div className="bg-white px-5 rounded-br-3xl dark:bg-neutral-700">
                    <table className="table-auto border-spacing-y-3 border-separate">
                      <tr className="">
                        <td className="text-slate-700 dark:text-white text-lg text-semibold pr-5 w-1/6">
                          Name
                        </td>
                        <td className="text-slate-500 font-semibold capitalize bg-blue-400 dark:bg-slate-300 w-full md:w-5/6 bg-opacity-20 p-2 rounded ">
                          {summaryData != null
                            ? summaryData?.deliveryBoy?.name
                            : ""}
                        </td>
                      </tr>
                      <tr>
                        <td className="text-slate-700 dark:text-white text-lg text-semibold pr-5 ">
                          Mobile No.
                        </td>
                        <td className="text-slate-500 font-semibold capitalize bg-blue-400 dark:bg-slate-300 w-full md:w-5/6 bg-opacity-20 p-2 rounded ">
                          {summaryData != null
                            ? summaryData?.deliveryBoy?.number
                            : ""}
                        </td>
                      </tr>
                      <tr>
                        <td className="text-slate-700 dark:text-white text-lg text-semibold pr-5">
                          E-mail
                        </td>
                        <td className="text-slate-500 font-semibold capitalize bg-blue-400 dark:bg-slate-300 w-full md:w-5/6 bg-opacity-20 p-2 rounded ">
                          {summaryData != null
                            ? summaryData?.deliveryBoy?.email
                            : ""}
                        </td>
                      </tr>
                    </table>
                  </div>
                </div>
              )}
            </div>
            <div className="w-full sm:w-1/3 px-5 sm:p-5 ">
              <div className="border-yellow-300 rounded-4xl border-4 shadow-md h-full bg-gradient-to-b from-teal-200 to-violet-300 p-3">
                <h1 className="text-2xl font-normal capitalize bg-slate-100 mb-4 p-5 rounded-xl">
                  Order summary
                </h1>
                <div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-2">
                      <div className="text-slate-500  text-semibold ">
                        Sub Total
                      </div>
                      <div className="text-slate-800 font-medium capitalize">
                        {summaryData != null ? summaryData?.total : ""}
                      </div>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <div className="text-slate-500  text-semibold">
                        Quantity
                      </div>
                      <div className="text-slate-800 font-medium capitalize">
                        {qty}
                      </div>
                    </div>
                    <div className="flex items-center justify-between gap-2 pb-2 border-b border-black">
                      <div className="text-slate-500  text-semibold">
                        Charges
                      </div>
                      <div className="text-slate-800 font-medium capitalize">
                        50
                      </div>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <div className="text-black  text-lg font-semibold text-semibold">
                        Total
                      </div>
                      <div className="text-black text-lg font-semibold capitalize">
                        {summaryData != null ? summaryData?.total + 50 : 0}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
