import EnquiryPanel from "@/components/EnquiryPanel";
import Image from "next/image";
import React from "react";
import Footer from "@/components/Footer";
import { Testimonials } from "@/components/ui/accordion";
import { SimplePoweredMachines } from "../../../../utils/curriculum";

const Page = () => {
  const enquiryPanelData = [
    {
      mode: "Offline",

      duration: "12 CLASSES (1 HOUR PER CLASS) ",
    },
  ];
  return (
    <div className="mx-auto max-w-7xl ">
      <div className="lg:mt-32 mt-4 px-4 text-center">
        <h1 className="my-4 text-3xl text-red-800 font-bold uppercase">
          Simple & Powered Machines
        </h1>
        <div className="flex  md:w-[400px] md:h-[300px]  my-5 mx-auto   rounded-3xl overflow-hidden border">
          <Image
            src="/assets/classroom-course/simple-powered-machines.webp"
            alt="Course Curriculum webp"
            width={600}
            height={300}
            layout="intrinsic"
            className="object-contain"
          />
        </div>
        <EnquiryPanel data={enquiryPanelData} />
        <p className="my-4 w-[80%] mx-auto text-left">
          This is powered mechanical and hands on learning solutions with
          various experiments that line text book and concepts to real world
          experiences. Each session consists of building new motorised and
          non-motorised working models and understanding its relation to real
          life application and also learning the STEM concepts of that
          particular model. Imported robotic kits and motors will be used by
          children for building which will be of high-quality plastic
          respectively, designed by Lego.
        </p>
      </div>
      <div className="mx-4 md:mx-20">
        <h2 className="text-center lg:text-2xl text-xl font-bold uppercase text-red-800">
          Detailed Curriculum
        </h2>
      </div>
      <Testimonials testimonials={SimplePoweredMachines} />
      <Footer />
    </div>
  );
};

export default Page;
