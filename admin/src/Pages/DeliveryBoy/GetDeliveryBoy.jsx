import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import swal from "sweetalert";
import DeliveryBoy from "../../Apis/DeliveryBoy";
import { Images } from "../../Assets";
import { DeliveryBoyCard, Tabs } from "../../Components";
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
  const [tabs, setTabs] = useState([
    { label: "All", badge: null },
    { label: "Approved", badge: null },
    { label: "Rejected", badge: null },
  ]);
  const [activeTabIndex, setActiveTabIndex] = useState(0);

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
  const handleDelete = (id) => {
    DeliveryBoy.deleteDeliveryBoy(id).then((response) => {
      if (response?.messag) {
        swal({
          title: "Success!",
          text: `Delivery boy deleted successfully.`,
          icon: "success",
          buttons: false,
          timer: 1000,
        });
        GetRequests();
      }
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
  return (
    <div>
      <div className="flex flex-wrap bg-blue-100 py-5 rounded-2xl mx-3 justify-between">
        <h1 className="ml-5 max-sm:mb-4 font-semibold text-3xl">
          &bull; Delivery Partners
        </h1>
        <div>
          <Tabs
            tabs={tabs}
            activeTabIndex={activeTabIndex}
            setActiveTabIndex={(index) => {
              setActiveTabIndex(index);
              handlePageChange(1);
            }}
          />
        </div>
      </div>
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
