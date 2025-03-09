import EnquiryPanel from "@/components/EnquiryPanel";
import Image from "next/image";
import React from "react";
import Footer from "@/components/Footer";
import { Testimonials } from "@/components/ui/accordion";
import { WebDesignCurriculum } from "../../../../utils/curriculum";

const Page = () => {
  const enquiryPanelData = [
    {
      mode: "Online & Offline",

      duration: "16 CLASSES(x4 LEVELS) (1 HOUR PER CLASS) ",
    },
  ];
  return (
    <div className="mx-auto max-w-7xl ">
      <div className="mt-32 px-4 text-center">
        <h1 className="my-4 text-3xl text-red-800 font-bold">WEB DESIGNING </h1>
        <div className="flex  md:w-[500px]  my-5 mx-auto   rounded-3xl overflow-hidden border">
          <Image
            src="/assets/online-course/html.webp"
            alt="Course Curriculum webp"
            width={600}
            height={300}
            layout="intrinsic"
            className="object-contain"
          />
        </div>
        <EnquiryPanel data={enquiryPanelData} />
        <p className="my-4 w-[80%] mx-auto text-left">
          HTML (Hypertext Markup Language) and CSS (Cascading Style Sheets) are
          two of the core technologies for building Web pages. HTML is the
          foundation of all web pages. It defines the structure of a page, while
          CSS defines its style. HTML and CSS are the beginning of everything
          you need to know to make your first web page!
        </p>
      </div>
      <div className="mx-4 md:mx-20">
        <h2 className="text-center text-2xl font-bold uppercase text-red-800">
          Detailed Curriculum
        </h2>
      </div>
      <Testimonials testimonials={WebDesignCurriculum} />
      <Footer />
    </div>
  );
};

export default Page;
