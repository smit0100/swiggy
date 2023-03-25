import React from "react";
import { Link } from "react-router-dom";

export default function RestroCard(props) {
  return (
    <div className="wrapper w-64 antialiased text-gray-900 h-96">
      <div>
        <Link to={`/restaurants/${props.restaurantId}`} state={props?.item}>
          <img
            src={props.image}
            alt="Restaurant"
            className="w-64 h-72 hover:opacity-90 hover:mt-1 duration-500 hover:shadow-2xl  object-cover object-center rounded-xl shadow-md z-50"
          />
        </Link>
        <div className="relative px-4 -mt-16 md:hover:-mt-24 lg:hover:-mt-24 duration-500">
          <div className="bg-white p-6 rounded-2xl shadow-lg w-full">
            <div className="flex items-baseline">
              <span className="bg-teal-200 text-teal-800 text-xs px-2 inline-block rounded-full  uppercase font-semibold tracking-wide">
                New
              </span>
              <div className="ml-2 text-gray-600 uppercase text-xs font-semibold tracking-wider">
                &bull; 10 % discount
              </div>
            </div>

            <h4 className="mt-1 text-xl font-semibold uppercase leading-tight truncate">
              {props.title}
            </h4>
            <div className="mt-2">
              <span className="text-teal-600 text-md font-semibold">
                3.5/5 ratings{" "}
              </span>
              <span className="text-sm text-gray-600">
                (based on 12 ratings)
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
