import React from "react";
import { RxCrossCircled } from "react-icons/rx";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { VscTrash } from "react-icons/vsc";
import { Images } from "../Assets";
import { Link } from "react-router-dom";

export default function DeliveryBoyCard(props) {
  const { name, email, image, number, isAvilable, isApproved, _id } =
    props.data;
  return (
    <div className="mt-20 md:mt-28">
      <div className="bg-slate-200 dark:bg-gray-800 h-64 w-80 md:w-96 md:rounded-3xl rounded-tl-3xl drop-shadow-xl rounded-br-3xl rounded-tr-lg rounded-bl-lg shadow-md relative flex flex-col items-center justify-between md:items-start py-5 md:p-5 transition-all duration-150">
        <Link to={`/deliveryboy/${_id}`} state={props.data}>
          <img
            className="rounded-tr-3xl rounded-tl-3xl rounded-br-3xl rounded-bl-sm w-28 h-28 absolute -top-12 transform md:scale-110 duration-300 hover:shadow-2xl drop-shadow-lg"
            src={image ? image : Images.user2}
            alt="Delivery boy"
          />
        </Link>

        <div className="align-middle text-2xl md:pl-3 font-semibold text-black text-center mt-11 md:m-0 md:mt-14 dark:text-white">
          {name}
        </div>
        <div
          className="w-1/3 py-1 rounded-lg md:absolute right-5 shadow-lg"
          style={{ backgroundColor: isAvilable ? "#35fc03 " : "red" }}
        >
          <p className="w-full text-center text-white text-sm">
            {isAvilable ? "Available" : "On delivery"}
          </p>
        </div>
        <div className="flex w-full px-3">
          <div className="text-black font-semibold dark:text-slate-300">
            Email:
          </div>
          <div className="w-full text-right text-gray-500 dark:text-slate-400">
            {email}
          </div>
        </div>
        <div className="flex mb-10 w-full px-3">
          <div className="text-black font-semibold dark:text-slate-300">
            Mobile:
          </div>
          <div className="w-full text-right text-gray-500 dark:text-slate-400">
            {"+91 " + number}
          </div>
        </div>

        <div className="flex w-full justify-around absolute -bottom-7 md:-ml-5">
          <button
            className={`rounded-3xl drop-shadow-lg w-14 h-14 ${
              isApproved != "approved" ? "hover:shadow-xl" : ""
            } bg-white backdrop-blur-lg`}
            onClick={() => props.handleSubmit("accept")}
            disabled={isApproved == "approved" ? true : false}
          >
            <AiOutlineCheckCircle
              className={`p-4 ${
                isApproved != "approved" ? "hover:p-2" : ""
              } duration-300 w-14 h-14`}
              color={isApproved == "approved" ? "gray" : "green"}
            />
          </button>
          <button
            className={`rounded-3xl drop-shadow-lg w-14 h-14 ${
              isApproved != "rejected" ? "hover:shadow-xl" : ""
            } bg-white backdrop-blur-lg`}
            onClick={() => props.handleSubmit("reject")}
            alt=""
            disabled={isApproved == "rejected" ? true : false}
          >
            <RxCrossCircled
              className={`p-4 ${
                isApproved != "rejected" ? "hover:p-2" : ""
              } duration-300 w-14 h-14`}
              color={isApproved == "rejected" ? "gray" : "red"}
            />
          </button>
          <button
            className="rounded-3xl w-14 h-14 drop-shadow-lg shadow-sm bg-white backdrop-blur-sm hover:shadow-2xl hover:shadow-black"
            onClick={() => props.handleSubmit("Delete")}
            alt=""
          >
            <VscTrash
              className="p-4 w-14 h-14 hover:p-3 duration-300"
              color="black"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
