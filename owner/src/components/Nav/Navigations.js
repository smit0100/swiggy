// import React from 'react'
import { Link } from "react-router-dom";
import { MdShoppingBasket } from "react-icons/md";
import { motion } from "framer-motion";
import { setCurrentColor } from "../../redux/user/userSlice";
import { useDispatch } from "react-redux";

const Navigations = ({ currentColor = "", isLogedIn = false, isApproved }) => {
  const dispatch = useDispatch();
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
          <Link to={"/"} onClick={() => dispatch(setCurrentColor("white"))}>
            Home
          </Link>
        </motion.li>
        {isLogedIn && isApproved != "Not Request" && (
          <>
            <motion.li
              whileHover={{ scale: 1.1 }}
              className={`md:text-sm lg:text-lg font-mono text-base text-${currentColor} cursor-pointer hover:font-bold duration-100 transition-all ease-in-out`}
            >
              <Link
                to={"/search"}
                onClick={() => dispatch(setCurrentColor("white"))}
              >
                Search
              </Link>
            </motion.li>
            <motion.li
              whileHover={{ scale: 1.1 }}
              className={`md:text-sm lg:text-lg font-mono text-base text-${currentColor} cursor-pointer hover:font-bold duration-100 transition-all ease-in-out`}
            >
              <Link
                to={"/orderdetails"}
                onClick={() => dispatch(setCurrentColor("slate-800"))}
              >
                Order List
              </Link>
            </motion.li>
            <motion.li
              whileHover={{ scale: 1.1 }}
              className={`md:text-sm lg:text-lg font-mono text-base text-${currentColor} cursor-pointer hover:font-bold duration-100 transition-all ease-in-out`}
            >
              <Link
                to={"/addproduct"}
                onClick={() => dispatch(setCurrentColor("slate-800"))}
              >
                Add Product
              </Link>
            </motion.li>
            <motion.li
              whileHover={{ scale: 1.1 }}
              className={`md:text-sm lg:text-lg font-mono text-base text-${currentColor} cursor-pointer hover:font-bold duration-100 transition-all ease-in-out`}
            >
              <Link
                to={"/listofproducts"}
                onClick={() => dispatch(setCurrentColor("slate-800"))}
              >
                Your Products
              </Link>
            </motion.li>
          </>
        )}
        <motion.li
          whileHover={{ scale: 1.1 }}
          className={`md:text-sm lg:text-lg font-mono text-base text-${currentColor} cursor-pointer hover:font-bold duration-100 transition-all ease-in-out`}
          onClick={() => {}}
        >
          <Link
            to={"/contactus"}
            onClick={() => dispatch(setCurrentColor("slate-800"))}
          >
            Contact us
          </Link>
        </motion.li>
        {isLogedIn && (
          <motion.li
            whileHover={{ scale: 1.1 }}
            className={`md:text-sm lg:text-lg font-mono text-base text-${currentColor} cursor-pointer hover:font-bold duration-100 transition-all ease-in-out`}
            onClick={() => {}}
          >
            <Link
              to={"/ownerprofile"}
              onClick={() => dispatch(setCurrentColor("slate-800"))}
            >
              Profile
            </Link>
          </motion.li>
        )}
      </motion.ul>
    </div>
  );
};

export default Navigations;
