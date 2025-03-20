import React from "react";
import { Carousel } from "./ui/carousel";

const GalleryVideos = () => {
  const slideData = [
    {
      id: "1",
      videoUrl: "/assets/gallery/video1.mp4",
    },
    {
      id: "2",
      videoUrl: "/assets/gallery/video1.mp4",
    },
  ];
  return (
    <div>
      <div className="mt-20 h-96">
        <h1 className="text-2xl font-bold text-center">
          Our <span className="text-red-800">Videos </span>
        </h1>
        <div className="md:ml-20">
          <Carousel slides={slideData} />
        </div>
      </div>
    </div>
  );
};

export default GalleryVideos;
