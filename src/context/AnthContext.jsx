import React, { createContext, useState } from "react";
import {registerUser,loginUser,logoutUser,getCurrentUser,} from "../Api/auth.api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const register = async (data) => {
    const response = await registerUser(data);

    console.log(response);
    return response;
  };

  const login = async (data) => {
    const response = await loginUser(data);

    if (response?.data?.accessToken) {
      localStorage.setItem("accessToken", response.data.accessToken);
    }

    console.log(response);
    return response;
  };

  const logout = async () => {
    const response = await logoutUser();
    localStorage.removeItem("accessToken");
    setUser(null);

    console.log(response);
    return response;
  };

  const getMe = async () => {
    const response = await getCurrentUser();
    setUser(response?.data || null);

    console.log(response);
    return response;
  };

  return (
    <AuthContext.Provider value={{ register, login, logout, getMe, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};