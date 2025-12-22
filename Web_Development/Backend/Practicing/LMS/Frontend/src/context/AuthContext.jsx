import { createContext, useContext, useState } from "react";
import axiosInstance from "../api/axiosInstance.js";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [user, setUser] = useState();
  const nav = useNavigate();

  const login = async (userData) => {
    try {
      const res = await axiosInstance.post("/auth/login", userData);
      console.log(res)
      if (res.status === 200) {
        setUser({name:res.data.name,email:res.data.email});
        nav("/");
      }
    } catch (error) {
      console.log("Failed to Login");
    }
  };

  const register = async (userData) => {
    try {
      const res = await axiosInstance.post("/auth/register", userData);
      console.log(res);
      if (res.status === 201) nav("/login");
      return res.status;
    } catch (error) {
      console.log("Failed to Register");
    }
  };

  const logout = async () => {
    const res = await axiosInstance.post("/auth/logout");
    console.log(res.data);
    if (res.status === 200) {
      nav("/login");
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
