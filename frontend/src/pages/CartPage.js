import React, { useEffect } from "react";
import CartPageItem from "../components/CartPageItem";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useState } from "react";
import { cartData } from "../redux/cart/cartSlice";

const CartPage = () => {
  // const [loading, setLoading] = useState(false);
  // const navigate = useNavigate();

  const dispatch = useDispatch()

  const isUser = useSelector(state => state.userData.user);
  const cart = useSelector(state => state.cartData.cart)

  useEffect(() => {

    (async () => {
      const response = await axios.get(`${process.env.REACT_APP_BASEURL}/cart/${isUser._id}`);
      // console.log(response.data.data.cart);
      console.log(response.data.data);
      dispatch(cartData(response.data.data.cart))
    })()
  }, [])

  return (
    <div>
      <div className="h-full bg-gray-100 pt-20">
        <h1 className="mb-10 text-center text-2xl font-bold uppercase"> {cart != null ? cart.products.length === 0 ? "your cart is empty" : "cart items " : ''}</h1>
        <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
          <div className="rounded-lg md:w-2/3">
            {
              cart != null ? cart.products.length === 0 ? <> <img className="p-12" src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/2xempty_cart_yfxml0" />    </> : '' : ''
            }
            {
              cart != null ? cart.products.map(item => <CartPageItem item={item} />) : ""
            }

          </div>
          {cart != null && cart.products.length === 0 ? <></> :
            <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
              <div className="mb-2 flex justify-between">
                <p className="text-gray-700">Subtotal</p>
                <p className="text-gray-700">₹{cart != null ? cart.total : ''}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-700">Shipping charges</p>
                <p className="text-gray-700">₹50</p>
              </div>
              <hr className="my-4" />
              <div className="flex justify-between">
                <p className="text-lg font-bold">Total</p>
                <div className="">
                  <p className="mb-1 text-lg font-bold">{cart != null ? cart.total : ''}</p>
                </div>
              </div>
              <Link to="/checkout">
                <button className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">Check out</button>
              </Link>
            </div>}

        </div>
      </div>
    </div>
    // <>
    //   <div className="w-full pb-10 relative mt-14 mx-auto z-10 right-0 h-full overflow-x-hidden transform translate-x-0 transition ease-in-out duration-700" id="checkout">
    //     <div className="flex md:flex-row flex-col justify-center" id="cart">
    //       <div className="lg:w-1/2 w-full md:pl-10 pl-4 pr-10 md:pr-4 md:py-12 py-8 bg-white overflow-y-auto overflow-x-hidden h-screen" id="scroll">
    //         <p className="text-5xl font-black leading-10 text-gray-800 pt-3">Cart</p>
    //         {
    //           cart!=null ? cart.products.map(item => <CartPageItem item={item} />) : ""
    //         }
    //       </div>
    //       <div className=" md:w-1/3 xl:w-1/4 w-full bg-gray-100 h-full">
    //         <div className="flex flex-col md:h-screen px-14 py-20 justify-between overflow-y-auto">
    //           <div>
    //             <p className="text-4xl font-black leading-9 text-gray-800">Summary</p>
    //             <div className="flex items-center justify-between pt-16">
    //               <p className="text-base leading-none text-gray-800">Subtotal</p>
    //               <p className="text-base leading-none text-gray-800">$9,000</p>
    //             </div>
    //             <div className="flex items-center justify-between pt-5">
    //               <p className="text-base leading-none text-gray-800">Shipping</p>
    //               <p className="text-base leading-none text-gray-800">$30</p>
    //             </div>
    //             <div className="flex items-center justify-between pt-5">
    //               <p className="text-base leading-none text-gray-800">Tax</p>
    //               <p className="text-base leading-none text-gray-800">$35</p>
    //             </div>
    //           </div>
    //           <div>
    //             <div className="flex items-center pb-6 justify-between lg:pt-5 pt-20">
    //               <p className="text-2xl leading-normal text-gray-800">Total</p>
    //               <p className="text-2xl font-bold leading-normal text-right text-gray-800">{ cart!=null ? cart.total: ''}</p>
    //             </div>
    //             <Link to="/checkout" className="text-base leading-none w-full py-5 bg-gray-800 border-gray-800 border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-white">
    //               Checkout
    //             </Link>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>

    // </>
  );
}

export default CartPage;
