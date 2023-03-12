import React from "react";
import { RxCrossCircled } from "react-icons/rx";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { VscTrash } from "react-icons/vsc";
import { Images } from "../Assets";

export default function DeliveryBoyCard(props) {
  const { name, email, image, number, isVerified, isApproved } = props.data;
  return (
    <div className="mt-20 md:mt-28 md:ml-5">
      <div className="bg-gradient-to-t from-blue-400 via-blue-800 to-slate-700 h-64 w-80 md:w-96 md:rounded-3xl rounded-tl-3xl drop-shadow-xl rounded-br-3xl rounded-tr-lg rounded-bl-lg shadow-md relative flex flex-col items-center justify-between md:items-start py-5 md:p-5 transition-all duration-150">
        <img
          className="rounded-tr-3xl rounded-tl-3xl rounded-br-3xl rounded-bl-sm w-28 h-28 absolute -top-12 transform md:scale-110 duration-300 hover:shadow-2xl drop-shadow-lg"
          src={image ? image : Images.user2}
          alt="Delivery boy"
        />

        <div className="align-middle text-2xl md:pl-3 font-semibold text-gray-200 text-center m-auto mt-11 md:m-0 md:mt-14">
          {name}
        </div>
        <div className="flex mb-4 w-full px-3 mt-3">
          <div className="text-gray-300 font-semibold">Email:</div>
          <div className="w-full text-right text-gray-300">{email}</div>
        </div>
        <div className="flex mb-4 w-full px-3">
          <div className="text-gray-300">Mobile:</div>
          <div className="w-full text-right text-gray-300">
            {"+91 " + number}
          </div>
        </div>
        <div className="flex mb-4 w-full px-3">
          <div className="w-full text-gray-300">Status:</div>
          <div
            className="w-1/2 rounded-lg justify-center items-center align-middle"
            style={{ backgroundColor: isVerified ? "#35fc03 " : "red" }}
          >
            <p className="w-full text-center text-white">
              {isVerified ? "Verified" : "Not verified"}
            </p>
          </div>
        </div>
        <div className="flex w-full justify-around absolute -bottom-7 md:-ml-5">
          <button
            className={`rounded-3xl drop-shadow-lg w-14 h-14 ${
              isApproved != "approved"
                ? "hover:shadow-2xl hover:shadow-black"
                : ""
            } bg-white backdrop-blur-lg`}
            onClick={() => props.handleSubmit("accept")}
            disabled={isApproved == "approved" ? true : false}
          >
            <AiOutlineCheckCircle
              className="p-4 w-14 h-14 hover:p-2 duration-300"
              color={isApproved == "approved" ? "gray" : "green"}
            />
          </button>
          <button
             className={`rounded-3xl drop-shadow-lg w-14 h-14 ${
              isApproved != "rejected"
                ? "hover:shadow-2xl hover:shadow-black"
                : ""
            } bg-white backdrop-blur-lg`}
            onClick={() => props.handleSubmit("reject")}
            alt=""
            disabled={isApproved == "rejected" ? true : false}
          >
            <RxCrossCircled
              className="p-4 hover:p-2 duration-300 w-14 h-14"
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
