import React from "react";
import RoomMatelogo from "../assets/RoomMate logo.png";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <div className="py-1 px-3 sm:px-8 md:px-10 flex justify-between items-center sm:w-full sm:mx-4 w-[95%] sm:mt-0 mt-2 md:w-4/5 text-black rounded-full fixed z-10 top-2 sm:top-4 sm:left-[49%] left-[50%] transform -translate-x-1/2 shadow-lg bg-white/15 backdrop-blur-lg border border-white/10 ">
      <div className="w-20 sm:w-28 md:w-32 flex justify-center items-center">
        <Link to="/">
          <img
            className="w-full max-w-25.5 sm:max-w-30 md:max-w-32.5"
            src={RoomMatelogo}
            alt="RoomMate Logo"
            loading="lazy"
            onError={(e) => {
              e.target.src = "/fallback.webp";
            }}
          />
        </Link>
      </div>
      <div className="flex justify-center items-center gap-1 sm:gap-3 p-1 sm:p-2 px-2 sm:px-4 list-none">
        <Link to="/login" className="find-btn">
          Log in
        </Link>
      </div>
    </div>
  );
};
