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
          },
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
        },
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
    <div className="w-full min-h-screen p-3 sm:p-5 md:p-6">
      <div className="max-w-6xl mx-auto h-[95vh] bg-white/70 backdrop-blur-lg rounded-3xl shadow-xl border border-white/40 overflow-hidden flex flex-col">
        {/* Top Header */}
        <div className="w-full px-4 sm:px-6 py-4 border-b border-gray-200 bg-white/60 backdrop-blur-md flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            {friend?.avatar ? (
              <img
                src={friend.avatar}
                alt={friend.fullName || "Friend"}
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover border-2 border-white shadow"
              />
            ) : (
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-blue-200 flex items-center justify-center font-bold text-lg text-blue-700 shadow">
                {friend?.fullName
                  ? friend.fullName.charAt(0).toUpperCase()
                  : "U"}
              </div>
            )}

            <div className="min-w-0">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 truncate">
                {friend?.fullName || "Unknown User"}
              </h2>
              <p className="text-sm text-gray-600 truncate">
                @{friend?.userName || "username"}
              </p>
            </div>
          </div>

          <div className="hidden sm:block text-right">
            <p className="text-sm font-medium text-green-600">Online</p>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-5 bg-linear-to-b from-transparent to-blue-50/40">
          <div className="space-y-4">
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
                      className={`max-w-[80%] sm:max-w-[60%] px-4 py-3 rounded-2xl shadow-sm ${
                        isMyMessage
                          ? "bg-blue-500 text-white rounded-br-md"
                          : "bg-white text-gray-800 rounded-bl-md border border-gray-100"
                      }`}
                    >
                      <p className="text-sm sm:text-base">{msg.text}</p>
                      <p className="text-[11px] mt-1 opacity-70">
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
              <div className="w-full h-full flex items-center justify-center">
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
              className="flex-1 h-12 px-4 rounded-full border border-gray-300 bg-white text-gray-800 outline-none focus:ring-2 focus:ring-blue-400"
            />

            <button
              onClick={handleSend}
              className="px-5 sm:px-6 h-12 rounded-full bg-blue-500 hover:bg-blue-600 text-white font-medium shadow transition active:scale-95"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
