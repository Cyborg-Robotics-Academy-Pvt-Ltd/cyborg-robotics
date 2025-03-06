import EnquiryPanel from "@/components/EnquiryPanel";
import Image from "next/image";
import React from "react";
import Footer from "@/components/Footer";
import { Testimonials } from "@/components/ui/accordion";

const Page = () => {
  const courseData = [
    {
      id: "1",
      title: "Level 1: Introduction to Robotics",
      subtitle: [
        "Introduction to the Robotic Kit and Components: Beams, Axles, Gears, Bushes, etc.",
        "Gear Meshing: Understanding how gears interact and function.",
        "Surface Area: Concepts and calculations related to robotic structures.",
        "Distance, Force, and Pressure: Exploring fundamental physics principles.",
      ],
    },
    {
      id: "2",
      title: "Level 2: Mechanics and Motion",
      subtitle: [
        "Motion Concepts: Understanding movement and its applications.",
        "Pulley Concepts: Mechanics of pulleys in robotics.",
        "Direction Concepts: Clockwise and anti-clockwise motion.",
        "Energy Transfer and Flow: How energy moves through robotic systems.",
      ],
    },
    {
      id: "3",
      title: "Level 3: Practical Applications",
      subtitle: [
        "Practical Experiments and Observations: Hands-on learning with real-world applications.",
        "Robotic Models in Real Life Applications: Understanding their impact and usage.",
        "Introduction and Identification of Mechanical Components.",
        "Self-Assembly of the Robotic Model Under Supervision of Certified Trainer.",
      ],
    },
    {
      id: "4",
      title: "Level 4: Advanced Robotics and STEM Concepts",
      subtitle: [
        "Description of STEM Concepts.",
        "Practical Experiments, Observations, and Challenges.",
      ],
    },
  ];

  const enquiryPanelData = [
    {
      mode: "Offline",

      duration: "12 classes",
    },
  ];
  return (
    <div className="mx-auto max-w-7xl ">
      <div className="mt-32 px-4 text-center">
        <h1 className="my-4 text-3xl text-red-800 font-bold uppercase">
          EARLY SIMPLE MACHINES
        </h1>
        <div className="flex md:w-[400px] md:h-[300px]  my-5 mx-auto   rounded-3xl overflow-hidden border">
          <Image
            src="/assets/classroom-course/earlysimple.webp"
            alt="Course Curriculum webp"
            width={600}
            height={300}
            layout="intrinsic"
            className="object-contain"
          />
        </div>
        <EnquiryPanel data={enquiryPanelData} />
        <p className="my-4 w-[80%] mx-auto text-left">
          Designed to help young students begin to understand basic real world
          science concepts and the world around them. Each session consists of
          building new non-motorised, working models and understanding its
          relation to real life application and also learning basic science and
          math concepts of that particular model. Imported robotic kit will be
          used by children for building which will be of high-quality plastic
          respectively, designed by Lego.
        </p>
      </div>
      <div className="mx-4 md:mx-20">
        <h2 className="text-center text-2xl font-bold uppercase text-red-800">
          Detailed Curriculum
        </h2>
      </div>
      <Testimonials testimonials={courseData} />
      <Footer />
    </div>
  );
};

export default Page;
