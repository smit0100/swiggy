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
import { useParams } from "react-router-dom"
import swal from "sweetalert";

export default function RestaurantDetail() {
  const { rupee, currentColor } = useStateContext();
  const { restaurantId } = useParams();
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(false);
  useEffect(() => {
    (async () => {
      setLoad(true)
      const response = await axios.get(`http://localhost:4000/resturant/products?id=${restaurantId}`)
      setData(response.data.resturant)
      console.log(response.data);
      setLoad(false)
    })()
  }, [])


  const handelReject = async (type) => {
    const reject = axios.get(`http://localhost:4000/resturant/reject/${restaurantId}`)
    if(reject){
      swal("Rejected!", "!", "warning");
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
      <div className="container mx-auto min-h-[800px] mb-14 px-2">
        <div className="flex flex-col lg:flex-row lg:items-center lg: justify-between">
          <div>
            <h2 className="text-3xl font-bold ">
              {load == false && data.length != 0 ? data.name : ""}{" "}
            </h2>
            <h3 className="text-lg mb-4 text-slate-400"></h3>
            {/* <p className="text-lg mb-4 text-slate-400">Owner email : {load == false && data.length != 0 ? data.email:""}</p> */}
          </div>
          <div className="mb-4 1g:mb-0 flex gap-x-2 text-sm">
            <div className="bg-green-500 text-white px-3 rounded-full">
              {item.type}
            </div>
            <div
              className="text-white px-3 rounded-full"
              style={{ backgroundColor: currentColor }}
            >
              <div> {data?.address?.area} </div>
            </div>
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
            <div>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Et vel
              laudantium qui consequuntur magnam in molestias quaerat eos odit
              molestiae.
            </div>
          </div>
          <div className="flex-1 bg-white w-full mb-8 border border-gray-300 rounded-19 px-6 py-8">
            <div className="flex items-center gap-x-4 mb-4">
              <div className="w-20 h-20 p-1 border border-gray-300 rounded-full">
                <img src={item?.agent?.image} alt="" className="rounded-full" />
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
              <div
                style={{ flexDirection: "row", display: "flex" }}
                className="mb-1"
              >
                <h3 style={{ flex: 1 }} className="text-lg font-semibold ">
                  {"City"}
                </h3>
                <p className="text-gray-600 font-semibold">
                  {data?.address?.city}
                </p>
              </div>
              <div
                style={{ flexDirection: "row", display: "flex" }}
                className="mb-1"
              >
                <h3 style={{ flex: 1 }} className="text-lg font-semibold ">
                  {"Landmark"}
                </h3>
                <p className="text-gray-600 font-semibold">
                  {data?.address?.street}
                </p>
              </div>
              <div
                style={{ flexDirection: "row", display: "flex" }}
                className="mb-1"
              >
                <h3 style={{ flex: 1 }} className="text-lg font-semibold ">
                  {"Area"}
                </h3>
                <p className="text-gray-600 font-semibold">
                  {data?.address?.area}
                </p>
              </div>
              <div
                style={{ flexDirection: "row", display: "flex" }}
                className="mb-1"
              >
                <h3 style={{ flex: 1 }} className="text-lg font-semibold ">
                  {"Pincode"}
                </h3>
                <p className="text-gray-600 font-semibold">
                  {data?.address?.pincode}
                </p>
              </div>
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
                onClick={() => {}}
                className="flex-1 px-3 py-2 text-sm font-medium text-center rounded-lg  border-2 text-blue-600 border-blue-500 hover:border-white hover:text-white hover:bg-blue-500 "
              >
                Approve
              </button>
              <span className="w-10" />
              <button
                onClick={() => {}}
                className="flex-1 px-3 py-2 text-sm font-medium text-center hover:text-white hover:border-white hover:bg-red-700 rounded-lg  border-2 text-red-600 border-red-500 "
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="bottom-8 w-full h-96 flex justify-evenly">
        <div className="w-2/5 h-full relative">
              <img src={`${load == false && data.length != 0 ? data.bankURL:""}`} alt="img" className="absolute w-full h-full object-contain" />
              <p className="text-white">Bank Passbook</p>
        </div>
        <div className="w-2/5 h-full relative ">
        <img src={`${load == false && data.length != 0 ? data.pancardURL:""}`} alt="img" className="absolute w-full h-full object-contain" />
        <p className="text-white">Pancard</p>

        </div>
      </div>
    </section>
  );
}
