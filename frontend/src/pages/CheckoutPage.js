
import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userData } from "../redux/user/userSlice"

const CheckoutPage = () => {

  const [showModal, setShowModal] = useState(false);
  const [address, setaddress] = useState('')
  const [city, setCity] = useState("")
  const [state, setState] = useState("")
  const [pincode, setPincode] = useState('')

  const dispatch = useDispatch()

  const user = useSelector(state => state.userData.user)
  const product = useSelector(state => state.cartData.cart.products)

  const handleDelivery = async (address) => {
    // e.preventDefault();
    console.log(product);
    let pr = product.map(item => {
      // console.log("this is print");
      // console.log(item.quantity);
 
      return {
        product:item.product._id,
        quantity: item.quantity,
      }
      
    })
   
    console.log(address);
    // const response = await axios.post('http://localhost:4000/order/create', {
      
    // })
  }

  const handleSubmit = async (e) => {
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

  const handlePayment = async () => {
    const response = await axios.post("http://localhost:4000/payment/create-checkout-session")
  }

  const addressDelete = async (id) => {
    const response = await axios.get(`http://localhost:4000/user/delteAddress?userId=${user._id}&itemId=${id}`)
        
  dispatch(userData(response.data.response))
  }

  return (
    <>
      <div className="containerr mt-28 mb-10 h-fit shadow-black shadow-md backdrop-blur-md rounded-md">
        <div className="grid grid-cols-1 grid-rows-3 gap-5">

          <div className="w-full h-full  px-14 flex flex-col justify-center shadow-lg space-y-3">
            <div className="flex space-x-3">
              <p className="font-bold text-lg">Logged in</p>
              <img src="./svg/github.svg" className="w-7 h-7" alt="temp" />
            </div>
            <div className="flex space-x-5">
              <p className="font-semibold text-lg">{user.name}</p> &nbsp;&nbsp;&nbsp; |
              <p className="font-semibold text-lg">{user.number}</p>
            </div>
          </div>

          <div className="w-full h-full row-span-2  px-14 flex shadow-md flex-col space-y-3">
            <div className="flex flex-col ">
              <p className="font-bold text-lg">Select delivery address</p>
              <p className="font-[400] text-slate-500 ">You have a saved address in this location</p>
            </div>
            <div className="flex flex-wrap">

              {user !== null && user.address.length !== 0 ?
                user.address.map((address,i) =>
                  <div className="p-3 w-full sm:w-6/12 flex ">
                    <div className="shadow-black hover:shadow-xl anim bg-white p-3">
                      <div>
                        <img src="./svg/github.svg" alt="temp" className="w-10 h-10" />
                      </div><div className="py-2">
                        <p className="font-semibold text-xl">Address {i+1}</p>
                        <p className="w-10/12 font-[350] text-slate-500">{address.area + " " + address.city + " " + address.state + "-" + address.pincode}</p>
                        <p className="font-semibold text-sm uppercase py-5 ">16 mins</p>
                        <button
                          className="inline-block bg-white hover:text-white hover:bg-green-600 -bottom-4 font-bold  rounded border border-current px-8 py-[6px] text-xs uppercase  text-green-600 transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:text-green-500"
                          to="ewfsdf"
                          onClick={() => handleDelivery(address)}
                        >
                          deliver here
                        </button>
                        <button
                          className="ml-4 inline-block bg-white hover:text-white hover:bg-red-600 -bottom-4 font-bold  rounded border border-current px-8 py-[6px] text-xs uppercase  text-red-600 transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:text-red-500"  onClick={() => {addressDelete(address._id)}}>
                         
                          Delete
                        </button>
                      </div>
                    </div>

                  </div>)
                // <></>
                : <></>
              }

              <div className="p-3 w-full sm:w-6/12 flex ">
                <div className="shadow-black hover:shadow-xl bg-white p-3">
                  <div>
                    <img src="./svg/github.svg" alt="temp" className="w-10 h-10" />
                  </div>
                  <div className="py-2">
                    <p className="font-semibold text-xl">Add New Address</p>
                    <p className="w-10/12 font-[350] text-slate-500"></p>
                    <button
                      className="inline-block mt-7 bg-white hover:text-white hover:bg-green-600 -bottom-4 font-bold  rounded border border-current px-8 py-[6px] text-xs uppercase  text-green-600 transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:text-green-500"
                      type="button"
                      onClick={() => setShowModal(true)}
                    >
                      add new
                    </button>
                    {showModal ? (
                      <>
                        <div className="justify-center items-center flex  fixed inset-0 z-50 outline-none focus:outline-none">
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
                                    handleSubmit(e);
                                  }}>
                                  Save Address
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="opacity-25 inset-0 z-40 bg-black"></div>
                      </>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full h-full shadow-md px-14">Choose payment method </div>
        </div>
      </div>
    </>
  )
}

// export function Modal() {
//   const [showModal, setShowModal] = React.useState(false);
//   return (
//     <>
//       <button
//         className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
//         type="button"
//         onClick={() => setShowModal(true)}
//       >
//         Open regular modal
//       </button>
//       {showModal ? (
//         <>
//           <div
//             className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
//           >
//             <div className="relative w-auto my-6 mx-auto max-w-3xl">
//               {/*content*/}
//               <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
//                 {/*header*/}
//                 <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
//                   <h3 className="text-3xl font-semibold">
//                     Modal Title
//                   </h3>
//                   <button
//                     className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
//                     onClick={() => setShowModal(false)}
//                   >
//                     <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
//                       ×
//                     </span>
//                   </button>
//                 </div>
//                 {/*body*/}
//                 <div className="relative p-6 flex-auto">
//                   <p className="my-4 text-slate-500 text-lg leading-relaxed">
//                     I always felt like I could do anything. That’s the main
//                     thing people are controlled by! Thoughts- their perception
//                     of themselves! They're slowed down by their perception of
//                     themselves. If you're taught you can’t do anything, you
//                     won’t do anything. I was taught I could do everything.
//                   </p>
//                 </div>
//                 {/*footer*/}
//                 <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
//                   <button
//                     className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
//                     type="button"
//                     onClick={() => setShowModal(false)}
//                   >
//                     Close
//                   </button>
//                   <button
//                     className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
//                     type="button"
//                     onClick={() => setShowModal(false)}
//                   >
//                     Save Changes
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
//         </>
//       ) : null}
//     </>
//   );
// }

export default CheckoutPage