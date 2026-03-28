import { useGSAP } from "@gsap/react";
import React, { useRef } from "react";
import gsap from "gsap";

export const Cities = () => {
  const cities = [
    "Mumbai",
    "Delhi",
    "Bengaluru",
    "Hyderabad",
    "Chennai",
    "Kolkata",
    "Pune",
    "Ahmedabad",
    "Jaipur",
    "Surat",
    "Lucknow",
    "Kanpur",
    "Nagpur",
    "Indore",
    "Bhopal",
    "Patna",
    "Vadodara",
    "Ghaziabad",
    "Ludhiana",
    "Agra",
    "Nashik",
    "Faridabad",
    "Meerut",
    "Rajkot",
  ];
  const citiesRef = useRef(null);

  useGSAP(() => {
    // GSAP animations can be added here if needed in the future
    gsap.to(citiesRef.current, {
      x: "-50%",
      duration: 20,
      ease: "none",
      repeat: -1,
      // yoyo: true,
    });
  });

  return (
    <div className="overflow-hidden">
      <div ref={citiesRef} className="flex gap-8 my-2">
        {cities.concat(cities).map((city, index) => (
          <div
            key={`${city}-${index}`}
            className="px-4 py-1 border rounded-lg text-center text-black shadow-md hover:shadow-lg transition"
          >
            <h3 className="text-lg font-semibold">{city}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};
