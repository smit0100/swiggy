import React, { useState } from 'react'
import axios from 'axios'
import { userData } from "../redux/user/userSlice"
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'


const UserProfile = () => {
  
  const dispatch = useDispatch()

  // for popup state 
  const [updateProfile, setupdateProfile] = useState(false)
  const [changePassword, setChangePassword] = useState(false)
  const [showModal, setShowModal] = useState(false);
  const [openTab, setOpenTab] = useState(1);
  const [otpTab, setotpTab] = useState(true)
  const [cnpass,setCnpass] = useState('')
  // const [profileModule, setProfileModule] = useState(true)
  // const [orderModule, setOrderModule] = useState(false)

  const [name, setName] = useState('')
  const [number, setNumber] = useState('')
  const [email, setEmail] = useState('')
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [address, setaddress] = useState('')
  const [city, setCity] = useState("")
  const [state, setState] = useState("")
  const [pincode, setPincode] = useState('')
  const [newAddress, setNewAddress] = useState({})
  const [otp,setOtp] = useState('')
  
  const user = useSelector(state => state.userData.user)


  useEffect(() => {
    setName(user.name);
    setEmail(user.email);
    setNumber(user.number)
  },[]) 

  const changeProfileDetails =async  (e) => {
    e.preventDefault()
    console.log(email,number,name);
    const response = await axios.post("http://localhost:4000/user/update", {
      userId: user._id,
      email,
      number,
      name
    })

    console.log(response);
    // dispatch(userData(response.data.response))


    console.log("ha ha ha ha ");
    if (response.status === 201) {
      setotpTab(true);
      setNewAddress(response.data.newDetails)
      
    } else {
      // add redux 
      dispatch(userData(response.data.user))

    }
  }

  const otpSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post('http://localhost:4000/user/verify', {
      id: user._id,
      otp,
      newAddress
    })
    dispatch(userData(response.data.user))

    console.log(response);
  }

  const handleChangePassword = async (e) => {
    e.preventDefault();
    console.log(oldPassword,newPassword);
    const response = await axios.post('http://localhost:4000/user/changePass', {
      userId:user._id,
      oldPass:oldPassword,
      newPass:newPassword
    })
     

    console.log(response);
  }

  const handleSubmitForAddress = async (e) => {
    e.preventDefault();
    const response = await axios.post("http://localhost:4000/user/addAddress", {
      "userId": user._id,
      "area": address,
      "city": city,
      "state": state,
      "pincode": pincode
    })
    console.log(response.data.response);
    dispatch(userData(response.data.response))
  }

  const addressDelete = async (id) => {
    const response = await axios.get(`http://localhost:4000/user/delteAddress?userId=${user._id}&itemId=${id}`)

    dispatch(userData(response.data.response))
  }
  return (
    <>
      <div className='containerr rounded-md '>
        <h1 className='text-3xl font-semibold'>My Profile </h1>
        {/* profile image  */}
        <div>
          <div className='flex justify-center'>
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
                    <button onClick={() => setupdateProfile(true)} className="inline-block bg-white hover:text-white hover:bg-blue-600 -bottom-4 font-bold  rounded border border-current px-8 py-[6px] text-xs uppercase  text-blue-600 transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:text-blue-500">Update Profile </button>
                  </li>
                </ul>
              </div>
            </div>

            <h1 className='text-xl font-semibold pt-5 border-t-2 capitalize'>your Address</h1>
            {/* all address list  */}
            <div className='flex flex-wrap'>

              {user !== null && user.address && user.address.length !== 0 ?
                user.address.map((address, i) =>
                  <div className=" w-full sm:w-[400px] flex ">
                    <div className="shadow-black hover:shadow-xl anim bg-white p-3">
                      <div>
                        <img src="./svg/github.svg" alt="temp" className="w-10 h-10" />
                      </div><div className="py-2">
                        <p className="font-semibold text-xl">Address {i + 1}</p>
                        <p className="w-10/12 font-[350] text-slate-500">{address.area + " " + address.city + " " + address.state + "-" + address.pincode}</p>
                        <p className="font-semibold text-sm uppercase py-5 ">16 mins</p>
                        <button className="inline-block bg-white hover:text-white hover:bg-green-600 -bottom-4 font-bold  rounded border border-current px-8 py-[6px] text-xs uppercase  text-green-600 transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:text-green-500">
                          deliver here
                        </button>
                        <button className="ml-4 inline-block bg-white hover:text-white hover:bg-red-600 -bottom-4 font-bold  rounded border border-current px-8 py-[6px] text-xs uppercase  text-red-600 transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:text-red-500" onClick={() => { addressDelete(address._id) }}>
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>)
                : <></>
              }

              {/* add new address component  */}
              <div className="w-full sm:w-[400px] flex pt-5">
                <div className="shadow-black hover:shadow-xl bg-white p-3">
                  <div>
                    <img src="./svg/github.svg" alt="temp" className="w-10 h-10" />
                  </div>
                  <div className="py-2">
                    <p className="font-semibold text-xl">Add New Address</p>
                    <p className="w-10/12 font-[350] text-slate-500"></p>
                    <button className="inline-block mt-7 bg-white hover:text-white hover:bg-green-600 -bottom-4 font-bold  rounded border border-current px-8 py-[6px] text-xs uppercase  text-green-600 transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:text-green-500" type="button"
                      onClick={() => setShowModal(true)}>
                      add new
                    </button>
                    {showModal ? (
                      <>
                        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                          <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                              <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                <h3 className="text-xl font-semibold">Add New Address</h3>
                                <button className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                  onClick={() => setShowModal(false)}>
                                  <span className=" text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                                    X
                                  </span>
                                </button>
                              </div>
                              <div className="relative p-6 flex-auto space-x-4">
                                <form className='flex flex-col'>
                                  <label htmlFor='address'>Address</label>
                                  <div className="relative flex w-full flex-wrap items-stretch mb-3">
                                    <span className="z-10 h-full leading-snug font-normal text-center flex  text-slate-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                                      <i className="fas fa-location"></i>
                                    </span>
                                    <textarea type="text" id="address" value={address} onChange={(e) => setaddress(e.target.value)} placeholder="Enter your address" className="px-3 py-3 resize-none placeholder-slate-300 text-slate-600 relative  bg-white rounded text-sm border border-slate-300 outline-none focus:outline-none focus:ring w-full pl-10" ></textarea>
                                  </div>
                                  <label htmlFor='city'>City</label>
                                  <div className="relative flex w-full flex-wrap items-stretch mb-3">
                                    <span className="z-10 h-full leading-snug font-normal  text-center text-slate-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                                      <i className="fas fa-map"></i>
                                    </span>
                                    <input type="text" value={city} onChange={(e) => setCity(e.target.value)} id='city' placeholder="Your city name" className="px-3 py-3 placeholder-slate-300 text-slate-600 relative bg-white rounded text-sm border border-slate-300 outline-none focus:outline-none focus:ring w-full pl-10" />
                                  </div>
                                  <label htmlFor='state'>state</label>
                                  <div className="relative flex w-full flex-wrap items-stretch mb-3">
                                    <span className="z-10 h-full leading-snug font-normal  text-center text-slate-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                                      <i className="fas fa-map"></i>
                                    </span>
                                    <input type="text" id='state' placeholder="Your state name" onChange={(e) => setState(e.target.value)} className="px-3 py-3 placeholder-slate-300 text-slate-600 relative bg-white rounded text-sm border border-slate-300 outline-none focus:outline-none focus:ring w-full pl-10" />
                                  </div>
                                  <label htmlFor='pincode'>Pincode</label>
                                  <div className="relative flex w-full flex-wrap items-stretch mb-3">
                                    <span className="z-10 h-full leading-snug font-normal  text-center text-slate-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                                      <i className="fas fa-location"></i>
                                    </span>
                                    <input type="number" value={pincode} onChange={(e) => setPincode(e.target.value)} placeholder="Enter picode" id="pincode" className="px-3 py-3 placeholder-slate-300 text-slate-600 relative bg-white  rounded text-sm border border-slate-300 outline-none focus:outline-none focus:ring w-full pl-10" />
                                  </div>
                                </form>
                              </div>
                              {/*footer*/}
                              <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                <button className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button"
                                  onClick={() => setShowModal(false)}>
                                  Close
                                </button>
                                <button className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button"
                                  onClick={(e) => {
                                    setShowModal(false)
                                    handleSubmitForAddress(e);
                                  }}>
                                  Save Address
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                      </>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>

          </div>
          {/* order module  */}
          <div className={`${openTab === 2 ? "block" : "hidden"} w-full sm:w-4/5 p-5`}>
          <h1 className='text-xl font-semibold pb-5 capitalize'>Order Detail</h1>
          </div>
        </div>

        {/* update profile component */}
        {updateProfile ? (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                <div className="border-0 px-5 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                    <h3 className="text-xl font-semibold">Update Your Profile</h3>
                    <button className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => setupdateProfile(false)}>
                      <span className=" text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                        X
                      </span>
                    </button>
                  </div>
                  <div className="relative p-6 flex-auto space-x-4">
                    <form className='flex flex-col'>
                      <label htmlFor='name'>Name</label>
                      <div className="relative flex w-full flex-wrap items-stretch mb-3 pt-2">
                        <span className="z-10 h-full leading-snug font-normal text-center flex  text-slate-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                          <i className="fas fa-user"></i>
                        </span>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} id='name' placeholder="Enter Your Name" className="px-3 py-3 placeholder-slate-300 text-slate-600 relative bg-white rounded text-sm border border-slate-300 outline-none focus:outline-none focus:ring w-full pl-10" />

                      </div>
                      <label htmlFor='number'>Number</label>
                      <div className="relative flex w-full flex-wrap items-stretch mb-3 pt-2">
                        <span className="z-10 h-full leading-snug font-normal  text-center text-slate-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                          <i className="fas fa-phone"></i>
                        </span>
                        <input type="text" value={number} onChange={(e) => setNumber(e.target.value)} id='number' placeholder="Enter Your Number" className="px-3 py-3 placeholder-slate-300 text-slate-600 relative bg-white rounded text-sm border border-slate-300 outline-none focus:outline-none focus:ring w-full pl-10" />
                      </div>
                      <label htmlFor='email'>Email</label>
                      <div className="relative flex w-full flex-wrap items-stretch mb-3 pt-2">
                        <span className="z-10 h-full leading-snug font-normal  text-center text-slate-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                          <i className="fas fa-envelope"></i>
                        </span>
                        <input type="email" id='email' placeholder="Enter Your Email" value={email} onChange={(e) => setEmail(e.target.value)} className="px-3 py-3 placeholder-slate-300 text-slate-600 relative bg-white rounded text-sm border border-slate-300 outline-none focus:outline-none focus:ring w-full pl-10" />
                      </div>
                      <label htmlFor='password'>Change Your Password</label>
                      <div className="relative flex w-full flex-wrap items-stretch mb-3 pt-2">
                        <button type="button" onClick={() => setChangePassword(true)} id="password" value="Change Password" className="bg-blue-400 hover:bg-blue-600 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" ><i className="fas fa-repeat"></i> Change Password</button>
                      </div>
                    </form>
                  </div>
                  {/*footer*/}
                  <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                    <button className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button"
                      onClick={() => setupdateProfile(false)}>
                      Close
                    </button>
                    <button className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button"
                      onClick={(e) => {
                        setupdateProfile(false)
                        changeProfileDetails(e);
                      }}>
                      Save Update
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        ) : null}

        {/* change password component  */}
        {changePassword ? (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                <div className="border-0 px-5 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                    <h3 className="text-xl font-semibold">Change Your Password</h3>
                    <button className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => setChangePassword(false)}>
                      <span className=" text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                        X
                      </span>
                    </button>
                  </div>
                  <div className="relative p-6 flex-auto space-x-4">
                    <form className='flex flex-col'>
                      <label htmlFor='password'>Old Password</label>
                      <div className="relative flex w-full flex-wrap items-stretch mb-3 pt-2">
                        <span className="z-10 h-full leading-snug font-normal text-center flex  text-slate-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                          <i className="fas fa-lock-open"></i>
                        </span>
                        <input type="text" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} id='password' placeholder="Enter Old Password" className="px-3 py-3 placeholder-slate-300 text-slate-600 relative bg-white rounded text-sm border border-slate-300 outline-none focus:outline-none focus:ring w-full pl-10" />
                      </div>
                      <label htmlFor='newpassword'>New Password</label>
                      <div className="relative flex w-full flex-wrap items-stretch mb-3 pt-2">
                        <span className="z-10 h-full leading-snug font-normal  text-center text-slate-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                          <i className="fas fa-unlock"></i>
                        </span>
                        <input type="text" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} id='newpassword' placeholder="Enter New Password" className="px-3 py-3 placeholder-slate-300 text-slate-600 relative bg-white rounded text-sm border border-slate-300 outline-none focus:outline-none focus:ring w-full pl-10" />
                      </div>
                      <label htmlFor='rnewpassword'>Confirm New Password</label>
                      <div className="relative flex w-full flex-wrap items-stretch mb-3 pt-2">
                        <span className="z-10 h-full leading-snug font-normal  text-center text-slate-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                          <i className="fas fa-lock"></i>
                        </span>
                        <input type="text" value={cnpass} onChange={(e) => setCnpass(e.target.value)} id='rnewpassword' placeholder="Re-enter New Password" className="px-3 py-3 placeholder-slate-300 text-slate-600 relative bg-white rounded text-sm border border-slate-300 outline-none focus:outline-none focus:ring w-full pl-10" />
                      </div>
                    </form>
                  </div>
                  {/*footer*/}
                  <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                    <button className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button"
                      onClick={() => setChangePassword(false)}>
                      Close
                    </button>
                    <button className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-xs px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button"
                      onClick={(e) => {
                        setChangePassword(false)
                        handleChangePassword(e)
                      }}>
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25  fixed inset-0 z-40 bg-black"></div>
          </>
        ) : null}


{/* otp component  */}
{otpTab ? (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                <div className="border-0 px-5 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                    <h3 className="text-xl font-semibold">Enter your OTP</h3>
                    <button className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => setotpTab(false)}>
                      <span className=" text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                        X
                      </span>
                    </button>
                  </div>
                  <div className="relative p-6 flex-auto space-x-4">
                    <form className='flex flex-col'>
                      <label htmlFor='otp'>Enter your OTP</label>
                      <div className="relative flex w-full flex-wrap items-stretch mb-3 pt-2">
                        <span className="z-10 h-full leading-snug font-normal text-center flex  text-slate-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                          <i className="fas fa-user"></i>
                        </span>
                        <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} id='otp' placeholder="Enter Your OTP" className="px-3 py-3 placeholder-slate-300 text-slate-600 relative bg-white rounded text-sm border border-slate-300 outline-none focus:outline-none focus:ring w-full pl-10" />

                      </div>
                     
                    </form>
                  </div>
                  {/*footer*/}
                  <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                    <button className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button"
                      onClick={() => setotpTab(false)}>
                      Close
                    </button>
                    <button className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button"
                      onClick={(e) => {
                        setotpTab(false)
                        otpSubmit(e);
                      }}>
                      Submit OTP
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        ) : null}
      </div>
    </>
  )
}

export default UserProfile

// eslint-disable-next-line no-lone-blocks
{/* <form>
<div class="relative z-0 w-full mb-6 group">
    <input type="email" name="floating_email" id="floating_email" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
    <label for="floating_email" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
</div>
<div class="relative z-0 w-full mb-6 group">
    <input type="password" name="floating_password" id="floating_password" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
    <label for="floating_password" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
</div>
<div class="relative z-0 w-full mb-6 group">
    <input type="password" name="repeat_password" id="floating_repeat_password" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
    <label for="floating_repeat_password" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm password</label>
</div>
<div class="grid md:grid-cols-2 md:gap-6">
    <div class="relative z-0 w-full mb-6 group">
        <input type="text" name="floating_first_name" id="floating_first_name" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
        <label for="floating_first_name" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First name</label>
    </div>
    <div class="relative z-0 w-full mb-6 group">
        <input type="text" name="floating_last_name" id="floating_last_name" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
        <label for="floating_last_name" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Last name</label>
    </div>
</div>
<div class="grid md:grid-cols-2 md:gap-6">
    <div class="relative z-0 w-full mb-6 group">
        <input type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" name="floating_phone" id="floating_phone" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
        <label for="floating_phone" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone number (123-456-7890)</label>
    </div>
    <div class="relative z-0 w-full mb-6 group">
        <input type="text" name="floating_company" id="floating_company" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
        <label for="floating_company" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Company (Ex. Google)</label>
    </div>
</div>
<button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
</form> */}