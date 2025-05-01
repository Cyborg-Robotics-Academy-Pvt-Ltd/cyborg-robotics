"use client";
import EnquiryPanel from "@/components/EnquiryPanel";
import Image from "next/image";
import React from "react";
import Footer from "@/components/Footer";
import { Testimonials } from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { AnimationAndCodingCurriculum } from "../../../utils/curriculum";

const AnimationCoding = () => {
  const enquiryPanelData = [
    {
      mode: "Online & Offline",

      duration: " 16 CLASSES (x2 LEVELS) (1 HOUR PER CLASS) ",
    },
  ];
  return (
    <div className="mx-auto max-w-7xl ">
      <div className="lg:mt-32 mt-4 px-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="my-4 text-3xl text-red-800 font-bold uppercase"
        >
          Animation Coding
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex md:w-[400px] my-5 mx-auto rounded-3xl overflow-hidden border"
        >
          <Image
            src="/assets/online-course/animation-coding.webp"
            alt="Course Curriculum webp"
            width={600}
            height={400}
            layout="intrinsic"
            className="object-contain rounded-xl"
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
          A block based visual programming language designed for animation that
          focus more on problem solving than on specific syntax. Learn to
          program your own interactive stories, games, and animations — and
          share your creations with others in the online community. Scratch
          helps young people learn to think creatively, reason systematically,
          and work collaboratively. The ability to code computer programs is an
          important part of literacy in today’s society. When kids learn to
          code, they learn important strategies for solving problems, designing
          projects, and communicating ideas.
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
        <Testimonials testimonials={AnimationAndCodingCurriculum} />
      </motion.div>
      <Footer />
    </div>
  );
};

export default AnimationCoding;
