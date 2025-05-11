"use client";

import Image from "next/image";
import React from "react";
import Footer from "@/components/Footer";
import { Testimonials } from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { AppDevelopmentData } from "../../../utils/curriculum";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Smartphone, Code, Palette, Database, Star } from "lucide-react";

const AppDesigning = () => {
  const enquiryPanelData = [
    {
      mode: "Online & Offline",
      duration: "16 CLASSES(x 4 LEVELS) (1 HOUR PER CLASS)",
    },
  ];

  const keyFeatures = [
    {
      title: "UI/UX Design",
      description: "Create intuitive and visually appealing user interfaces",
      icon: <Palette className="text-red-700" size={24} />,
    },
    {
      title: "Front-End Development",
      description:
        "Build interactive layouts, animations and responsive designs",
      icon: <Smartphone className="text-red-700" size={24} />,
    },
    {
      title: "Back-End Programming",
      description: "Learn coding logic, data structures and app functionality",
      icon: <Code className="text-red-700" size={24} />,
    },
    {
      title: "Database Integration",
      description: "Connect apps to databases for data storage and retrieval",
      icon: <Database className="text-red-700" size={24} />,
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
    link.href = "/assets/pdf/APP DESIGNING.pdf"; // Update this path to your actual syllabus file
    link.download = "APP DESIGNING.pdf"; // This will be the name of the downloaded file
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
              Professional Course
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-bold text-red-800 mb-4">
              APP DESIGNING
            </h1>
            <p className="text-lg text-gray-700 mb-6">
              Master both front-end design and back-end development to create
              complete, functional applications
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
                src="/assets/online-course/appdesigning.webp"
                alt="App Designing Course"
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
          App Designing consists of two main parts: Front-End (Designing) and
          Back-End (Programming/Coding). The Designing Part focuses on creating
          the user interface, learning layouts, media operations, drawing and
          animation, maps and navigation, sensor integration, social components,
          storage or database management, and web connectivity. The Programming
          Part involves control structures, logical operations, mathematical
          computations, text string manipulation, creating lists and
          dictionaries, defining variables, and writing functions or procedures.
          Together, these aspects ensure a seamless development process,
          combining design aesthetics with functional logic.
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
                  Planning & Design
                </h3>
                <p className="text-gray-700">
                  Learn to plan app functionality and create wireframes and
                  mockups for intuitive user interfaces.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-start">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-800 text-white flex items-center justify-center font-bold z-10">
                2
              </div>
              <div className="flex-grow bg-white p-5 rounded-xl shadow-sm md:ml-4">
                <h3 className="font-bold text-lg text-red-800 mb-2">
                  Front-End Development
                </h3>
                <p className="text-gray-700">
                  Build interactive UI elements, implement responsive designs,
                  and create engaging user experiences.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-start">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-800 text-white flex items-center justify-center font-bold z-10">
                3
              </div>
              <div className="flex-grow bg-white p-5 rounded-xl shadow-sm md:ml-4">
                <h3 className="font-bold text-lg text-red-800 mb-2">
                  Back-End Programming
                </h3>
                <p className="text-gray-700">
                  Develop app logic, connect to databases, and implement core
                  functionality through coding.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-start">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-800 text-white flex items-center justify-center font-bold z-10">
                4
              </div>
              <div className="flex-grow bg-white p-5 rounded-xl shadow-sm md:ml-4">
                <h3 className="font-bold text-lg text-red-800 mb-2">
                  Testing & Deployment
                </h3>
                <p className="text-gray-700">
                  Learn to test your application, debug issues, and prepare your
                  app for real-world deployment.
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
          Benefits of This Course
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-5 rounded-xl shadow-sm">
            <div className="flex items-center mb-3">
              <Star className="text-yellow-500" size={20} />
              <h3 className="font-semibold text-gray-800 ml-2">
                Practical Skills
              </h3>
            </div>
            <p className="text-gray-700 text-sm">
              Gain hands-on experience building real applications from start to
              finish
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl shadow-sm">
            <div className="flex items-center mb-3">
              <Star className="text-yellow-500" size={20} />
              <h3 className="font-semibold text-gray-800 ml-2">
                Portfolio Development
              </h3>
            </div>
            <p className="text-gray-700 text-sm">
              Create professional-quality apps to showcase your skills to
              potential employers
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl shadow-sm">
            <div className="flex items-center mb-3">
              <Star className="text-yellow-500" size={20} />
              <h3 className="font-semibold text-gray-800 ml-2">
                Industry-Relevant Skills
              </h3>
            </div>
            <p className="text-gray-700 text-sm">
              Learn current technologies and methodologies used in professional
              app development
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl shadow-sm">
            <div className="flex items-center mb-3">
              <Star className="text-yellow-500" size={20} />
              <h3 className="font-semibold text-gray-800 ml-2">
                Problem-Solving Expertise
              </h3>
            </div>
            <p className="text-gray-700 text-sm">
              Develop critical thinking and technical problem-solving abilities
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl shadow-sm">
            <div className="flex items-center mb-3">
              <Star className="text-yellow-500" size={20} />
              <h3 className="font-semibold text-gray-800 ml-2">
                Career Opportunities
              </h3>
            </div>
            <p className="text-gray-700 text-sm">
              Open doors to careers in app development, UI/UX design, and
              software engineering
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl shadow-sm">
            <div className="flex items-center mb-3">
              <Star className="text-yellow-500" size={20} />
              <h3 className="font-semibold text-gray-800 ml-2">
                Creative Expression
              </h3>
            </div>
            <p className="text-gray-700 text-sm">
              Blend technical skills with creative design to build innovative
              applications
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
            Our structured curriculum covers every aspect of app design and
            development across four levels
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100"
        >
          <Testimonials testimonials={AppDevelopmentData} />
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
          Ready to Build Your First App?
        </h2>
        <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
          Join our comprehensive App Designing course and learn to create
          professional applications from concept to deployment.
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

export default AppDesigning;
