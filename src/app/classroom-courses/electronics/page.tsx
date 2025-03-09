"use client";
import EnquiryPanel from "@/components/EnquiryPanel";
import Image from "next/image";
import React from "react";
import Footer from "@/components/Footer";
import { Testimonials } from "@/components/ui/accordion";
import { motion } from "framer-motion";
const Page = () => {
  const ElectronicsCurriculum = [
    {
      id: "1",
      title: "Course Introduction",
      subtitle: [
        "Introduction to block-based coding.",
        "Learning how coding can make characters follow instructions.",
        "Understanding different concepts in a fun way.",
      ],
    },
    {
      id: "2",
      title: "Getting Started with Coding",
      subtitle: [
        "Engaging with characters like Anna and Elsa (from Frozen) to navigate simple puzzles.",
        "Learning to identify and create sequences of instructions (algorithms).",
      ],
    },
    {
      id: "3",
      title: "Sequence",
      subtitle: [
        "Understanding the importance of the order of commands.",
        "Activities involve arranging blocks to complete a character’s journey.",
      ],
    },
    {
      id: "4",
      title: "Loops",
      subtitle: [
        "Introduction to the concept of repeating actions.",
        "Simple activities that reinforce the idea of loops through fun challenges.",
      ],
    },
    {
      id: "5",
      title: "Events",
      subtitle: [
        "Learning how actions can be triggered by events (e.g., pressing a button).",
        "Activities involve creating interactive stories or games.",
      ],
    },
    {
      id: "6",
      title: "Debugging",
      subtitle: [
        "Introduction to finding and fixing errors in sequences.",
        "Simple puzzles where students identify and correct mistakes.",
      ],
    },
    {
      id: "7",
      title: "Project Creation",
      subtitle: [
        "Using learned concepts to create a simple interactive project.",
        "Encourages creativity and application of skills in a fun way.",
      ],
    },
  ];
  const enquiryPanelData = [
    {
      mode: "Online & Offline",

      duration: "16 CLASSES ( x3 LEVELS) (1 HOUR PER CLASS) ",
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
          Electronics
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex  md:w-[500px]  my-5 mx-auto   rounded-3xl overflow-hidden border"
        >
          <Image
            src="/assets/classroom-course/electronics.webp"
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
          Study of flow and control of electrons, their behavior and effects.
          Let your child learn the basic of electronics which includes
          introduction of various electronic components and symbols. What is
          voltage, Current, Resistance, Open and Short circuit, series and
          parallel circuit. Puzzle solving using Logic Gates, etc. Experiments
          and concepts conducted on specifically designed imported kits which
          will help students to make amazing electronics projects.
        </motion.p>
      </div>
      <div className="mx-4 md:mx-20">
        <motion.h2
          className="text-center text-2xl font-bold uppercase text-red-800"
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
        <Testimonials testimonials={ElectronicsCurriculum} />
      </motion.div>
      <Footer />
    </div>
  );
};

export default Page;
