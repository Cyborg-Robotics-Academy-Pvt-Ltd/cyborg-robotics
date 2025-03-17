import EnquiryPanel from "@/components/EnquiryPanel";
import Image from "next/image";
import React from "react";
import Footer from "@/components/Footer";
import { Testimonials } from "@/components/ui/accordion";
import { pythonCourseData } from "../../../../utils/curriculum";

const Page = () => {
  const enquiryPanelData = [
    {
      mode: "Online & Offline",

      duration: "16 CLASSES(x6 LEVELS) (1 HOUR PER CLASS) ",
    },
  ];
  return (
    <div className="mx-auto max-w-7xl ">
      <div className="lg:mt-32 mt-4 px-4 text-center">
        <h1 className="my-4 text-3xl text-red-800 font-bold uppercase">
          Python Programming{" "}
        </h1>
        <div className="flex  md:w-[300px]  my-5 mx-auto   rounded-3xl overflow-hidden border">
          <Image
            src="/assets/online-course/python.webp"
            alt="Course Curriculum webp"
            width={300}
            height={200}
            layout="intrinsic"
            className="object-contain"
          />
        </div>
        <EnquiryPanel data={enquiryPanelData} />
        <p className="my-4 w-[80%] mx-auto text-left">
          Python is a programming language that lets you work quickly and
          integrate systems more effectively. It is a general purpose and a
          high-level programming language, allow you to focus on core
          functionality of the application by taking care of common programming
          tasks. You can use Python for developing desktop GUI applications,
          websites and web applications
        </p>
      </div>
      <div className="mx-4 md:mx-20">
        <h2 className="text-center lg:text-2xl text-xl font-bold uppercase text-red-800">
          Detailed Curriculum
        </h2>
      </div>
      <Testimonials testimonials={pythonCourseData} />
      <Footer />
    </div>
  );
};

export default Page;
