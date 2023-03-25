// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";

// import UserAddress from "../components/UserAddress";
// import ChangePasswordPopup from "../components/ChangePasswordPopup";
// import UpdateProfileDetails from "../components/UpdateProfileDetails";
// import axios from "axios";
// import dateFormat from "dateformat";

// import { BsArrowRightCircle } from "react-icons/bs";

// import { useCookies } from "react-cookie";
// import { userData } from "../redux/user/userSlice";
// import swal from 'sweetalert'
// import { AiTwotoneStar } from 'react-icons/ai'




// const UserProfile = () => {
//   // for popup state
//   const [updateProfile, setupdateProfile] = useState(false);
//   const [changePassword, setChangePassword] = useState(false);
//   const [openTab, setOpenTab] = useState(1);
//   const [isLoading, setIsLoading] = useState(null);
//   const [order, setOrder] = useState([]);
//   const user = useSelector((state) => state.userData.user);

//   const [, , removeCookie] = useCookies(["access_token", "refresh_token"]);
//   const dispatch = useDispatch();
//   const navigate = useNavigate()

//   useEffect(() => {
//     (async () => {
//       try {
//         if (user != null) {
//           setIsLoading(true);
//           const response = await axios(`${process.env.REACT_APP_BASEURL}/order/customer?userId=${user._id}`);
//           setOrder(response.data.response.order);
//           setIsLoading(false);
//         }
//       } catch (err) {
//         console.log(err);
//       }
//     })();
//   }, []);

//   const logout = () => {
//     swal({
//       title: "Are you Sure !",
//       icon: "warning",
//       buttons: ["NO", "YES"],
//       cancelButtonColor: "#DD6B55",
//       confirmButtonColor: "#DD6B55",
//       dangerMode: true,
//     })
//       .then(async (willDelete) => {
//         if (willDelete) {
//           removeCookie("access_token")
//           removeCookie("refresh_token")
//           dispatch(userData(null))
//           swal("Successfully logout", {
//             icon: "success",
//           });
//           navigate("/");
//         }
//       });
//   }

//   return (
//     <>
//       <div className="containerr rounded-md ">
//         <h1 className="text-3xl font-semibold">My Profile </h1>
//         {/* profile image  */}
//         <div>
//           <div className="flex justify-center relative">
//             <img
//               className="rounded-full w-40 h-40 sm:w-52 sm:h-52 object-cover"
//               alt="user pic"
//               src="https://images.unsplash.com/photo-1525134479668-1bee5c7c6845?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fA%3D%3D&w=1000&q=80"
//             />
//           </div>
//           <div className="flex justify-center gap-44 relative -top-5">
//             <button className="inline-block bg-white hover:text-white hover:bg-green-600 font-bold  rounded  px-4  py-[6px] text-xs uppercase  text-green-600 transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:text-green-500">
//               Add New
//             </button>
//             <button className="inline-block bg-white hover:text-white hover:bg-red-600 font-bold  rounded  px-4  py-[6px] text-xs uppercase  text-red-600 transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:text-red-500">
//               Remove
//             </button>
//           </div>
//           <div className="border-b-2 border-black/30"></div>
//         </div>

//         <div className="row ">
//           <div className="w-full sm:w-1/5 p-5">
//             <ul className="space-y-3">
//               <li
//                 className="text-lg border-b-2 cursor-pointer"
//                 onClick={() => setOpenTab(1)}
//               >
//                 Profile
//               </li>
//               {/* <li className='text-lg border-b-2 cursor-pointer' onClick={() => navigate("/orderDetails")}>Order Detail</li> */}
//               <li
//                 className="text-lg border-b-2 cursor-pointer"
//                 onClick={() => setOpenTab(2)}
//               >
//                 Your Orders
//               </li>
//               <li className="text-lg border-b-2 cursor-pointer">
//                 <button onClick={logout} className="inline-block bg-white hover:text-white hover:bg-red-600 font-bold  rounded  px-4  py-[6px] text-xs uppercase  text-red-600 transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:text-red-500">
//                   Logout
//                 </button>
//               </li>
//             </ul>
//           </div>

//           {/* profile module  */}
//           <div
//             className={`${openTab === 1 ? "block" : "hidden"
//               } w-full sm:w-4/5 p-5`}
//           >
//             <h1 className="text-xl font-semibold pb-5 capitalize">
//               your profile
//             </h1>
//             <div className="flex gap-7 ">
//               <div>
//                 <ul className="">
//                   <li className="py-3 text-lg font-extralight">Name</li>
//                   <li className=" text-lg font-extralight">Number</li>
//                   <li className="py-3 text-lg font-extralight">Email</li>
//                 </ul>
//               </div>
//               <div>
//                 <ul className="border-l-2 pl-5">
//                   <li className="py-3 text-lg font-normal capitalize">
//                     {user != null && user.name}
//                   </li>
//                   <li className=" text-lg font-normal">{user != null && user.number}</li>
//                   <li className="py-3 text-lg font-normal">{user != null && user.email}</li>
//                   <li className="py-3 text-lg font-normal">
//                     <button
//                       type="button"
//                       onClick={() => setChangePassword(true)}
//                       id="password"
//                       value="Change Password"
//                       className="inline-block mr-2 bg-white hover:text-white hover:bg-blue-400 -bottom-4 font-bold  rounded border border-current px-4 py-[6px] text-xs uppercase  text-blue-400 transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:text-blue-400"
//                     >
//                       <i className="fas fa-repeat"></i> Change Password
//                     </button>
//                     <button
//                       onClick={() => setupdateProfile(true)}
//                       className="inline-block bg-white hover:text-white hover:bg-blue-600 -bottom-4 font-bold  rounded border border-current px-8 py-[6px] text-xs uppercase  text-blue-600 transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:text-blue-500"
//                     >
//                       Update Profile{" "}
//                     </button>
//                   </li>
//                 </ul>
//               </div>
//             </div>

//             <h1 className="text-xl font-semibold pt-5 border-t-2 capitalize">
//               your Address
//             </h1>

//             <UserAddress />
//           </div>
//           {/* order module  */}
//           <div
//             className={`${openTab === 2 ? "block" : "hidden"
//               } w-full sm:w-4/5 p-5`}
//           >
//             <h1 className="text-xl font-semibold pb-5 capitalize">
//               Order Detail
//             </h1>
//             <div className="w-full flex flex-wrap  gap-2 justify-evenly ">
//               {order
//                 ? order.map((item) => {
//                   return <OrderDetailsCard items={item} />;
//                 })
//                 : ""}
//             </div>
//           </div>
//         </div>

//         {/* update profile component */}
//         {updateProfile ? (
//           <UpdateProfileDetails setupdateProfile={setupdateProfile} />
//         ) : null}

//         {/* change password component  */}
//         {changePassword ? (
//           <ChangePasswordPopup setChangePassword={setChangePassword} />
//         ) : null}
//       </div>
//     </>
//   );
// };

// export default UserProfile;

// export const OrderDetailsCard = ({ items }) => {
//   console.log(items);
//   let bgReview = "bg-green-600";

//   if (items != null) {
//     if (+items.resturant.rating <= 1.5) {
//       bgReview = "bg-red-600"
//     }
//     else if (+items.resturant.rating > 1.5 && items.resturant.rating < 3.5) {
//       bgReview = "bg-orange-600"
//     }
//     else {
//       bgReview = "bg-green-600"

//     }
//   }
//   return (
//     // <div>
//     // <Link  to={`/orderDetails/${items._id}`}>{items._id}</Link>
//     // </div>
//     <div className="flex w-[32%] relative  text-gray-900 antialiased">
//       <div>
//         <div className="overflow-hidden w-full   rounded-lg">
//           <img
//             src={items?.resturant?.bgImageUrl[0]}
//             alt=" random imgee"
//             className=" w-full rounded-lg object-cover object-center hover:scale-110 shadow-md transition-all duration-300"
//           />
//         </div>
//         <Link to={`/orderDetails/${items._id}`}>
//           <div className="relative group -mt-16 px-4 hover:skew-x-1 transition-all duration-500">
//             <div className="rounded-lg bg-white p-5 shadow-lg">
//               <div className="flex items-baseline">
//                 <div className="text-xs font-semibold uppercase tracking-wider text-gray-600">
//                   {dateFormat(items.createdAt, "dd")} &bull;{" "}
//                   {dateFormat(items.createdAt, "mm")} &bull;{" "}
//                   {dateFormat(items.createdAt, "yyyy")}
//                 </div>
//               </div>
//               <h4 className="mt-1 truncate text-xl font-semibold uppercase leading-tight">
//                 {items?.resturant?.name}
//               </h4>
//               <div className="mt-1 font-medium">
//                 ₹{items?.total}
//                 <span className="text-sm text-gray-600"> /Total Amout</span>
//               </div>
//               <div className="mt-4 flex justify-between items-center">
//                 <span className="text-md font-semibold text-teal-600">
//                   <div className={` ${bgReview} py-1 my-2  px-3 bg-green-600 flex items-center w-fit rounded-md text-white font-bold `}>{items != null && items.resturant.rating} &nbsp; <AiTwotoneStar /></div>
//                 </span>
//                 <BsArrowRightCircle className="text-xl group-hover:translate-x-3 transition-all duration-500" />
//               </div>
//             </div>
//           </div>
//         </Link>
//         {/* <div className='hidden'><CustomerOrderCard items={items}/></div>   */}
//       </div>
//     </div>
//   );
// };



import React, { useState } from 'react'
import axios from 'axios'
import { userData } from "../redux/user/userSlice"
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'


const UserProfile = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate();
  // for popup state 
  const [updateProfile, setupdateProfile] = useState(false)
  const [updateAddress, setUpdateAddress] = useState(false)
  const [changePassword, setChangePassword] = useState(false)
  const [showModal, setShowModal] = useState(false);
  const [openTab, setOpenTab] = useState(1);
  const [otpTab, setotpTab] = useState(false)


  const [name, setName] = useState('')
  const [nameError, setNameError] = useState('');
  const [number, setNumber] = useState('')
  const [numberError, setNumberError] = useState('')
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const [oldPassword, setOldPassword] = useState('')
  const [oldPasswordError, setOldPasswordError] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [newPasswordError, setNewPasswordError] = useState('')
  const [cnpass, setCnpass] = useState('')
  const [cnPassError, setCnPassError] = useState('')

  const [address, setaddress] = useState('')
  const [addressError, setAddressError] = useState('')
  const [city, setCity] = useState("")
  const [cityError, setCityError] = useState('')
  const [state, setState] = useState("")
  const [stateError, setStateError] = useState('')
  const [pincode, setPincode] = useState('')
  const [pincodeError, setPincodeError] = useState('')

  const [newAddress, setNewAddress] = useState({})
  const [otp, setOtp] = useState('')
  const [disabled, setDisabled] = useState(true)

  const [changeAddress, setChangeAddress] = useState("")


  const user = useSelector(state => state.userData.user)


  useEffect(() => {
    setName(user.name);
    setEmail(user.email);
    setNumber(user.number)
  }, [])

  function SubmitButton() {
    if (name && email && number && nameError.length === 0 && emailError.length === 0 && numberError.length === 0) {
      return (
        <button className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button"
          onClick={(e) => {
            setupdateProfile(false)
            changeProfileDetails(e);
          }}>
          Save Update
        </button>
      )
    } else {
      return (
        <button className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button"
          onClick={(e) => {
            setupdateProfile(false)
            changeProfileDetails(e);
          }} disabled>
          Save Update
        </button>
      )
    }
  }

  const handledisable = () => {
    if (nameError.length === 0 && numberError.length === 0 && emailError.length === 0) {
      console.log('hheydfljdskflsfd');
      setDisabled(!disabled)
      console.log(disabled)
    }
  }

  const handleName = (e) => {
    setName(e.target.value)
    var regex = /^[\sA-Za-z]+$/;

    if (!regex.test(e.target.value)) {
      setNameError("please enter valid name")
    } else {
      setNameError("")
    }
    handledisable()
  }

  const handleEmail = (e) => {
    console.log("hello from email");
    setEmail(e.target.value)
    var regex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    if (!regex.test(e.target.value)) {
      setEmailError("Please enter valid email address")
    } else {
      setEmailError("")
    }
    handledisable()
  }

  const handleNumber = (e) => {
    setNumber(e.target.value)
    const regx = /^[789]\d{9}$/
    if (!regx.test(e.target.value)) {
      setNumberError("please enter valid number")
    } else {
      setNumberError("");
    }
    handledisable()
  }

  const handleOldPassword = (e) => {
    setOldPassword(e.target.value)
    if (oldPassword === null || oldPassword === "") {
      setOldPasswordError("You not leave it empty")
    } else {
      setOldPasswordError("")
    }
  }

  const handleCpass = (e) => {
    setCnpass(e.target.value)
    if (newPassword === e.target.value) {
      setCnPassError('')
    } else {
      setCnPassError('please enter same password');
    }
    handledisable()
  }

  const handlePassword = (e) => {
    setNewPassword(e.target.value);
    if (e.target.value.length < 8) {
      setNewPasswordError('password must be 8 character');
    } else {
      setNewPasswordError('')
    }
    if (e.target.value == cnpass) {
      setCnPassError('')
    } else {
      setCnPassError('please enter same password');
    }
    handledisable()
  }

  const handleAddress = (e) => {
    setaddress(e.target.value)
    if (address === null || address === "") {
      setAddressError("Please enter address")
    } else {
      setAddressError("")
    }
  }

  const handleCity = e => {
    setCity(e.target.value)
    if (city === null || city === "")
      setCityError("Please Enter city name")
    else
      setCityError("")
  }

  const handleState = e => {
    setState(e.target.value)
    if (state === null || state === "")
      setStateError("Please enter state name")
    else
      setStateError("")
  }

  const handlePincode = e => {
    setPincode(e.target.value)
    const regex = /^\d{6}$/
    if (!regex.test(e.target.value))
      setPincodeError("Enter correct pincode")
    else if (pincode === null || pincode === "")
      setPincodeError("You not leave it empty")
    else
      setPincodeError("")
  }

  const changeProfileDetails = async (e) => {
    e.preventDefault()
    console.log(email, number, name);
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
    console.log(oldPassword, newPassword);
    const response = await axios.post('http://localhost:4000/user/changePass', {
      userId: user._id,
      oldPass: oldPassword,
      newPass: newPassword
    })


    console.log(response);
  }

  const handleSubmitForAddress = async (e) => {
    e.preventDefault();
    const response = await axios.post("http://localhost:4000/user/addAddress", {
      "itemId": changeAddress,
      "userId": user._id,
      "area": address,
      "city": city,
      "state": state,
      "pincode": pincode
    })
    console.log(response.data.response);
    dispatch(userData(response.data.response))
    setaddress("")
    setCity("")
    setState("")
    setPincode("")
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
            {/* all address list  */}
            <div className='flex flex-wrap'>

              {user !== null && user.address && user.address.length !== 0 ?
                user.address.map((address, i) =>
                  <div className=" w-full sm:w-[400px] flex ">
                    <div className="shadow-black hover:shadow-xl anim bg-white p-3">
                      <div>
                        <img src="./svg/github.svg" alt="temp" className="w-10 h-10" />
                      </div>
                      <div className="py-2">
                        <p className="font-semibold text-xl">Address {i + 1}</p>
                        <p className="w-10/12 font-[350] text-slate-500">{address.area + " " + address.city + " " + address.state + "-" + address.pincode}</p>
                        <p className="font-semibold text-sm uppercase py-5 ">16 mins</p>
                        <div className='space-x-4 flex'>
                          <button className="inline-block bg-white hover:text-white hover:bg-green-600 -bottom-4 font-bold  rounded border border-current px-4 py-[9px] text-xs uppercase  text-green-600 transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:text-green-500">
                            <span className='fas fa-location'></span> deliver here
                          </button>
                          <button onClick={() => { setUpdateAddress(true); setChangeAddress(address._id) }} className="rounded-full inline-block bg-white hover:text-white hover:bg-blue-600 -bottom-4 font-bold  border border-current w-fit p-2 ml-1 text-xs uppercase  text-blue-600 transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:text-blue-500">
                            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                              <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                            </svg>
                          </button>
                          <button className=" inline-block bg-white hover:text-white hover:bg-red-600 -bottom-4 font-bold  rounded-full border border-current w-fit p-2 ml-1 text-xs uppercase  text-red-600 transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:text-red-500" onClick={() => { addressDelete(address._id) }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16"> <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" /> <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                            </svg>
                          </button>
                        </div>
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
                                    <textarea type="text" id="address" value={address} onBlur={handleAddress} onChange={handleAddress} placeholder="Enter your address" className="px-3 py-3 resize-none placeholder-slate-300 text-slate-600 relative  bg-white rounded text-sm border border-slate-300 outline-none focus:outline-none focus:ring w-full pl-10" ></textarea>
                                  </div>
                                  <span className='text-red-500 text-sm'>{addressError}</span>
                                  <label htmlFor='city'>City</label>
                                  <div className="relative flex w-full flex-wrap items-stretch mb-3">
                                    <span className="z-10 h-full leading-snug font-normal  text-center text-slate-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                                      <i className="fas fa-map"></i>
                                    </span>
                                    <input type="text" value={city} onBlur={handleCity} onChange={handleCity} id='city' placeholder="Your city name" className="px-3 py-3 placeholder-slate-300 text-slate-600 relative bg-white rounded text-sm border border-slate-300 outline-none focus:outline-none focus:ring w-full pl-10" />
                                  </div>
                                  <span className='text-red-500 text-sm'>{cityError}</span>
                                  <label htmlFor='state'>state</label>
                                  <div className="relative flex w-full flex-wrap items-stretch mb-3">
                                    <span className="z-10 h-full leading-snug font-normal  text-center text-slate-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                                      <i className="fas fa-map"></i>
                                    </span>
                                    <input type="text" id='state' placeholder="Your state name" onBlur={handleState} onChange={handleState} className="px-3 py-3 placeholder-slate-300 text-slate-600 relative bg-white rounded text-sm border border-slate-300 outline-none focus:outline-none focus:ring w-full pl-10" />
                                  </div>
                                  <span className='text-red-500 text-sm'>{stateError}</span>
                                  <label htmlFor='pincode'>Pincode</label>
                                  <div className="relative flex w-full flex-wrap items-stretch mb-3">
                                    <span className="z-10 h-full leading-snug font-normal  text-center text-slate-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                                      <i className="fas fa-location"></i>
                                    </span>
                                    <input type="number" value={pincode} onBlur={handlePincode} onChange={handlePincode} placeholder="Enter picode" id="pincode" className="px-3 py-3 placeholder-slate-300 text-slate-600 relative bg-white  rounded text-sm border border-slate-300 outline-none focus:outline-none focus:ring w-full pl-10" />
                                  </div>
                                  <span className='text-red-500 text-sm'>{pincodeError}</span>
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
            <div className='w-3/4 h-full '>
              <Link to="/orderDetails" className='flex justify-around items-center  border-b-2 p-8 border-black hover:bg-slate-200 transition-all '>
                        <img src='https://picsum.photos/id/27/200/300' className=' h-28 w-28 rounded-full'/>
                        <h1 className='font-bold text-xl'>pizza the granted</h1>
                        <h1 className='text-zinc-600 font-bold tect-xl '>&gt;</h1>
              </Link>
              <Link to="/orderDetails" className='flex justify-around items-center border-b-2 p-8 border-black hover:bg-slate-200 transition-all '>
                        <img src='https://picsum.photos/id/27/200/300' className=' h-28 w-28 rounded-full'/>
                        <h1 className='font-bold text-xl'>pizza the granted</h1>
                        <h1 className='text-zinc-600 font-bold tect-xl '>&gt;</h1>
              </Link>
              <Link to="/orderDetails" className='flex justify-around items-center border-b-2 p-8 border-black hover:bg-slate-200 transition-all '>
                        <img src='https://picsum.photos/id/27/200/300' className=' h-28 w-28 rounded-full'/>
                        <h1 className='font-bold text-xl'>pizza the granted</h1>
                        <h1 className='text-zinc-600 font-bold tect-xl '>&gt;</h1>
              </Link>
              
            </div>
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
                        <input type="text" value={name} onBlur={handleName} onChange={handleName} id='name' placeholder="Enter Your Name" className="px-3 py-3 placeholder-slate-300 text-slate-600 relative bg-white rounded text-sm border border-slate-300 outline-none focus:outline-none focus:ring w-full pl-10" />
                      </div>
                      <span className="text-sm text-red-500">{nameError}</span>
                      <label htmlFor='number'>Number</label>
                      <div className="relative flex w-full flex-wrap items-stretch mb-3 pt-2">
                        <span className="z-10 h-full leading-snug font-normal  text-center text-slate-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                          <i className="fas fa-phone"></i>
                        </span>
                        <input type="text" value={number} onBlur={handleNumber} onChange={handleNumber} id='number' placeholder="Enter Your Number" className="px-3 py-3 placeholder-slate-300 text-slate-600 relative bg-white rounded text-sm border border-slate-300 outline-none focus:outline-none focus:ring w-full pl-10" />
                      </div>
                      <span className="text-sm text-red-500">{numberError}</span>
                      <label htmlFor='email'>Email</label>
                      <div className="relative flex w-full flex-wrap items-stretch mb-3 pt-2">
                        <span className="z-10 h-full leading-snug font-normal  text-center text-slate-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                          <i className="fas fa-envelope"></i>
                        </span>
                        <input type="email" id='email' placeholder="Enter Your Email" value={email} onBlur={handleEmail} onChange={handleEmail} className="px-3 py-3 placeholder-slate-300 text-slate-600 relative bg-white rounded text-sm border border-slate-300 outline-none focus:outline-none focus:ring w-full pl-10" />
                      </div>
                      <span className="text-sm text-red-500">{emailError}</span>

                    </form>
                  </div>
                  {/*footer*/}
                  <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                    <button className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button"
                      onClick={() => setupdateProfile(false)}>
                      Close
                    </button>
                    {SubmitButton()}
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
                        <input type="text" value={oldPassword} onBlur={handleOldPassword} onChange={handleOldPassword} id='password' placeholder="Enter Old Password" className="px-3 py-3 placeholder-slate-300 text-slate-600 relative bg-white rounded text-sm border border-slate-300 outline-none focus:outline-none focus:ring w-full pl-10" />
                      </div>
                      <span className='text-red-500 text-sm'>{oldPasswordError}</span>
                      <label htmlFor='newpassword'>New Password</label>
                      <div className="relative flex w-full flex-wrap items-stretch mb-3 pt-2">
                        <span className="z-10 h-full leading-snug font-normal  text-center text-slate-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                          <i className="fas fa-unlock"></i>
                        </span>
                        <input type="text" value={newPassword} onBlur={handlePassword} onChange={handlePassword} id='newpassword' placeholder="Enter New Password" className="px-3 py-3 placeholder-slate-300 text-slate-600 relative bg-white rounded text-sm border border-slate-300 outline-none focus:outline-none focus:ring w-full pl-10" />
                      </div>
                      <span className='text-red-500 text-sm'>{newPasswordError}</span>

                      <label htmlFor='rnewpassword'>Confirm New Password</label>
                      <div className="relative flex w-full flex-wrap items-stretch mb-3 pt-2">
                        <span className="z-10 h-full leading-snug font-normal  text-center text-slate-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                          <i className="fas fa-lock"></i>
                        </span>
                        <input type="text" value={cnpass} onBlur={handleCpass} onChange={handleCpass} id='rnewpassword' placeholder="Re-enter New Password" className="px-3 py-3 placeholder-slate-300 text-slate-600 relative bg-white rounded text-sm border border-slate-300 outline-none focus:outline-none focus:ring w-full pl-10" />
                      </div>
                      <span className='text-red-500 text-sm'>{cnPassError}</span>

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

        {/* update your Address  */}
        {updateAddress ? (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                    <h3 className="text-xl font-semibold">Update Address</h3>
                    <button className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => setUpdateAddress(false)}>
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
                        <textarea type="text" id="address" value={address} onBlur={handleAddress} onChange={handleAddress} placeholder="Enter your address" className="px-3 py-3 resize-none placeholder-slate-300 text-slate-600 relative  bg-white rounded text-sm border border-slate-300 outline-none focus:outline-none focus:ring w-full pl-10" ></textarea>
                      </div>
                      <span className='text-red-500 text-sm'>{addressError}</span>
                      <label htmlFor='city'>City</label>
                      <div className="relative flex w-full flex-wrap items-stretch mb-3">
                        <span className="z-10 h-full leading-snug font-normal  text-center text-slate-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                          <i className="fas fa-map"></i>
                        </span>
                        <input type="text" value={city} onBlur={handleCity} onChange={handleCity} id='city' placeholder="Your city name" className="px-3 py-3 placeholder-slate-300 text-slate-600 relative bg-white rounded text-sm border border-slate-300 outline-none focus:outline-none focus:ring w-full pl-10" />
                      </div>
                      <span className='text-red-500 text-sm'>{cityError}</span>
                      <label htmlFor='state'>state</label>
                      <div className="relative flex w-full flex-wrap items-stretch mb-3">
                        <span className="z-10 h-full leading-snug font-normal  text-center text-slate-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                          <i className="fas fa-map"></i>
                        </span>
                        <input type="text" id='state' placeholder="Your state name" onBlur={handleState} onChange={handleState} className="px-3 py-3 placeholder-slate-300 text-slate-600 relative bg-white rounded text-sm border border-slate-300 outline-none focus:outline-none focus:ring w-full pl-10" />
                      </div>
                      <span className='text-red-500 text-sm'>{stateError}</span>
                      <label htmlFor='pincode'>Pincode</label>
                      <div className="relative flex w-full flex-wrap items-stretch mb-3">
                        <span className="z-10 h-full leading-snug font-normal  text-center text-slate-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                          <i className="fas fa-location"></i>
                        </span>
                        <input type="number" value={pincode} onBlur={handlePincode} onChange={handlePincode} placeholder="Enter picode" id="pincode" className="px-3 py-3 placeholder-slate-300 text-slate-600 relative bg-white  rounded text-sm border border-slate-300 outline-none focus:outline-none focus:ring w-full pl-10" />
                      </div>
                      <span className='text-red-500 text-sm'>{pincodeError}</span>
                    </form>
                  </div>
                  {/*footer*/}
                  <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                    <button className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button"
                      onClick={() => setUpdateAddress(false)}>
                      Close
                    </button>
                    <button className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button"
                      onClick={(e) => {
                        setUpdateAddress(false)
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