import EnquiryPanel from "@/components/EnquiryPanel";
import Image from "next/image";
import React from "react";
import Footer from "@/components/Footer";
import { Testimonials } from "@/components/ui/accordion";

const Page = () => {
  const testimonialData = [
    {
      id: "1",
      title: "Level 1: Introduction to Robotics & Engineering",
      subtitle: [
        "Building mechanical models with motors, gears, and sensors.",
        "Understanding structural design (beams, axles, gears).",
        "Problem-solving through challenges (e.g., obstacle courses, racing robots).",
      ],
    },
    {
      id: "2",
      title: "Level 2: Mathematical & Programming Concepts",
      subtitle: [
        "Ratios and proportions through gear ratios and motor speeds.",
        "Measurements (angles, distances, and rotations).",
        "Linear and circular motion with real-world applications.",
        "Introduction to block-based programming using variables, loops, and conditional statements.",
      ],
    },
    {
      id: "3",
      title: "Level 3: Robotics Programming & Control Mechanisms",
      subtitle: [
        "Controlling motor speed, position, and synchronization.",
        "Executing movement commands (forward, backward, turns, rotations).",
        "Programming light and sound using LED and speaker functions.",
        "Handling events like button press, tilt detection, and program start.",
      ],
    },
    {
      id: "4",
      title: "Level 4: Advanced IoT & Smart Automation",
      subtitle: [
        "Integrating sensors like color, distance, force, and gyro sensors.",
        "Using variables to store and modify data in programs.",
        "Creating custom functions with 'My Blocks' to optimize code reusability.",
        "Applying IoT concepts for remote monitoring and automation.",
      ],
    },
  ];

  const enquiryPanelData = [
    {
      mode: "Online & Offline",

      duration: "16 CLASSES (x4 LEVELS) (1 HOUR PER CLASS)  ",
    },
  ];
  return (
    <div className="mx-auto max-w-7xl ">
      <div className="mt-32 px-4 text-center">
        <h1 className="my-4 text-3xl text-red-800 font-bold">Spike Prime </h1>
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
          SPIKE Prime is a hands-on robotics learning kit designed to teach STEM
          (Science, Technology, Engineering, Math) concepts through building and
          coding projects. It offers motorized models, sensors, and a
          programmable hub and supports both block-based coding and Python
          programming. SPIKE Prime helps students develop problem-solving skills
          through real-world challenges.
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
