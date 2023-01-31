import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";

export default function Card(props) {

  const handelApprove = async (type) => {
    const approve = axios.get(`http://localhost:4000/resturant/approve/${props.restaurantId}`)
    if(approve){
      swal("Approved!", "Get Add products!", "success");
    }
  };

  const handelReject = async (type) => {
    const reject = axios.get(`http://localhost:4000/resturant/reject/${props.restaurantId}`)
    if(reject){
      swal("rejected!", "Get Add products!", "warning");
    }
  };


  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-2xl shadow dark:bg-gray-800 dark:border-gray-700 hover:shadow-2xl">
      <div className="relative overflow-hidden bg-no-repeat bg-cover">
        <Link to={`/request/${props.restaurantId}`}>
          <img className="rounded-t-2xl hover:scale-110 transition duration-300 ease-in-out" src={"https://i.ibb.co/2hdPfQf/1.png"} alt="" />
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
            onClick={handelApprove}
            className="flex-1 px-3 py-2 text-sm font-medium text-center rounded-lg  border-2 text-blue-600 border-blue-500 hover:border-white hover:text-white hover:bg-blue-500  dark:hover:bg-blue-700"
          >
            Approve
          </button>
          <span className="w-10" />
          <button
            onClick={handelReject}
            className="flex-1 px-3 py-2 text-sm font-medium text-center hover:text-white hover:border-white hover:bg-red-700 rounded-lg  border-2 text-red-600  border-red-500 dark:hover:bg-red-500"
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  );
}
