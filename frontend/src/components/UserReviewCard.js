const UserReviewCard = ({ review }) => {
  
    let Array = []
    for (let i = 1; i <= +review.star; i++) {
      Array.push(<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>)
    }
  
    return (
      <div className="bg-orange-100 w-full h-fit  rounded">
        <img alt="Woman" src="https://i.ibb.co/NxZH2Zg/avatar.png" className="mx-auto mt-2 h-24 w-24 rounded-full object-cover shadow-xl" />
  
        <div className="flex flex-col justify-between rounded-lg p-6 text-center shadow-xl">
          <p className="text-lg font-bold text-gray-700">{review?.userName}</p>
          <p className="mt-4 text-sm text-gray-500">{review?.review}</p>
          <div className="mt-8 flex justify-center gap-0.5 text-green-500">{Array}</div>
        </div>
      </div>
    )
  }

  export default UserReviewCard