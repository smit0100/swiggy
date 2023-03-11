import './App.css';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Home from './pages/Home';
import Directory from './components/Directory';
import Login from './components/Login';
import Register from './components/Register';
import ForgotPassword from './components/ForgotPassword';
import Otp from './components/Otp'; 
 
import { messaging } from './fierbase';
import { useEffect } from 'react';
import { getToken } from 'firebase/messaging';
import Status from './components/Status';

function App() {

  async function requestPermisson() {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      // messaging.app
      const token = await getToken(messaging, { vapidKey: "BBz7_CTHfESYDINMZC8fILRoIhIcEHl3vILZcJEAZgezPskthzQI35n2O1EpPTMakgnVbH1e7ObZJldNQwO0Ezg" })
      console.log(token);
    } else if (permission === 'denied') {
      alert('you denined for the notification');

    }
  }

  useEffect(() => {
    requestPermisson()
  },[])
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Home/>} >
        <Route index element={<Directory />}/>
        <Route path='login' element={<Login/>}/>
        <Route path="register" element={<Register />} />
        <Route path="forgotpassword" element={<ForgotPassword />} />
        <Route path="otp" element={<Otp />} />
        <Route path="status" element={<Status/>}/>
      </Route>
    )
  )

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
