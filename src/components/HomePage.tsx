"use client";
import React, { useEffect } from "react";
import Carousel from "./Carousel";
import Features from "./Features";

const HomePage: React.FC = () => {
  useEffect(() => {
    return () => {
      // mediaQuery.removeEventListener("change", handleThemeChange);
    };
  }, []);

  return (
    <div className="bg-white text-black">
      <Carousel />
      <Features />
    </div>
  );
};

export default HomePage;
