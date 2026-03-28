import React, { useRef } from "react";
import HeroImage from "../assets/heroImage.webp";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const Images = () => {
  const imageDiv = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Mobile animation
      mm.add("(max-width: 767px)", () => {
        gsap.fromTo(
          imageDiv.current,
          {
            opacity: 0,
            y: 100,
            scale: 0.95,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: imageDiv.current,
              start: "top 85%",
              end: "top 60%",
              scrub: true,
            },
          },
        );
      });

      // Desktop animation
      mm.add("(min-width: 768px)", () => {
        gsap.fromTo(
          imageDiv.current,
          {
            opacity: 0,
            scale :1.2,
            x: -120,
            rotate: -5,
          },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            rotate: 0,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: imageDiv.current,
              start: "top 85%",
              end: "top 55%",
              scrub: true,
            },
          },
        );
      });

      return () => mm.revert();
    },
    { scope: imageDiv },
  );

  return (
    <div
      ref={imageDiv}
      className="w-full sm:w-[90%] sm:max-w-50 md:max-w-107 lg:max-w-125 xl:max-w-140"
    >
      <img
        src={HeroImage}
        alt="RoomMate hero"
        className="w-full h-auto rounded-[28px] shadow-2xl object-cover"
        loading="lazy"
        onError={(e) => {
          e.target.src = "/fallback.webp";
        }}
      />
    </div>
  );
};
