"use client";
import EnquiryPanel from "@/components/EnquiryPanel";
import Image from "next/image";
import React from "react";
import Footer from "@/components/Footer";
import { Testimonials } from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { AppDevelopmentData } from "../../../../utils/curriculum";
const Page = () => {
  const enquiryPanelData = [
    {
      mode: "Online & Offline",

      duration: "16 CLASSES(x 4 LEVELS) (1 HOUR PER CLASS) ",
    },
  ];
  return (
    <div className="mx-auto max-w-7xl ">
      <div className="lg:mt-32 mt-4 px-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="my-4 text-2xl lg:text-3xl text-red-800 font-bold uppercase"
        >
          App Designing
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex  md:w-[500px]  my-5 mx-auto   rounded-3xl overflow-hidden border"
        >
          <Image
            src="/assets/online-course/appdesigning.webp"
            alt="Course Curriculum webp"
            width={600}
            height={300}
            layout="intrinsic"
            className="object-contain"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <EnquiryPanel data={enquiryPanelData} />
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="my-4 lg:w-[80%] mx-auto text-left"
        >
          It consists of two main parts: Front-End (Designing) and Back-End
          (Programming/Coding). The Designing Part focuses on creating the user
          interface, learning layouts, media operations, drawing and animation,
          maps and navigation, sensor integration, social components, storage or
          database management, and web connectivity. The Programming Part
          involves control structures, logical operations, mathematical
          computations, text string manipulation, creating lists and
          dictionaries, defining variables, and writing functions or procedures.
          Together, these aspects ensure a seamless development process,
          combining design aesthetics with functional logic.
        </motion.p>
      </div>
      <div className="mx-4 md:mx-20">
        <motion.h2
          className="text-center lg:text-2xl text-xl font-bold uppercase text-red-800"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Detailed Curriculum
        </motion.h2>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Testimonials testimonials={AppDevelopmentData} />
      </motion.div>
      <Footer />
    </div>
  );
};

export default Page;
