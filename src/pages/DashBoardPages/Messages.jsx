import React, { useEffect, useState } from "react";
import { api } from "../../Api/client";
import { statusFeedback } from "../../utils/statusFeedback";
import { useNavigate } from "react-router-dom";
import { DashBoardHeader } from "../../components/DashBoard/DashBoardHeader";
import { LoadingState } from "../../components/LoadingState";

export const Messages = () => {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [removeLoading, setRemoveLoading] = useState("");

  const navigate = useNavigate();

  const fetchFriendData = async () => {
    try {
      setLoading(true);

      const response = await api.get("/friend/my-friends-data");

      if (response.data && response.data.data && response.data.data.friends) {
        setFriends(response.data.data.friends);
      } else {
        setFriends([]);
      }
    } catch (error) {
      console.error("Friend fetch error:", error);
      statusFeedback.error("We couldn’t load your friends. Please refresh the page and try again.");
      setFriends([]);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFriend = async (e, friendId) => {
    e.stopPropagation();

    try {
      setRemoveLoading(friendId);

      await api.delete(`/friend/remove-friend/${friendId}`);

      setFriends((prev) => prev.filter((friend) => friend._id !== friendId));

      statusFeedback.success("Friend removed successfully.");
    } catch (error) {
      console.error("Remove friend error:", error);
      statusFeedback.error("We couldn’t remove this friend. Please try again.");
    } finally {
      setRemoveLoading("");
    }
  };

  useEffect(() => {
    fetchFriendData();
  }, []);

  if (loading) {
    return <LoadingState fullScreen message="Loading your connections" description="Finding your RoomMate conversations…" />;
  }

  return (
    <div className="w-full min-h-screen p-4 sm:p-6">
      <DashBoardHeader />

      <div className="max-w-6xl mx-auto mt-20">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
          Friends
        </h1>

        <p className="text-sm sm:text-base text-gray-600 mb-6">
          Your friends list
        </p>

        <div className="bg-white rounded-2xl shadow p-4 sm:p-6">
          <p className="text-sm sm:text-base font-medium text-gray-700 mb-4">
            Total Friends: {friends.length}
          </p>

          {friends.length === 0 && (
            <div className="text-center py-10">
              <h2 className="text-lg font-semibold text-gray-800">
                No friends found
              </h2>
              <p className="text-sm text-gray-500 mt-2">
                Accept friend requests to see friends here.
              </p>
            </div>
          )}

          {friends.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {friends.map((friend) => {
                return (
                  <div
                    onClick={() => {
                      navigate(`/messages/${friend._id}`, { state: friend });
                    }}
                    key={friend._id}
                    className="border rounded-xl p-4 bg-red-300/30 hover:shadow-lg transition cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      {friend.avatar ? (
                        <img
                          src={friend.avatar}
                          alt="friend"
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-blue-200 flex items-center justify-center font-bold text-blue-700">
                          {friend.fullName
                            ? friend.fullName.charAt(0).toUpperCase()
                            : "U"}
                        </div>
                      )}
                      <div className="flex items-center justify-around gap-5">
                        <div>
                          <p className="font-semibold text-gray-900">
                            {friend.fullName ? friend.fullName : "Unknown User"}
                          </p>

                          <p className="text-sm text-gray-600">
                            @{friend.userName ? friend.userName : "username"}
                          </p>

                          <p className="text-xs text-gray-500">
                            {friend.city ? friend.city : "No city"}
                          </p>
                        </div>
                        <div>
                          <button
                            onClick={(e) => handleRemoveFriend(e, friend._id)}
                            disabled={removeLoading === friend._id}
                            className="mt-4 w-full sm:w-auto px-4 py-2 sm:py-1.5 
             bg-red-500 hover:bg-red-600 disabled:bg-red-300 
             text-white rounded-full text-sm sm:text-xs 
             font-medium transition flex items-center justify-center"
                          >
                            {removeLoading === friend._id
                              ? "Removing..."
                              : "Remove"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
