import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import MainNav from '../components/Nav/MainNav'

const Home = () => {
  return (
    <div>
      <MainNav />
      <Outlet />
      <Footer /> 
    </div>
  )
}

export default Home