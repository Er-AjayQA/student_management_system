/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import { adminAuthServices } from "../../services/adminServices/authServices";

const AuthContext = createContext();

const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check Auth Status
  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem("auth_token");
      if (token) {
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error("Auth check failed:", error);
    } finally {
      setLoading(false);
    }
  };

  // Login Process
  const login = async (userData, token) => {
    localStorage.setItem("auth_token", token);
    setUser(userData);
    setIsAuthenticated(true);
  };

  // Logout Process
  const logout = () => {
    adminAuthServices.logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    logout,
    setUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { useAuth, AuthProvider };
