import React, { useEffect, useRef, useState, useContext } from "react";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";
import { socket } from "../../socket.js";
import { AuthContext } from "../context/AnthContext.jsx";

export const ConversationPage = () => {
  const { friendId } = useParams();
  const location = useLocation();
  const friend = location.state || {};

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  const { user } = useContext(AuthContext);
  const currentUser = user;

  const bottomRef = useRef(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const token = localStorage.getItem("accessToken");

        const response = await axios.get(
          `https://roommate-backend-1.onrender.com/api/message/${friendId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );

        setMessages(response.data.messages || []);
      } catch (error) {
        console.log("Error fetching messages:", error);
      }
    };

    if (friendId) {
      fetchMessages();
    }
  }, [friendId]);

  useEffect(() => {
    if (!currentUser?._id) return;

    socket.emit("join", currentUser._id);
  }, [currentUser]);

  useEffect(() => {
    socket.on("receive_message", (newMessage) => {
      setMessages((prev) => {
        const alreadyExists = prev.some((msg) => msg._id === newMessage._id);
        if (alreadyExists) return prev;

        return [...prev, newMessage];
      });
    });

    return () => {
      socket.off("receive_message");
    };
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!message.trim()) return;

    try {
      const token = localStorage.getItem("accessToken");

      const response = await axios.post(
        "https://roommate-backend-1.onrender.com/api/message/send",
        {
          receiverId: friendId,
          text: message,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      const newMessage = response.data.message;

      setMessages((prev) => [...prev, newMessage]);

      socket.emit("send_message", newMessage);
      setMessage("");
    } catch (error) {
      console.log("Error sending message:", error);
    }
  };

  return (
    <div className="w-full min-h-dvh p-2 sm:p-4 md:p-6">
      <div className="max-w-6xl mx-auto h-dvh sm:h-[95vh] bg-white/70 backdrop-blur-lg rounded-none sm:rounded-3xl shadow-xl border border-white/40 overflow-hidden flex flex-col">
        {/* Top Header */}
        <div className="w-full px-3 sm:px-6 py-3 sm:py-4 border-b border-gray-200 bg-white/60 backdrop-blur-md flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            {friend?.avatar ? (
              <img
                src={friend.avatar}
                alt={friend.fullName || "Friend"}
                className="w-10 h-10 sm:w-14 sm:h-14 rounded-full object-cover border-2 border-white shadow shrink-0"
              />
            ) : (
              <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-blue-200 flex items-center justify-center font-bold text-base sm:text-lg text-blue-700 shadow shrink-0">
                {friend?.fullName
                  ? friend.fullName.charAt(0).toUpperCase()
                  : "U"}
              </div>
            )}

            <div className="min-w-0">
              <h2 className="text-base sm:text-xl font-bold text-gray-900 truncate">
                {friend?.fullName || "Unknown User"}
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 truncate">
                @{friend?.userName || "username"}
              </p>
            </div>
          </div>

          <div className="hidden sm:block text-right shrink-0">
            <p className="text-sm font-medium text-green-600">Online</p>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto px-3 sm:px-6 py-4 sm:py-5 bg-linear-to-b from-transparent to-blue-50/40">
          <div className="space-y-3 sm:space-y-4">
            {messages.length > 0 ? (
              messages.map((msg) => {
                const isMyMessage =
                  msg.senderId === currentUser?._id ||
                  msg.senderId?._id === currentUser?._id;

                return (
                  <div
                    key={msg._id}
                    className={`flex ${
                      isMyMessage ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[88%] sm:max-w-[75%] md:max-w-[60%] px-3 sm:px-4 py-2.5 sm:py-3 rounded-2xl shadow-sm wrap-break-words ${
                        isMyMessage
                          ? "bg-blue-500 text-white rounded-br-md"
                          : "bg-white text-gray-800 rounded-bl-md border border-gray-100"
                      }`}
                    >
                      <p className="text-sm sm:text-base wrap-break-words">
                        {msg.text}
                      </p>
                      <p className="text-[10px] sm:text-[11px] mt-1 opacity-70">
                        {new Date(msg.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="w-full h-full flex items-center justify-center text-center px-4">
                <p className="text-gray-500 text-sm sm:text-base">
                  No messages yet. Start the conversation.
                </p>
              </div>
            )}

            <div ref={bottomRef}></div>
          </div>
        </div>

        {/* Bottom Input */}
        <div className="w-full px-3 sm:px-5 py-3 border-t border-gray-200 bg-white/70 backdrop-blur-md">
          <div className="flex items-center gap-2 sm:gap-3">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSend();
                }
              }}
              placeholder="Type your message..."
              className="flex-1 min-w-0 h-11 sm:h-12 px-4 rounded-full border border-gray-300 bg-white text-gray-800 outline-none focus:ring-2 focus:ring-blue-400 text-sm sm:text-base"
            />

            <button
              onClick={handleSend}
              className="px-4 sm:px-6 h-11 sm:h-12 rounded-full bg-blue-500 hover:bg-blue-600 text-white text-sm sm:text-base font-medium shadow transition active:scale-95 shrink-0"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};