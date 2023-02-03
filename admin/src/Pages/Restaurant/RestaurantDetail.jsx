import React, { useEffect } from "react";
import { BiBed } from "react-icons/bi";
import { Link } from "react-router-dom";
import axios from "axios";
import resto from "../../Assets/resto.jpg";
import avatar from "../../Assets/avatar.jpg";
import { BsWifi } from "react-icons/bs";
import { GrRestaurant } from "react-icons/gr";
import { MdDeliveryDining, MdOutlineSupportAgent } from "react-icons/md";
import { useStateContext } from "../../contexts/ContextProvider";
import { useState } from "react";
import { useParams } from "react-router-dom";
import swal from "sweetalert";
import Restaurants from "../../Apis/Restaurants";

export default function RestaurantDetail() {
  const { rupee, currentColor } = useStateContext();
  const { restaurantId } = useParams();
  const [data, setData] = useState([]);
  useEffect(() => {
    GetRestaurant();
  }, []);
  const GetRestaurant = () => {
    Restaurants.getOneProduct(restaurantId)
      .then((res) => {
        console.log("response", res?.resturant);
        setData(res?.resturant);
      })
      .catch((e) => {
        console.log("=====e", e);
      });
  };
  const handleApicall = (req) => {
    Restaurants.handleRequest(restaurantId, req)
      .then((res) => {
        console.log("=======", res);
        if (res?.data?.message != "") {
          swal({
            title: "Success!",
            text: `Request ${
              req == "approve" ? "approved" : "rejected"
            } successfully.`,
            icon: "success",
            buttons: req == "approve" ? true : false,
            timer: req == "approve" ? null : 1500,
          });
          GetRestaurant();
        } else {
          swal({
            title: "Failed!",
            text: "Something went wrong, please try again",
            icon: "error",
          });
        }
      })
      .catch((e) => {
        swal({
          title: "Failed!",
          text: "Something went wrong, please try again",
          icon: "error",
        });
      });
  };
  const handleSubmit = (req) => {
    if (req == "reject") {
      swal({
        title: "Are you sure?",
        text: "Are you sure! you want to reject this restaurant?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((e) => {
        if (e) {
          handleApicall(req);
        }
      });
    } else {
      handleApicall(req);
    }
  };
  const item = {
    name: "Ganesha chiness",
    address: "18,ring road, surat.",
    type: "small",
    Area: "varachha",
    price: 1011,
    imageLg: resto,
    agent: {
      image: avatar,
      name: "smit dakhra",
    },
  };
  console.log("=====data", data);
  return (
    <section className="px-5">
      {data?.length == 0 ? (
        <div>
          <h1>No restaurant found</h1>
        </div>
      ) : (
        <>
          <div className="container mx-auto min-h-[800px] mb-14 px-2">
            <div className="flex flex-col lg:flex-row lg:items-center lg: justify-between">
              <div>
                <h2 className="text-3xl font-bold dark:text-white">
                  {data.length != 0 ? data?.name : ""}{" "}
                </h2>
                <h3 className="text-lg mb-4 text-slate-400"></h3>
              </div>
              <div className="mb-4 1g:mb-0 flex gap-x-2 text-sm">
                <div className="bg-green-500 text-white px-3 rounded-full">
                  {item.type}
                </div>
                {data?.address?.area && (
                  <div
                    className="text-white px-3 rounded-full"
                    style={{ backgroundColor: currentColor }}
                  >
                    <div> {data?.address?.area} </div>
                  </div>
                )}
              </div>
              <div
                className="text-3xl font-semibold"
                style={{ color: currentColor }}
              >
                {rupee}
                {item.price}{" "}
              </div>
            </div>
            <div className="flex flex-col items-start gap-8 lg:flex-row">
              <div className="max-w-[768px]">
                <div className="mb-8">
                  <img
                    src={item.imageLg}
                    className="rounded-2xl"
                    alt="restaurant image"
                  />
                </div>
                <div
                  className={`flex gap-x-6 mb-6`}
                  style={{ color: currentColor }}
                >
                  <div className="flex gap-x-2 items-center">
                    <MdOutlineSupportAgent className="text-2xl" />
                    <div> 24*7 </div>
                  </div>
                  <div className="flex gap-x-2 items-center">
                    <MdDeliveryDining className="text-2xl" />
                    <div> Mon - Fri </div>
                  </div>
                  <div className="flex gap-x-2 items-center">
                    <BsWifi className="text-2xl" />
                    <div>Free</div>
                  </div>
                </div>
                <div className="dark:text-gray-500">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Et
                  vel laudantium qui consequuntur magnam in molestias quaerat
                  eos odit molestiae.
                </div>
              </div>
              <div className="flex-1 bg-white rounded-md dark:bg-slate-300 w-full mb-8 border border-gray-300 rounded-19 px-6 py-8">
                <div className="flex items-center gap-x-4 mb-4">
                  <div className="w-20 h-20 p-1 border border-gray-300 rounded-full">
                    <img
                      src={item?.agent?.image}
                      alt=""
                      className="rounded-full"
                    />
                  </div>
                  <div>
                    <div className="font-bold text-lg dark:text-white">
                      {" "}
                      {item?.agent?.name}{" "}
                    </div>
                    <div className="text-gray-700 text-sm">{data.email}</div>
                  </div>
                </div>
                <div className="w-full rounded-md   px-3">
                  {data?.address?.city && (
                    <div
                      style={{ flexDirection: "row", display: "flex" }}
                      className="mb-1"
                    >
                      <h3
                        style={{ flex: 1 }}
                        className="text-lg font-semibold "
                      >
                        {"City"}
                      </h3>
                      <p className="text-gray-600 font-semibold">
                        {data?.address?.city}
                      </p>
                    </div>
                  )}
                  {data?.address?.street && (
                    <div
                      style={{ flexDirection: "row", display: "flex" }}
                      className="mb-1"
                    >
                      <h3
                        style={{ flex: 1 }}
                        className="text-lg font-semibold "
                      >
                        {"Landmark"}
                      </h3>
                      <p className="text-gray-600 font-semibold">
                        {data?.address?.street}
                      </p>
                    </div>
                  )}
                  {data?.address?.area && (
                    <div
                      style={{ flexDirection: "row", display: "flex" }}
                      className="mb-1"
                    >
                      <h3
                        style={{ flex: 1 }}
                        className="text-lg font-semibold "
                      >
                        {"Area"}
                      </h3>
                      <p className="text-gray-600 font-semibold">
                        {data?.address?.area}
                      </p>
                    </div>
                  )}
                  {data?.address?.pincode && (
                    <div
                      style={{ flexDirection: "row", display: "flex" }}
                      className="mb-1"
                    >
                      <h3
                        style={{ flex: 1 }}
                        className="text-lg font-semibold "
                      >
                        {"Pincode"}
                      </h3>
                      <p className="text-gray-600 font-semibold">
                        {data?.address?.pincode}
                      </p>
                    </div>
                  )}
                  <div
                    style={{ flexDirection: "row", display: "flex" }}
                    className="mb-1"
                  >
                    <h3 style={{ flex: 1 }} className="text-lg font-semibold ">
                      {"Products"}
                    </h3>
                    <p className="text-gray-600 font-semibold">
                      {data?.product?.length}
                    </p>
                  </div>
                  <div
                    style={{ flexDirection: "row", display: "flex" }}
                    className="mb-5"
                  >
                    <h3 style={{ flex: 1 }} className="text-lg font-semibold ">
                      {"Orders"}
                    </h3>
                    <p className="text-gray-600 font-semibold">
                      {data?.order?.length}
                    </p>
                  </div>
                </div>
                <div className="flex">
                  <button
                    disabled={data?.isApproved != "Accepted" ? false : true}
                    onClick={() => {
                      handleSubmit("approve");
                    }}
                    className={`flex-1 px-3 py-2 text-sm font-medium text-center rounded-lg  border-2 text-blue-600 border-blue-500  ${
                      data?.isApproved != "Accepted"
                        ? "hover:bg-blue-500 hover:border-white hover:text-white text-blue-600 border-blue-500"
                        : "text-gray-600 border-gray-500"
                    } `}
                  >
                    {data?.isApproved != "Accepted" ? "Approve" : "Approved"}
                  </button>
                  <span className="w-10" />
                  <button
                    disabled={data?.isApproved != "Rejected" ? false : true}
                    onClick={() => {
                      handleSubmit("reject");
                    }}
                    className={`flex-1 px-3 py-2 text-sm font-medium text-center rounded-lg  border-2 text-red-600 border-red-500  ${
                      data?.isApproved != "Rejected"
                        ? "hover:bg-red-500 hover:border-white hover:text-white text-red-600 border-red-500"
                        : "text-gray-600 border-gray-500"
                    } `}
                  >
                    {data?.isApproved != "Rejected" ? "Reject" : "Rejected"}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row mb-10">
            <div className="flex-1 sm:w-1/2 p-4 border-2 rounded-lg shadow-lg">
              <h3 className="text-xl font-medium mb-4">Bank Passbook</h3>
              <img
                src={`${data.bankURL ? data?.bankURL : ""}`}
                alt="Bank Passbook"
                className="w-full h-64 object-cover rounded-2xl"
              />
            </div>
            <div className="w-10 h-10"/>
            <div className="flex-1 sm:w-1/2 p-4 border-2 rounded-lg shadow-lg">
              <h3 className="text-xl font-medium mb-4">PAN Card</h3>
              <img
                src={`${data.pancardURL ? data?.pancardURL : ""}`}
                alt="PAN Card"
                className="w-full h-64 object-cover rounded-2xl"
              />
            </div>
          </div>
        </>
      )}
    </section>
  );
}
