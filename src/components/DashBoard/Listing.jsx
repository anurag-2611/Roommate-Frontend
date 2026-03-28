import React from "react";

export const Listing = ({ listing }) => {
  return (
    <div className="w-full sm:w-[90%] md:w-[80%] lg:w-[48%] xl:w-[45%] bg-white rounded-2xl overflow-hidden shadow-md flex flex-col sm:flex-row">
      {/* Image */}
      <img
        src={
          listing?.image ||
          "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2"
        }
        alt={listing?.title || "room"}
        className="w-full sm:w-64 h-52 sm:h-auto object-cover"
      />

      {/* Details */}
      <div className="flex-1 px-4 py-4 text-gray-800 flex flex-col justify-between">
        <div className="space-y-1">
          <h2 className="text-lg font-semibold">
            {listing?.title || "Luxury Room"}
          </h2>
          <p className="text-sm text-gray-600">
            {listing?.location || "Bhopal, Madhya Pradesh"}
          </p>
          {listing?.description && (
            <p className="text-sm text-gray-500 line-clamp-2">
              {listing.description}
            </p>
          )}
        </div>

        <p className="font-bold text-blue-800 mt-4">
          ₹{listing?.price || 2500} / night
        </p>
      </div>
    </div>
  );
};