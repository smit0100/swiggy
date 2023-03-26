import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import User from "../../Apis/User";
import { Images } from "../../Assets";
import { toast } from "react-toastify";
import { Button } from "../../Components";
import { useStateContext } from "../../contexts/ContextProvider";
import swal from "sweetalert";
import { Blocks } from "react-loader-spinner";

export default function GetUser() {
  const [action, setAction] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [datas, setDatas] = useState([]);
  const [filterDatas, setfilterDatas] = useState([]);
  const [search, setsearch] = useState("");
  const [editUser, setEditUser] = useState({});
  const [selectedFilter, setselectedFilter] = useState("Filter");
  const { currentColor } = useStateContext();
  const [currentPage, setCurrentPage] = useState(1);
  const [checked, setChecked] = useState("");
  const [names, setNames] = useState("");
  const [descr, setDescr] = useState("");
  const [number, setNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getUsers();
    document.title = "Admin - Customers";
  }, [currentPage]);
  const getUsers = () => {
    setIsLoading(true);
    getAllUser();
  };
  const getAllUser = () => {
    User.GetAllUsers(currentPage, 10)
      .then((res) => {
        console.log("response", res);
        if (res?.data?.length > 0 && res?.status != 404) {
          setDatas(res?.data);
          setIsLoading(false);
        }
      })
      .catch((e) => {
        setIsLoading(false);
        console.log("====ee", e);
      });
  };
  const handleSelection = (e) => {
    if (selectedFilter == e) {
      setselectedFilter("Filter");
      if (e == "Order") {
        getAllUser();
      }
    } else {
      setselectedFilter(e);
      if (e == "Order") {
        let temp = [...datas];
        const sortedData = temp.sort((a, b) => b.order.length - a.order.length);
        setDatas(sortedData);
      }
    }
    setAction(false);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (value) => {
    if (value.trim() == "") {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
    setsearch(value);
    const temp = [...datas];
    const data = temp.filter((item) => item?.name == value);
    if (data.length > 0) {
      setfilterDatas(data);
      setIsLoading(false);
    }
    if (search == "") {
      setfilterDatas([]);
    }
  };
  const handleModal = (id) => {
    let data = [...datas];
    let item = data.find((item) => item?._id == id);
    if (item) {
      setEditUser(item);
      setIsVisible(true);
      setChecked(item?.type);
      if (item?.name) {
        setNames(item?.name);
      } else {
        setNames(item?.name);
      }
      if (item?.email) {
        setDescr(item?.email);
      } else {
        setDescr("");
      }
      if (item?.number) {
        setNumber(item?.number);
      } else {
        setNumber("");
      }
    }
  };
  const handleSave = () => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    console.log("==descr?.trim() == ", descr);
    if (names?.trim() == "") {
      toast.error("🤨 name is required");
    } else if (descr?.trim() == "") {
      toast.error("🤨 Email is required!");
    } else if (!regex.test(descr)) {
      toast.error("🤨 This is not a valid email format!");
    } else if (number?.trim() == "") {
      toast.error("🤨 Mobile number is required!");
    } else if (isNaN(number)) {
      toast.error("🤨 Mobile number must be number!");
    } else if (number.length != 10) {
      toast.error("🤨 Mobile number is not valid!");
    } else {
      let data = {
        _id: editUser._id,
        names,
        descr,
        number,
        checked,
      };
      console.log("===data", data);
      User.editUser(JSON.stringify(data))
        .then((res) => {
          console.log("===res", res);
          if (res?.response) {
            toast.success("⭐ User edited successfully");
            setIsVisible(false);
            getAllUser();
          }
        })
        .catch((e) => console.log("=====e", e));
    }
  };
  const deleteUser = (id) => {
    User.deleteUser(id).then((response) => {
      if (response?.messag) {
        toast.success("⭐ User deleted successfully", { theme: "dark" });
        getAllUser();
      }
    });
  };
  const handleDelete = (id) => {
    swal({
      title: "Are you sure?",
      text: `Are you sure! you want to delete this User?`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((e) => {
      if (e) {
        deleteUser(id);
      }
    });
  };
  const dataTable = (data) =>
    data?.map((item, index) => {
      return (
        <tr
          key={index}
          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
        >
          {/* <td className="w-4 p-4">
            <div className="flex items-center">
              <input
                id="checkbox-table-search-1"
                type="checkbox"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label className="sr-only">checkbox</label>
            </div>
          </td> */}
          <th
            scope="row"
            className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
          >
            <Link
              to={`/customers/${item._id}`}
              className="w-10 h-10 rounded-full"
            >
              <img
                className="w-10 h-10 rounded-full"
                src={Images.user2}
                alt="user"
              />
            </Link>
            <div className="pl-3">
              <div className="text-base font-semibold">{item.name}</div>
              <div className="font-normal text-gray-500">{item.email}</div>
            </div>
          </th>
          <td className="pl-10 py-4">{item.order.length}</td>
          <td className="py-4">
            {/* <div className="flex items-center">
                    <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div> {item.type}
                </div> */}
            <div className="inline-flex items-center text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 font-medium rounded-2xl text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600">
              <span>{item.type}</span>
            </div>
          </td>
          <td className="px-6 py-4 flex gap-3">
            <button
              className="font-medium border-blue-600 border-1 text-blue-600 px-3 py-1 rounded-lg hover:bg-blue-600 hover:text-white duration-150"
              onClick={() => handleModal(item?._id)}
            >
              Edit
            </button>
            <button
              className="font-medium border-red-500 border-1 text-red-500 px-3 py-1 rounded-lg hover:bg-red-500 hover:text-white duration-150"
              onClick={() => handleDelete(item?._id)}
            >
              Delete
            </button>
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
                    Orders
                  </a>
                </li>
              </ul>
              {/* <div className="py-1">
                    <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Delete User</a>
                </div> */}
            </div>
          )}
        </div>
        <label className="sr-only">Search</label>
        <div className="relative mx-5">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
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
            </svg>
          </div>
          <input
            type="text"
            id="table-search-users"
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 shadow-sm hover:shadow-md dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search user"
          />
        </div>
      </div>
      <table className=" w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {/* <th scope="col" className="p-4">
              <div className="flex items-center">
                <input
                  id="checkbox-all-search"
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label className="sr-only">checkbox</label>
              </div>
            </th> */}
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Orders
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
          {!isLoading && (
            <>
              {search?.length > 0 ? dataTable(filterDatas) : dataTable(datas)}
            </>
          )}
        </tbody>
      </table>
      {isLoading && (
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
      )}
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
          disabled={datas?.length == 10 ? false : true}
          onClick={() => handlePageChange(currentPage + 1)}
          className={`inline-flex items-center px-4 py-2 ml-3 text-sm font-medium text-gray-500 border border-gray-300 rounded-lg  dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
            datas?.length == 10
              ? "hover:shadow-lg hover:text-gray-700 hover:bg-gray-100"
              : "bg-white"
          }`}
        >
          Next
        </button>
      </div>
      {/* <!-- Edit user modal --> */}
      {isVisible && (
        <div
          tabIndex="-1"
          aria-hidden="true"
          className="fixed top-0 left-0 right-0 bg-black bg-opacity-70 z-50 items-center justify-center  w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full flex"
        >
          <div className="relative w-full h-full max-w-2xl md:h-auto">
            {/* <!-- Modal content --> */}
            <form className=" bg-white rounded-lg shadow dark:bg-gray-700">
              {/* <!-- Modal header --> */}
              <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Edit {editUser?.name}
                </h3>
                <button
                  type="button"
                  onClick={() => setIsVisible(false)}
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
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
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-3">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Name
                    </label>
                    <input
                      type="text"
                      name="first-name"
                      id="first-name"
                      value={names}
                      onChange={(e) => setNames(e.target.value)}
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Enter name"
                      required=""
                    />
                  </div>
                  {/* <div className="col-span-6 sm:col-span-3">
                    <label
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="last-name"
                      id="last-name"
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Green"
                      required=""
                    />
                  </div> */}
                  <div className="col-span-6 sm:col-span-3">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={descr}
                      onChange={(e) => setDescr(e.target.value)}
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="example@company.com"
                      required=""
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Phone Number
                    </label>
                    <input
                      name="phone-number"
                      id="phone-number"
                      value={number}
                      onChange={(e) => setNumber(e.target.value)}
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Enter mobile number"
                      required=""
                      maxLength={10}
                    />
                  </div>
                  {/* <div className="col-span-6 sm:col-span-3">
                            <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Department</label>
                            <input type="text" name="department" id="department" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Development" required=""/>
                        </div> */}
                  {/* <div className="col-span-6 sm:col-span-3">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Address
                    </label>
                    <input
                      type="text"
                      name="company"
                      id="company"
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="address"
                      required=""
                    />
                  </div> */}
                  <div className="col-span-6 sm:col-span-3 mt-5">
                    <div className="flex items-center mb-4">
                      <input
                        type="radio"
                        onChange={(e) => setChecked(e.target.value)}
                        value={"customer"}
                        checked={checked == "customer" ? true : false}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 dark:ring-offset-gray-800  dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label
                        htmlFor="default-radio-1"
                        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Customer
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="radio"
                        checked={checked == "admin" ? true : false}
                        onChange={(e) => setChecked(e.target.value)}
                        value={"admin"}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label
                        htmlFor="default-radio-2"
                        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Admin
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex py-2 items-center justify-center">
                <Button
                  // disabled={isDisabled}
                  color="white"
                  bgColor={currentColor}
                  text={"Save"}
                  borderRadius="10px"
                  width={"64"}
                  onClick={handleSave}
                />
              </div>
              {/* <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save all</button>
                </div> */}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
