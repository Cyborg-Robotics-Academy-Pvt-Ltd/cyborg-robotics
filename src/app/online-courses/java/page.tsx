import EnquiryPanel from "@/components/EnquiryPanel";
import Image from "next/image";
import React from "react";
import Footer from "@/components/Footer";
import { Testimonials } from "@/components/ui/accordion";

const Page = () => {
  const javaCurriculum = [
    {
      id: "1",
      title: "Level 1: Java Basics (16 Classes)",
      subtitle: [
        "Java Home: Introduction to Java, setting up JDK, configuring environment variables.",
        "Java Introduction: History, features, JVM & JRE.",
        "Getting Started with Java: Writing first program, compiling & running.",
        "Java Syntax: Program structure, keywords, identifiers, semicolons & braces.",
        "Java Output: System.out.println(), formatting output.",
        "Java Comments: Single-line, multi-line, documentation comments.",
        "Java Variables: Declaring & initializing variables, variable scope.",
        "Java Data Types: Primitive, non-primitive types, type inference.",
        "Java Type Casting: Implicit & explicit casting, type conversion.",
        "Java Operators: Arithmetic, relational, logical operators.",
        "Java Strings: Declaration, initialization, string methods.",
        "Java Math: Math class methods, basic operations.",
        "Java Booleans: Boolean data type, logical expressions.",
        "Java Control Flow Statements: If...Else, switch, nested statements.",
        "Java Loops: While, for, do-while loops.",
        "Java Break & Continue: Break and continue statements in loops.",
        "Java Arrays: Declaration, initialization, multidimensional arrays.",
      ],
    },
    {
      id: "2",
      title: "Level 2: Java Intermediate Concepts (16 Classes)",
      subtitle: [
        "Java Methods: Defining & calling methods, return types, parameters.",
        "Java Method Parameters: Passing parameters, varargs.",
        "Java Method Overloading: Overloading by parameters and data types.",
        "Java Scope: Method, class & block scope.",
        "Java Recursion: Recursive methods, recursion vs iteration.",
        "Java Classes: Defining classes & objects, access modifiers.",
        "Java OOP: Encapsulation, inheritance, polymorphism, abstraction.",
        "Java Class Attributes: Instance & static variables, final variables.",
        "Java Class Methods: Instance & static methods, method overriding.",
        "Java Constructors: Default & parameterized constructors, overloading.",
        "Java Modifiers: Access modifiers, non-access modifiers.",
        "Java Encapsulation: Getters & setters, benefits of encapsulation.",
        "Java Packages & APIs: Creating & importing packages.",
        "Java Inheritance: Types, super keyword.",
        "Java Polymorphism: Compile-time vs runtime polymorphism, method overloading vs overriding.",
        "Java Inner Classes: Member & static nested classes, anonymous classes.",
        "Java Abstraction: Abstract classes & methods, interfaces.",
        "Java Interfaces: Defining interfaces, implementing multiple interfaces.",
      ],
    },
    {
      id: "3",
      title: "Level 3: Java Advanced Features (16 Classes)",
      subtitle: [
        "Java Enums: Defining enums, using in switch statements.",
        "Java User Input: Scanner class, handling input exceptions.",
        "Java Date and Time: Date & Calendar classes, LocalDate & LocalDateTime.",
        "Java ArrayList: Creating ArrayLists, common methods.",
        "Java LinkedList: Creating LinkedLists, ArrayList vs LinkedList.",
        "Java List Sorting: Sorting with Comparable & Comparator.",
        "Java HashMap: Creating HashMaps, common methods.",
        "Java HashSet: Creating HashSets, HashSet vs List.",
        "Java Iterator: Using iterators, fail-fast vs fail-safe iterators.",
        "Java Wrapper Classes: Autoboxing & unboxing.",
        "Java Exceptions: Try-catch blocks, custom exceptions.",
        "Java Regular Expressions: Pattern & Matcher classes.",
        "Java Threads: Creating threads, synchronization.",
        "Java Lambda Expressions: Lambda syntax, using lambdas with collections.",
        "Java Advanced Sorting: Sorting with streams.",
        "Java File Handling: File class, file paths, reading & writing with NIO.",
        "Java File Operations: Creating, reading, deleting files.",
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
        <h1 className="my-4 text-3xl text-red-800 font-bold">Java </h1>
        <div className="flex  md:w-[500px]  my-5 mx-auto   rounded-3xl overflow-hidden border">
          <Image
            src="/assets/online-course/html.webp"
            alt="Course Curriculum webp"
            width={600}
            height={300}
            layout="intrinsic"
            className="object-contain"
          />
        </div>
        <EnquiryPanel data={enquiryPanelData} />
        <p className="my-4 w-[80%] mx-auto text-left">
          Java is a widely used programming language, created in 1995 and owned
          by Oracle. It powers over 3 billion devices worldwide. Known for its
          platform independence, security, and scalability, Java is used in
          various domains, including mobile applications (Android apps), desktop
          software, web applications, web servers, enterprise solutions, games,
          and database connections. Its &quot;Write Once, Run Anywhere&quot;
          (WORA) capability allows developers to build cross-platform
          applications efficiently. Java rich ecosystem, including frameworks
          like Spring and Hibernate, makes it a top choice for businesses and
          developers. With strong community support, Java continues to be a
          leading language in modern software development.
        </p>
      </div>
      <div className="mx-4 md:mx-20">
        <h2 className="text-center text-2xl font-bold uppercase text-red-800">
          Detailed Curriculum
        </h2>
      </div>
      <Testimonials testimonials={javaCurriculum} />
      <Footer />
    </div>
  );
};

export default Page;
