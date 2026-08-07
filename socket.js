import { io } from "socket.io-client";
import { SOCKET_URL } from "./src/Api/client.js";

export const socket = io(SOCKET_URL, {
  withCredentials: true,
});
