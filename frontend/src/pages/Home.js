import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

import { cartData } from "../redux/cart/cartSlice";
import MainNav from '../components/Nav/MainNav'

const Home = () => {
  const dispatch = useDispatch();
  const isUser = useSelector(state => state.userData.user);


  useEffect(() => {
    if (isUser != null) {
      (async () => {
        try {
          const response = await axios.get(`${process.env.REACT_APP_BASEURL}/cart/${isUser._id}`);
          dispatch(cartData(response.data.data.cart))
        } catch (err) {
          console.log(err);
        }
      })()
    }
  }, [isUser])

  return (
    <>
    <div className='bg-orange-100'>
      <MainNav />
      <Outlet />
      <Footer />
    </div>
    </>
  )
}

export default Home