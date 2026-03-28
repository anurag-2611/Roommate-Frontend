import { io } from "socket.io-client";

export const socket = io("https://roommate-backend.vercel.app/", {
  withCredentials: true,
});