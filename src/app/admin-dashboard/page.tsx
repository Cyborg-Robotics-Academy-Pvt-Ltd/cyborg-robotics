"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "../../../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import Link from "next/link";

const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAdminAuth = async () => {
      const user = auth.currentUser;
      if (!user) {
        router.push("/login");
        return;
      }

      const adminDoc = await getDoc(doc(db, "admins", user.uid));
      if (!adminDoc.exists()) {
        router.push("/login");
        return;
      }
      setLoading(false);
    };

    checkAdminAuth();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Admin Dashboard
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Create User Card */}
            <Link href="/admin/create-user">
              <div className="bg-white overflow-hidden shadow rounded-xl cursor-pointer hover:shadow-md transition-shadow duration-300">
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
                        Create New User
                      </h3>
                      <div className="mt-2 text-sm text-gray-500">
                        Add new students, trainers, or admin users to the system
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>

            {/* Users Management Card */}
            <Link href="/admin-dashboard/student-list">
              <div className="bg-white overflow-hidden shadow rounded-xl cursor-pointer hover:shadow-md transition-shadow duration-300">
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
                      <svg
                        className="h-6 w-6 text-green-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17 20h5v-2a2 2 0 00-2-2h-1a2 2 0 00-2 2v2zm-9 0h5v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2zm5-10a4 4 0 100-8 4 4 0 000 8zm6 6H7a2 2 0 00-2 2v2h16v-2a2 2 0 00-2-2z"
                        />
                      </svg>
                    </div>
                    <div className="ml-5">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        Student List
                      </h3>
                      <div className="mt-2 text-sm text-gray-500">
                        View and manage the list of students and trainers
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>

            {/* Course Management Card */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h2 className="text-xl font-semibold mb-4">Course Management</h2>
              <div className="space-y-4">
                <p className="text-gray-600">Manage courses and assignments</p>
              </div>
            </div>

            {/* Analytics Card */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h2 className="text-xl font-semibold mb-4">Analytics</h2>
              <div className="space-y-4">
                <p className="text-gray-600">
                  View system analytics and reports
                </p>
              </div>
            </div>

            {/* Tasks Management Card */}
            <Link href="/admin-dashboard/create-task">
              <div className="bg-white overflow-hidden shadow rounded-xl cursor-pointer hover:shadow-md transition-shadow duration-300">
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
            <Link href="/admin-dashboard/new-registration">
              <div className="bg-white overflow-hidden shadow rounded-xl cursor-pointer hover:shadow-md transition-shadow duration-300">
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
                        New Registration
                      </h3>
                      <div className="mt-2 text-sm text-gray-500">
                        Register new students
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
            <Link href="/admin-dashboard/renewal">
              <div className="bg-white overflow-hidden shadow rounded-xl cursor-pointer hover:shadow-md transition-shadow duration-300">
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
                        Renewal
                      </h3>
                      <div className="mt-2 text-sm text-gray-500">
                        Renew existing student registrations
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
