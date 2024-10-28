import { createContext } from "react";

// Define Auth Context Types
export interface AuthContextType {
  id:string | undefined;
  isAuthenticated: boolean;
  role: "admin"| "player" | null;
  isLoading : boolean;
  login: (token: string) => void;
  logout: () => void;
}

// Create the Auth Context
const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export default AuthContext;
// AuthProvider Component


