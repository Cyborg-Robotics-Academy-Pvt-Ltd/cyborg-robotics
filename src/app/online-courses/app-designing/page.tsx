import EnquiryPanel from "@/components/EnquiryPanel";
import Image from "next/image";
import React from "react";
import Footer from "@/components/Footer";
import { Testimonials } from "@/components/ui/accordion";

const Page = () => {
  const appDevelopmentData = [
    {
      id: "1",
      title: "Level 1: Introduction to App Inventor",
      subtitle: [
        "Explore colors, sounds, and Text-to-Speech features.",
        "Learn drawing, input handling, and sensors.",
        "Build simple games using timers, physics, and animation.",
        "Work with UI design, data storage, and media integration.",
        "Complete a final project using all skills.",
      ],
    },
    {
      id: "2",
      title: "Level 2: Intermediate App Development",
      subtitle: [
        "Create games with collision detection, controls, and scoring.",
        "Explore app branding, GPS, and Bluetooth.",
        "Learn advanced layouts, media handling, and quizzes.",
        "Fetch data from APIs, use notifications, and build a final project.",
      ],
    },
    {
      id: "3",
      title: "Level 3: Advanced App Development",
      subtitle: [
        "Build apps with sound, GPS tracking, polls, and trivia games.",
        "Develop memory, social, and shooter games.",
        "Work on user accounts, data visualization, and responsive design.",
        "Complete a project using advanced game mechanics.",
      ],
    },
    {
      id: "4",
      title: "Level 4: Expert App Development",
      subtitle: [
        "Create racing, image generation, and attendance apps.",
        "Use weather APIs, monetize apps, and deploy them.",
        "Complete a capstone project and reflect on future opportunities.",
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
          App Designing{" "}
        </h1>
        <div className="flex  md:w-[500px]  my-5 mx-auto   rounded-3xl overflow-hidden border">
          <Image
            src="/assets/online-course/appdesigning.webp"
            alt="Course Curriculum webp"
            width={600}
            height={300}
            layout="intrinsic"
            className="object-contain"
          />
        </div>
        <EnquiryPanel data={enquiryPanelData} />
        <p className="my-4 w-[90%] mx-auto text-left">
          It consists of two main parts: Front-End (Designing) and Back-End
          (Programming/Coding). The Designing Part focuses on creating the user
          interface, learning layouts, media operations, drawing and animation,
          maps and navigation, sensor integration, social components, storage or
          database management, and web connectivity. The Programming Part
          involves control structures, logical operations, mathematical
          computations, text string manipulation, creating lists and
          dictionaries, defining variables, and writing functions or procedures.
          Together, these aspects ensure a seamless development process,
          combining design aesthetics with functional logic.
        </p>
      </div>
      <div className="mx-4 md:mx-20">
        <h2 className="text-center text-2xl font-bold uppercase text-red-800">
          Detailed Curriculum
        </h2>
      </div>
      <Testimonials testimonials={appDevelopmentData} />
      <Footer />
    </div>
  );
};

export default Page;
