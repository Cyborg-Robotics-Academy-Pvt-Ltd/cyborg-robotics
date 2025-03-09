"use client";
import EnquiryPanel from "@/components/EnquiryPanel";
import Image from "next/image";
import React from "react";
import Footer from "@/components/Footer";
import { Testimonials } from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { IotCurriculum } from "../../../../utils/curriculum";
const Page = () => {
  const enquiryPanelData = [
    {
      mode: "Online & Offline",

      duration: "16 CLASSES (x3 LEVELS) (1 HOUR PER CLASS)  ",
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
          IOT
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex  md:w-[500px]  my-5 mx-auto   rounded-3xl overflow-hidden border"
        >
          <Image
            src="/assets/classroom-course/iot.webp"
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
          The Internet of Things (IoT) refers to a network of interconnected
          physical devices, such as sensors, appliances, and vehicles, that
          collect, exchange, and analyze data through the internet. These
          devices communicate with each other and can be controlled remotely,
          enabling automation and smarter decision-making. IoT enhances
          efficiency in various fields, including healthcare, agriculture,
          manufacturing, and smart homes, by providing real-time insights and
          enabling predictive actions.
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
        <Testimonials testimonials={IotCurriculum} />
      </motion.div>
      <Footer />
    </div>
  );
};

export default Page;
