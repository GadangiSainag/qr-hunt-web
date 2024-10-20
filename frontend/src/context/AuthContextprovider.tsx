import { useEffect, useState } from "react";
import AuthContext, { AuthContextType } from "./AuthContext";
import { jwtDecode, JwtPayload } from "jwt-decode";

interface IJWTPayload extends JwtPayload {
  id: string;
  role: "admin" | "player" | null;
}
const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState<AuthContextType["role"]>(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    console.log("Got access token from localStorage: ", token);

    if (token) {
      try {
        const decodedToken = jwtDecode(token) as IJWTPayload; // Decode the JWT payload safely
        console.log(decodedToken);
        const currentTime = Date.now() / 1000; // Convert to seconds

        if (decodedToken.exp && decodedToken.exp > currentTime) {
          // Token is valid
          setIsAuthenticated(true);

          setRole(decodedToken.role);

          console.log("User is authenticated, role:", decodedToken.role);
        } else {
          console.log("Token is expired.");
          // Optionally clear the token if expired
          localStorage.removeItem("accessToken");
        }
      } catch (error) {
        console.error("Invalid token:", error);
        // Optionally handle invalid token, e.g., remove it
        localStorage.removeItem("accessToken");
      }
    } else {
      console.log("No token found.");
    }
  }, []); // Empty dependency array ensures this runs only on mount

  const login = (token: string) => {
    localStorage.setItem("accessToken", token);
    const decodedToken = JSON.parse(atob(token.split(".")[1])); // Decode JWT payload
    setIsAuthenticated(true);
    setRole(decodedToken.role);
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    setIsAuthenticated(false);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
