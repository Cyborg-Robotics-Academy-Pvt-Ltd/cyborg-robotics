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
    window.addEventListener("load", handleComplete);

    const timer = setTimeout(() => setLoading(false), 1500);

    return () => {
      window.removeEventListener("load", handleComplete);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="">
      {loading ? (
        <Loader />
      ) : (
        <>
          <NavbarDemo />
          <div className="-mt-14 lg:-mt-2 md:-mt-2">
            <HomePage />
            <Footer />
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
