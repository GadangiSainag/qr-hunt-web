import axios from "axios";
import React, { useState } from "react";
import style from "./login.module.css";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = {
      userName: userName,
      password: password,
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
        console.log(response.data.accessToken);
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
      This is testing font - ignore me
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <br />
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
