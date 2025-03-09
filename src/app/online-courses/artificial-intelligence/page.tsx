"use client";
import EnquiryPanel from "@/components/EnquiryPanel";
import Image from "next/image";
import React from "react";
import Footer from "@/components/Footer";
import { Testimonials } from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { ArtificialIntelligenceCurriculum } from "../../../../utils/curriculum";
const Page = () => {
  const enquiryPanelData = [
    {
      mode: "online & offline",

      duration: "16 CLASSES (x5 LEVELS)    (1 HOUR PER CLASS) ",
    },
  ];
  return (
    <div className="mx-auto max-w-7xl ">
      <div className="mt-32 px-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="my-4 text-3xl text-red-800 font-bold uppercase"
        >
          Artificial Intelligence{" "}
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex  md:w-[400px] md:h-[300px]  my-5 mx-auto   rounded-3xl overflow-hidden border"
        >
          <Image
            src="/assets/online-course/aigif.webp"
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
          Artificial Intelligence (AI) is a computer program which is capable of
          performing a task which requires intelligence. This task is usually
          something which a human or an intelligent animal can accomplish, such
          as learning, planning, problem-solving, etc. It is the endeavour to
          replicate or simulate human intelligence in machines.AI can provide
          just-in-time assessment by leveraging learning analytics and data to
          find changes in confidence and motivation levels in individual
          students.
        </motion.p>
      </div>
      <motion.h2
        className="text-center text-2xl font-bold uppercase text-red-800"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Detailed Curriculum
      </motion.h2>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Testimonials testimonials={ArtificialIntelligenceCurriculum} />
      </motion.div>
      <Footer />
    </div>
  );
};

export default Page;
