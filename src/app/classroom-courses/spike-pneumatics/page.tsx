import EnquiryPanel from "@/components/EnquiryPanel";
import Image from "next/image";
import React from "react";
import Footer from "@/components/Footer";
import { Testimonials } from "@/components/ui/accordion";
import { SpikePneumatics } from "../../../../utils/curriculum";

const Page = () => {
  const enquiryPanelData = [
    {
      mode: "Offline",

      duration: "16 CLASSES (1 HOUR PER CLASS) ",
    },
  ];
  return (
    <div className="mx-auto max-w-7xl ">
      <div className="mt-32 px-4 text-center">
        <h1 className="my-4 text-3xl text-red-800 font-bold uppercase">
          Spike Essential + Pneumatics
        </h1>
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
        <p className="my-4 w-[80%] mx-auto text-left">
          It is a hardware and software platform, which consist of construction
          of model understanding its function and introduction to programming.
          Also consist of the models functioning on the principal of pneumatics.
          Students follow the building process step by step using the LEGO
          instructions. In this they learn about the mechanical designing using
          various mechanical parts which is used in real life industries like
          pulley, cam, axle etc. The fun and learning is enhanced when the
          programming of the models is introduced. Students quickly learn the
          simple click-and-drag icons to activate a motor, which might also be
          dependent on a sensor, in a logical and sequential schema. Spike
          Essential programming platform also allows for mathematical operations
          and display effects, counter and many more as the level gets more
          advance. In pneumatics students learn how to make machines work
          mechanically with renewable source of energy using pump, piston,
          cylinder, airtank, monometer ,valve etc.
        </p>
      </div>
      <div className="mx-4 md:mx-20">
        <h2 className="text-center text-2xl font-bold uppercase text-red-800">
          Detailed Curriculum
        </h2>
      </div>
      <Testimonials testimonials={SpikePneumatics} />
      <Footer />
    </div>
  );
};

export default Page;
