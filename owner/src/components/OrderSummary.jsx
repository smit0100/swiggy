import React from 'react'
import { useParams } from 'react-router-dom'

const OrderSummary = () => {
  return (
    <>
      <div className='bg-gradient-to-bl from-indigo-200 via-red-200 to-yellow-100 '>
        <div className='flex flex-wrap mx-5'>
          <div className='w-full sm:w-2/3 p-5'>
            <div className='mb-2 shadow-md rounded bg-white bg-opacity-40 p-3'>
              <h1 className='text-2xl font-normal capitalize border-b-2 border-black mb-4 pb-2'>Customer Details</h1>
              <div>
                <table className='table-auto border-spacing-y-3 border-separate'>
                  <tr className=''>
                    <td className='text-slate-700 text-lg text-semibold pr-5 w-1/6'>Name</td>
                    <td className='text-black capitalize bg-white w-screen bg-opacity-20 pl-2 rounded '>Dixit padsala</td>
                  </tr>
                  <tr>
                    <td className='text-slate-700 text-lg text-semibold pr-5 '>Mobile No.</td>
                    <td className='text-black capitalize bg-white w-full bg-opacity-20 pl-2 rounded'>8160651512</td>
                  </tr>
                  <tr>
                    <td className='text-slate-700 text-lg text-semibold pr-5'>E-mail</td>
                    <td className='text-black capitalize bg-white w-full bg-opacity-20 pl-2 rounded'>dixitptl116@gmail.com</td>
                  </tr>
                  <tr>
                    <td className='text-slate-700 text-lg text-semibold pr-5'>Address</td>
                    <td className='text-black capitalize bg-white w-full bg-opacity-20 pl-2 rounded'>116, Raganvdhut soc. punagam brts road surat - 395010</td>
                  </tr>
                </table>
              </div>
            </div>
            <div className='shadow-md rounded bg-white bg-opacity-40 p-3'>
              <h1 className='text-2xl font-normal capitalize border-b-2 border-black mb-4 pb-2'>Delivery Boy Details</h1>
              <div>
                <table className='table-auto border-spacing-y-3 border-separate'>
                  <tr className=''>
                    <td className='text-slate-700 text-lg text-semibold pr-5 w-1/6'>Name</td>
                    <td className='text-black capitalize bg-white w-screen bg-opacity-20 pl-2 rounded '>Thor odinson</td>
                  </tr>
                  <tr>
                    <td className='text-slate-700 text-lg text-semibold pr-5 '>Mobile No.</td>
                    <td className='text-black capitalize bg-white w-full bg-opacity-20 pl-2 rounded'>0000000001</td>
                  </tr>
                  <tr>
                    <td className='text-slate-700 text-lg text-semibold pr-5'>E-mail</td>
                    <td className='text-black capitalize bg-white w-full bg-opacity-20 pl-2 rounded'>thor@lightning.com</td>
                  </tr>
                  <tr>
                    <td className='text-slate-700 text-lg text-semibold pr-5'>Address</td>
                    <td className='text-black capitalize bg-white w-full bg-opacity-20 pl-2 rounded'>X-planet asgard in multiverse</td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
          <div className='w-full sm:w-1/3 px-5 sm:p-5'>
            <div className='shadow-md rounded h-full bg-white bg-opacity-40 p-3'>
              <h1 className='text-2xl font-normal capitalize border-b-2 border-black mb-4 pb-2'>Order summary</h1>
              <div>
                <div className='space-y-4'>
                  <div className='flex items-center justify-between gap-2'>
                    <div className='text-slate-500  text-semibold '>Product Name</div>
                    <div className='text-slate-800 font-medium capitalize bg-white bg-opacity-20 rounded '>Manshuriyan</div>
                  </div>
                  <div className='flex items-center justify-between gap-2'>
                    <div className='text-slate-500  text-semibold '>Product price</div>
                    <div className='text-slate-800 font-medium capitalize bg-white bg-opacity-20 rounded'>500</div>
                  </div>
                  <div className='flex items-center justify-between gap-2'>
                    <div className='text-slate-500  text-semibold'>Quantity</div>
                    <div className='text-slate-800 font-medium capitalize bg-white bg-opacity-20 rounded'>5</div>
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
                  <button className="inline-block mt-3 bg-transparent hover:text-white hover:bg-emerald-600 -bottom-4 font-bold  rounded border border-current px-8 py-[6px] text-xs uppercase  text-emerald-600 transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:text-emereld-500">
                    Approve Order
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