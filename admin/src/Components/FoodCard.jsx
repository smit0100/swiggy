import React from "react";

const OrderSummaryFoodCard = ({ product }) => {
  return (
    <div className="w-full lg:w-1/2 my-2">
      <div className="flex justify-center">
        <div className="flex flex-col md:flex-row rounded-lg bg-slate-50 shadow-lg dark:bg-slate-200 md:max-w-xl">
          <img
            className="w-full h-44 rounded-t-lg object-cover md:w-44 md:rounded-none md:rounded-l-lg"
            src={`${product?.product.imageUrl}`}
            alt=""
          />
          <div className="flex flex-col justify-start p-4">
            <h5 className="mb-2 text-xl font-medium text-neutral-800 dark:text-neutral-50">
              {product?.product.name}
            </h5>
            <div className="flex flex-col space-y-2">
              <div className="font-medium">
                ₹ {product?.product.price}
                <span className="text-sm text-gray-600"> /Price</span>
              </div>
              <p className="font-medium ">
                {product?.quantity}
                <span className="text-sm text-gray-600"> /Quantity</span>
              </p>
              <p className="text-xs text-neutral-600 ">
                {product?.product?.description}
              </p>
              <p className="text-xs text-neutral-500 ">Ordered 3 mins ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummaryFoodCard;
