"use client";
import EnquiryPanel from "@/components/EnquiryPanel";
import Image from "next/image";
import React from "react";
import Footer from "@/components/Footer";
import { Testimonials } from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { AndroidCurriculum } from "../../../utils/curriculum";

const AndroidStudio = () => {
  const enquiryPanelData = [
    {
      mode: "Online & Offline",

      duration: "16 CLASSES(x3 LEVELS) (1 HOUR PER CLASS) ",
    },
  ];
  return (
    <div className="mx-auto max-w-7xl ">
      <div className="lg:mt-32 mt-4 px-4 text-center">
        <motion.h1
          className="my-4 text-3xl text-red-800 font-bold"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Android Studio{" "}
        </motion.h1>

        <motion.div
          className="flex md:w-[500px] my-5 mx-auto rounded-3xl overflow-hidden border"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Image
            src="/assets/classroom-course/androidstudio.png"
            alt="Course Curriculum "
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
          className="my-4  lg:w-[80%] lg:mx-auto text-left text-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Android Studio is the official integrated development environment
          (IDE) for building Android applications. Developed by Google, it
          provides tools and resources for coding, designing, debugging and
          testing Android apps. It supports programming languages like Java,
          Kotlin and XML, with features like a visual layout editor, real-time
          previews and an emulator to simulate apps on different devices.
          Android Studio integrates with version control systems and the Google
          Play Store, streamlining the development-to-deployment process.
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
        <Testimonials testimonials={AndroidCurriculum} />
      </motion.div>
      <Footer />
    </div>
  );
};

export default AndroidStudio;
