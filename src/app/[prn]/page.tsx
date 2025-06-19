"use client";
import React, { use } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { AlertTriangle, BookOpen } from "lucide-react";
import Link from "next/link";

interface Student {
  PrnNumber: string;
  username: string;
  courses: string[];
  courseClassNumbers: {
    [key: string]: string;
  };
}

async function getStudentData(prn: string) {
  const studentsRef = collection(db, "students");
  const q = query(studentsRef, where("PrnNumber", "==", prn));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    return null;
  }

  return querySnapshot.docs[0].data() as Student;
}

function toSlug(course: string) {
  return course
    .toLowerCase()
    .replace(/ & /g, "-and-")
    .replace(/ \+ /g, "-plus-")
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
}

export default function Page({ params }: { params: Promise<{ prn: string }> }) {
  const { prn } = use(params);
  const [student, setStudent] = React.useState<Student | null>(null);
  React.useEffect(() => {
    getStudentData(prn).then(setStudent);
  }, [prn]);

  if (student === null) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-red-800/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-800/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative bg-white rounded-3xl shadow-2xl p-10 max-w-md w-full text-center border border-gray-200">
          <div
            className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
            style={{
              background: "#991b1b",
            }}
          >
            <AlertTriangle className="w-12 h-12 text-white animate-bounce" />
          </div>
          <h2 className="text-3xl font-bold mb-3" style={{ color: "#991b1b" }}>
            Loading Student Data...
          </h2>
        </div>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-red-800/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-800/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative bg-white rounded-3xl shadow-2xl p-10 max-w-md w-full text-center border border-gray-200">
          <div
            className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
            style={{
              background: "#991b1b",
            }}
          >
            <AlertTriangle className="w-12 h-12 text-white animate-bounce" />
          </div>
          <h2 className="text-3xl font-bold mb-3" style={{ color: "#991b1b" }}>
            Student Not Found
          </h2>
          <p className="text-gray-600 text-lg">
            No student found with PRN: {prn}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 mt-20 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-800/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-red-800/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-red-800/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative container mx-auto px-4 py-8">
        {/* Enrolled Courses Section */}
        {student.courses.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-2xl p-12 border border-gray-200 text-center">
            <div className="py-12">
              <div
                className="w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl"
                style={{
                  background: "#991b1b",
                }}
              >
                <BookOpen className="w-16 h-16 text-white opacity-80" />
              </div>
              <h3
                className="text-2xl font-bold mb-4"
                style={{ color: "#991b1b" }}
              >
                No Courses Enrolled
              </h3>
              <p className="text-gray-600 text-lg max-w-md mx-auto">
                This student is not currently enrolled in any courses.
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-200">
            <div className="mb-8">
              <h2
                className="text-3xl font-bold mb-3"
                style={{ color: "#991b1b" }}
              >
                Enrolled Courses
              </h2>
              <p className="text-gray-600 text-lg">
                Currently enrolled in{" "}
                <span className="font-bold" style={{ color: "#991b1b" }}>
                  {student.courses.length}
                </span>{" "}
                course
                {student.courses.length !== 1 ? "s" : ""}
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {student.courses.map((course, index) => (
                <Link
                  key={course}
                  href={`/${student.PrnNumber}/${toSlug(course)}`}
                  className="group relative bg-gray-50 border-2 border-gray-200 rounded-2xl p-6 hover:border-red-800/5 hover:bg-white hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 block cursor-pointer overflow-hidden"
                >
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-red-800/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <div
                    className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg"
                    style={{
                      background: "#991b1b",
                    }}
                  >
                    <span className="text-white font-bold text-sm">
                      {index + 1}
                    </span>
                  </div>

                  <div className="relative z-10 mb-6">
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-xl"
                      style={{
                        background: "#991b1b",
                      }}
                    >
                      <BookOpen className="w-8 h-8 text-white" />
                    </div>

                    <h3
                      className="text-xl font-bold mb-3 line-clamp-2 transition-colors duration-300"
                      style={{ color: "#991b1b" }}
                    >
                      {course}
                    </h3>
                  </div>

                  <div className="relative z-10 bg-white rounded-xl p-4 group-hover:bg-gray-50 transition-all duration-300 border border-gray-200">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-sm font-medium text-gray-600 transition-colors">
                        Assigned Classes
                      </span>
                    </div>

                    <p
                      className="text-lg font-bold transition-colors duration-300 font-mono"
                      style={{ color: "#991b1b" }}
                    >
                      {student.courseClassNumbers[course] || "N/A"}
                    </p>
                  </div>

                  {/* Subtle animation border */}
                  <div className="absolute inset-0 rounded-2xl bg-red-800/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-sm"></div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
