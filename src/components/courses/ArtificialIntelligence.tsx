"use client";

import Image from "next/image";
import React from "react";
import Footer from "@/components/Footer";
import { Testimonials } from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { ArtificialIntelligenceCurriculum } from "../../../utils/curriculum";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Brain, Bot, Database, TrendingUp } from "lucide-react";
import Link from "next/link";

const ArtificialIntelligence = () => {
  const enquiryPanelData = [
    {
      mode: "Online & Offline",
      duration: "16 CLASSES (x5 LEVELS) (1 HOUR PER CLASS)",
    },
  ];

  const keyFeatures = [
    {
      title: "Machine Learning",
      description:
        "Learn fundamental algorithms and techniques behind modern AI",
      icon: <Brain className="text-red-700" size={24} />,
    },
    {
      title: "Data Analysis",
      description:
        "Process and analyze large datasets to extract valuable insights",
      icon: <Database className="text-red-700" size={24} />,
    },
    {
      title: "AI Applications",
      description: "Build practical AI solutions for real-world problems",
      icon: <Bot className="text-red-700" size={24} />,
    },
    {
      title: "Predictive Models",
      description: "Create models that can forecast trends and outcomes",
      icon: <TrendingUp className="text-red-700" size={24} />,
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
    link.href = "/assets/pdf/ARTIFICIAL INTELLIGENCE.pdf"; // Update this path to your actual syllabus file
    link.download = "ARTIFICIAL INTELLIGENCE.pdf"; // This will be the name of the downloaded file
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
              Advanced Technology Course
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-bold text-red-800 mb-4">
              Artificial Intelligence
            </h1>
            <p className="text-lg text-gray-700 mb-6">
              Master the fundamentals of AI and build intelligent applications
              that learn and adapt
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
            <Link
              href="https://wa.me/917028511161?text=Hello%20Cyborg,%20I%20am%20looking%20for%20some%20help!%20(Enquiry)"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="bg-red-800 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-xl transition duration-300 shadow-md">
                Enroll Now
              </button>
            </Link>
          </motion.div>

          <motion.div
            className="lg:w-1/2"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="rounded-2xl h-96 overflow-hidden border-2 border-red-100 shadow-xl">
              <Image
                src="/assets/online-course/aigif.webp"
                alt="Artificial Intelligence Course"
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
          Artificial Intelligence (AI) is the science of creating computer
          programs capable of performing tasks that typically require human
          intelligence. This comprehensive course covers everything from
          fundamental AI concepts to advanced applications across five
          progressive levels. You&apos;ll learn how AI can simulate human
          intelligence through learning, planning, and problem-solving. The
          course explores how AI leverages data analytics to assess confidence
          and motivation levels in educational settings, providing just-in-time
          assessment for students. By the end of this program, you&apos;ll have
          the skills to build AI applications that can learn from data, make
          predictions, and solve complex problems.
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
                  AI Fundamentals
                </h3>
                <p className="text-gray-700">
                  Understand the basics of artificial intelligence, machine
                  learning, and neural networks.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-start">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-800 text-white flex items-center justify-center font-bold z-10">
                2
              </div>
              <div className="flex-grow bg-white p-5 rounded-xl shadow-sm md:ml-4">
                <h3 className="font-bold text-lg text-red-800 mb-2">
                  Data Processing & Analysis
                </h3>
                <p className="text-gray-700">
                  Learn techniques for collecting, cleaning, and analyzing data
                  for AI applications.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-start">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-800 text-white flex items-center justify-center font-bold z-10">
                3
              </div>
              <div className="flex-grow bg-white p-5 rounded-xl shadow-sm md:ml-4">
                <h3 className="font-bold text-lg text-red-800 mb-2">
                  Machine Learning Models
                </h3>
                <p className="text-gray-700">
                  Build and train various machine learning models to solve
                  classification and regression problems.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-start">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-800 text-white flex items-center justify-center font-bold z-10">
                4
              </div>
              <div className="flex-grow bg-white p-5 rounded-xl shadow-sm md:ml-4">
                <h3 className="font-bold text-lg text-red-800 mb-2">
                  Natural Language Processing
                </h3>
                <p className="text-gray-700">
                  Create applications that can understand, process, and generate
                  human language.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-start">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-800 text-white flex items-center justify-center font-bold z-10">
                5
              </div>
              <div className="flex-grow bg-white p-5 rounded-xl shadow-sm md:ml-4">
                <h3 className="font-bold text-lg text-red-800 mb-2">
                  Advanced AI Projects
                </h3>
                <p className="text-gray-700">
                  Apply your skills to build complete AI solutions for
                  real-world applications.
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
            Our structured AI curriculum is designed to take you from beginner
            to advanced across five progressive levels
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className=""
        >
          <Testimonials testimonials={ArtificialIntelligenceCurriculum} />
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
          Begin Your AI Journey Today!
        </h2>
        <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
          Join our comprehensive Artificial Intelligence course and learn to
          build intelligent applications that can transform industries.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="https://wa.me/917028511161?text=Hello%20Cyborg,%20I%20am%20looking%20for%20some%20help!%20(Enquiry)"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="bg-red-800 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-xl transition duration-300 shadow-md">
              Enroll Now
            </button>
          </Link>
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

export default ArtificialIntelligence;
