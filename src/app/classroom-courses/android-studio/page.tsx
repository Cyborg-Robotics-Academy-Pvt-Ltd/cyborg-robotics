"use client";
import EnquiryPanel from "@/components/EnquiryPanel";
import Image from "next/image";
import React from "react";
import Footer from "@/components/Footer";
import { Testimonials } from "@/components/ui/accordion";
import { motion } from "framer-motion";

const Page = () => {
  const androidCurriculum = [
    {
      id: "1",
      title: "Level 1: Beginner (Fundamentals of Android Development)",
      subtitle: [
        "Intro to Android & Java: Setup, basic Java concepts, activity lifecycle, and fragments.",
        "UI & Widgets: Layouts, Views, OnClickListeners, simple calculator app.",
        "Navigation & Data: Intents, SharedPreferences, basic networking, permission handling.",
        "Debugging & Jetpack: Logcat, Jetpack basics, simple to-do list app.",
      ],
    },
    {
      id: "2",
      title: "Level 2: Intermediate (Advanced Android Concepts)",
      subtitle: [
        "UI & Custom Views: Advanced layouts, custom views, notifications.",
        "Services & Networking: Background tasks, Retrofit for APIs, Room for database.",
        "Sensors & Firebase: Using sensors, GPS, Firebase for chat and notifications.",
        "Design & Animations: Material Design, animations, data binding.",
        "Project: Build a weather app using Retrofit and Room.",
      ],
    },
    {
      id: "3",
      title: "Level 3: Advanced (Enterprise Android Development)",
      subtitle: [
        "Coroutines & DI: Kotlin coroutines, Dagger/Hilt for dependency injection.",
        "Jetpack Compose & Architecture: UI with Compose, Clean Architecture principles.",
        "Advanced Features: WorkManager, security, Firebase Firestore, app bundles.",
        "Testing & Optimization: CI/CD, unit testing, performance optimization.",
        "Final Project: Build an E-commerce app with advanced concepts.",
      ],
    },
  ];

  const enquiryPanelData = [
    {
      mode: "Online & Offline",

      duration: "16 CLASSES(x3 LEVELS) (1 HOUR PER CLASS) ",
    },
  ];
  return (
    <div className="mx-auto max-w-7xl ">
      <div className="mt-32 px-4 text-center">
        <motion.h1
          className="my-4 text-3xl text-red-800 font-bold"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Android Studio{" "}
        </motion.h1>

        <motion.div
          className="flex md:w-[500px] my-5 mx-auto rounded-3xl overflow-hidden border"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Image
            src="/assets/classroom-course/androidstudio.png"
            alt="Course Curriculum "
            width={600}
            height={300}
            layout="intrinsic"
            className="object-contain"
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
          className="my-4 w-[80%] mx-auto text-left"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Android Studio is the official integrated development environment
          (IDE) for building Android applications. Developed by Google, it
          provides tools and resources for coding, designing, debugging and
          testing Android apps. It supports programming languages like Java,
          Kotlin and XML, with features like a visual layout editor, real-time
          previews and an emulator to simulate apps on different devices.
          Android Studio integrates with version control systems and the Google
          Play Store, streamlining the development-to-deployment process.
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
        <Testimonials testimonials={androidCurriculum} />
      </motion.div>
      <Footer />
    </div>
  );
};

export default Page;
