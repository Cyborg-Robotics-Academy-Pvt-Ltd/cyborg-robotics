"use client";
import React, { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import { RiDoubleQuotesL } from "react-icons/ri";
import { RiDoubleQuotesR } from "react-icons/ri";
const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const studentsTrainedCount = useMotionValue(0);
  const classesConductedCount = useMotionValue(0);
  const awardsWonCount = useMotionValue(0);

  // Using useTransform to create a motion value that can be rendered
  const roundedStudentsTrained = useTransform(studentsTrainedCount, (value) =>
    Math.round(value).toString()
  );
  const roundedClassesConducted = useTransform(classesConductedCount, (value) =>
    Math.round(value).toString()
  );
  const roundedAwardsWon = useTransform(awardsWonCount, (value) =>
    Math.round(value).toString()
  );

  useEffect(() => {
    const animateCounts = () => {
      animate(studentsTrainedCount, 6000, { duration: 1 });
      animate(classesConductedCount, 100000, { duration: 1 });
      animate(awardsWonCount, 15, { duration: 2 });
    };

    animateCounts(); // Initial animation

    const interval = setInterval(animateCounts, 5000); // Animate every 5 seconds

    return () => clearInterval(interval);
  }, [studentsTrainedCount, classesConductedCount, awardsWonCount]);

  const images = [
    { id: "1", imageUrl: "/assets/carousel.jpeg" },
    { id: "2", imageUrl: "/assets/carousel2.jpeg" },
    { id: "3", imageUrl: "/assets/carousel3.jpeg" },
  ];

  const nextSlide = useCallback(() => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }
  }, [isAnimating, images.length]);

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
  }, [nextSlide]);

  return (
    <div className="relative w-full overflow-hidden mt-16 md:mt-24 lg:mt-24">
      {/* Carousel container */}
      <div className="relative w-full h-[30vh] md:h-[80vh] lg:h-[90vh]">
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
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{ objectFit: "cover" }}
              priority={index === 0}
            />
          </div>
        ))}
        {/* Black overlay with text */}
        <div className="absolute inset-0 bg-black/50 flex justify-center items-center flex-col">
          <h2 className="text-white flex  text-2xl md:text-4xl lg:text-6xl font-bold text-center font-mono">
            <RiDoubleQuotesL color="white" className="mr-2 mt-2 text-2xl" />
            <span>Learning by Doing</span>{" "}
            <RiDoubleQuotesR color="white" className="ml-2 mt-2 text-2xl" />
          </h2>
          <h3 className="text-white text-sm md:text-2xl lg:text-2xl font-semibold text-center mt-4 font-mono">
            Let your child learn{" "}
            <span className="text-yellow-500 font-bold">ROBOTICS</span> in the
            most <span className="text-yellow-500 font-bold">CREATIVE</span> &
            fun methods.
          </h3>
          <p className="text-white text-sm md:text-xl lg:text-xl font-bold text-center mt-2 px-4 font-mono">
            <span className="text-yellow-500 font-bold text-xs md:text-xl">
              ROBOTICS
            </span>{" "}
            |{" "}
            <span className="text-yellow-500 font-bold text-xs md:text-xl">
              CODING
            </span>{" "}
            |{" "}
            <span className="text-yellow-500 font-bold text-xs md:text-xl">
              ELECTRONICS
            </span>{" "}
            |{" "}
            <span className="text-yellow-500 font-bold text-xs md:text-xl">
              3D Printing
            </span>{" "}
            |{" "}
            <span className="text-yellow-500 font-bold text-xs md:text-xl">
              + MORE
            </span>
          </p>
          <div className="text-white text-center mt-4 flex flex-col md:flex-row md:justify-center">
            <p className="text-lg font-bold md:mr-4">
              <motion.span className="text-white font-bold text-xs md:text-2xl">
                {roundedStudentsTrained}
              </motion.span>
              +{" "}
              <span className="text-yellow-500 font-mono font-bold text-xs md:text-xl">
                Students Trained{" "}
              </span>
              <span className="text-yellow-500 font-bold text-xs md:text-xl">
                |
              </span>
            </p>
            <p className="text-lg font-bold md:mr-4">
              <motion.span className="text-white font-bold text-xs md:text-2xl">
                {roundedClassesConducted}
              </motion.span>
              +{" "}
              <span className="text-yellow-500 font-mono font-bold text-xs md:text-xl">
                Classes Conducted
              </span>{" "}
              <span className="text-yellow-500 font-bold text-xs md:text-xl">
                |
              </span>
            </p>
            <p className="text-lg font-bold">
              <motion.span className="text-white font-bold text-xs md:text-2xl">
                {roundedAwardsWon}
              </motion.span>
              +{" "}
              <span className="text-yellow-500 font-mono font-bold text-xs md:text-xl">
                Awards Won
              </span>{" "}
              <span className="text-yellow-500 font-bold text-xs md:text-xl">
                |
              </span>
            </p>
          </div>
          <div className="mx-auto w-full flex justify-center mt-2 lg:mt-4 md:mt-4">
            <button type="button" className="enquiry px-4 font-mono">
              Enquiry Now
            </button>
          </div>
        </div>
      </div>

      {/* Navigation buttons */}
      <button
        onClick={prevSlide}
        aria-label="Previous Slide"
        className="absolute hidden md:block left-4 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-white/80 transition-colors"
        disabled={isAnimating}
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        aria-label="Next Slide"
        className="absolute hidden md:block right-4 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-white/80 transition-colors"
        disabled={isAnimating}
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 md:bottom-14 lg:bottom-14">
        {images.map((_, index) => (
          <button
            key={index}
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
