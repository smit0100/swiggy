import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import UserAddress from "../components/UserAddress";
import ChangePasswordPopup from "../components/ChangePasswordPopup";
import UpdateProfileDetails from "../components/UpdateProfileDetails";
import axios from "axios";
import { userData, userLogIn } from "../redux/user/userSlice";
import swal from "sweetalert";
import { useCookies } from "react-cookie";

import OrderDetailsCard from "../components/OrderDetailsCard";

const UserProfile = () => {
  // for popup state
  const [updateProfile, setupdateProfile] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const [openTab, setOpenTab] = useState(1);
  const [isLoading, setIsLoading] = useState(null);
  const [order, setOrder] = useState([]);
  const user = useSelector((state) => state.userData.user);
  const [, , removeCookie] = useCookies(["connect.sid"]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        if (user != null) {
          setIsLoading(true);
          const response = await axios(
            `${process.env.REACT_APP_BASEURL}/order/customer?userId=${user._id}`
          );
          setOrder(response.data.response.order);
          setIsLoading(false);
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  const logout = () => {
    swal({
      title: "Are you Sure! you want to logout?",
      icon: "warning",
      buttons: ["NO", "YES"],
      cancelButtonColor: "#DD6B55",
      confirmButtonColor: "#DD6B55",
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        dispatch(userData(null));
        localStorage.clear();
        removeCookie("connect.sid")
        dispatch(userLogIn(false));
        swal("Successfully logout", {
          icon: "success",
        });
        navigate("/");
      }
    });
  };

  return (
    <>
      <div className="containerr rounded-md pt-24">
        <h1 className="text-3xl font-semibold">My Profile </h1>
        {/* profile image  */}
        <div>
          <div className="flex justify-center relative mb-5">
            <img
              className="rounded-full w-40 h-40 sm:w-52 sm:h-52 object-cover"
              alt="user pic"
              src="https://i.ibb.co/NxZH2Zg/avatar.png"
            />
          </div>

          <div className="border-b-2 border-black/30"></div>
        </div>

        <div className="row ">
          <div className="w-full sm:w-1/5 p-5">
            <ul className="space-y-3">
              <li
                className={`text-lg ${
                  openTab == 1
                    ? "border-orange-700 border-2"
                    : "bg-orange-200 border-orange-200 border-2"
                } font-mono font-semibold text-orange-700 pl-5 py-2 cursor-pointer  rounded-3xl hover:pl-8 duration-300`}
                onClick={() => setOpenTab(1)}
              >
                {" "}
                Profile{" "}
              </li>
              <li
                className={`text-lg ${
                  openTab == 2
                    ? "border-orange-700 border-2"
                    : "bg-orange-200 border-orange-200 border-2"
                } font-mono font-semibold text-orange-700 pl-5 py-2 cursor-pointer  rounded-3xl hover:pl-8 duration-300`}
                onClick={() => setOpenTab(2)}
              >
                {" "}
                Your Orders{" "}
              </li>
              <li className="bg-orange-800 h-1 w-full rounded-full"></li>
              <li
                className={`text-base ${"bg-orange-100 border-orange-200 border-2"} font-mono font-semibold text-orange-700 pl-5 py-2 cursor-pointer  rounded-3xl hover:pl-8 duration-300 hover:border-black hover:text-white hover:bg-black`}
                onClick={() => setupdateProfile(true)}
              >
                <i className="fas fa-repeat"></i> Update Profile
              </li>
              {  user!=null && user.googleId==null &&
                <li
                  className={`text-base ${"bg-orange-100 border-orange-200 border-2"} font-mono font-semibold text-orange-700 pl-5 py-2 cursor-pointer  rounded-3xl hover:pl-8 duration-300 hover:border-black hover:text-white hover:bg-black`}
                  onClick={() => setChangePassword(true)}
                >
                  Change Password
                </li>
              }

              <li
                className={`text-base ${"bg-orange-100 border-orange-200 border-2"} font-mono font-semibold text-orange-700 pl-5 py-2 cursor-pointer  rounded-3xl hover:pl-8 duration-300 hover:border-black hover:text-white hover:bg-black`}
                onClick={logout}
              >
                LogOut
              </li>
            </ul>
          </div>

          {/* profile module  */}
          <div
            className={`${
              openTab === 1 ? "block" : "hidden"
            } w-full sm:w-4/5 p-5`}
          >
            <div className="mb-2 shadow-md rounded-tl-3xl rounded-br-3xl bg-orange-700 bg-opacity-40 ">
              <h1 className="text-2xl font-normal text-white capitalize border-b-4 border-yellow-300 p-5">
                Your profile
              </h1>
              <div className="bg-orange-200 pl-5 rounded-br-3xl">
                <table className="table-auto border-spacing-y-3 border-separate">
                  <tr className="">
                    <td className="text-white text-lg text-semibold pr-5 w-1/6">
                      Name
                    </td>
                    <td className="text-slate-500 font-semibold capitalize  bg-orange-50 w-full md:w-5/6 bg-opacity-20 p-2 rounded">
                      {user != null ? user?.name : ""}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-white text-lg text-semibold pr-5 ">
                      Mobile No.
                    </td>
                    <td className="text-slate-500 font-semibold capitalize bg-orange-50  w-full md:w-5/6 bg-opacity-20 p-2 rounded ">
                      {user != null ? user?.number : ""}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-white text-lg text-semibold pr-5">
                      E-mail
                    </td>
                    <td className="text-slate-500 font-semibold bg-orange-50  w-full md:w-5/6 bg-opacity-20 p-2 rounded ">
                      {user != null ? user?.email : ""}
                    </td>
                  </tr>
                </table>
              </div>
            </div>
            <div className="mb-2 shadow-md rounded-bl-3xl rounded-tr-3xl bg-orange-700 bg-opacity-40 ">
              <h1 className="text-2xl font-normal text-white capitalize border-b-4 border-yellow-300 p-5">
                Your Address
              </h1>
              <div className="bg-orange-200 pl-5 py-5 rounded-bl-3xl">
                <UserAddress />
              </div>
            </div>
          </div>
          {/* order module  */}
          <div
            className={`${
              openTab === 2 ? "block" : "hidden"
            } w-full sm:w-4/5 p-5`}
          >
            <h1 className="text-xl font-semibold pb-5 capitalize">
              Order Detail
            </h1>
            <div className="w-full flex flex-wrap  gap-2 justify-evenly ">
              {order
                ? order.map((item) => {
                    return <OrderDetailsCard items={item} />;
                  })
                : ""}
            </div>
          </div>
        </div>

        {/* update profile component */}
        {updateProfile ? (
          <UpdateProfileDetails setupdateProfile={setupdateProfile} />
        ) : null}

        {/* change password component  */}
        {changePassword ? (
          <ChangePasswordPopup setChangePassword={setChangePassword} />
        ) : null}
      </div>
    </>
  );
};

export default UserProfile;
