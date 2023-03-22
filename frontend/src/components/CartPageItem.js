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
            console.log(response.data.data);
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
           
            <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
          <img src={`${item?.product.imageUrl}`} alt="product-image" className="w-full rounded-lg sm:w-40" />
          <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
            <div className="mt-5 sm:mt-0">
                        <h2 className="text-lg font-bold text-gray-900">{ item?.product.name}</h2>
              <p className="mt-1 text-xs text-gray-700">{item?.product.description}</p>
            </div>
            <div className="mt-4 flex justify-between im sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
              <div className="flex items-center border-gray-100">
                <button  onClick={decrease} className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"> - </button>
                            <div className="h-8 w-7 border bg-white text-center text-lg " type="number" >{item?.quantity}</div>
                <button onClick={increase} className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"> + </button>
              </div>
              <div className="flex items-center space-x-4">
                            <p className="text-sm">{ item.quantity * item.product.price}</p>
                            <button onClick={removeProduct}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
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