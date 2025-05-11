"use client";

import Image from "next/image";
import React from "react";
import Footer from "@/components/Footer";
import { Testimonials } from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { SpikePrimeCurriculum } from "../../../utils/curriculum";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Code, Bot, Brain, Rocket, Star } from "lucide-react";

const SpikePrime = () => {
  const enquiryPanelData = [
    {
      mode: "Online & Offline",
      duration: "16 CLASSES (x4 LEVELS) (1 HOUR PER CLASS)",
    },
  ];

  const keyFeatures = [
    {
      title: "Robotics Engineering",
      description:
        "Build and program advanced robotics systems with motors and sensors",
      icon: <Bot className="text-red-700" size={24} />,
    },
    {
      title: "Block & Python Coding",
      description:
        "Learn both visual block-based and text-based Python programming",
      icon: <Code className="text-red-700" size={24} />,
    },
    {
      title: "STEM Concepts",
      description:
        "Apply science, technology, engineering and math in practical projects",
      icon: <Brain className="text-red-700" size={24} />,
    },
    {
      title: "Problem-Solving Skills",
      description:
        "Tackle real-world challenges through creative engineering solutions",
      icon: <Rocket className="text-red-700" size={24} />,
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
    link.href = "/assets/pdf/Spike Prime.pdf"; // Update this path to your actual syllabus file
    link.download = "Spike Prime.pdf"; // This will be the name of the downloaded file
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
              Advanced Robotics Course
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-bold text-red-800 mb-4">
              SPIKE Prime
            </h1>
            <p className="text-lg text-gray-700 mb-6">
              A comprehensive robotics learning experience that combines
              building, coding, and real-world problem solving
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
                src="/assets/classroom-course/pneumatics.webp"
                alt="SPIKE Prime Course"
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
          SPIKE Prime is a comprehensive hands-on robotics learning kit designed
          to teach STEM (Science, Technology, Engineering, Math) concepts
          through engaging building and coding projects. This advanced course
          offers students the opportunity to work with motorized models, various
          sensors, and a programmable hub that brings their creations to life.
          Students will learn both block-based coding and Python programming,
          allowing them to develop increasingly sophisticated solutions as they
          progress. Through a series of real-world challenges and creative
          problem-solving exercises, SPIKE Prime helps students develop critical
          thinking skills while reinforcing fundamental STEM concepts in an
          interactive and exciting way.
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
                  Robot Construction
                </h3>
                <p className="text-gray-700">
                  Learn to build various robotic models using LEGO&apos;s SPIKE
                  Prime components and understand their mechanical principles.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-start">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-800 text-white flex items-center justify-center font-bold z-10">
                2
              </div>
              <div className="flex-grow bg-white p-5 rounded-xl shadow-sm md:ml-4">
                <h3 className="font-bold text-lg text-red-800 mb-2">
                  Block-Based Programming
                </h3>
                <p className="text-gray-700">
                  Master visual programming to control motors, sensors, and
                  create sophisticated behavioral sequences.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-start">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-800 text-white flex items-center justify-center font-bold z-10">
                3
              </div>
              <div className="flex-grow bg-white p-5 rounded-xl shadow-sm md:ml-4">
                <h3 className="font-bold text-lg text-red-800 mb-2">
                  Python Programming
                </h3>
                <p className="text-gray-700">
                  Progress to text-based coding with Python to develop more
                  advanced control systems and algorithms.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-start">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-800 text-white flex items-center justify-center font-bold z-10">
                4
              </div>
              <div className="flex-grow bg-white p-5 rounded-xl shadow-sm md:ml-4">
                <h3 className="font-bold text-lg text-red-800 mb-2">
                  Real-World Challenges
                </h3>
                <p className="text-gray-700">
                  Apply knowledge to solve complex engineering problems through
                  collaborative projects and competitions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Benefits Section */}
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
                Advanced Technical Skills
              </h3>
            </div>
            <p className="text-gray-700 text-sm">
              Develop expertise in robotics, programming, and electronics that
              translate to real-world applications
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl shadow-sm">
            <div className="flex items-center mb-3">
              <Star className="text-yellow-500" size={20} />
              <h3 className="font-semibold text-gray-800 ml-2">
                Critical Thinking
              </h3>
            </div>
            <p className="text-gray-700 text-sm">
              Enhance analytical abilities through complex problem-solving and
              debugging challenges
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl shadow-sm">
            <div className="flex items-center mb-3">
              <Star className="text-yellow-500" size={20} />
              <h3 className="font-semibold text-gray-800 ml-2">
                Collaborative Skills
              </h3>
            </div>
            <p className="text-gray-700 text-sm">
              Learn teamwork and communication while working on group projects
              and sharing solutions
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl shadow-sm">
            <div className="flex items-center mb-3">
              <Star className="text-yellow-500" size={20} />
              <h3 className="font-semibold text-gray-800 ml-2">
                Future Career Preparation
              </h3>
            </div>
            <p className="text-gray-700 text-sm">
              Build skills highly valued in engineering, computer science, and
              other STEM career paths
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl shadow-sm">
            <div className="flex items-center mb-3">
              <Star className="text-yellow-500" size={20} />
              <h3 className="font-semibold text-gray-800 ml-2">
                Computational Thinking
              </h3>
            </div>
            <p className="text-gray-700 text-sm">
              Develop structured thinking patterns that help break down and
              solve complex problems
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl shadow-sm">
            <div className="flex items-center mb-3">
              <Star className="text-yellow-500" size={20} />
              <h3 className="font-semibold text-gray-800 ml-2">
                Creative Innovation
              </h3>
            </div>
            <p className="text-gray-700 text-sm">
              Encourage original thinking and inventive approaches to
              engineering challenges
            </p>
          </div>
        </div>
      </motion.div>

      {/* Program Levels */}
      <motion.div
        className="mt-16 mx-4 lg:mx-8 p-6 bg-yellow-50 rounded-2xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.65 }}
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Four Progressive Levels
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-5 rounded-xl shadow-sm">
            <h3 className="font-bold text-lg text-red-800 mb-3">
              Level 1: Foundation
            </h3>
            <p className="text-gray-700">
              Introduction to the SPIKE Prime kit, basic robot construction, and
              simple block programming. Students learn the fundamentals of
              robotics and complete their first working robots.
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl shadow-sm">
            <h3 className="font-bold text-lg text-red-800 mb-3">
              Level 2: Exploration
            </h3>
            <p className="text-gray-700">
              Advanced robot designs with multiple motors and sensors. Students
              learn more sophisticated programming techniques including loops,
              conditionals, and variables.
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl shadow-sm">
            <h3 className="font-bold text-lg text-red-800 mb-3">
              Level 3: Innovation
            </h3>
            <p className="text-gray-700">
              Introduction to Python programming and more complex mechanical
              designs. Students begin developing autonomous robots that can make
              decisions based on sensor input.
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl shadow-sm">
            <h3 className="font-bold text-lg text-red-800 mb-3">
              Level 4: Mastery
            </h3>
            <p className="text-gray-700">
              Advanced Python programming, complex engineering challenges, and
              competitive robotics. Students design and build sophisticated
              robots to solve real-world problems.
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
            Comprehensive Learning Path
          </Badge>
          <h2 className="text-3xl font-bold text-gray-800">
            Detailed Curriculum
          </h2>
          <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
            Our structured curriculum progresses through four levels, building
            skills from basic to advanced
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100"
        >
          <Testimonials testimonials={SpikePrimeCurriculum} />
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
          Start Your Child&apos;s Advanced Robotics Journey Today!
        </h2>
        <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
          Give your child the opportunity to develop cutting-edge robotics and
          programming skills with our comprehensive SPIKE Prime course.
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

export default SpikePrime;
