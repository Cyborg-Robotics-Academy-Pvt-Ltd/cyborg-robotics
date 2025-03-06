"use client";
import React from "react";
import { InfiniteMovingCards } from "./ui/infinite-moving-cards";
import Feature2 from "./Feature2";

const testimonials = [
  {
    title: "To Think Creatively and Create",
    imageUrl: "/assets/students/cyborg3.jpg",
  },
  {
    title: "Practical Learning with Fun",
    imageUrl: "/assets/gallery/gallery (13).jpg",
  },
  {
    title: "To Be Independent and Active",
    imageUrl: "/assets/gallery/gallery (12).jpg",
  },
  {
    title: "Applying Knowledge in Real Life",
    imageUrl: "/assets/gallery/gallery (6).jpg",
  },
  {
    title: "Transforming Knowledge into Action",
    imageUrl: "/assets/gallery/gallery (7).jpg",
  },
  {
    title: "Bringing Learning to Everyday Life",
    imageUrl: "/assets/gallery/gallery (8).jpg",
  },
  {
    title: "Making Education Meaningful",
    imageUrl: "/assets/gallery/gallery (14).jpg",
  },
];

const Features: React.FC = () => {
  return (
    <div className="bg-white text-black">
      <h1 className="text-center font-bold text-lg md:text-3xl mt-10 font-mono mx-2">
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
