"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { db } from "../../../firebaseConfig";
import { doc, onSnapshot } from "firebase/firestore";
import Link from "next/link";
import {
  UserRoundPlus,
  ClipboardCheck,
  CheckSquare,
  Loader2,
  ArrowRight,
  GraduationCap,
  BarChart3,
} from "lucide-react";
import { motion } from "framer-motion";
import Head from "next/head";
import { useAuth } from "@/lib/auth-context";
import AuthLoadingSpinner from "@/components/AuthLoadingSpinner";

const TrainerDashboard = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const { user, userRole, loading: authLoading } = useAuth();

  useEffect(() => {
    if (authLoading) return;

    if (!user || userRole !== "trainer") {
      router.push("/login");
      return;
    }

    // Set up real-time listener for trainer data
    const trainerDocRef = doc(db, "trainers", user.uid);
    const unsubscribeDoc = onSnapshot(trainerDocRef, (doc) => {
      if (!doc.exists()) {
        router.push("/login");
        return;
      }
      setLoading(false);
    });

    // Clean up the document listener when component unmounts
    return () => unsubscribeDoc();
  }, [user, userRole, authLoading, router]);
  if (authLoading || loading) {
    return <AuthLoadingSpinner />;
  }
  return (
    <>
      <Head>
        <title>Trainer Dashboard | Cyborg Robotics Academy</title>
        <meta
          name="description"
          content="Trainer dashboard for managing students, tasks, and analytics at Cyborg Robotics Academy."
        />
        <meta
          property="og:title"
          content="Trainer Dashboard | Cyborg Robotics Academy"
        />
        <meta
          property="og:description"
          content="Trainer dashboard for managing students, tasks, and analytics at Cyborg Robotics Academy."
        />
        <meta property="og:type" content="website" />
      </Head>
      <main
        role="main"
        aria-label="Trainer Dashboard"
        className="min-h-screen bg-gray-50"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 md:mt-20"
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold text-gray-900">
              Trainer Dashboard
            </h1>
            <p className="mt-2 text-gray-600">
              Manage your students, tasksand assignments
            </p>
          </motion.div>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              staggerChildren: 0.1,
            }}
          >
            {/* Create Student Card */}
            <Link href="/create-user" className="group">
              {" "}
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
              </motion.div>
            </Link>
            {/* media */}
            <Link href="/media" className="group">
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
            <Link href="/trainer-dashboard/create-task" className="group">
              {" "}
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
                  delay: 0.05,
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
                        Manage tasks and to-do lists
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
            {/* Assignments Card */}
            <Link href="/trainer-dashboard/assignments" className="group">
              {" "}
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
                  delay: 0.15,
                }}
                className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 h-full"
              >
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
              </motion.div>
            </Link>
          </motion.div>
        </motion.div>
      </main>
    </>
  );
};

export default TrainerDashboard;
