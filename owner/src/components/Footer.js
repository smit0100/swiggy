import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  return (
    <>
      <footer aria-label="Site Footer" className="relative bg-orange-200 lg:grid lg:grid-cols-5 lg:grid-rows-[200px] w-full ">
        <div className="relative block  lg:col-span-2 h-full">
          <div className='w-full h-full p-4 sm:flex justify-center items-center hidden'>
            <div className='w-1/3'><img src='https://i.ibb.co/k14SJS0/android-chrome-512x512.png' alt='logo' /></div>
            <div className='w-2/3 text-5xl font-bold  text-green-600'>FoodPoint</div>
          </div>
          <div className='w-full h-full p-4 flex justify-center items-center sm:hidden'>
            <img src='https://svgshare.com/i/rWj.svg' className='w-52' alt='logo'/>
          </div>
        </div>

        <div className="px-5 py-4 lg:col-span-3 flex  flex-col justify-between  w-full h-full">
          <div className="grid grid-cols-2">
            <div>
              <p>
                <span className="text-xs tracking-wide text-gray-500 uppercase">Call us</span>
                <div className="block text-2xl font-medium text-gray-900 hover:opacity-75 sm:text-3xl">
                  8160651512
                </div>
              </p>
            </div>

            <div className="grid  gap-4 grid-cols-2">
              <div>
                <p className="font-medium text-gray-900">Services</p>
                <nav aria-label="Footer Navigation - Services" className="mt-1">
                  <ul className="text-sm">
                    <li>
                      <Link to="/contactus" className="text-gray-700 transition hover:opacity-75">
                        Contact Us
                      </Link>
                    </li>


                  </ul>
                </nav>
              </div>

              {/* <div>
                <p className="font-medium text-gray-900">Company</p>

                <nav aria-label="Footer Navigation - Company" className="mt-6">
                  <ul className="space-y-4 text-sm">
                    <li>
                      <Link to="abc" className="text-gray-700 transition hover:opacity-75">
                        About
                      </Link>
                    </li>

                    <li>
                      <Link to="abc" className="text-gray-700 transition hover:opacity-75">
                        Meet the Team
                      </Link>
                    </li>

                    <li>
                      <Link to="abc" className="text-gray-700 transition hover:opacity-75">
                        Accounts Review
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div> */}
            </div>
          </div>

          <div className=" border-t border-black mt-5">
            <div className="pt-4 flex items-center justify-between">
              <Link to="/privacyPolicy" className="text-gray-500 transition text-sm hover:opacity-75">
                Privacy Policy
              </Link>
              <p className="text-xs text-gray-500">
                &copy;{` ${currentYear}. FoodPoint. All rights reserved.`}
              </p>
            </div>
          </div>
        </div>
      </footer>

    </>
  )
}

export default Footer