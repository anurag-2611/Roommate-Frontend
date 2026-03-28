import React from "react";
import { useState, useEffect } from "react";
import { Heart, Search, MessageCircle, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { DashBoardHeader } from "../../components/DashBoard/DashBoardHeader";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Footer } from "../../components/Footer";

export const SearchListing = () => {
  const token = localStorage.getItem("accessToken");

  const [data, setData] = useState([]);
  const [FilteredData, setFilteredData] = useState([]);
  const [City, setCity] = useState("");
  const [Price, setPrice] = useState("");
  const [Type, setType] = useState("");
  const [Favorites, setFavorites] = useState([]);
  const [Loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const FeatchedRoom = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:5000/api/room/get-rooms");

        setData(res.data.data);
        setFilteredData(res.data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    FeatchedRoom();
  }, []);

  useEffect(() => {
    const getFavorites = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/user/get-favorites",
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setFavorites(res.data.data.favorites);
      } catch (error) {
        console.log(error);
      }
    };

    getFavorites();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();

    let result = data;

    if (City) {
      result = result.filter((item) =>
        item.nearestCity?.toLowerCase().includes(City.toLowerCase()),
      );
    }

    if (Price) {
      result = result.filter((item) => item.rent <= Number(Price));
    }

    if (Type && Type !== "Type") {
      result = result.filter((item) => item.type === Type);
    }

    setFilteredData(result);
  };

  const handleClear = () => {
    setCity("");
    setPrice("");
    setType("");

    setFilteredData(data);
  };

  const toggleFavorite = async (id) => {
    try {
      if (Favorites.includes(id)) {
        const response = await axios.delete(
          `http://localhost:5000/api/user/remove-favorite/${id}`,
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setFavorites(Favorites.filter((fav) => fav !== id));
        toast.error(response.data.message);
      } else {
        const response = await axios.post(
          `http://localhost:5000/api/user/add-favorite/${id}`,
          {},
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setFavorites([...Favorites, id]);
        toast.success(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="w-full overflow-x-hidden">
      <div className="min-h-screen w-full text-black bg-linear-to-br from-blue-100 to-gray-600 px-4 sm:px-6 lg:px-8 py-6 flex justify-center items-start relative">
        <DashBoardHeader />

        <div className="w-full max-w-7xl flex flex-col sm:flex-row gap-6 mx-auto mt-20">
          {/* Sidebar */}
          <div className="w-full sm:w-64 bg-white rounded-2xl shadow-md p-4 sm:p-6 flex sm:flex-col flex-row flex-wrap gap-3 sm:gap-4">
            <Link
              to="/messages"
              className="flex-1 sm:flex-none flex items-center justify-center sm:justify-start gap-2 bg-gray-600 text-white px-4 py-3 rounded-full"
            >
              <MessageCircle size={20} className="text-black font-bolder" />
              <span className="text-sm sm:text-base">Messages</span>
            </Link>

            <Link
              to="/favorites"
              className="flex-1 sm:flex-none flex items-center justify-center sm:justify-start gap-2 bg-gray-600 text-white px-4 py-3 rounded-full"
            >
              <Heart size={22} className="text-red-600" />
              <span className="text-sm sm:text-base">Favorites</span>
            </Link>

            <Link
              to="/add-home"
              className="w-full sm:w-auto flex items-center justify-center sm:justify-start gap-2 bg-gray-600 text-white px-4 py-3 rounded-full"
            >
              <Plus size={20} className="text-green-600 font-bolder" />
              <span className="text-sm sm:text-base">Add Listing</span>
            </Link>
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Search Header */}
            <form
              onSubmit={handleSearch}
              className="bg-white rounded-2xl shadow-md p-4 sm:p-6 mb-6"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl sm:text-2xl font-semibold">
                  Search Listings
                </h2>
              </div>

              <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4">
                <input
                  type="number"
                  placeholder="Max Price"
                  value={Price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="border rounded-lg px-4 py-3 w-full sm:w-auto flex-1 min-w-40"
                />

                <select
                  value={Type}
                  onChange={(e) => setType(e.target.value)}
                  className="border rounded-lg px-4 py-3 w-full sm:w-auto flex-1 min-w-40"
                >
                  <option value="">Type</option>
                  <option>1Rk</option>
                  <option>2Rk</option>
                  <option>1BHK</option>
                  <option>2BHK</option>
                  <option>Flat</option>
                </select>

                <div className="bg-green-400 flex items-center gap-2 text-white px-4 py-2 rounded-full w-full sm:w-auto flex-1 min-w-55">
                  <Search size={20} className="text-black shrink-0" />
                  <input
                    value={City}
                    onChange={(e) => setCity(e.target.value)}
                    type="text"
                    placeholder="Search city .."
                    className="w-full bg-transparent p-1 outline-none border-none text-black font-medium placeholder:text-black/70"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleClear}
                  className="text-blue-500 text-base sm:text-base px-2 py-2 active:scale-95 transition w-full sm:w-auto"
                >
                  Clear
                </button>

                <button
                  type="submit"
                  className="text-white bg-black text-medium px-8 py-3 w-full sm:w-auto active:scale-95 transition rounded-full"
                >
                  Search
                </button>
              </div>
            </form>

            {/* Listings Grid */}
            {Loading ? (
              <p className="text-lg font-medium text-center py-10">Loading....</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {FilteredData.length > 0 ? (
                  FilteredData.map((item) => (
                    <div
                      key={item._id}
                      onClick={() => navigate(`/room/${item._id}`)}
                      className="bg-white rounded-2xl shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition"
                    >
                      <div className="relative">
                        <img
                          src={item.thumbnail}
                          alt="listing"
                          className="h-48 sm:h-52 w-full object-cover"
                        />
                        <Heart
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(item._id);
                          }}
                          className={`absolute top-3 right-3 cursor-pointer ${
                            Favorites.includes(item._id)
                              ? "text-red-500 fill-red-500"
                              : "text-black"
                          }`}
                        />
                      </div>

                      <div className="p-4">
                        <h3 className="text-lg font-semibold text-purple-800">
                          {item.rent} <span className="text-sm">/ month</span>
                        </h3>
                        <p className="text-gray-600 wrap-break-words">
                          {item.nearestCity}
                        </p>
                        <p className="text-gray-500 text-sm wrap-break-words">
                          {item.type} • {item.connectivity}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full flex justify-center items-center py-16">
                    <div className="text-2xl sm:text-3xl font-semibold text-center text-gray-800">
                      No listing Found
                    </div>
                  </div>
                )}
              </div>
            )}

            <ToastContainer />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};