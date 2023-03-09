import axios from 'axios'
import React,{useState} from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { userData } from '../redux/user/userSlice';

import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'




const Home = () => {
  const [user, setUser] = useState(null);
  const dispatch = useDispatch(); 

  useEffect(() => {
    
    (async () => {
      try {
        
        const data = await axios.get(`${process.env.REACT_APP_BASEURL}/auth/login/success`, { withCredentials: true });
        console.log('this is something');
        console.log(data)
        
       
        if (data.status === 201) {
          const isExist = await axios.get(`${process.env.REACT_APP_BASEURL}/user/isExist`, { withCredentials: true })
          console.log(isExist + "check this exist");
          dispatch(userData(isExist.data.user))
        } else {
          dispatch(userData(data.data.user))
        }

    


        
      } catch (e) {
        console.log(e);
      }
     })()
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