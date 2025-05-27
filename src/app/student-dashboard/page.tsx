"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "../../../firebaseConfig";
import { doc, getDoc, onSnapshot, DocumentData } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import Link from "next/link";
import { BookOpen, Calendar, ClipboardList } from "lucide-react";

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
    <div className="min-h-screen bg-gray-50 mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pt-20">
        {/* Welcome Section */}
        <div className="mb-8 bg-gradient-to-r from-blue-500 to-indigo-600 p-6 rounded-xl shadow-md relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mr-20 -mt-20"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-white opacity-10 rounded-full -ml-10 -mb-10"></div>
          <div className="relative z-10">
            <h1 className="text-3xl font-bold text-white">
              Welcome back, {studentData?.name || "Student"}!
            </h1>
            <p className="mt-2 text-blue-100">
              {studentData?.email || "Your email"}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Course Progress Card */}
          <Link href="/student-dashboard/course-progress">
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 h-full border-t-4 border-blue-500">
              <div className="flex items-center mb-4">
                <div className="p-3 rounded-lg bg-blue-100 text-blue-600 mr-4">
                  <BookOpen className="h-6 w-6" />
                </div>
                <h2 className="text-xl font-semibold text-gray-800">
                  Course Progress
                </h2>
              </div>
              <div className="space-y-4">
                <p className="text-gray-600">
                  Track your learning journey and view completed modules
                </p>
                <div className="mt-4 flex items-center text-sm font-medium text-blue-600">
                  View progress details
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

          {/* Upcoming Classes Card */}
          <Link href="/student-dashboard/upcoming-tasks">
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 h-full border-t-4 border-green-500">
              <div className="flex items-center mb-4">
                <div className="p-3 rounded-lg bg-green-100 text-green-600 mr-4">
                  <Calendar className="h-6 w-6" />
                </div>
                <h2 className="text-xl font-semibold text-gray-800">
                  Upcoming Classes
                </h2>
              </div>
              <div className="space-y-4">
                <p className="text-gray-600">
                  View your scheduled classes and prepare for your next sessions
                </p>
                <div className="mt-4 flex items-center text-sm font-medium text-green-600">
                  Check schedule
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

          {/* Media Card */}
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
                  Access course materials, videos, and learning resources
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
