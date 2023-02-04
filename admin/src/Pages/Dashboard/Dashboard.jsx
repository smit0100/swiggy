import React, { useEffect, useState } from "react";
import { earningData } from "../../data/dummy";
import avatar from "../../Assets/avatar.jpg";
import User from "../../Apis/User";
import { Link } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";
function Dashboard(props) {
  const [datas, setDatas] = useState([]);
  const { rupee } = useStateContext();
  useEffect(() => {
    (async () => {
      User.GetAllUsers()
        .then((res) => {
          console.log("response", res);
          const filteredData = res?.data?.sort(
            (a, b) => b.createdAt - a.createdAt
          );
          const data = filteredData.splice(0, 5);
          console.log("========", data);
          setDatas(data);
        })
        .catch((e) => console.log("====ee", e));
    })();
  }, []);
  return (
    <div className="mt-24">
      <div className="flex flex-wrap lg:flex-nowrap justify-center bg-slate-300 rounded-2xl">
        <div className="flex m-3 flex-wrap justify-center gap-1 items-center">
          {earningData.map((item) => (
            <div
              key={item.title}
              className="bg-slate-100 h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56  p-4 pt-9 rounded-2xl hover:drop-shadow-xl "
            >
              <button
                type="button"
                style={{ color: item.iconColor, backgroundColor: item.iconBg }}
                className="text-2xl opacity-0.9 rounded-full  p-4 hover:drop-shadow-xl"
              >
                {item.icon}
              </button>
              <p className="mt-3">
                <span className="text-lg font-semibold">{item.amount}</span>
                <span className={`text-sm text-${item.pcColor} ml-2`}>
                  {item.percentage}
                </span>
              </p>
              <p className="text-sm text-gray-400  mt-1">{item.title}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex max-sm:justify-center">
        <div className="w-full max-sm:max-w-xs max-w-md p-4 m-5 bg-white border border-gray-200 rounded-lg shadow-xl sm:p-8 dark:bg-gray-800 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
              Latest Customers
            </h5>
            <Link
              to="/customers"
              className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
            >
              View all
            </Link>
          </div>
          <div className="flow-root">
            <ul
              role="list"
              className="divide-y divide-gray-200 dark:divide-gray-700"
            >
              {datas.map((item) => {
                return (
                  <li className="py-3 sm:py-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <img
                          className="w-8 h-8 rounded-full"
                          src={avatar}
                          alt="Customers"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                          {item?.name}
                        </p>
                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                          {item?.email}
                        </p>
                      </div>
                      <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                        {rupee}320
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
