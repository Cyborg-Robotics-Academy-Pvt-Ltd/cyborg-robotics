"use client";
import React from "react";
import Image from "next/image";

const VisionSection = () => {
  return (
    <div className="relative w-full h-[30vh] md:h-[60vh] lg:h-[80vh]">
      <Image
        src="/assets/visionmission.jpg"
        alt="Vision Image"
        fill
        quality={100}
        className="object-cover"
        priority
      />
    </div>
  );
};

export default VisionSection;
