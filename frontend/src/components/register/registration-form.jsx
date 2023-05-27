import React, { useState, useContext } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { UserContext } from "../../context/UserContext";

const api_base = "http://localhost:3001";

const RegistrationForm = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const { updateUserData } = useContext(UserContext);
  const navigate = useNavigate();

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const user = {
      name,
      address,
      email,
      password,
      role,
    };

    axios
      .post(api_base + "/register", user)
      .then((response) => {
        if (role === "Transporter") {
          navigate("/transporter-home");
        } else if (role === "Manufacturer") {
          navigate("/manufacturer-home");
        }
        updateUserData(user);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            required
            onChange={handleNameChange}
            autoFocus={true}
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            className="form-control"
            id="address"
            value={address}
            required
            onChange={handleAddressChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            required
            onChange={handleEmailChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            required
            onChange={handlePasswordChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="role">Role:</label>
          <select
            className="form-control"
            id="role"
            value={role}
            required
            onChange={handleRoleChange}
          >
            <option value="">Select Role</option>
            <option value="Transporter">Transporter</option>
            <option value="Manufacturer">Manufacturer</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>
      <button className="btn btn-link" onClick={() => navigate("/")}>
        Already have an account
      </button>
    </>
  );
};

export default RegistrationForm;
