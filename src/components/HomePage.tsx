"use client";
import React, { useEffect } from "react";
import Carousel from "./Carousel";
import Features from "./Features";
import VisionSection from "./VisionSection";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import FeedBack from "./FeedBack";
import GallerySection from "./GallerySection";

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
      <GallerySection/>
      <FeedBack/>
      <div className="fixed bottom-4 md:right-20 lg:right-10 right-4 z-50">
        <Link
          href="https://wa.me/917028511161?text=Hello%20Cyborg,%20I%20am%20looking%20for%20some%20help!%20(Enquiry)"
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
