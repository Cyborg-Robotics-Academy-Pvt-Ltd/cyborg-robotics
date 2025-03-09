import React from "react";
import { InfiniteImages } from "./ui/inifinite-moving-images";

const GallerySection = () => {
  const testimonials = [
    {
      image: "/assets/gallery/gallery (40).jpg",
    },
    {
      image: "/assets/carousel.jpeg",
    },
    {
      image: "/assets/carousel.jpeg",
    },
    {
      video: "/intro.mp4",
    },
  ];

  return (
    <div className="bg-white text-black">
      <h1 className="text-center font-bold text-2xl md:text-3xl mt-10 ">
        Our <span className="text-[#8D0F11]">Gallery</span>
      </h1>
      <InfiniteImages items={testimonials} />
    </div>
  );
};

export default GallerySection;
