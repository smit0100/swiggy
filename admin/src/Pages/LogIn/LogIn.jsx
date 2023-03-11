import React, { useEffect, useState } from "react";
import { useStateContext } from "../../contexts/ContextProvider";
import { Images } from "../../Assets";
import { useNavigate } from "react-router-dom";

const BgImages = [Images.Bg_LogIn1, Images.Bg_LogIn2, Images.Bg_LogIn3];
function LogIn() {
  const { setIsLogIn } = useStateContext();
  const [bgIndex, setBgIndex] = useState(null);
  function getRandomIndex() {
    return Math.floor(Math.random() * BgImages.length);
  }
  useEffect(() => {
    setBgIndex(getRandomIndex());
  }, []);
  const history = useNavigate();
  const handleLogIn = () => {
    localStorage.setItem("isLogIn", JSON.stringify(true));
    setIsLogIn(true);
    history("/dashboard");
  };
  return (
    <div className="flex items-center justify-center flex-1 min-h-screen bg-black bg-opacity-30 backdrop-blur-sm">
      <img
        src={BgImages[bgIndex]}
        className="w-full h-full object-cover absolute mix-blend-overlay"
      />
      <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-md rounded-2xl md:flex-row md:space-y-0">
        <div className="flex flex-col justify-center p-8 md:p-14">
          <span className="mb-3 text-4xl font-bold">Swiggy</span>
          <span className="font-light text-gray-400 mb-8">
            Welcom back! Please enter your details
          </span>
          <div className="py-4">
            <span className="mb-2 text-md">Email</span>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
              name="email"
              id="email"
            />
          </div>
          <div className="py-4">
            <span className="mb-2 text-md">Password</span>
            <input
              type="password"
              name="pass"
              id="pass"
              className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
            />
          </div>
          <div className="flex justify-between w-full py-4">
            <div className="mr-24">
              <input type="checkbox" name="ch" id="ch" className="mr-2" />
              <span className="text-md">Remember for 7 days</span>
            </div>
            <span className="font-bold text-md cursor-pointer">
              Forgot password
            </span>
          </div>
          <button
            className="w-full bg-black text-white p-2 rounded-lg mt-10 hover:bg-white hover:text-black hover:border duration-500 border border-gray-300"
            onClick={handleLogIn}
          >
            Sign in
          </button>
          {/* <div className="text-center text-gray-400">
            Dont'have an account?
            <span className="font-bold text-black">Sign up for free</span>
          </div> */}
        </div>
        <div className="relative">
          <img
            src={Images.Product1}
            alt="img"
            className="w-[400px] h-full hidden rounded-r-2xl md:block object-cover"
          />
          <div className="absolute hidden bottom-10 right-6 p-6 bg-white bg-opacity-30 backdrop-blur-sm rounded drop-shadow-lg md:block">
            <span className="text-white text-xl">
              We've been uesing Untitle to kick"
              <br />
              start every new project and can't <br />
              imagine working without it."
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LogIn;
