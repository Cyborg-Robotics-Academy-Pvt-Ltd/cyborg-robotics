"use client";
import React from "react";
import Image from "next/image";

const VisionSection = () => {
  return (
    <div className="relative w-full h-[30vh] md:h-[60vh] lg:h-[65vh]">
      <Image
        src="/assets/vision.png"
        alt="vision"
        fill
        className="object-cover object-center"
        priority
      />
  
      {/* Black overlay */}
      <div className="absolute inset-0 bg-black opacity-60"></div>
      {/* Centered text */}
      <div className="absolute inset-0 flex flex-col md:flex-row justify-center items-center text-left px-4">
        <div className="w-full md:w-1/2 p-4">
          <h2 className="text-yellow-400 text-2xl md:text-4xl lg:text-5xl font-bold font-serif">
            Our Vision
          </h2>
          <p className="text-white mt-2 text-sm md:text-lg lg:text-xl font-serif">
            Our Vision is to be a leading global academy, influencing the future
            of robotics for kids.
          </p>
        </div>
        <div className="w-full md:w-1/2 p-4">
          <h2 className="text-yellow-400 text-2xl md:text-4xl lg:text-5xl font-bold font-serif">
            Mission
          </h2>
          <p className="text-white mt-2 text-sm md:text-lg lg:text-xl font-serif">
            Our mission is to transform the way parents & children think about
            learning robotics technology.
          </p>
        </div>
      </div>
    </div>
  );
};

export default VisionSection;
