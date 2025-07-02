"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "../../../firebaseConfig";
import { doc, getDoc, onSnapshot, DocumentData } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import Link from "next/link";
import { ClipboardList } from "lucide-react";

const StudentDashboard = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [studentData, setStudentData] = useState<DocumentData | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push("/login");
        return;
      }

      try {
        // Check if user exists in students collection
        const studentDocRef = doc(db, "students", user.uid);
        const studentDoc = await getDoc(studentDocRef);

        if (!studentDoc.exists()) {
          router.push("/login");
          return;
        }

        // Verify stored role matches
        const storedRole = localStorage.getItem("userRole");
        if (storedRole !== "student") {
          router.push("/login");
          return;
        }

        // Set up real-time listener for student data
        const unsubscribeDoc = onSnapshot(studentDocRef, (doc) => {
          if (!doc.exists()) {
            router.push("/login");
            return;
          }
          setStudentData(doc.data());
          setLoading(false);
        });

        // Clean up the document listener when component unmounts
        return () => unsubscribeDoc();
      } catch (error) {
        console.error("Error verifying student role:", error);
        router.push("/login");
      }
    });

    // Clean up the auth listener when component unmounts
    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="h-16 w-16 rounded-full border-4 border-t-blue-500 border-r-blue-200 border-b-blue-200 border-l-blue-200 animate-spin mb-4"></div>
        <div className="text-xl font-medium text-gray-700">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pt-20">
        {/* Welcome Section */}
        <div className="mb-8 bg-gradient-to-r from-[#991b1b] to-[#991b1b] p-6 rounded-xl shadow-md relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mr-20 -mt-20"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-white opacity-10 rounded-full -ml-10 -mb-10"></div>
          <div className="relative z-10">
            <h1 className="text-3xl font-bold text-white">
              Welcome back, {studentData?.name || "Student"}!
            </h1>
            <p className="mt-2 text-red-100">
              {studentData?.email || "Your email"}
            </p>
          </div>
        </div>

        {/* Assigned Courses Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Assigned Courses
          </h2>
          {studentData?.courses && studentData.courses.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {studentData.courses.map(
                (
                  course: { name: string; level: string; classNumber: string },
                  idx: number
                ) => {
                  // Demo: course icon (use emoji or static image, or map to real icons if available)
                  const courseIcons: Record<string, string> = {
                    Python: "🐍",
                    Java: "☕",
                    Arduino: "🔌",
                    "3D Printing": "🖨️",
                    "Web Designing": "💻",
                    // Add more mappings as needed
                  };
                  const icon = courseIcons[course.name] || "📘";
                  return (
                    <Link
                      key={idx}
                      href={`/student-dashboard/course-analytics/${encodeURIComponent(course.name)}`}
                    >
                      <div className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-200 border-l-8 border-[#991b1b] cursor-pointer group relative overflow-hidden">
                        {/* Icon */}
                        <div className="absolute top-4 right-4 text-4xl opacity-20 group-hover:opacity-30 transition-opacity">
                          {icon}
                        </div>
                        <div className="flex items-center mb-2">
                          <span className="text-2xl mr-3">{icon}</span>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {course.name}
                          </h3>
                          <span className="ml-auto bg-[#f3d6d6] text-[#991b1b] text-xs font-bold px-2 py-1 rounded-full">
                            {course.level}
                          </span>
                        </div>
                        <p className="text-gray-600 mb-1">
                          Class: {course.classNumber}
                        </p>
                      </div>
                    </Link>
                  );
                }
              )}
            </div>
          ) : (
            <div className="text-gray-500">No courses assigned yet.</div>
          )}
        </div>

        {/* Media Card Only */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <Link href="/student-dashboard/media">
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 h-full border-t-4 border-purple-500">
              <div className="flex items-center mb-4">
                <div className="p-3 rounded-lg bg-purple-100 text-purple-600 mr-4">
                  <ClipboardList className="h-6 w-6" />
                </div>
                <h2 className="text-xl font-semibold text-gray-800">Media</h2>
              </div>
              <div className="space-y-4">
                <p className="text-gray-600">
                  Access course materials, videosand learning resources
                </p>
                <div className="mt-4 flex items-center text-sm font-medium text-purple-600">
                  Browse media
                  <svg
                    className="ml-2 w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
