import React from "react";
import { useStateContext } from "../contexts/ContextProvider";

export default function Product(props) {
  const { rupee } = useStateContext();
  return (
    <div className="p-5 w-72 mt-24 rounded-tl-3xl rounded-br-3xl dark:bg-slate-800 dark:text-white bg-gray-100 transition duration-300 ease-in-out hover:scale-105 hover:drop-shadow-2xl">
      <div className="-mb-20 -translate-y-1/2 transform">
        <img
          src={props.bgImage}
          alt="dihses"
          className="mx-auto w-56 h-44 rounded-tl-3xl rounded-br-3xl hover:shadow-xl"
        />
      </div>
      <div className="text-center">
        <h3 className="text-center text-4xl font-bold">{props?.name}</h3>
        <span className="text-sm dark:text-gray-400">Newly launched</span>
      </div>
      <ul className="my-5 px-3 flex justify-between text-center text-2xl">
        <li className="flex flex-col">
          <span className="font-bold">Price</span>
          <p className="dark:text-gray-400">
            {rupee}
            {props?.price}
          </p>
        </li>
        <li className="flex flex-col">
          <span className="font-bold">Review</span>{" "}
          <p className="dark:text-gray-400">4.7/5</p>
        </li>
      </ul>
      <div className="text-center">
        <button className="rounded-tl-3xl rounded-br-3xl dark:bg-white bg-black px-10 py-2 text-white hover:scale-105 duration-300 dark:text-black dark:font-semibold">
          View More
        </button>
      </div>
    </div>
  );
}
