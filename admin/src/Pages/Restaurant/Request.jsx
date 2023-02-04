import React, { useEffect, useState } from "react";
import Restaurants from "../../Apis/Restaurants";
import swal from "sweetalert";
import { Card } from "../../Components";

export default function Request() {
  const [isUpdated, setIsUpdated] = useState(false);
  const [data, setData] = useState([]);
  useEffect(() => {
    GetRequests();
  }, []);
  const GetRequests = () => {
    Restaurants.GetRequests()
      .then((res) => {
        console.log("===res", res);
        if (res?.response) {
          setData(res?.response);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
  console.log("====data0", data);
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
    </div>
  );
}
