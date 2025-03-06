import React from "react";
import { Carousel } from "./ui/carousel";

const GalleryImage = () => {
  const slideData = [
    {
      id: "1",
      imageUrl: "/assets/gallery/gallery (1).jpg",
    },
    {
      id: "2",
      imageUrl: "/assets/gallery/gallery (15).jpg",
    },
    {
      id: "3",
      imageUrl: "/assets/gallery/gallery (17).jpg",
    },
    {
      id: "4",
      imageUrl: "/assets/gallery/gallery (21).jpg",
    },
    {
      id: "5",
      imageUrl: "/assets/gallery/gallery (50).jpg",
    },
    {
      id: "6",
      imageUrl: "/assets/gallery/gallery (1).jpg",
    },
    {
      id: "7",
      imageUrl: "/assets/gallery/gallery (2).jpg",
    },
    {
      id: "8",
      imageUrl: "/assets/gallery/gallery (4).jpg",
    },
    {
      id: "9",
      imageUrl: "/assets/gallery/gallery (5).jpg",
    },
    {
      id: "10",
      imageUrl: "/assets/gallery/gallery (6).jpg",
    },
    {
      id: "11",
      imageUrl: "/assets/gallery/gallery (7).jpg",
    },
  ];
  return (
    <div>
      <div className="mt-10">
        <h1 className="text-2xl font-bold font-mono  text-center mx-20">
          Go through pictures from our different{" "}
          <span className="text-red-800"> centers of Robotics for Kids</span>
        </h1>
        <Carousel slides={slideData} />
      </div>
    </div>
  );
};

export default GalleryImage;
