import React from "react";
import { BiBed } from "react-icons/bi";
import { Link } from "react-router-dom";
import resto from "../../Assets/resto.jpg";
import avatar from "../../Assets/avatar.jpg";
import { BsWifi } from "react-icons/bs";
import { GrRestaurant } from "react-icons/gr";
import { MdDeliveryDining, MdOutlineSupportAgent } from "react-icons/md";
import { useStateContext } from "../../contexts/ContextProvider";

export default function RestaurantDetail() {
  const {rupee} = useStateContext();

  const item = {
    name: "Ganesha chiness",
    address: "18,ring road, surat.",
    type: "small",
    Area: "varachha",
    price: 1011,
    imageLg: resto,
    agent:{
        image:avatar,
        name:"smit dakhra"
    }
  };
  return (
    <section>
      <div className="container mx-auto min-h-[800px] mb-14 px-2">
        <div className="flex flex-col lg:flex-row lg:items-center lg: justify-between">
          <div>
            <h2 className="text-2x1 font-bold">{item.name} </h2>
            <h3 className="text-1g mb-4"> {item.address}</h3>
          </div>
          <div className="mb-4 1g:mb-0 flex gap-x-2 text-sm">
            <div className="bg-green-500 text-white px-3 rounded-full">
              {item.type}
            </div>
            <div className="bg-violet-500 text-white px-3 rounded-full">
              <div> {item.Area} </div>
            </div>
          </div>
          <div className="text-3xl font-semibold text-violet-800">
            {rupee}{item.price}{" "}
          </div>
        </div>
        <div className="flex flex-col items-start gap-8 lg:flex-row">
          <div className="max-w-[768px]">
            <div className="mb-8">
              <img src={item.imageLg} alt="" />
            </div>
            <div className="flex gap-x-6 text-violet-800 mb-6">
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
            <div className="flex items-center gap-x-4 mb-8">
              <div className="w-20 h-20 p-1 border border-gray-300 rounded-full">
                <img src={item?.agent?.image} alt="" className="rounded-full" />
              </div>
              <div>
                <div className="font-bold text-lg"> {item?.agent?.name} </div>
                <Link to="/" className="text-violet-700 text-sm">
                  View More
                </Link>
              </div>
            </div>
            <div className="flex">
          <button
            onClick={()=>{}}
            className="flex-1 px-3 py-2 text-sm font-medium text-center rounded-lg  border-2 text-blue-600 border-blue-500 hover:border-white hover:text-white hover:bg-blue-500 dark:bg-blue-600 dark:hover:bg-blue-700"
          >
            Approve
          </button>
          <span className="w-10" />
          <button
            onClick={()=>{}}
            className="flex-1 px-3 py-2 text-sm font-medium text-center hover:text-white hover:border-white hover:bg-red-700 rounded-lg  border-2 text-red-600 border-red-500 dark:bg-red-600 dark:hover:bg-red-500"
          >
            Reject
          </button>
        </div>
          </div>
        </div>
      </div>
    </section>
  );
}
