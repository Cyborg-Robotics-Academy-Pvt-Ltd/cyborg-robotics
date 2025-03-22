"use client";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import Head from "next/head";

import Footer from "@/components/Footer";
import { InfiniteCertificateImages } from "@/components/ui/inifinite-moving-certificate";

const Page = () => {
  const listItems = [
    "12+ Years of Expertise",
    "6000+ Students Trained",
    "100,000+ Classes Conducted",
    "15+ Regional, National, and International Awards and Competitions Won",
    "Training for Competitions – Regional, National, and International",
    "Certified Trainers and Instructors",
    "Age-Appropriate Foundation and Career-Oriented Courses",
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
      <motion.div
        className="lg:mt-28 mt-6 mx-auto lg:w-[80%]  px-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0 }}
      >
        <motion.div
          className="mx-auto flex md:flex-row justify-center items-center w-full"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h1 className="text-3xl font-bold text-center md:text-left">
            About Us
          </h1>
        </motion.div>
        <motion.p
          className="mt-6 text-xl text-justify"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          We Cyborg Robotics Academy Private Limited are one of the leading
          academies centered in Pune that is offering numerous technical
          classroom and online courses such as Lego Robotics, Electronics,
          Arduino, IOT, Python Language, HTML, App-Designing, 3D Printing,
          Animation and Coding etc. all under one roof.
        </motion.p>
        <motion.p
          className="mt-4 text-xl "
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          All our programs are based on the Learning by Doing methodology,
          encouraging students to develop problem solving, decision making and
          scientific inquiry skills and comprehend abstract concepts in a play
          way method. It allows them to investigate, plan, test and implement
          their ideas thus focus on application of the CS- STEM concepts and
          themes.
        </motion.p>
        <motion.p
          className="mt-4 text-xl "
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          Please note, the courses and programs offered vary according to the
          age of a child. Each class consists of hands on learning, building and
          programming of new working robotic model along with explanation of its
          relation to real life application and understanding of its concepts.
        </motion.p>
        <motion.ul
          className="mt-8 list-none pl-5 text-xl "
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <motion.h1
            className="text-3xl ml-10 font-bold my-2 text-center md:text-left"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.2 }}
          >
            Know Us
          </motion.h1>
          {listItems.map((item, index) => (
            <motion.li
              key={index}
              className="mb-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.4 + index * 0.2 }}
            >
              <div className="flex items-center">
                <Image
                  src={"/assets/logo1.png"}
                  alt=""
                  width={40}
                  height={40}
                />
                <span className="ml-2">{item}</span>
              </div>
            </motion.li>
          ))}
        </motion.ul>
        <motion.div
          className="bg-white text-black mt-20 px-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className=""
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            viewport={{ once: true }}
          >
            <h1 className="text-center font-bold text-2xl md:text-3xl mt-10">
              Our{" "}
              <span className="text-[#8D0F11]">
                National <span className="text-black ">and</span> International
                Recognition{" "}
              </span>
            </h1>
            <InfiniteCertificateImages items={testimonials} />
          </motion.div>
        </motion.div>

        <Footer />
      </motion.div>
    </>
  );
};

export default Page;
