"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "../../../firebaseConfig";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import Link from "next/link";
import {
  UserRoundPlus,
  ClipboardCheck,
  CheckSquare,
  Loader2,
  ArrowRight,
  GraduationCap,
} from "lucide-react";

const TrainerDashboard = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push("/login");
        return;
      }

      try {
        // Check if user exists in trainers collection
        const trainerDocRef = doc(db, "trainers", user.uid);
        const trainerDoc = await getDoc(trainerDocRef);

        if (!trainerDoc.exists()) {
          router.push("/login");
          return;
        }

        // Verify stored role matches
        const storedRole = localStorage.getItem("userRole");
        if (storedRole !== "trainer") {
          router.push("/login");
          return;
        }

        // Set up real-time listener for trainer data
        const unsubscribeDoc = onSnapshot(trainerDocRef, (doc) => {
          if (!doc.exists()) {
            router.push("/login");
            return;
          }
          setLoading(false);
        });

        // Clean up the document listener when component unmounts
        return () => unsubscribeDoc();
      } catch (error) {
        console.error("Error verifying trainer role:", error);
        router.push("/login");
      }
    });

    // Clean up the auth listener when component unmounts
    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <Loader2 className="h-12 w-12 text-indigo-600 animate-spin mb-4" />
        <div className="text-xl font-medium text-gray-700">
          Loading trainer dashboard...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 md:mt-20">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Trainer Dashboard
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Create Student Card */}
          <Link href="/admin/create-user" className="group">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 h-full">
              <div className="p-6">
                <div className="flex items-center">
                  <div className="p-3 rounded-lg bg-red-100 text-red-600">
                    <UserRoundPlus className="h-6 w-6" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-red-600 transition-colors">
                      Create New Student
                    </h3>
                    <div className="mt-1 text-sm text-gray-500">
                      Add new students to your classes
                    </div>
                  </div>
                </div>
                <div className="mt-4 text-sm text-red-600 flex items-center">
                  Add students
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </Link>

          {/* Tasks Management Card */}
          <Link href="/trainer-dashboard/create-task" className="group">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 h-full">
              <div className="p-6">
                <div className="flex items-center">
                  <div className="p-3 rounded-lg bg-blue-100 text-blue-600">
                    <ClipboardCheck className="h-6 w-6" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      Tasks Management
                    </h3>
                    <div className="mt-1 text-sm text-gray-500">
                      Manage tasks and to-do lists
                    </div>
                  </div>
                </div>
                <div className="mt-4 text-sm text-blue-600 flex items-center">
                  Manage tasks
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </Link>
          {/* Users Management Card */}
          <Link href="/student-list" className="group">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 h-full">
              <div className="p-6">
                <div className="flex items-center">
                  <div className="p-3 rounded-lg bg-green-100 text-green-600">
                    <GraduationCap className="h-6 w-6" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-green-600 transition-colors">
                      Student List
                    </h3>
                    <div className="mt-1 text-sm text-gray-500">
                      View and manage the list of students and trainers
                    </div>
                  </div>
                </div>
                <div className="mt-4 text-sm text-green-600 flex items-center">
                  View list
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </Link>
          {/* Assignments Card */}
          <Link href="/trainer-dashboard/assignments" className="group">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 h-full">
              <div className="p-6">
                <div className="flex items-center">
                  <div className="p-3 rounded-lg bg-teal-100 text-teal-600">
                    <CheckSquare className="h-6 w-6" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-teal-600 transition-colors">
                      Assignments
                    </h3>
                    <div className="mt-1 text-sm text-gray-500">
                      Create and grade student assignments
                    </div>
                  </div>
                </div>
                <div className="mt-4 text-sm text-teal-600 flex items-center">
                  Manage assignments
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TrainerDashboard;
