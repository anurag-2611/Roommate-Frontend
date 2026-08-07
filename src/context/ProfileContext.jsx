/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useCallback, useEffect, useState } from "react";
import { api } from "../Api/client";
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

  const getProfile = useCallback(async () => {
    try {
      const response = await api.get("/user/get-profile");
      setProfile(response.data.data);
    } catch {
      /* ignore profile fetch error */
    } finally {
      setLoading(false);
    }
  }, []);

  const getUsers = useCallback(async () => {
    try {
      const response = await api.get("/user/get-users");
      setUsers(response.data.data);
    } catch {
      /* ignore users fetch error */
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchFriendData = useCallback(async () => {
    try {
      const response = await api.get("/friend/my-friends-data");

      setFriends(response.data.data.friends || []);
      setReceivedRequests(response.data.data.receivedRequests || []);
      setSentRequests(response.data.data.sentRequests || []);
    } catch (error) {
      if (error.response?.status === 404) return;

      statusFeedback.error(
        error.response?.data?.message || "Failed to load friend data",
      );
    }
  }, []);

  useEffect(() => {
    if (token) {
      setLoading(true);
      getProfile();
      getUsers();
      fetchFriendData();
    } else {
      setProfile(null);
      setUsers([]);
      setFriends([]);
      setReceivedRequests([]);
      setSentRequests([]);
      setLoading(false);
    }
  }, [fetchFriendData, getProfile, getUsers, token]);

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
