import React, { useEffect, useState } from "react";
import Restaurants from "../../Apis/Restaurants";
import swal from "sweetalert";
import { Card } from "../../Components";
import resto from "../../Assets/resto.jpg";
import { Blocks } from "react-loader-spinner";
import { Link } from "react-router-dom";

export default function Request() {
  const [isUpdated, setIsUpdated] = useState(false);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getAllRequests();
    document.title = "Admin - Request";
  }, [currentPage]);
  const getAllRequests = () => {
    GetRequests();
    setIsLoading(true);
  };
  const GetRequests = () => {
    Restaurants.GetRequests(currentPage, 9)
      .then((res) => {
        console.log("===res", res);
        if (res?.results) {
          setIsLoading(false);
          setData(res?.results);
        }
      })
      .catch((e) => {
        setIsLoading(false);
        console.log(e);
      });
  };
  const handleApicall = (req, id) => {
    Restaurants.handleRequest(id, req)
      .then((res) => {
        console.log("=======", res);
        if (
          res?.message != "" &&
          res?.message != undefined &&
          res?.message != null
        ) {
          swal({
            title: "Success!",
            text: `Request ${
              req == "approve" ? "approved" : "rejected"
            } successfully.`,
            icon: "success",
            buttons: req == "approve" ? true : false,
            timer: req == "approve" ? null : 1500,
          });
          GetRequests(currentPage);
        } else {
          swal({
            title: "Failed!",
            text: "Something went wrong, please try again",
            icon: "error",
            timer: 1000,
            buttons: false,
          });
        }
      })
      .catch((e) => {
        swal({
          title: "Failed!",
          text: "Something went wrong, please try again",
          icon: "error",
          timer: 1000,
          buttons: false,
        });
      });
  };
  const handleSubmit = (req, id) => {
    if (req == "reject") {
      swal({
        title: "Are you sure?",
        text: "Are you sure! you want to reject this restaurant?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((e) => {
        if (e) {
          handleApicall(req, id);
        }
      });
    } else {
      handleApicall(req, id);
    }
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const ProductTable = (data) => {
    return (
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg md:mx-10 md:mt-12 m-5">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                No.
              </th>
              <th scope="col" className="px-6 py-3">
                Restaurant Name
              </th>
              <th scope="col" className="px-6 py-3">
                Owner
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
                  {item?.bgImageUrl?.length > 0 ? (
                    <Link to={`/request/${item?._id}`} className="pl-3">
                      <div className="text-base font-semibold">
                        {item?.name}
                      </div>
                      <div className="font-normal text-gray-500">
                        {item?.email ? item?.email : "__"}
                      </div>
                    </Link>
                  ) : (
                    <div className="px-3">
                      <div className="text-base font-semibold">
                        {item?.name}
                      </div>
                      <div className="font-normal text-gray-500">
                        {item?.email ? item?.email : "__"}
                      </div>
                    </div>
                  )}
                </th>
                <td className="px-6 py-4">
                  {item?.ownerName ? item?.ownerName : "___"}
                </td>
                <td className="px-6 py-4">
                  {item?.number ? item?.number : "___"}
                </td>
                <td className="px-6 py-4 ">
                  <span
                    className={`${
                      item?.isApproved == "Accepted"
                        ? "bg-green-500"
                        : item?.isApproved == "Not Request"
                        ? "bg-orange-400"
                        : "bg-red-500"
                    } text-white rounded-2xl py-1 px-3 text-sm font-medium`}
                  >
                    {item?.isApproved == "Accepted"
                      ? "Approved"
                      : item?.isApproved == "Not Request"
                      ? "Pending"
                      : "Rejected"}
                  </span>
                </td>
                <td className="px-6 py-4 flex gap-3">
                  <button
                    className="font-medium border-blue-600 border-1 text-blue-600 px-3 py-1 rounded-lg hover:bg-blue-600 hover:text-white duration-150"
                    onClick={() => handleSubmit("approve", item?._id)}
                  >
                    Approve
                  </button>
                  <button
                    className="font-medium border-red-500 border-1 text-red-500 px-3 py-1 rounded-lg hover:bg-red-500 hover:text-white duration-150"
                    onClick={() => handleSubmit("reject", item?._id)}
                  >
                    Reject
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
    <>
      <div className="flex flex-wrap bg-blue-100 py-5 rounded-2xl mx-3 justify-between">
        <h1 className="ml-5 max-sm:mb-4 font-semibold text-3xl">
          &bull; Restaurants
        </h1>
      </div>
      <div className="my-12 mx-auto px-4 md:px-12">
        <div className="lg:-mx-4 justify-start">
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
          ) : data?.length > 0 ? (
            ProductTable(data)
          ) : (
            // data?.map((item, index) => {
            //   return (
            //     <Card
            //       key={index}
            //       name={item.name}
            //       restaurantId={item._id}
            //       items={item}
            //       // image={item?.bgImageUrl[0] ? item?.bgImageUrl[0] : resto}
            //       image={resto}
            //       isApproved={item?.isApproved}
            //       handleSubmit={(e) => handleSubmit(e, item._id)}
            //     />
            //   );
            // })
            <div>
              <h1 className="text-center font-bold dark:text-white">
                No request here
              </h1>
            </div>
          )}
        </div>
        {data?.length > 0 ? (
          <div className="mt-4 justify-center items-center flex">
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
              disabled={data?.length == 9 ? false : true}
              onClick={() => handlePageChange(currentPage + 1)}
              className={`inline-flex items-center px-4 py-2 ml-3 text-sm font-medium text-gray-500 border border-gray-300 rounded-lg  dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
                data?.length == 9
                  ? "hover:shadow-lg hover:text-gray-700 hover:bg-gray-100"
                  : "bg-white"
              }`}
            >
              Next
            </button>
          </div>
        ) : null}
      </div>
    </>
  );
}
