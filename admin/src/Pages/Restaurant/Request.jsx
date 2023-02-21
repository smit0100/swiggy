import React, { useEffect, useState } from "react";
import Restaurants from "../../Apis/Restaurants";
import swal from "sweetalert";
import { Card } from "../../Components";

export default function Request() {
  const [isUpdated, setIsUpdated] = useState(false);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    GetRequests(currentPage);
  }, [currentPage]);

  const GetRequests = () => {
    Restaurants.GetRequests(currentPage)
      .then((res) => {
        console.log("===res", res);
        if (res?.results) {
          setData(res?.results);
        }
      })
      .catch((e) => {
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
  return (
    <div className="container my-12 mx-auto px-4 md:px-12">
      <div className="flex flex-wrap -mx-1 lg:-mx-4 gap-3 justify-start">
        {data?.length > 0 &&
          data?.map((item, index) => {
            return (
              <Card
                key={index}
                name={item.name}
                restaurantId={item._id}
                items={item}
                isApproved={item?.isApproved}
                handleSubmit={(e) => handleSubmit(e, item._id)}
              />
            );
          })}
      </div>
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
    </div>
  );
}
