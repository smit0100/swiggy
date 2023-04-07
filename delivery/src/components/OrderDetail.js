import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import dateFormat from 'dateformat';
import Loader from './Loader';
import { setCurrentColor } from '../redux/user/userSlice';

const OrderDetail = () => {
  const [isLoading, setIsLoading] = useState(false)
  // const [order, setOrder] = useState([])
  const owner = useSelector(state => state.userData.user)
  const navigate = useNavigate()

  const [orderData,setOrderData]=useState(null)
  const user=useSelector(state=>state.userData.user)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setCurrentColor("black"))
  }, [])
  useEffect(() => {
    if(user!=null){
    (
      async () => {
        setIsLoading(true)
        const response = await axios.get(`http://localhost:4000/courier/fetchall/?id=${user._id}`)
        console.log(response.data);
        setOrderData(response.data.courierBoy);
        setIsLoading(false)
      }
    )();
    }
  }, [])

  return (
    <>
      {
        isLoading ? <Loader /> : <>
          {
            <div className='mx-5 pt-24 '>
              <div className='p-5 shadow-md'>
                <h1 className="text-3xl font-bold mb-4">Order Summary</h1>
                <div className="overflow-x-auto">
                  <table className="table w-full whitespace-no-wrap">
                    <thead>
                      <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                        <th className="py-3 px-6 text-left">Order Id</th>
                        <th className="py-3 px-6 text-left">Customer Name</th>
                        <th className="py-3 px-6 text-left">Total Price</th>
                        {/* <th className="py-3 px-6 text-left">Order Date</th> */}
                        <th className="py-3 px-6 text-left">Status</th>
                      </tr>
                    </thead>

                    <tbody className="text-gray-600 text-sm font-light">
                      {orderData!=null && orderData.order.map((order) => (
                        <tr
                          key={order && order._id}
                          //  ${selectedOrderId === order._id ? "bg-blue-100" : ""}`
                          className={`border-b border-gray-200 hover:bg-gray-100`}
                          onClick={() => { navigate('/ordersummary', { state: order._id });  }}>
                          <td className="py-3 px-6 text-left">{order?._id}</td>
                          <td className="py-3 px-6 text-left">{order?.customer.name}</td>
                          <td className="py-3 px-6 text-left">₹{order?.total}</td>
                          {/* <td className="py-3 px-6 text-left">{order?.orderDate}</td> */}
                          <td className="py-3 px-6 text-left">
                          <span className={`py-1 px-3 rounded-full text-xs ${order !== null && order?.status === "delivered" ? "bg-green-200 text-green-600" : order?.status === "accept" ? "bg-orange-200 text-orange-600" : "bg-amber-200 text-amber-600"}`}>
                              {order?.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          }
        </>
      }
    </>
  )
}

export default OrderDetail

