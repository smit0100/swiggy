import React,{useState,useEffect  } from "react";
import { Link } from "react-router-dom";
import dateFormat from "dateformat";
import { BsArrowRightCircle } from "react-icons/bs";
import { AiTwotoneStar } from "react-icons/ai";

const OrderDetailsCard = ({ items }) => {
  console.log(items);
  const [bgReview,setBgReview] = useState("bg-green-600")

  useEffect(() => {
    if (items != null && items.resturant!=null && items.resturant.rating!=null) {
      if (+items?.resturant.rating <= 1.5) {
        setBgReview("bg-red-600") 
      } else if (+items.resturant.rating > 1.5 && items.resturant.rating < 3.5) {
        setBgReview("bg-orange-600") 
      } else {
        setBgReview("bg-green-600") 
      }
    }
  }, [])
  

 
  return (
    <div className="flex w-[32%] relative  text-gray-900 antialiased">
      <div>
        <div className="overflow-hidden w-full   rounded-lg">
        <img src={items?.resturant?.bgImageUrl[0]} alt=" random imgee" className=" w-full rounded-lg object-cover object-center hover:scale-110 shadow-md transition-all duration-300" />
        </div>
        <Link to={`/orderDetails/${items._id}`}>
          <div className="relative group -mt-16 px-4 hover:skew-x-1 transition-all duration-500">
            <div className="rounded-lg bg-orange-200 p-5 shadow-lg">
              <div className="flex items-baseline justify-between">
                <div className="text-xs font-semibold uppercase tracking-wider text-gray-600">
                  {dateFormat(items.createdAt, "dd")} &bull;{" "}
                  {dateFormat(items.createdAt, "mm")} &bull;{" "}
                  {dateFormat(items.createdAt, "yyyy")}
                </div>
                <div className="text-xs font-semibold uppercase tracking-wider text-gray-600">
                  {dateFormat(items.createdAt, "H")} :&nbsp;
                  {dateFormat(items.createdAt, "M")} 
                </div>
              </div>
              <h4 className="mt-1 truncate text-xl font-semibold uppercase leading-tight">
                {items?.resturant?.name}
              </h4>
              <div className="mt-1 font-medium">
                ₹{items?.total}
                <span className="text-sm text-gray-600"> /Total Amout</span>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-md font-semibold text-teal-600">
                  <div
                    className={` ${bgReview} py-1 my-2  px-3 bg-green-600 flex items-center w-fit rounded-md text-white font-bold `}
                  >
                    {/* {items != null && items.resturant.rating} &nbsp;{" "} */}
                    {/* <AiTwotoneStar /> */}
                  </div>
                </span>
                <BsArrowRightCircle className="text-xl group-hover:translate-x-3 transition-all duration-500" />
              </div>
            </div>
          </div>
        </Link>
        {/* <div className='hidden'><CustomerOrderCard items={items}/></div>   */}
      </div>
    </div>
  );
};

export default OrderDetailsCard