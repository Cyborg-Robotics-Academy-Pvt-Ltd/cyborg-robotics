import EnquiryPanel from "@/components/EnquiryPanel";
import Image from "next/image";
import React from "react";
import Footer from "@/components/Footer";
import { Testimonials } from "@/components/ui/accordion";

const Page = () => {
  const pythonCourseData = [
    {
      id: "1",
      title: "Level 1: Introduction to Python Basics",
      subtitle: [
        "Overview of Python language and syntax.",
        "Variables, data types, and operators.",
        "Print statements and input/output (I/O).",
        "Conditional statements: if, else, elif.",
        "Loops: for and while.",
        "Lists and tuples for storing data.",
        "Defining functions, understanding scope, and using modules.",
        "Turtle Graphics - Create basic shapes and patterns.",
        "Project - Build a simple calculator for arithmetic operations.",
      ],
    },
    {
      id: "2",
      title: "Level 2: Intermediate Python",
      subtitle: [
        "List slicing and comprehensions.",
        "Working with dictionaries for key-value operations.",
        "Read/write operations with files.",
        "Handling exceptions to prevent runtime errors.",
        "Classes, objects, inheritance, and methods.",
        "Turtle Racing Game - Create a racing game with multiple turtles.",
        "Project - To-Do List Application using OOP and file handling.",
      ],
    },
    {
      id: "3",
      title: "Level 3: Advanced Python",
      subtitle: [
        "Work with lambda functions, closures, and decorators.",
        "Use regex for pattern matching in strings.",
        "Project - Build a text analyzer that extracts data from user input.",
      ],
    },
    {
      id: "4",
      title: "Level 4: Game Development with Turtle Graphics",
      subtitle: [
        "Ball Game - Create a bouncing ball game.",
        "Space Invader - Build a space-themed shooting game.",
        "Brick Breaker - Design a brick breaker game.",
        "Maze Game - Guide the Turtle through obstacles to a goal.",
        "Pacman Clone - Develop a Pacman-style game.",
        "Jump and Run Game - Implement a side-scrolling game.",
        "Flappy Turtle - Build a Flappy Bird-inspired game.",
        "Turtle Racing Game - Advanced race with custom speed and path.",
        "Shooting Game - Design a shooting game with moving targets.",
      ],
    },
    {
      id: "5",
      title: "Level 5: Python Libraries and Advanced Applications",
      subtitle: [
        "Data manipulation with NumPy and Pandas.",
        "Data visualization with Matplotlib and Seaborn.",
        "Web Scraping with BeautifulSoup.",
        "Interacting with APIs to gather data.",
        "Project - Analyze a dataset and visualize insights.",
      ],
    },
    {
      id: "6",
      title: "Level 6: Advanced Python Applications",
      subtitle: [
        "Django or Flask - Build basic web applications.",
        "SQL Integration - Perform queries using SQLite.",
        "Machine Learning - Implement regression and classification models.",
        "Project - Build a basic machine learning application.",
      ],
    },
  ];

  return (
    <div className="mx-auto max-w-7xl ">
      <div className="mt-32 px-4 text-center">
        <h1 className="my-4 text-3xl text-red-800 font-bold">
          Python Programming{" "}
        </h1>
        <div className="flex  md:w-[300px]  my-5 mx-auto   rounded-3xl overflow-hidden border">
          <Image
            src="/assets/online-course/python.gif"
            alt="Course Curriculum GIF"
            width={300}
            height={200}
            layout="intrinsic"
            className="object-contain"
          />
        </div>
        <EnquiryPanel />
        <p className="my-4 w-[90%] mx-auto text-left">
          Python is a programming language that lets you work quickly and
          integrate systems more effectively. It is a general purpose and a
          high-level programming language, allow you to focus on core
          functionality of the application by taking care of common programming
          tasks. You can use Python for developing desktop GUI applications,
          websites and web applications
        </p>
        <div className="mx-16">
          <h2 className="text-3xl font-bold text-left">Course Curriculum</h2>
          <ul className="list-disc list-inside text-left my-4 space-y-2">
            <li>Sequencing</li>
            <li>Logic Arts</li>
            <li>Loops</li>
            <li>Logic Puzzles</li>
            <li>Events</li>
            <li>Basic Animated Story</li>
          </ul>
        </div>
      </div>
      <div className="mx-4 md:mx-20">
        <h2 className="text-center text-2xl font-bold ">
          Course Curriculum in Detail
        </h2>
      </div>
      <Testimonials testimonials={pythonCourseData} />
      <Footer />
    </div>
  );
};

export default Page;
