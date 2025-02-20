"use client";
import React, { useState, useEffect } from "react";

import HomePage from "@/components/HomePage";

import Footer from "@/components/Footer";
import { NavbarDemo } from "@/components/Navbar";

const Home = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // Adjust the delay as needed

    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="-mt-14 lg:-mt-2 md:-mt-2">
      {loading ? (
        <div>Loading...</div> // Replace with your loader component or styling
      ) : (
        <>
        <NavbarDemo />
          <HomePage />
          <Footer />
        </>
      )}
    </div>
  );
};

export default Home;
