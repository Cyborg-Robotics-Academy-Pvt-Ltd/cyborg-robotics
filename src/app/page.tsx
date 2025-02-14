"use client";
import React, { useState, useEffect } from "react";
import { NavbarDemo } from "@/components/Navbar";
import HomePage from "@/components/HomePage";
import Loader from "@/components/Loader";
import Footer from "@/components/Footer";

const Home = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleComplete = () => setLoading(false);
    const timer = setTimeout(() => setLoading(false), 1500);

    // Add event listener for load event
    window.addEventListener("load", handleComplete);

    return () => {
      window.removeEventListener("load", handleComplete);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="bg-white text-black">
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
