"use client";
import EnquiryPanel from "@/components/EnquiryPanel";
import Image from "next/image";
import React from "react";
import Footer from "@/components/Footer";
import { Testimonials } from "@/components/ui/accordion";
import { motion } from "framer-motion";
const Page = () => {
  const courseCurriculum = [
    {
      id: "1",
      title: "Introduction to IoT & Basic Projects (Level 1)",
      subtitle: [
        "Introduction to IoT (importance of IoT, applications of IoT)",
        "Introduction to ESP8266 (NodeMCU, ESP8266 Pin out)",
        "NodeMCU Setup & Configuration (GPIO, use of digital and analog pins, NodeMCU setup)",
        "LED Blinking Project (Circuit and code to blink LED)",
        "Object Detector using NodeMCU (interfacing of IR sensor, application of object detector)",
        "DHT11 Sensor with ESP8266 (Displaying Temperature and humidity data on serial monitor)",
        "Wi-Fi LED Control (Controlling LED using webpage)",
        "Web Server using DHT11 Sensor (Displaying sensor data on webpage)",
        "Epoch/Unix Time Conversion (Understanding Time Conversion)",
        "ESP8266 in AP Mode & Station Mode (Understanding NodeMCU mode of operations)",
      ],
    },
    {
      id: "2",
      title: "IoT Analytics & Intermediate Projects (Level 2)",
      subtitle: [
        "Introduction to IoT Analytics Platform (ThingSpeak) (understanding ThingSpeak, ThingSpeak Account Setup)",
        "Monitoring Temperature Data using ThingSpeak (Analysing Temp Data using IoT Cloud Platform)",
        "Smart Plant Watering System (Automatic Plant Watering based on Soil Moisture)",
        "Level Detector Project (Calculating Distance using Ultrasonic Sensor)",
        "RGB LED Webserver (Controlling RGB LED using Webpage)",
        "Introduction to Blynk (Understanding Blynk Dashboard, Blynk Account Setup)",
        "Controlling LED & Servo Motor Using Blynk (Remote Control of LED & Servo Motor)",
        "Burglar Alarm System (Detecting Unauthorized Entry using PIR Sensor & Blynk)",
        "Smoke Detector System (Hazardous Gas Leak Detection)",
        "LCD Display with Blynk & ESP8266 (Using LCD Widgets to Display Data)",
      ],
    },
    {
      id: "3",
      title: "Advanced IoT Projects (Level 3)",
      subtitle: [
        "Patient Monitoring System (ICU Patient Monitoring with IoT)",
        "Stepper Motor Control (Controlling Stepper Motor using ESP8266)",
        "Smart Car Project (Wi-Fi Controlled Robo Car)",
        "Smart TDS Meter (Measuring TDS of Water using ESP8266)",
        "Automatic Street Lights (Automatic Street Lights Based on Sunlight)",
        "Home Automation System (Controlling Home Appliances using ESP8266 & Mobile App)",
        "Smart Pet Feeder (Automated Pet Feeder System)",
        "Smart Weather Station (Remote Weather Monitoring & Prediction System)",
        "Smart Parking System (Enhancing Parking Efficiency)",
        "GPS Tracking System (GPS Coordinates Transmitter & Receiver)",
      ],
    },
  ];

  console.log(courseCurriculum);

  const enquiryPanelData = [
    {
      mode: "Online & Offline",

      duration: "16 CLASSES (x3 LEVELS) (1 HOUR PER CLASS)  ",
    },
  ];
  return (
    <div className="mx-auto max-w-7xl ">
      <div className="mt-32 px-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="my-4 text-3xl text-red-800 font-bold uppercase"
        >
          IOT
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex  md:w-[500px]  my-5 mx-auto   rounded-3xl overflow-hidden border"
        >
          <Image
            src="/assets/classroom-course/iot.webp"
            alt="Course Curriculum webp"
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
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="my-4 w-[80%] mx-auto text-left"
        >
          The Internet of Things (IoT) refers to a network of interconnected
          physical devices, such as sensors, appliances, and vehicles, that
          collect, exchange, and analyze data through the internet. These
          devices communicate with each other and can be controlled remotely,
          enabling automation and smarter decision-making. IoT enhances
          efficiency in various fields, including healthcare, agriculture,
          manufacturing, and smart homes, by providing real-time insights and
          enabling predictive actions.
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
        <Testimonials testimonials={courseCurriculum} />
      </motion.div>
      <Footer />
    </div>
  );
};

export default Page;
