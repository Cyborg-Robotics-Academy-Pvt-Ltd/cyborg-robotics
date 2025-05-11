"use client";
import Image from "next/image";
import React from "react";
import Footer from "@/components/Footer";
import { Testimonials } from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { AndroidCurriculum } from "../../../utils/curriculum";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Laptop, Code, Database, Layout, Star } from "lucide-react";

const AndroidStudio = () => {
  const enquiryPanelData = [
    {
      mode: "Online & Offline",
      duration: "16 CLASSES (x3 LEVELS) (1 HOUR PER CLASS)",
    },
  ];

  const keyFeatures = [
    {
      title: "Java & Kotlin Programming",
      description: "Master the primary languages used in Android development",
      icon: <Code className="text-red-700" size={24} />,
    },
    {
      title: "UI/UX Design",
      description: "Learn to create intuitive, attractive app interfaces",
      icon: <Layout className="text-red-700" size={24} />,
    },
    {
      title: "App Development",
      description: "Build functional applications from concept to deployment",
      icon: <Laptop className="text-red-700" size={24} />,
    },
    {
      title: "Database Integration",
      description: "Connect your apps to data sources and cloud services",
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
    link.href = "/assets/pdf/ANDRIOD STUDIO.pdf"; // Update this path to your actual syllabus file
    link.download = "ANDRIOD STUDIO.pdf"; // This will be the name of the downloaded file
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
              Android Studio
            </h1>
            <p className="text-gray-700 mb-6">
              Master the art of building Android applications using
              Google&apos;s official IDE
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
                src="/assets/classroom-course/androidstudio.png"
                alt="Android Studio Course"
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
          Android Studio is the official integrated development environment
          (IDE) for building Android applications. Developed by Google, it
          provides tools and resources for coding, designing, debugging and
          testing Android apps. It supports programming languages like Java,
          Kotlin and XML, with features like a visual layout editor, real-time
          previews and an emulator to simulate apps on different devices.
          Android Studio integrates with version control systems and the Google
          Play Store, streamlining the development-to-deployment process.
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
                  Android Fundamentals
                </h3>
                <p className="text-gray-700">
                  Learn the basics of Android app architecture, UI components,
                  and the Android Studio IDE.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-start">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-800 text-white flex items-center justify-center font-bold z-10">
                2
              </div>
              <div className="flex-grow bg-white p-5 rounded-xl shadow-sm md:ml-4">
                <h3 className="font-bold text-lg text-red-800 mb-2">
                  Java & Kotlin Development
                </h3>
                <p className="text-gray-700">
                  Master programming languages used in Android app development
                  with practical coding exercises.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-start">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-800 text-white flex items-center justify-center font-bold z-10">
                3
              </div>
              <div className="flex-grow bg-white p-5 rounded-xl shadow-sm md:ml-4">
                <h3 className="font-bold text-lg text-red-800 mb-2">
                  Advanced UI & UX Design
                </h3>
                <p className="text-gray-700">
                  Create intuitive and attractive interfaces using Material
                  Design principles and advanced layouts.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-start">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-800 text-white flex items-center justify-center font-bold z-10">
                4
              </div>
              <div className="flex-grow bg-white p-5 rounded-xl shadow-sm md:ml-4">
                <h3 className="font-bold text-lg text-red-800 mb-2">
                  Complete App Development
                </h3>
                <p className="text-gray-700">
                  Build and deploy fully functional apps with backend
                  integration, data storage, and user authentication.
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
          Career Benefits
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-5 rounded-xl shadow-sm">
            <div className="flex items-center mb-3">
              <Star className="text-yellow-500" size={20} />
              <h3 className="font-semibold text-gray-800 ml-2">
                High-Demand Skills
              </h3>
            </div>
            <p className="text-gray-700 text-sm">
              Android developers are in high demand across industries worldwide
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl shadow-sm">
            <div className="flex items-center mb-3">
              <Star className="text-yellow-500" size={20} />
              <h3 className="font-semibold text-gray-800 ml-2">
                Competitive Salary
              </h3>
            </div>
            <p className="text-gray-700 text-sm">
              Android developers command attractive compensation packages
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl shadow-sm">
            <div className="flex items-center mb-3">
              <Star className="text-yellow-500" size={20} />
              <h3 className="font-semibold text-gray-800 ml-2">
                Entrepreneurial Opportunities
              </h3>
            </div>
            <p className="text-gray-700 text-sm">
              Create your own apps and start your tech business
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl shadow-sm">
            <div className="flex items-center mb-3">
              <Star className="text-yellow-500" size={20} />
              <h3 className="font-semibold text-gray-800 ml-2">
                Remote Work Options
              </h3>
            </div>
            <p className="text-gray-700 text-sm">
              Flexibility to work from anywhere as a mobile developer
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl shadow-sm">
            <div className="flex items-center mb-3">
              <Star className="text-yellow-500" size={20} />
              <h3 className="font-semibold text-gray-800 ml-2">
                Portfolio Building
              </h3>
            </div>
            <p className="text-gray-700 text-sm">
              Create impressive projects to showcase your technical abilities
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl shadow-sm">
            <div className="flex items-center mb-3">
              <Star className="text-yellow-500" size={20} />
              <h3 className="font-semibold text-gray-800 ml-2">
                Continuous Growth
              </h3>
            </div>
            <p className="text-gray-700 text-sm">
              Android development offers a clear career progression path
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
            Our curriculum is designed to take you from beginner to professional
            Android developer
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100"
        >
          <Testimonials testimonials={AndroidCurriculum} />
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
          Ready to Start Your Android Development Journey?
        </h2>
        <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
          Join our comprehensive Android Studio course and transform yourself
          into a skilled app developer.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-red-800 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 shadow-md">
            Enroll Now
          </button>
          <button
            className="bg-white hover:bg-gray-100 text-red-800 font-semibold py-3 px-6 rounded-lg border border-red-300 transition duration-300 shadow-sm"
            onClick={handleDownloadSyllabus}
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

export default AndroidStudio;
