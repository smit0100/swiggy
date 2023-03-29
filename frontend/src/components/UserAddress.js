import React, { useState } from 'react'
import axios from 'axios'
import { userData } from "../redux/user/userSlice"
import { useSelector, useDispatch } from 'react-redux'
import swal from "sweetalert"
import { HiOutlineLocationMarker } from 'react-icons/hi'

const UserAddress = () => {


  const user = useSelector(state => state.userData.user)

  const [updateAddress, setUpdateAddress] = useState(false)
  const [changeAddress, setChangeAddress] = useState("")

  const [showModal, setShowModal] = useState(false);

  const [address, setaddress] = useState('')
  const [addressError, setAddressError] = useState('')
  const [city, setCity] = useState("")
  const [cityError, setCityError] = useState('')
  const [state, setState] = useState("")
  const [stateError, setStateError] = useState('')
  const [pincode, setPincode] = useState('')
  const [pincodeError, setPincodeError] = useState('')

  const dispatch = useDispatch()

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

  const AddAddressButton = () => {
    if (address && city && state && pincode && addressError.length === 0 && cityError.length === 0 && stateError.length === 0 && pincodeError.length === 0) {
      return (<button className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" onClick={(e) => { setShowModal(false); handleSubmitForAddress(e); }}>Save Address</button>)
    } else {
      return (<button className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" disabled>Save Address</button>)
    }
  }

  const UpdateAddressButton = () => {
    if (address && city && state && pincode && addressError.length === 0 && cityError.length === 0 && stateError.length === 0 && pincodeError.length === 0) {
      return (<button className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" onClick={(e) => { setUpdateAddress(false); handelChangeAddress(e); clearAddress() }}>Update Address</button>)
    } else {
      return (<button className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" disabled>Update Address</button>)
    }
  }

  const handleSubmitForAddress = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASEURL}/user/addAddress`, {
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
    } catch (err) {
      console.log(err);
    }
  }

  const handelChangeAddress = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${process.env.REACT_APP_BASEURL}/user/editAddress`, {
        "itemId": changeAddress,
        "userId": user._id,
        "area": address,
        "city": city,
        "state": state,
        "pincode": pincode
      })
      console.log(response.data);
      dispatch(userData(response.data.response))
      setaddress("")
      setCity("")
      setState("")
      setPincode("")
      setChangeAddress("")
      swal("Address changed successfully", "", "success");

    } catch (err) {
      if (err.response.status == 500) {
        swal(`${err.response.data.message}`, "", "error");
      }
    }
  }


  const addressDelete = async (id) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASEURL}/user/delteAddress?userId=${user._id}&itemId=${id}`)
      dispatch(userData(response.data.response))
      swal("Deleted successfully", "", "success");
    } catch (err) {
      if (err) {
        swal("something went wrong", "", "error");
      }
    }
  }

  const fillAddress = (address, city, state, pincode) => {
    setaddress(address);
    setCity(city)
    setState(state);
    setPincode(pincode)
  }
  const clearAddress = () => {
    setaddress("");
    setCity("")
    setState("");
    setPincode("")
    setChangeAddress("")
  }
  
  return (
    <div>
      {/* all address list  */}
      <div className='flex flex-wrap gap-2 justify-center'>

        {user !== null && user.address && user.address.length !== 0 ?
          user.address.map((address, i) =>
            <div className=" w-full md:w-[32%] sm:w-[49%] flex shadow-black hover:shadow-xl anim bg-orange-200 p-3 rounded-sm">
              <div className="flex flex-row w-full sm:block justify-between">
                <div className='flex flex-col'>
                  <HiOutlineLocationMarker className='text-center' />
                  <p className="font-semibold text-xl">Address {i + 1}</p>
                  <p className="w-10/12 font-[350] text-slate-500">{address.area + " " + address.city + " " + address.state + "-" + address.pincode}</p>
                  <p className="font-semibold text-sm uppercase py-5 ">16 mins</p>
                </div>
                <div className='sm:block space-y-2  flex flex-col justify-end'>
                  <button onClick={() => { setUpdateAddress(true); setChangeAddress(address._id); fillAddress(address.area, address.city, address.state, address.pincode) }} className="rounded-full inline-block bg-white hover:text-white hover:bg-blue-600 -bottom-4 font-bold  border border-current w-fit p-2 ml-1 text-xs uppercase  text-blue-600 transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:text-blue-500">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                    </svg>
                  </button>
                  <button className=" inline-block bg-white hover:text-white hover:bg-red-600 -bottom-4 font-bold  rounded-full border border-current w-fit p-2 ml-1 text-xs uppercase  text-red-600 transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:text-red-500" onClick={() => { addressDelete(address._id) }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16"> <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" /> <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>)
          : <></>
        }

        {/* add new address component  */}
        <div className="w-full md:w-[32%] sm::w-[49%] flex shadow-black hover:shadow-xl anim bg-orange-200 p-3 rounded-sm">
          <div>
            <div className="py-2">
              <HiOutlineLocationMarker className='text-center' />
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
                          {AddAddressButton()}
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
                      <input type="text" value={state} id='state' placeholder="Your state name" onBlur={handleState} onChange={handleState} className="px-3 py-3 placeholder-slate-300 text-slate-600 relative bg-white rounded text-sm border border-slate-300 outline-none focus:outline-none focus:ring w-full pl-10" />
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
                    onClick={() => { setUpdateAddress(false); clearAddress() }}>
                    Close
                  </button>
                  {UpdateAddressButton()}
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </div>
  )
}

export default UserAddress