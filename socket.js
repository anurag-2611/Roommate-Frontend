import { io } from "socket.io-client";

export const socket = io("https://roommate-backend-1.onrender.com", {
  withCredentials: true,
});