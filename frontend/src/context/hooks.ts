import { useContext } from "react";
import AuthContext, {  AuthContextType } from "./AuthContext";
import { FirestoreAdminContext, FirestoreplayerContext } from "./FirestoreContext";
import { ThemeProviderContext } from "./theme-provider";

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
      throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
  };

// Custom hook to use Firestore data
export const useFirestoreData = () => {
  const context = useContext(FirestoreAdminContext);
  if (context === undefined) {
    throw new Error('useFirestoreData must be used within a FirestoreDataProvider');
  }
  return context;
};
export const usePlayerData = () => {
  const context = useContext(FirestoreplayerContext);
  if (context === undefined) {
    throw new Error('useFirestoreData must be used within a FirestoreDataProvider');
  }
  return context;
};

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider")

  return context
}