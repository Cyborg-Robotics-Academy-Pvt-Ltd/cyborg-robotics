import React from "react";
import { Carousel } from "./ui/carousel";
import { GalleryImageData } from "../../utils/Images";

const GalleryImage = () => {
  return (
    <div>
      <div className="mt-10">
        <h1 className="lg:text-2xl font-bold   text-center lg:mx-auto ">
          Go through pictures from our different{" "}
          <span className="text-red-800"> centers of Robotics for Kids</span>
        </h1>
        <div className="md:ml-20">
          <Carousel slides={GalleryImageData} />
        </div>
      </div>
    </div>
  );
};

export default GalleryImage;
