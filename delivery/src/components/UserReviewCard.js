import React from "react";

const UserReviewCard = ({ review }) => {
  let Array = [];
  for (let i = 1; i <= +review?.star; i++) {
    Array.push(
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    );
  }

  return (
    <>
      <div>
        <h1 className="text-2xl font-normal capitalize border-b-2 border-black mt-6 pb-2">
          Customer Review
        </h1>
        <div className="pt-5">
          <div>
            <img
              alt="Woman"
              src="https://i.ibb.co/NxZH2Zg/avatar.png"
              className="mx-auto h-24 w-24 rounded-full object-cover shadow-xl"
            />
            <blockquote className="-mt-6 flex flex-col justify-between rounded-lg p-12 text-center shadow-xl">
              <p className="text-lg font-bold text-gray-700">
                {review?.userName}
              </p>
              <p className="mt-4 text-sm text-gray-500">{review?.review}</p>
              <div className="mt-8 flex justify-center gap-0.5 text-green-500">
                {Array}
              </div>
            </blockquote>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserReviewCard;
