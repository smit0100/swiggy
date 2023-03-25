import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Sidebar from './Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { sidebarToggle } from '../redux/sidebar/sidebarSlice';
import { cartData } from '../redux/cart/cartSlice';
import axios from 'axios';
const Navbar = () => {
  const [navbar, setNavbar] = useState(false);
  // const [flyer, setFlyer] = React.useState(false);
  // const [flyerTwo, setFlyerTwo] = React.useState(false);


  const dispatch = useDispatch();
  const toggle = useSelector(state => state.sidebarToggle.sidebar);
  const isUser = useSelector(state => state.userData.user);
  const cart = useSelector(state => state.cartData.cart)

  let qty=0;
  if(cart!=null){
    cart.products.map(product=>{
      qty+=product.quantity
    })
  }


 

  return (
    <>
      <nav className="w-full relative h-1/6 z-20 bg-white/10 shadow">
        <div className="justify-between px-4 lg:max-w-screen md:items-center md:flex md:px-8">
          <div>
            <div className="flex items-center justify-between py-3 md:py-5 md:block">
              <Link to="/">
                <img src='./svg/foodpoint.svg' className="w-14 h-auto" />
              </Link>
              <div className="md:hidden">
                <button
                  className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                  onClick={() => setNavbar(!navbar)}
                >
                  {navbar ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
          <div>
            <div
              className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${navbar ? "block" : "hidden"
                }`}
            >
              <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
                {/* <li className="text-gray-600 hover:text-blue-600">
                  <button className=" py-2 pl-3 pr-4 text-gray-600 text-lg  " onClick={() => dispatch(sidebarToggle())}>
                    <i className="fa-solid fa-location-dot pr-3"></i>Location
                  </button>
                </li> */}
                <li className="text-gray-600 hover:text-blue-600">

                  <Link to="/search"><i className="fa-solid fa-magnifying-glass pr-3"></i>Search</Link>
                </li>
                
                <li className="text-gray-600 hover:text-blue-600">
                  <Link to="/contactus"><i className="fa-sharp fa-solid fa-circle-info pr-3"></i>Contact Us</Link>
                </li>
                {
                  isUser ? <>
                    <li>
                      <Link to="/profile" className="block py-2 pl-3 pr-4  rounded text-gray-600 text-lg">
                        <i className="fa-regular fa-user pr-3"></i>{isUser != null ? isUser.name : "profile"}
                      </Link>
                    </li>
                    {/* <li>
                    <Link to="/cart" className="block py-2 pl-3 pr-4 rounded text-gray-600 text-lg"><i className="fa-sharp fa-solid fa-bag-shopping pr-3 text-2xl relative"><span className='text-xs text-white absolute right-4 top-3'>12</span></i>cart
                    </Link>
                  </li> */}
                    <li>
                      <Link to="/cart" className=" w-16 rounded text-gray-600 text-lg flex justify-evenly hover:text-blue-800">
                        <div className='flex justify-center items-end relative w-7 h-7'>
                          <img alt="veg" className="w-full h-full absolute" src="./svg/bag.svg" />
                          <span className='text-xs text-gray-700 font-extrabold mb-0.5'>{qty}</span>
                        </div>
                        cart
                      </Link>
                    </li>


                  </> :
                    <li className="text-gray-600 hover:text-blue-600">
                      <Link to="/login"><i className="fa-regular fa-user pr-3"></i>Login</Link>
                    </li>
                }
              </ul>
            </div>
          </div>
        </div>
      </nav>
      <Sidebar direction={"ltr"} />
    </>

  );
 };


export default Navbar