import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userData } from '../redux/user/userSlice';

import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

import { cartData } from "../redux/cart/cartSlice";





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

  useEffect(() => {
    (async () => {
      try {
        const data = await axios.get(`${process.env.REACT_APP_BASEURL}/auth/login/success`, { withCredentials: true });
        if (data.status === 201) {
          const isExist = await axios.get(`${process.env.REACT_APP_BASEURL}/user/isExist`, { withCredentials: true })
          dispatch(userData(isExist.data.user))
        } else {
          dispatch(userData(data.data.user))
        }
      } catch (e) {
        console.log(e);
      }
    })()
  }, [])



  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}

export default Home