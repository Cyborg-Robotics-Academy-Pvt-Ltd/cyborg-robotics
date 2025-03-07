"use client";
import EnquiryPanel from "@/components/EnquiryPanel";
import Image from "next/image";
import React from "react";
import Footer from "@/components/Footer";
import { Testimonials } from "@/components/ui/accordion";
import { motion } from "framer-motion";
const Page = () => {
  const curriculumData = [
    {
      id: "1",
      title: "Level 1: Introduction to Basics (16 Classes)",
      subtitle: [
        "Color Manipulation: Learn to work with colors and apply them dynamically.",
        "Sound Integration: Explore how to incorporate sound and music into your projects.",
        "Visibility Management: Understand how to show and hide different elements in your app.",
        "User Interaction: Develop skills to respond to user clicks and inputs.",
        "Score Management: Create a basic score system to track points in your app.",
        "Shapes and Nesting: Experiment with drawing shapes and nesting elements within each other.",
        "Movement Control with Variables: Use variables to control movement and animations.",
        "Design Patterns: Create intricate designs using loops and variable manipulation.",
        "Lists and Geometry: Manage multiple elements using lists and geometric concepts.",
        "Skill Assessment: Reflect on and evaluate the skills learned throughout the level.",
      ],
    },
    {
      id: "2",
      title: "Level 2: Intermediate Concepts (16 Classes)",
      subtitle: [
        "Dynamic Sliders: Utilize sliders to enable real-time adjustments and color changes.",
        "Drawing with Sliders: Combine user input from sliders to create sketches.",
        "Randomization: Implement random number generation for interactive experiences.",
        "Debugging Techniques: Learn to identify and fix bugs in your code.",
        "Data Collection: Record and display user input data effectively.",
        "Game Development Basics: Understand fundamental principles of creating interactive games.",
        "Advanced Game Mechanics: Explore more complex game logic and user interactions.",
        "Interactive Reading Apps: Develop applications that allow users to engage with content.",
        "Advanced Graphics with Canvas: Use canvas for sophisticated graphic designs.",
        "Shape Creation: Draw simple shapes using canvas functionality.",
        "Geometric Concepts: Combine shapes to understand their relationships.",
      ],
    },
    {
      id: "3",
      title: "Level 3: Advanced Development (16 Classes)",
      subtitle: [
        "Pattern Creation: Use loops to create repeating patterns and designs.",
        "Complex Shape Drawing: Learn to draw intricate shapes like stars and polygons.",
        "Nested Loops: Utilize nested loops for advanced shape creation and control.",
        "Drawing Applications: Build applications that allow users to create drawings.",
        "Health Mechanics in Games: Implement health systems in interactive games.",
        "Game Logic Implementation: Develop the logic behind user choices in games.",
        "Logic and Strategy Games: Design games that challenge users' logic and strategy skills.",
        "Keyboard Interactions: Incorporate keyboard events for character movement.",
        "Mobile Interaction: Learn to handle mobile device inputs for app control.",
        "Action Game Development: Create fast-paced, action-oriented games.",
        "Interactive Gameplay: Design engaging games with complex interaction mechanics.",
        "User Engagement: Explore concepts to keep users actively engaged in gameplay.",
      ],
    },
    {
      id: "4",
      title: "Level 4: Practical Application Development (16 Classes)",
      subtitle: [
        "Obstacle Challenges: Create games that involve navigating through obstacles.",
        "Event-Specific Projects: Develop applications tailored for specific events or celebrations.",
        "User Input Applications: Build functional applications that generate outputs based on user inputs.",
      ],
    },
  ];

  const enquiryPanelData = [
    {
      mode: "Online & Offline",

      duration: "16 CLASSES(x4 LEVELS) (1 HOUR PER CLASS) ",
    },
  ];
  return (
    <div className="mx-auto max-w-7xl ">
      <div className="mt-32 px-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="my-4 text-3xl text-red-800 font-bold"
        >
          App Lab{" "}
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex  md:w-[500px]  my-5 mx-auto   rounded-3xl overflow-hidden border"
        >
          <Image
            src="/assets/classroom-course/applab.png"
            alt="Course Curriculum webp"
            width={600}
            height={300}
            layout="intrinsic"
            className="object-contain"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <EnquiryPanel data={enquiryPanelData} />
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="my-4 w-[80%] mx-auto text-left"
        >
          App Lab allows users to build simple applications using a blend of
          block-based and text-based JavaScript coding. It focuses on
          event-driven programming, meaning students can design apps that
          respond to user inputs like button clicks or key presses. App Lab is
          often used in courses like CS Discoveries to teach fundamental
          programming concepts and web-based application development. It
          supports the creation of mobile apps and interactive tools with an
          easy-to-use interface.
        </motion.p>
      </div>
      <motion.h2
        className="text-center text-2xl font-bold uppercase text-red-800"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Detailed Curriculum
      </motion.h2>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Testimonials testimonials={curriculumData} />
      </motion.div>
      <Footer />
    </div>
  );
};

export default Page;
