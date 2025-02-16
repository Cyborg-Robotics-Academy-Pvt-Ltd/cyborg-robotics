"use client";
import React from "react";
import { InfiniteMovingCards } from "./ui/infinite-moving-cards";
import Feature2 from "./Feature2";

const testimonials = [
  {
    name: "John Doe",
    title: "Robotics Enthusiast",
    imageUrl: "/assets/img1.jpeg",
    quote: "Learning robotics has opened up a world of opportunities for me.",
  },
  {
    name: "Jane Smith",
    title: "Engineer",
    imageUrl: "/assets/img1.jpeg",
    quote: "Robotics has enhanced my problem-solving skills and creativity.",
  },
  {
    name: "Alice Johnson",
    title: "Student",
    imageUrl: "/assets/img1.jpeg",
    quote: "The hands-on experience with robotics is invaluable.",
  },
];

const Features: React.FC = () => {
  return (
    <div className="bg-white text-black">
      <h1 className="text-center font-bold text-lg md:text-3xl mt-10 font-serif">
        Welcome to the{" "}
        <span className="text-[#8D0F11]">
          Cyborg Robotics Academy Private Limited
        </span>
      </h1>
      <InfiniteMovingCards
        items={testimonials}
        direction="right"
        speed="fast"
        className=""
      />
      <Feature2 />
    </div>
  );
};

export default Features;
