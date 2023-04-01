import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChangePasswordPopup from "../components/ChangePasswordPopup";
import UpdateProfileDetails from "../components/UpdateProfileDetails";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { corierLogIn, setCurrentColor, userData } from "../redux/user/userSlice";
import { toast } from "react-toastify";

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
    dispatch(setCurrentColor("black"))
  }, [])
  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const response = await axios(
        `${process.env.REACT_APP_BASEURL}/order/customer?userId=${user._id}`
      );
      console.log(response.data.response.order);
      setOrder(response.data.response.order);

      setIsLoading(false);
    })();
  }, []);

  const handleLogOut = () => {
    localStorage.clear();
    dispatch(corierLogIn(false));
    dispatch(userData(null));
    history("/");
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
          <div className="flex justify-center gap-44 relative -top-5">
            <button className="inline-block bg-white hover:text-white hover:bg-green-600 font-bold  rounded  px-4  py-[6px] text-xs uppercase  text-green-600 transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:text-green-500"
            // onClick={()=>toast.success("done")}
            >
              Add New
            </button>
            <button className="inline-block bg-white hover:text-white hover:bg-red-600 font-bold  rounded  px-4  py-[6px] text-xs uppercase  text-red-600 transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:text-red-500">
              Remove
            </button>
          </div>
          <div className="border-b-2 border-black/30"></div>
        </div>

        <div className="flex flex-wrap ">
          {/* sidebar */}
          <div className="w-full sm:w-1/5 p-5">
            <ul className="space-y-3">
              <li
                className="text-lg border-b-2 cursor-pointer"
                onClick={() => setOpenTab(1)}
              >
                Profile
              </li>
              {/* <li className='text-lg border-b-2 cursor-pointer' onClick={() => navigate("/orderDetails")}>Order Detail</li> */}
              <li
                className="text-lg border-b-2 cursor-pointer"
                onClick={() => setOpenTab(2)}
              >
                Delivered Orders
              </li>
            </ul>
          </div>

          {/* profile module  */}
          <div
            className={`${
              openTab === 1 ? "block" : "hidden"
            } w-full sm:w-4/5 p-5`}
          >
            <h1 className="text-xl font-semibold pb-5 capitalize">
              your profile
            </h1>
            <div className="flex gap-7 ">
              <div>
                <ul className="">
                  <li className="py-3 text-lg font-extralight">Name</li>
                  <li className=" text-lg font-extralight">Number</li>
                  <li className="py-3 text-lg font-extralight">Email</li>
                </ul>
              </div>
              <div>
                <ul className="border-l-2 pl-5">
                  <li className="py-3 text-lg font-normal capitalize">
                    {user.name}
                  </li>
                  <li className=" text-lg font-normal">{user.number}</li>
                  <li className="py-3 text-lg font-normal">{user.email}</li>
                  <li className="py-3 text-lg font-normal">
                    <button
                      type="button"
                      onClick={() => setChangePassword(true)}
                      id="password"
                      value="Change Password"
                      className="inline-block mr-2 bg-white hover:text-white hover:bg-blue-400 -bottom-4 font-bold  rounded border border-current px-4 py-[6px] text-xs uppercase  text-blue-400 transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:text-blue-400"
                    >
                      <i className="fas fa-repeat"></i> Change Password
                    </button>
                    <button
                      onClick={() => setupdateProfile(true)}
                      className="inline-block bg-white hover:text-white hover:bg-blue-600 -bottom-4 font-bold  rounded border border-current px-8 py-[6px] text-xs uppercase  text-blue-600 transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:text-blue-500"
                    >
                      Update Profile{" "}
                    </button>
                  </li>
                </ul>
              </div>
            </div>

            {/* <h1 className="text-xl font-semibold pt-5 border-t-2 capitalize">
              your Address
            </h1> */}
            <Link
              to="/"
              className={`my-5 px-2 py-2 flex justify-center items-center font-semibold text-xl text-white rounded-md self-center shadow-lg hover:pr-10 duration-500 bg-blue-400 w-36`}
              onClick={handleLogOut}
            >
              Log out
            </Link>
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
            {/* <div className='w-3/4 h-full '>
              {
                order ? order.map(item => <OrderDetailsCard items={item}/>) : ''
              }
            </div> */}
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
