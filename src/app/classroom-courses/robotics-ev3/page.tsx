import EnquiryPanel from "@/components/EnquiryPanel";
import Image from "next/image";
import React from "react";
import Footer from "@/components/Footer";
import { Testimonials } from "@/components/ui/accordion";

const Page = () => {
  const courseData = [
    {
      id: "1",
      title: "Level 1: Introduction to Robotics and Components",
      subtitle: [
        "Introduction to the Robotic Kit and Components: Beams, Angular Beams, Axles, Gears, Bushes, Motors, Controller, and Sensors (Ultrasonic, Touch, Color, etc.).",
        "Learning Input-Output Devices and Port Mapping.",
        "Motor Control Techniques: Adjust speed, direction, and movement patterns.",
        "Motor Movements in Different Directions: Implement axis and pivot turns.",
        "Port View and Measurements: Monitor sensor values and motor states.",
      ],
    },
    {
      id: "2",
      title: "Level 2: Sensor Integration and Logical Programming",
      subtitle: [
        "Maze Solving Challenge: Develop problem-solving skills through pathfinding logic.",
        "Introduction to Ultrasonic Sensor: Use for obstacle detection and distance measurement.",
        "Comparison Operators and Conditional Logic.",
        "Programming with Loops and Sequences.",
        "Touch Sensor and Its Modes: Explore tactile input and interaction.",
        "Boolean Data Types in Robotics Programming.",
        "Color Sensor and Its Modes: Detect colors and implement conditional responses.",
      ],
    },
    {
      id: "3",
      title: "Level 3: Programming Blocks and Flow Control",
      subtitle: [
        "Action Blocks: Move Steering, Move Tank, Large Motor, Medium Motor, Display, Sound, and Light Blocks.",
        "Sensor Blocks: Touch Sensor, Ultrasonic Sensor, Color Sensor, Gyro Sensor, Timer Blocks.",
        "Flow Control Blocks: Start, Wait, Loop, Switch, and Loop Interrupt Blocks.",
        "Data Operations Blocks: Math, Compare, Logic, Variable, and Random Blocks.",
      ],
    },
    {
      id: "4",
      title: "Level 4: Advanced Programming and Customization",
      subtitle: [
        "My Blocks (Without and With Parameters): Creating reusable code modules.",
        "Using Variables Within My Blocks to Manage Inputs Dynamically.",
        "Advanced Blocks: Bluetooth, File Access, and Messaging Blocks.",
        "Final Project: Integrating Learned Concepts into a Functional Robot.",
      ],
    },
  ];

  const enquiryPanelData = [
    {
      mode: "Offline",

      duration: "16 CLASSES(x4 LEVELS) (1 HOUR PER CLASS) ",
    },
  ];
  return (
    <div className="mx-auto max-w-7xl ">
      <div className="mt-32 px-4 text-center">
        <h1 className="my-4 text-3xl text-red-800 font-bold uppercase">
          EV3 ROBOTICS
        </h1>
        <div className="flex md:w-[400px] md:h-[300px]  my-5 mx-auto   rounded-3xl overflow-hidden border">
          <Image
            src="/assets/classroom-course/ev3.webp"
            alt="Course Curriculum webp"
            width={600}
            height={300}
            layout="intrinsic"
            className="object-cover"
          />
        </div>
        <EnquiryPanel data={enquiryPanelData} />
        <p className="my-4 w-[80%] mx-auto text-left">
          This course combines mechanical design and programming using LEGO
          Hi-Tech robotic kits. Students build motorized, programmable robotic
          models and use various sensors. Each session involves assembly and
          coding a working robotic model, enhancing creativity and
          problemsolving skills. The programming software is designed to be
          user-friendly and age appropriate for children.
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
