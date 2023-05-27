import React, { useState, useEffect } from "react";
import axios from "axios";

const api_base = "http://localhost:3001";

const TransporterForm = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState("");
  const [price, setPrice] = useState("");

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

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = {
      orderId: selectedOrderId,
      price: parseFloat(price),
    };

    axios
      .put(api_base + `/orders/${selectedOrderId}`, formData)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-5">
      <div className="mb-3">
        <label htmlFor="orderId" className="form-label">Order ID:</label>
        <select
          id="orderId"
          className="form-select"
          value={selectedOrderId}
          onChange={(event) => setSelectedOrderId(event.target.value)}
          required
        >
          <option value="">Select Order ID</option>
          {orders.map((order) => (
            <option key={order._id} value={order.orderId}>
              {order.orderId}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-3">
        <label htmlFor="price" className="form-label">Price:</label>
        <input
          type="number"
          step="0.01"
          id="price"
          className="form-control"
          value={price}
          onChange={(event) => setPrice(event.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  );
};

export default TransporterForm;
