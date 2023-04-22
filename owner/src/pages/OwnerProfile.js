import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ChangePasswordPopup from "../components/ChangePasswordPopup";
import UpdateProfileDetails from "../components/UpdateProfileDetails";
import axios from "axios";
import { ownerLogIn, setCurrentColor, userData } from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import swal from "sweetalert";

const OwnerProfile = () => {
  const dispatch = useDispatch();

  // for popup state
  const [updateProfile, setupdateProfile] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const [openTab, setOpenTab] = useState(1);
  const [isLoading, setIsLoading] = useState(null);
  const [order, setOrder] = useState([]);
  const user = useSelector((state) => state.userData.user);
  console.log("===user", user);
  useEffect(() => {
    (async () => {
      if (user != null) {
        setIsLoading(true);
        const response = await axios(
          `http://localhost:4000/order/customer?userId=${user._id}`
        );
        console.log(response);
        setOrder(response.data.response.order);

        setIsLoading(false);
      }
    })();
    dispatch(setCurrentColor("slate-800"));
  }, []);
  const history = useNavigate();

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
        dispatch(ownerLogIn(false));
        dispatch(userData(null));
        history("/");
      }
    });
  };

  return (
    <>
      <div className="max-w-screen-xl mx-auto px-6 py-3 rounded-md pt-24">
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
          {/* <div className="flex justify-center gap-44 relative -top-5">
            <button className="inline-block bg-white hover:text-white hover:bg-green-600 font-bold  rounded  px-4  py-[6px] text-xs uppercase  text-green-600 transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:text-green-500">
              Add New
            </button>
            <button className="inline-block bg-white hover:text-white hover:bg-red-600 font-bold  rounded  px-4  py-[6px] text-xs uppercase  text-red-600 transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:text-red-500">
              Remove
            </button>
          </div> */}
          <div className="border-b-2 border-black/30 mt-5"></div>
        </div>

        <div className="flex flex-wrap">
          <div className="w-full sm:w-1/5 p-5">
            <ul className="space-y-3">
              <li
                className={`text-lg ${
                  openTab == 1
                    ? "border-slate-700 border-2"
                    : "bg-slate-200 border-slate-200 border-2"
                } font-mono font-semibold text-black pl-5 py-2 cursor-pointer  rounded-3xl hover:pl-8 duration-300`}
                onClick={() => setOpenTab(1)}
              >
                Profile
              </li>
              {user?.isApproved != "Not Request" && (
                <li
                  className={`text-lg ${
                    openTab == 2
                      ? "border-slate-700 border-2"
                      : "bg-slate-200 border-slate-200 border-2"
                  } font-mono font-semibold text-black pl-5 py-2 cursor-pointer  rounded-3xl hover:pl-8 duration-300`}
                  onClick={() => setOpenTab(2)}
                >
                  Your Restaurant{" "}
                </li>
              )}

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
                      {user?.ownerName != "" && user?.ownerName != null
                        ? user?.ownerName
                        : user?.name}
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
                </table>
              </div>
            </div>
            {user?.isApproved != "Not Request" && (
              <div className="flex flex-wrap justify-between mt-5">
                <div className="md:w-[48%] mb-2 shadow-md rounded-tl-3xl rounded-br-3xl bg-slate-700 bg-opacity-40 ">
                  <h1 className="text-2xl font-normal text-white capitalize border-b-4 border-yellow-300 p-5">
                    Bank details
                  </h1>
                  <div className="bg-slate-200 pl-5 rounded-br-3xl">
                    <table className="table-auto border-spacing-y-3 border-separate">
                      <tr className="">
                        <td className="text-slate-700 text-lg text-semibold pr-5 w-1/6">
                          Account No.
                        </td>
                        <td className="text-slate-500 font-semibold capitalize bg-slate-50 w-full md:w-5/6 bg-opacity-20 p-2 rounded">
                          {user != null && user?.bankDetails?.ACnumber}
                        </td>
                      </tr>
                      <tr>
                        <td className="text-slate-700 text-lg text-semibold pr-5 ">
                          IFSC Code
                        </td>
                        <td className="text-slate-500 font-semibold capitalize bg-slate-50  w-full md:w-5/6 bg-opacity-20 p-2 rounded ">
                          {user != null && user?.bankDetails?.IFSC}
                        </td>
                      </tr>
                      <tr>
                        <td className="text-slate-700 text-lg text-semibold pr-5">
                          Account type
                        </td>
                        <td className="text-slate-500 font-semibold bg-slate-50  w-full md:w-5/6 bg-opacity-20 p-2 rounded ">
                          {user != null && user?.bankDetails?.actype}
                        </td>
                      </tr>
                    </table>
                  </div>
                </div>
                <div className="md:w-[48%] mb-2 shadow-md rounded-tl-3xl rounded-br-3xl bg-slate-700 bg-opacity-40 ">
                  <h1 className="text-2xl font-normal text-white capitalize border-b-4 border-yellow-300 p-5">
                    PAN Card details
                  </h1>
                  <div className="bg-slate-200 pl-5 rounded-br-3xl">
                    <table className="table-auto border-spacing-y-3 border-separate">
                      <tr className="">
                        <td className="text-slate-700 text-lg text-semibold pr-5 w-1/6">
                          Holder Name
                        </td>
                        <td className="text-slate-500 font-semibold capitalize bg-slate-50 w-full md:w-5/6 bg-opacity-20 p-2 rounded">
                          {user != null && user?.panCard?.holderName}
                        </td>
                      </tr>
                      <tr>
                        <td className="text-slate-700 text-lg text-semibold pr-5 ">
                          PAN No.
                        </td>
                        <td className="text-slate-500 font-semibold capitalize bg-slate-50  w-full md:w-5/6 bg-opacity-20 p-2 rounded ">
                          {user != null && user?.panCard?.number}
                        </td>
                      </tr>
                      <tr>
                        <td className="text-slate-700 text-lg text-semibold pr-5 ">
                          PAN Status
                        </td>
                        <td className="text-slate-500 font-semibold capitalize bg-slate-50  w-full md:w-5/6 bg-opacity-20 p-2 rounded ">
                          Verified
                        </td>
                      </tr>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* your restaurant  */}

          <div
            className={`${
              openTab === 2 ? "block" : "hidden"
            } w-full sm:w-4/5 p-5`}
          >
            <div className="mb-2 shadow-md rounded-tl-3xl rounded-br-3xl bg-slate-700 bg-opacity-40 ">
              <h1 className="text-2xl font-normal text-white capitalize border-b-4 border-yellow-300 p-5">
                Your Restaurant
              </h1>
              <div className="bg-slate-200 pl-5 rounded-br-3xl">
                <table className="table-auto border-spacing-y-3 border-separate">
                  <tr className="">
                    <td className="text-slate-700 text-lg text-semibold pr-5 w-1/6">
                      Restaurant Name
                    </td>
                    <td className="text-slate-500 font-semibold capitalize bg-slate-50 w-full md:w-5/6 bg-opacity-20 p-2 rounded">
                      {user != null ? user?.name : ""}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-slate-700 text-lg text-semibold pr-5 ">
                      Email
                    </td>
                    <td className="text-slate-500 font-semibold capitalize bg-slate-50  w-full md:w-5/6 bg-opacity-20 p-2 rounded ">
                      {user != null ? user?.email : ""}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-slate-700 text-lg text-semibold pr-5">
                      Address
                    </td>
                    <td className="text-slate-500 font-semibold bg-slate-50  w-full md:w-5/6 bg-opacity-20 p-2 rounded ">
                      {`${user != null && user.address?.street} ${
                        user != null && user.address?.area
                      } ${user != null && user.address?.city} ${
                        user != null && user.address?.state
                      }-${user != null && user.address?.pincode}`}
                    </td>
                  </tr>
                </table>
              </div>
            </div>
            <div className="mb-2 shadow-md rounded-tl-3xl rounded-br-3xl bg-slate-700 bg-opacity-40 ">
              <h1 className="text-2xl font-normal text-white capitalize border-b-4 border-yellow-300 p-5">
                Other Details
              </h1>
              <div className="bg-slate-200 pl-5 rounded-br-3xl">
                <table className="table-auto border-spacing-y-3 border-separate">
                  <tr className="">
                    <td className="text-slate-700 text-lg text-semibold pr-5 w-1/6">
                      Rating
                    </td>
                    <td className="text-slate-500 font-semibold capitalize bg-slate-50 w-full md:w-5/6 bg-opacity-20 p-2 rounded">
                      {user?.rating != "" ? user?.rating + " ⭐" : "-"}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-slate-700 text-lg text-semibold pr-5 ">
                      Review
                    </td>
                    <td className="text-slate-500 font-semibold capitalize bg-slate-50  w-full md:w-5/6 bg-opacity-20 p-2 rounded ">
                      {user?.review?.length > 0 ? user?.review?.length : "0"}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-slate-700 text-lg text-semibold pr-5">
                      Total Received order
                    </td>
                    <td className="text-slate-500 font-semibold bg-slate-50  w-full md:w-5/6 bg-opacity-20 p-2 rounded ">
                      {user != null ? user?.order?.length : "-"}
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

export default OwnerProfile;
