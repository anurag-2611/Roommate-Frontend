import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { DashBoardHeader } from "../components/DashBoard/DashBoardHeader";
import { Footer } from "../components/Footer";

export const AddListing = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const steps = ["Room Details", "Photos & Video", "Rental Terms"];
  const [formData, setFormData] = useState({
    title: "",
    address: "",
    description: "",
    type: "",
    roomAvailable: "",
    bathrooms: "",
    rent: "",
    nearestCity: "",
    connectivity: "",
    phoneNumber: "",
    email: "",
    photos: [],
    videos: [],
    thumbnail: null,
    rentalTerms: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      setFormData((prev) => ({ ...prev, [name]: Array.from(files) }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleNext = (e) => {
    e.preventDefault();
    setStep((prev) => prev + 1);
  };

  const handleBack = (e) => {
    e.preventDefault();
    setStep((prev) => prev - 1);
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-blue-200 via-indigo-100 to-blue-50 py-6 sm:py-10 px-3 sm:px-4 text-blue-950 font-medium">
       <DashBoardHeader/>
      <div className="w-full mt-20 max-w-5xl">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center mb-6 sm:mb-10 text-blue-900 tracking-tight drop-shadow-lg animate-fade-in">
          Create a New Listing
        </h1>

        {/* Stepper */}
        <div className="flex items-center justify-center mb-6 sm:mb-10 overflow-x-auto">
          {steps.map((label, idx) => (
            <div key={label} className="flex items-center shrink-0">
              <div
                className={`flex items-center justify-center p-2 w-24 sm:w-32 md:w-40 h-8 sm:h-10 rounded-full border-2 transition-all duration-300 font-bold text-xs sm:text-sm md:text-lg whitespace-nowrap
                ${step === idx + 1 ? "bg-blue-600 border-blue-600 text-white shadow-lg" : step > idx + 1 ? "bg-green-400 border-green-400 text-white" : "bg-white border-blue-300 text-blue-400"}`}
              >
                {label}
              </div>
              {idx < steps.length - 1 && (
                <div
                  className={`w-6 sm:w-8 md:w-12 h-1 mx-1 sm:mx-2 rounded transition-all duration-300
                  ${step > idx + 1 ? "bg-green-400" : "bg-blue-200"}`}
                ></div>
              )}
            </div>
          ))}
        </div>

        <div className="bg-white/70 w-full shadow-2xl rounded-2xl p-4 sm:p-8 md:p-12 transition-all duration-500 animate-fade-in-step">
          {step === 1 && (
            <form onSubmit={handleNext} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-blue-900 font-semibold mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="w-full capitalize outline-none border-2 border-blue-200 rounded-lg px-4 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                  />
                </div>
                <div>
                  <label className="block text-blue-900 font-semibold mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    className="w-full outline-none border-2 border-blue-200 rounded-lg px-4 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-blue-900 font-semibold mb-1">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    className="w-full outline-none border-2 border-blue-200 rounded-lg px-4 py-2 min-h-30 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                  />
                </div>
                <div>
                  <label className="block text-blue-900 font-semibold mb-1">
                    Type
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    required
                    className="w-full outline-none border-2 border-blue-200 rounded-lg px-4 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                  >
                    <option value="">Select type</option>
                    <option value="1RK">1RK</option>
                    <option value="2RK">2RK</option>
                    <option value="1BHK">1BHK</option>
                    <option value="2BHK">2BHK</option>
                    <option value="3BHK">3BHK</option>
                    <option value="SHARED">SHARED</option>
                    <option value="FLAT">FLAT</option>
                    <option value="PG">PG</option>
                  </select>
                </div>
                <div>
                  <label className="block text-blue-900 font-semibold mb-1">
                    Room Available
                  </label>
                  <input
                    type="number"
                    name="roomAvailable"
                    value={formData.roomAvailable}
                    onChange={handleChange}
                    min="1"
                    required
                    className="w-full outline-none border-2 border-blue-200 rounded-lg px-4 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                  />
                </div>
                <div>
                  <label className="block text-blue-900 font-semibold mb-1">
                    Number of Bathrooms
                  </label>
                  <input
                    type="number"
                    name="bathrooms"
                    value={formData.bathrooms}
                    onChange={handleChange}
                    min="1"
                    required
                    className="w-full outline-none border-2 border-blue-200 rounded-lg px-4 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                  />
                </div>
                <div>
                  <label className="block text-blue-900 font-semibold mb-1">
                    Rent Price (₹/month)
                  </label>
                  <input
                    type="number"
                    name="rent"
                    value={formData.rent}
                    onChange={handleChange}
                    min="0"
                    required
                    className="w-full outline-none border-2 border-blue-200 rounded-lg px-4 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                  />
                </div>
                <div>
                  <label className="block text-blue-900 font-semibold mb-1">
                    Nearest City
                  </label>
                  <input
                    type="text"
                    name="nearestCity"
                    value={formData.nearestCity}
                    onChange={handleChange}
                    required
                    className="w-full capitalize outline-none border-2 border-blue-200 rounded-lg px-4 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-blue-900 font-semibold mb-1">
                    Connectivity (Metro, Bus, etc.)
                  </label>
                  <input
                    type="text"
                    name="connectivity"
                    value={formData.connectivity}
                    onChange={handleChange}
                    required
                    className="w-full capitalize outline-none border-2 border-blue-200 rounded-lg px-4 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                  />
                </div>
                <div>
                  <label className="block text-blue-900 font-semibold mb-1">
                    Contact Number
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    required
                    className="w-full outline-none border-2 border-blue-200 rounded-lg px-4 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                  />
                </div>
                <div>
                  <label className="block text-blue-900 font-semibold mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email address"
                    required
                    className="w-full outline-none border-2 border-blue-200 rounded-lg px-4 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                  />
                </div>
              </div>
              <div className="flex justify-end mt-6 sm:mt-8 gap-3">
                <button
                  type="submit"
                  className="bg-linear-to-r outline-none from-blue-500 to-indigo-500 text-white font-bold px-4 sm:px-8 py-2 rounded-lg shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 hover:shadow-xl text-sm sm:text-base"
                >
                  Next
                </button>
              </div>
            </form>
          )}
          {step === 2 && (
            <form
              onSubmit={handleNext}
              className="space-y-4 sm:space-y-6 md:space-y-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
                <div>
                  <label className="block text-blue-900 font-semibold mb-1">
                    Thumbnail Photo{" "}
                    <span className="text-xs text-blue-500">(Required)</span>
                  </label>
                  <input
                    type="file"
                    name="thumbnail"
                    accept="image/*"
                    required
                    onChange={(e) => {
                      const file = e.target.files[0];
                      setFormData((prev) => ({ ...prev, thumbnail: file }));
                      // console.log(formData);
                    }}
                    className="w-full mr-5 border-2 border-blue-200 rounded-lg px-4 py-2 bg-blue-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                  />
                  {formData.thumbnail && (
                    <img
                      src={URL.createObjectURL(formData.thumbnail)}
                      alt="Thumbnail Preview"
                      className="mt-2 rounded shadow w-24 h-24 object-cover border"
                    />
                  )}
                </div>
                <div>
                  <label className="block text-blue-900 font-semibold mb-1">
                    Additional Photos{" "}
                    <span className="text-xs text-blue-500">(Up to 4)</span>
                  </label>
                  <input
                    type="file"
                    name="photos"
                    accept="image/*"
                    multiple
                    onChange={(e) => {
                      const files = Array.from(e.target.files);

                      setFormData((prev) => ({
                        ...prev,
                        photos: [...prev.photos, ...files],
                      }));

                      // console.log(formData);
                    }}
                    className="w-full border-2 border-blue-200 rounded-lg px-4 py-2 bg-blue-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                  />
                  <div className="flex gap-2 mt-2 flex-wrap">
                    {formData.photos &&
                      formData.photos.length > 0 &&
                      formData.photos.map((file, idx) => (
                        <img
                          key={idx}
                          src={URL.createObjectURL(file)}
                          alt={`Photo ${idx + 1}`}
                          className="rounded shadow w-16 h-16 object-cover border"
                        />
                      ))}
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-blue-900 font-semibold mb-1">
                    Upload Videos
                  </label>
                  <input
                    type="file"
                    name="videos"
                    accept="video/*"
                    multiple
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (!file) return;

                      setFormData((prev) => ({
                        ...prev,
                        videos: [...prev.videos, file],
                      }));

                      console.log(formData);
                    }}
                    className="w-full border-2 border-blue-200 rounded-lg px-4 py-2 bg-blue-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                  />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-4 mt-6 sm:mt-8">
                <button
                  onClick={handleBack}
                  type="button"
                  className="bg-blue-100 text-blue-700 font-semibold px-4 sm:px-8 py-2 rounded-lg shadow hover:bg-blue-200 transition-all duration-200 text-sm sm:text-base order-2 sm:order-1"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="bg-linear-to-r from-blue-500 to-indigo-500 text-white font-bold px-4 sm:px-8 py-2 rounded-lg shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 hover:shadow-xl text-sm sm:text-base order-1 sm:order-2"
                >
                  Next
                </button>
              </div>
            </form>
          )}
          {step === 3 && (
            <form
              onSubmit={async (e) => {
                e.preventDefault(); // handle submit here

                const sendData = new FormData();

                // normal fields
                sendData.append("title", formData.title);
                sendData.append("email", formData.email);
                sendData.append("rent", formData.rent);
                sendData.append("rentalTerms", formData.rentalTerms);
                sendData.append("address", formData.address);
                sendData.append("description", formData.description);
                sendData.append("type", formData.type);
                sendData.append("roomAvailable", formData.roomAvailable);
                sendData.append("bathrooms", formData.bathrooms);
                sendData.append("nearestCity", formData.nearestCity);
                sendData.append("connectivity", formData.connectivity);
                sendData.append("phoneNumber", formData.phoneNumber);

                // thumbnail
                if (formData.thumbnail) {
                  sendData.append("thumbnail", formData.thumbnail);
                }

                // photos (loop)
                formData.photos.forEach((photo) => {
                  sendData.append("photos", photo);
                });

                // videos (loop)
                formData.videos.forEach((video) => {
                  sendData.append("videos", video);
                });

                try {
                  setLoading(true); // start loading

                  const response = await axios.post(
                    "/api/room/add-room",
                    sendData,
                    // {
                    //   headers: {
                    //     "Content-Type": "multipart/form-data",
                    //   },
                    // },
                  );

                  if (response.data.statusCode >= 400) {
                    toast.error(response.data.message, {
                      position: "top-center",
                      autoClose: 2000,
                    });
                  } else {
                    toast.success(response.data.message, {
                      position: "top-center",
                      autoClose: 2000,
                    });
                  }
                } catch (error) {
                  toast.error("Fields are incorrect", {
                    position: "top-center",
                    autoClose: 2000,
                  });
                } finally {
                  setLoading(false); 
                  setStep(1); 
                }
              }}
              className="space-y-4 sm:space-y-6 md:space-y-8"
            >
              <div>
                <label className="block text-blue-900 font-semibold mb-2">
                  Rental Terms
                </label>
                <textarea
                  name="rentalTerms"
                  value={formData.rentalTerms}
                  onChange={handleChange}
                  required
                  className="w-full border-2 border-blue-200 rounded-lg px-4 py-2 min-h-32 sm:min-h-40 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                  placeholder="Enter rental terms, rules, and conditions..."
                />
              </div>
              <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-4 mt-6 sm:mt-8">
                <button
                  onClick={handleBack}
                  type="button"
                  className="bg-blue-100 text-blue-700 font-semibold px-4 sm:px-8 py-2 rounded-lg shadow hover:bg-blue-200 transition-all duration-200 text-sm sm:text-base order-2 sm:order-1"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-linear-to-r from-green-500 to-blue-500 text-white font-bold px-4 sm:px-8 py-2 rounded-lg shadow-lg hover:from-green-700 hover:to-blue-700 transition-all duration-200 hover:shadow-xl text-sm sm:text-base order-1 sm:order-2"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    "Submit"
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
