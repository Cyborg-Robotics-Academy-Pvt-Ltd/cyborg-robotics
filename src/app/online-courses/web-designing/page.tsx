import EnquiryPanel from "@/components/EnquiryPanel";
import Image from "next/image";
import React from "react";
import Footer from "@/components/Footer";
import { Testimonials } from "@/components/ui/accordion";

const Page = () => {
  const courseData = [
    {
      id: "1",
      title: "Level 1: Introduction to Web Technologies",
      subtitle: [
        "Understanding the Internet and Websites.",
        "HTML Basics: Tags, elements, and attributes.",
        "Enhanced HTML Elements and basic CSS introduction.",
        "Project: Create a personal introduction web page.",
      ],
    },
    {
      id: "2",
      title: "Level 2: Styling and Layouts with CSS",
      subtitle: [
        "CSS Layout Techniques: Margins, paddings, and borders.",
        "Responsive Design Basics using media queries.",
        "Advanced HTML and CSS styling with Grid and Forms.",
        "Project: Create a photo gallery or a survey form.",
      ],
    },
    {
      id: "3",
      title: "Level 3: Introduction to JavaScript",
      subtitle: [
        "JavaScript Basics: Variables, data types, and functions.",
        "Event Handling and Interactivity using DOM manipulation.",
        "Asynchronous JavaScript and API integration.",
        "Project: Develop a to-do list or a weather app.",
      ],
    },
    {
      id: "4",
      title: "Level 4: Introduction to Databases",
      subtitle: [
        "Understanding Databases: SQL vs NoSQL.",
        "Introduction to MongoDB and CRUD operations.",
        "SQL Basics: Queries and relational databases.",
        "Project: Build a user authentication system with MongoDB.",
      ],
    },
  ];

  return (
    <div className="mx-auto max-w-7xl ">
      <div className="mt-32 px-4 text-center">
        <h1 className="my-4 text-3xl text-red-800 font-bold">WEB DESIGNING </h1>
        <div className="flex  md:w-[500px]  my-5 mx-auto   rounded-3xl overflow-hidden border">
          <Image
            src="/assets/online-course/html.gif"
            alt="Course Curriculum GIF"
            width={600}
            height={300}
            layout="intrinsic"
            className="object-contain"
          />
        </div>
        <EnquiryPanel />
        <p className="my-4 w-[90%] mx-auto text-left">
          HTML (Hypertext Markup Language) and CSS (Cascading Style Sheets) are
          two of the core technologies for building Web pages. HTML is the
          foundation of all web pages. It defines the structure of a page, while
          CSS defines its style. HTML and CSS are the beginning of everything
          you need to know to make your first web page!
        </p>
        <div className="mx-16">
          <h2 className="text-3xl font-bold text-left">Course Curriculum</h2>
          <ul className="list-disc list-inside text-left my-4 space-y-2">
            <li>Understanding the Internet and Websites </li>
            <li>HTML & CSS basics to Advanced</li>
            <li>Javascript</li>
            <li>Database</li>
            <li>projects</li>
          </ul>
        </div>
      </div>
      <div className="mx-4 md:mx-20">
        <h2 className="text-center text-2xl font-bold ">
          Course Curriculum in Detail
        </h2>
      </div>
      <Testimonials testimonials={courseData} />
      <Footer />
    </div>
  );
};

export default Page;
