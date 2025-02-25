"use client";

import { Carousel } from "@/components/ui/carousel";
const Page = () => {
  const slideData = [
    {
      title: "EV3",

      src: "/assets/carousel.jpeg",
    },
    {
      title: "EV3",

      src: "/assets/carousel1.jpeg",
    },
    {
      title: "EV3",

      src: "/assets/carousel2.jpeg",
    },
    {
      title: "EV3",

      src: "/assets/carousel3.jpeg",
    },
  ];

  return (
    <div className="relative overflow-hidden w-full h-full py-20 mt-10 ">
      <h1 className="text-3xl font-bold font-mono  text-center">
        Our <span className="text-red-800">Gallery</span>
      </h1>
      <Carousel slides={slideData} />
    </div>
  );
};

export default Page;
