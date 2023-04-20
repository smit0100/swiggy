import React, { useEffect } from "react";
import CartPageItem from "../components/CartPageItem";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { cartData } from "../redux/cart/cartSlice";

const CartPage = () => {
  
  const dispatch = useDispatch()

  const isUser = useSelector(state => state.userData.user);
  const cart = useSelector(state => state.cartData.cart)

  useEffect(() => {
    (async () => {
      if (isUser != null) {
        try {
          const response = await axios.get(`${process.env.REACT_APP_BASEURL}/cart/${isUser._id}`);
          // console.log(response.data.data);
          dispatch(cartData(response.data.data.cart))
        }
        catch (err) {
          console.log(err);
        }
      }
    })()
  }, [])

  return (
    <div className="pb-4 min-h-screen">
      <div className="h-full bg-inherit pt-24">
        <h1 className="mb-10 text-center text-2xl font-bold uppercase"> {cart != null ? cart.products.length === 0 ? "your cart is empty" : "cart items " : ''}</h1>
        <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
          <div className="rounded-lg md:w-2/3">
            {
              cart != null ? cart.products.length === 0 ? <> <img className="p-12" alt="img" src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/2xempty_cart_yfxml0" />    </> : '' : ''
            }
            {
              cart != null ? cart.products.map(item => <CartPageItem item={item} />) : ""
            }

          </div>
          {cart != null && cart.products.length === 0 ? <></> :
            <div className="mt-6 h-full rounded-lg border bg-orange-200 p-6  shadow-md md:mt-0 md:w-1/3">
              <div className="mb-2 flex justify-between">
                <p className="text-gray-700">Subtotal</p>
                <p className="text-gray-700">₹{cart != null ? cart.total : ''}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-700">Shipping charges</p>
                <p className="text-gray-700">₹0</p>
              </div>
              <hr className="my-4 border-black" />
              <div className="flex justify-between">
                <p className="text-lg font-bold">Total</p>
                <div className="">
                  <p className="mb-1 text-lg font-bold">{cart != null ? "₹"+cart.total : ''}</p>
                </div>
              </div>
              <Link to="/checkout" >
                <button className="w-full text-center hover:bg-black text-black hover:text-white p-2 px-5 rounded-2xl duration-200 border border-black mt-5 hover:scale-95">Check out</button>
              </Link>
            </div>}

        </div>
      </div>
    </div>
  );
}

export default CartPage;
