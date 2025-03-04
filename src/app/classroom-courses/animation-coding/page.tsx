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
      mode: "online",
      age: "10-15 years",
      duration: "15 classes",
      size: "1 on 1 class",
    },
  ];
  return (
    <div className="mx-auto max-w-7xl ">
      <div className="mt-32 px-4 text-center">
        <h1 className="my-4 text-3xl text-red-800 font-bold uppercase">
          Animation Coding
        </h1>
        <div className="flex md:w-[400px] my-5 mx-auto rounded-3xl overflow-hidden border">
          <Image
            src="/assets/online-course/animation-coding.webp"
            alt="Course Curriculum webp"
            width={600}
            height={400}
            layout="intrinsic"
            className="object-cover rounded-xl"
          />
        </div>
        <EnquiryPanel data={enquiryPanelData} />
        <p className="my-4 w-[90%] mx-auto text-left">
          A block based visual programming language designed for animation that
          focus more on problem solving than on specific syntax. Learn to
          program your own interactive stories, games, and animations — and
          share your creations with others in the online community. Scratch
          helps young people learn to think creatively, reason systematically,
          and work collaboratively. The ability to code computer programs is an
          important part of literacy in today’s society. When kids learn to
          code, they learn important strategies for solving problems, designing
          projects, and communicating ideas.
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
