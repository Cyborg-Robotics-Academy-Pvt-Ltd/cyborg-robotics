import EnquiryPanel from "@/components/EnquiryPanel";
import Image from "next/image";
import React from "react";
import Footer from "@/components/Footer";
import { Testimonials } from "@/components/ui/accordion";

const Page = () => {
  const testimonialData = [
    {
      id: "1",
      title: "Course Introduction",
      subtitle: [
        "Introduction to block-based coding.",
        "Learning how coding can make characters follow instructions.",
        "Understanding different concepts in a fun way.",
      ],
    },
    {
      id: "2",
      title: "Getting Started with Coding",
      subtitle: [
        "Engaging with characters like Anna and Elsa (from Frozen) to navigate simple puzzles.",
        "Learning to identify and create sequences of instructions (algorithms).",
      ],
    },
    {
      id: "3",
      title: "Sequence",
      subtitle: [
        "Understanding the importance of the order of commands.",
        "Activities involve arranging blocks to complete a character’s journey.",
      ],
    },
    {
      id: "4",
      title: "Loops",
      subtitle: [
        "Introduction to the concept of repeating actions.",
        "Simple activities that reinforce the idea of loops through fun challenges.",
      ],
    },
    {
      id: "5",
      title: "Events",
      subtitle: [
        "Learning how actions can be triggered by events (e.g., pressing a button).",
        "Activities involve creating interactive stories or games.",
      ],
    },
    {
      id: "6",
      title: "Debugging",
      subtitle: [
        "Introduction to finding and fixing errors in sequences.",
        "Simple puzzles where students identify and correct mistakes.",
      ],
    },
    {
      id: "7",
      title: "Project Creation",
      subtitle: [
        "Using learned concepts to create a simple interactive project.",
        "Encourages creativity and application of skills in a fun way.",
      ],
    },
  ];
  const enquiryPanelData = [
    {
      mode: "Online & Offline",
      age: "10-15 years",
      duration: "16 classes",
      size: "1 on 1 class",
    },
  ];
  return (
    <div className="mx-auto max-w-7xl ">
      <div className="mt-32 px-4 text-center">
        <h1 className="my-4 text-3xl text-red-800 font-bold uppercase">
          Bambino Coding
        </h1>
        <div className="flex  md:w-[500px]  my-5 mx-auto   rounded-3xl overflow-hidden border">
          <Image
            src="/assets/online-course/bambino.gif"
            alt="Course Curriculum GIF"
            width={600}
            height={300}
            layout="intrinsic"
            className="object-contain"
          />
        </div>
        <EnquiryPanel data={enquiryPanelData} />
        <p className="my-4 w-[90%] mx-auto text-left">
          All our courses are specially designed based on the age of the child.
          In this course, the child will be introduced to basic fundamentals of
          coding in a fun and interactive manner. Learning a new language
          teaches children another way to communicate. As with learning any
          language, children should be exposed to coding at an early age. Coding
          teaches logical thinking and strengthens both written and verbal
          skills. Children who learn to code better understand how to organize
          their thoughts.
        </p>
      </div>
      <div className="mx-4 md:mx-20">
        <h2 className="text-center text-2xl font-bold uppercase text-red-800">
          Detailed Curriculum
        </h2>
      </div>
      <Testimonials testimonials={testimonialData} />
      <Footer />
    </div>
  );
};

export default Page;
