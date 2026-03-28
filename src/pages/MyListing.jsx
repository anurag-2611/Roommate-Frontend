import React, { useEffect, useState } from "react";
import axios from "axios";
import { DashBoardHeader } from "../components/DashBoard/DashBoardHeader";
import { Listing } from "../components/DashBoard/Listing";

export const MyListing = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMyListings = async () => {
      try {
        setLoading(true);
        setError("");

        const token = localStorage.getItem("accessToken");

        const response = await axios.get(
          "http://localhost:5000/api/user/my-listings",
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);        
        setListings(response.data.data);
      } catch (err) {
        setError("Failed to fetch your listings");
      } finally {
        setLoading(false);
      }
    };

    fetchMyListings();
  }, []);

  return (
    <div className="w-full min-h-screen">
      <DashBoardHeader />

      <div className="pt-24 px-3 sm:px-5 md:px-8">
        {/* <h1 className="text-2xl ml-10 sm:text-3xl font-bold text-gray-800 mb-6">
          My Listings
        </h1> */}

        {loading && (
          <div className="text-center text-gray-600 text-lg">
            Loading your listings...
          </div>
        )}

        {error && (
          <div className="text-center text-red-500 text-lg">
            {error}
          </div>
        )}

        {!loading && !error && listings.length === 0 && (
          <div className="w-full flex justify-center">
            <div className="bg-white shadow-md rounded-2xl px-8 py-10 text-center max-w-lg w-full mt-10">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                No Listings Found
              </h2>
              <p className="text-gray-500">
                You have not added any listing yet.
              </p>
            </div>
          </div>
        )}

        {!loading && !error && listings.length > 0 && (
          <div className="flex flex-wrap justify-center gap-5">
            {listings.map((listing) => (
              <Listing key={listing._id} listing={listing} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};