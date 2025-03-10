"use client";
import React from "react";
import { InfiniteMovingCards } from "./ui/infinite-moving-cards";
import { FeaturesImages } from "../../utils/Images";

const Features: React.FC = () => {
  return (
    <div className="bg-white text-black">
      <h1 className="text-center font-bold text-lg md:text-3xl mt-10 mx-2">
        Welcome to the{" "}
        <span className="text-[#8D0F11]">
          Cyborg Robotics Academy Private Limited
        </span>
      </h1>
      <InfiniteMovingCards
        items={FeaturesImages}
        direction="right"
        speed="fast"
        className=""
      />
    </div>
  );
};

export default Features;
