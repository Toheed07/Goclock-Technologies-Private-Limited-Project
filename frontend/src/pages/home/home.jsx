import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router";

const api_base = "http://localhost:3001";

const Home = () => {
  const [orders, setOrders] = useState([]);
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [filter, setFilter] = useState("");
  const { userData, logout } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(api_base + "/orders")
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleOrderClick = (orderId) => {
    setExpandedOrderId(orderId === expandedOrderId ? null : orderId);
  };

  const filteredOrders = orders.filter((order) => {
    const { orderId, to, from } = order;
    const filterText = filter.toLowerCase();
    return (
      orderId.toLowerCase().includes(filterText) ||
      to.toLowerCase().includes(filterText) ||
      from.toLowerCase().includes(filterText)
    );
  });

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <h1>Welcome, {userData && userData.name}</h1>
          <h5>{userData && userData.role}</h5>
        </div>
        {userData ? (
          <button className="btn btn-danger" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <button className="btn btn-success" onClick={handleLogout}>
            Log In
          </button>
        )}
      </div>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by Order ID, To, or From"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>To</th>
            <th>From</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map((order) => (
            <tr
              key={order._id}
              onClick={() => handleOrderClick(order.orderId)}
              style={{ cursor: "pointer" }}
            >
              <td>{order.orderId}</td>
              <td>{order.to}</td>
              <td>{order.from}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {expandedOrderId && (
        <div className="card mt-3">
          <div className="card-body">
            {orders.map((order) =>
              order.orderId === expandedOrderId ? (
                <div key={order._id}>
                  <p>To: {order.to}</p>
                  <p>From: {order.from}</p>
                  <p>Transporter: {order.transporter}</p>
                  <p>Quantity: {order.quantity}</p>
                  <p>Address: {order.address}</p>
                  <p>Price: {order.price}</p>
                </div>
              ) : null
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
