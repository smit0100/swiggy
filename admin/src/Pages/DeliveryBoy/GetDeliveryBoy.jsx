import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import swal from "sweetalert";
import DeliveryBoy from "../../Apis/DeliveryBoy";
import { Images } from "../../Assets";
import { DeliveryBoyCard } from "../../Components";
const data = [
  {
    name: "Smit",
    image: Images.Avatar3,
  },
  {
    name: "Rohit",
    image: Images.Avatar3,
  },
  {
    name: "Poojan",
    image: Images.Avatar3,
  },
  {
    name: "Dixit",
    image: Images.Avatar3,
  },
];
export default function GetDeliveryBoy() {
  const [datas, setDatas] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    GetRequests();
    document.title = "Admin - Delivery Boy Request";
  }, [currentPage]);
  const GetRequests = async () => {
    DeliveryBoy.GetRequests(currentPage, 9)
      .then((res) => {
        console.log("===fetchall", res);
        if (res?.response) {
          setDatas(res?.response);
        }
      })
      .catch((e) => console.log("====ee", e));
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
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
        text: "Are you sure! you want to reject this Delivery boy?",
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
  return (
    <div>
      <h1 className="ml-5 max-sm:mb-4 dark:text-white font-semibold text-3xl">
        &bull; Delivery Boy's request
      </h1>
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
    </div>
  );
}
