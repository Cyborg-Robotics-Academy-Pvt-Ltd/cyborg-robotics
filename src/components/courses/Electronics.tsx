"use client";

import Image from "next/image";
import React from "react";
import Footer from "@/components/Footer";
import { Testimonials } from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Wrench, Lightbulb, Star, Brain, Zap } from "lucide-react";

const Electronics = () => {
  const ElectronicsCurriculum = [
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
        "Activities involve arranging blocks to complete a character's journey.",
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
      duration: "16 CLASSES (x3 LEVELS) (1 HOUR PER CLASS)",
    },
  ];

  const keyFeatures = [
    {
      title: "Hands-on Building",
      description: "Create working circuits using high-quality imported kits",
      icon: <Wrench className="text-red-700" size={24} />,
    },
    {
      title: "Electronic Concepts",
      description: "Learn voltage, current, and resistance principles",
      icon: <Lightbulb className="text-red-700" size={24} />,
    },
    {
      title: "Problem Solving",
      description: "Develop logical thinking with puzzle-based challenges",
      icon: <Brain className="text-red-700" size={24} />,
    },
    {
      title: "Circuit Design",
      description: "Master both series and parallel circuit configurations",
      icon: <Zap className="text-red-700" size={24} />,
    },
  ];

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: custom * 0.1 },
    }),
  };
  const handleDownloadSyllabus = () => {
    const link = document.createElement("a");
    link.href = "/assets/pdf/ELECTRONICS.pdf"; // Update this path to your actual syllabus file
    link.download = "ELECTRONICS.pdf"; // This will be the name of the downloaded file
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="mx-auto max-w-7xl md:mt-32">
      {/* Hero Section */}
      <div className="lg:mt-16 mt-4 px-4">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          <motion.div
            className="md:w-1/2"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="mb-4 px-3 py-1 bg-red-100 text-red-800 hover:bg-red-200">
              Hands-on Learning
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-bold text-red-800 mb-4">
              Electronics
            </h1>
            <p className="text-lg text-gray-700 mb-6">
              Introducing young minds to the fascinating world of electronics
              through interactive exploration
            </p>
            <div className="flex flex-wrap gap-3 mb-6">
              {enquiryPanelData.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className="px-3 py-1 border-red-300 text-red-800"
                  >
                    {item.mode}
                  </Badge>
                  <Badge
                    variant="outline"
                    className="px-3 py-1 border-red-300 text-red-800"
                  >
                    {item.duration}
                  </Badge>
                </div>
              ))}
            </div>
            <button className="bg-red-800 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 shadow-md">
              Enroll Now
            </button>
          </motion.div>

          <motion.div
            className="lg:w-1/2"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="rounded-2xl overflow-hidden border-2 border-red-100 shadow-xl">
              <Image
                src="/assets/classroom-course/electronics.webp"
                alt="Electronics Course"
                width={200}
                height={150}
                layout="responsive"
                unoptimized
                className="object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Course Overview */}
      <motion.div
        className="mt-16 mx-4 lg:mx-8 p-6 bg-gray-50 rounded-2xl shadow-sm"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Course Overview
        </h2>
        <p className="text-gray-700 lg:text-lg">
          Study of flow and control of electrons, their behavior and effects.
          Let your child learn the basic of electronics which includes
          introduction of various electronic components and symbols. What is
          voltage, Current, Resistance, Open and Short circuit, series and
          parallel circuit. Puzzle solving using Logic Gates, etc. Experiments
          and concepts conducted on specifically designed imported kits which
          will help students to make amazing electronics projects.
        </p>
      </motion.div>

      {/* Key Features */}
      <motion.div
        className="mt-16 mx-4 lg:mx-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
          What They&apos;ll Learn
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {keyFeatures.map((feature, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={fadeInUpVariants}
              initial="hidden"
              animate="visible"
            >
              <Card className="border border-red-100 hover:shadow-md transition-shadow h-full">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {feature.icon}
                    <h3 className="text-xl font-bold text-gray-800 ml-3">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-gray-700">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Learning Path */}
      <motion.div
        className="mt-16 mx-4 lg:mx-8 p-6 bg-blue-50 rounded-2xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Learning Journey
        </h2>
        <div className="relative">
          {/* Path line */}
          <div className="absolute left-4 top-6 bottom-6 w-1 bg-red-200 hidden md:block"></div>

          <div className="space-y-8 relative">
            <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-start">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-800 text-white flex items-center justify-center font-bold z-10">
                1
              </div>
              <div className="flex-grow bg-white p-5 rounded-xl shadow-sm md:ml-4">
                <h3 className="font-bold text-lg text-red-800 mb-2">
                  Understanding Basic Components
                </h3>
                <p className="text-gray-700">
                  Learn about resistors, capacitors, LEDs and other fundamental
                  electronic components.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-start">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-800 text-white flex items-center justify-center font-bold z-10">
                2
              </div>
              <div className="flex-grow bg-white p-5 rounded-xl shadow-sm md:ml-4">
                <h3 className="font-bold text-lg text-red-800 mb-2">
                  Building Simple Circuits
                </h3>
                <p className="text-gray-700">
                  Construct working circuits to understand voltage, current, and
                  resistance concepts.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-start">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-800 text-white flex items-center justify-center font-bold z-10">
                3
              </div>
              <div className="flex-grow bg-white p-5 rounded-xl shadow-sm md:ml-4">
                <h3 className="font-bold text-lg text-red-800 mb-2">
                  Advanced Circuit Configurations
                </h3>
                <p className="text-gray-700">
                  Learn series and parallel circuits and how to measure
                  electrical properties.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-start">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-800 text-white flex items-center justify-center font-bold z-10">
                4
              </div>
              <div className="flex-grow bg-white p-5 rounded-xl shadow-sm md:ml-4">
                <h3 className="font-bold text-lg text-red-800 mb-2">
                  Logic Gates and Problem-Solving
                </h3>
                <p className="text-gray-700">
                  Apply knowledge to solve electronic puzzles and design
                  functional electronic projects.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Benefits for Children */}
      <motion.div
        className="mt-16 mx-4 lg:mx-8 p-6 bg-green-50 rounded-2xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Benefits for Your Child
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-5 rounded-xl shadow-sm">
            <div className="flex items-center mb-3">
              <Star className="text-yellow-500" size={20} />
              <h3 className="font-semibold text-gray-800 ml-2">
                Practical Electronics Skills
              </h3>
            </div>
            <p className="text-gray-700 text-sm">
              Develops foundational understanding of electronics that applies to
              countless real-world technologies
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl shadow-sm">
            <div className="flex items-center mb-3">
              <Star className="text-yellow-500" size={20} />
              <h3 className="font-semibold text-gray-800 ml-2">
                Logical Thinking
              </h3>
            </div>
            <p className="text-gray-700 text-sm">
              Enhances problem-solving abilities through circuit building
              challenges
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl shadow-sm">
            <div className="flex items-center mb-3">
              <Star className="text-yellow-500" size={20} />
              <h3 className="font-semibold text-gray-800 ml-2">
                Technical Vocabulary
              </h3>
            </div>
            <p className="text-gray-700 text-sm">
              Builds familiarity with technical terms and concepts used in
              modern technology
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl shadow-sm">
            <div className="flex items-center mb-3">
              <Star className="text-yellow-500" size={20} />
              <h3 className="font-semibold text-gray-800 ml-2">
                Applied Mathematics
              </h3>
            </div>
            <p className="text-gray-700 text-sm">
              Reinforces mathematical concepts through practical applications in
              circuit design
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl shadow-sm">
            <div className="flex items-center mb-3">
              <Star className="text-yellow-500" size={20} />
              <h3 className="font-semibold text-gray-800 ml-2">
                Experimental Skills
              </h3>
            </div>
            <p className="text-gray-700 text-sm">
              Develops methodical approach to testing and troubleshooting
              electronic systems
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl shadow-sm">
            <div className="flex items-center mb-3">
              <Star className="text-yellow-500" size={20} />
              <h3 className="font-semibold text-gray-800 ml-2">
                STEM Foundation
              </h3>
            </div>
            <p className="text-gray-700 text-sm">
              Creates early interest in science, technology, engineering and
              mathematics careers
            </p>
          </div>
        </div>
      </motion.div>

      {/* Curriculum Section */}
      <div className="mt-16 mx-4 lg:mx-8">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Badge className="mb-2 px-3 py-1 bg-red-100 text-red-800 hover:bg-red-200">
            Comprehensive Learning
          </Badge>
          <h2 className="text-3xl font-bold text-gray-800">
            Detailed Curriculum
          </h2>
          <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
            Our structured curriculum introduces electronic principles through
            engaging, hands-on activities
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100"
        >
          <Testimonials testimonials={ElectronicsCurriculum} />
        </motion.div>
      </div>

      {/* CTA Section */}
      <motion.div
        className="mt-16 mx-4 lg:mx-8 p-8 bg-red-50 rounded-2xl text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
      >
        <h2 className="text-2xl lg:text-3xl font-bold text-red-800 mb-4">
          Start Your Child&apos;s Electronics Journey Today!
        </h2>
        <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
          Give your child the advantage of early electronics education with our
          fun, interactive, and hands-on Electronics course.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-red-800 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 shadow-md">
            Enroll Now
          </button>
          <button
            onClick={handleDownloadSyllabus}
            className="bg-white hover:bg-gray-100 text-red-800 font-semibold py-3 px-6 rounded-lg border border-red-300 transition duration-300 shadow-sm"
          >
            Download Syllabus
          </button>
        </div>
      </motion.div>

      <div className="mt-16">
        <Footer />
      </div>
    </div>
  );
};

export default Electronics;
