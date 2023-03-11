import React from 'react'

const OrderSummaryFoodCard = ({product}) => {
  // console.log(product);
  return (
    <>
      <div className='w-full lg:w-[49%]'>
        <div className="flex justify-center">
          <div className="flex flex-col rounded-lg bg-white shadow-lg dark:bg-neutral-700 md:max-w-xl md:flex-row">
            <img 
              className="h-52 w-80 rounded-t-lg object-cover md:h-52 md:w-44 md:rounded-none md:rounded-l-lg"
              src={`${product?.product.imageUrl}`}
              alt="" />
            <div className="flex flex-col justify-start p-6">
              <h5 className="mb-2 text-xl font-medium text-neutral-800 dark:text-neutral-50">
              {product?.product.name}
              </h5>
              <div className='flex flex-col space-y-2'>
                <div className="font-medium">
                  ₹ {product?.product.price}<span className="text-sm text-gray-600"> /Price</span>
                </div>
                <p className="font-medium ">
                {product?.quantity}<span className="text-sm text-gray-600"> /Quantity</span>
                </p>
                <p className="text-base text-neutral-600 ">
                {product?.product.description}
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