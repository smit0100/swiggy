import React from 'react'

const OrderSummaryFoodCard = () => {
  return (
    <>
      <div className='w-full lg:w-[49%]'>
        <div className="flex justify-center">
          <div className="flex flex-col rounded-lg bg-black/10 shadow-lg  md:max-w-xl md:flex-row">
            <img
              className="h-52 w-80 rounded-t-lg object-cover md:h-52 md:w-44 md:rounded-none md:rounded-l-lg"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvxAJcSQRs2u2vkyS5GoKLm66Op0CqWt0rjg&usqp=CAU"
              alt="" />
            <div className="flex flex-col justify-start p-6">
              <h5 className="mb-2 text-xl font-medium text-neutral-800 ">
                Food name
              </h5>
              <div className='flex flex-col space-y-2'>
                <div className="font-medium">
                  ₹550 <span className="text-sm text-gray-600"> /Price</span>
                </div>
                <p className="font-medium ">
                  2 <span className="text-sm text-gray-600"> /Quantity</span>
                </p>
                <p className="text-base text-neutral-600 ">
                  Food description here
                </p>
                <p className="text-xs text-neutral-500 ">
                  Ordered 3 mins ago
                </p>
              </div>

            </div>
          </div>
        </div>

      </div>
    </>
  )
}

export default OrderSummaryFoodCard