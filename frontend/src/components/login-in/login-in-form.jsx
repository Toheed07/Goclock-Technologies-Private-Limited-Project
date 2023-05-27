import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { UserContext } from "../../context/UserContext";

const api_base = "http://localhost:3001";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { updateUserData } = useContext(UserContext);
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const credentials = {
      email,
      password,
    };

    axios
      .post(api_base + "/login", credentials)
      .then((response) => {
        console.log(response.data);
        updateUserData(response.data);
        const role = response.data.role;
        if (role === "Transporter") {
          navigate("/transporter-home");
        } else if (role === "Manufacturer") {
          navigate("/manufacturer-home");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            required
            onChange={handleEmailChange}
            autoFocus={true}
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
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
      <button className="btn btn-link" onClick={() => navigate("/register")}>
        Don't have an account
      </button>
    </>
  );
};

export default LoginForm;
