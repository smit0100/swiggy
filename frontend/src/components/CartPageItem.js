import axios from 'axios'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { cartData } from '../redux/cart/cartSlice';
const CartPageItem = ({ item }) => {
    const isUser = useSelector(state => state.userData.user);
    
    const dispatch = useDispatch()

    
    const navigate = useNavigate()
    const increase = async (e) => {
        e.preventDefault()
            const response = await axios.patch(`${process.env.REACT_APP_BASEURL}/cart/addQuantity`, {
                userId: isUser._id,
                itemId: item._id,
                productId:item.product._id
            })
        dispatch(cartData(response.data.data.cart)) 
        
    }
    const decrease = async (e) => {
        e.preventDefault()

         
            console.log('hey');
            const response = await axios.patch(`${process.env.REACT_APP_BASEURL}/cart/subtractQuantity`, {
                userId: isUser._id,
                itemId: item._id,
                productId: item.product._id

            })
            console.log(response);
    dispatch(cartData(response.data.data.cart)) 

       
    }

    const removeProduct = async (e) => {
        e.preventDefault()
        const response = await axios.patch(`${process.env.REACT_APP_BASEURL}/cart/remove`, {
            userId: isUser._id,
            itemId: item._id,
            price:item.product.price,
            quantity:item.quantity
        })
    dispatch(cartData(response.data.data.cart)) 
    }
    // console.log(item)
    return (
        <>
            {/* <div className="md:flex items-center mt-14 py-8 border-t border-gray-200">
                <div className="w-1/4">
                    <img src="https://cdn.pixabay.com/photo/2021/07/19/16/04/pizza-6478478_960_720.jpg" alt="restro food" className="w-full h-full object-center object-cover" />
                </div>
                <div className="md:pl-3 md:w-3/4">
                    <p className="text-xs leading-3 text-gray-800 md:pt-0 pt-4">Veg</p>
                    <div className="flex items-center justify-between w-full pt-1">
                        <p className="text-base font-black leading-none text-gray-800">{item.product.name}</p>
                        <div className="flex gap-4 py-2 px-1 border  text-black border-gray-200 mr-6 focus:outline-none">
                            <button className='rounded-md' onClick={decrease}>-</button>
                            <div>{ item.quantity}</div>
                            <button onClick={increase}>+</button>
                        </div>
                    </div>
                    <p className="text-xs leading-3 text-gray-600 py-2">Size: Normal</p>
                    <p className="w-96 text-xs leading-3 text-gray-600">Description</p>
                    <div className="flex items-center justify-between pt-5 pr-6">
                        <div className="flex itemms-center">
                            <p className="text-xs leading-3 underline text-gray-800 cursor-pointer">Add to favorites</p>
                            <button className="text-xs leading-3 underline text-red-500 pl-5 cursor-pointer" onClick={removeProduct}>Remove</button>
                        </div>
                        <p className="text-base font-black leading-none text-gray-800">{ item.quantity * item.product.price}</p>
                    </div>
                </div>
            </div> */}
            <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
          <img src="https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1131&q=80" alt="product-image" className="w-full rounded-lg sm:w-40" />
          <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
            <div className="mt-5 sm:mt-0">
                        <h2 className="text-lg font-bold text-gray-900">{ item.product.name}</h2>
              <p className="mt-1 text-xs text-gray-700">36EU - 4US</p>
            </div>
            <div className="mt-4 flex justify-between im sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
              <div className="flex items-center border-gray-100">
                <button  onClick={decrease} className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"> - </button>
                            <div className="h-8 w-7 border bg-white text-center text-lg " type="number" >{item.quantity}</div>
                <button onClick={increase} className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"> + </button>
              </div>
              <div className="flex items-center space-x-4">
                            <p className="text-sm">{ item.quantity * item.product.price}</p>
                            <button onClick={removeProduct}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                                </button>
              </div>
            </div>
          </div>
        </div>
        </>
    )
}

export default CartPageItem