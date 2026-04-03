import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { DashBoardHeader } from "../../components/DashBoard/DashBoardHeader";

export const RoommateRequest = () => {
  const [receivedRequests, setReceivedRequests] = useState([]);
  const [friends, setFriends] = useState([]);
  const [sentRequests, setSentRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFriendData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("accessToken");

      const response = await axios.get(
        "https://roommate-backend-1.onrender.com/api/friend/my-friends-data",
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setFriends(response.data?.data?.friends || []);
      setReceivedRequests(response.data?.data?.receivedRequests || []);
      setSentRequests(response.data?.data?.sentRequests || []);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to load friend requests",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFriendData();
  }, []);

  const acceptRequest = async (senderProfileId) => {
    try {
      const token = localStorage.getItem("accessToken");

      const response = await axios.post(
        `https://roommate-backend-1.onrender.com/api/friend/accept-request/${senderProfileId}`,
        {},
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.success(response.data.message || "Request accepted");
      fetchFriendData();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to accept request");
    }
  };

  const rejectRequest = async (senderProfileId) => {
    try {
      const token = localStorage.getItem("accessToken");

      const response = await axios.post(
        `https://roommate-backend-1.onrender.com/api/friend/reject-request/${senderProfileId}`,
        {},
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.success(response.data.message || "Request rejected");
      fetchFriendData();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to reject request");
    }
  };

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-linear-to-r from-[#92b6d8ce] to-[#bed7f0] px-4 py-6 sm:px-6 md:px-8">
        <div className="max-w-6xl mx-auto">
          <DashBoardHeader />
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="bg-white/60 backdrop-blur-lg border border-white/20 rounded-2xl px-6 py-5 shadow-lg text-center">
              <p className="text-base sm:text-lg font-medium text-gray-700">
                Loading requests...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-linear-to-r from-[#92b6d8ce] to-[#bed7f0] px-4 py-5 sm:px-6 md:px-8">
      <div className="max-w-6xl mx-auto">
        <DashBoardHeader />

        <div className="mb-6 sm:mb-8 pt-20 sm:pt-24">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 leading-tight">
            Roommate Requests
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Review and respond to roommate requests from interested users
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-5 sm:gap-6">
          {/* Stats Section */}
          <div className="w-full lg:w-[32%] grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4">
            <div className="bg-white/40 backdrop-blur-lg border border-white/20 rounded-2xl p-4 sm:p-5 shadow-lg">
              <p className="text-gray-600 text-sm font-medium">
                Total Requests
              </p>
              <p className="text-2xl sm:text-3xl font-bold text-[#84ea51] mt-2">
                {receivedRequests.length}
              </p>
            </div>

            <div className="bg-white/40 backdrop-blur-lg border border-white/20 rounded-2xl p-4 sm:p-5 shadow-lg">
              <p className="text-gray-600 text-sm font-medium">Pending</p>
              <p className="text-2xl sm:text-3xl font-bold text-blue-500 mt-2">
                {receivedRequests.length}
              </p>
            </div>

            <div className="bg-white/40 backdrop-blur-lg border border-white/20 rounded-2xl p-4 sm:p-5 shadow-lg">
              <p className="text-gray-600 text-sm font-medium">Friends</p>
              <p className="text-2xl sm:text-3xl font-bold text-green-500 mt-2">
                {friends.length}
              </p>
            </div>
          </div>

          {/* Request List */}
          <div className="w-full lg:w-[68%]">
            {receivedRequests.length > 0 ? (
              <div className="flex flex-col gap-4">
                {receivedRequests.map((user) => (
                  <div
                    key={user._id}
                    className="bg-white/70 backdrop-blur-lg border border-white/20 rounded-2xl shadow-sm p-4 sm:p-5"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="min-w-0">
                        <h3 className="text-base sm:text-lg font-semibold text-gray-900 truncate">
                          {user.fullName}
                        </h3>
                        <p className="text-sm text-gray-600 truncate">
                          @{user.userName}
                        </p>
                      </div>

                      <div className="flex flex-col xs:flex-row sm:flex-row gap-2 w-full sm:w-auto">
                        <button
                          onClick={() => acceptRequest(user._id)}
                          className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-green-500 text-white font-medium hover:bg-green-600 active:scale-[0.98] transition"
                        >
                          Accept
                        </button>

                        <button
                          onClick={() => rejectRequest(user._id)}
                          className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-red-500 text-white font-medium hover:bg-red-600 active:scale-[0.98] transition"
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="w-full bg-white/60 backdrop-blur-lg border border-white/20 rounded-2xl p-8 sm:p-10 md:p-12 text-center shadow-lg">
                <svg
                  className="w-14 h-14 sm:w-16 sm:h-16 mx-auto text-gray-400 mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M20 21l-4.35-4.35m0 0A7.5 7.5 0 103.305 3.305a7.5 7.5 0 0010.345 10.345z"
                  />
                </svg>

                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                  No Requests Yet
                </h3>

                <p className="text-sm sm:text-base text-gray-600 max-w-md mx-auto">
                  You haven't received any roommate requests yet. Check back
                  later.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};