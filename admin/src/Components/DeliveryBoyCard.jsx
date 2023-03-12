import React from "react";
import { RxCrossCircled } from "react-icons/rx";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { VscTrash } from "react-icons/vsc";

export default function DeliveryBoyCard({ image, name }) {
  return (
    <div className="md:mt-20 mt-14 lg:mt-20 md:ml-5">
      <div className="bg-gradient-to-t from-blue-400 via-blue-800 to-slate-700 h-72 w-80 md:w-96 md:rounded-3xl rounded-tl-3xl drop-shadow-xl rounded-br-3xl rounded-tr-lg rounded-bl-lg shadow-md relative flex flex-col items-center justify-between md:items-start py-5 md:p-5 transition-all duration-150">
        <img
          className="rounded-tr-3xl rounded-tl-3xl rounded-br-3xl rounded-bl-sm w-28 h-28 absolute -top-12 transform md:scale-110 duration-300 hover:shadow-2xl drop-shadow-lg"
          src={image}
          alt="Delivery boy"
        />

        <div className="align-middle text-2xl font-semibold text-gray-200 text-center m-auto mt-11 md:m-0 md:mt-14">
          {name}
        </div>
        <ul className="text-lg text-gray-300 font-light block">
          <li>18,Bhavani nagar</li>
          <li>L.H road,Matawadi</li>
          <li>Surat.</li>
        </ul>

        <div className="flex w-full justify-around">
          <button
            className="rounded-3xl drop-shadow-lg w-14 h-14 hover:shadow-2xl hover:shadow-black bg-white backdrop-blur-lg"
            src="https://randomuser.me/api/portraits/women/17.jpg"
            alt=""
          >
            <AiOutlineCheckCircle
              className="p-4 w-14 h-14 hover:p-2 duration-300"
              color="green"
            />
          </button>
          <button
            className="rounded-3xl w-14 h-14 drop-shadow-lg shadow-sm bg-white backdrop-blur-lg hover:shadow-2xl hover:shadow-black"
            src="https://randomuser.me/api/portraits/women/17.jpg"
            alt=""
          >
            <RxCrossCircled
              className="p-4 hover:p-2 duration-300 w-14 h-14"
              color="red"
            />
          </button>
          <button
            className="rounded-3xl w-14 h-14 drop-shadow-lg shadow-sm bg-white backdrop-blur-sm hover:shadow-2xl hover:shadow-black"
            src="https://randomuser.me/api/portraits/women/17.jpg"
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
