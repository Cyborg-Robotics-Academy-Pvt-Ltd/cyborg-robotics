"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "../../../firebaseConfig";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import Link from "next/link";

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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Trainer Dashboard
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Create Student Card */}
          <Link href="/admin/create-user">
            <div className="bg-white overflow-hidden shadow rounded-lg cursor-pointer hover:shadow-md transition-shadow duration-300">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-red-100 rounded-md p-3">
                    <svg
                      className="h-6 w-6 text-red-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                      />
                    </svg>
                  </div>
                  <div className="ml-5">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Create New Student
                    </h3>
                    <div className="mt-2 text-sm text-gray-500">
                      Add new students to your classes
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>

          {/* Classes Card */}
          <Link href="/trainer-dashboard/my-classes">
            <div className="bg-white p-6 rounded-lg shadow-md cursor-pointer hover:shadow-md transition-shadow duration-300">
              <h2 className="text-xl font-semibold mb-4">My Classes</h2>
              <div className="space-y-4">
                <p className="text-gray-600">
                  Your assigned classes will be shown here
                </p>
              </div>
            </div>
          </Link>

          {/* Students Card */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">My Students</h2>
            <div className="space-y-4">
              <p className="text-gray-600">
                List of students under your guidance
              </p>
            </div>
          </div>

          {/* Schedule Card */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Schedule</h2>
            <div className="space-y-4">
              <p className="text-gray-600">
                Your teaching schedule will appear here
              </p>
            </div>
          </div>
          {/* Tasks Management Card */}
          <Link href="/admin-dashboard/create-task">
            <div className="bg-white overflow-hidden shadow rounded-lg cursor-pointer hover:shadow-md transition-shadow duration-300">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-blue-100 rounded-md p-3">
                    <svg
                      className="h-6 w-6 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12h6m-6 4h6m-6-8h6m-2-4h-4a2 2 0 00-2 2v12a2 2 0 002 2h4a2 2 0 002-2V6a2 2 0 00-2-2z"
                      />
                    </svg>
                  </div>
                  <div className="ml-5">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Tasks Management
                    </h3>
                    <div className="mt-2 text-sm text-gray-500">
                      Manage tasks and to-do lists
                    </div>
                  </div>
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
