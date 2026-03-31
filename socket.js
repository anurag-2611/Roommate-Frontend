import { io } from "socket.io-client";

export const socket = io("https://roommate-backend-bh0y1q6g1-anurag-choudharys-projects-c0129f03.vercel.app", {
  withCredentials: true,
});