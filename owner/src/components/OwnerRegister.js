import React from 'react'

const OwnerRegister = () => {
  return (
    <div className='mx-10 sm:mx-20 md:mx-28 lg:mx-40 xl:mx-72 flex flex-wrap'>
      <div className='w-full sm:w-1/4'>
        <ul>
          <li>list 1  </li>
          <li>list 2</li>
        </ul>
      </div>
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

            <div className="relative flex w-full flex-wrap items-stretch mb-3 pt-2">
              <span className="z-10 h-full leading-snug font-normal  text-center text-slate-700 absolute bg-transparent rounded text-base items-center justify-center w-8 px-3 py-3">
                +91
              </span>
              <input type="text" id='number' placeholder="Enter Your Number" className="px-3 py-3 placeholder-slate-300 text-slate-600 relative bg-white rounded text-sm border border-slate-300 outline-none focus:outline-none focus:ring w-3/6 md:w-4/6 pl-12" />
              <button className=' ml-3 inline-block bg-white hover:text-white hover:bg-blue-600 font-bold  rounded border border-current px-10 text-center py-[6px] text-xs uppercase  text-blue-600 transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:text-blue-500'>Verify</button>
            </div>
            <h2 className='text-center'>or want to share  landline number</h2>
            <div className="relative flex w-full flex-wrap items-stretch mb-3 pt-2">
              <span className="z-10 h-full leading-snug font-normal  text-center text-slate-700 absolute bg-transparent rounded text-base items-center justify-center w-8 px-3 py-3">
                +91
              </span>
              <input type="text" id='number' placeholder="STD code" className="px-3 py-3 placeholder-slate-300 text-slate-600 relative bg-white text-sm border-y border-l border-slate-300 outline-none focus:outline-none focus:ring w-2/6 pl-12" />
              <input type="text" id='number' placeholder="Landline number" className="px-3 py-3 placeholder-slate-300 text-slate-600 relative bg-white rounded-r text-sm border  border-slate-300 outline-none focus:outline-none focus:ring w-2/6 pl-5" />
              <button className=' sm:ml-3 inline-block bg-white hover:text-white w-28 sm:w-fit hover:bg-blue-600 font-bold  rounded border border-current px-10 text-center py-[6px] text-xs uppercase  text-blue-600 transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:text-blue-500'>Verify</button>
            </div>
          </div>
        </form>

      </div>

    </div>
  )
}

export default OwnerRegister