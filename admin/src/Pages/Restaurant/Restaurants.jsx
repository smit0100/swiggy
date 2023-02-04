import React, { useEffect, useState } from "react";
import Restaurant from "../../Apis/Restaurants";
import { RestroCard } from "../../Components";
import resto from "../../Assets/resto.jpg";

export default function Restaurants() {
  const [data, setData] = useState([]);
  useEffect(() => {
    getRestaurants();
  }, []);
  const getRestaurants = () => {
    Restaurant.GetApprovedRestaurant()
      .then((res) => {
        console.log("===res", res);
        if (res?.data) {
          setData(res?.data);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <div className="container my-12 mx-auto px-4 md:px-12 justify-center">
      <div className="flex flex-wrap -mx-1 lg:-mx-4 gap-3 justify-between max-sm:justify-center items-center">
        {data?.length > 0 &&
          data?.map((item, index) => {
            return (<RestroCard
                image={resto}
                title={item?.name}
                restaurantId={item?._id}
            />)
          })}
      </div>
    </div>
  );
}
