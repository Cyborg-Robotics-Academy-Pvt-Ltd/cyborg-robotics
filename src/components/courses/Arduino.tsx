"use client";

import Image from "next/image";
import React from "react";
import Footer from "@/components/Footer";
import { Testimonials } from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { ArduinoCurriculum } from "../../../utils/curriculum";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { CircuitBoard, Cpu, Lightbulb, Zap } from "lucide-react";

const Arduino = () => {
  const enquiryPanelData = [
    {
      mode: "Offline",
      duration: "16 CLASSES (1 HOUR PER CLASS)",
    },
  ];

  const keyFeatures = [
    {
      title: "Hardware Programming",
      description: "Learn to program Arduino microcontrollers using C/C++",
      icon: <Cpu className="text-red-700" size={24} />,
    },
    {
      title: "Circuit Design",
      description: "Build electronic circuits and connect various components",
      icon: <CircuitBoard className="text-red-700" size={24} />,
    },
    {
      title: "Sensor Integration",
      description:
        "Interface with real-world sensors to collect and process data",
      icon: <Zap className="text-red-700" size={24} />,
    },
    {
      title: "IoT Projects",
      description: "Create interactive projects and automated solutions",
      icon: <Lightbulb className="text-red-700" size={24} />,
    },
  ];
  const handleDownloadSyllabus = () => {
    const link = document.createElement("a");
    link.href = "/assets/pdf/ARDUINO.pdf"; // Update this path to your actual syllabus file
    link.download = "ARDUINO.pdf"; // This will be the name of the downloaded file
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: custom * 0.1 },
    }),
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
              Electronics Course
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-bold text-red-800 mb-4">
              Arduino
            </h1>
            <p className="text-lg text-gray-700 mb-6">
              Build interactive electronics projects with Arduino programming
              and hardware integration
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
                src="/assets/classroom-course/arduino.webp"
                alt="Arduino Course"
                width={200}
                height={150}
                layout="responsive"
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
          Arduino is an open-source electronics platform based on easy-to-use
          hardware and software. This course provides hands-on training with
          Arduino UNO boards, teaching you how to interface various sensors to
          collect real-world data and process it according to your needs.
          You&apos;ll learn to program Arduino boards to read inputs (like light
          on a sensor or a finger on a button) and turn them into outputs
          (activating a motor or turning on an LED). Through practical projects
          like LED interfacing, switch controls, burglar alarms, and automatic
          dark detectors, you&apos;ll gain valuable skills in electronics and
          programming.
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
          What You&apos;ll Learn
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
          Your Learning Path
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
                  Arduino Fundamentals
                </h3>
                <p className="text-gray-700">
                  Learn the basics of Arduino hardware, software IDE setup, and
                  simple circuit construction.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-start">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-800 text-white flex items-center justify-center font-bold z-10">
                2
              </div>
              <div className="flex-grow bg-white p-5 rounded-xl shadow-sm md:ml-4">
                <h3 className="font-bold text-lg text-red-800 mb-2">
                  Input/Output Control
                </h3>
                <p className="text-gray-700">
                  Master digital and analog I/O with LEDs, buttons, and basic
                  sensors.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-start">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-800 text-white flex items-center justify-center font-bold z-10">
                3
              </div>
              <div className="flex-grow bg-white p-5 rounded-xl shadow-sm md:ml-4">
                <h3 className="font-bold text-lg text-red-800 mb-2">
                  Advanced Sensors
                </h3>
                <p className="text-gray-700">
                  Work with complex sensors including temperature, motion,
                  light, and sound detection.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-start">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-800 text-white flex items-center justify-center font-bold z-10">
                4
              </div>
              <div className="flex-grow bg-white p-5 rounded-xl shadow-sm md:ml-4">
                <h3 className="font-bold text-lg text-red-800 mb-2">
                  Complete Projects
                </h3>
                <p className="text-gray-700">
                  Build full-scale projects like home automation systems,
                  security devices, and interactive displays.
                </p>
              </div>
            </div>
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
            Our structured Arduino curriculum covers everything from basics to
            advanced projects
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100"
        >
          <Testimonials testimonials={ArduinoCurriculum} />
        </motion.div>
      </div>

      {/* CTA Section */}
      <motion.div
        className="mt-16 mx-4 lg:mx-8 p-8 bg-red-50 rounded-2xl text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <h2 className="text-2xl lg:text-3xl font-bold text-red-800 mb-4">
          Start Your Electronics Journey Today!
        </h2>
        <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
          Join our hands-on Arduino course and learn to build interactive
          electronic projects that solve real-world problems.
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

export default Arduino;
