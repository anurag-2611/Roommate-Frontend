/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { statusFeedback } from "../utils/statusFeedback";

export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [Users, setUsers] = useState([]);

  const [friends, setFriends] = useState([]);
  const [receivedRequests, setReceivedRequests] = useState([]);
  const [sentRequests, setSentRequests] = useState([]);

  const token = localStorage.getItem("accessToken");

  const getProfile = async () => {
    try {
      const response = await axios.get(
        "https://roommate-backend-1.onrender.com/api/user/get-profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        },
      );
      setProfile(response.data.data);
    } catch {
      /* ignore profile fetch error */
    } finally {
      setLoading(false);
    }
  };

  const getUsers = async () => {
    try {
      const response = await axios.get(
        "https://roommate-backend-1.onrender.com/api/user/get-users",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setUsers(response.data.data);
    } catch {
      /* ignore users fetch error */
    } finally {
      setLoading(false);
    }
  };

  const fetchFriendData = async () => {
    try {
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

      setFriends(response.data.data.friends || []);
      setReceivedRequests(response.data.data.receivedRequests || []);
      setSentRequests(response.data.data.sentRequests || []);
    } catch (error) {
      statusFeedback.error(
        error.response?.data?.message || "Failed to load friend data",
      );
    }
  };

  useEffect(() => {
    if (token) {
      getProfile();
      getUsers();
      fetchFriendData();
    } else {
      setLoading(false);
    }
  }, [token]);

  return (
    <ProfileContext.Provider
      value={{
        profile,
        setProfile,
        loading,
        getProfile,
        Users,
        getUsers,
        friends,
        receivedRequests,
        sentRequests,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
