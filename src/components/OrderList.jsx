import { useEffect, useState } from "react";
import { order_route } from "../api/routes";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

function Order() {
  const token = localStorage.getItem("token");
  const [orderList, setOrderList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [authRes, setAuthRes] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(false);
      try {
        const res = await fetch(order_route, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) {
          setAuthRes("Failed To Fetch Orders");
        }
        const data = await res.json();
        setOrderList(data.orders);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchOrders();
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (authRes) {
    return <div>{authRes}</div>;
  }

  return (
    <>
      <Navbar />
      <div>
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Product ID</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {orderList.map((order, index) => (
              <tr key={index}>
                <td>
                  <Link to={`/orders/${order._id}`}>{order._id}</Link>
                </td>
                <td>
                  {order.product ? (
                    <Link to={`/products/${order.product._id}`}>
                      {order.product._id}
                    </Link>
                  ) : (
                    "Product ID not available"
                  )}
                </td>
                <td>{order.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Order;
