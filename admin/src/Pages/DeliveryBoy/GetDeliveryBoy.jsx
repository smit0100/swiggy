import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import swal from "sweetalert";
import DeliveryBoy from "../../Apis/DeliveryBoy";
import { Images } from "../../Assets";
import { Button, DeliveryBoyCard, Tabs } from "../../Components";
import { ImTable } from "react-icons/im";
import { toast } from "react-toastify";
import { useStateContext } from "../../contexts/ContextProvider";
export default function GetDeliveryBoy() {
  const { currentColor } = useStateContext();
  const [datas, setDatas] = useState([]);
  const [isTable, setIsTable] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [tabs, setTabs] = useState([
    { label: "All", badge: null },
    { label: "Approved", badge: null },
    { label: "Rejected", badge: null },
  ]);
  const [isVisible, setIsVisible] = useState(false);
  const [checked, setChecked] = useState("");
  const [names, setNames] = useState("");
  const [descr, setDescr] = useState("");
  const [number, setNumber] = useState("");
  const [userId, setUserId] = useState("");
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (
      userId != "" &&
      number != "" &&
      names != "" &&
      descr != "" &&
      checked != ""
    ) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  }, [userId, names, descr, checked]);
  useEffect(() => {
    GetRequests(tabs[activeTabIndex].label);
    document.title = "Admin - Delivery Boy Request";
  }, [currentPage, activeTabIndex]);

  const GetRequests = async (label) => {
    let object = "";
    if (label == "Approved") {
      object = "approved";
    } else if (label == "Rejected") {
      object = "rejected";
    }
    DeliveryBoy.GetRequests(currentPage, 9, object)
      .then((res) => {
        console.log("===fetchall", res);
        if (res?.response) {
          setDatas(res?.response);
          if (res?.totalCount) {
            let data = [...tabs];
            data[0].badge = res?.totalCount;
            data[1].badge = res?.totalAccepted;
            data[2].badge = res?.totalRejected;
            setTabs(data);
          }
        }
      })
      .catch((e) => console.log("====ee", e));
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const handleModal = (id) => {
    let data = [...datas];
    let item = data?.find((item) => item?._id == id);
    if (item) {
      setNumber(item?.number);
      setUserId(item?._id);
      setChecked(
        item.isApproved == "approved"
          ? "approved"
          : item.isApproved == "pending"
          ? "pending"
          : "rejected"
      );
      setNames(item?.name);
      setDescr(item?.email);
      setIsVisible(true);
    }
  };
  const handleApicall = (req, id) => {
    DeliveryBoy.handleRequest(id, req)
      .then((res) => {
        console.log("=======", res);
        if (res?.courierBoy) {
          swal({
            title: "Success!",
            text: `Request ${
              req == "accept" ? "accepted" : "rejected"
            } successfully.`,
            icon: "success",
            buttons: req == "accept" ? true : false,
            timer: req == "accept" ? null : 1500,
          });
          GetRequests();
        } else {
          toast.error("☹️ Something went wrong,Please try again");
        }
      })
      .catch((e) => {
        toast.error("☹️ Something went wrong,Please try again");
      });
  };

  const editCategory = () => {
    let data = {
      _id: userId,
      names,
      descr,
      checked,
      number,
    };
    DeliveryBoy.editDeliveryBoy(JSON.stringify(data))
      .then((res) => {
        console.log("===res", res);
        if (res?.response) {
          toast.success("⭐ Delivery boy edited successfully");
          setIsVisible(false);
          GetRequests(tabs[activeTabIndex].label);
        }
      })
      .catch((e) => {
        console.log("=====e", e);
        toast.error("☹️ Something went wrong,Please try again");
      });
  };
  const handleDelete = (id) => {
    DeliveryBoy.deleteDeliveryBoy(id)
      .then((response) => {
        if (response?.messag) {
          toast.success("⭐ Delivery boy deleted successfully");
          GetRequests(tabs[activeTabIndex].label);
        }
      })
      .catch((e) => {
        console.log("==e", e);
        toast.error("☹️ Something went wrong,Please try again");
      });
  };
  const handleSubmit = (req, id) => {
    if (req == "reject" || req == "Delete") {
      swal({
        title: "Are you sure?",
        text: `Are you sure! you want to ${
          req == "reject" ? "reject" : "delete"
        } this Delivery boy?`,
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((e) => {
        if (e) {
          if (req == "reject") {
            handleApicall(req, id);
          } else {
            handleDelete(id);
          }
        }
      });
    } else {
      handleApicall(req, id);
    }
  };
  const ProductTable = ({ data }) => {
    return (
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg md:mx-20 md:mt-12 m-5">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                No.
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Mobile
              </th>
              <th scope="col" className="px-6 py-3">
                Request
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0 ? "bg-white" : "bg-gray-100"
                } border-b dark:bg-gray-800 dark:border-gray-700`}
              >
                <td className="px-6 py-4">{index + 1}</td>
                <th
                  scope="row"
                  className="flex items-center py-4 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <img
                    className="w-10 h-10 rounded-full"
                    src={Images.user2}
                    alt="user"
                  />
                  <div className="pl-3">
                    <div className="text-base font-semibold">{item.name}</div>
                    <div className="font-normal text-gray-500">
                      {item.email}
                    </div>
                  </div>
                </th>
                <td className="px-6 py-4 ">
                  <span
                    className={`${
                      item?.isAvilable
                        ? "border-green-500 border-2"
                        : "border-2 border-red-500"
                    } text-black dark:text-white rounded-2xl py-1 px-3 text-sm font-medium`}
                  >
                    {item?.isAvilable ? "Available" : "Delivery"}
                  </span>
                </td>
                <td className="px-6 py-4">{item?.number}</td>
                <td className="px-6 py-4 ">
                  <span
                    className={`${
                      item?.isApproved == "approved"
                        ? "bg-green-500"
                        : item?.isApproved == "pending"
                        ? "bg-orange-400"
                        : "bg-red-500"
                    } text-white rounded-2xl py-1 px-3 text-sm font-medium`}
                  >
                    {item?.isApproved == "approved"
                      ? "Approved"
                      : item?.isApproved == "pending"
                      ? "Pending"
                      : "Rejected"}
                  </span>
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
                    onClick={() => handleSubmit("Delete", item?._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  return (
    <div>
      <div className="flex flex-wrap bg-blue-100 py-5 rounded-2xl mx-3 justify-between">
        <h1 className="ml-5 max-sm:mb-4 font-semibold text-3xl">
          &bull; Delivery Partners
        </h1>
        <div className="flex items-center mr-5">
          <Tabs
            tabs={tabs}
            activeTabIndex={activeTabIndex}
            setActiveTabIndex={(index) => {
              setActiveTabIndex(index);
              handlePageChange(1);
            }}
          />
          <button
            className={`${
              isTable
                ? "border-2 border-black"
                : "border-2 border-white bg-white"
            } px-2 py-1 rounded-lg `}
            onClick={() => setIsTable(!isTable)}
          >
            <ImTable size={25} />
          </button>
        </div>
      </div>
      {isTable ? (
        <ProductTable data={datas} />
      ) : (
        <div className="flex flex-wrap justify-start gap-2 max-sm:justify-center items-center mb-16">
          {datas.map((item, index) => {
            return (
              <DeliveryBoyCard
                data={item}
                key={index}
                handleSubmit={(e) => handleSubmit(e, item._id)}
              />
            );
          })}
        </div>
      )}
      {datas?.length > 0 ? (
        <div className="mt-4 justify-center items-center flex mb-10">
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
            disabled={datas?.length == 9 ? false : true}
            onClick={() => handlePageChange(currentPage + 1)}
            className={`inline-flex items-center px-4 py-2 ml-3 text-sm font-medium text-gray-500 border border-gray-300 rounded-lg  dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
              datas?.length == 9
                ? "hover:shadow-lg hover:text-gray-700 hover:bg-gray-100"
                : "bg-white"
            }`}
          >
            Next
          </button>
        </div>
      ) : (
        <div>
          <h1 className="text-center font-bold dark:text-white">
            No Delivery boy's request here
          </h1>
        </div>
      )}
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
                  Edit Delivery boy
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

                  <div className="col-span-6 sm:col-span-3 mt-5">
                    <div className="flex items-center mb-4">
                      <input
                        type="radio"
                        onChange={(e) => setChecked(e.target.value)}
                        value={"approved"}
                        checked={checked == "approved" ? true : false}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 dark:ring-offset-gray-800  dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label
                        htmlFor="default-radio-1"
                        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Approve
                      </label>
                    </div>
                    <div className="flex items-center mb-4">
                      <input
                        type="radio"
                        onChange={(e) => setChecked(e.target.value)}
                        value={"pending"}
                        checked={checked == "pending" ? true : false}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 dark:ring-offset-gray-800  dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label
                        htmlFor="default-radio-1"
                        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Pending
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="radio"
                        checked={checked == "rejected" ? true : false}
                        onChange={(e) => setChecked(e.target.value)}
                        value={"rejected"}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label
                        htmlFor="default-radio-2"
                        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Reject
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex py-2 items-center justify-center">
                <Button
                  disabled={isValid}
                  color="white"
                  bgColor={currentColor}
                  text={"Save"}
                  borderRadius="10px"
                  width={"64"}
                  onClick={editCategory}
                />
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
