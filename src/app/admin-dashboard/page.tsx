"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "../../../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import Link from "next/link";
import {
  UserCog,
  GraduationCap,
  BookText,
  BarChart3,
  ClipboardCheck,
  UserRoundPlus,
  RotateCw,
  ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";

const AdminDashboard = () => {
  const router = useRouter();

  useEffect(() => {
    const checkAdminAuth = async () => {
      const user = auth.currentUser;
      if (!user) {
        router.push("/login");
        return;
      }

      try {
        const adminDocRef = doc(db, "admins", user.uid);
        const adminDoc = await getDoc(adminDocRef);

        if (!adminDoc.exists()) {
          router.push("/login");
          return;
        }
      } catch (error) {
        console.error("Error verifying admin status:", error);
        router.push("/login");
      }
    };

    checkAdminAuth();
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 md:mt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Create User Card */}
          <Link href="/create-user" className="group">
            <motion.div
              whileHover={{
                scale: 1.04,
                boxShadow: "0 8px 32px rgba(255,0,0,0.10)",
              }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 h-full"
            >
              <div className="p-6">
                <div className="flex items-center">
                  <div className="p-3 rounded-lg bg-red-100 text-red-600">
                    <UserCog className="h-6 w-6" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-red-600 transition-colors">
                      Create New User
                    </h3>
                    <div className="mt-1 text-sm text-gray-500">
                      Add new students, trainers, or admin users to the system
                    </div>
                  </div>
                </div>
                <div className="mt-4 text-sm text-red-600 flex items-center">
                  Manage users
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.div>
          </Link>

          {/* Users Management Card */}
          <Link href="/student-list" className="group">
            <motion.div
              whileHover={{
                scale: 1.04,
                boxShadow: "0 8px 32px rgba(16,185,129,0.10)",
              }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 20,
                delay: 0.05,
              }}
              className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 h-full"
            >
              <div className="p-6">
                <div className="flex items-center">
                  <div className="p-3 rounded-lg bg-green-100 text-green-600">
                    <GraduationCap className="h-6 w-6" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-green-600 transition-colors">
                      Student Record
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
            </motion.div>
          </Link>

          {/* Course Management Card */}
          <Link href="/admin-dashboard/courses" className="group">
            <motion.div
              whileHover={{
                scale: 1.04,
                boxShadow: "0 8px 32px rgba(139,92,246,0.10)",
              }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 20,
                delay: 0.1,
              }}
              className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 h-full"
            >
              <div className="p-6">
                <div className="flex items-center">
                  <div className="p-3 rounded-lg bg-purple-100 text-purple-600">
                    <BookText className="h-6 w-6" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">
                      Course Management
                    </h3>
                    <div className="mt-1 text-sm text-gray-500">
                      Create and manage courses and assignments
                    </div>
                  </div>
                </div>
                <div className="mt-4 text-sm text-purple-600 flex items-center">
                  Manage courses
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.div>
          </Link>

          {/* Analytics Card */}
          <Link href="/admin-dashboard/media" className="group">
            <motion.div
              whileHover={{
                scale: 1.04,
                boxShadow: "0 8px 32px rgba(99,102,241,0.10)",
              }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 20,
                delay: 0.15,
              }}
              className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 h-full"
            >
              <div className="p-6">
                <div className="flex items-center">
                  <div className="p-3 rounded-lg bg-indigo-100 text-indigo-600">
                    <BarChart3 className="h-6 w-6" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                      Media Section
                    </h3>
                    <div className="mt-1 text-sm text-gray-500">
                      View system analytics, reports and key metrics
                    </div>
                  </div>
                </div>
                <div className="mt-4 text-sm text-indigo-600 flex items-center">
                  View analytics
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.div>
          </Link>

          {/* Tasks Management Card */}
          <Link href="/admin-dashboard/create-task" className="group">
            <motion.div
              whileHover={{
                scale: 1.04,
                boxShadow: "0 8px 32px rgba(59,130,246,0.10)",
              }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 20,
                delay: 0.2,
              }}
              className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 h-full"
            >
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
                      Create and manage tasks and to-do lists
                    </div>
                  </div>
                </div>
                <div className="mt-4 text-sm text-blue-600 flex items-center">
                  Manage tasks
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.div>
          </Link>

          {/* New Registration Card */}
          <Link href="/admin-dashboard/new-registration" className="group">
            <motion.div
              whileHover={{
                scale: 1.04,
                boxShadow: "0 8px 32px rgba(251,191,36,0.10)",
              }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 20,
                delay: 0.25,
              }}
              className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 h-full"
            >
              <div className="p-6">
                <div className="flex items-center">
                  <div className="p-3 rounded-lg bg-amber-100 text-amber-600">
                    <UserRoundPlus className="h-6 w-6" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-amber-600 transition-colors">
                      New Registration
                    </h3>
                    <div className="mt-1 text-sm text-gray-500">
                      Register new students to the system
                    </div>
                  </div>
                </div>
                <div className="mt-4 text-sm text-amber-600 flex items-center">
                  Register students
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.div>
          </Link>

          {/* Renewal Card */}
          <Link href="/admin-dashboard/renewal" className="group">
            <motion.div
              whileHover={{
                scale: 1.04,
                boxShadow: "0 8px 32px rgba(20,184,166,0.10)",
              }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 20,
                delay: 0.3,
              }}
              className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 h-full"
            >
              <div className="p-6">
                <div className="flex items-center">
                  <div className="p-3 rounded-lg bg-teal-100 text-teal-600">
                    <RotateCw className="h-6 w-6" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-teal-600 transition-colors">
                      Renewal
                    </h3>
                    <div className="mt-1 text-sm text-gray-500">
                      Renew existing student registrations and subscriptions
                    </div>
                  </div>
                </div>
                <div className="mt-4 text-sm text-teal-600 flex items-center">
                  Manage renewals
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
