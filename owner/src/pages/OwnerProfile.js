import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ChangePasswordPopup from "../components/ChangePasswordPopup";
import UpdateProfileDetails from "../components/UpdateProfileDetails";
import axios from "axios";
import { ownerLogIn, userData } from "../redux/user/userSlice";
import { useDispatch } from "react-redux";

const OwnerProfile = () => {
  const dispatch = useDispatch();

  // for popup state
  const [updateProfile, setupdateProfile] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const [openTab, setOpenTab] = useState(1);
  const [isLoading, setIsLoading] = useState(null);
  const [order, setOrder] = useState([]);
  const user = useSelector((state) => state.userData.user);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const response = await axios(
        `http://localhost:4000/order/customer?userId=${user._id}`
      );
      // console.log(response.data.response.order);
      setOrder(response.data.response.order);

      setIsLoading(false);
    })();
  }, []);
  const history = useNavigate();

  const handleLogOut = () => {
    localStorage.clear();
    dispatch(ownerLogIn(false));
    dispatch(userData(null));
    history("/");
  };

  return (
    <>
      <div className="max-w-screen-xl mx-auto px-6 py-3 rounded-md ">
        <h1 className="text-3xl font-semibold">My Profile </h1>
        {/* profile image  */}
        <div>
          <div className="flex justify-center relative">
            <img
              className="rounded-full w-40 h-40 sm:w-52 sm:h-52 object-cover"
              alt="user pic"
              src="https://images.unsplash.com/photo-1525134479668-1bee5c7c6845?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fA%3D%3D&w=1000&q=80"
            />
          </div>
          <div className="flex justify-center gap-44 relative -top-5">
            <button className="inline-block bg-white hover:text-white hover:bg-green-600 font-bold  rounded  px-4  py-[6px] text-xs uppercase  text-green-600 transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:text-green-500">
              Add New
            </button>
            <button className="inline-block bg-white hover:text-white hover:bg-red-600 font-bold  rounded  px-4  py-[6px] text-xs uppercase  text-red-600 transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:text-red-500">
              Remove
            </button>
          </div>
          <div className="border-b-2 border-black/30"></div>
        </div>

        <div className="flex flex-wrap">
          <div className="w-full sm:w-1/5 p-5">
            <ul className="space-y-3">
              <li
                className="text-lg border-b-2 cursor-pointer"
                onClick={() => setOpenTab(1)}
              >
                Profile
              </li>
              <li
                className="text-lg border-b-2 cursor-pointer"
                onClick={() => setOpenTab(2)}
              >
                Your Restaurant{" "}
              </li>
            </ul>
          </div>

          {/* profile module  */}
          <div
            className={`${openTab === 1 ? "block" : "hidden"
              } w-full sm:w-4/5 p-5`}
          >
            <div>
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
                      {user != null && user.ownerName}
                    </li>
                    <li className=" text-lg font-normal">{user != null && user.number}</li>
                    <li className="py-3 text-lg font-normal">{user != null && user.email}</li>
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
            </div>
            <div className="flex flex-wrap">
              <div className="flex w-full sm:w-1/2 flex-col">
                <h1 className="text-lg font-semibold py-5">Bank details</h1>
                <div className="flex">
                  <ul className="pr-2">
                    <li className="py-3 text-lg font-extralight">
                      Account No.
                    </li>
                    <li className=" text-lg font-extralight">IFSC Code</li>
                    <li className="py-3 text-lg font-extralight">
                      Account type
                    </li>
                  </ul>
                  <ul className="border-l-2 pl-5">
                    <li className="py-3 text-lg font-normal capitalize">
                      {user != null && user.bankDetails.ACnumber}
                    </li>
                    <li className=" text-lg font-normal">
                      {user != null && user.bankDetails.IFSC}
                    </li>
                    <li className="py-3 text-lg font-normal">
                      {user != null && user.bankDetails.actype}
                    </li>
                  </ul>
                </div>
              </div>
              <div className="flex w-full sm:w-1/2 flex-col">
                <h1 className="text-lg font-semibold py-5">PAN Card details</h1>
                <div className="flex">
                  <ul className="pr-2">
                    <li className="py-3 text-lg font-extralight">Name</li>
                    <li className="py-3 text-lg font-extralight">PAN No.</li>
                  </ul>
                  <ul className="border-l-2 pl-5">
                    <li className="py-3 text-lg font-normal capitalize">
                      {user != null && user.panCard.holderName}
                    </li>
                    <li className="py-3 text-lg font-normal">
                      {user != null && user.panCard.number}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <Link
              to="/"
              className={`px-2 flex py-2 flex-1 justify-center items-center font-semibold text-xl text-white rounded-md shadow-lg hover:pr-10 duration-500 bg-blue-400 w-36`}
              onClick={handleLogOut}
            >
              Log out
            </Link>
          </div>

          {/* your restaurant  */}
          <div
            className={`${openTab === 2 ? "block" : "hidden"
              } w-full sm:w-4/5 p-5`}
          >
            <h1 className="text-xl font-semibold pb-5 capitalize">
              Your Restaurant
            </h1>
            <div className="w-3/4 h-full ">
              <div className="flex gap-7 ">
                <div>
                  <ul className="">
                    <li className="py-3 text-lg font-extralight">
                      Restaurant Name
                    </li>
                    <li className=" text-lg font-extralight">Email</li>
                    <li className="py-3 text-lg font-extralight">Address</li>
                  </ul>
                </div>
                <div>
                  <ul className="border-l-2 pl-5">
                    <li className="py-3 text-lg font-normal capitalize">
                      {user!=null &&user.name}
                    </li>
                    <li className=" text-lg font-normal">{user!=null &&user.email}</li>
                    <li className="py-3 text-lg font-normal">{`${user!=null &&user.address.street} ${user!=null &&user.address.area} ${user!=null &&user.address.city} ${user!=null &&user.address.state}-${user!=null &&user.address.pincode}`}</li>
                  </ul>
                </div>
              </div>

              <h1 className="py-5 text-xl text-semibold">Other Details</h1>
              <div className="flex gap-7 ">
                <div>
                  <ul className="">
                    <li className="py-2 text-lg font-extralight">
                      Restaurant Type
                    </li>
                    <li className="py-2 text-lg font-extralight">
                      Total Listed products
                    </li>
                    <li className="py-2 text-lg font-extralight">
                      Total Received order
                    </li>
                  </ul>
                </div>
                <div>
                  <ul className="border-l-2 pl-5">
                    <li className="py-2 text-lg font-normal capitalize">
                      {user!=null && user.outLetType}
                    </li>
                    <li className="py-2 text-lg font-normal capitalize">
                      {user!=null && user.product.length}
                    </li>
                    <li className="py-2 text-lg font-normal capitalize">
                      {user!=null && user.order.length}
                    </li>
                  </ul>
                </div>
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
