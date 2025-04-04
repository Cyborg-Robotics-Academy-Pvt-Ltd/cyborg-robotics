"use client";
import EnquiryPanel from "@/components/EnquiryPanel";
import Image from "next/image";
import React from "react";
import Footer from "@/components/Footer";
import { Testimonials } from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { ThreeDPrintingCurriculum } from "../../../../utils/curriculum";
const Page = () => {
  const enquiryPanelData = [
    {
      mode: "offline",

      duration: "12 CLASSES (1 HOUR PER CLASS) ",
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
          3D Printing
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex md:w-[500px] h-[350px] my-5 mx-auto rounded-3xl overflow-hidden border"
        >
          <Image
            src="/assets/classroom-course/printing3d.webp"
            alt="Course Curriculum webp"
            width={600}
            height={500}
            layout="intrinsic"
            className="object-cover rounded-xl"
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
          It is a process of making 3-dimensional solid object from a digital
          file 3D is shorthand for threedimensional. When you print a page on a
          printer, there are only two dimensions: the front of the page and the
          back of the page. Three-dimensional printing adds a third dimension,
          volume. 3D printing uses a printer to create three-dimensional
          objects, for example, a cup or doll or phone case and replaces the wax
          models. This technology is currently used in many fields such as
          health, construction, food, engineering, aerospace, etc.
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
        <Testimonials testimonials={ThreeDPrintingCurriculum} />
      </motion.div>
      <Footer />
    </div>
  );
};

export default Page;
