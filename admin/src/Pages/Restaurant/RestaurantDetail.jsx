import React, { useEffect } from "react";
import { BiBed } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
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
import { Images } from "../../Assets";

export default function RestaurantDetail() {
  const navigate = useNavigate();
  const { rupee, currentColor } = useStateContext();
  const { restaurantId } = useParams();
  const [isOpen, setIsOpen] = useState("");

  console.log("userIDuserIDuserIDuserID", restaurantId);
  const [data, setData] = useState([]);
  useEffect(() => {
    GetRestaurant();
  }, []);
  const GetRestaurant = () => {
    Restaurants.getOneProduct(restaurantId)
      .then((res) => {
        console.log("resresresresres", res);
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
  const handleDelete = () => {
    swal({
      title: "Are you sure?",
      text: "Are you sure! you want to delete this restaurant?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((e) => {
      if (e) {
        Restaurants.deleteRestaurant(restaurantId)
          .then((res) => {
            if (res?.message == "Resturant deleted") {
              toast.success("👌 restaurant deleted successfully.");
              navigate("/request");
            }
          })
          .catch((re) => {
            console.log("===re", re);
            toast.error("☹️ Something went wrong,try again");
          });
      }
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
  const handleClick = (value) => {
    setIsOpen(value);
  };
  const item = {
    name: "Ganesha chiness",
    address: "18,ring road, surat.",
    type: "small",
    Area: "varachha",
    price: 1011,
    imageLg: resto,
    agent: {
      image: Images.user2,
      name: "smit dakhra",
    },
  };
  return (
    <section className="px-5">
      {data?.length == 0 ? (
        <div>
          <h1>No restaurant found</h1>
        </div>
      ) : (
        <>
          <div className="container mx-auto min-h-[800px] px-2">
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
              {/* <div
                className="text-3xl font-semibold"
                style={{ color: currentColor }}
              >
                {rupee}
                {item.price}{" "}
              </div> */}
            </div>
            <div className="flex flex-col items-start gap-8 lg:flex-row">
              <div className="max-w-[768px]">
                <div className="mb-8 md:min-w-[700px]">
                  <img
                    src={
                      data?.bgImageUrl?.length > 0
                        ? data?.bgImageUrl[0]
                        : item.imageLg
                    }
                    className="rounded-2xl w-full md:h-[520px]"
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
                {data?.outLetType.length > 0 && (
                  <div className="dark:text-gray-500">
                    <h1 className="font-semibold dark:text-white">Outlets :</h1>
                    {data?.outLetType?.map((item, index) => {
                      return (
                        <div
                          key={index}
                          className="flex items-center justify-strt"
                        >
                          <div className="h-2 w-2 mx-2 rounded-full bg-gray-700" />
                          <h3>{item}</h3>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
              <div className="flex-1 bg-white rounded-md dark:bg-slate-300 w-full mb-8 border border-gray-300 rounded-19 px-6 py-8">
                <div className="flex items-center gap-x-4 mb-4">
                  <div className="w-20 h-20 p-1 border border-gray-300 dark:border-2 dark:border-gray-500 rounded-full">
                    <img
                      src={item?.agent?.image}
                      alt=""
                      className="rounded-full"
                    />
                  </div>
                  <div>
                    <div className="font-bold text-lg dark:text-white">
                      {data?.ownerName}
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
                        className="text-lg font-semibold mr-2"
                      >
                        {"Landmark"}
                      </h3>
                      <p className="text-gray-600 font-semibold text-right">
                        {data?.address?.street}
                      </p>
                    </div>
                  )}
                  {data?.address?.state && (
                    <div
                      style={{ flexDirection: "row", display: "flex" }}
                      className="mb-1"
                    >
                      <h3
                        style={{ flex: 1 }}
                        className="text-lg font-semibold mr-2"
                      >
                        {"State"}
                      </h3>
                      <p className="text-gray-600 font-semibold text-right">
                        {data?.address?.state}
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
                    className={`flex-1 px-3 py-2 text-sm font-medium text-center rounded-lg  border-2 ${
                      data?.isApproved != "Accepted"
                        ? "hover:bg-blue-500 hover:border-white hover:text-white text-blue-600 border-blue-500"
                        : "text-gray-600 border-gray-500"
                    } `}
                  >
                    {data?.isApproved != "Accepted" ? "Approve" : "Approved"}
                  </button>
                  <span className="w-2" />
                  <button
                    disabled={data?.isApproved != "Rejected" ? false : true}
                    onClick={() => {
                      handleSubmit("reject");
                    }}
                    className={`flex-1 px-3 py-2 text-sm font-medium text-center rounded-lg  border-2  ${
                      data?.isApproved == "Rejected"
                        ? "text-gray-600 border-gray-500"
                        : "hover:bg-red-500 hover:border-white hover:text-white text-red-600 border-red-500"
                    } `}
                  >
                    {data?.isApproved != "Rejected" ? "Reject" : "Rejected"}
                  </button>
                  <span className="w-2" />
                  <button
                    onClick={() => {
                      handleDelete();
                    }}
                    className={`flex-1 px-3 py-2 text-sm font-medium text-center rounded-lg border-2 border-purple-700 text-purple-700 hover:bg-purple-700 hover:text-white `}
                  >
                    {"Delete"}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row mb-10">
            {data?.bankDetails &&
              data?.bankDetails?.ACnumber != "" &&
              data?.bankDetails?.IFSC != "" &&
              data?.bankDetails?.actype != "" && (
                <div className="flex-1 sm:w-1/2 p-4 border-2 dark:border-gray-700 dark:hover:shadow-gray-500 dark:hover:shadow-sm rounded-lg shadow-lg">
                  <h3 className="text-xl font-bold mb-4 dark:text-white">
                    Bank Details
                  </h3>
                  <div className="rounded-xl p-5 mb-4 bg-slate-200 dark:bg-slate-300 hover:shadow-md">
                    <div
                      style={{ flexDirection: "row", display: "flex" }}
                      className="mb-1"
                    >
                      <h3
                        style={{ flex: 1 }}
                        className="text-lg font-semibold "
                      >
                        {"Account Number :"}
                      </h3>
                      <p className="text-gray-600 font-semibold">
                        {data?.bankDetails?.ACnumber}
                      </p>
                    </div>
                    <div
                      style={{ flexDirection: "row", display: "flex" }}
                      className="mb-1"
                    >
                      <h3
                        style={{ flex: 1 }}
                        className="text-lg font-semibold "
                      >
                        {"IFSC Code :"}
                      </h3>
                      <p className="text-gray-600 font-semibold">
                        {data?.bankDetails?.IFSC}
                      </p>
                    </div>
                    <div
                      style={{ flexDirection: "row", display: "flex" }}
                      className="mb-1"
                    >
                      <h3
                        style={{ flex: 1 }}
                        className="text-lg font-semibold "
                      >
                        {"Account Type :"}
                      </h3>
                      <p className="text-gray-600 font-semibold">
                        {data?.bankDetails?.actype}
                      </p>
                    </div>
                  </div>
                  <h1 className="mt-3 mb-2 font-semibold dark:text-white">
                    Bank PassBook :
                  </h1>
                  <img
                    src={`${data.bankURL ? data?.bankURL : ""}`}
                    alt="Bank Passbook"
                    className="w-full h-64 object-cover rounded-2xl hover:shadow-md cursor-pointer"
                    onClick={()=>handleClick(data?.bankURL)}
                  />
                </div>
              )}
            {isOpen !=""  && (
              <div className="fixed top-0 left-0 h-full w-full flex items-center justify-center z-50 bg-black/50">
                <div className="bg-gray-900 text-white rounded-lg overflow-hidden relative">
                  <img
                    src={isOpen}
                    className="w-[400px] h-[250px] sm:w-[600px]  sm:h-[350px] object-cover"
                    alt="backbone"
                  />
                </div>
                <div
                  className="absolute inset-0 h-screen cursor-pointer w-screen bg-black/50 -z-10"
                  onClick={() => setIsOpen("")}
                ></div>
              </div>
            )}
            <div className="w-10 h-10" />
            {data?.panCard?.holderName && data?.panCard && (
              <div className="flex-1 sm:w-1/2 p-4 border-2 rounded-lg shadow-lg dark:hover:shadow-gray-500 dark:hover:shadow-sm dark:border-gray-700">
                <h3 className="text-xl font-bold mb-4 dark:text-white">
                  Pan Card Details
                </h3>
                <div className="rounded-xl p-5 mb-4 bg-slate-200 dark:bg-slate-300 hover:shadow-md">
                  <div
                    style={{ flexDirection: "row", display: "flex" }}
                    className="mb-1"
                  >
                    <h3 style={{ flex: 1 }} className="text-lg font-semibold ">
                      {"Holder Name :"}
                    </h3>
                    <p className="text-gray-600 font-semibold">
                      {data?.panCard?.holderName}
                    </p>
                  </div>
                  <div
                    style={{ flexDirection: "row", display: "flex" }}
                    className="mb-1"
                  >
                    <h3 style={{ flex: 1 }} className="text-lg font-semibold ">
                      {"Mobile Number :"}
                    </h3>
                    <p className="text-gray-600 font-semibold">
                      {data?.number}
                    </p>
                  </div>
                </div>
                <h1 className="mt-3 mb-2 font-semibold dark:text-white">
                  Pan Card :
                </h1>

                <img
                  src={`${data.pancardURL ? data?.pancardURL : ""}`}
                  alt="PAN Card"
                  className="w-full h-64 object-cover rounded-2xl cursor-pointer hover:shadow-md"
                  onClick={()=>handleClick(data?.pancardURL)}
                />
              </div>
            )}
          </div>
        </>
      )}
    </section>
  );
}
