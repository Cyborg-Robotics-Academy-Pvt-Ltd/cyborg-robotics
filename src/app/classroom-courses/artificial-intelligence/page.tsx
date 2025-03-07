"use client";
import EnquiryPanel from "@/components/EnquiryPanel";
import Image from "next/image";
import React from "react";
import Footer from "@/components/Footer";
import { Testimonials } from "@/components/ui/accordion";
import { motion } from "framer-motion";
const Page = () => {
  const courseData = [
    {
      id: "1",
      title: "Level 1: Introduction to Artificial Intelligence",
      subtitle: [
        "Understanding the basics of Artificial Intelligence.",
        "History and evolution of AI.",
        "Applications and domains of AI.",
        "Differences between AI and Machine Learning.",
        "Introduction to supervised, unsupervised, and reinforcement learning.",
        "Overview of data and feature engineering.",
        "Basics of neural networks and their structure.",
        "Working principles of perceptrons and activation functions.",
        "Introduction to forward and backpropagation.",
        "Project: Implementing a simple chatbot using Python with rule-based responses.",
      ],
    },
    {
      id: "2",
      title: "Level 2: Intermediate Machine Learning",

      subtitle: [
        "Understanding linear and logistic regression.",
        "Introduction to decision trees and K-nearest neighbors (KNN).",
        "K-means and hierarchical clustering algorithms.",
        "Basics of Principal Component Analysis (PCA).",
        "Key metrics: accuracy, precision, recall, and F1-score.",
        "Cross-validation and hyperparameter tuning.",
        "Project: Implement a supervised learning project using real datasets.",
      ],
    },
    {
      id: "3",
      title: "Level 3: Advanced Machine Learning",

      subtitle: [
        "Introduction to deep neural networks and architectures.",
        "Core concepts of deep learning.",
        "Fundamentals of CNNs for image recognition.",
        "Implementing CNNs using TensorFlow or Keras.",
        "Basics of RNNs for sequential data analysis.",
        "Application of RNNs in natural language processing.",
        "Project: Implement an image recognition project using CNNs on a real dataset.",
      ],
    },
    {
      id: "4",
      title: "Level 4: Natural Language Processing (NLP)",

      subtitle: [
        "Basics of NLP and its applications.",
        "Overview of text preprocessing techniques.",
        "Building text classification models for sentiment analysis.",
        "Introduction to word embeddings and word2vec.",
        "Implementing NER to extract entities from text.",
        "Basics of text generation using RNNs.",
        "Project: Create a text generation or analysis project using NLP techniques.",
      ],
    },
    {
      id: "5",
      title: "Level 5: Advanced Topics in AI",

      subtitle: [
        "Introduction to reinforcement learning and its applications.",
        "Understanding Markov Decision Processes (MDPs) and Q-learning.",
        "Basics of GANs and their use in generating synthetic data.",
        "Principles of GANs and how they function.",
        "Importance of ethics in AI.",
        "Discussion on fairness, transparency, and bias in AI systems.",
        "Project: Develop an AI project using techniques such as reinforcement learning or GANs.",
      ],
    },
  ];
  const enquiryPanelData = [
    {
      mode: "online & offline",

      duration: "16 CLASSES (x5 LEVELS)    (1 HOUR PER CLASS) ",
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
          Artificial Intelligence{" "}
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex  md:w-[400px] md:h-[300px]  my-5 mx-auto   rounded-3xl overflow-hidden border"
        >
          <Image
            src="/assets/online-course/aigif.webp"
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
          Artificial Intelligence (AI) is a computer program which is capable of
          performing a task which requires intelligence. This task is usually
          something which a human or an intelligent animal can accomplish, such
          as learning, planning, problem-solving, etc. It is the endeavour to
          replicate or simulate human intelligence in machines.AI can provide
          just-in-time assessment by leveraging learning analytics and data to
          find changes in confidence and motivation levels in individual
          students.
        </motion.p>
      </div>
      <motion.h2
        className="text-center text-2xl font-bold uppercase text-red-800"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Detailed Curriculum
      </motion.h2>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Testimonials testimonials={courseData} />
      </motion.div>
      <Footer />
    </div>
  );
};

export default Page;
