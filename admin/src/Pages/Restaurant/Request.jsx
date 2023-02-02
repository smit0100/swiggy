import React, { useEffect, useState } from "react";
import Card from "../../Components/Card";
import Restaurants from "../../Apis/Restaurants";
import swal from "sweetalert";
import { useParams } from "react-router-dom";

export default function Request() {
  const [isUpdated, setIsUpdated] = useState(false);
  const [load, setLoad] = useState(false)
  const [data, setData] = useState([])
  useEffect(() => {
    GetRequests()
  }, [])
  const { restaurantId } = useParams();
const GetRequests =()=>{
  Restaurants.GetRequests().then((res)=>{
    if (res?.response) {
      setData(res?.response)
      setLoad(false)
    }
  }).catch((e)=>{  console.log(e)})
}
console.log("====data0",data);
const handleApicall = (req) => {
  Restaurants.handleRequest(restaurantId,req)
    .then((res) => {
      console.log("=======", res);
      if (res?.data?.message != "" && res.data.message != undefined && res.data.message != null) {
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
          timer:1000,
          buttons:false
        });
      }
    })
    .catch((e) => {
      swal({
        title: "Failed!",
        text: "Something went wrong, please try again",
        icon: "error",
        timer:1000,
        buttons:false
      });
    });
};
const handleSubmit = (req) => {
  if (req == "reject") {
    swal({
      title: "Are you sure?",
      text: "Are you sure! you want to reject this restaurant?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((e) => {
      if (e) {
        handleApicall(req);
      }
    });
  } else {
    handleApicall(req);
  }
};
  return (
    <div className="container my-12 mx-auto px-4 md:px-12">
      <div className="flex flex-wrap -mx-1 lg:-mx-4 gap-3 justify-start">
        {load==false && data!='' && data.map((item, index) => {
          return (
            <Card
              key={index}
              name={item.name}
              restaurantId={item._id}
              items={item}
              handleSubmit={(e)=>handleSubmit(e)}
            />
          );
        })}
      </div>
    </div>
  );
}
