"use client";
import React, { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { RiDoubleQuotesL } from "react-icons/ri";
import { RiDoubleQuotesR } from "react-icons/ri";
import { FlipWords } from "./ui/flip-words";
import { CarouselImage } from "../../utils/Images";
import Link from "next/link";
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
    <div className="relative w-full overflow-hidden mt-14 md:mt-2 lg:mt-24">
      {/* Carousel container */}
      <div className="relative w-full h-[30vh] md:h-[50vh] lg:h-[70vh] xl:h-[100vh] 2xl:h-[100vh]">
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
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw"
              style={{ objectFit: "cover" }}
              priority={index === 0}
              quality={75} // Added quality attribute
            />
          </div>
        ))}
        {/* Black overlay with text */}
        <div className="absolute inset-0 bg-black/30 flex justify-center items-center flex-col will-change-opacity">
          <motion.h2
            drag
            className="text-white flex text-xl sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-normal text-center cursor-grab"
          >
            <RiDoubleQuotesL
              color="white"
              className="mr-2 mt-2 md:text-2xl text-sm"
            />
            <span>Learning by Doing</span>
            <RiDoubleQuotesR
              color="white"
              className="ml-2 mt-2 md:text-2xl text-sm"
            />
          </motion.h2>
          <h3 className="text-red-600 text-xs sm:text-sm md:text-lg lg:text-xl font-semibold text-center mt-2 lg:mt-4 ">
            Let your child learn{" "}
            <span className="text-white font-">ROBOTICS</span> in the most{" "}
            <span className="text-white font-medium">CREATIVE</span> &{" "}
            <span className="text-white font-medium">FUN </span>
            methods.
          </h3>
          <p className="text-white md:text-lg lg:text-xl font-medium text-center lg:mt-2 px-4 ">
            <span className="text-white font-medium text-[10px] sm:text-sm md:text-lg">
              ROBOTICS
            </span>{" "}
            <span className="text-red-600">| </span>
            <span className="text-white font-medium text-[10px] sm:text-sm md:text-lg">
              CODING
            </span>{" "}
            <span className="text-red-600">| </span>
            <span className="text-white font-medium text-[10px] sm:text-sm md:text-lg">
              ELECTRONICS
            </span>{" "}
            <span className="text-red-600">| </span>
            <span className="text-white font-medium text-[10px] sm:text-sm md:text-lg">
              3D Printing
            </span>{" "}
            <span className="text-red-600">| </span>
            <span className="text-white font-medium text-[10px] sm:text-sm md:text-lg">
              + MORE
            </span>
          </p>
          <div className="text-2xl font-medium mx-auto  text-neutral-600 dark:text-neutral-400">
            <FlipWords words={words} /> <br />
          </div>
          <Link
            href="https://wa.me/917028511161?text=Hello%20Cyborg,%20I%20am%20looking%20for%20some%20help!%20(Enquiry)"
            target="_blank"
            rel="noopener noreferrer"
          >
            <motion.button
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.95, transition: { duration: 0.1 } }}
              className="mt-4 border-none px-6 py-2 bg-red-800 rounded-xl text-white font-semibold shadow-md hover:bg-white hover:text-black transition duration-200"
            >
              Enquiry Now
            </motion.button>
          </Link>
        </div>
      </div>

      {/* Navigation buttons */}
      <button
        onClick={prevSlide}
        aria-label="Previous Slide"
        className="absolute hidden md:block left-4 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-white/80 transition-colors"
        disabled={isAnimating}
        onTouchStart={(e) => e.preventDefault()}
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        aria-label="Next Slide"
        className="absolute hidden md:block right-4 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-white/80 transition-colors"
        disabled={isAnimating}
        onTouchStart={(e) => e.preventDefault()}
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dot indicators */}
      <div className="absolute hidden md:hidden  bottom-4 left-1/2 -translate-x-1/2  gap-2 md:bottom-40 lg:bottom-40">
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
