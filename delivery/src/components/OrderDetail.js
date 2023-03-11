import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'
import axios from 'axios'
import dateFormat from 'dateformat';
import Loader from './Loader';

const OrderDetail = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [order, setOrder] = useState([])
  const owner = useSelector(state => state.userData.user)
  const navigate = useNavigate()
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [showOrderDetail, setShowOrderDetail] = useState(false)
  const [orderStatus, setOrderStatus] = useState('not define')


  useEffect(() => {
    (
      async () => {
        setIsLoading(true)
        console.log(owner._id);
        const response = await axios.get(`http://localhost:4000/resturant/allResturantOrder?id=${owner._id}`)
        console.log(response.data.order);
        setOrder(response.data.order);
        setIsLoading(false)



      }
    )();
  }, [])


  const orders = [
    { id: 123, customerName: "John Doe", totalPrice: 45.99, orderDate: "2023-02-21", status: "Delivered" },
    { id: 124, customerName: "Jane Smith", totalPrice: 26.50, orderDate: "2023-02-20", status: "Preparing" },
    { id: 164, customerName: "Jani Mohan", totalPrice: 65.00, orderDate: "2023-05-05", status: "On the way" },];

  // const handleRowClick = (orderId) => {
  //   setSelectedOrderId(orderId);
  //   navigate(`/ordersummary/:${selectedOrderId}`)
  //   // Fetch the order details using the order ID
  //   // Display the quick review details in a modal or tooltip
  // };
  return (
    <>
      {
        isLoading ? <Loader /> : <>
          {
            <div className='mx-5'>
              <div className='p-5 shadow-md'>
                <h1 class="text-3xl font-bold mb-4">Order Summary</h1>
                <div class="overflow-x-auto">
                  <table class="table w-full whitespace-no-wrap">
                    <thead>
                      <tr class="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                        <th class="py-3 px-6 text-left">Order Id</th>
                        <th class="py-3 px-6 text-left">Customer Name</th>
                        <th class="py-3 px-6 text-left">Total Price</th>
                        <th class="py-3 px-6 text-left">Order Date</th>
                        <th class="py-3 px-6 text-left">Status</th>
                      </tr>
                    </thead>

                    <tbody className="text-gray-600 text-sm font-light">
                      {orders && orders.map((order) => (
                        <tr
                          key={order && order._id}
                          //  ${selectedOrderId === order._id ? "bg-blue-100" : ""}`
                          className={`border-b border-gray-200 hover:bg-gray-100`}
                          onClick={() => { navigate('/ordersummary', { state: order._id }); setSelectedOrderId(order.id) }}>
                          <td className="py-3 px-6 text-left">{order.id}</td>
                          <td className="py-3 px-6 text-left">{order.customerName}</td>
                          <td className="py-3 px-6 text-left">₹{order.totalPrice}</td>
                          <td className="py-3 px-6 text-left">{order.orderDate}</td>
                          <td className="py-3 px-6 text-left">
                            <span className={`py-1 px-3 rounded-full text-xs ${order.status === "Delivered" ? "bg-green-200 text-green-600" : order.status === "Preparing" ? "bg-yellow-200 text-yellow-600" : "bg-amber-200 text-amber-600"}`}>
                              {order.status}
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

