import EnquiryPanel from "@/components/EnquiryPanel";
import Image from "next/image";
import React from "react";
import Footer from "@/components/Footer";
import { Testimonials } from "@/components/ui/accordion";

const Page = () => {
  const courseData = [
    {
      id: "1",
      title: "Level 1: Robotic Kit Components",
      subtitle: [
        "Beams & Angular Beams: Structural elements that provide support and framework for robotic models.",
        "Axles: Rods that support gears and transmit motion.",
        "Gears: Mechanical components that engage with driver and driven components to alter speed and torque.",
        "Motors & Battery Pack: Motors provide the power for mechanical movements, while the battery pack supplies the energy needed to operate them.",
        "Bushes: Support structures that enable smooth rotation of axles.",
        "Pulleys: Mechanical devices that change the direction of force, making it easier to lift loads or transfer motion.",
        "Cams: Mechanical components that convert rotary motion into linear motion, enabling controlled movement in robotic mechanisms.",
      ],
    },
    {
      id: "2",
      title: "Level 2: Mechanical Principles",
      subtitle: [
        "Horizontal & Vertical Gear Meshing: Transfer of motion across different planes.",
        "Driver and Driven Gears: Understanding input vs. output gear functions.",
        "Speed Control Using Gear Ratios: Effect of gear size on speed and torque.",
        "Circumference and Its Relation to Speed & Time: Impact of wheel size on travel speed.",
        "Linear and Circular Motion: Comparing different movement types and applications.",
      ],
    },
    {
      id: "3",
      title: "Level 3: Forces and Motion",
      subtitle: [
        "Friction: Understanding the concept of friction.",
        "Centripetal and Centrifugal Forces: Concepts related to circular motion.",
        "Area and Pressure: Distribution of force over a surface area.",
        "Energy Transfer Using Gear Chains: Efficient energy transfer through linked gears.",
      ],
    },
    {
      id: "4",
      title: "Level 4: Robotic Models and Applications",
      subtitle: [
        "Building Robotic Models Representing Real-Life Machines.",
        "Practical Applications of Robotics in Engineering and Automation.",
        "Final Project: Implementing Concepts into a Functional Robot.",
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
