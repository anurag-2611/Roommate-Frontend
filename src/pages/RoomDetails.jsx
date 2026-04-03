import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Footer } from "../components/Footer";
import { DashBoardHeader } from "../components/DashBoard/DashBoardHeader";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export const RoomDetails = () => {
  const { id } = useParams();
  const [room, setRoom] = useState(null);

  const mainImage = room?.thumbnail || room?.photos?.[0];
  const mainVideo = room?.videos?.[0];

  const pageRef = useRef(null);
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const videoRef = useRef(null);
  const reviewRef = useRef(null);
  const descriptionRef = useRef(null);
  const priceCardRef = useRef(null);
  const photosRef = useRef(null);
  const propertyVideoRef = useRef(null);

  useEffect(() => {
    if (!room) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.from(heroRef.current, {
        opacity: 0,
        y: 80,
        duration: 1,
        ease: "power3.out",
      })
        .from(
          titleRef.current,
          {
            opacity: 0,
            y: 50,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.5",
        )
        .from(
          videoRef.current,
          {
            opacity: 0,
            x: 60,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.5",
        );

        gsap.from(reviewRef.current, {
          scrollTrigger: {
            trigger: reviewRef.current,
            start: "top 85%",
            once: true,
          },
          opacity: 0,
          y: 60,
          duration: 0.9,
        });

        gsap.from(descriptionRef.current, {
          scrollTrigger: {
            trigger: descriptionRef.current,
            start: "top 85%",
            once: true,
          },
          opacity: 0,
          y: 60,
          duration: 0.9,
        });

        gsap.from(priceCardRef.current, {
          scrollTrigger: {
            trigger: priceCardRef.current,
            start: "top 85%",
            once: true,
          },
          opacity: 0,
          x: 60,
          duration: 0.9,
        });

        gsap.from(Array.from(photosRef.current.children), {
          scrollTrigger: {
            trigger: photosRef.current,
            start: "top 85%",
            once: true,
          },
          opacity: 0,
          y: 50,
          stagger: 0.15,
          duration: 0.8,
        });

        gsap.from(propertyVideoRef.current, {
          scrollTrigger: {
            trigger: propertyVideoRef.current,
            start: "top 85%",
            once: true,
          },
          opacity: 0,
          y: 60,
          duration: 1,
        });

    }, pageRef);

    return () => ctx.revert();
  }, [room]);

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const res = await axios.get(
          `https://roommate-backend-1.onrender.com/api/room/rooms/${id}`,
        );
        setRoom(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchRoom();
  }, [id]);

  if (!room) {
    return (
      <div className="w-full min-h-screen bg-[#f7f5f0]">
        <DashBoardHeader />
        <div className="pt-28 text-center text-lg text-gray-700">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div ref={pageRef} className="w-full min-h-screen text-[#1f2d25]">
      <DashBoardHeader />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <div className="grid grid-cols-1 gap-4">
          {/* Main image */}
          <div
            ref={heroRef}
            className="lg:col-span-2 h-65 sm:h-90 lg:h-125 rounded-2xl overflow-hidden bg-white shadow-sm"
          >
            <img
              src={mainImage}
              alt={room.title}
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Title + right block */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left content */}
          <div ref={titleRef} className="lg:col-span-2">
            <p className="text-sm text-gray-500 mb-2 capitalize">
              {room.address}, {room.nearestCity}
            </p>

            <h1 className="text-2xl sm:text-3xl lg:text-5xl leading-tight capitalize">
              {room.title}
            </h1>

            <p className="mt-3 text-sm sm:text-base text-gray-600 capitalize">
              {room.roomAvailable} rooms available, {room.type},{" "}
              {room.bathrooms
                ? `${room.bathrooms} bathrooms`
                : "bathroom info not added"}
            </p>

            <button className="mt-6 bg-[#0f5b43] hover:scale-95 active:scale-90 transition text-white px-5 py-3 rounded-xl shadow-md">
              Check Availability
            </button>
          </div>

          {/* Right video card */}
          <div ref={videoRef} className="w-full">
            <div className="flex gap-3 mb-4">
              <button className="px-5 py-2 rounded-xl border border-[#cfc4ac] bg-[#ece6d8] text-sm">
                Video Tour
              </button>
            </div>

            <div className="rounded-2xl overflow-hidden bg-white border border-gray-200 shadow-sm relative">
              {mainVideo ? (
                <video
                  className="w-full h-65 sm:h-80 object-cover"
                  src={mainVideo}
                  controls
                  autoPlay
                  loop
                  muted
                />
              ) : (
                <div className="w-full h-65 sm:h-80 flex items-center justify-center text-gray-500">
                  No video available
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Review card */}
        <div
          ref={reviewRef}
          className="mt-10 rounded-2xl border border-gray-300 bg-white px-5 sm:px-8 py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 shadow-sm"
        >
          <h2 className="text-2xl sm:text-3xl">Reviews</h2>

          <div className="flex items-center gap-6">
            <div className="text-right">
              <p className="text-3xl font-medium">4.96</p>
              <p className="text-[#c8a95d] text-lg">★★★★★</p>
            </div>

            <div className="text-sm text-gray-600">
              <p className="text-2xl text-black font-medium">50</p>
              <p>Reviews</p>
            </div>
          </div>
        </div>

        {/* Description + info */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Description */}
          <div ref={descriptionRef} className="lg:col-span-2">
            <h2 className="text-2xl sm:text-3xl mb-4">
              Comfortable Furnished Room
            </h2>

            <p className="text-gray-700 leading-7 text-sm sm:text-base">
              {room.description}
            </p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm">
                <p className="text-sm text-gray-500">Connectivity</p>
                <p className="text-base font-medium capitalize mt-1">
                  {room.connectivity || "Not provided"}
                </p>
              </div>

              <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm">
                <p className="text-sm text-gray-500">Rental Terms</p>
                <p className="text-base font-medium capitalize mt-1">
                  {room.rentalTerms}
                </p>
              </div>

              <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm">
                <p className="text-sm text-gray-500">Phone Number</p>
                <p className="text-base font-medium mt-1">{room.phoneNumber}</p>
              </div>

              <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm">
                <p className="text-sm text-gray-500">Email</p>
                <p className="text-base font-medium mt-1 break-all">
                  {room.email}
                </p>
              </div>
            </div>
          </div>

          {/* Price card */}
          <div ref={priceCardRef} className="w-full">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sticky top-24">
              <p className="text-sm text-gray-500 mb-2">Monthly Rent</p>
              <h3 className="text-3xl sm:text-4xl font-semibold text-[#0f5b43]">
                ₹{room.rent}
              </h3>
              <p className="text-gray-500 mt-1">per month</p>

              <div className="mt-6 space-y-3 text-sm sm:text-base">
                <div className="flex justify-between border-b pb-2">
                  <span>Type</span>
                  <span className="font-medium">{room.type}</span>
                </div>

                <div className="flex justify-between border-b pb-2">
                  <span>Available</span>
                  <span className="font-medium">{room.roomAvailable}</span>
                </div>

                <div className="flex justify-between border-b pb-2">
                  <span>Bathrooms</span>
                  <span className="font-medium">{room.bathrooms || 0}</span>
                </div>

                <div className="flex justify-between">
                  <span>City</span>
                  <span className="font-medium">{room.nearestCity}</span>
                </div>
              </div>

              <button className="w-full mt-6 bg-[#0f5b43] text-white py-3 rounded-xl hover:scale-[0.98] active:scale-95 transition">
                Contact Owner
              </button>
            </div>
          </div>
        </div>

        {/* Extra large media section */}
              <h2 className="text-2xl sm:text-3xl mb-5 mt-20">Property Video</h2>
            <div
              ref={photosRef}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              <div className="h-64 rounded-2xl overflow-hidden bg-white shadow-sm">
                <img
                  src={room?.photos?.[0]}
                  alt="room"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

        {mainVideo && (
          <div className="mt-12">
            <h2 className="text-2xl sm:text-3xl mb-5">Property Video</h2>

            <div
              ref={propertyVideoRef}
              className="rounded-2xl overflow-hidden bg-white shadow-sm"
            >
              <video
                className="w-full max-h-162 object-cover"
                src={mainVideo}
                controls
                loop
                muted
              />
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};
