import axios from "axios";
import React, { useState } from "react";
import style from "./login.module.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/hooks";
import { Button } from "@/Components/ui/button";
import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";

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
      <Card>
        <CardHeader>
          <CardTitle>Admin Login</CardTitle>
          <CardDescription>
            Only Admin knows a way to register himself😎
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              {/* <Label htmlFor="id-admin">Id</Label> */}
              <br />
              <Input
                type="text"
                value={userName}
                id="id-admin"
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Id"
                required={true}
              />
            </div>

            <div className="grid w-full max-w-sm items-center gap-1.5">
              <br />
              {/* <Label htmlFor="password" >Password</Label> */}
              <Input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required={true}
              />
            </div>
            <br />
            <Button type="submit">Log me in!</Button>
          </form>
            <br />
            {isAuthenticated &&
              role === "admin" &&
              <p className="text-lime-300">You are already logged in 🔥</p>}
        </CardContent>
        <CardFooter>
          <div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
