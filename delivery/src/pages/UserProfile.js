import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChangePasswordPopup from "../components/ChangePasswordPopup";
import UpdateProfileDetails from "../components/UpdateProfileDetails";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {
  corierLogIn,
  setCurrentColor,
  userData,
} from "../redux/user/userSlice";
import { toast } from "react-toastify";
import swal from "sweetalert";

const UserProfile = () => {
  // for popup state
  const [updateProfile, setupdateProfile] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const [openTab, setOpenTab] = useState(1);
  const [isLoading, setIsLoading] = useState(null);
  const [order, setOrder] = useState([]);
  const user = useSelector((state) => state.userData.user);
  const history = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setCurrentColor("black"));
  }, []);
  console.log("====user",user);
  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const response = await axios(
        `${process.env.REACT_APP_BASEURL}/order/customer?userId=${user._id}`
      );
      console.log(response);
      setOrder(response.data.response.order);

      setIsLoading(false);
    })();
  }, []);

  const handelAvilable = async (status) => {
    try {
      if (user != null) {
        if (status) {
          const res = await axios.put(
            `http://localhost:4000/courier/makeavilable/?id=${user._id}`
          );
          console.log(res);
          dispatch(userData(res.data.response));
          localStorage.setItem("deliveryData", JSON.stringify(res?.data?.response));
          toast.success("Status updated successfully🔥")
        } else {
          const res = await axios.put(
            `http://localhost:4000/courier/changestatus/?id=${user._id}`
          );
          console.log(res);
          dispatch(userData(res.data.response));
          localStorage.setItem("deliveryData", JSON.stringify(res?.data?.response));
          toast.success("Status updated successfully🔥")
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogOut = () => {
    swal({
      title: "Are you Sure! you want to logout?",
      icon: "warning",
      buttons: ["NO", "YES"],
      cancelButtonColor: "#DD6B55",
      confirmButtonColor: "#DD6B55",
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        localStorage.clear();
        dispatch(corierLogIn(false));
        dispatch(userData(null));
        history("/");
      }
    });
  };
  return (
    <>
      <div className="max-w-screen-xl mx-auto pt-24 px-6 py-3 rounded-md ">
        <h1 className="text-3xl font-semibold">My Profile </h1>
        {/* profile image  */}
        <div>
          <div className="flex justify-center relative">
            <img
              className="rounded-full w-40 h-40 sm:w-52 sm:h-52 object-cover"
              alt="user pic"
              src="https://i.ibb.co/NxZH2Zg/avatar.png"
            />
          </div>

          <div className="border-b-2 border-black/30 my-2"></div>
        </div>

        <div className="flex flex-wrap ">
          {/* sidebar */}
          <div className="w-full sm:w-1/5 p-5">
            <ul className="space-y-3">
              <li
                className={`text-lg border-black border-2 font-mono font-semibold text-black pl-5 py-2 rounded-3xl hover:pl-8 duration-300`}
                // onClick={() => setOpenTab(1)}
              >
                Profile
              </li>
              <li className="bg-black h-1 w-full rounded-full"></li>
              <li
                className={`text-base ${"bg-slate-100 border-slate-200 border-2"} font-mono font-semibold text-black pl-5 py-2 cursor-pointer  rounded-3xl hover:pl-8 duration-300 hover:border-black hover:text-white hover:bg-black`}
                onClick={() => setupdateProfile(true)}
              >
                <i className="fas fa-repeat"></i> Update Profile
              </li>
              <li
                className={`text-base ${"bg-slate-100 border-slate-200 border-2"} font-mono font-semibold text-black pl-5 py-2 cursor-pointer  rounded-3xl hover:pl-8 duration-300 hover:border-black hover:text-white hover:bg-black`}
                onClick={() => setChangePassword(true)}
              >
                Change Password
              </li>
              {user != null && user.isAvilable == true && (
                <li
                  className={`text-base ${"bg-slate-100 border-slate-200 border-2"} font-mono font-semibold text-black pl-5 py-2 cursor-pointer  rounded-3xl hover:pl-8 duration-300 hover:border-black hover:text-white hover:bg-black`}
                  onClick={() => handelAvilable(false)}
                >
                  I am not Available
                </li>
              )}
              {user != null && user.isAvilable == false && (
                <li
                  className={`text-base ${"bg-slate-100 border-slate-200 border-2"} font-mono font-semibold text-black pl-5 py-2 cursor-pointer  rounded-3xl hover:pl-8 duration-300 hover:border-black hover:text-white hover:bg-black`}
                  onClick={() => handelAvilable(true)}
                >
                  I am Available
                </li>
              )}
              <li
                className={`text-base ${"bg-slate-100 border-slate-200 border-2"} font-mono font-semibold text-black pl-5 py-2 cursor-pointer  rounded-3xl hover:pl-8 duration-300 hover:border-black hover:text-white hover:bg-black`}
                onClick={handleLogOut}
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
            <div className="mb-2 shadow-md rounded-tl-3xl rounded-br-3xl bg-slate-700 bg-opacity-40 ">
              <h1 className="text-2xl font-normal text-white capitalize border-b-4 border-yellow-300 p-5">
                Your profile
              </h1>
              <div className="bg-slate-200 pl-5 rounded-br-3xl">
                <table className="table-auto border-spacing-y-3 border-separate">
                  <tr className="">
                    <td className="text-slate-700 text-lg text-semibold pr-5 w-1/6">
                      Name
                    </td>
                    <td className="text-slate-500 font-semibold capitalize bg-slate-50 w-full md:w-5/6 bg-opacity-20 p-2 rounded">
                      {user != null ? user?.name : ""}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-slate-700 text-lg text-semibold pr-5 ">
                      Mobile No.
                    </td>
                    <td className="text-slate-500 font-semibold capitalize bg-slate-50  w-full md:w-5/6 bg-opacity-20 p-2 rounded ">
                      {user != null ? user?.number : ""}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-slate-700 text-lg text-semibold pr-5">
                      E-mail
                    </td>
                    <td className="text-slate-500 font-semibold bg-slate-50  w-full md:w-5/6 bg-opacity-20 p-2 rounded ">
                      {user != null ? user?.email : ""}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-slate-700 text-lg text-semibold pr-5">
                      Review
                    </td>
                    <td className="text-slate-500 font-semibold bg-slate-50  w-full md:w-5/6 bg-opacity-20 p-2 rounded ">
                      {user?.review?.length > 0 ? user?.review?.length : "0"}
                    </td>
                  </tr>
                </table>
              </div>
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
