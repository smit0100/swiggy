import React from "react";
import CartPageItem from "../components/CartPageItem";

const CartPage = () => {
  return (
    <>
      <div className="w-full pb-10 relative mt-14 mx-auto z-10 right-0 h-full overflow-x-hidden transform translate-x-0 transition ease-in-out duration-700" id="checkout">
        <div className="flex md:flex-row flex-col justify-center" id="cart">
          <div className="lg:w-1/2 w-full md:pl-10 pl-4 pr-10 md:pr-4 md:py-12 py-8 bg-white overflow-y-auto overflow-x-hidden h-screen" id="scroll">
            <p className="text-5xl font-black leading-10 text-gray-800 pt-3">Cart</p>

            <CartPageItem />
            <CartPageItem />
            <CartPageItem />


          </div>
          <div className=" md:w-1/3 xl:w-1/4 w-full bg-gray-100 h-full">
            <div className="flex flex-col md:h-screen px-14 py-20 justify-between overflow-y-auto">
              <div>
                <p className="text-4xl font-black leading-9 text-gray-800">Summary</p>
                <div className="flex items-center justify-between pt-16">
                  <p className="text-base leading-none text-gray-800">Subtotal</p>
                  <p className="text-base leading-none text-gray-800">$9,000</p>
                </div>
                <div className="flex items-center justify-between pt-5">
                  <p className="text-base leading-none text-gray-800">Shipping</p>
                  <p className="text-base leading-none text-gray-800">$30</p>
                </div>
                <div className="flex items-center justify-between pt-5">
                  <p className="text-base leading-none text-gray-800">Tax</p>
                  <p className="text-base leading-none text-gray-800">$35</p>
                </div>
              </div>
              <div>
                <div className="flex items-center pb-6 justify-between lg:pt-5 pt-20">
                  <p className="text-2xl leading-normal text-gray-800">Total</p>
                  <p className="text-2xl font-bold leading-normal text-right text-gray-800">$10,240</p>
                </div>
                <button className="text-base leading-none w-full py-5 bg-gray-800 border-gray-800 border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-white">
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}

export default CartPage;
