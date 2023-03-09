import React,{useState,useEffect} from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const ENDPOINT = "http://localhost:4000";



const Home = () => {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(postition => {
      const { latitude, longitude } = postition.coords;

      console.log(latitude,longitude + "hey");
    })
  }, []);

  
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer /> 
    </div>
  )
}

export default Home