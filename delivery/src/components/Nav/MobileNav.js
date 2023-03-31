// import React from 'react'
import { MdOutlineRestaurantMenu, MdShoppingBasket } from "react-icons/md";
import { Link } from "react-router-dom";
import { Images } from "../../Assets/index";

import { motion } from "framer-motion";

const MobileNav = ({
  isOpen,
  setIsOpen,
}) => {
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
        <Link onClick={() => setIsOpen(!isOpen)} to={'/'} className="text-base font-mono text-textColor cursor-pointer hover:text-headingColor duration-100 transition-all ease-in-out px-10">
          Home
        </Link>
        <Link onClick={() => setIsOpen(!isOpen)} to={'/orderdetails'} className="text-base font-mono text-textColor cursor-pointer hover:text-headingColor duration-100 transition-all ease-in-out px-10">
          Order List
        </Link>
        <Link onClick={() => setIsOpen(!isOpen)} to={'/contactus'} className="text-base font-mono text-textColor cursor-pointer hover:text-headingColor duration-100 transition-all ease-in-out px-10">
          Contact us
        </Link>
        <Link onClick={() => setIsOpen(!isOpen)} to={'/profile'} className="text-base font-mono text-textColor cursor-pointer hover:text-headingColor duration-100 transition-all ease-in-out px-10">
          Profile
        </Link>
      </div>

      <Link
        to={"/"}
        onClick={() => setIsOpen(!isOpen)}
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