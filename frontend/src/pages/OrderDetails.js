import React from "react";
import { useEffect } from "react";
import { Navigate, useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";
import RestroReview from "../Review/RestroReview";
import DeliveryReview from "../Review/DeliveryReview";
// import { getOrderItem } from "../../redux/slices/orderSlice";
// import { orderData } from "../redux/orders/orderSlice"
import { useDispatch } from "react-redux";
import CustomerOrderCard from "../components/CustomerOrderCard";

const OrderDetails = () => {
  const dispatch = useDispatch();
  const { orderId } = useParams();
  const navigate = useNavigate();

  const [model, setModel] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [orderData, setOrderData] = useState(null);
  const [restroReview, setRestroReview] = useState(false);
  const [deliveryReview, setDeliveryReview] = useState(false);

  const [isResturantButton, setIsResturantButton] = useState(false);
  const [isDeliveryButton, setIsDeliveryButton] = useState(false);
  const user = useSelector((state) => state.userData.user);

  const location = useLocation();
  const data = location.state;
  console.log(data);
  const createdDate = "ok";

  // console.log(createdDate);

  // useEffect(() => {
  //   (async () => {
  //     // setIsLoading(true);

  //     // console.log(userId);
  //     // // let getData = await fetch(`http://localhost:5000/order/one/${data.id}`);
  //     // let getData = await axios.get(`http://localhost:4000/order/customer?userId=${userId}`)
  //     // console.log(getData);
  //     // getData = await getData.json();
  //     // console.log(getData.data.response.order);
  //     // setOrderData(getData.data.or);
  //     // setIsLoading(false);
  //   })();
  // }, []);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const response = await axios(
          `${process.env.REACT_APP_BASEURL}/order/fetchOneOrder/?id=${orderId}`
        );
        console.log("hello");
        console.log(response.data.order);
        setOrderData(response.data.order);
        setIsResturantButton(response.data.order.isreviewGiven.forResturant);
        setIsDeliveryButton(response.data.order.isreviewGiven.forDeliveryBoy);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  const handleDelete = async (id) => {
    try {
      console.log(id);
      const data = await axios.delete(`http://localhost:5000/order/${id}`);
      console.log(data);
      // dispatch(getOrderItem(userId));
      setModel(false);
      navigate("/order");
    }
    catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {isLoading === true ? (
        <Loader />
      ) : (
        orderData && (
          <>
            <div className="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
              <div className="flex justify-start item-start space-y-2 flex-col ">
                <h1 className="text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9  text-gray-800">
                  Order {orderData && orderData._id}
                </h1>
              </div>
              <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch  w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
                <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
                  <div className="flex flex-col justify-start items-start bg-white/30 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
                    <p className="text-lg md:text-xl font-semibold leading-6 xl:leading-5 text-gray-800">
                      Customer’s Order
                    </p>
                    <div>
                      {/* {
                orderData &&  <CustomerOrderCard items={orderData.products[0]}/>

              } */}
                    </div>

                    {orderData
                      ? orderData.products.map((item) => (
                        <CustomerOrderCard items={item} />
                      ))
                      : ""}
                  </div>
                  <div className="flex justify-center md:flex-row flex-col items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
                    <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-white/30 space-y-6   ">
                      <h3 className="text-xl font-semibold leading-5 text-gray-800">
                        Summary
                      </h3>
                      <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                        <div className="flex justify-between  w-full">
                          <p className="text-base leading-4 text-gray-800">
                            Subtotal
                          </p>
                          <p className="text-base leading-4 text-gray-600">
                            {orderData ? orderData.total : ""}
                          </p>
                        </div>
                        <div className="flex justify-between items-center w-full">
                          <p className="text-base leading-4 text-gray-800">
                            Discount
                          </p>
                          <p className="text-base leading-4 text-gray-600">
                            0%
                          </p>
                        </div>
                        <div className="flex justify-between items-center w-full">
                          <p className="text-base leading-4 text-gray-800">
                            Shipping
                          </p>
                          <p className="text-base leading-4 text-gray-600">
                            Free{" "}
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-between items-center w-full">
                        <p className="text-base font-semibold leading-4 text-gray-800">
                          Total
                        </p>
                        <p className="text-base font-semibold leading-4 text-gray-600">
                          {orderData && orderData.total}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col justify-center px-4 py-6 md:p-6 xl:p-8 w-full bg-white/30 space-y-6   ">
                      <h3 className="text-xl font-semibold leading-5 text-gray-800">
                        Shipping
                      </h3>
                      <div className="flex justify-between items-start w-full">
                        <div className="flex justify-center items-center space-x-4">
                          <div className="w-8 h-8">
                            <img
                              className="w-full h-full"
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
                          <div className="w-8 h-8">
                            <svg
                              width="28"
                              height="28"
                              viewBox="0 0 24 24"
                              fill="greenBase"
                              xmlns="http://www.w3.org/2000/svg"
                              iconsize="24"
                              className="Icon-sc-1iwi4w1-0 hZwKwm"
                            >
                              <path
                                fillRule="evenodd"
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
                      <div className="flex flex-col justify-start ">
                        <p className="text-lg leading-6 font-semibold text-gray-800">
                          Status
                        </p>
                        <h1 className="text-lg p-1 bg-slate-100">{orderData?.status}</h1>

                      </div>

                      {orderData?.status !== "delivered" ? (
                        <>
                          <h3 className="text-xl font-semibold leading-5 text-gray-800">
                            Customer OTP
                          </h3>
                          <div className="flex justify-start items-start">
                            <p className="text-lg leading-6 font-bold text-gray-800">
                              {orderData?.customerOtpNumber}
                            </p>
                          </div>
                        </>
                      ) : (
                        <>
                          <h3 className="text-xl font-semibold leading-5 text-gray-800">
                            Order status
                          </h3>
                          <span className="text-xs font-semibold w-24 justify-center items-center flex py-1 px-2 uppercase rounded text-green-600 bg-green-200 last:mr-0 mr-1">
                            Delivered
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="bg-white/30 w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col ">
                  <h3 className="text-xl font-semibold leading-5 text-gray-800 text-center w-full">
                    Customer
                  </h3>
                  <div className="flex  flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0 ">
                    <div className="flex flex-col justify-start items-start flex-shrink-0">
                      <div className="flex justify-center flex-col gap-5  w-full items-center py-8 border-b border-gray-200">
                        <img
                          src="https://i.ibb.co/NxZH2Zg/avatar.png"
                          alt="avatar"
                          className="rounded-full grid place-items-center w-40 h-40"
                        />
                        <div className=" flex justify-start items-start flex-col space-y-2">
                          <p className="text-base font-semibold leading-4 text-left text-gray-800">
                            {orderData && <div>{orderData.customer.name}</div>}
                          </p>
                        </div>
                      </div>

                      <div className="flex justify-center items-center py-4 border-b border-gray-200 w-full">
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
                        <p className="cursor-pointer font-medium pl-2 text-sm leading-5 text-gray-800">
                          {orderData && orderData.customer.email}
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-between xl:h-full  items-stretch w-full flex-col mt-6 md:mt-0">
                      <div className="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row  items-center md:items-start ">
                        <div className="flex justify-center md:justify-start  items-center md:items-start flex-col space-y-4 xl:mt-8">
                          <p className="text-base font-semibold leading-4 text-center md:text-left text-gray-800">
                            Shipping Address
                          </p>
                          <p className="w-48 lg:w-full xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                            {orderData && orderData?.customer.address[0]?.area}{" "}
                          </p>
                        </div>
                        <div className="mt-4 flex justify-center md:justify-start  items-center md:items-start flex-col space-y-4 ">
                          <p className="text-base font-semibold leading-4 text-center md:text-left text-gray-800">
                            Billing
                          </p>
                          <p className="w-48 lg:w-full xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                            {orderData &&
                              orderData.resturant?.address?.area +
                              "," +
                              orderData.resturant?.address?.city +
                              "," +
                              orderData.resturant?.address?.pincode +
                              ","}
                          </p>
                        </div>
                        {orderData !== null &&
                          orderData.status === "delivered" ? (
                          <div className="mt-4 flex justify-center md:justify-start  items-center md:items-start flex-col space-y-4 ">
                            {isDeliveryButton != true &&
                              isResturantButton != true ? (
                              <p className="text-base font-semibold leading-4 text-center md:text-left text-gray-800">
                                Review
                              </p>
                            ) : (
                              ""
                            )}

                            <p className="w-48 lg:w-full xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                              {isResturantButton != true && (
                                <button
                                  onClick={(e) => setRestroReview(true)}
                                  className="inline-block mt-3 bg-white hover:text-white hover:bg-blue-600 -bottom-4 font-bold  rounded border border-current px-2 py-[6px] text-xs uppercase  text-blue-600 transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:text-blue-500"
                                >
                                  Review for Restaurant
                                </button>
                              )}
                              {isDeliveryButton != true && (
                                <button
                                  onClick={(e) => setDeliveryReview(true)}
                                  className="inline-block mt-3 bg-white hover:text-white hover:bg-blue-600 -bottom-4 font-bold  rounded border border-current px-2 py-[6px] text-xs uppercase  text-blue-600 transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:text-blue-500"
                                >
                                  Review for Delivery Boy
                                </button>
                              )}
                            </p>
                          </div>
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )
      )}

      {restroReview && (
        <RestroReview
          setIsResturantButton={setIsResturantButton}
          setRestroReview={setRestroReview}
          orderId={orderId}
          resturantID={orderData != null && orderData.resturant._id}
          ownerFcmToken={orderData?.resturant?.fcmToken}
        />
      )}
      {deliveryReview && (
        <DeliveryReview
          setIsDeliveryButton={setIsDeliveryButton}
          setDeliveryReview={setDeliveryReview}
          orderId={orderId}
          deliverboyId={orderData != null && orderData.deliveryBoy._id}
          fcmToken={orderData?.deliveryBoy?.fcmToken}
        />
      )}
    </>
  );
};

export default OrderDetails;
