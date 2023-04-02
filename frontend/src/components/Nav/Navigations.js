// import React from 'react'
import { Link } from "react-router-dom";
import { MdShoppingBasket } from "react-icons/md";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { setCurrentColor } from "../../redux/user/userSlice";

const Navigations = ({ currentColor = "", isLogedIn = false, Qty }) => {
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
          <Link to={"/"} onClick={()=>dispatch(setCurrentColor("white"))}>Home</Link>
        </motion.li>
        <motion.li
          whileHover={{ scale: 1.1 }}
          className={`md:text-sm lg:text-lg font-mono text-base text-${currentColor} cursor-pointer hover:font-bold duration-100 transition-all ease-in-out`}
        >
          <Link to={"/search"} onClick={()=>dispatch(setCurrentColor("slate-800"))}>Search</Link>
        </motion.li>
        <motion.li
          whileHover={{ scale: 1.1 }}
          className={`md:text-sm lg:text-lg font-mono text-base text-${currentColor} cursor-pointer hover:font-bold duration-100 transition-all ease-in-out`}
          onClick={() => {}}
        >
          <Link to={"/contactus"} onClick={()=>dispatch(setCurrentColor("slate-800"))}>Contact us</Link>
        </motion.li>
        {isLogedIn && (
          <>
            <motion.li
              whileHover={{ scale: 1.1 }}
              className={`md:text-sm lg:text-lg font-mono text-base text-${currentColor} cursor-pointer hover:font-bold duration-100 transition-all ease-in-out`}
              onClick={() => {}}
            >
              <Link to={"/profile"} onClick={()=>dispatch(setCurrentColor("slate-800"))}>Profile</Link>
            </motion.li>
            <motion.div
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.1 }}
              className="relative flex items-center justify-center text-textColor"
            >
              <Link to="/cart" onClick={()=>dispatch(setCurrentColor("slate-800"))}>
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
      </motion.ul>
    </div>
  );
};

export default Navigations;
