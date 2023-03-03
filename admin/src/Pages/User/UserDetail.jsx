import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import avatar from "../../Assets/avatar.jpg";
import Users from "../../Apis/User";
export default function UserDetail() {
  const { id } = useParams();

  const [data, setData] = useState([]);
  useEffect(() => {
    getUser();
  }, []);
  const getUser = () => {
    Users.GetOneUser(id)
      .then((res) => {
        console.log("====resresresresres", res);
        setData(res.data);
      })
      .catch((e) => {
        console.log("=====e", e);
      });
  };
  return (
    <div className="p-5">
      <div className="flex flex-col sm:flex-row items-center p-4">
        <img
          src={avatar}
          alt="User"
          className="w-32 h-32 rounded-full object-cover mr-4"
        />
        <div className="flex-1">
          <h3 className="text-xl font-bold mb-2 dark:text-white">
            {data?.name}
          </h3>
          <p className="text-sm font-light mb-2 dark:text-gray-500">
            {data?.email}
          </p>
          <p className="text-sm font-light dark:text-gray-500">
            {data?.number}
          </p>
        </div>
        <button className="text-gray-800 border-2 border-gray-300 py-2 px-4 rounded-lg hover:bg-slate-200 dark:text-white dark:hover:bg-slate-600">
          Edit
        </button>
      </div>
      {data?.address?.map((item, index) => {
        return (
          <div
            key={index}
            className="bg-slate-200 max-w-lg shadow-lg my-4 p-4 rounded-lg"
          >
            <h2 className=" font-extrabold text-2xl">
              Address {data?.address?.length > 1 && index + 1}
            </h2>
            <div className="flex-1 flex justify-between mb-2 pt-5 border-t-1 border-gray-500">
              <h2 className="font-bold mr-2">Area</h2>
              <p className="text-gray-700">{item?.area}</p>
            </div>
            <div className="flex-1 flex justify-between mb-2">
              <h2 className="font-bold">City</h2>
              <p className="text-gray-700">{item?.city}</p>
            </div>
            <div className="flex-1 flex justify-between mb-2">
              <h2 className="font-bold">State</h2>
              <p className="text-gray-700">{item?.state}</p>
            </div>
            <div className="flex-1 flex justify-between mb-2">
              <h2 className="font-bold">Pincode</h2>
              <p className="text-gray-700">{item?.pincode}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
