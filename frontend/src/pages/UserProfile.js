import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import UserAddress from '../components/UserAddress'
import ChangePasswordPopup from '../components/ChangePasswordPopup'
import UpdateProfileDetails from '../components/UpdateProfileDetails'
import axios from 'axios'

const UserProfile = () => {


  // for popup state 
  const [updateProfile, setupdateProfile] = useState(false)
  const [changePassword, setChangePassword] = useState(false)
  const [openTab, setOpenTab] = useState(1);
  const [isLoading, setIsLoading] = useState(null);
  const [order, setOrder] = useState([])
  const user = useSelector(state => state.userData.user)

  console.log(user._id);
  useEffect(() => {
    (
      async () => {
        setIsLoading(true);
        const response = await axios(`http://localhost:4000/order/customer?userId=${user._id}`);
        console.log(response.data.response.order);
        setOrder(response.data.response.order)

        setIsLoading(false);
      }
    )();
  }, [])


  return (
    <>
      <div className='containerr rounded-md '>
        <h1 className='text-3xl font-semibold'>My Profile </h1>
        {/* profile image  */}
        <div>
          <div className='flex justify-center relative'>
            <img className='rounded-full w-40 h-40 sm:w-52 sm:h-52 object-cover' alt='user pic' src='https://images.unsplash.com/photo-1525134479668-1bee5c7c6845?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fA%3D%3D&w=1000&q=80' />
          </div>
          <div className='flex justify-center gap-44 relative -top-5'>
            <button className='inline-block bg-white hover:text-white hover:bg-green-600 font-bold  rounded  px-4  py-[6px] text-xs uppercase  text-green-600 transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:text-green-500'>Add New</button>
            <button className='inline-block bg-white hover:text-white hover:bg-red-600 font-bold  rounded  px-4  py-[6px] text-xs uppercase  text-red-600 transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:text-red-500'>Remove</button>
          </div>
          <div className='border-b-2 border-black/30'></div>
        </div>

        <div className='row '>
          <div className='w-full sm:w-1/5 p-5'>
            <ul className='space-y-3'>
              <li className='text-lg border-b-2 cursor-pointer' onClick={() => setOpenTab(1)}>Profile</li>
              {/* <li className='text-lg border-b-2 cursor-pointer' onClick={() => navigate("/orderDetails")}>Order Detail</li> */}
              <li className='text-lg border-b-2 cursor-pointer' onClick={() => setOpenTab(2)}>Order Detail</li>

            </ul>
          </div>

          {/* profile module  */}
          <div className={`${openTab === 1 ? "block" : "hidden"} w-full sm:w-4/5 p-5`}>
            <h1 className='text-xl font-semibold pb-5 capitalize'>your profile</h1>
            <div className='flex gap-7 '>
              <div>
                <ul className=''>
                  <li className='py-3 text-lg font-extralight'>Name</li>
                  <li className=' text-lg font-extralight'>Number</li>
                  <li className='py-3 text-lg font-extralight'>Email</li>
                </ul>
              </div>
              <div>
                <ul className='border-l-2 pl-5'>
                  <li className='py-3 text-lg font-normal capitalize'>{user.name}</li>
                  <li className=' text-lg font-normal'>{user.number}</li>
                  <li className='py-3 text-lg font-normal'>{user.email}</li>
                  <li className='py-3 text-lg font-normal'>
                    <button type="button" onClick={() => setChangePassword(true)} id="password" value="Change Password" className="inline-block mr-2 bg-white hover:text-white hover:bg-blue-400 -bottom-4 font-bold  rounded border border-current px-4 py-[6px] text-xs uppercase  text-blue-400 transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:text-blue-400" ><i className="fas fa-repeat"></i> Change Password</button>
                    <button onClick={() => setupdateProfile(true)} className="inline-block bg-white hover:text-white hover:bg-blue-600 -bottom-4 font-bold  rounded border border-current px-8 py-[6px] text-xs uppercase  text-blue-600 transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:text-blue-500">Update Profile </button>
                  </li>
                </ul>
              </div>
            </div>

            <h1 className='text-xl font-semibold pt-5 border-t-2 capitalize'>your Address</h1>

            <UserAddress />
          </div>
          {/* order module  */}
          <div className={`${openTab === 2 ? "block" : "hidden"} w-full sm:w-4/5 p-5`}>
            <h1 className='text-xl font-semibold pb-5 capitalize'>Order Detail</h1>
            <div className='w-3/4 h-full '>
              {
                order ? order.map(item =>
                 <Link to={`/orderDetails/${item._id}`} state={item} className='flex justify-around items-center  border-b-2 p-8 border-black hover:bg-slate-200 transition-all '>
                  <img src={item.resturant && item.resturant.image.length!=0 && item.resturant.image[0]} className=' h-28 w-28 rounded-full' />
                  <h1 className='font-bold text-xl'>{item.resturant ? item.resturant.name: ''}</h1>
                  <h1 className='text-zinc-600 font-bold tect-xl '>&gt;</h1>
                </Link>) : ''
              }
             

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
  )
}

export default UserProfile
