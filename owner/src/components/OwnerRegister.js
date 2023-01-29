import React, { useState } from 'react'

const OwnerRegister = () => {
  const [tabOpen, setTabOpen] = useState(1)
  return (
    <div className='mx-10 sm:mx-20 md:mx-28 lg:mx-40 xl:mx-72 flex flex-wrap'>
      <div className='w-full sm:w-1/4 p-5 shadow-lg rounded'>
        <h1 className='text-xl pb-5'>1. Create your restaurant page</h1>
        <ul className='space-y-4'>
          <li onClick={() => setTabOpen(1)} className='text-lg font-normal cursor-pointer'>Restaurant information<br /><span className='text-sm text-slate-500'>Restaurant name,address,contact no.,owner details</span></li>
          <li onClick={() => setTabOpen(2)} className='text-lg font-normal cursor-pointer'>Restaurant Type & Timing <br /> <span className='text-sm text-slate-500'>Establishment & cruisine type. opening hours</span></li>
          <li onClick={() => setTabOpen(3)} className='text-lg font-normal cursor-pointer'>Upload Images <br /> <span className='text-sm text-slate-500'>Menu,restaurant,food images</span></li>
        </ul>
      </div>

      {/* Restaurant information  */}
      {
        tabOpen === 1 ?
          <div className='w-full sm:w-3/4'>
            <h2 className='text-4xl font-normal pb-10'>Restaurant Information</h2>

            <form className=''>
              <div className='p-5 border-[1.5px] shadow-md shadow-black'>
                <h2 className='text-2xl font-semibold'>Restaurant Details</h2>
                <h3 className='text-slate-500'>Name, Address and location</h3>
                <div className='pt-10 space-y-10'>
                  <input type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Restaurant name" />
                  <input type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Restaurant complete address" />
                </div>
                <div className='pt-10 '>
                  <h1 className='text-xl'>Restaurant address details</h1>
                  <h1>Address details are basis the restaurant location mentioned above</h1>
                  <div className='space-y-5 pt-5'>

                    <div className='gap-5 flex'>
                      <input type="text"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-1/2 ease-linear transition-all duration-150"
                        placeholder="Country" />
                      <input type="text"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-1/2 ease-linear transition-all duration-150"
                        placeholder="Pincode" />
                    </div>
                    <div className='flex gap-5'>
                      <input type="text"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-1/2 ease-linear transition-all duration-150"
                        placeholder="City" />
                      <input type="text"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-1/2 ease-linear transition-all duration-150"
                        placeholder="State" />
                    </div>
                  </div>
                </div>
              </div>
              <div className='p-5 border-[1.5px] shadow-md shadow-black mt-4 relative'>
                <h2 className='text-2xl font-semibold'>Contact number at restaurant</h2>
                <h3 className='text-slate-500'>Your Customer will call on this number for general enquiries</h3>
                <div className="relative flex w-full flex-wrap items-stretch mb-3 pt-8">
                  <span className="z-10 h-full leading-snug font-normal text-center flex  text-slate-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                    <i className="fas fa-user"></i>
                  </span>
                  <input type="text" id='name' placeholder="Owner full name" className="px-3 py-3 placeholder-slate-300 text-slate-600 relative bg-white rounded text-sm border border-slate-300 outline-none focus:outline-none focus:ring w-full pl-10" />
                </div>
                <div className="relative flex w-full flex-wrap items-stretch mb-3 pt-2">
                  <span className="z-10 h-full leading-snug font-normal  text-center text-slate-700 absolute bg-transparent rounded text-base items-center justify-center w-8 px-3 py-3">
                    +91
                  </span>
                  <input type="text" id='number' placeholder="Enter Your Number" className="px-3 py-3 placeholder-slate-300 text-slate-600 relative bg-white rounded text-sm border border-slate-300 outline-none focus:outline-none focus:ring w-3/6 md:w-4/6 pl-12" />
                  <button className=' ml-3 inline-block bg-white hover:text-white hover:bg-blue-600 font-bold  rounded border border-current px-10 text-center py-[6px] text-xs uppercase  text-blue-600 transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:text-blue-500'>Verify</button>
                </div>
                <div className="relative flex w-full flex-wrap items-stretch mb-3 pt-2">
                  <span className="z-10 h-full leading-snug font-normal  text-center text-slate-700 absolute bg-transparent rounded text-base items-center justify-center w-8 px-3 py-3">
                    @
                  </span>
                  <input type="text" id='number' placeholder="Enter Your Email" className="px-3 py-3 placeholder-slate-300 text-slate-600 relative bg-white rounded text-sm border border-slate-300 outline-none focus:outline-none focus:ring w-3/6 md:w-4/6 pl-12" />

                  <button className=' sm:ml-3 inline-block bg-white hover:text-white w-28 sm:w-fit hover:bg-blue-600 font-bold  rounded border border-current px-10 text-center py-[6px] text-xs uppercase  text-blue-600 transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:text-blue-500'>Verify</button>
                </div>
                <div className='flex justify-end pt-12'>
                  <button className='inline-block  bg-white hover:text-white border border-current hover:bg-blue-600 font-bold  rounded  px-10  py-[10px] text-xs uppercase  text-blue-600 transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:text-blue-500'>Next {'>'}</button>
                </div>

              </div>
            </form>

          </div> : <></>
      }

      {/* Restaurant type & timing  */}
      {
        tabOpen === 2 ?
          <div className='w-full sm:w-3/4'>
            <h2 className='text-4xl font-normal pb-10'>Restaurant Type & Timings</h2>

            <form>
              <div className='shadow-md p-5'>
              <h2 className='text-2xl font-semibold'>Establishment type</h2>
                <h3 className='text-slate-500'>Select most relevant category for your restaurant type</h3>
              </div>
            </form>
          </div>
          : <></>
      }

      {/* Upload images  */}
      {
        tabOpen === 3 ?
          <div className='w-full sm:w-3/4'>
            Restaurant food images
          </div> : <></>
      }

    </div>
  )
}

export default OwnerRegister