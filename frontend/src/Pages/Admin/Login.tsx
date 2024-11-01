import axios from "axios";
import React, { useState } from "react";
import style from "./login.module.css";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/hooks";
const Login = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const { login, role, isAuthenticated } = useAuth();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = {
      userName: userName.trim(),
      password: password.trim(),
      role: "admin",
    };
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    axios.defaults.withCredentials = true;

    axios
      .post("/api/admin/login", data, config)
      .then((response) => {
        login(response.data.accessToken);
        navigate("/admin/dashboard");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <h1 className={style.test}>Login</h1>
      {isAuthenticated && role === 'admin' && "already logged in"}
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input
          required={true}
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <br />
        <label>Password:</label>
        <input
          required={true}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button type="submit">Login!!</button>
      </form>
    </div>
  );
};

export default Login;
