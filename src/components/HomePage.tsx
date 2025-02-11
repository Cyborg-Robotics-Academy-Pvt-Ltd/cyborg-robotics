"use client";
import React, { useEffect, useState } from "react";
import Carousel from "./Carousel";
import Features from "./Features";

const HomePage: React.FC = () => {
  const [currentTheme, setCurrentTheme] = useState("light");
  const isDarkMode = currentTheme === "dark";

  useEffect(() => {
    const handleThemeChange = (e: MediaQueryListEvent) => {
      setCurrentTheme(e.matches ? "dark" : "light");
    };

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQuery.addEventListener("change", handleThemeChange);

    setCurrentTheme(mediaQuery.matches ? "dark" : "light");

    return () => {
      mediaQuery.removeEventListener("change", handleThemeChange);
    };
  }, []);

  return (
    <div className={isDarkMode ? "bg-black text-white" : "bg-white text-black"}>
      <Carousel />
      <Features />
    </div>
  );
};

export default HomePage;
