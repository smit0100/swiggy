// import React from 'react'
import { MdOutlineRestaurantMenu, MdShoppingBasket } from "react-icons/md";
import { Link } from "react-router-dom";
import { Images } from "../../Assets/index";

import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { setCurrentColor } from "../../redux/user/userSlice";

const MobileNav = ({ isOpen, setIsOpen, isLogedIn = false, Qty }) => {
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col bg-cardOverlay backdrop-blur-sm items-start justify-start gap-16 w-screen h-screen  overflow-y-hidden  z-50 overflow-hidden ">
      <motion.div className="flex items-center justify-between w-screen h-24  px-10">
        <motion.div
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0, x: 200 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 200 }}
          className="relative flex items-center justify-center text-textColor"
          onClick={() => setIsOpen(!isOpen)}
        >
          <MdOutlineRestaurantMenu className="text-headingColor text-4xl" />
        </motion.div>
      </motion.div>
      <div
        className={`flex items-center justify-center w-full  h-72 gap-10 flex-col`}
      >
        <Link
          onClick={() => {
            setIsOpen(!isOpen);
            dispatch(setCurrentColor("white"));
          }}
          to={"/"}
          className="text-base font-mono text-textColor cursor-pointer hover:text-headingColor duration-100 transition-all ease-in-out px-10"
        >
          Home
        </Link>
        <Link
          onClick={() => {
            setIsOpen(!isOpen);
            dispatch(setCurrentColor("slate-800"));
          }}
          to={"/search"}
          className="text-base font-mono text-textColor cursor-pointer hover:text-headingColor duration-100 transition-all ease-in-out px-10"
        >
          Search
        </Link>
        <Link
          onClick={() => {
            setIsOpen(!isOpen);
            dispatch(setCurrentColor("slate-800"));
          }}
          to={"/contactus"}
          className="text-base font-mono text-textColor cursor-pointer hover:text-headingColor duration-100 transition-all ease-in-out px-10"
        >
          Contact us
        </Link>
        {isLogedIn && (
          <>
            <Link
              onClick={() => {
                setIsOpen(!isOpen);
                dispatch(setCurrentColor("slate-800"));
              }}
              to={"/profile"}
              className="text-base font-mono text-textColor cursor-pointer hover:text-headingColor duration-100 transition-all ease-in-out px-10"
            >
              Profile
            </Link>
            <motion.div
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.1 }}
              className="relative flex items-center justify-center text-textColor"
            >
              <Link
                to="/cart"
                onClick={() => dispatch(setCurrentColor("slate-800"))}
              >
                <MdShoppingBasket className="text-2xl cursor-pointer" />
                {Qty > 0 && (
                  <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-500 flex items-center justify-center cursor-pointer">
                    <p className="text-sm text-white font-semibold">{Qty}</p>
                  </div>
                )}
              </Link>
            </motion.div>
          </>
        )}
      </div>

      <Link
        to={"/"}
        onClick={() => {
          setIsOpen(!isOpen);
          dispatch(setCurrentColor("white"));
        }}
        className="flex items-center  justify-center w-full"
      >
        <motion.div
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.1 }}
          className="flex items-center gap-2 cursor-pointer"
        >
          <img src={Images?.logo} alt="Logo" className="w-16 object-cover" />
          <p className="text-headingColor text-3xl font-bold">FoodPoint</p>
        </motion.div>
      </Link>
    </div>
  );
};

export default MobileNav;
