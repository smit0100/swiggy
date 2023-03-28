import React, { useEffect, useState } from "react";
import Restaurant from "../../Apis/Restaurants";
import { RestroCard } from "../../Components";
import resto from "../../Assets/resto.jpg";
import { Blocks } from "react-loader-spinner";

export default function Restaurants() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getRestaurants();
    document.title = "Admin - Approved Restaurants";
  }, []);
  const getRestaurants = () => {
    setIsLoading(true)
    Restaurant.GetApprovedRestaurant()
      .then((res) => {
        console.log("===res", res);
        if (res?.results) {
          setIsLoading(false)
          setData(res?.results);
        }
      })
      .catch((e) => {
        setIsLoading(false)
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
          {isLoading?
           (
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
           ):(
          data?.length > 0 ? (
            data?.map((item, index) => {
              return (
                <RestroCard
                  key={index}
                  image={item?.bgImageUrl[0] ? item?.bgImageUrl[0] : resto}
                  title={item?.name}
                  restaurantId={item?._id}
                  item={item}
                />
              );
            })
          ) : (
            <div className="w-full">
              <h1 className="text-center font-bold dark:text-white">
                No Active Restaurants here
              </h1>
            </div>
          )
          ) 
        }
        </div>
      </div>
    </>
  );
}
