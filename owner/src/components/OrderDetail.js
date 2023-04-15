import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import dateFormat from "dateformat";
import Loader from "./Loader";
import { setCurrentColor } from "../redux/user/userSlice";

const OrderDetail = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [order, setOrder] = useState([]);
  const owner = useSelector((state) => state.userData.user);
  const navigate = useNavigate();
  const [filter, setFilter] = useState("All");
  const [filteredItems, setFilteredItems] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      console.log(owner._id);
      const response = await axios.get(
        `http://localhost:4000/resturant/allResturantOrder?id=${owner._id}`
      );
      console.log(response.data.order);
      setOrder(response.data.order);
      setFilteredItems(response.data.order);
      setIsLoading(false);
    })();
    dispatch(setCurrentColor("slate-800"));
  }, []);

  useEffect(() => {
    if (filter === "All") {
      setFilteredItems(order);
    } else {
      const filtered = order.filter((item) => item.status === filter);
      setFilteredItems(filtered);
    }
  }, [filter]);

  return (
    <div className="min-h-screen">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {
            <div className="mx-5 pt-24">
              <div className="p-5 shadow-md">
                <h1 className="text-3xl font-bold mb-4">Order Summary</h1>
                <div className="overflow-x-auto">
                  <table className="table w-full whitespace-no-wrap">
                    <thead>
                      <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                        <th className="py-3 px-6 text-left">Order Id</th>
                        <th className="py-3 px-6 text-left">Customer Name</th>
                        <th className="py-3 px-6 text-left">Total Price</th>
                        <th className="py-3 px-6 text-left">Order Date</th>
                        <th className="py-3 px-6 text-left">
                          <select
                            className="outline-none border-none bg-inherit border-b-2 border-black"
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                          >
                            <option value="All">All</option>
                            {/* <option value="process">Process</option> */}
                            <option value="accept">Accept</option>
                            <option value="on the way">On the way</option>
                            <option value="delivered">Delivered</option>
                          </select>
                        </th>
                      </tr>
                    </thead>

                    <tbody className="text-gray-600 text-sm font-light">
                      {order &&
                        filteredItems.map((order) => (
                          <tr
                            key={order && order._id}
                            //  ${selectedOrderId === order._id ? "bg-blue-100" : ""}`
                            className={`border-b border-gray-200 hover:bg-gray-100`}
                            onClick={() => {
                              navigate("/ordersummary", { state: order._id });
                            }}
                          >
                            <td className="py-3 px-6 text-left">
                              {order !== null && order?._id}
                            </td>
                            <td className="py-3 px-6 text-left">
                              {order !== null && order.customer?.name}
                            </td>
                            <td className="py-3 px-6 text-left">
                              ₹{order !== null && order?.total}
                            </td>
                            <td className="py-3 px-6 text-left">
                              {dateFormat(order.createdAt, "mmmm dS, yyyy")}
                            </td>
                            <td className="py-3 px-6 text-left">
                              <span
                                className={`py-1 px-3 rounded-full text-xs ${
                                  order !== null &&
                                  order?.status === "delivered"
                                    ? "bg-green-200 text-green-600"
                                    : order?.status === "accept"
                                    ? "bg-orange-200 text-orange-600"
                                    : "bg-amber-200 text-amber-600"
                                }`}
                              >
                                {order?.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                  {order.length == 0 && (
                    <div className="flex justify-center items-center">
                      <p className="text-xl font-mono font-bold">
                        No orders here
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          }
        </>
      )}
    </div>
  );
};

export default OrderDetail;
