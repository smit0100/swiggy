import React, { useEffect, useState } from "react";
import { earningDatas } from "../../data/dummy";
import User from "../../Apis/User";
import { Link } from "react-router-dom";
import { Images } from "../../Assets";
import Restaurants from "../../Apis/Restaurants";
import { Blocks } from "react-loader-spinner";

function Dashboard() {
  const [datas, setDatas] = useState([]);
  const [earningData, setEarningData] = useState(earningDatas);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    (async () => {
      setIsLoading(true);
      User.GetAllUsers(1, 5)
        .then((res) => {
          console.log("response", res);
          if (res?.data) {
            // const filteredData = res?.data?.sort(
            //   (a, b) => b.createdAt - a.createdAt
            // );
            setDatas(res?.data);
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
        console.log("===res===count", res);
        // console.log("===res===counts", JSON.stringify(res?.oorder));
        if (res?.message == "finded counts") {
          let temp = [...earningData];
          temp[0].amount = res?.userCount;
          temp[1].amount = res?.resCount;
          temp[2].amount = res?.resActive;
          temp[3].amount = res?.resDeActive;
          temp[4].amount = res?.totalSales + " ₹";
          temp[5].amount = res?.DeliveryCount;
          temp[6].amount = res?.DeliveryActive;
          temp[7].amount = res?.DeliveryDeactive;
          temp[8].amount = res?.mainCategory;
          temp[9].amount = res?.mainCategoryActive;
          temp[10].amount = res?.mainCategoryDeActive;
          temp[11].amount = res?.subCategory;
          temp[12].amount = res?.SubCategoryActive;
          temp[13].amount = res?.SubCategoryDeActive;
          temp[14].amount = res?.Product;
          temp[15].amount = res?.activeProducts;
          temp[16].amount = res?.deactiveProducts;
          temp[17].amount = res?.contactUS;
          temp[18].amount = res?.deliveredOrder;
          temp[19].amount = res?.canceledOrder;
          temp[20].amount = res?.rejectedOrder;
          temp[21].amount = res?.process;
          setEarningData(temp);
        }
      })
      .then((e) => {
        console.log("==getCounts error::", e);
      });
  };
  return (
    <div className="mt-24">
      <div className="flex flex-wrap lg:flex-nowrap justify-center bg-slate-300 rounded-2xl">
        <div className="flex m-3 flex-wrap justify-center gap-1 items-center">
          {earningData.map((item, index) => (
            <div
              key={index}
              className="bg-slate-100 h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56  p-4 pt-9 rounded-2xl hover:drop-shadow-xl duration-200"
            >
              <button
                type="button"
                style={{ color: item.iconColor, backgroundColor: item.iconBg }}
                className="text-2xl opacity-0.9 rounded-full  p-4 hover:drop-shadow-xl duration-150"
              >
                <Link to={"/" + item?.navigation}>{item.icon}</Link>
              </button>
              <p className="mt-3">
                <span className="text-lg font-semibold">
                  {item?.amount != undefined ? item?.amount : 0}
                </span>
                {/* <span className={`text-sm text-${item.pcColor} ml-2`}>
                  {item.percentage}
                </span> */}
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
