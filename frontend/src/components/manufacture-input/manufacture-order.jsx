import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import axios from "axios";

const api_base = "http://localhost:3001";

const ManufactureOrder = () => {
  const [orderId, setOrderId] = useState("");
  const [to, setTo] = useState("");
  const [from, setFrom] = useState("");
  const [quantity, setQuantity] = useState("");
  const [address, setAddress] = useState("");
  const [transporter, setTransporter] = useState("");
  const { userData } = useContext(UserContext);

  useEffect(() => {
    if (userData) {
      setAddress(userData.address);
    }
  }, [userData]);

  const resetFormFields = () => {
    setOrderId("");
    setTo("");
    setFrom("");
    setQuantity("");
    setAddress("");
    setTransporter("");
  };

  const generateOrderId = () => {
    const length = 10;
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }
  
    setOrderId(result);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = {
      orderId,
      to,
      from,
      quantity,
      address,
      transporter,
    };

    axios
      .post(api_base + "/new-order-manufacture", formData)
      .then((response) => {
        // Handle successful submission here
      })
      .catch((error) => {
        console.error(error);
        // Handle submission error here
      });

    resetFormFields();
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-5">
      <div className="mb-3">
        <label htmlFor="orderId" className="form-label">Order ID:</label>
        <div className="input-group">
          <input
            type="text"
            id="orderId"
            className="form-control"
            value={orderId}
            onChange={(event) => setOrderId(event.target.value)}
            readOnly
          />
          <button type="button" className="btn btn-outline-secondary" onClick={generateOrderId}>
            Generate
          </button>
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="to" className="form-label">To:</label>
        <input
          type="text"
          id="to"
          className="form-control"
          value={to}
          onChange={(event) => setTo(event.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="from" className="form-label">From:</label>
        <input
          type="text"
          id="from"
          className="form-control"
          value={from}
          onChange={(event) => setFrom(event.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="quantity" className="form-label">Quantity:</label>
        <select
          id="quantity"
          className="form-select"
          value={quantity}
          onChange={(event) => setQuantity(event.target.value)}
          required
        >
          <option value="">Select Quantity</option>
          <option value="1">1 ton</option>
          <option value="2">2 ton</option>
          <option value="3">3 ton</option>
        </select>
      </div>
      <div className="mb-3">
        <label htmlFor="address" className="form-label">Address:</label>
        <input
          type="text"
          id="address"
          className="form-control"
          value={address}
          disabled={true}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="transporter" className="form-label">Transporter:</label>
        <select
          id="transporter"
          className="form-select"
          value={transporter}
          onChange={(event) => setTransporter(event.target.value)}
          required
        >
          <option value="">Select Transporter</option>
          <option value="Transporter 1">Transporter 1</option>
          <option value="Transporter 2">Transporter 2</option>
          <option value="Transporter 3">Transporter 3</option>
        </select>
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  );
};

export default ManufactureOrder;
