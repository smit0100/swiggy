import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom'
import OrderSummaryFoodCard from './OrderSummaryFoodCard';
import { useSelector } from 'react-redux';


// import io from 'socket.io-client';
// const socket = io("http://localhost:4000");

const OrderSummary = () => {
  const { state } = useLocation();
  const [userData, setUserData] = useState(null)
  const user = useSelector(state => state.userData.user)
  const [resturantOtp, setresturantOtp] = useState()
  const [customerOtp, setcustomerOtp] = useState()

  const [resturanthandle,setresturanthandle]=useState(null)
  const [customerhandle,setcustomerhandle]=useState(null)

  console.log(state);
  useEffect(() => {
    (async () => {
      const response = await axios.get(`http://localhost:4000/order/fetchOneOrder?id=${state}`);
      console.log(response);
      setUserData(response.data.order)
    })();
  }, [resturanthandle,customerhandle])
  // acceptfromresturant


  const handleResturantOtp = async (e) => {
    e.preventDefault()
    const res = await axios.post(`http://localhost:4000/courier/acceptfromresturant`, { id: userData != null ? userData._id : 0, otp: resturantOtp });
    setresturanthandle(res)
    console.log(res);
  }

  const handleCutomerOtp = async (e) => {
    e.preventDefault()
    const res = await axios.post(`http://localhost:4000/courier/deliver`, { id: userData != null ? userData._id : 0, otp: customerOtp });
    setcustomerhandle(res)
    console.log(res);
  }

  return (
    <>
      <div className='bg-gradient-to-bl from-indigo-200 via-red-200 to-yellow-100 '>
        <div className='flex flex-wrap mx-5'>
          {/* left side  panel*/}
          <div className='w-full sm:w-2/3 p-5'>

            {/* Customer details  */}
            <div className='mb-2 shadow-md rounded bg-white bg-opacity-40 p-3'>
              <h1 className='text-2xl font-normal capitalize border-b-2 border-black mb-4 pb-2'>Customer Details</h1>
              <div>
                <table className='table-auto border-spacing-y-3 border-separate'>
                  <tr className=''>
                    <td className='text-slate-700 text-lg text-semibold pr-5 w-1/6'>Name</td>
                    <td className='text-black capitalize bg-white w-screen bg-opacity-20 pl-2 rounded '>{userData !== null ? userData.customer?.name : ""}</td>
                  </tr>
                  <tr>
                    <td className='text-slate-700 text-lg text-semibold pr-5 '>Mobile No.</td>
                    <td className='text-black capitalize bg-white w-full bg-opacity-20 pl-2 rounded'>{userData !== null ? userData.customer?.number : ""}</td>
                  </tr>
                  <tr>
                    <td className='text-slate-700 text-lg text-semibold pr-5'>E-mail</td>
                    <td className='text-black capitalize bg-white w-full bg-opacity-20 pl-2 rounded'>{userData !== null ? userData.customer?.email : ""}</td>
                  </tr>
                  <tr>
                    <td className='text-slate-700 text-lg text-semibold pr-5'>Delivery Address</td>
                    <td className='text-black capitalize bg-white w-full bg-opacity-20 pl-2 rounded'>{userData !== null ? userData.address.area + " " + userData.address.city + " " + userData.address.state + " - " + userData.address.pincode : ""}</td>
                  </tr>
                </table>
              </div>
            </div>

            {/* customer order details  */}
            <div className='shadow-md rounded bg-white bg-opacity-40 p-3 flex flex-wrap gap-2'>
              <h1 className='text-2xl w-full font-normal capitalize border-b-2 border-black mb-4 pb-2'>Customer order Details</h1>
              {
                userData != null ? userData.products.map(product => <OrderSummaryFoodCard product={product} />) : <></>
              }
            </div>

            {/* Restaurant details  */}
            <div className='shadow-md rounded bg-white bg-opacity-40 p-3'>
              <h1 className='text-2xl font-normal capitalize border-b-2 border-black mb-4 pb-2'>Restaurant Details</h1>
              <div>
                <table className='table-auto border-spacing-y-3 border-separate'>
                  <tr className=''>
                    <td className='text-slate-700 text-lg text-semibold pr-5 w-1/6'>Name</td>
                    <td className='text-black capitalize bg-white w-screen bg-opacity-20 pl-2 rounded '>{userData != null ? userData.resturant.name : ""}</td>
                  </tr>
                  <tr>
                    <td className='text-slate-700 text-lg text-semibold pr-5 '>Mobile No.</td>
                    <td className='text-black capitalize bg-white w-full bg-opacity-20 pl-2 rounded'>{userData != null ? userData.resturant.number : ""}</td>
                  </tr>
                  <tr>
                    <td className='text-slate-700 text-lg text-semibold pr-5'>E-mail</td>
                    <td className='text-black capitalize bg-white w-full bg-opacity-20 pl-2 rounded'>{userData != null ? userData.resturant.email : ""}</td>
                  </tr>
                  <tr>
                    <td className='text-slate-700 text-lg text-semibold pr-5'>Shipping Address</td>
                    <td className='text-black capitalize bg-white w-full bg-opacity-20 pl-2 rounded'>{userData !== null ? userData.resturant.address.area + " " + userData.resturant.address.city + " " + userData.resturant.address.state + " - " + userData.resturant.address.pincode : ""}</td>
                  </tr>
                </table>
              </div>
            </div>

          </div>

          {/* right side panel  */}
          <div className='w-full sm:w-1/3 px-5 mb-3 sm:mb-0 sm:p-5'>
            <div className='shadow-md rounded h-full bg-white bg-opacity-40 p-3'>
              <h1 className='text-2xl font-normal capitalize border-b-2 border-black mb-4 pb-2'>Order summary</h1>
              <div>
                <div className='space-y-4'>
                  <div className='flex items-center justify-between gap-2'>
                    <div className='text-slate-500  text-semibold '>Restaurant Name</div>
                    <div className='text-slate-800 font-medium capitalize bg-white bg-opacity-20 rounded '>{userData != null ? userData.resturant.name : ""}</div>
                  </div>
                  <div className='flex items-center justify-between gap-2'>
                    <div className='text-slate-500  text-semibold '>Sub-total</div>
                    <div className='text-slate-800 font-medium capitalize bg-white bg-opacity-20 rounded'>₹{userData != null ? userData.total : 0}</div>
                  </div>
                  <div className='flex items-center justify-between gap-2 pb-2 border-b border-black'>
                    <div className='text-slate-500  text-semibold'>Charges</div>
                    <div className='text-slate-800 font-medium capitalize bg-white bg-opacity-20 rounded'>₹50</div>
                  </div>
                  <div className='flex items-center justify-between gap-2'>
                    <div className='text-black  text-lg font-semibold text-semibold'>Total</div>
                    <div className='text-black text-lg font-semibold capitalize bg-white bg-opacity-20 rounded'>₹{userData != null ? userData.total + 50 : 0}</div>
                  </div>
                </div>
                {userData != null && userData.status === "accept" ?
                  <div className='flex flex-col'>
                    <input type='text' maxLength={6} value={resturantOtp} onChange={(e) => setresturantOtp(e.target.value)} placeholder='Enter Resturant Otp..' className="inline-block mt-3  rounded border border-current px-4 py-[6px] text-xs uppercase   transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring mr-1" />
                    <button type='button' onClick={handleResturantOtp}>Go</button>
                  </div> : <></>
                }
                {
                  userData != null && userData.status === "on the way" ?
                    <div className='flex flex-col'>
                      <input type='text' maxLength={6} value={customerOtp} onChange={(e) => setcustomerOtp(e.target.value)} placeholder='Enter Customer Otp..' className="inline-block mt-3  rounded border border-current px-4 py-[6px] text-xs uppercase  transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring " />
                      <button onClick={handleCutomerOtp}>Go</button>
                    </div> : <></>
                }

                {
                  userData != null && userData.status === "delivered" ?
                  <div>Delivered successFully</div>:<></>
                }
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default OrderSummary