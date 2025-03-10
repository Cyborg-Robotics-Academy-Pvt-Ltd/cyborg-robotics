import React from "react";
import { InfiniteImages } from "./ui/inifinite-moving-images";
import { GallerySectionData } from "../../utils/Images";

const GallerySection = () => {
  return (
    <div className="bg-white text-black">
      <h1 className="text-center font-bold text-2xl md:text-3xl mt-10 ">
        Our <span className="text-[#8D0F11]">Gallery</span>
      </h1>
      <InfiniteImages items={GallerySectionData} />
    </div>
  );
};

export default GallerySection;
