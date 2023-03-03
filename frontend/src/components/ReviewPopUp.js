import React, { useState } from 'react'
import { MdOutlineRateReview } from 'react-icons/md'
import swal from 'sweetalert'


const ReviewPopUp = () => {

  const [review, setReview] = useState('')
  const [rating, setRating] = useState(0);
  const [showModal, setShowModal] = useState(false);
  console.log("Rating point",rating);
  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };
console.log("Review text : ",review,"Rating",rating);
  return (
    <div className="w-full sm:w-[400px] flex pt-5">
      <div className="shadow-black shadow-sm bg-white p-3">
        <MdOutlineRateReview className='text-xl' />
        <div className="py-2">
          <p className="font-semibold text-xl">Write Your Review</p>
          <p className="w-10/12 font-[350] text-slate-500"></p>
          <button className="inline-block mt-7 bg-white hover:text-white hover:bg-blue-600 -bottom-4 font-bold  rounded border border-current px-8 py-[6px] text-xs uppercase  text-blue-600 transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:text-blue-500" type="button"
            onClick={() => setShowModal(true)}>
            Review
          </button>
        </div>

        {showModal ? (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                    <h3 className="text-xl font-semibold">Write Your Review</h3>
                    <button className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => setShowModal(false)}>
                      <span className=" text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                        X
                      </span>
                    </button>
                  </div>
                  <div className="relative p-6 flex-auto space-x-4">
                    <form className='flex flex-col'>
                      <label htmlFor='review'>Review</label>
                      <div className="relative flex w-full flex-wrap items-stretch mb-3">
                        <span className="z-10 h-full leading-snug font-normal text-center flex  text-slate-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                          <MdOutlineRateReview className='text-black/50' />
                        </span>
                        <textarea type="text"  value={review} onChange={(e) => setReview(e.target.value)} id="review" placeholder="Write your review" className="px-3 py-3 resize-none placeholder-slate-300 text-slate-600 relative  bg-white rounded text-sm border border-slate-300 outline-none focus:outline-none focus:ring w-72 h-24 pl-10" ></textarea>
                      </div>
                      {/* <ReviewCard /> */}
                      <StarRating rating={rating} onRatingChange={handleRatingChange} />
                    </form>
                  </div>
                  {/*footer*/}
                  <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                    <button className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button"
                      onClick={() => setShowModal(false)}>
                      Close
                    </button>
                    <button className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        ) : null}
      </div>
    </div>
  )
}

export default ReviewPopUp


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
          className={`text-yellow-500 ${(hoverRating || rating) >= i ? 'fill-current' : 'fill-gray-400'
            } w-6 h-6`}
          onClick={(e) => { e.preventDefault(); handleRatingClick(i) }}
          onMouseEnter={() => handleStarMouseEnter(i)}
          onMouseLeave={handleStarMouseLeave}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 0l3.091 6.327 6.909.999-4.999 4.87 1.182 6.858L10 16.673l-6.182 3.34L5.999 9.14 0.09 8.141l6.909-.999L10 0z" fillRule="evenodd" /></svg>
        </button>
      ))}
      <span className="ml-2">{hoverRating || rating}/5</span>
    </div>
  );
};


// const ReviewCard = () => {
//   const [rating, setRating] = useState(0);
//   const handleRatingChange = (newRating) => {
//     setRating(newRating);
//   };

//   return (
//     <div className="bg-white rounded-lg shadow-lg p-6">
//       <div className="flex items-center mb-4">
//         <StarRating rating={rating} onRatingChange={handleRatingChange} />
//       </div>
//     </div>
//   );
// };




