"use client";
import React, { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { RiDoubleQuotesL } from "react-icons/ri";
import { RiDoubleQuotesR } from "react-icons/ri";
import { FlipWords } from "./ui/flip-words";
import { CarouselImage } from "../../utils/Images";
const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const words = [
    "6000+ Students Trained.",
    "100000+ Classes Conducted.",
    "15+ Awards Won.",
  ];

  const nextSlide = useCallback(() => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentSlide((prev) =>
        prev === CarouselImage.length - 1 ? 0 : prev + 1
      );
    }
  }, [isAnimating]);

  const prevSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentSlide((prev) =>
        prev === 0 ? CarouselImage.length - 1 : prev - 1
      );
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
      <div className="relative w-full h-[30vh] md:h-[90vh] lg:h-[100vh]">
        {CarouselImage.map((item, index) => (
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
              quality={75} // Added quality attribute
            />
          </div>
        ))}
        {/* Black overlay with text */}
        <div className="absolute inset-0 bg-black/30 flex justify-center items-center flex-col">
          <motion.h2
            drag
            className="text-white flex  text-2xl md:text-4xl lg:text-6xl font-bold text-center cursor-grab"
          >
            <RiDoubleQuotesL color="white" className="mr-2 mt-2 text-2xl" />
            <span>Learning by Doing</span>{" "}
            <RiDoubleQuotesR color="white" className="ml-2 mt-2 text-2xl" />
          </motion.h2>
          <h3 className="text-white text-sm md:text-2xl lg:text-2xl font-semibold text-center mt-4 ">
            Let your child learn{" "}
            <span className="text-yellow-500 font-bold">ROBOTICS</span> in the
            most <span className="text-yellow-500 font-bold">CREATIVE</span> &
            fun methods.
          </h3>
          <p className="text-white text-sm md:text-xl lg:text-xl font-bold text-center mt-2 px-4 ">
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

          <div className="text-2xl font-medium mx-auto  text-neutral-600 dark:text-neutral-400">
            <FlipWords words={words} /> <br />
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
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 md:bottom-40 lg:bottom-40">
        {CarouselImage.map((_, index) => (
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
