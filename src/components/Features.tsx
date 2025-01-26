"use client";
import React from "react";
import { InfiniteMovingCards } from "./ui/infinite-moving-cards";
import Feature2 from "./Feature2";

const testimonials = [
  {
    name: "John Doe",
    title: "Robotics Enthusiast",
    imageUrl: "/assets/img.jpg",
    quote: "Learning robotics has opened up a world of opportunities for me.",
  },
  {
    name: "Jane Smith",
    title: "Engineer",
    imageUrl: "/assets/img.jpg",
    quote: "Robotics has enhanced my problem-solving skills and creativity.",
  },
  {
    name: "Alice Johnson",
    title: "Student",
    imageUrl: "/assets/img.jpg",
    quote: "The hands-on experience with robotics is invaluable.",
  },
];

const Features = () => {
  return (
    <div className="flex flex-col justify-center">
      <h1 className="text-center font-bold text-2xl md:text-3xl mt-10 font-serif">
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
