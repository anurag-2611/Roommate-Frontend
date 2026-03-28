import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Heart, MessageCircle, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { DashBoardHeader } from "../../components/DashBoard/DashBoardHeader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Footer } from "../../components/Footer";

export const Favorites = () => {
  const token = localStorage.getItem("accessToken");
  const [favoriteListings, setfavoriteListings] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const getFavorites = async () => {
      try {
        if (!token) return;

        const res = await axios.get(
          "http://localhost:5000/api/user/favorites",
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setfavoriteListings(res.data.data.favorites);
      } catch (error) {
        console.log(error);
      }
    };

    getFavorites();
  }, []);

  const toggleFavorite = async (id) => {
    try {
      if (favoriteListings.some((item) => item._id === id)) {
        const response = await axios.delete(
          `/api/user/remove-favorite/${id}`,
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setfavoriteListings((prev) => prev.filter((fav) => fav._id !== id));
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {" "}
      <div className="min-h-screen pt-25 bg-linear-to-br from-blue-200 to-gray-100 p-6 absolute w-full">
        {/* Navbar */}
        <DashBoardHeader />

        <div className="flex gap-6">
          {/* Main Content */}
          <div className="flex flex-col justify-center items-center -ml-6 sm:ml-0  w-[90%] sm:w-[80%]">
            <div className="rounded-2xl w-full shadow-md p-6 mb-6 relative left-[12%]">
              <div className="flex justify-between items-center">
                <h2 className=" text-2xl font-semibold text-black mb-2">
                  Your Favorite Listings
                </h2>
                <h2 className="sm:block text-2xl">
                  <svg className="w-5 h-5" fill="#fb6f92" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </h2>
              </div>

              <p className="text-gray-500 hidden sm:block">
                Properties you have saved for later
              </p>
            </div>

            {/* Favorites Grid */}
            {favoriteListings.length === 0 ? (
              <div className="bg-white w-full relative left-[12%] text-3xl rounded-2xl shadow-md p-10 py-20 mt-20 sm:mt-2 text-center text-gray-500 hover:scale-105 transition-transform duration-300">
                No favorites yet ❤️
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-4 sm:grid-cols-3 gap-6 relative left-[12%] w-full">
                {favoriteListings.map((item) => (
                  <div
                    key={item._id}
                    onClick={() => navigate(`/room/${item._id}`)}
                    className="bg-white rounded-2xl shadow-md overflow-hidden"
                  >
                    <div className="relative">
                      <img
                        src={item.thumbnail}
                        alt="listing"
                        className="h-48 w-full object-cover"
                      />{" "}
                      <Heart
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(item._id);
                        }}
                        className={`absolute top-3 right-3 ${
                          favoriteListings.some((fav) => fav._id === item._id)
                            ? "text-red-500 fill-red-500"
                            : "text-black"
                        }`}
                      />
                    </div>

                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-purple-800">
                        {item.rent} <span className="text-sm">/ month</span>
                      </h3>
                      <p className="text-gray-600">{item.nearestCity}</p>
                      <p className="text-gray-500 text-sm">
                        {item.type} {"  "}• {item.connectivity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};
