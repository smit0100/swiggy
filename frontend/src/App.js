import './App.css';

import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Home from './pages/Home';
import Register from './components/Register';
import Login from './components/Login';
import Navbar from './components/Navbar'
import Directory from './components/Directory';
import RestaurantPage from './pages/RestaurantPage';
import PageNotFound from './components/PageNotFound';
import ForgotPassword from './components/ForgotPassword';
import SearchPage from './pages/SearchPage';
import CartPage from './pages/CartPage';
import Otp from './components/Otp';
import CheckoutPage from './pages/CheckoutPage';
import Payment from './components/StripeComponent';
import StripeComponent from './components/StripeComponent';
import Profile1 from './pages/Profile1';
import UserProfile from './pages/UserProfile';


function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Home />} >
        <Route index element={<Directory />} />
        <Route path="restaurant/:restaurantId" element={<Profile1/>} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="forgotpassword" element={<ForgotPassword />} />
        <Route path="search" element={<SearchPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="otp" element={<Otp />} />
        <Route path='profile' element={<UserProfile/>} />
        <Route path='checkout' element={<CheckoutPage />} />
        <Route path='payment' element={<StripeComponent />} />
        <Route path="userprofile" element={<UserProfile/>}/>
        {/* <Route path="profile1" element={<Profile1/>}/> */}
      </Route>
    )
  )
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
