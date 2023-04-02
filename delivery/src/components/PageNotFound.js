import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { setCurrentColor } from "../redux/user/userSlice";
import { useDispatch } from "react-redux";

const PageNotFound = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCurrentColor("white"));
  }, []);

  return (
    <>
      <main className="relative h-screen overflow-hidden bg-white">
        <div className="container bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-gray-700 via-gray-900 to-black z-10 flex items-center justify-between h-screen px-6 pt-32 mx-auto md:pt-0">
          <div className="container relative flex flex-col-reverse items-center justify-between px-6 mx-auto lg:flex-row">
            <div className="w-full mb-16 text-center md:mb-8 lg:text-left">
              <h1 className="mt-12 font-sans text-5xl font-light text-center text-gray-300 lg:text-left lg:text-8xl md:mt-0">
                Sorry, this page isn&#x27;t found.
              </h1>
              <Link
                to="/"
                className="px-2 py-2 mt-28 top-10 relative text-lg font-normal duration-500 hover:rounded-r-2xl hover:border-black border-2 border-white w-36 text-white  hover:bg-yellow-300 hover:px-5"
              >
                Go back home
              </Link>
            </div>
            <div className="relative block w-full max-w-md mx-auto md:mt-0 lg:max-w-2xl">
              <img src="./svg/pagenotfound.svg" alt="404" />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default PageNotFound;
