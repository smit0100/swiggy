// import React from 'react'
import { Link } from "react-router-dom";
import { MdShoppingBasket } from "react-icons/md";
import { motion } from "framer-motion";

const Navigations = ({ currentColor = "", isLogedIn = false }) => {
  return (
    <div className="flex items-center gap-8">
      <motion.ul
        initial={{ opacity: 0, x: 200 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 200 }}
        className={`flex items-center gap-8`}
      >
        <motion.li
          whileHover={{ scale: 1.1 }}
          className={`md:text-sm lg:text-lg font-mono text-base text-${currentColor} cursor-pointer hover:font-bold duration-100 transition-all ease-in-out`}
        >
          <Link to={"/"}>Home</Link>
        </motion.li>
        {isLogedIn && (
          <motion.li
            whileHover={{ scale: 1.1 }}
            className={`md:text-sm lg:text-lg font-mono text-base text-${currentColor} cursor-pointer hover:font-bold duration-100 transition-all ease-in-out`}
          >
            <Link to={"/orderdetails"}>Order List</Link>
          </motion.li>
        )}
        <motion.li
          whileHover={{ scale: 1.1 }}
          className={`md:text-sm lg:text-lg font-mono text-base text-${currentColor} cursor-pointer hover:font-bold duration-100 transition-all ease-in-out`}
          onClick={() => {}}
        >
          <Link to={"/contactus"}>Contact us</Link>
        </motion.li>
        {isLogedIn && (
          <motion.li
            whileHover={{ scale: 1.1 }}
            className={`md:text-sm lg:text-lg font-mono text-base text-${currentColor} cursor-pointer hover:font-bold duration-100 transition-all ease-in-out`}
            onClick={() => {}}
          >
            <Link to={"/profile"}>Profile</Link>
          </motion.li>
        )}
      </motion.ul>
    </div>
  );
};

export default Navigations;
