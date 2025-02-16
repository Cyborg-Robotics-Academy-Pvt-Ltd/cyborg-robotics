"use client";
import React, { useEffect } from "react";
import Carousel from "./Carousel";
import Features from "./Features";
import VisionSection from "./VisionSection";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

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
      <VisionSection />
      <div className="fixed bottom-4 md:right-20 lg:right-10 right-4 z-50">
        <Link
          href="https://wa.me/917020354108?text=Hello%2C%20I%20am%20interested%20in%20your%20services."
          target="_blank"
          rel="noopener noreferrer"
        >
          <motion.div
            animate={{ y: [0, -20, 0], scale: 1 }}
            transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
          >
            <Image
              src="/assets/whatsapp.png"
              alt="WhatsApp Logo"
              width={60}
              height={60}
              className="transition-opacity duration-300"
            />
          </motion.div>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
