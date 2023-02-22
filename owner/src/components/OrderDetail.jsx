import React, { useState } from 'react'

const OrderDetail = () => {

  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [showOrderDetail, setShowOrderDetail] = useState(false)

  const orders = [
    { id: 123, customerName: "John Doe", totalPrice: 45.99, orderDate: "2023-02-21", status: "Delivered" },
    { id: 124, customerName: "Jane Smith", totalPrice: 26.50, orderDate: "2023-02-20", status: "Preparing" },];

  const handleRowClick = (orderId) => {
    setSelectedOrderId(orderId);

    // Fetch the order details using the order ID
    // Display the quick review details in a modal or tooltip
  };
  return (
    <>
      <div className='mx-5'>
        <div className='p-5 shadow-md'>
          <div class="overflow-x-auto">
            <table class="table w-full whitespace-no-wrap">
              <thead>
                <tr class="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                  <th class="py-3 px-6 text-left">Order ID</th>
                  <th class="py-3 px-6 text-left">Customer Name</th>
                  <th class="py-3 px-6 text-left">Total Price</th>
                  <th class="py-3 px-6 text-left">Order Date</th>
                  <th class="py-3 px-6 text-left">Status</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {orders.map((order) => (
                  <tr
                    key={order.id}
                    className={`border-b border-gray-200 hover:bg-gray-100 ${selectedOrderId === order.id ? "bg-blue-100" : ""}`}
                    onClick={() => { handleRowClick(order.id); setShowOrderDetail(true) }}>
                    <td className="py-3 px-6 text-left">{order.id}</td>
                    <td className="py-3 px-6 text-left">{order.customerName}</td>
                    <td className="py-3 px-6 text-left">${order.totalPrice.toFixed(2)}</td>
                    <td className="py-3 px-6 text-left">{order.orderDate}</td>
                    <td className="py-3 px-6 text-left">
                      <span className={`py-1 px-3 rounded-full text-xs ${order.status === "Delivered" ? "bg-green-200 text-green-600" : "bg-yellow-200 text-yellow-600"}`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>



          {
            showOrderDetail &&
            <div className='absolute bg-red-500 top-0 left-0 z-50'>
              <div className="fixed z-50 inset-0 overflow-y-auto">
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                  <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                  </div>
                  <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                  <div
                    className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="modal-headline">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                      <div className="sm:flex sm:items-start">
                        <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                          <svg
                            className="h-6 w-6 text-blue-600"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                          <h3
                            className="text-lg leading-6 font-medium text-gray-900"
                            id="modal-headline">
                            Order Details - {selectedOrderId}
                          </h3>
                          {
                            orders.filter(order => order.id === selectedOrderId).map(order => (
                              <div className="mt-2">
                                <table>
                                  <tr>
                                    <td className="text-sm text-gray-500 pr-3">Customer</td>
                                    <td>{order.customerName}</td>
                                  </tr>
                                  <tr>
                                    <td className="text-sm text-gray-500 pr-3">Order Date</td>
                                    <td>{order.orderDate}</td>
                                  </tr>
                                  <tr>
                                    <td className="text-sm text-gray-500 pr-3">Total Price</td>
                                    <td>{order.totalPrice}</td>
                                  </tr>
                                  <tr>
                                    <td className="text-sm text-gray-500 pr-3">Status</td>
                                    <td>{order.status}</td>
                                  </tr>
                                </table>
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                      <button
                        type="button"
                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                        onClick={() => {
                          setShowOrderDetail(false)
                        }}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </>
  )
}

export default OrderDetail

// export const FoodOrderDetailModal = ({ order, orderId }) => {
//   return (
//     <div className="fixed z-50 inset-0 overflow-y-auto">
//       <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
//         <div className="fixed inset-0 transition-opacity" aria-hidden="true">
//           <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
//         </div>

//         <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

//         <div
//           className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
//           role="dialog"
//           aria-modal="true"
//           aria-labelledby="modal-headline"
//         >
//           <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
//             <div className="sm:flex sm:items-start">
//               <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
//                 <svg
//                   className="h-6 w-6 text-blue-600"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                   aria-hidden="true"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M5 13l4 4L19 7"
//                   />
//                 </svg>
//               </div>
//               <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
//                 <h3
//                   className="text-lg leading-6 font-medium text-gray-900"
//                   id="modal-headline"
//                 >
//                   Order Details - {order.id}
//                 </h3>
//                 <div className="mt-2">
//                   <p className="text-sm text-gray-500">
//                     Customer: {order.customerName}
//                   </p>
//                   <p className="text-sm text-gray-500">
//                     Order Date: {order.orderDate}
//                   </p>
//                   <p className="text-sm text-gray-500">
//                     Total Price: ${order.totalPrice}
//                   </p>
//                   <p className="text-sm text-gray-500">
//                     Status: {order.status}
//                   </p>
//                   {/* Add more details as needed */}
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
//             <button
//               type="button"
//               className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
//               onClick={() => {
//                 setShowOrderDetail(false)
//               }}
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
