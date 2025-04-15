"use client";
import React, { useEffect, useState } from "react";
import Carousel from "./Carousel";
import Features from "./Features";
import VisionSection from "./VisionSection";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import FeedBack from "./FeedBack";
import GallerySection from "./GallerySection";
import Feature2 from "./Feature2";
import Footer from "./Footer";
import ScrollButton from "./ScrollButton";
import { useScrollDirection } from "../hooks/useScrollDirection";
import WhatWeOffer from "./WhatWeOffer";

const HomePage: React.FC = () => {
  const { scrollDirection } = useScrollDirection();
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    // Set initial load to false after 2 seconds
    const timer = setTimeout(() => {
      setIsInitialLoad(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    return () => {
      // Cleanup if needed (e.g., event listeners)
    };
  }, []);

  const shouldShowButtons = isInitialLoad || scrollDirection === "down";

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
      >
        <WhatWeOffer />
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
      <div className="fixed w-full bottom-1 items-center z-50 flex justify-between">
        <AnimatePresence>
          {shouldShowButtons && (
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Link href={"/contact-us"}>
                <motion.div
                  whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                  whileTap={{ scale: 0.95, transition: { duration: 0.1 } }}
                  className="bg-red-800 text-white h-8 shadow-xl hover:bg-white hover:text-black px-2 py-1 rounded-[8px] text-center mx-10"
                >
                  <span className="text-center">BOOK FREE TRIAL NOW !</span>
                </motion.div>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {shouldShowButtons && (
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:mr-28 mr-8"
            >
              <Link
                href="https://wa.me/917028511161?text=Hello%20Cyborg,%20I%20am%20looking%20for%20some%20help!%20(Enquiry)"
                target="_blank"
                rel="noopener noreferrer"
              >
                <motion.div
                  animate={{ y: [0, -20, 0], scale: 1 }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "loop",
                  }}
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
            </motion.div>
          )}
        </AnimatePresence>

        <ScrollButton />
      </div>
    </div>
  );
};

export default HomePage;
