import React from "react";
import { useState, useEffect } from "react";
import { DashBoardHeader } from "../components/DashBoard/DashBoardHeader";
import { Rooms } from "../components/Rooms";
import { Footer } from "../components/Footer";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import roommateImage from "../assets/Room-mate handshake.png";
import { useContext } from "react";
import { AuthContext } from "../context/AnthContext";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export const DashBoard = () => {
  const { getMe, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const cardsRef = useRef([]);
  const cardBoxref = useRef([]);
  const listingRef = useRef(null);
  const AddlistingRef = useRef(null);
  const mainTextRef = useRef(null);
  const profileRef = useRef(null);
  const RecommendingRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline();

    gsap.from(mainTextRef.current, {
      y: -50,
      opacity: 0,
      duration: 2,
      ease: "bounce.out",
    });

    gsap.from(AddlistingRef.current, {
      y: -50,
      opacity: 0,
      duration: 2,
      ease: "bounce.out",
    });

    tl.from(listingRef.current, {
      x: 100,
      opacity: 0,
      duration: 2,
      ease: "bounce.out",
    });

    gsap.from(cardBoxref.current, {
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.2, // smoother
      ease: "power3.out",
    });
    cardsRef.current.forEach((card, index) => {
      gsap.to(card, {
        y: index % 2 === 0 ? -15 :15 , // alternate floating
        duration: 1 + index * 0.2,
        repeat: -1,
        delay: 1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });

    gsap.from(profileRef.current, {
      y: 50,
      opacity: 0,
      duration: 0.1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: profileRef.current,
        start: "top 55%", 
        end: "top 50%",
      },
    });

    gsap.from(RecommendingRef.current, {
      y: 50,
      opacity: 0,
      duration: 1,
      delay:0.2,
      stagger: 0.2, // smoother
      ease: "power3.out",
      scrollTrigger: {
        trigger: profileRef.current,
        start: "top 0%", // when element enters viewport
        end: "top 10%",
        scrub:2,   
      },
    });
  });

  useEffect(() => {
    getMe();

    console.log(user);
  }, []);

  const handleClick = () => {
    if (!user?.userProfile) {
      navigate("/create-profile");
    } else {
      navigate("/profile");
    }
  };

  return (
    // bg-white/35 backdrop-blur-lg border border-white/20 shadow-xl rounded-2xl
    <div className="w-full h-full flex flex-col gap-0 bg-[url('')] bg-cover bg-center overflow-hidden ">
      <DashBoardHeader />

      <div className="mb-5 mt-20 sm:mt-[8%] p-5 px-4 sm:px-8 md:px-10 flex flex-row  justify-between items-start sm:items-center gap-4 max-w-6xl mx-auto w-full">
        <div ref={mainTextRef} >
          <h2 className="text-3xl sm:text-3xl md:text-4xl text-black/90 font-bold ml-2">
            <span className="block sm:inline-block text-[20px] ml-1 sm:ml-0 sm:text-4xl text-purple-800">
              Hello !
            </span>{" "}
            {user?.firstName}
          </h2>
          <p className="hidden sm:block text-xs sm:text-sm text-gray-600 mt-3 ml-2 font-normal">
            Welcome to your{" "}
            <span className="text-blue-600/90 font-bold">RoomMate</span>{" "}
            dashboard
          </p>
        </div>
        <div ref={AddlistingRef}>
          <Link
            to="/add-home"
            className="bg-[#84ea51e9]/90 shadow-2xl saturate-150 scale-95 shadow-black  active:scale-90 transition text-black font-base text-[10px] sm:text-base sm:font-medium px-2 py-2 sm:px-6 sm:py-2 rounded-full flex mt-1"
          >
            <svg
              className="w-3 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M13.0001 10.9999L22.0002 10.9997L22.0002 12.9997L13.0001 12.9999L13.0001 21.9998L11.0001 21.9998L11.0001 12.9999L2.00004 13.0001L2 11.0001L11.0001 10.9999L11 2.00025L13 2.00024L13.0001 10.9999Z"></path>
            </svg>
            Add Home
          </Link>
        </div>
      </div>

      <div ref={listingRef} className="sm:ml-56 my-5 mb-5 sm:mb-20">
        <Link
          to={"/my-listing"}
          className="relative sm:right-1 left-5 sm:left-0 text-center bg-purple-800/10 sm:px-[38%] px-34 py-2 rounded-full text-base sm:text-base text-black/90 font-bold mb-5"
        >
          My Listing
        </Link>
      </div>

      <div
        ref={cardBoxref}
        className="sm:flex flex-col grid grid-cols-2 sm:flex-row justify-around mb-5 px-4 sm:px-8 md:px-10 py-5 gap-6 sm:gap-5 max-w-6xl mx-auto w-full"
      >
        <Link
          to="/roommate-req"
          ref={(el) => (cardsRef.current[0] = el)}
          className="flex-1 min-w-0 h-50 bg-white/35 backdrop-blur-lg border border-white/20 shadow-xl rounded-2xl text-black p-5 active:scale-95 transition-all hover:scale-75 hover:rotate-3 hover:shadow-2xl hover:shadow-pink-300 flex flex-col items-center justify-center gap-3"
        >
          <div className="flex items-center justify-center gap-1">
            <svg className="w-22 h-22" viewBox="0 0 24 24" fill="#3b82f6">
              <circle cx="12" cy="8" r="4" />
              <path d="M 12 14 C 7 14 4 17 4 17 v 3 h 16 v -3 c 0 0 -3 -3 -8 -3 z" />
            </svg>
            <svg className="w-6 h-6 -ml-2" fill="#84ea51" viewBox="0 0 24 24">
              <circle cx="18" cy="18" r="6" />
              <path
                d="M 16 18 l 2 2 l 4 -4"
                stroke="white"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h1 className="text-lg text-center font-semibold">
            Roommate request
          </h1>
        </Link>

        <Link
          ref={(el) => (cardsRef.current[1] = el)}
          to="/messages"
          className="flex-1 min-w-0 h-50 bg-white/35 backdrop-blur-lg border border-white/20 shadow-xl rounded-2xl text-black p-5 active:scale-95 transition-all hover:scale-75 hover:-rotate-3 hover:shadow-2xl hover:shadow-blue-300 flex flex-col items-center justify-center gap-3"
        >
          <svg className="w-22 h-22" fill="#3b82f6" viewBox="0 0 24 24">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
          </svg>
          <h1 className="text-lg font-semibold">Messages</h1>
        </Link>

        <Link
          ref={(el) => (cardsRef.current[2] = el)}
          to="/search-listing"
          className="flex-1 min-w-0 h-50 bg-white/35 backdrop-blur-lg border border-white/20 shadow-xl rounded-2xl text-black p-5 active:scale-95 transition-all hover:scale-75 hover:rotate-3 hover:shadow-2xl hover:shadow-purple-300 flex flex-col items-center justify-center gap-3"
        >
          <svg className="w-22 h-22" fill="#a855f7" viewBox="0 0 24 24">
            <path d="M15.5 1h-8C6.12 1 5 2.12 5 3.5v17C5 21.88 6.12 23 7.5 23h8c1.38 0 2.5-1.12 2.5-2.5v-17C18 2.12 16.88 1 15.5 1zm-4 21c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm4.5-4H7V4h9v14z" />
          </svg>
          <h1 className="text-lg font-semibold text-center">Search Listings</h1>
        </Link>

        <Link
          ref={(el) => (cardsRef.current[3] = el)}
          to="/favorites"
          className="flex-1 min-w-0 h-50 bg-white/35 backdrop-blur-lg border border-white/20 shadow-xl rounded-2xl text-black p-5 active:scale-95 transition-all hover:scale-75 hover:-rotate-3 hover:shadow-2xl hover:shadow-red-300 flex flex-col items-center justify-center gap-3"
        >
          <svg className="w-22 h-22" fill="#ef4444" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
          <h1 className="text-lg font-semibold">Favorites</h1>
        </Link>
      </div>

      <div
        ref={profileRef}
        className="sm:w-[74%] w-[90%] m-auto pt-4 p-4 sm:p-8 md:p-10 relative mt-20 bg-transparent border-2 border-black rounded-2xl"
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-0">
          <div>
            <h1 className="text-black font-extrabold w-full md:w-[60%] h-[10%] flex items-center text-2xl sm:text-3xl md:text-4xl ml-1">
              Find Your Perfect Roommate!
            </h1>
            <p className="ml-1 w-full md:w-[70%] mt-4 text-purple-900 font-normal mb-6 sm:mb-10 text-sm sm:text-base">
              Connect with many individuals.
            </p>
            <button
              onClick={handleClick}
              className="bg-transparent border-2 text-black border-black py-2 px-4 rounded-full font-medium active:scale-95 hover:bg-black hover:text-white transition"
            >
              Get Started
            </button>
          </div>
          <div className="p-4 sm:p-8 md:p-10 pr-0 sm:pr-10 md:pr-20">
            <img className="w-50 h-40" src={roommateImage} alt="" />
          </div>
        </div>
      </div>

      <div
        className="px-4 sm:px-8 md:px-10 max-w-6xl mx-auto w-full bg-white/35 backdrop-blur-lg border border-white/20 shadow-xl rounded-2xl mt-20 mb-20 py-10"
      >
        <h2 className="relative text-start text-xl sm:text-2xl font-medium text-amber-800 mb-5">
          Recommended Listings
        </h2>
        <div ref={RecommendingRef} className="flex flex-wrap w-full gap-4 sm:gap-10 justify-center">
          <Rooms />
        </div>
      </div>
      <Outlet />
      <Footer />
    </div>
  );
};
