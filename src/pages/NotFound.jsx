import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen flex items-center justify-center px-4">
      <div className="bg-white/40 backdrop-blur-xl border border-white/30 shadow-xl rounded-2xl p-10 text-center max-w-md w-full">
        
        <h1 className="text-5xl font-bold text-blue-600 mb-4">
          404
        </h1>

        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Page Not Found
        </h2>

        <p className="text-gray-600 mb-6">
          The page you are looking for does not exist.
        </p>

        <button
          onClick={() => navigate("/")}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition"
        >
          Go Home
        </button>
      </div>
    </div>
  );
};
export {NotFound}