"use client";
import EnquiryPanel from "@/components/EnquiryPanel";
// import Image from "next/image";
import React from "react";
import Footer from "@/components/Footer";
import { Testimonials } from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { ArduinoCurriculum } from "../../../../utils/curriculum";
import Scene from "@/components/Scene";
const Page = () => {
  const enquiryPanelData = [
    {
      mode: "Offline",

      duration: "16 CLASSES (1 HOUR PER CLASS) ",
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
          Arduino
        </motion.h1>
        {/* <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex  md:w-[500px]  my-5 mx-auto   rounded-3xl overflow-hidden border"
        >
          <Image
            src="/assets/classroom-course/arduino.webp"
            alt="Course Curriculum webp"
            width={600}
            height={300}
            layout="intrinsic"
            className="object-contain"
          />
        </motion.div> */}
        <div className="h-96">
          <Scene />
        </div>
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
          Arduino is an open-source electronics platform based on easy-to-use
          hardware and software. Arduino boards are able to read inputs - light
          on a sensor or a finger on a button - and turn it into an output -
          activating a motor, turning on an LED. You can tell your board what to
          do by sending a set of instructions to the microcontroller on the
          board. To do so you use the Arduino programming language, and the
          Arduino Software (IDE). We provide hands on training on Arduino uno by
          interfacing various kind of sensor which will collect real world data
          and we can further process that data according to our need. e.g
          Interfacing Led&apos;s with arduino,Switch interfacing,Burglar
          alarm,Automatic dark detector&quot;
        </motion.p>
      </div>
      <motion.h2
        className="text-center lg:text-2xl text-xl font-bold uppercase text-red-800"
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
        <Testimonials testimonials={ArduinoCurriculum} />
      </motion.div>
      <Footer />
    </div>
  );
};

export default Page;
