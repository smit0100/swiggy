import React from 'react'

const OrderSummaryFoodCard = () => {
  return (
    <>
      <div className='w-full lg:w-[49%]'>
        <div className="flex justify-center">
          <div className="flex flex-col rounded-lg bg-white shadow-lg dark:bg-neutral-700 md:max-w-xl md:flex-row">
            <img 
              className="h-52 w-80 rounded-t-lg object-cover md:h-52 md:w-44 md:rounded-none md:rounded-l-lg"
              src="https://mdbootstrap.com/wp-content/uploads/2020/06/vertical.jpg"
              alt="" />
            <div className="flex flex-col justify-start p-6">
              <h5 className="mb-2 text-xl font-medium text-neutral-800 dark:text-neutral-50">
                Food name
              </h5>
              <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
                Food description here
              </p>
              <p className="text-xs text-neutral-500 dark:text-neutral-300">
                Last updated 3 mins ago
              </p>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}

export default OrderSummaryFoodCard