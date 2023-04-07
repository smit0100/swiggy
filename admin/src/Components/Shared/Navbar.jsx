import React, { useEffect, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { FiShoppingCart } from "react-icons/fi";
import { RiNotification3Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useStateContext } from "../../contexts/ContextProvider";
import { setActiveMenu } from "../../redux/shop/shopslice";
import { Images } from "../../Assets";
import DropDown from "../DropDown";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
  <button
    type="button"
    onClick={() => customFunc()}
    style={{ color }}
    className="relative text-xl rounded-full p-3 hover:bg-light-gray"
  >
    <span
      style={{ background: dotColor }}
      className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
    />
    {icon}
  </button>
);

const Navbar = ({ setChangePassword }) => {
  const { currentColor, handleClick, setIsLogIn, setScreenSize, screenSize } =
    useStateContext();
  const activeMenu = useSelector((state) => state.setActiveMenu.activeMenu);
  const dispatch = useDispatch();
  const history = useNavigate();
  const [data, setData] = useState({});
  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 900) {
      dispatch(setActiveMenu(false));
    } else {
      dispatch(setActiveMenu(true));
    }
  }, [screenSize]);
  useEffect(() => {
    getAdmin();
  }, []);

  const getAdmin = () => {
    const temp = localStorage.getItem("Admin");
    setData(JSON.parse(temp));
  };

  const handleActiveMenu = () => dispatch(setActiveMenu(!activeMenu));
  const handleLogOut = () => {
    swal({
      title: "Are you Sure !",
      icon: "warning",
      buttons: ["NO", "YES"],
      cancelButtonColor: "#DD6B55",
      confirmButtonColor: "#DD6B55",
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        localStorage.clear();
        history("/");
        setIsLogIn(false)
      }
    });
  };
  return (
    <div className="flex justify-between p-2 md:ml-6 md:mr-6 relative">
      <NavButton
        title="Menu"
        customFunc={handleActiveMenu}
        color={currentColor}
        icon={<AiOutlineMenu />}
      />
      <div className="flex">
        {/* <NavButton
          title="Cart"
          customFunc={() => handleClick("cart")}
          color={currentColor}
          icon={<FiShoppingCart />}
        />
        <NavButton
          title="Notification"
          dotColor="rgb(254, 201, 15)"
          customFunc={() => handleClick("notification")}
          color={currentColor}
          icon={<RiNotification3Line />}
        /> */}
        <div
          className="group flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg"
          onClick={() => handleClick("userProfile")}
        >
          <img
            className="rounded-full w-8 h-8"
            src={Images.user}
            alt="user-profile"
          />
          <p>
            <span className="text-gray-400 text-14">Hi,</span>{" "}
            <span className="text-gray-400 font-bold ml-1 text-14">
              {data?.name}
            </span>
            <DropDown
              user={data}
              setChangePassword={setChangePassword}
              handleLogOut={() => handleLogOut()}
            />
          </p>
          <MdKeyboardArrowDown className="text-gray-400 text-14" />
        </div>
        {/* {isClicked.cart && (<Cart />)}
        {isClicked.notification && (<Notification />)}
        {isClicked.userProfile && (<UserProfile />)} */}
      </div>
    </div>
  );
};

export default Navbar;
