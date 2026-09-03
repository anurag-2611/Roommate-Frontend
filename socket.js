import { io } from "socket.io-client";
import { SOCKET_URL } from "./src/Api/client.js";

export const socket = io(SOCKET_URL, {
  withCredentials: true,
  // Do not create a network connection on every page load. Chat opens it only
  // when the user visits a conversation.
  autoConnect: false,
});
