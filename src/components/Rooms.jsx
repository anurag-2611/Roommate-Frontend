import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Rooms = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const response = await axios.get(
          "/api/room/get-rooms",
        );

        setData(response.data.data);
      } catch (err) {
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center py-10">
        <p className="text-lg font-medium text-gray-600">Loading rooms...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full flex justify-center items-center py-10">
        <p className="text-lg font-medium text-red-500">{error}</p>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="w-full flex justify-center items-center py-10">
        <p className="text-lg font-medium text-gray-600">No rooms found</p>
      </div>
    );
  }

  return (
    <div className="box w-full flex flex-wrap justify-center sm:justify-between gap-5">
      {data
      .filter((_, index) => index < 6)
      .map((room) => (
        <div
          key={room._id}
          className="box w-full sm:w-[48%] lg:w-[45%] min-h-100 my-2 flex flex-col items-center border border-black/20 rounded-lg shadow-lg overflow-hidden"
        >
          <div className="h-62 sm:h-65 md:h-70 w-full">
            <img
              src={room.thumbnail}
              alt={room.title}
              loading="lazy"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = "/fallback-room.jpg";
              }}
            />
          </div>

          <div className="flex-1 w-full p-3 pl-5 flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-800">{room.title}</h2>
              <h3 className="text-base font-medium text-gray-800">
                {room.type}
              </h3>
              <p className="text-gray-600 text-sm mt-1">{room.nearestCity}</p>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mt-4 mb-1">
              <p className="text-lg font-semibold text-purple-700">
                ₹{room.rent}/ month
              </p>

              <button
                onClick={() => navigate(`/room/${room._id}`)}
                className="text-[14px] bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition"
              >
                View Details
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
