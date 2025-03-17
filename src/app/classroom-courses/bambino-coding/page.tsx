"use client";
import EnquiryPanel from "@/components/EnquiryPanel";
import Image from "next/image";
import React from "react";
import Footer from "@/components/Footer";
import { Testimonials } from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { BambinoCodingCurriculum } from "../../../../utils/curriculum";
const Page = () => {
  const enquiryPanelData = [
    {
      mode: "Online & Offline",

      duration: "16 CLASSES (1 HOUR PER CLASS) ",
    },
  ];
  return (
    <div className="mx-auto max-w-7xl ">
      <div className="lg:mt-32 mt-4 px-4 text-center ">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="my-4 text-3xl text-red-800 font-bold uppercase"
        >
          Bambino Coding
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex  md:w-[500px]  my-5 mx-auto   rounded-3xl overflow-hidden border"
        >
          <Image
            src="/assets/online-course/bambino.webp"
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
          className="my-4 w-[80%] mx-auto text-left"
        >
          All our courses are specially designed based on the age of the child.
          In this course, the child will be introduced to basic fundamentals of
          coding in a fun and interactive manner. Learning a new language
          teaches children another way to communicate. As with learning any
          language, children should be exposed to coding at an early age. Coding
          teaches logical thinking and strengthens both written and verbal
          skills. Children who learn to code better understand how to organize
          their thoughts.
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
        <Testimonials testimonials={BambinoCodingCurriculum} />
      </motion.div>
      <Footer />
    </div>
  );
};

export default Page;
