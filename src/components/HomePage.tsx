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
import Feature2 from "./Feature2";
import Footer from "./Footer";

const HomePage: React.FC = () => {
  useEffect(() => {
    return () => {
      // Cleanup if needed (e.g., event listeners)
    };
  }, []);

  return (
    <div className="bg-white text-black">
      <Carousel />
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        viewport={{ once: true }}
      >
        <Features />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        viewport={{ once: true }}
      >
        <Feature2 />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        viewport={{ once: true }}
        className=""
      >
        <VisionSection />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        viewport={{ once: true }}
        className=""
      >
        <GallerySection />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        viewport={{ once: true }}
        className=""
      >
        <FeedBack />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        viewport={{ once: true }}
        className=""
      >
        <Footer />
      </motion.div>
      {/* WhatsApp Floating Button */}
      <div className="fixed bottom-4 md:right-20 lg:right-10 right-4 z-50">
        <Link
          href="https://wa.me/917028511161?text=Hello%20Cyborg,%20I%20am%20looking%20for%20some%20help!%20(Enquiry)"
          target="_blank"
          rel="noopener noreferrer"
        >
          <motion.div
            animate={{ y: [0, -20, 0], scale: 1 }}
            transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
            className=" "
          >
            <Image
              src="/assets/whatsapp.png"
              alt="WhatsApp Logo"
              width={60}
              height={60}
              loading="lazy"
              className="transition-opacity duration-300"
            />
          </motion.div>
        </Link>
      </div>
      {/* <div className="fixed bottom-4 md:right-20 lg:right-10 left-4 z-50">
        <motion.div className=" ">
          <motion.img
            drag
            src="/assets/logo1.png"
            alt="WhatsApp Logo"
            width={100}
            height={100}
            loading="lazy"
            className="transition-opacity duration-300"
          />
        </motion.div>
      </div> */}
    </div>
  );
};

export default HomePage;
