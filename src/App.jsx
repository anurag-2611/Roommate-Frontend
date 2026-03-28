import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Home } from "./pages/Home";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { AddListing } from "./pages/AddListing";
import { DashBoard } from "./pages/DashBoard";
import { ProtectedRoute } from "./components/ProtectedRoute";

import { RoommateRequest } from "./pages/DashBoardPages/RoommateRequest";
import { Messages } from "./pages/DashBoardPages/Messages";
import { SearchListing } from "./pages/DashBoardPages/SearchListing";
import { Favorites } from "./pages/DashBoardPages/Favorites";
import { CreateProfile } from "./pages/CreateProfile";
import { RoomDetails } from "./pages/RoomDetails";
import { AddFriend } from "./components/AddFriend";
import { Profile } from "./pages/Profile";
import { MyListing } from "./pages/MyListing";
import { ConversationPage } from "./pages/ConversationPage";

import { NotFound } from "./pages/NotFound";

export const App = () => {
  return (
    <div className="bg w-full h-full text-white flex  items-start">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/create-profile" element={<CreateProfile />} />

        {/* Protected Routes */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashBoard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-listing"
          element={
            <ProtectedRoute>
              <MyListing />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-home"
          element={
            <ProtectedRoute>
              <AddListing />
            </ProtectedRoute>
          }
        />

        <Route
          path="/messages"
          element={
            <ProtectedRoute>
              <Messages />
            </ProtectedRoute>
          }
        />

        <Route
          path="/messages/:friendId"
          element={
            <ProtectedRoute>
              <ConversationPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/favorites"
          element={
            <ProtectedRoute>
              <Favorites />
            </ProtectedRoute>
          }
        />

        <Route
          path="/search-listing"
          element={
            <ProtectedRoute>
              <SearchListing />
            </ProtectedRoute>
          }
        />

        <Route
          path="/roommate-req"
          element={
            <ProtectedRoute>
              <RoommateRequest />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-friend"
          element={
            <ProtectedRoute>
              <AddFriend />
            </ProtectedRoute>
          }
        />

        {/* Public */}
        <Route path="/room/:id" element={<RoomDetails />} />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
};
