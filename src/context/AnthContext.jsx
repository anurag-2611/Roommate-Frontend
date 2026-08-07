import { useCallback, useEffect, useState } from "react";
import { registerUser, loginUser, logoutUser, getCurrentUser } from "../Api/auth.api";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const register = useCallback(async (data) => {
    const response = await registerUser(data);

    return response;
  }, []);

  const login = useCallback(async (data) => {
    const response = await loginUser(data);

    if (response?.data?.accessToken) {
      localStorage.setItem("accessToken", response.data.accessToken);
      setUser(response.data.user || null);
    }

    return response;
  }, []);

  const logout = useCallback(async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error(
        "Logout API call failed:",
        error?.response?.data?.message || error.message,
      );
    } finally {
      localStorage.removeItem("accessToken");
      setUser(null);
    }
  }, []);

  const getMe = useCallback(async () => {
    const response = await getCurrentUser();
    setUser(response?.data || null);

    return response;
  }, []);

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) return;

    getMe().catch(() => {
      localStorage.removeItem("accessToken");
      setUser(null);
    });
  }, [getMe]);

  return (
    <AuthContext.Provider value={{ register, login, logout, getMe, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
