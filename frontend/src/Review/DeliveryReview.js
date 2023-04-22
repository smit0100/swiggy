import React, { useState } from "react";
import { MdOutlineRateReview } from "react-icons/md";
import { toast } from "react-toastify";
import swal from "sweetalert";
import axios from "axios";
import { useSelector } from "react-redux";
import InlineButtonLoader from "../components/InlineButtonLoader";

const ReviewPopUp = ({
  setDeliveryReview,
  deliverboyId,
  orderId,
  setIsDeliveryButton,
  fcmToken,
}) => {
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [showModal, setShowModal] = useState(true);
  const [isValid, setIsValid] = useState(false);

  console.log("Rating point", rating);
  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };
  console.log("Review text : ", review, "Rating", rating);
  const user = useSelector((state) => state.userData.user);
  const goreview = async (e) => {
    e.preventDefault();
    if (review.trim() == "" && rating == 0) {
      toast.error("Please provide review and rating to continue", {
        theme: "dark",
        autoClose: 2000,
      });
      return
    }
    setIsValid(true);
    try {
      const res = await axios.post(`http://localhost:4000/courier/addreview`, {
        deliveryboyId: deliverboyId,
        user: user._id,
        description: review,
        star: rating,
        orderId: orderId,
        userName:user.name,
        fcmToken,
      });
      console.log(res);
      if (res?.data?.response?.isreviewGiven?.forDeliveryBoy) {
        toast.success("Review added successfully 🔥", {
          theme: "dark",
          autoClose: 2000,
        });
        setIsDeliveryButton(res.data.response.isreviewGiven.forDeliveryBoy);
      }
      setDeliveryReview(false);
      setIsValid(false);
    } catch (err) {
      console.log(err);
      setDeliveryReview(false);
      setIsValid(false);
    }
  };
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative my-6 mx-auto w-auto md:w-1/3">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900">
                Write Your Review for Delivery Boy
              </h3>
              <button
                type="button"
                onClick={() => setDeliveryReview(false)}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>
            <div className="relative p-6 flex-auto space-x-4">
              <form className="flex flex-col">
                <label htmlFor="review" className="pb-2">
                  Review
                </label>
                <div className="relative flex w-full flex-wrap items-stretch mb-3">
                  <span className="z-10 h-full leading-snug font-normal text-center flex  text-slate-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                    <MdOutlineRateReview className="text-black/50" />
                  </span>
                  <textarea
                    type="text"
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    id="review"
                    placeholder="Write your review"
                    className="px-3 py-3 placeholder-slate-300 text-slate-600 relative bg-white rounded text-sm border border-slate-300 outline-none focus:outline-none focus:ring w-full pl-10"
                  ></textarea>
                </div>
                {/* <ReviewCard /> */}
                <StarRating
                  rating={rating}
                  onRatingChange={handleRatingChange}
                />
              </form>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-center p-6 border-t border-solid border-slate-200 rounded-b">
              <button
                type="button"
                disabled={isValid}
                className={`${
                  isValid ? "bg-black" : "hover:bg-white hover:text-black"
                } bg-black text-white p-2 rounded-lg mt-2   hover:border duration-200 border border-gray-300 w-[50%]`}
                onClick={goreview}
              >
                {isValid ? <InlineButtonLoader /> : "Save"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default ReviewPopUp;

const StarRating = ({ rating, onRatingChange }) => {
  const [hoverRating, setHoverRating] = useState(null);

  const handleRatingClick = (newRating) => {
    onRatingChange(newRating);
  };

  const handleStarMouseEnter = (newRating) => {
    setHoverRating(newRating);
  };

  const handleStarMouseLeave = () => {
    setHoverRating(null);
  };

  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((i) => (
        <button
          key={i}
          className={`text-yellow-500 ${
            (hoverRating || rating) >= i ? "fill-current" : "fill-gray-400"
          } w-6 h-6`}
          onClick={(e) => {
            e.preventDefault();
            handleRatingClick(i);
          }}
          onMouseEnter={() => handleStarMouseEnter(i)}
          onMouseLeave={handleStarMouseLeave}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path
              d="M10 0l3.091 6.327 6.909.999-4.999 4.87 1.182 6.858L10 16.673l-6.182 3.34L5.999 9.14 0.09 8.141l6.909-.999L10 0z"
              fillRule="evenodd"
            />
          </svg>
        </button>
      ))}
      <span className="ml-2">{hoverRating || rating}/5</span>
    </div>
  );
};
