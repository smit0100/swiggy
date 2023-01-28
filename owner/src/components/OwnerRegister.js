import React from 'react'

const OwnerRegister = () => {
  return (
    <div className='mx-72 flex flex-wrap'>
      <div className='w-full sm:w-1/4'>
        <ul>
          <li>list 1  </li>
          <li>list 2</li>
        </ul>
      </div>
      <div className='w-full sm:w-3/4'>
        <h2 className='text-4xl font-normal pb-10'>Restaurant Information</h2>
        <div className='p-5 border-[1.5px] shadow-md shadow-black'>
          <h2 className='text-2xl font-semibold'>Restaurant Details</h2>
          <h3>Name, Address and location</h3>
          <form className=''>
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
          </form>

        </div>
      </div>

    </div>
  )
}

export default OwnerRegister