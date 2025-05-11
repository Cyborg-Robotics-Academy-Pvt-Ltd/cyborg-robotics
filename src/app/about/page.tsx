"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Head from "next/head";
import Footer from "@/components/Footer";
import { InfiniteCertificateImages } from "@/components/ui/inifinite-moving-certificate";
import Link from "next/link";

const Page = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);
  const listItems = [
    { text: "12+ Years of Expertise", icon: "/assets/courses/experinces.png" },
    { text: "6000+ Students Trained", icon: "/assets/courses/trained.png" },
    { text: "100,000+ Classes Conducted", icon: "/assets/courses/class.png" },
    {
      text: "15+ Regional, National, and International Awards and Competitions Won",
      icon: "/assets/courses/award.png",
    },
    {
      text: "Training for Competitions – Regional, National, and International",
      icon: "/assets/courses/competition.png",
    },
    {
      text: "Certified Trainers and Instructors",
      icon: "/assets/courses/experinces.png",
    },
    {
      text: "Age-Appropriate Foundation and Career-Oriented Courses",
      icon: "/assets/courses/age.png",
    },
  ];

  const testimonials = [
    {
      image: "/assets/certificates/certificate (1).png",
      name: "Certificate of Appreciation, WRO India 2016- Football",
    },
    {
      image: "/assets/certificates/certificate (2).png",
      name: "Certificate of Appreciation, WRO India 2016- Regular Elementary",
    },
    {
      image: "/assets/certificates/certificate (3).png",
      name: "WRO, Qatar 2015",
    },
    {
      image: "/assets/certificates/certificate (4).png",
      name: "India Stem Foundation, Certificate of Recognition, 10th Indian Robot Olympiad",
    },
  ];

  const courses = [
    { name: "Lego Robotics", icon: "/assets/courses/lego.png" },
    { name: "Electronics", icon: "/assets/courses/electronics.png" },
    { name: "Arduino & IoT", icon: "/assets/courses/arduino.png" },
    { name: "Python & Java", icon: "/assets/courses/coding.png" },
    { name: "Web Design", icon: "/assets/courses/webdesign.png" },
    { name: "App Development", icon: "/assets/courses/appdesign.png" },
    { name: "3D Printing", icon: "/assets/courses/3dprinter.png" },
    { name: "Animation", icon: "/assets/courses/animation.png" },
  ];

  const stats = [
    { number: "12+", label: "Years Experience" },
    { number: "6000+", label: "Students Trained" },
    { number: "100,000+", label: "Classes Conducted" },
    { number: "15+", label: "Awards Won" },
  ];

  return (
    <>
      <Head>
        <title>About Us - Cyborg Robotics Academy</title>
        <meta
          name="description"
          content="Learn about Cyborg Robotics Academy, offering technical courses in robotics, electronics, and programming for students of all ages."
        />
        <meta
          name="keywords"
          content="Robotics, Electronics, Programming, Courses, Education, Cyborg Robotics Academy"
        />
      </Head>

      {/* Hero Section - Now with white background */}
      <motion.div
        className="relative bg-gradient-to-b from-white to-red-50 py-20 lg:py-32 border-b border-gray-100 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Background Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-red-100 rounded-full -mr-32 -mt-32 opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-red-100 rounded-full -ml-24 -mb-24 opacity-50"></div>

        {/* Floating Elements */}
        <motion.div
          className="absolute top-40 right-20 w-8 h-8 bg-red-200 rounded-full hidden lg:block"
          animate={{
            y: [0, -15, 0],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            repeat: Infinity,
            duration: 3,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-32 left-1/4 w-12 h-12 bg-red-100 rounded-full hidden lg:block"
          animate={{
            y: [0, 20, 0],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            repeat: Infinity,
            duration: 4,
            ease: "easeInOut",
          }}
        />

        <div className="container mx-auto px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <motion.div
              className="lg:w-1/2 mb-12 lg:mb-0 z-10"
              initial={{ x: -50, opacity: 0 }}
              animate={isVisible ? { x: 0, opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                Shaping Future{" "}
                <span className="text-[#991b1b] relative">
                  Innovators
                  <motion.span
                    className="absolute bottom-0 left-0 w-full h-1 bg-[#991b1b]"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ delay: 1, duration: 0.8 }}
                  />
                </span>
              </h1>
              <p className="text-xl lg:text-2xl mb-8 text-gray-600 max-w-lg">
                Empowering young minds through robotics, electronics, and
                programming since 2011
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  className="bg-[#991b1b] hover:bg-[#7f1d1d] text-white px-8 py-4 rounded-xl   font-medium transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  whileTap={{ scale: 0.98 }}
                >
                  Our Courses
                </motion.button>
                <motion.button
                  className="border-2 border-[#991b1b] hover:bg-[#991b1b] hover:text-white text-[#991b1b] px-8 py-4 rounded-xl font-medium transition-all shadow-md hover:shadow-lg transform hover:-translate-y-1"
                  whileTap={{ scale: 0.98 }}
                >
                  Contact Us
                </motion.button>
              </div>
            </motion.div>

            <motion.div
              className="lg:w-1/2 flex justify-center relative z-10"
              initial={{ x: 50, opacity: 0 }}
              animate={isVisible ? { x: 0, opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="relative">
                {/* Decorative Elements */}
                <motion.div
                  className="absolute -z-10 w-72 h-72 rounded-full bg-red-100 -left-10 -top-10"
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 4,
                  }}
                />
                <motion.div
                  className="absolute -z-10 w-32 h-32 rounded-full bg-red-200 right-0 top-1/2"
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 3,
                    delay: 1,
                  }}
                />

                {/* Logo/Image with Glow Effect */}
                <div className="relative">
                  <motion.div
                    className="absolute inset-0 bg-red-200 rounded-xl filter blur-xl"
                    animate={{
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 3,
                    }}
                  />
                  <Image
                    src="/assets/logo.png"
                    alt="Cyborg Robotics Academy"
                    width={400}
                    height={400}
                    className="rounded-xl relative z-10"
                  />
                </div>

                <motion.div
                  className="absolute -z-10 w-48 h-48 rounded-full bg-gray-100 -right-5 -bottom-5"
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 5,
                    delay: 0.5,
                  }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Stats Section - Enhanced with card design */}
      <motion.div
        className="py-16 bg-gray-50"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="bg-white text-center p-6 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl lg:text-5xl font-bold text-[#991b1b] mb-2">
                  {stat.number}
                </h2>
                <p className="text-gray-600 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* About Section */}
      <motion.div
        className="py-20 lg:py-24 container mx-auto px-4 lg:px-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <motion.div
            className="lg:w-1/2"
            initial={{ x: -30, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-6 inline-block relative">
              About Us
              <span className="absolute bottom-0 left-0 w-1/3 h-1 bg-[#991b1b]"></span>
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              Cyborg Robotics Academy Private Limited, based in Pune, offers a
              wide range of technical courses, including Lego Robotics,
              Electronics, Arduino, IoT, Python, Java, Web Design, App Design,
              3D Printing, Animation and Coding both in-person and online.
            </p>
            <p className="text-lg text-gray-700 mb-8">
              Our programs emphasize a{" "}
              <span className="font-semibold text-[#991b1b]">
                Learning by Doing
              </span>{" "}
              approach, helping students develop problem-solving,
              decision-making and inquiry skills through hands-on experiences.
              Courses vary by age and include practical learning, building and
              programming robotic models while exploring real-life applications
              and concepts.
            </p>
            <button className="px-8 py-3 bg-[#991b1b] hover:bg-[#7f1d1d] text-white rounded-xl transition-all shadow-md hover:shadow-lg">
              Learn More
            </button>
          </motion.div>
          <motion.div
            className="lg:w-1/2 grid grid-cols-2 gap-6"
            initial={{ x: 30, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            {courses.map((course, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all flex items-center space-x-4 border border-gray-100"
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="bg-red-50 p-3 rounded-full">
                  <Image
                    src={course.icon}
                    alt={course.name}
                    width={24}
                    height={24}
                  />
                </div>
                <span className="font-medium">{course.name}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Features Section - Enhanced with better visuals */}
      <motion.div
        className="py-20 bg-gray-50"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ y: -20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Why Choose <span className="text-[#991b1b]">Cyborg Robotics</span>
            </h2>
            <div className="w-24 h-1 bg-[#991b1b] mx-auto"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {listItems.map((item, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-all border border-gray-100"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="bg-red-50 p-3 rounded-full text-[#991b1b]">
                    <Image src={item.icon} alt="" width={28} height={28} />
                  </div>
                  <h3 className="font-bold text-lg">{item.text}</h3>
                </div>
                <p className="text-gray-600 pl-14">
                  {/* Adding a brief description for each feature */}
                  {index === 0 &&
                    "Over a decade of excellence in robotics education."}
                  {index === 1 &&
                    "A growing community of young innovators and tech enthusiasts."}
                  {index === 2 &&
                    "Comprehensive learning experiences across multiple domains."}
                  {index === 3 &&
                    "Recognized excellence at all competitive levels."}
                  {index === 4 &&
                    "Specialized training to prepare students for prestigious competitions."}
                  {index === 5 &&
                    "Expert instructors with industry and academic credentials."}
                  {index === 6 &&
                    "Tailored curriculum designed for various age groups and career paths."}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Recognition Section */}
      <motion.div
        className="py-20 bg-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ y: -20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Our <span className="text-[#991b1b]">National</span> and{" "}
              <span className="text-[#991b1b]">International</span> Recognition
            </h2>
            <div className="w-24 h-1 bg-[#991b1b] mx-auto mb-6"></div>
            <p className="text-center text-gray-600 max-w-3xl mx-auto">
              Our students have excelled at various competitions and events
              around the world, bringing home accolades and recognition for
              their innovative projects and technical skills.
            </p>
          </motion.div>

          <InfiniteCertificateImages items={testimonials} />
        </div>
      </motion.div>

      {/* CTA Section - Enhanced with card design */}
      <motion.div
        className="py-20 bg-gray-50"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4">
          <motion.div
            className="bg-white rounded-2xl shadow-lg p-12 max-w-4xl mx-auto border border-gray-100 relative overflow-hidden"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {/* Decorative elements */}
            <div className="absolute -top-16 -right-16 w-32 h-32 bg-red-50 rounded-full"></div>
            <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-red-50 rounded-full"></div>

            <div className="relative z-10 text-center">
              <motion.h2
                className="text-3xl lg:text-4xl font-bold mb-6"
                initial={{ y: -20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                Ready to Begin Your{" "}
                <span className="text-[#991b1b]">Tech Journey</span>?
              </motion.h2>

              <motion.p
                className="text-xl mb-10 max-w-2xl mx-auto text-gray-600"
                initial={{ y: -20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Join Cyborg Robotics Academy and discover the exciting world of
                robotics, programming, and electronics with our expert guidance.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row justify-center gap-4"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <Link
                  href="https://wa.me/917028511161?text=Hello%20Cyborg,%20I%20am%20looking%20for%20some%20help!%20(Enquiry)"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="bg-[#991b1b] text-white hover:bg-[#7f1d1d] px-8 py-3 rounded-xl font-medium transition-all shadow-md hover:shadow-lg">
                    Enroll Now
                  </button>
                </Link>
                <button className="border border-[#991b1b] text-[#991b1b] hover:bg-[#991b1b] hover:text-white px-8 py-3 rounded-xl font-medium transition-all shadow-sm hover:shadow-md">
                  View Courses
                </button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <Footer />
    </>
  );
};

export default Page;
