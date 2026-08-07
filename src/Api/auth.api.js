import { api } from "./client";

const registerUser = async (userData) => {
  const response = await api.post("/user/register", userData);
  return response.data;
};

const loginUser = async (userData) => {
  const response = await api.post("/user/login", userData);
  return response.data;
};

const logoutUser = async () => {
  const response = await api.post("/user/logout");

  return response.data;
};

const getCurrentUser = async () => {
  const response = await api.get("/user/get-current-user");

  return response.data;
};

export { registerUser, loginUser, logoutUser, getCurrentUser };
