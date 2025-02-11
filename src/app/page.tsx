"use client";
import React, { useState, useEffect } from "react";
import { NavbarDemo } from "@/components/Navbar";
import HomePage from "@/components/HomePage";
import Loader from "@/components/Loader";
import Footer from "@/components/Footer";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [currentTheme, setCurrentTheme] = useState("light");
  const isDarkMode = currentTheme === "dark";

  useEffect(() => {
    const handleComplete = () => setLoading(false);
    window.addEventListener("load", handleComplete);

    const timer = setTimeout(() => setLoading(false), 1500);

    const handleThemeChange = (e: MediaQueryListEvent) => {
      setCurrentTheme(e.matches ? "dark" : "light");
    };

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQuery.addEventListener("change", handleThemeChange);

    setCurrentTheme(mediaQuery.matches ? "dark" : "light");

    return () => {
      window.removeEventListener("load", handleComplete);
      clearTimeout(timer);
      mediaQuery.removeEventListener("change", handleThemeChange);
    };
  }, []);

  return (
    <div className={isDarkMode ? "bg-black text-white" : "bg-white text-black"}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <NavbarDemo />
          <div className="-mt-14 lg:-mt-2 md:-mt-2">
            <HomePage />
            <Footer theme="default" />
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
