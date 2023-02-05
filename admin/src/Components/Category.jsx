import React from "react";
import { MdFastfood } from "react-icons/md";

export default function Category(props) {
  return (
    <button
      onClick={props.onClick}
      className={`h-36 rounded-xl max-sm:hover:mb-0 ease-in-out hover:scale-110 duration-500 w-28 flex items-center justify-center shadow-2xl`}
      style={{
        background:
          props?.category == props?.name ? props?.currentColor : "white",
      }}
    >
      <div className="py-5">
        <div className="flex items-center justify-center">
          <div
            style={{
              background:
                props?.category != props?.name ? props?.currentColor : "white",
            }}
            className={`justify-center flex items-center h-10 rounded-full duration-500 ease-in-out hover:scale-150 w-10`}
          >
            <MdFastfood
              color={props?.category == props?.name ? "black" : "white"}
            />
          </div>
        </div>
        <div className="flex justify-center align-middle items-center text-center">
          <h1
            className={`${
              props?.category == props?.name ? "text-white" : "text-black"
            } mt-5 flex flex-wrap`}
          >
            {props?.name}
          </h1>
        </div>
      </div>
    </button>
  );
}
