import React, { useEffect, useMemo, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";

export const CreateProfile = () => {
  const token = localStorage.getItem("accessToken");

  const [loading, setLoading] = useState(false);
  const [redirectToLogin, setRedirectToLogin] = useState(false);
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    userName: "",
    fullName: "",
    city: "",
    bio: "",
  });

  const [image, setImage] = useState(null);

  useEffect(() => {
    if (!token) {
      setRedirectToLogin(true);
    }
  }, [token]);

  const previewUrl = useMemo(() => {
    if (!image) return null;
    return URL.createObjectURL(image);
  }, [image]);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const showSuccessToast = (message) => {
    toast.success(message || "Profile created successfully 🎉", {
      position: "top-center",
      autoClose: 2200,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      theme: "light",
    });
  };

  const showErrorToast = (message) => {
    toast.error(message || "Something went wrong", {
      position: "top-center",
      autoClose: 1800,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      theme: "light",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const formDataToSend = new FormData();
      formDataToSend.append("userName", formData.userName.trim());
      formDataToSend.append("fullName", formData.fullName.trim());
      formDataToSend.append("city", formData.city.trim());
      formDataToSend.append("bio", formData.bio.trim());

      if (image) {
        formDataToSend.append("avatar", image);
      }

      const response = await axios.post(
        "https://roommate-backend-1.onrender.com/api/user/userprofile",
        formDataToSend,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      showSuccessToast(response?.data?.message);

      setFormData({
        userName: "",
        fullName: "",
        city: "",
        bio: "",
      });
      setImage(null);

      setTimeout(() => {
        setStep(2);
      }, 1200);
    } catch (error) {
      const message =
        error.response?.data?.message || "Something went wrong";
      showErrorToast(message);
    } finally {
      setLoading(false);
    }
  };

  if (redirectToLogin) {
    return <Navigate to="/login" replace />;
  }

  if (step === 2) {
    return <Navigate to="/profile" replace />;
  }

  return (
    <div className="min-h-screen w-full text-black px-4 py-8 sm:px-6 lg:px-8 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md mt-2 sm:max-w-lg bg-white/20 backdrop-blur-xl border border-white/40 rounded-3xl shadow-2xl p-5 sm:p-7 md:p-8"
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-gray-800">
          Create Profile
        </h2>

        <div className="flex justify-center mb-6">
          <input
            type="file"
            accept="image/*"
            id="profileImage"
            className="hidden"
            onChange={handleImageChange}
          />

          <label
            htmlFor="profileImage"
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gray-100 border-2 border-dashed border-indigo-300 flex items-center justify-center cursor-pointer overflow-hidden shadow-sm hover:scale-105 transition"
          >
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="profile preview"
                className="w-full h-full object-cover"
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.src = "/fallback.webp";
                }}
              />
            ) : (
              <span className="text-gray-700 text-sm sm:text-base font-medium text-center px-2">
                Upload Photo
              </span>
            )}
          </label>
        </div>

        <input
          type="text"
          name="userName"
          placeholder="Username"
          value={formData.userName}
          onChange={handleChange}
          required
          className="w-full lowercase p-3 sm:p-3.5 mb-4 border border-gray-200 outline-none rounded-xl bg-white/80 focus:ring-2 focus:ring-indigo-400"
        />

        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          required
          className="w-full p-3 sm:p-3.5 mb-4 border border-gray-200 outline-none rounded-xl bg-white/80 focus:ring-2 focus:ring-indigo-400"
        />

        <input
          type="text"
          name="city"
          placeholder="City"
          value={formData.city}
          onChange={handleChange}
          required
          className="w-full p-3 sm:p-3.5 mb-4 border border-gray-200 outline-none rounded-xl bg-white/80 focus:ring-2 focus:ring-indigo-400 capitalize"
        />

        <textarea
          name="bio"
          placeholder="Short Bio"
          rows="4"
          value={formData.bio}
          onChange={handleChange}
          className="w-full p-3 sm:p-3.5 mb-6 border border-gray-200 outline-none rounded-xl bg-white/80 focus:ring-2 focus:ring-indigo-400 resize-none"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-linear-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white py-3 rounded-xl font-semibold transition disabled:opacity-70 disabled:cursor-not-allowed shadow-md"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto" />
          ) : (
            "Create Profile"
          )}
        </button>
      </form>
    </div>
  );
};