import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom'
import OrderSummaryFoodCard from './OrderSummaryFoodCard';


// import io from 'socket.io-client';
// const socket = io("http://localhost:4000");

const OrderSummary = () => {
  const { state } = useLocation();
  const [userData, setUserData] = useState(null)
  console.log(state);
  useEffect(() => {
    (async () => {
      const response = await axios.get(`http://localhost:4000/order/fetchOneOrder?id=${state}`);
      console.log(response);
      setUserData(response.data.order)
      console.log(userData);
    })();
  }, [])
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
                    <td className='text-black capitalize bg-white w-screen bg-opacity-20 pl-2 rounded '>{ userData !== null ? userData.customer?.name: "" }</td>
                  </tr>
                  <tr>
                    <td className='text-slate-700 text-lg text-semibold pr-5 '>Mobile No.</td>
                    <td className='text-black capitalize bg-white w-full bg-opacity-20 pl-2 rounded'>{ userData !== null ? userData.customer?.number: "" }</td>
                  </tr>
                  <tr>
                    <td className='text-slate-700 text-lg text-semibold pr-5'>E-mail</td>
                    <td className='text-black capitalize bg-white w-full bg-opacity-20 pl-2 rounded'>{ userData !== null ? userData.customer?.email: "" }</td>
                  </tr>
                  <tr>
                    <td className='text-slate-700 text-lg text-semibold pr-5'>Delivery Address</td>
                    <td className='text-black capitalize bg-white w-full bg-opacity-20 pl-2 rounded'>{ userData !== null ? userData.address.area + " " + userData.address.city + " " + userData.address.state + " - " + userData.address.pincode : "" }</td>
                  </tr>
                </table>
              </div>
            </div>

            {/* customer order details  */}
            <div className='shadow-md rounded bg-white bg-opacity-40 p-3 flex flex-wrap gap-2'>
              <h1 className='text-2xl w-full font-normal capitalize border-b-2 border-black mb-4 pb-2'>Customer order Details</h1>
              <OrderSummaryFoodCard />
              <OrderSummaryFoodCard />
              <OrderSummaryFoodCard />
              <OrderSummaryFoodCard />
            </div>

            {/* Restaurant details  */}
            <div className='shadow-md rounded bg-white bg-opacity-40 p-3'>
              <h1 className='text-2xl font-normal capitalize border-b-2 border-black mb-4 pb-2'>Restaurant Details</h1>
              <div>
                <table className='table-auto border-spacing-y-3 border-separate'>
                  <tr className=''>
                    <td className='text-slate-700 text-lg text-semibold pr-5 w-1/6'>Name</td>
                    <td className='text-black capitalize bg-white w-screen bg-opacity-20 pl-2 rounded '>Delight Restro & Cafe</td>
                  </tr>
                  <tr>
                    <td className='text-slate-700 text-lg text-semibold pr-5 '>Mobile No.</td>
                    <td className='text-black capitalize bg-white w-full bg-opacity-20 pl-2 rounded'>9349534534</td>
                  </tr>
                  <tr>
                    <td className='text-slate-700 text-lg text-semibold pr-5'>E-mail</td>
                    <td className='text-black capitalize bg-white w-full bg-opacity-20 pl-2 rounded'>delight@gmail.com</td>
                  </tr>
                  <tr>
                    <td className='text-slate-700 text-lg text-semibold pr-5'>Shipping Address</td>
                    <td className='text-black capitalize bg-white w-full bg-opacity-20 pl-2 rounded'>B-12 Row house Apartment Rander surat - 440023</td>
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
                    <div className='text-slate-800 font-medium capitalize bg-white bg-opacity-20 rounded '>Delight Restro & Cafe</div>
                  </div>
                  <div className='flex items-center justify-between gap-2'>
                    <div className='text-slate-500  text-semibold '>Sub-total</div>
                    <div className='text-slate-800 font-medium capitalize bg-white bg-opacity-20 rounded'>500</div>
                  </div>
                  <div className='flex items-center justify-between gap-2 pb-2 border-b border-black'>
                    <div className='text-slate-500  text-semibold'>Charges</div>
                    <div className='text-slate-800 font-medium capitalize bg-white bg-opacity-20 rounded'>50</div>
                  </div>
                  <div className='flex items-center justify-between gap-2'>
                    <div className='text-black  text-lg font-semibold text-semibold'>Total</div>
                    <div className='text-black text-lg font-semibold capitalize bg-white bg-opacity-20 rounded'>550</div>
                  </div>
                </div>
                <div>
                  <button className="inline-block mt-3 bg-transparent hover:text-white hover:bg-emerald-600 -bottom-4 font-bold  rounded border border-current px-4 py-[6px] text-xs uppercase  text-emerald-600 transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:text-emereld-500 mr-1">
                    Approve Order
                  </button>
                  <button className="inline-block mt-3 bg-transparent hover:text-white hover:bg-red-600 -bottom-4 font-bold  rounded border border-current px-4 py-[6px] text-xs uppercase  text-red-600 transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:text-emereld-500">
                    Reject Order
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default OrderSummary