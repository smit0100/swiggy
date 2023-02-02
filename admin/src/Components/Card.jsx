import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import Restaurants from "../Apis/Restaurants";

export default function Card(props) {

  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-2xl shadow dark:bg-gray-800 dark:border-gray-700 hover:shadow-2xl">
      <div className="relative overflow-hidden bg-no-repeat bg-cover">
        <Link
          to={{
            pathname: `/request/${props.restaurantId}`,
            state: props.items,
          }}
        >
          <img
            className="rounded-t-2xl hover:scale-110 transition duration-300 ease-in-out"
            src={"https://i.ibb.co/2hdPfQf/1.png"}
            alt=""
          />
        </Link>
      </div>
      <div className="p-5">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {props.name}
        </h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          Here are the biggest enterprise technology acquisitions of 2021 so
          far, in reverse chronological order.
        </p>
        <div className="flex">
                  <button
                    disabled={props?.isApproved != "Accepted" ? false : true}
                    onClick={() => {
                      props.handleSubmit("approve");
                    }}
                    className={`flex-1 px-3 py-2 text-sm font-medium text-center rounded-lg  border-2 text-blue-600 border-blue-500  ${
                      props?.isApproved != "Accepted"
                        ? "hover:bg-blue-500 hover:border-white hover:text-white text-blue-600 border-blue-500"
                        : "text-gray-600 border-gray-500"
                    } `}
                  >
                    {props?.isApproved != "Accepted" ? "Approve" : "Approved"}
                  </button>
                  <span className="w-10" />
                  <button
                    disabled={props?.isApproved != "Rejected" ? false : true}
                    onClick={() => {
                      props.handleSubmit("reject");
                    }}
                    className={`flex-1 px-3 py-2 text-sm font-medium text-center rounded-lg  border-2 text-red-600 border-red-500  ${
                      props?.isApproved != "Rejected"
                        ? "hover:bg-red-500 hover:border-white hover:text-white text-red-600 border-red-500"
                        : "text-gray-600 border-gray-500"
                    } `}
                  >
                    {props?.isApproved != "Rejected" ? "Reject" : "Rejected"}
                  </button>
                </div>
      </div>
    </div>
  );
}
