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
        if (res?.results) {
          setData(res?.results);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <>
      <h1 className="ml-5 max-sm:mb-4 dark:text-white font-semibold text-3xl">
        &bull; Approved Restaurants
      </h1>
      <div className="container my-12 mx-auto px-4 md:px-12 justify-center">
        <div className="flex flex-wrap -mx-1 lg:-mx-4 gap-3 justify-start max-sm:justify-center items-center">
          {data?.length > 0 ?
            data?.map((item, index) => {
              return (
                <RestroCard
                  key={index}
                  image={resto}
                  title={item?.name}
                  restaurantId={item?._id}
                  item={item}
                />
              );
            }):(
              <div className="w-full">
          <h1 className="text-center font-bold dark:text-white">No Active Restaurants here</h1>
        </div>
            )}
        </div>
      </div>
    </>
  );
}
