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
      teacher: "Certified Trainer",
      duration: "12 Classes (1 Hour Per Class)",
      mode: "Offline",
    },
    {
      id: "5",
      title: "LEGO Spike Essential and Pneumatics",
      subtitle: [
        "Spike Essential teaches basic robotics and coding through hands-on activities.",
        "Motors, Wheels, Axles, Pulleys, and Beams: Used to build simple robotic models.",
        "2 Ports: Connect motors and sensors for interactive functionality.",
        "Color Sensor: Detects colors and light intensity, triggering specific actions.",
        "Light Matrix: A 3x3 LED display on the hub, providing visual feedback with patterns or messages.",
        "LEGO Pneumatics focuses on fluid mechanics and pressure-based systems.",
        "Air Pumps and Cylinders: Demonstrate how compressed air is used to create motion.",
        "Valves and Tubes: Control the flow of air and regulate movement in mechanical models.",
        "Pressure Gauges: Teach students to measure and control air pressure for stability.",
      ],
    },
    {
      id: "6",
      title: "Mechanical Parts and Programming Blocks",
      subtitle: [
        "Motors: Provide power to move wheels or drive other mechanical components.",
        "Pulleys: Used to transfer force across a distance via belts, providing mechanical advantage.",
        "Wheels and Axles: Wheels help the robot move smoothly, while axles transmit rotation.",
        "Gears: Transfer rotational motion and adjust speed or torque using gear ratios.",
        "Beams and Connectors: Provide structural support, creating a sturdy frame for robotic models.",
        "Programming Blocks:",
        "Motor Blocks: Start Motor, Stop Motor, Set Speed, Move for Rotations/Seconds.",
        "Light Blocks: Set Light Color, Blink Light.",
        "Sound Blocks: Play Sound, Play Note.",
        "Event Blocks: When Program Starts, When Button Pressed, When Tilted.",
        "Control Blocks: Wait For, Repeat Loop, Forever Loop, If-Else.",
        "Sensor Blocks: Color Sensor, Hub Tilt Sensor.",
      ],
    },
  ];

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
      <Testimonials testimonials={courseData} />
      <Footer />
    </div>
  );
};

export default Page;
