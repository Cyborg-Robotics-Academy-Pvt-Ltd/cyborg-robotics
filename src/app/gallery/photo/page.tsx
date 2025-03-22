"use client";

import GalleryImage from "@/components/GalleryImage";
const Page = () => {
  return (
    <div className="relative overflow-hidden w-full h-full mt-4 lg:py-20 lg:mt-10 ">
      <div className="">
        <h1 className="text-3xl font-bold   text-center">
          Our <span className="text-red-800">Gallery</span>
        </h1>
      </div>
      <GalleryImage />
    </div>
  );
};

export default Page;
