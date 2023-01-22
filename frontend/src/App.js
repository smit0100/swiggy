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


function App() {
  const router=createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Home/>} >
        <Route index element={<Directory/>}/>
        <Route path="restaurant/:restaurantId" element={<RestaurantPage/>}/>
        <Route path="register" element={<Register/>}/>
        <Route path="login" element={<Login/>}/>
        <Route path="forgotpassword" element={<ForgotPassword />}/>
        <Route path="search" element={<SearchPage />} />
        <Route path="cart" element={<CartPage/>} />
        <Route path="otp" element={<Otp/>}/>
        <Route path='profile' element={<h1>profile</h1>} />
        <Route path='checkout' element={<CheckoutPage/>}/>
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
