import React from 'react'

const CartPageItem = () => {
    return (
        <>
            <div className="md:flex items-center mt-14 py-8 border-t border-gray-200">
                <div className="w-1/4">
                    <img src="https://cdn.pixabay.com/photo/2021/07/19/16/04/pizza-6478478_960_720.jpg" alt="restro food" className="w-full h-full object-center object-cover" />
                </div>
                <div className="md:pl-3 md:w-3/4">
                    <p className="text-xs leading-3 text-gray-800 md:pt-0 pt-4">Veg</p>
                    <div className="flex items-center justify-between w-full pt-1">
                        <p className="text-base font-black leading-none text-gray-800">Cheese pizza</p>
                        <select className="py-2 px-1 border  text-black border-gray-200 mr-6 focus:outline-none">
                            <option>01</option>
                            <option>02</option>
                            <option>03</option>
                        </select>
                    </div>
                    <p className="text-xs leading-3 text-gray-600 py-2">Size: Normal</p>
                    <p className="w-96 text-xs leading-3 text-gray-600">Description</p>
                    <div className="flex items-center justify-between pt-5 pr-6">
                        <div className="flex itemms-center">
                            <p className="text-xs leading-3 underline text-gray-800 cursor-pointer">Add to favorites</p>
                            <p className="text-xs leading-3 underline text-red-500 pl-5 cursor-pointer">Remove</p>
                        </div>
                        <p className="text-base font-black leading-none text-gray-800">₹599</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CartPageItem