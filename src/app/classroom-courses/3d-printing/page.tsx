"use client";
import EnquiryPanel from "@/components/EnquiryPanel";
import Image from "next/image";
import React from "react";
import Footer from "@/components/Footer";
import { Testimonials } from "@/components/ui/accordion";
import { motion } from "framer-motion";
const Page = () => {
  const testimonialData = [
    {
      id: "1",
      title: "Introduction to 3D Printing",
      subtitle: [
        "What is 3D printing? (Basic explanation)",
        "How does a 3D printer work? (Parts and process)",
        "Different types of 3D printers",
        "Basic safety rules while using 3D printers",
      ],
    },
    {
      id: "2",
      title: "Understanding 3D Design",
      subtitle: [
        "Introduction to 3D shapes and models",
        "Simple 3D design concepts (e.g., cubes, spheres)",
        "Hands-on: Building simple objects using modeling clay or craft materials",
      ],
    },
    {
      id: "3",
      title: "Introduction to 3D Design Software",
      subtitle: [
        "Navigating 3D design software (Tinkercad, etc.)",
        "Understanding the workspace (grid, axes)",
        "Basic tools (move, rotate, scale)",
      ],
    },
    {
      id: "4",
      title: "Creating Simple 3D Models",
      subtitle: [
        "Hands-on: Creating basic objects (e.g., keychain, toy block)",
        "Adding shapes together to form complex models",
        "Saving and exporting designs for 3D printing",
      ],
    },
    {
      id: "5",
      title: "Preparing Models for 3D Printing",
      subtitle: [
        "Introduction to file formats (STL, OBJ)",
        "Slicing software overview (What it does and why it’s important)",
        "Setting up a model for printing (layer height, infill, supports)",
      ],
    },
    {
      id: "6",
      title: "Printing Your First Model",
      subtitle: [
        "Loading the filament",
        "Starting the print",
        "Monitoring the printing process",
      ],
    },
    {
      id: "7",
      title: "Post-Printing Process",
      subtitle: [
        "Removing the object from the print bed",
        "Cleaning and polishing the 3D-printed object",
        "Hands-on: Decorating or painting the printed object",
      ],
    },
    {
      id: "8",
      title: "Fun 3D Printing Projects",
      subtitle: [
        "Designing and printing simple toys (e.g., a car, animal figurines)",
        "Creating personalized keychains or name tags",
        "Group project: Building a mini 3D printed city or maze",
      ],
    },
    {
      id: "9",
      title: "Real-World Applications of 3D Printing",
      subtitle: [
        "Exploring different industries that use 3D printing (e.g., medicine, automotive, fashion)",
        "Fun examples: 3D-printed houses, food, and toys",
        "How 3D printing can help solve everyday problems",
      ],
    },
    {
      id: "10",
      title: "Wrap-up and Final Project",
      subtitle: [
        "Review of what was learned",
        "Final project: Design and print a custom object",
        "Show-and-tell of completed 3D prints",
      ],
    },
  ];

  const enquiryPanelData = [
    {
      mode: "offline",

      duration: "12 CLASSES (1 HOUR PER CLASS) ",
    },
  ];

  return (
    <div className="mx-auto max-w-7xl ">
      <div className="mt-32 px-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="my-4 text-3xl text-red-800 font-bold uppercase"
        >
          3D Printing
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex md:w-[500px] h-[350px] my-5 mx-auto rounded-3xl overflow-hidden border"
        >
          <Image
            src="/assets/classroom-course/printing3d.webp"
            alt="Course Curriculum webp"
            width={600}
            height={500}
            layout="intrinsic"
            className="object-cover rounded-xl"
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
          It is a process of making 3-dimensional solid object from a digital
          file 3D is shorthand for threedimensional. When you print a page on a
          printer, there are only two dimensions: the front of the page and the
          back of the page. Three-dimensional printing adds a third dimension,
          volume. 3D printing uses a printer to create three-dimensional
          objects, for example, a cup or doll or phone case and replaces the wax
          models. This technology is currently used in many fields such as
          health, construction, food, engineering, aerospace, etc.
        </motion.p>
      </div>
      <div className="mx-4 md:mx-20">
        <motion.h2
          className="text-center text-2xl font-bold uppercase text-red-800"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Detailed Curriculum
        </motion.h2>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Testimonials testimonials={testimonialData} />
      </motion.div>
      <Footer />
    </div>
  );
};

export default Page;
