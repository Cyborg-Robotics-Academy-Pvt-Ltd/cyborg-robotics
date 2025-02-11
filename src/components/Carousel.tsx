"use client";
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [studentCount, setStudentCount] = useState(0);
  const [trainerCount, setTrainerCount] = useState(0);

  useEffect(() => {
    // Animate student count from 0 to 50
    const studentInterval = setInterval(() => {
      setStudentCount((prev) => (prev < 50 ? prev + 1 : prev));
    }, 100); // Adjust the interval for speed

    // Animate trainer count from 0 to 10
    const trainerInterval = setInterval(() => {
      setTrainerCount((prev) => (prev < 10 ? prev + 1 : prev));
    }, 500); // Adjust the interval for speed

    return () => {
      clearInterval(studentInterval);
      clearInterval(trainerInterval);
    };
  }, []);

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

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [currentSlide]);

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <div className="relative w-full overflow-hidden">
      {/* Carousel container */}
      <div className="relative w-full h-[30vh] md:h-[70vh] lg:h-[80vh] md:mt-1 mt-10">
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
              width={1000}
              height={600}
              style={{ width: "100%", height: "700px" }}
            />
          </div>
        ))}
        {/* Black overlay with text */}
        <div className="absolute inset-0 bg-black/60 flex justify-center items-center flex-col">
          <div>
            <h2 className="text-white md:text-4xl text-2xl lg:text-6xl md:my-10 lg:my-10 font-bold text-center">
              &quot;Learning by Doing&quot;
            </h2>
            <h2 className="text-white md:text-xl lg:text-xl text-sm font-semibold text-center mt-4">
              Let your child learn the most{" "}
              <span className="text-yellow-500 font-bold">Fun</span> and{" "}
              <span className="text-yellow-500 font-bold">Engaging</span>{" "}
              courses from the{" "}
              <span className="text-yellow-500 font-bold">Safety</span> and{" "}
              <span className="text-yellow-500 font-bold">Comfort</span> of your
              home.
            </h2>
            <h2 className="text-white font-bold flex flex-row items-center justify-center text-center md:text-xl lg:text-xl text-sm mt-4 w-full">
              Total Students:{" "}
              <motion.pre className="text-yellow-500 font-bold mx-4">
                {studentCount}{" "}
                <span className="text-yellow-500 text-2xl">+</span>
              </motion.pre>{" "}
              | Total Trainers:{" "}
              <motion.pre className="text-yellow-500 font-bold mx-4">
                {trainerCount}
              </motion.pre>
            </h2>
            <div className="mx-auto w-full flex justify-center mt-2 lg:mt-4 md:mt-4">
              <button className="enquiry text-black font-normal">
                {" "}
                Enquire Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation buttons */}
      <button
        onClick={prevSlide}
        className="absolute hidden md:block left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white transition-colors"
        disabled={isAnimating}
      >
        <ChevronLeft className="w-6 h-6 hover:text-black" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute hidden md:block right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white transition-colors"
        disabled={isAnimating}
      >
        <ChevronRight className="w-6 h-6 hover:text-black" />
      </button>

      {/* Dot indicators */}
      <div className="absolute md:bottom-14 lg:bottom-14 bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => !isAnimating && setCurrentSlide(index)}
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
