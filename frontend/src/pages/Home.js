import axios from 'axios'
import React,{useState} from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { userData } from '../redux/user/userSlice';

import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import StripeCheckout from 'react-stripe-checkout';


const  makePayment = async (token)  =>  {
  const body = {
    token,
    product: {
      name:'first product'
    }
    
  }
  
  const header = {
    "Content-Type":"application/json"
  }

  const response =  axios.post(`http://localhost:4000/payment`, {
    headers: header,
    body
  })

  console.log(response);

  console.log("response status",response.status);


}

const Home = () => {
  const [user, setUser] = useState(null);
  const dispatch = useDispatch(); 

  useEffect(() => {
    console.log('hey');
    (async () => {
      try {
        
        const data = await axios.get('http://localhost:4000/auth/login/success', { withCredentials: true });
        console.log(data)
        dispatch(userData(data.data.user))
      } catch (e) {
        console.log(e);
      }
     })()
  },[])
  return (
    <>
    <Navbar/>
      <StripeCheckout
        stripeKey={process.env.REACT_APP_PUBLIC_KEY_PAYMENT}
        token={makePayment}
        namee="buy product"
        amount={100000}
      >
    
        </StripeCheckout>
      <Outlet />
      <Footer/>

     
    </>

  )
}

export default Home