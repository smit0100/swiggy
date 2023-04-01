import { Images } from "../../Assets/index";
import { Link, useNavigate } from "react-router-dom";

import DropDown from "./DropDown";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import LoginAction from "./LoginAction";
import MobileNav from "./MobileNav";
import Navigations from "./Navigations";
import { RiArrowDropDownLine } from "react-icons/ri";
import { motion } from "framer-motion";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ownerLogIn, userData } from "../../redux/user/userSlice";
import swal from "sweetalert";
const MainNav = () => {
  const currentColor = useSelector((state) => state.userData.currentColor);
  const isOwnerLogIn = useSelector((state) => state.userData.isOwnerLogIn);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenMobileNav, setIsOpenMobileNav] = useState(false);
  const user = useSelector((state) => state.userData.user);
  const history = useNavigate();
  const dispatch = useDispatch();
  console.log("==user", currentColor);
  const handleLogOut = () => {
    console.log("===calllll");
    swal({
      title: "Are you sure! you want to log out?",
      icon: "warning",
      buttons: ["NO", "YES"],
      cancelButtonColor: "#DD6B55",
      confirmButtonColor: "#DD6B55",
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        localStorage.clear();
        dispatch(ownerLogIn(false));
        dispatch(userData(null));
        history("/");
      }
    });
  };
  return (
    <header className="w-screen fixed z-50 bg-cardOverlay backdrop-blur-md md:p-3 md:px-4 lg:p-4 lg:px-16">
      {/* Tablet and Desktop */}
      <div className="hidden md:flex w-full justify-between items-center">
        <Link to={"/"}>
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="flex items-center gap-2 cursor-pointer"
          >
            <img
              src={Images?.logo}
              alt="Logo"
              className="md:w-6 lg:w-8 object-cover"
            />
            <p
              className={`text-${currentColor} font-mono md:text-lg lg:text-xl font-bold`}
            >
              FoodPoint
            </p>
          </motion.div>
        </Link>

        <Navigations currentColor={currentColor} isLogedIn={isOwnerLogIn} />

        {user ? (
          <div className={`group flex items-center gap-3 px-3 py-1 rounded-lg`}>
            <motion.div
              whileHover={{ scale: 1.1 }}
              className=" flex items-center justify-center"
            >
              <img
                src={user?.imageURL || Images?.user}
                className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-2xl rounded-full cursor-pointer object-contain"
                alt="profile"
              />
              <p className="text-white cursor-pointer flex items-center justify-center gap-2">
                <RiArrowDropDownLine />
              </p>
            </motion.div>
            <DropDown user={user} handleLogOut={()=>handleLogOut()} />
          </div>
        ) : (
          <LoginAction text={"Login"} currentColor={currentColor}/>
        )}
      </div>

      <motion.div
        className="flex md:hidden w-full p-0 items-center justify-between"
        initial={{ opacity: 0, x: 200 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 200 }}
      >
        {isOpenMobileNav ? (
          <MobileNav isOpen={isOpenMobileNav} setIsOpen={setIsOpenMobileNav} />
        ) : (
          <div className="p-5 flex items-center justify-between w-full">
            <motion.div
              whileTap={{ scale: 0.9 }}
              className=" flex items-center justify-center"
              onClick={() => setIsOpenMobileNav(!isOpenMobileNav)}
            >
              <HiOutlineMenuAlt2 className={`text-${currentColor} text-4xl`} />
            </motion.div>
            <Link to={"/"}>
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="flex items-center gap-2 cursor-pointer"
              >
                <img
                  src={Images?.logo}
                  alt="Logo"
                  className="w-8 object-cover"
                />
                <p className={`text-${currentColor} text-xl font-bold`}>FoodPoint</p>
              </motion.div>
            </Link>
            {user ? (
              <div
                className={`flex items-center gap-3 px-3 py-1 rounded-lg relative`}
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="group flex items-center justify-center"
                >
                  <img
                    src={user?.imageURL ? user.imageURL : Images.user}
                    className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-2xl rounded-full cursor-pointer"
                    alt="user-profile"
                    onClick={() => setIsOpen(!isOpen)}
                  />
                  <p className="text-white cursor-pointer flex items-center justify-center gap-2">
                    <RiArrowDropDownLine />
                  </p>
                  {isOpen && (
                    <DropDown user={user} handleLogOut={()=>handleLogOut()} />
                  )}
                </motion.div>
              </div>
            ) : (
              <LoginAction mobile currentColor={currentColor}/>
            )}
          </div>
        )}
      </motion.div>
    </header>
  );
};

export default MainNav;
