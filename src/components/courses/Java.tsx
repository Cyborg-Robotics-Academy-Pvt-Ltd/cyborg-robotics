"use client";

import Image from "next/image";
import React from "react";
import Footer from "@/components/Footer";
import { Testimonials } from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { javaCurriculum } from "../../../utils/curriculum";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Code, Globe, Database, Server, Star } from "lucide-react";
import Link from "next/link";

const Java = () => {
  const enquiryPanelData = [
    {
      mode: "Online & Offline",
      duration: "16 CLASSES(x3 LEVELS) (1 HOUR PER CLASS)",
    },
  ];

  const keyFeatures = [
    {
      title: "Object-Oriented Programming",
      description: "Master Java&apos;s powerful class-based OOP concepts",
      icon: <Code className="text-red-700" size={24} />,
    },
    {
      title: "Cross-Platform Development",
      description:
        "Write once, run anywhere with Java&apos;s platform independence",
      icon: <Globe className="text-red-700" size={24} />,
    },
    {
      title: "Enterprise Applications",
      description:
        "Build robust enterprise-level solutions with Java frameworks",
      icon: <Server className="text-red-700" size={24} />,
    },
    {
      title: "Database Integration",
      description: "Connect applications to databases with Java&apos;s JDBC",
      icon: <Database className="text-red-700" size={24} />,
    },
  ];
  const handleDownloadSyllabus = () => {
    const link = document.createElement("a");
    link.href = "/assets/pdf/JAVA.pdf"; // Update this path to your actual syllabus file
    link.download = "JAVA.pdf"; // This will be the name of the downloaded file
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
              Professional Course
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-bold text-red-800 mb-4">
              JAVA PROGRAMMING
            </h1>
            <p className="text-lg text-gray-700 mb-6">
              Master Java programming to create cross-platform applications,
              Android apps, and enterprise solutions
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
            <button className="bg-red-800 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-xl transition duration-300 shadow-md">
              Enroll Now
            </button>
          </motion.div>

          <motion.div
            className="lg:w-1/2"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="rounded-2xl h-96 overflow-hidden border-2 border-red-100 shadow-xl">
              <Image
                src="/assets/online-course/java.webp"
                alt="Java Programming Course"
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
          Java is a widely used programming language, created in 1995 and owned
          by Oracle. It powers over 3 billion devices worldwide. Known for its
          platform independence, security, and scalability, Java is used in
          various domains, including mobile applications (Android apps), desktop
          software, web applications, web servers, enterprise solutions, games,
          and database connections. Its &quot;Write Once, Run Anywhere&quot;
          (WORA) capability allows developers to build cross-platform
          applications efficiently. Java&apos;s rich ecosystem, including
          frameworks like Spring and Hibernate, makes it a top choice for
          businesses and developers. With strong community support, Java
          continues to be a leading language in modern software development.
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
                  Java Fundamentals
                </h3>
                <p className="text-gray-700">
                  Master core Java syntax, data types, control structures, and
                  essential programming concepts.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-start">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-800 text-white flex items-center justify-center font-bold z-10">
                2
              </div>
              <div className="flex-grow bg-white p-5 rounded-xl shadow-sm md:ml-4">
                <h3 className="font-bold text-lg text-red-800 mb-2">
                  Object-Oriented Programming
                </h3>
                <p className="text-gray-700">
                  Learn classes, objects, inheritance, polymorphism, and
                  abstraction principles.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-start">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-800 text-white flex items-center justify-center font-bold z-10">
                3
              </div>
              <div className="flex-grow bg-white p-5 rounded-xl shadow-sm md:ml-4">
                <h3 className="font-bold text-lg text-red-800 mb-2">
                  Advanced Java Concepts
                </h3>
                <p className="text-gray-700">
                  Explore collections, exception handling, multithreading, and
                  file handling capabilities.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-start">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-800 text-white flex items-center justify-center font-bold z-10">
                4
              </div>
              <div className="flex-grow bg-white p-5 rounded-xl shadow-sm md:ml-4">
                <h3 className="font-bold text-lg text-red-800 mb-2">
                  Practical Applications
                </h3>
                <p className="text-gray-700">
                  Build complete projects with databases, APIs, and enterprise
                  frameworks like Spring.
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
          Benefits of Learning Java
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-5 rounded-xl shadow-sm">
            <div className="flex items-center mb-3">
              <Star className="text-yellow-500" size={20} />
              <h3 className="font-semibold text-gray-800 ml-2">
                High Market Demand
              </h3>
            </div>
            <p className="text-gray-700 text-sm">
              Java developers continue to be among the most sought-after
              professionals in the tech industry
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl shadow-sm">
            <div className="flex items-center mb-3">
              <Star className="text-yellow-500" size={20} />
              <h3 className="font-semibold text-gray-800 ml-2">
                Career Growth
              </h3>
            </div>
            <p className="text-gray-700 text-sm">
              Progress from Junior Developer to Architect or Technical Lead with
              extensive Java expertise
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl shadow-sm">
            <div className="flex items-center mb-3">
              <Star className="text-yellow-500" size={20} />
              <h3 className="font-semibold text-gray-800 ml-2">
                Enterprise Applications
              </h3>
            </div>
            <p className="text-gray-700 text-sm">
              Build robust, secure, and scalable applications for large
              corporations and businesses
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl shadow-sm">
            <div className="flex items-center mb-3">
              <Star className="text-yellow-500" size={20} />
              <h3 className="font-semibold text-gray-800 ml-2">
                Android Development
              </h3>
            </div>
            <p className="text-gray-700 text-sm">
              Java knowledge provides a foundation for creating mobile
              applications for billions of Android devices
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl shadow-sm">
            <div className="flex items-center mb-3">
              <Star className="text-yellow-500" size={20} />
              <h3 className="font-semibold text-gray-800 ml-2">
                Strong Community Support
              </h3>
            </div>
            <p className="text-gray-700 text-sm">
              Access to vast resources, libraries, and assistance from the
              global Java developer community
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl shadow-sm">
            <div className="flex items-center mb-3">
              <Star className="text-yellow-500" size={20} />
              <h3 className="font-semibold text-gray-800 ml-2">
                Transferable Skills
              </h3>
            </div>
            <p className="text-gray-700 text-sm">
              Java concepts make it easier to learn other programming languages
              and adapt to new technologies
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
            Our structured curriculum covers every aspect of Java programming
            across three progressive levels
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className=""
        >
          <Testimonials testimonials={javaCurriculum} />
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
          Ready to Master Java Programming?
        </h2>
        <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
          Join our comprehensive Java course and learn to create professional
          applications that run on any platform. Take your career to the next
          level!
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
            className="bg-white hover:bg-gray-100 text-red-800 font-semibold py-3 px-6 rounded-xl border border-red-300 transition duration-300 shadow-sm"
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

export default Java;
