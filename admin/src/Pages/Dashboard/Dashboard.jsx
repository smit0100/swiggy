import React, { useEffect, useState } from "react";
import { earningData } from "../../data/dummy";
import User from "../../Apis/User";
import { Link } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";
import { Images } from "../../Assets";
import Restaurants from "../../Apis/Restaurants";
import { FiBarChart } from "react-icons/fi";
import { BiRestaurant } from "react-icons/bi";
import { MdOutlineSupervisorAccount } from "react-icons/md";
import { HiOutlineRefresh } from "react-icons/hi";
import { Blocks } from "react-loader-spinner";
const earningDatas = [
  {
    icon: <MdOutlineSupervisorAccount />,
    amount: "1354",
    percentage: "-4%",
    title: "Customers",
    iconColor: "#03C9D7",
    iconBg: "#E5FAFB",
    pcColor: "red-600",
  },
  {
    icon: <BiRestaurant />,
    amount: "96",
    percentage: "+23%",
    title: "Restaurants",
    iconColor: "rgb(255, 244, 229)",
    iconBg: "rgb(254, 201, 15)",
    pcColor: "green-600",
  },
  {
    icon: <FiBarChart />,
    amount: "42,339",
    percentage: "+38%",
    title: "Sales",
    iconColor: "rgb(228, 106, 118)",
    iconBg: "rgb(255, 244, 229)",

    pcColor: "green-600",
  },
  {
    icon: <HiOutlineRefresh />,
    amount: "354",
    percentage: "-12%",
    title: "delevery partner",
    iconColor: "rgb(0, 194, 146)",
    iconBg: "rgb(235, 250, 242)",
    pcColor: "red-600",
  },
];
function Dashboard(props) {
  const [datas, setDatas] = useState([]);
  const [earningData, setEarningData] = useState(earningDatas);
  const [isLoading, setIsLoading] = useState(false);
  const { rupee } = useStateContext();
  useEffect(() => {
    (async () => {
      setIsLoading(true);
      User.GetAllUsers()
        .then((res) => {
          console.log("response", res);
          if (res?.data) {
            const filteredData = res?.data?.sort(
              (a, b) => b.createdAt - a.createdAt
            );
            const data = filteredData?.splice(0, 5);
            console.log("========", data);
            setDatas(data);
            setIsLoading(false);
          }
        })
        .catch((e) => {
          console.log("====ee", e);
          setIsLoading(false);
        });
    })();
    document.title = "Admin - Dashboard";
  }, []);
  useEffect(() => {
    getCount();
  }, []);

  const getCount = () => {
    Restaurants.GetCounts()
      .then((res) => {
        console.log("===res", res);
        if (res?.message == "finded counts") {
          let temp = [...earningData];
          temp[0].amount = res?.userCount;
          temp[1].amount = res?.resCount;
          temp[2].amount = res?.totalSales + " ₹";
          temp[3].amount = res?.DeliveryCount;
          setEarningData(temp);
          return;
        }
      })
      .then((e) => {
        console.log("==getCounts error::", e);
      });
  };
  console.log("===item?.amount", earningData);
  return (
    <div className="mt-24">
      <div className="flex flex-wrap lg:flex-nowrap justify-center bg-slate-300 rounded-2xl">
        <div className="flex m-3 flex-wrap justify-center gap-1 items-center">
          {earningData.map((item, index) => (
            <div
              key={index}
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
                <span className="text-lg font-semibold">
                  {item?.amount != undefined ? item?.amount : 0}
                </span>
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
          {isLoading ? (
            <div className="w-full flex items-center justify-center">
              <Blocks
                visible={isLoading}
                height="80"
                width="80"
                ariaLabel="blocks-loading"
                wrapperStyle={{}}
                wrapperClass="blocks-wrapper"
              />
            </div>
          ) : (
            <div className="flow-root">
              <ul
                role="list"
                className="divide-y divide-gray-200 dark:divide-gray-700"
              >
                {datas.map((item, index) => {
                  return (
                    <li key={index} className="py-3 sm:py-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <img
                            className="w-8 h-8 rounded-full"
                            src={Images.user2}
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
                        {/* <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                        {rupee}320
                      </div> */}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
