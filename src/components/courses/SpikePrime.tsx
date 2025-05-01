import EnquiryPanel from "@/components/EnquiryPanel";
import Image from "next/image";
import React from "react";
import Footer from "@/components/Footer";
import { Testimonials } from "@/components/ui/accordion";
import { SpikePrimeCurriculum } from "../../../utils/curriculum";

const SpikePrime = () => {
  const enquiryPanelData = [
    {
      mode: "Online & Offline",

      duration: "16 CLASSES (x4 LEVELS) (1 HOUR PER CLASS)  ",
    },
  ];
  return (
    <div className="mx-auto max-w-7xl ">
      <div className="lg:mt-32 mt-4 px-4 text-center">
        <h1 className="my-4 text-3xl text-red-800 font-bold">Spike Prime </h1>
        <div className="flex  md:w-[500px]  my-5 mx-auto   rounded-3xl overflow-hidden border">
          <Image
            src="/assets/classroom-course/pneumatics.webp"
            alt="Course Curriculum webp"
            width={600}
            height={300}
            layout="intrinsic"
            className="object-contain"
          />
        </div>
        <EnquiryPanel data={enquiryPanelData} />
        <p className="my-4  lg:w-[80%] lg:mx-auto text-left text-sm">
          SPIKE Prime is a hands-on robotics learning kit designed to teach STEM
          (Science, Technology, Engineering, Math) concepts through building and
          coding projects. It offers motorized models, sensors, and a
          programmable hub and supports both block-based coding and Python
          programming. SPIKE Prime helps students develop problem-solving skills
          through real-world challenges.
        </p>
      </div>
      <div className="mx-4 md:mx-20">
        <h2 className="text-center lg:text-2xl text-xl font-bold uppercase text-red-800">
          Detailed Curriculum
        </h2>
      </div>
      <Testimonials testimonials={SpikePrimeCurriculum} />
      <Footer />
    </div>
  );
};

export default SpikePrime;
