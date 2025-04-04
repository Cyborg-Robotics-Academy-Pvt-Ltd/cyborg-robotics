import EnquiryPanel from "@/components/EnquiryPanel";
import Image from "next/image";
import React from "react";
import Footer from "@/components/Footer";
import { Testimonials } from "@/components/ui/accordion";
import { RoboticsCurriculum } from "../../../../utils/curriculum";

const Page = () => {
  const enquiryPanelData = [
    {
      mode: "Offline",

      duration: "16 CLASSES(x4 LEVELS) (1 HOUR PER CLASS) ",
    },
  ];
  return (
    <div className="mx-auto max-w-7xl ">
      <div className="lg:mt-32 mt-4 px-4 text-center">
        <h1 className="my-4 text-3xl text-red-800 font-bold uppercase">
          EV3 ROBOTICS
        </h1>
        <div className="flex md:w-[400px] md:h-[300px]  my-5 mx-auto   rounded-3xl overflow-hidden border">
          <Image
            src="/assets/classroom-course/ev3.webp"
            alt="Course Curriculum webp"
            width={600}
            height={300}
            layout="intrinsic"
            className="object-cover"
          />
        </div>
        <EnquiryPanel data={enquiryPanelData} />
        <p className="my-4  lg:w-[80%] lg:mx-auto text-left text-sm">
          This course combines mechanical design and programming using LEGO
          Hi-Tech robotic kits. Students build motorized, programmable robotic
          models and use various sensors. Each session involves assembly and
          coding a working robotic model, enhancing creativity and
          problemsolving skills. The programming software is designed to be
          user-friendly and age appropriate for children.
        </p>
      </div>
      <div className="mx-4 md:mx-20">
        <h2 className="text-center lg:text-2xl text-xl font-bold uppercase text-red-800">
          Detailed Curriculum
        </h2>
      </div>
      <Testimonials testimonials={RoboticsCurriculum} />
      <Footer />
    </div>
  );
};

export default Page;
