import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");

    if (accessToken) {
      axios
        .get("https://django-grocery-mart-backend.onrender.com/api/cart_and_order/order/history", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          setOrders(response.data);
        })
        .catch((error) => {
          console.error("Error fetching order history:", error);
        });
    }
  }, []);

  return (
    <>
      <Navbar></Navbar>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4 text-black bg-yellow-400 block p-4">Order History</h1>
        {orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead className="bg-lime-400 text-black">
              <tr>
                <th className="border border-gray-300 px-4 py-2">Order ID</th>
                <th className="border border-gray-300 px-4 py-2">Product</th>
                <th className="border border-gray-300 px-4 py-2">Quantity</th>
                <th className="border border-gray-300 px-4 py-2">Price</th>
                <th className="border border-gray-300 px-4 py-2">Total Price</th>
                <th className="border border-gray-300 px-4 py-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr
                  key={order.id}
                  className={`${
                    index % 2 === 0 ? "bg-green-950" : "bg-green-950"
                  } hover:bg-blue-100`}
                >
                  <td className="border border-gray-300 px-4 py-2 text-white">{order.id}</td>
                  <td className="border border-gray-300 px-4 py-2 text-white">{order.product_name || "Unknown"}</td>
                  <td className="border border-gray-300 px-4 py-2 text-white">{order.quantity}</td>
                  <td className="border border-gray-300 px-4 py-2 text-white">${Number(order.price).toFixed(2)}</td>
                  <td className="border border-gray-300 px-4 py-2 text-white">${Number(order.total_price).toFixed(2)}</td>
                  <td className="border border-gray-300 px-4 py-2 text-white">
                    {new Date(order.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default OrderHistory;
