"use client";

import Image from "next/image";
import React from "react";
import Footer from "@/components/Footer";
import { Testimonials } from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { WebDesignCurriculum } from "../../../utils/curriculum";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Code, Layout, Palette, Rocket, Star } from "lucide-react";

const WebDesigning = () => {
  const enquiryPanelData = [
    {
      mode: "Online & Offline",
      duration: "16 CLASSES (x4 LEVELS) (1 HOUR PER CLASS)",
    },
  ];

  const keyFeatures = [
    {
      title: "HTML Fundamentals",
      description:
        "Learn the core building blocks of website structure and content",
      icon: <Code className="text-red-700" size={24} />,
    },
    {
      title: "CSS Styling",
      description:
        "Master styling techniques to create visually appealing websites",
      icon: <Palette className="text-red-700" size={24} />,
    },
    {
      title: "Responsive Design",
      description:
        "Create websites that adapt to different screen sizes and devices",
      icon: <Layout className="text-red-700" size={24} />,
    },
    {
      title: "Interactive Elements",
      description:
        "Add engaging features and interactive components to web pages",
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
    link.href = "/assets/pdf/WEB DESIGN.pdf"; // Update this path to your actual syllabus file
    link.download = "WEB DESIGN.pdf"; // This will be the name of the downloaded file
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
              Frontend Development Course
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-bold text-red-800 mb-4">
              Web Designing
            </h1>
            <p className="text-lg text-gray-700 mb-6">
              Learn to build beautiful, responsive, and interactive websites
              with HTML and CSS
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
                src="/assets/online-course/html.webp"
                alt="Web Designing Course"
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
          HTML (Hypertext Markup Language) and CSS (Cascading Style Sheets) are
          two of the core technologies for building Web pages. HTML is the
          foundation of all web pages. It defines the structure of a page, while
          CSS defines its style. Our comprehensive Web Designing course takes
          students through the entire process of creating modern, responsive
          websites from scratch. From understanding basic HTML tags to mastering
          advanced CSS layouts and animations, students will develop the skills
          needed to bring their creative web designs to life. By the end of this
          course, participants will be able to build professional-looking
          websites that work across different devices and screen sizes.
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
                  HTML Basics
                </h3>
                <p className="text-gray-700">
                  Learn the fundamental building blocks of web pages, including
                  tags, elements, and document structure.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-start">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-800 text-white flex items-center justify-center font-bold z-10">
                2
              </div>
              <div className="flex-grow bg-white p-5 rounded-xl shadow-sm md:ml-4">
                <h3 className="font-bold text-lg text-red-800 mb-2">
                  CSS Styling
                </h3>
                <p className="text-gray-700">
                  Master styling techniques including colors, typography,
                  borders, and layouts to create visually appealing web pages.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-start">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-800 text-white flex items-center justify-center font-bold z-10">
                3
              </div>
              <div className="flex-grow bg-white p-5 rounded-xl shadow-sm md:ml-4">
                <h3 className="font-bold text-lg text-red-800 mb-2">
                  Responsive Design
                </h3>
                <p className="text-gray-700">
                  Implement responsive design techniques to ensure websites work
                  perfectly across different screen sizes and devices.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-start">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-800 text-white flex items-center justify-center font-bold z-10">
                4
              </div>
              <div className="flex-grow bg-white p-5 rounded-xl shadow-sm md:ml-4">
                <h3 className="font-bold text-lg text-red-800 mb-2">
                  Interactive Elements
                </h3>
                <p className="text-gray-700">
                  Add forms, navigation menus, animations, and other interactive
                  elements to create engaging user experiences.
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
                Digital Literacy
              </h3>
            </div>
            <p className="text-gray-700 text-sm">
              Develop essential digital skills that are increasingly important
              in today&apos;s technology-driven world
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
              Express creativity through visual design and interactive content
              creation
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl shadow-sm">
            <div className="flex items-center mb-3">
              <Star className="text-yellow-500" size={20} />
              <h3 className="font-semibold text-gray-800 ml-2">
                Problem-Solving Skills
              </h3>
            </div>
            <p className="text-gray-700 text-sm">
              Enhance logical thinking and troubleshooting abilities through
              coding challenges
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
              Create real projects that can be showcased in personal portfolios
              for future opportunities
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl shadow-sm">
            <div className="flex items-center mb-3">
              <Star className="text-yellow-500" size={20} />
              <h3 className="font-semibold text-gray-800 ml-2">
                Career Preparation
              </h3>
            </div>
            <p className="text-gray-700 text-sm">
              Gain foundational skills for in-demand careers in web development
              and design
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl shadow-sm">
            <div className="flex items-center mb-3">
              <Star className="text-yellow-500" size={20} />
              <h3 className="font-semibold text-gray-800 ml-2">
                Attention to Detail
              </h3>
            </div>
            <p className="text-gray-700 text-sm">
              Develop precision and meticulousness through coding practices that
              require accuracy
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
              Level 1: HTML Fundamentals
            </h3>
            <p className="text-gray-700">
              Introduction to basic HTML structure, elements, and attributes.
              Students learn to create simple web pages with text, images, and
              links.
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl shadow-sm">
            <h3 className="font-bold text-lg text-red-800 mb-3">
              Level 2: CSS Styling
            </h3>
            <p className="text-gray-700">
              Learn to style HTML elements using CSS properties for colors,
              typography, spacing, and basic layouts. Create visually appealing
              designs.
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl shadow-sm">
            <h3 className="font-bold text-lg text-red-800 mb-3">
              Level 3: Layout and Responsiveness
            </h3>
            <p className="text-gray-700">
              Master advanced layout techniques including Flexbox and CSS Grid.
              Implement responsive design principles for multiple screen sizes.
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl shadow-sm">
            <h3 className="font-bold text-lg text-red-800 mb-3">
              Level 4: Interactive Web Design
            </h3>
            <p className="text-gray-700">
              Add interactive elements, forms, animations, and transitions.
              Create a complete portfolio website showcasing all learned skills.
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
          <Testimonials testimonials={WebDesignCurriculum} />
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
          Launch Your Child&apos;s Web Design Journey Today!
        </h2>
        <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
          Give your child the opportunity to develop valuable web design and
          development skills that will serve them throughout their academic and
          professional career.
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

export default WebDesigning;
