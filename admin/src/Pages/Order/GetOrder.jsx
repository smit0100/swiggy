import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import pizza from "../../Assets/pizza.jpg";

import Order from "../../Apis/Order";
import { Images } from "../../Assets";
export default function GetOrder() {
  const [datas, setDatas] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [filterDatas, setfilterDatas] = useState([]);
  const [action, setAction] = useState(false);
  const [search, setsearch] = useState("");
  const [selectedFilter, setselectedFilter] = useState("Filter");
  useEffect(() => {
    getOrders();
    document.title = "Admin - Orders";
  }, [currentPage]);
  const rowsPerPage = 10;
  const getOrders = () => {
    Order.GetOrders(currentPage)
      .then((res) => {
        console.log("response====", res);
        setDatas(res?.results);
      })
      .catch((e) => console.log("====ee", e));
  };
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const rows = datas?.slice(startIndex, endIndex);
  
  const handleSelection = (e) => {
    if (selectedFilter == e) {
      setselectedFilter("Filter");
      if (e == "Order") {
        getOrders()
      }
    }else{
      setselectedFilter(e);
      if (e == "Order") {
        let temp = [...datas]
        const sortedData = temp.sort((a, b) => b.total - a.total);
        setDatas(sortedData)
      }
    }
    setAction(false);
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const handleSearch = (value) => {
    setsearch(value);
    const temp = [...rows];
    const data = temp.filter((item) => item?.name == value);
    if (data?.length > 0) {
      setfilterDatas(data);
    }
    if (search == "") {
      setfilterDatas([]);
    }
  };
  const dataTable = (data) =>
    data?.map((item, index) => {
      return (
        <tr
          key={index}
          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
        >
          <th
            scope="row"
            className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
          >
            <Link to={`/orders`} className="w-10 h-10 rounded-full">
              <img
                className="w-10 h-10 rounded-full"
                src={Images.user2}
                alt="user image"
              />
            </Link>
            <div className="pl-3">
              <div className="text-base font-semibold">{item.paymentType}</div>
              <div className="font-normal text-gray-500">
                {item.orderStatus}
              </div>
            </div>
          </th>
          <td className="pl-10 py-4">{item?._id}</td>
          <td className="pl-10 py-4">{item?.total}</td>
          <td className="py-4">
            {/* <div className="flex items-center">
                    <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div> {item.type}
                </div> */}
            <div className="inline-flex items-center text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 font-medium rounded-2xl text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600">
              <span>{item.status}</span>
            </div>
          </td>
          <td className="px-6 py-4">
            {/* <!-- Modal toggle --> */}
            <a
              // onClick={() => handleModal(item?._id)}
              type="button"
              className="cursor-pointer font-medium text-blue-600 dark:text-blue-500 hover:underline"
            >
              View
            </a>
          </td>
        </tr>
      );
    });
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg m-5 p-3">
      <div className="flex items-center justify-between py-4 bg-white dark:bg-gray-800">
        <div className="px-2">
          <button
            onClick={() => setAction(!action)}
            className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            type="button"
          >
            <span className="sr-only">Action button</span>
            {selectedFilter}
            <svg
              className="w-3 h-3 ml-2"
              aria-hidden="true"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </button>
          {/* <!-- Dropdown menu --> */}
          {action && (
            <div className="z-10 absolute bg-white divide-y divide-gray-100 rounded-lg w-44 dark:bg-gray-700 dark:divide-gray-600 shadow-2xl">
              <ul className="py-1 text-sm text-gray-700 dark:text-gray-200">
                <li>
                  <a
                    onClick={() => {
                      handleSelection("Order");
                    }}
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Ruppes
                  </a>
                </li>
              </ul>
              {/* <div className="py-1">
                    <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Delete User</a>
                </div> */}
            </div>
          )}
        </div>
        {/* <label className="sr-only">Search</label> */}
        {/* <div className="relative mx-5">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"> */}
        {/* <svg
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                // fillYule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              ></path>
            </svg> */}
        {/* </div> */}
        {/* <input
            type="text"
            id="table-search-users"
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 shadow-sm hover:shadow-md dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search Orders"
          /> */}
        {/* </div> */}
      </div>
      <table className=" w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              User
            </th>
            <th scope="col" className="px-10 py-3">
              Order Id
            </th>
            <th scope="col" className="px-6 py-3">
              RUPEES
            </th>
            <th scope="col" className="px-6 py-3">
              Type
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {/* {search?.length > 0 ? dataTable(filterDatas) :  */}
          {dataTable(datas)}
          {/* } */}
        </tbody>
      </table>
      <div className="mt-4">
        <button
          disabled={currentPage > 1 ? false : true}
          onClick={() => handlePageChange(currentPage - 1)}
          className={`inline-flex items-center px-4 py-2 ${
            currentPage > 1
              ? "hover:shadow-lg hover:text-gray-700 hover:bg-gray-100"
              : ""
          }  text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg   dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
        >
          Previous
        </button>

        <button
          disabled={datas?.length > 9 ? false : true}
          onClick={() => handlePageChange(currentPage + 1)}
          className={`inline-flex items-center px-4 py-2 ml-3 text-sm font-medium text-gray-500 border border-gray-300 rounded-lg  dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
            datas?.length > 9
              ? "hover:shadow-lg hover:text-gray-700 hover:bg-gray-100"
              : "bg-white"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}
