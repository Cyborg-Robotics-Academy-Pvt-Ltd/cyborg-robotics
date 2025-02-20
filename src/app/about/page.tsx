"use client";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

import Footer from "@/components/Footer";
import { InfiniteCertificateImages } from "@/components/ui/inifinite-moving-certificate";

const Page = () => {
  const listItems = [
    "12+ Years of Expertise",
    "6000+ Students Trained",
    "100,000+ Classes Conducted",
    "15+ Regional, National, and International Awards and Competitions Won",
    "Training for Competitions – Regional, National, and International",
    "Certified Trainers and Instructors",
    "Age-Appropriate Foundation and Career-Oriented Courses",
  ];
  const testimonials = [
    {
      image: "/assets/certificates/certificate (1).png",
      name:"Certificate of Appreciation, WRO India 2016- Football"
    },
    {
      image: "/assets/certificates/certificate (2).png",
      name:"Certificate of Appreciation, WRO India 2016- Regular Elementary"
    },
    {
      image: "/assets/certificates/certificate (3).png",
      name:"WRO, Qatar 2015"
    },
    {
      image: "/assets/certificates/certificate (4).png",
      name:"India Stem Foundation, Certificate of Recognition, 10th Indian Robot Olympiad"
    },
  ];
  return (
    <motion.div
      className="mt-24 mx-auto w-[80%]"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="mx-auto flex justify-center items-center w-full"
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold">About </h1>
        <Image src={"/assets/logo1.png"} alt="" width={60} height={60} />
      </motion.div>
      <motion.p
        className="mt-6 text-xl font-mono"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        We Cyborg Robotics Academy Private Limited are one of the leading
        academies centered in Pune that is offering numerous technical classroom
        and online courses such as Lego Robotics, Electronics, Arduino, IOT,
        Python Language, HTML, App-Designing, Animation and Coding etc.
      </motion.p>
      <motion.p
        className="mt-4 text-xl font-mono"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        All under one roof. All our programs are based on the Learning by
        Doing methodology, encouraging students to develop problem solving,
        decision making and scientific inquiry skills and comprehend abstract
        concepts in a play way method. It allows them to investigate, plan, test
        and implement their ideas thus focus on application of the CS- STEM
        concepts and themes.
      </motion.p>
      <motion.p
        className="mt-4 text-xl font-mono"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Please note, the courses and programs offered vary according to the age
        of a child. Each class consists of hands on learning, building and
        programming of new working robotic model along with explanation of its
        relation to real life application and understanding of its concepts.
      </motion.p>
      <motion.ul
        className="mt-8 list-none pl-5 text-xl font-mono"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1
          className="text-3xl ml-10 font-bold my-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Know Us
        </motion.h1>
        {listItems.map((item, index) => (
          <motion.li
            key={index}
            className="mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <div className="flex items-center">
              <Image src={"/assets/logo1.png"} alt="" width={40} height={40} />
              <span className="ml-2">{item}</span>
            </div>
          </motion.li>
        ))}
      </motion.ul>
      <motion.div
        className="bg-white text-black mt-20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-center font-bold text-2xl md:text-3xl mt-10 font-mono">
          Our{" "}
          <span className="text-[#8D0F11]">
          National   <span className="text-black font-mono">and</span>{" "}
          International Recognition{" "}
          </span>
        </h1>
        <InfiniteCertificateImages items={testimonials} />
      
      </motion.div>

      <div className="mt-10 flex justify-center">
        <hr className="border-t-2 border-gray-300 my-4 w-full " />
      </div>
      <Footer />
    </motion.div>
  );
};

export default Page;
