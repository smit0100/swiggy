import React, { useEffect, useState } from "react";
import Card from "../../Components/Card";
import resto from "../../Assets/resto.jpg";
import Restaurants from "../../Apis/Restaurants";
import swal from "sweetalert";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

export default function Request() {
  const [isUpdated, setIsUpdated] = useState(false);
  const [load, setLoad] = useState(false)
  const [data, setData] = useState('')
  useEffect(() => {
    (async () => {
      setLoad(true)

      const response = await axios.get(`http://localhost:4000/resturant/fetchAll`)
      setData(response.data.response)
      setLoad(false)
    })()
  }, [])

const handleReject =async (type) => {
    swal({
      title: "Are you sure?",
      text: "Are you sure! you want to reject this restaurant?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((e) => {
      if (e) {
        Restaurants.GetRequests()
          .then((res) => {
            if (res.data != null) {
              setIsUpdated(true);
              swal({
                // title: "Failed!",
                text: "Request has been approved successfully!",
                icon: "success",
              });
            } else {
              swal({
                title: "Failed!",
                text: "Something went wrong, please try again",
                icon: "error",
              });
            }
          })
          .catch((err) => {
            swal({
              title: "Failed!",
              text: "Something went wrong, please try again",
              icon: "error",
            });
          });
      }
    });
  };
  return (
    <div className="container my-12 mx-auto px-4 md:px-12">
      <Toaster />
      <div className="flex flex-wrap -mx-1 lg:-mx-4 gap-3 justify-start">
        {load==false && data!='' && data.map((item, index) => {
          return (
            <Card
              key={index}
              onClick={() => {
                handleReject("APPROVE");
              }}
              onClickReject={() => {
                handleReject();
              }}
              name={item.name}
              restaurantId={item._id}
            />
          );
        })}
      </div>
    </div>
  );
}
