import axios from "axios";

const registerUser = async (userData) => {
  const response = await axios.post("/api/user/register", userData);
  return response.data;
};

const loginUser = async (userData) => {
  const response = await axios.post("/api/user/login", userData);
  return response.data;
};

const logoutUser = async () => {
  const response = await axios.post("/api/user/logout");
  return response.data;
};

const getCurrentUser = async () => {
  const token = localStorage.getItem("accessToken");

  const response = await axios.get("/api/user/get-current-user", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export {registerUser , loginUser ,logoutUser , getCurrentUser}