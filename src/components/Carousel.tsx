"use client";
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const images = [
    {
      id: "1",
      imageUrl: "/assets/carousel.jpeg",
    },
    {
      id: "2",
      imageUrl: "/assets/carousel2.jpeg",
    },
    {
      id: "3",
      imageUrl: "/assets/carousel3.jpeg",
    },
  ];

  const nextSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }
  };

  const prevSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    }
  };

  const goToSlide = (index: number) => {
    if (!isAnimating && index !== currentSlide) {
      setIsAnimating(true);
      setCurrentSlide(index);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [currentSlide]);

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full overflow-hidden ">
      {/* Carousel container */}
      <div className="relative w-full h-[30vh] md:h-[70vh] lg:h-[80vh]">
        {images.map((item, index) => (
          <div
            key={item.id}
            className={`absolute w-full h-full transition-transform duration-500 ease-in-out ${
              index === currentSlide
                ? "translate-x-0"
                : index < currentSlide
                  ? "-translate-x-full"
                  : "translate-x-full"
            }`}
          >
            <Image
              src={item.imageUrl}
              alt={`Slide ${index + 1}`}
              width={1000} // Adjusted to maintain aspect ratio with 100% width
              height={700}
              style={{ width: "100%", height: "600px" }} // Added inline styles for width and height
              priority={index === 0} // load first slide with high priority
            />
          </div>
        ))}
        {/* Black overlay with text */}
        <div className="absolute  inset-0 bg-black/60 flex justify-center items-center flex-col">
          <div>
            <h2 className="text-white md:text-4xl text-2xl lg:text-6xl md:my-10 lg:my-10 font-bold text-center">
              &quot;Learning by Doing&quot;
            </h2>
            <h3 className="text-white md:text-2xl lg:text-2xl text-sm font-semibold text-center mt-4">
              Let your child learn
              <span className="text-red-800 font-bold"> ROBOTICS</span> in the
              most <span className="text-red-800 font-bold"> CREATIVE </span> &
              fun methods.
            </h3>
            <p className="text-white font-bold text-center md:text-xl lg:text-xl text-sm mt-2">
              <span className="text-yellow-500 font-bold">ROBOTICS </span> |{" "}
              <span className="text-yellow-500 font-bold">CODING </span>|{" "}
              <span className="text-yellow-500 font-bold">AUTOMATION</span> |{" "}
              <span className="text-yellow-500 font-bold">+ MORE </span>...
            </p>
            <div className="mx-auto w-full flex justify-center mt-2 lg:mt-4 md:mt-4">
              <button type="button" className="enquiry">
                Enquire Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation buttons */}
      <button
        type="button"
        onClick={prevSlide}
        aria-label="Previous Slide"
        className="absolute hidden md:block left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white transition-colors"
        disabled={isAnimating}
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        type="button"
        onClick={nextSlide}
        aria-label="Next Slide"
        className="absolute hidden md:block right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white transition-colors"
        disabled={isAnimating}
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dot indicators */}
      <div className="absolute md:bottom-14 lg:bottom-14 bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
