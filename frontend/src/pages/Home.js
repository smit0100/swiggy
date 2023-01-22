import React from 'react'

import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'


const Home = () => {
  return (
    <>
    <Navbar/>
      <div className='h-screen absolute top-0 left-0 w-[98.70vw]  z-0  '>
      <Outlet />
      <Footer/>

      </div>
    </>

  )
}

export default Home