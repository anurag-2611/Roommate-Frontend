import React, { useContext, useState } from "react";
import { ProfileContext } from "../context/ProfileContext";
import { Navigate, useNavigate } from "react-router-dom";
import RoomMatelogo from "../assets/RoomMate logo.png";
import axios from "axios";
import { toast } from "react-toastify";

export const Profile = () => {
  const token = localStorage.getItem("accessToken");
  const [showProfile, setShowProfile] = useState(false);

  const navigate = useNavigate();
  const { profile, loading, Users } = useContext(ProfileContext);

  const sendFriendRequest = async (profileId) => {
    try {
      const response = await axios.post(
        `https://roommate-backend-1.onrender.com/api/user/my-listings/api/friend/send-request/${profileId}`,
        {},
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(response.data.message || "Request sent");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send request");
    }
  };

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center w-full h-screen m-auto bg-gray-200">
        <div className="w-14 h-14 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <h2 className="text-xl font-semibold text-gray-800">Loading Profile</h2>
        <p className="text-gray-500 text-sm mt-1">
          Please wait while we fetch your data...
        </p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex justify-center items-center h-screen w-full p-4">
        <div className="bg-white/40 -mt-20 sm:mt-0 backdrop-blur-xl border border-white/30 shadow-xl rounded-3xl p-8 flex flex-col items-center text-center max-w-md w-full">
          <div className="bg-purple-100 p-4 rounded-full mb-4 shadow-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-10 h-10 text-purple-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 14l9-5-9-5-9 5 9 5zm0 0v6m0-6L3 9m9 5l9-5"
              />
            </svg>
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            No Profile Found
          </h2>

          <p className="text-gray-600 text-sm mb-6">
            Looks like you haven’t created your profile yet. Let’s get you
            started 🚀
          </p>

          <button
            onClick={() => navigate("/create-profile")}
            className="px-6 py-3 rounded-xl bg-linear-to-r from-purple-500 to-blue-500 text-white font-medium shadow-md hover:scale-105 transition duration-300"
          >
            Create Profile
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full sm:w-[90%] lg:w-[80%] bg-transparent m-auto px-4 sm:px-6 lg:px-10 py-6 sm:py-10">
      {/* Profile Popup */}
      {showProfile && (
        <div
          className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 px-4"
          onClick={() => setShowProfile(false)}
        >
          <div
            className="bg-white rounded-2xl p-6 w-full max-w-md relative shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowProfile(false)}
              className="absolute top-3 right-3 text-xl cursor-pointer"
            >
              ✖
            </button>

            <div className="flex flex-col items-center gap-3">
              <img
                src={profile?.avatar}
                alt="profile"
                className="w-24 h-24 rounded-full object-cover border-4 border-gray-200"
              />

              <h2 className="text-xl font-semibold text-gray-900">
                {profile?.fullName}
              </h2>

              <p className="text-gray-500">@{profile?.userName}</p>

              <p className="text-sm text-gray-600 text-center">
                {profile?.bio || "No bio available"}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Navbar */}
      <div className="py-1 px-4 sm:px-6 md:px-10 w-[95%] sm:w-[90%] lg:w-[75%] flex justify-between items-center text-black rounded-full fixed z-10 top-4 left-1/2 transform -translate-x-1/2 shadow-lg bg-white/15 backdrop-blur-lg border border-white/10">
        <div className="w-24 sm:w-28 md:w-33 flex justify-center items-center">
          <div>
            <img
              onClick={() => setShowProfile(true)}
              className="w-full py-2 cursor-pointer"
              src={RoomMatelogo}
              alt="Roommate Logo"
            />
          </div>
        </div>

        <div
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-white cursor-pointer"
          onClick={() => setShowProfile(true)}
        >
          <img
            src={profile.avatar}
            alt="profile"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Profiles Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-28 sm:mt-32 lg:mt-24 gap-10 wrap-break-words justify-items-center">
        {Users
          .filter((user) => user._id !== profile?._id)
          .map((user) => (
            <div
              key={user._id}
              className="relative group w-full max-w-70 min-h-70 rounded-3xl p-6 flex flex-col items-center bg-white/30 backdrop-blur-xl border border-white/20 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
            >
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg -mt-14 bg-white z-10">
                <img
                  src={user.avatar}
                  alt="profile"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = "/fallback.webp";
                  }}
                />
              </div>

              <div className="flex flex-col items-center flex-1 text-center mt-5 z-10">
                <h2 className="text-lg font-semibold text-gray-900">
                  {user.fullName}
                </h2>

                <p className="text-sm text-purple-600 font-medium">
                  @{user.userName}
                </p>

                <p className="text-xs text-gray-600 mt-2 line-clamp-2">
                  {user.bio || "No bio available"}
                </p>
              </div>

              <button
                onClick={() => sendFriendRequest(user._id)}
                className="z-10 mt-auto w-full py-2 rounded-xl font-medium bg-linear-to-r from-green-400 to-emerald-500 text-white shadow-md hover:scale-105 hover:shadow-lg active:scale-95 transition-all"
              >
                Send Request
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};