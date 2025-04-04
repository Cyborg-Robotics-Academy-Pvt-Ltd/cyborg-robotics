"use client";
import EnquiryPanel from "@/components/EnquiryPanel";
import Image from "next/image";
import React from "react";
import Footer from "@/components/Footer";
import { Testimonials } from "@/components/ui/accordion";
import { pythonCourseData } from "../../../../utils/curriculum";
import { motion } from "framer-motion";
const Page = () => {
  const enquiryPanelData = [
    {
      mode: "Online & Offline",

      duration: "16 CLASSES(x6 LEVELS) (1 HOUR PER CLASS) ",
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
          Python Programming
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex md:w-[300px] my-5 mx-auto rounded-3xl overflow-hidden border"
          role="img"
          aria-label="Python Course Image"
        >
          <Image
            src="/assets/online-course/python.webp"
            alt="Course Curriculum webp"
            width={300}
            height={200}
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
          className="my-4  lg:w-[80%] lg:mx-auto text-left text-sm"
        >
          Python is a programming language that lets you work quickly and
          integrate systems more effectively. It is a general purpose and a
          high-level programming language, allow you to focus on core
          functionality of the application by taking care of common programming
          tasks. You can use Python for developing desktop GUI applications,
          websites and web applications
        </motion.p>
      </div>
      <div className="mx-4 md:mx-20">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center lg:text-2xl text-xl font-bold uppercase text-red-800"
        >
          Detailed Curriculum
        </motion.h2>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Testimonials testimonials={pythonCourseData} />
      </motion.div>
      <Footer />
    </div>
  );
};

export default Page;
