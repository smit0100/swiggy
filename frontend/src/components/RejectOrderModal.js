import React from "react";
import InlineButtonLoader from "./InlineButtonLoader";

export default function RejectOrderModal(props) {
  return (
    <div
      tabIndex="-1"
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 bg-black bg-opacity-70 z-50 items-center justify-center  w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full flex"
    >
      <div className="relative my-6 mx-auto w-auto md:w-1/3">
        {/* <!-- Modal content --> */}
        <form className=" bg-white rounded-lg shadow">
          {/* <!-- Modal header --> */}
          <div className="flex items-start justify-between p-4 border-b rounded-t ">
            <h3 className="text-xl font-semibold text-gray-900">
              {props.title}
            </h3>
            <button
              type="button"
              onClick={props.onClose}
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          {/* <!-- Modal body --> */}
          <div className="p-6 space-y-6">
            <div className="col-span-6 sm:col-span-3 w-full">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Reason
              </label>
              <textarea
                type="text"
                value={props.message}
                onChange={(e) => props.setMessage(e.target.value)}
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 flex w-full p-2.5"
                placeholder="Give reason . . ."
              />
            </div>
          </div>
          <div className="flex items-center justify-center p-6 border-t border-solid border-slate-200 rounded-b ">
            <button
              type="button"
              disabled={props.isValid}
              className={`${
                props.isValid ? "bg-black" : "hover:bg-white hover:text-black"
              } w-[50%] bg-black text-white p-2 rounded-lg hover:border duration-200 border border-gray-300`}
              onClick={props.onClick}
            >
              {props.isValid ? <InlineButtonLoader /> : props.buttonText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
