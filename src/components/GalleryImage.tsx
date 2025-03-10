import React from "react";
import { Carousel } from "./ui/carousel";
import { GalleryImageData } from "../../utils/Images";

const GalleryImage = () => {
  return (
    <div>
      <div className="mt-10">
        <h1 className="text-2xl font-bold   text-center mx-20">
          Go through pictures from our different{" "}
          <span className="text-red-800"> centers of Robotics for Kids</span>
        </h1>
        <Carousel slides={GalleryImageData} />
      </div>
    </div>
  );
};

export default GalleryImage;
