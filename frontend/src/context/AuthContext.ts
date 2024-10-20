import { createContext } from "react";

// Define Auth Context Types
export interface AuthContextType {
  isAuthenticated: boolean;
  role: "admin"| "player" | null;
  login: (token: string) => void;
  logout: () => void;
}

// Create the Auth Context
const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export default AuthContext;
// AuthProvider Component


