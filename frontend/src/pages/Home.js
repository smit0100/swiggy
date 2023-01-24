import axios from 'axios'
import React,{useState} from 'react'
import { useEffect } from 'react'

import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'



const Home = () => {
  const [user, setUser] = useState(null);
  const getUser = async () => {
    try {
      const { data } = await axios.get('http://localhost:4000/auth/login/success', { withCredentials: true });
      setUser(data.user._json);
      console.log(data);
    } catch (e) {
      console.log(e);
    }
   
  }

  useEffect(() => {
    getUser();
  },[])
  return (
    <>
    <Navbar/>
    
      <Outlet />
      <Footer/>

     
    </>

  )
}

export default Home