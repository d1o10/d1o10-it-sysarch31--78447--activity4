import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import ProductList from "./components/ProductList.jsx";
import Product from "./components/Product.jsx";
import OrderList from "./components/OrderList.jsx";
import Order from "./components/Order.jsx";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/:productId" element={<Product />} />
        <Route path="/orders" element={<OrderList />} />
        <Route path="/orders/:orderId" element={<Order />} />
      </Routes>
    </Router>
  );
}
