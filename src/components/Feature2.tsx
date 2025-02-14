"use client";
import React from "react";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";

const Feature2: React.FC = () => {


  const testimonials = [
    {
      quote:
        "Learning robotics has opened up a world of opportunities. It has allowed me to explore new technologies and understand the intricacies of how machines work. The knowledge and skills I have gained through robotics have been invaluable in my career. I have been able to apply these skills in various projects, leading to innovative solutions and improved efficiency.",
      src: "/assets/photo (1).jpeg",
    },
    {
      quote:
        "The hands-on experience with robotics has been invaluable. It has provided me with a deep understanding of how robotic systems operate and how to design and build them. Through practical projects and experiments, I have learned to troubleshoot and optimize robotic systems, ensuring they function efficiently and effectively. This hands-on experience has also improved my technical skills, such as programming, electronics, and mechanical design.",
      src: "/assets/photo (2).jpeg",
    },
    {
      quote:
        "Robotics has taught me critical problem-solving skills. It has challenged me to think creatively and find innovative solutions to complex problems. Through robotics, I have learned to break down problems into smaller, manageable tasks and develop step-by-step solutions. This systematic approach has not only improved my problem-solving abilities but also enhanced my analytical thinking and logical reasoning.",
      src: "/assets/photo (3).jpeg",
    },
    {
      quote:
        "The future of technology is in robotics, and I'm excited to be a part of it. Robotics is at the forefront of technological advancements, and being involved in this field has given me a glimpse into the future. I have witnessed firsthand how robotics is revolutionizing industries and transforming the way we live and work. From automation and artificial intelligence to autonomous vehicles and medical robotics, the possibilities are endless.",
      src: "/assets/photo (4).jpeg",
    },
  ];
  return (
    <div className="bg-white text-black">
      <h1 className="text-center font-bold text-2xl  md:text-3xl mt-10 font-serif ">
        Why {""}
        <span className="text-[#8D0F11]">Learn Robotics ?</span>
      </h1>
      <AnimatedTestimonials testimonials={testimonials} />
    </div>
  );
};

export default Feature2;
