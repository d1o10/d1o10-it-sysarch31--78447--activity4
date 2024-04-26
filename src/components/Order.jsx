import { useState, useEffect } from "react";
import { order_route } from "../api/routes";
import { useParams } from "react-router-dom";
function Order() {
  const token = localStorage.getItem("token");
  const { orderId } = useParams();
  const [order, setOrder] = useState([]);
  const [loading, setLoading] = useState(false);
  const [authRes, setAuthRes] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await fetch(order_route + "/" + orderId, {
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
        setOrder([data.order]);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setAuthRes("Please Try Again");
        setLoading(false);
      }
    };
    fetchOrder();
  }, [token]);

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(order_route + "/" + orderId, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (res.ok) {
        window.location.href = "/orders";
      } else {
        setAuthRes(data.message);
      }
    } catch (error) {
      setAuthRes("Please Try Again");
    }
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (authRes) {
    return <h1>{authRes}</h1>;
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Product ID</th>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {order.map((orderItem, index) => (
            <tr key={index}>
              <td>{orderItem._id}</td>
              <td>{orderItem.product ? orderItem.product._id : "N/A"}</td>
              <td>{orderItem.product ? orderItem.product.name : "N/A"}</td>
              <td>{orderItem.quantity}</td>
              <button onClick={handleDelete}>Delete Order</button>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Order;
