import { motion } from "framer-motion";
import { FaUserCog } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { Link } from "react-router-dom";

const DropDown = ({ user,handleLogOut,setChangePassword }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.6 }}
      className="hidden group-hover:flex w-54  bg-gray-50 rounded-lg shadow-xl  flex-col absolute right-0 top-12"
    >
      <p className="px-10 py-2 flex items-center gap-3 bg-slate-100 transition-all duration-100 capitalize ease-in-out text-base text-headingColor">
        {user?.name || user?.email}
      </p>
      <button
        className="px-10 py-2 flex items-center gap-3 bg-slate-100 transition-all duration-100 ease-in-out text-base text-headingColor"
        onClick={()=>setChangePassword(true)}
      >
        Change<br/> Password <FaUserCog />
      </button>
      <button className="cursor-pointer px-10 py-2 flex items-center gap-3 hover:bg-slate-100 transition-all duration-100 ease-in-out text-base text-red-500"
      onClick={()=>handleLogOut()}
      >
        Logout
        <MdLogout />
      </button>
    </motion.div>
  );
};

export default DropDown;
