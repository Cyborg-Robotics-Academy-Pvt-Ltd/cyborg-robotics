"use client";
import React from "react";
import { InfiniteMovingCards } from "./ui/infinite-moving-cards";
import Feature2 from "./Feature2";

const testimonials = [
  {
    title: "Innovate, Imagine, and Inspire",
    imageUrl: "/assets/students/cyborg3.jpg",
  },
  {
    title: "Learning Beyond the Classroom",
    imageUrl: "/assets/gallery/gallery (15).jpg",
  },
  {
    title: "Empowering Minds for the Future",
    imageUrl: "/assets/gallery/gallery (17).jpg",
  },
  {
    title: "Turning Ideas into Reality",
    imageUrl: "/assets/gallery/gallery (21).jpg",
  },
  {
    title: "Unlocking Potential Through Education",
    imageUrl: "/assets/gallery/gallery (50).jpg",
  },
  {
    title: "Bridging Knowledge and Action",
    imageUrl: "/assets/gallery/gallery (9).jpg",
  },
  {
    title: "Shaping Young Innovators",
    imageUrl: "/assets/gallery/gallery (2).jpg",
  },
  {
    title: "Creating Future Leaders",
    imageUrl: "/assets/gallery/gallery (4).jpg",
  },
  {
    title: "A Journey of Discovery and Growth",
    imageUrl: "/assets/gallery/gallery (12).jpg",
  },
  {
    title: "Where Passion Meets Learning",
    imageUrl: "/assets/gallery/gallery (11).jpg",
  },
  {
    title: "Building a Brighter Tomorrow",
    imageUrl: "/assets/gallery/gallery (56).jpg",
  },
  {
    title: "Education That Makes a Difference",
    imageUrl: "/assets/gallery/gallery (62).jpg",
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
