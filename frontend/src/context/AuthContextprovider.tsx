import { useEffect, useState } from "react";
import AuthContext, { AuthContextType } from "./AuthContext";
import { jwtDecode, JwtPayload } from "jwt-decode";
import axios from "axios";


interface IJWTPayload extends JwtPayload {
  id: string;
  role: "admin" | "player" | null;
}
const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState<AuthContextType["role"]>(null);
  const [isLoading, setLoading] = useState(true);
  const [id, setId] = useState<string>("");

  useEffect(() => {
    
    const handleTokenCheck = async () => {

      const token = localStorage.getItem("accessToken");
      console.log("Got access token from localStorage:", token);

      if (token) {
        try {
          const decodedToken = jwtDecode<IJWTPayload>(token);
          console.log("Decoded Token:", decodedToken);
          const currentTime = Date.now() / 1000; // Current time in seconds

          // Check if the token is still valid
          if (decodedToken.exp && decodedToken.exp > currentTime) {
            // Token is valid
            setIsAuthenticated(true);
            setRole(decodedToken.role);
            setId(decodedToken.id)
        
          } else {
            // Token is expired, attempt to refresh it
            console.log("Token is expired. Attempting to refresh...");
            try {
              const refreshResponse = await axios.post("/api/token/refresh", {
                accessToken: token,
              });

              const newAccessToken = refreshResponse.data.accessToken;
              
              localStorage.setItem("accessToken", newAccessToken);

              // Decode the new token and update state
              const newDecodedToken = jwtDecode<IJWTPayload>(newAccessToken);
              setIsAuthenticated(true);
              setRole(newDecodedToken.role);
              console.log("New token acquired, role:", newDecodedToken.role);
            } catch (error) {
              console.error("Failed to refresh token:", error);
              setIsAuthenticated(false);
              setRole(null);
            }
          }
        } catch (error) {
          console.error("Invalid token:", error);
          setIsAuthenticated(false);
          setRole(null);
        }
      } else {
        console.log("No token found.");
        setIsAuthenticated(false);
      }
      setLoading(false);
    };

    // Call the token check function
    handleTokenCheck();
  }, []);

  const login = (token: string) => {
    localStorage.setItem("accessToken", token);
    const decodedToken = JSON.parse(atob(token.split(".")[1])); // Decode JWT payload only
    setIsAuthenticated(true);
    setRole(decodedToken.role);
    setLoading(false)
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    setIsAuthenticated(false);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, role,id, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
