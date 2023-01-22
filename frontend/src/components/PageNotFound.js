import React from 'react'
import { Link } from 'react-router-dom'

const PageNotFound = () => {
  return (
    <>

      {/* <section className="bg-black w-screen h-screen z-10">
        <div className="containerr flex justify-center items-center h-screen">
          <div className="flex">
            <div className="w-full px-4">
              <div className="mx-auto max-w-[400px] text-center">
                <h2 className="font-bold text-white mb-2 text-[50px] sm:text-[80px] md:text-[100px] leading-none ">404</h2>
                <h4 className="text-white font-semibold text-[22px] leading-tight mb-3">Oops! That page can't be found</h4>
                <p className="text-lg text-white mb-8">The page you are looking for it maybe deleted</p>
                <Link to='/' className="text-base font-semibold text-white inline-block text-center border border-white rounded-lg px-8  py-3 hover:text-black hover:bg-white hover:text-primary transition-all ">Go to Home</Link>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      <main className="relative h-screen overflow-hidden bg-white">
        <div className="container bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-gray-700 via-gray-900 to-black z-10 flex items-center justify-between h-screen px-6 pt-32 mx-auto md:pt-0">
          <div className="container relative flex flex-col-reverse items-center justify-between px-6 mx-auto lg:flex-row">
            <div className="w-full mb-16 text-center md:mb-8 lg:text-left">
              <h1 className="mt-12 font-sans text-5xl font-light text-center text-gray-300 lg:text-left lg:text-8xl md:mt-0">
                Sorry, this page isn&#x27;t found.
              </h1>
              <Link to='/' className="px-2 py-2 mt-28 top-10 relative text-lg font-normal rounded-md transition duration-200 ease-in bg-white/80 border-2 border-gray-700 w-36 hover:bg-white/50 hover:text-white focus:outline-none">
                Go back home
              </Link>
            </div>
            <div className="relative block w-full max-w-md mx-auto md:mt-0 lg:max-w-2xl">
              <img src="./svg/pagenotfound.svg" alt='404' />
            </div>
          </div>
        </div>
      </main>

    </>
  )
}

export default PageNotFound