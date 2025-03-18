import React from "react";
import { InfiniteImages } from "./ui/inifinite-moving-images";

const GallerySection = () => {
  const GallerySectionData = [
    {
      image: "/assets/gallery/gallery (61).jpg",
    },
    {
      image: "/assets/gallery/gallery (43).jpg",
    },
    {
      image: "/assets/carousel2.jpg",
    },
    {
      video: "/intro.mp4",
    },
  ];
  return (
    <div className="bg-white text-black">
      <h1 className="text-center font-bold text-2xl md:text-3xl mt-4 md:mt-10 ">
        Our <span className="text-[#8D0F11]">Gallery</span>
      </h1>
      <InfiniteImages items={GallerySectionData} />
    </div>
  );
};

export default GallerySection;
