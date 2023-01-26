import React from "react";
import { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getOrderItem } from "../../redux/slices/orderSlice";
import { useDispatch } from "react-redux";

const OrderDetails = () => {
  const dispatch = useDispatch();
  const { userId } = useSelector((state) => state.userData.user._id);
  const navigate = useNavigate();
  const [model, setModel] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [orderData, setOrderData] = useState({});
  const customerName = useSelector((state) => state.userData.name);
  const email = useSelector((state) => state.user.email);
  console.log("this is orderData");
  console.log(orderData);
  const location = useLocation();
  const data = location.state;
  const createdDate = orderData.createdAt
  console.log("check this created date");
  console.log(typeof(new Date(createdDate)));
  console.log(createdDate);
  useEffect(() => {
    (async () => {
      setIsLoading(true);
      let getData = await fetch(`http://localhost:5000/order/one/${data.id}`);
      getData = await getData.json();
      console.log(getData);
      setOrderData(getData.data);
      setIsLoading(false);
    })();
  }, []);

  const handleDelete = async (id) => {
    console.log(id);

    const data = await axios.delete(`http://localhost:5000/order/${id}`);
    console.log(data);
    dispatch(getOrderItem(userId));
    setModel(false);
    navigate("/order");
  };
  return (
    <>
      {model && (
        <div className="border-2">
          <div
            id="popup-modal"
            tabindex="-1"
            class=" overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal md:h-full"
          >
            <div class="relative mx-auto my-auto  p-4 w-full max-w-md h-full md:h-auto">
              <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <button
                  type="button"
                  class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                  data-modal-toggle="popup-modal"
                  onClick={() => setModel((state) => !state)}
                >
                  <svg
                    aria-hidden="true"
                    class="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span class="sr-only">Close modal</span>
                </button>
                <div class="p-6 text-center">
                  <svg
                    aria-hidden="true"
                    class="mx-auto mb-4 w-14 h-14 text-gray-400 dark:text-gray-200"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                  <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                    Are you sure you want to delete this order?
                  </h3>

                  <button
                    data-modal-toggle="popup-modal"
                    type="button"
                    class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                    onClick={() => handleDelete(orderData._id)}
                  >
                    Yes, I'm sure
                  </button>

                  <button
                    onClick={() => setModel((state) => !state)}
                    data-modal-toggle="popup-modal"
                    type="button"
                    class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                  >
                    No, cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
        <div className="flex justify-start item-start space-y-2 flex-col ">
          <h1 className="text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9  text-gray-800">
            Order {orderData._id}
          </h1>
          <p className="text-base font-medium leading-6 text-gray-600">
              Order Date <span className="ml-4"> {orderData.createdAt}</span>
          </p>
          {
            orderData.orderStatus === "delivered" ? <p className="text-base font-medium leading-6 text-gray-600">
            Delivered Date  <span className="ml-4"> {orderData.updatedAt}</span>
        </p> : <></>
          }
         
          
            
          
        </div>
        <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch  w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
          <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
            <div className="flex flex-col justify-start items-start bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
              <p className="text-lg md:text-xl font-semibold leading-6 xl:leading-5 text-gray-800">
                Customer’s Order
              </p>
              {/* { 
              orderData.products.map(item => (
                <div className="mt-4 md:mt-6 flex  flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full ">
              <div className="pb-4 md:pb-8 w-full md:w-40">
                <img
                  className="w-full hidden md:block"
                  src="https://i.ibb.co/84qQR4p/Rectangle-10.png"
                  alt="dress"
                />
                <img
                  className="w-full md:hidden"
                  src="https://i.ibb.co/L039qbN/Rectangle-10.png"
                  alt="dress"
                />
              </div>
              <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full  pb-8 space-y-4 md:space-y-0">
                <div className="w-full flex flex-col justify-start items-start space-y-8">
                  <h3 className="text-xl xl:text-2xl font-semibold leading-6 text-gray-800">
                    Premium Quaility Dress
                  </h3>
                  <div className="flex justify-start items-start flex-col space-y-2">
                    <p className="text-sm leading-none text-gray-800">
                      <span className="text-gray-300">Style: </span> Italic
                      Minimal Design
                    </p>
                    <p className="text-sm leading-none text-gray-800">
                      <span className="text-gray-300">Size: </span> Small
                    </p>
                    <p className="text-sm leading-none text-gray-800">
                      <span className="text-gray-300">Color: </span> Light Blue
                    </p>
                  </div>
                </div>
                <div className="flex justify-between space-x-8 items-start w-full">
                  <p className="text-base xl:text-lg leading-6">
                    $36.00{" "}
                    <span className="text-red-300 line-through"> $45.00</span>
                  </p>
                  <p className="text-base xl:text-lg leading-6 text-gray-800">
                    01
                  </p>
                  <p className="text-base xl:text-lg font-semibold leading-6 text-gray-800">
                    $36.00
                  </p>
                </div>
              </div>
            </div>
              ))
            } */}
            
              {Object.keys(orderData).length !== 0 &&
                orderData.products.map((item) => (
                  <div className="mt-10 md:mt-4 flex justify-start flex-col md:flex-row  items-start md:items-center space-y-4  md:space-x-6 xl:space-x-8 w-full ">
                    <div className="w-full md:w-40">
                      <img
                        className="w-full hidden md:block"
                        src={item.product.imageUrl}
                        alt="dress"
                      />
                      
                    </div>
                    <div className="  flex justify-between items-start w-full flex-col md:flex-row space-y-4 md:space-y-0  ">
                      <div className="w-full flex flex-col justify-start items-start space-y-8">
                        <h3 className="text-xl xl:text-2xl font-semibold leading-6 text-gray-800">
                          {item.product.name}
                        </h3>
                      </div>
                      <div className="flex justify-between space-x-8 items-start w-full">
                        <p className="text-base xl:text-lg leading-6">
                          {item.product.price}
                        </p>
                        <p className="text-base xl:text-lg leading-6 text-gray-800">
                          {item.quantity}
                        </p>
                        <p className="text-base xl:text-lg font-semibold leading-6 text-gray-800">
                          {item.product.price * item.quantity}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            <div className="flex justify-center md:flex-row flex-col items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
              <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 space-y-6   ">
                <h3 className="text-xl font-semibold leading-5 text-gray-800">
                  Summary
                </h3>
                <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                  <div className="flex justify-between  w-full">
                    <p className="text-base leading-4 text-gray-800">
                      Subtotal
                    </p>
                    <p className="text-base leading-4 text-gray-600">
                      {orderData.total}
                    </p>
                  </div>
                  <div className="flex justify-between items-center w-full">
                    <p className="text-base leading-4 text-gray-800">
                      Discount
                    </p>
                    <p className="text-base leading-4 text-gray-600">0%</p>
                  </div>
                  <div className="flex justify-between items-center w-full">
                    <p className="text-base leading-4 text-gray-800">
                      Shipping
                    </p>
                    <p className="text-base leading-4 text-gray-600">Free </p>
                  </div>
                </div>
                <div className="flex justify-between items-center w-full">
                  <p className="text-base font-semibold leading-4 text-gray-800">
                    Total
                  </p>
                  <p className="text-base font-semibold leading-4 text-gray-600">
                    {orderData.total}
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-center px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 space-y-6   ">
                <h3 className="text-xl font-semibold leading-5 text-gray-800">
                  Shipping
                </h3>
                <div className="flex justify-between items-start w-full">
                  <div className="flex justify-center items-center space-x-4">
                    <div class="w-8 h-8">
                      <img
                        class="w-full h-full"
                        alt="logo"
                        src="https://i.ibb.co/L8KSdNQ/image-3.png"
                      />
                    </div>
                    <div className="flex flex-col justify-start items-center">
                      <p className="text-lg leading-6 font-semibold text-gray-800">
                        DPD Delivery
                        <br />
                        <span className="font-normal mt-4">
                       
                          {/* {new Date(orderData.createdAt).setDate(orderData.createdAt.getDate() + 3)} */}
                        
                        </span>
                      </p>
                    </div>
                  </div>
                  <p className="text-lg font-semibold leading-6 text-gray-800"></p>
                </div>
                <h3 className="text-xl font-semibold leading-5 text-gray-800">
                  Payment Method
                </h3>
                <div className="flex justify-between items-start w-full">
                  <div className="flex justify-center items-center space-x-4">
                    <div class="w-8 h-8">
                      <svg
                        width="28"
                        height="28"
                        viewBox="0 0 24 24"
                        fill="greenBase"
                        xmlns="http://www.w3.org/2000/svg"
                        iconsize="24"
                        class="Icon-sc-1iwi4w1-0 hZwKwm"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12zM6.355 12.322l2.761 2.76 7.863-7.85A.793.793 0 1118.1 8.355l-8.42 8.413a.793.793 0 01-1.122 0l-3.326-3.324a.791.791 0 01.56-1.354c.211 0 .413.084.562.233z"
                          fill="#06A759"
                        ></path>
                      </svg>
                    </div>
                    <div className="flex flex-col justify-start items-center">
                      <p className="text-lg leading-6 font-semibold text-gray-800">
                        Cash on Delivery
                      </p>
                    </div>
                  </div>
                  <p className="text-lg font-semibold leading-6 text-gray-800"></p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col ">
            <h3 className="text-xl font-semibold leading-5 text-gray-800">
              Customer
            </h3>
            <div className="flex  flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0 ">
              <div className="flex flex-col justify-start items-start flex-shrink-0">
                <div className="flex justify-center  w-full  md:justify-start items-center space-x-4 py-8 border-b border-gray-200">
                  <img
                    src="https://i.ibb.co/5TSg7f6/Rectangle-18.png"
                    alt="avatar"
                  />
                  <div className=" flex justify-start items-start flex-col space-y-2">
                    <p className="text-base font-semibold leading-4 text-left text-gray-800">
                      {Object.keys(orderData).length !== 0 &&
                        orderData.address.lname}{" "}
                      {Object.keys(orderData).length !== 0 &&
                        orderData.address.fname}
                    </p>
                    <p className="text-sm leading-5 text-gray-600"></p>
                  </div>
                </div>

                <div className="flex justify-center  md:justify-start items-center space-x-4 py-4 border-b border-gray-200 w-full">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5Z"
                      stroke="#1F2937"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M3 7L12 13L21 7"
                      stroke="#1F2937"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <p className="cursor-pointer text-sm leading-5 text-gray-800">
                    {Object.keys(orderData).length !== 0 &&
                      orderData.address.email}
                  </p>
                </div>
              </div>
              <div className="flex justify-between xl:h-full  items-stretch w-full flex-col mt-6 md:mt-0">
                <div className="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row  items-center md:items-start ">
                  {/* <div className="flex justify-center md:justify-start  items-center md:items-start flex-col space-y-4 xl:mt-8">
                    <p className="text-base font-semibold leading-4 text-center md:text-left text-gray-800">
                      Shipping Address
                    </p>
                    <p className="w-48 lg:w-full xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                      180 North King Street, Northhampton MA 1060
                    </p>
                  </div> */}
                  <div className="mt-4 flex justify-center md:justify-start  items-center md:items-start flex-col space-y-4 ">
                    <p className="text-base font-semibold leading-4 text-center md:text-left text-gray-800">
                      Billing
                    </p>
                    <p className="w-48 lg:w-full xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                      {Object.keys(orderData).length !== 0 &&
                        orderData.address.address}
                      ,{" "}
                      {Object.keys(orderData).length !== 0 &&
                        orderData.address.city}
                      ,{" "}
                      {Object.keys(orderData).length !== 0 &&
                        orderData.address.country}
                      ,{" "}
                      {Object.keys(orderData).length !== 0 &&
                        orderData.address.zipCode}
                    </p>
                  </div>
                </div>
                {Object.keys(orderData).length !== 0 && !orderData.isDelivered && (
                  <div className="flex flex-col gap-2 mt-4">
                     {
                        
                        orderData.orderStatus !== "delivered" ? <>
                        <div className="flex w-full  justify-center items-center md:justify-start md:items-start">
                     {console.log("check this status" ,orderData.orderStatus)}
                     <div className="w-full">
                       <Link
                         to="/address"
                         state={{
                           address: orderData.address,
                           id: orderData._id,
                         }}
                       >
                         <button className="mt-6 w-100 md:mt-0 py-5 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 border border-gray-800 font-medium  2xl:w-full text-base leading-4 text-gray-800">
                           Edit Details
                         </button>
                       </Link>
                     </div>
                   </div>
                   <div className="flex w-full  justify-center items-center md:justify-start md:items-start">
                      <div className="w-full">
                        <button
                          class="mt-6 md:mt-0 py-5 px-4 text-xl w-full bg-red-600 text-red-100 hover:bg-red-700 duration-300"
                          type="button"
                          onClick={() => setModel((state) => !state)}
                          data-modal-toggle="popup-modal"
                        >
                          Cancel Order
                        </button>
                      </div>
                    </div>
                        </> : ""
                      }
                    

                   
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderDetails;
