import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import DeliveryBoy from "../../Apis/DeliveryBoy";
import { ReviewCard } from "../../Components";
import { Blocks } from "react-loader-spinner";

export default function DeliveryDetails() {
  const location = useLocation();
  const state = location.state;
  const [reviewData, setReviewData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  console.log("===state", state);
  useEffect(() => {
    getReviews();
  }, []);

  const getReviews = () => {
    setIsLoading(true);
    DeliveryBoy.getAllReviews(state?._id)
      .then((res) => {
        console.log("==reviewww", res);
        if (res?.review?.review) {
          setReviewData(res?.review?.review);
          setIsLoading(false);
        }
      })
      .catch((e) => {
        setIsLoading(false);
        console.log("=====e", e);
      });
  };
  return (
    <div>
      <div className="flex flex-wrap bg-blue-100 py-5 rounded-2xl mx-3 justify-between">
        <h1 className="ml-5 max-sm:mb-4 font-semibold text-3xl">
          &bull; {state?.name}'s review
        </h1>
      </div>
      <div className="flex flex-wrap py-10 my-5 gap-5 w-full rounded-2xl justify-center mb-11 items-center  bg-gradient-to-tr from-teal-300 to-violet-500 ">
        {isLoading ? (
          <div className="w-full flex items-center justify-center">
            <Blocks
              visible={isLoading}
              height="80"
              width="80"
              ariaLabel="blocks-loading"
              wrapperStyle={{}}
              color="white"
              wrapperClass="blocks-wrapper"
            />
          </div>
        ) : reviewData?.length > 0 ? (
          reviewData.map((item, index) => {
            return <ReviewCard item={item} key={item?._id} />;
          })
        ) : (
          <div className="flex justify-center items-center w-full">
            <p className="text-white">No reviews here</p>
          </div>
        )}
      </div>
    </div>
  );
}
