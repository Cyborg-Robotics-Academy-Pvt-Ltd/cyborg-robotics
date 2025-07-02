"use client";
import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../../firebaseConfig";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import {
  ClipboardCheck,
  BookOpen,
  User,
  Mail,
  CircleDot,
  GraduationCap,
  Calendar,
  LayoutDashboard,
  CheckSquare,
  ArrowLeftCircle,
  Trophy,
  Hash,
} from "lucide-react";
import { Checkbox } from "../../../components/ui/checkbox";
import Head from "next/head";

// Task type
interface Task {
  course: string;
  task: string;
  dateTime: string;
  status: string;
}

// Student type
interface Student {
  id: string;
  PrnNumber: string;
  username: string;
  email: string;
  classes?: string;
  createdAt?: Date | null;
  createdBy?: string;
  createdByRole?: string;
  lastLogin?: Date | null;
  role?: string;
  tasks?: Task[];
  courses?: {
    name: string;
    level: string;
    classNumber: string;
    completed?: boolean;
    certificate?: boolean;
  }[];
}

// Helper to convert slug to course name
function fromSlug(slug: string) {
  return slug
    .replace(/-/g, " ")
    .replace(/\band\b/gi, "&")
    .replace(/\bplus\b/gi, "+")
    .replace(/\bweb\b/gi, "Web")
    .replace(/\bjava\b/gi, "Java")
    .replace(/\bpython\b/gi, "Python")
    .replace(/\biot\b/gi, "IoT")
    .replace(/\bev3\b/gi, "EV3")
    .replace(/\b3d\b/gi, "3D")
    .replace(/\bapp\b/gi, "App")
    .replace(/\bai\b/gi, "AI")
    .replace(/\bdsa\b/gi, "DSA")
    .replace(/\bml\b/gi, "ML")
    .replace(/\bhtml\b/gi, "HTML")
    .replace(/\bjava\b/gi, "Java")
    .replace(/\bpython\b/gi, "Python")
    .replace(/\bapp\b/gi, "App")
    .replace(/\bai\b/gi, "AI")
    .replace(/\bml\b/gi, "ML")
    .replace(/\bweb\b/gi, "Web")
    .replace(/\b3d\b/gi, "3D")
    .replace(/\bev3\b/gi, "EV3")
    .replace(/\biot\b/gi, "IoT")
    .replace(/\bhtml\b/gi, "HTML")
    .replace(/\bdsa\b/gi, "DSA")
    .replace(/\bplus\b/gi, "+")
    .replace(/\band\b/gi, "&")
    .replace(/\s+/g, " ")
    .trim();
}

function getLevelColor(level: string) {
  switch (level) {
    case "1":
      return "bg-green-500/20 text-green-300 border-green-400/50";
    case "2":
      return "bg-blue-500/20 text-blue-300 border-blue-400/50";
    case "3":
      return "bg-purple-500/20 text-purple-300 border-purple-400/50";
    case "4":
      return "bg-orange-500/20 text-orange-300 border-orange-400/50";
    default:
      return "bg-gray-500/20 text-gray-300 border-gray-400/50";
  }
}

function getLevelLabel(level: string) {
  switch (level) {
    case "1":
      return "Beginner";
    case "2":
      return "Intermediate";
    case "3":
      return "Advanced";
    case "4":
      return "Expert";
    default:
      return `Level ${level}`;
  }
}

const STATUS_COLORS: Record<string, string> = {
  complete: "#10B981",
  ongoing: "#FBBF24",
  "in progress": "#FBBF24",
  pending: "#6366F1",
};

const Page = ({
  params,
}: {
  params: Promise<{ prn: string; sub: string }>;
}) => {
  const [resolvedParams, setResolvedParams] = useState<{
    prn: string;
    sub: string;
  } | null>(null);
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusData, setStatusData] = useState<
    { name: string; value: number }[]
  >([]);
  const [barData, setBarData] = useState<
    { date: string; complete: number; ongoing: number }[]
  >([]);
  const [completedTasks, setCompletedTasks] = useState<Task[]>([]);
  const [ongoingTasks, setOngoingTasks] = useState<Task[]>([]);
  const [assignedClasses, setAssignedClasses] = useState<string | number>(
    "N/A"
  );
  const [activeTab, setActiveTab] = useState<number>(0);
  const [courseLevel, setCourseLevel] = useState("");
  const [classNumber, setClassNumber] = useState("");
  const [isCourseCompleted, setIsCourseCompleted] = useState(false);
  const [isCertificateIssued, setIsCertificateIssued] = useState(false);

  useEffect(() => {
    params.then(setResolvedParams);
  }, [params]);

  const courseName = resolvedParams ? fromSlug(resolvedParams.sub) : "";

  const handleCompletedChange = async (checked: boolean | "indeterminate") => {
    if (!student) return;
    const newCompletedState = checked === true;
    setIsCourseCompleted(newCompletedState);
    try {
      const studentRef = doc(db, "students", student.id);
      const updatedCourses = student.courses?.map((course) => {
        if (
          course.name.replace(/\s+/g, "").toLowerCase() ===
          courseName.replace(/\s+/g, "").toLowerCase()
        ) {
          return {
            ...course,
            completed: newCompletedState,
            status: newCompletedState ? "complete" : "ongoing",
          };
        }
        return course;
      });
      await updateDoc(studentRef, { courses: updatedCourses });
    } catch (error) {
      console.error("Error updating course completion status:", error);
      setIsCourseCompleted(!newCompletedState);
    }
  };

  const handleCertificateChange = async (
    checked: boolean | "indeterminate"
  ) => {
    if (!student) return;
    const newCertificateState = checked === true;
    setIsCertificateIssued(newCertificateState);
    try {
      const studentRef = doc(db, "students", student.id);
      const updatedCourses = student.courses?.map((course) => {
        if (
          course.name.replace(/\s+/g, "").toLowerCase() ===
          courseName.replace(/\s+/g, "").toLowerCase()
        ) {
          return { ...course, certificate: newCertificateState };
        }
        return course;
      });
      await updateDoc(studentRef, { courses: updatedCourses });
    } catch (error) {
      console.error("Error updating certificate status:", error);
      setIsCertificateIssued(!newCertificateState);
    }
  };

  useEffect(() => {
    if (!resolvedParams) return;
    const fetchStudent = async () => {
      setLoading(true);
      setError(null);
      try {
        const studentsRef = collection(db, "students");
        const q = query(
          studentsRef,
          where("PrnNumber", "==", resolvedParams.prn)
        );
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
          setError("No student found with this PRN number.");
          setLoading(false);
          return;
        }
        const doc = querySnapshot.docs[0];
        const data = doc.data();
        const studentData: Student = {
          id: doc.id,
          PrnNumber: data.PrnNumber || "",
          username: data.username || "",
          email: data.email || "",
          classes: data.classes || "0",
          createdAt: data.createdAt || null,
          createdBy: data.createdBy || "",
          createdByRole: data.createdByRole || "",
          lastLogin: data.lastLogin || null,
          role: data.role || "",
          tasks: data.tasks || [],
          courses: data.courses || [],
        };
        setStudent(studentData);
        // Filter tasks for this course
        const filtered = (studentData.tasks || []).filter(
          (task) =>
            task.course &&
            task.course.replace(/\s+/g, "").toLowerCase() ===
              courseName.replace(/\s+/g, "").toLowerCase()
        );
        setCompletedTasks(filtered.filter((t) => t.status === "complete"));
        setOngoingTasks(
          filtered.filter(
            (t) => t.status === "ongoing" || t.status === "in progress"
          )
        );
        // Status data for pie chart
        const statusCount: Record<string, number> = {};
        filtered.forEach((task) => {
          const status = (task.status || "").toLowerCase();
          statusCount[status] = (statusCount[status] || 0) + 1;
        });
        setStatusData(
          Object.keys(statusCount).map((status) => ({
            name: status,
            value: statusCount[status],
          }))
        );
        // Bar chart: tasks by date and status
        const dateMap: Record<string, { complete: number; ongoing: number }> =
          {};
        filtered.forEach((task) => {
          const date = new Date(task.dateTime).toLocaleDateString();
          if (!dateMap[date]) dateMap[date] = { complete: 0, ongoing: 0 };
          if (task.status === "complete") dateMap[date].complete++;
          else dateMap[date].ongoing++;
        });
        setBarData(
          Object.keys(dateMap).map((date) => ({
            date,
            ...dateMap[date],
          }))
        );

        // Assigned classes logic
        if (
          data.courseClassNumbers &&
          typeof data.courseClassNumbers === "object"
        ) {
          // Try both original and normalized courseName keys
          const assigned =
            data.courseClassNumbers[courseName] ||
            data.courseClassNumbers[courseName.trim()] ||
            data.courseClassNumbers[
              Object.keys(data.courseClassNumbers).find(
                (key) =>
                  key.replace(/\s+/g, "").toLowerCase() ===
                  courseName.replace(/\s+/g, "").toLowerCase()
              ) || ""
            ];
          setAssignedClasses(assigned || "N/A");
        } else {
          setAssignedClasses("N/A");
        }

        if (studentData.courses) {
          const currentCourse = studentData.courses.find(
            (c) =>
              c.name.replace(/\s+/g, "").toLowerCase() ===
              courseName.replace(/\s+/g, "").toLowerCase()
          );
          if (currentCourse) {
            setCourseLevel(currentCourse.level);
            setClassNumber(currentCourse.classNumber);
            setIsCourseCompleted(currentCourse.completed || false);
            setIsCertificateIssued(currentCourse.certificate || false);
          }
        }
      } catch {
        setError("Failed to load course analytics. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchStudent();
  }, [resolvedParams, courseName]);

  const remainingClasses = Math.max(
    0,
    (Number(classNumber) || 0) - completedTasks.length
  );

  if (loading) {
    return (
      <main
        role="main"
        aria-label="Loading Course Detail"
        className="min-h-screen bg-gray-50 flex items-center justify-center"
      >
        {/* TODO: Add loading spinner and better feedback. */}
      </main>
    );
  }
  if (error || !student) {
    return (
      <main
        role="main"
        aria-label="Course Not Found"
        className="min-h-screen bg-gray-50 flex items-center justify-center"
      >
        {/* TODO: Add error message and better feedback. */}
      </main>
    );
  }
  return (
    <>
      <Head>
        <title>
          {student.username} | {courseName} Progress
        </title>
        <meta
          name="description"
          content={`Progress and details for ${courseName} - ${student.username} at Cyborg Robotics Academy.`}
        />
        <meta
          property="og:title"
          content={`${student.username} | ${courseName} Progress`}
        />
        <meta
          property="og:description"
          content={`Progress and details for ${courseName} - ${student.username} at Cyborg Robotics Academy.`}
        />
        <meta property="og:type" content="website" />
      </Head>
      <main
        role="main"
        aria-label="Course Detail"
        className="min-h-screen bg-gray-50"
      >
        {/* TODO: Add loading and error states for better UX. */}
        <div className="bg-gray-50 min-h-screen pb-12 lg:mt-20">
          {/* Header */}
          <div className="relative bg-gradient-to-r from-red-800 to-red-700 py-6 px-4 sm:px-6 lg:px-8 text-white shadow-lg overflow-hidden">
            {/* SVG Wave Background */}
            <svg
              className="absolute bottom-0 left-0 w-full h-10"
              viewBox="0 0 1440 320"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ zIndex: 0 }}
            >
              <path
                fill="#fff"
                fillOpacity="0.08"
                d="M0,224L48,202.7C96,181,192,139,288,144C384,149,480,203,576,197.3C672,192,768,128,864,117.3C960,107,1056,149,1152,176C1248,203,1344,213,1392,218.7L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              />
            </svg>
            {/* Confetti animation if all tasks complete */}
            {/* {totalTasks > 0 && completedTasks.length === totalTasks && (
              <ConfettiEffect />
            )} */}
            <div className="max-w-5xl mx-auto relative z-10">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 md:gap-0">
                {/* Glassmorphism Profile Card */}
                <div className="flex items-center gap-4 bg-white bg-opacity-10 backdrop-blur-md rounded-2xl p-4 shadow-2xl border border-white border-opacity-20 relative">
                  {/* Animated Gradient Avatar */}
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 rounded-full p-0.5 bg-gradient-to-tr from-yellow-400 via-pink-500 to-red-700 animate-gradient-spin shadow-lg">
                      <div className="w-full h-full rounded-full bg-white bg-opacity-20 flex items-center justify-center text-xl font-bold uppercase border-2 border-white border-opacity-60">
                        {student.username ? (
                          student.username
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .slice(0, 2)
                        ) : (
                          <User size={24} />
                        )}
                      </div>
                    </div>
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold flex items-center gap-2">
                      {student.username}
                      {student.role && (
                        <span
                          className="ml-2 px-2 py-0.5 rounded bg-white bg-opacity-20 text-xs font-semibold uppercase tracking-wide border border-white border-opacity-30 cursor-pointer relative group"
                          tabIndex={0}
                        >
                          {student.role}
                          <span className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-max px-3 py-1 rounded bg-black bg-opacity-80 text-white text-xs opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity z-20 pointer-events-none whitespace-nowrap">
                            User Role
                          </span>
                        </span>
                      )}
                    </h1>
                    <div className="mt-1 flex items-center gap-2 flex-wrap">
                      {/* Course Badge */}
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white bg-opacity-20 text-xs font-medium shadow border border-white border-opacity-20">
                        <BookOpen size={14} className="text-yellow-200" />
                        {courseName}
                      </span>
                      {courseLevel && (
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium shadow border ${getLevelColor(courseLevel)}`}
                        >
                          <Trophy size={14} />
                          {getLevelLabel(courseLevel)}
                        </span>
                      )}
                      <div className="flex items-center gap-1 text-xs text-gray-200">
                        <User size={12} className="mr-1" />
                        <span>PRN: {student.PrnNumber}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-200">
                        <Mail size={12} className="mr-1" />
                        <span>{student.email}</span>
                      </div>
                    </div>
                    {/* Course Status Checkboxes */}
                    <div className="flex items-center gap-6 mt-3">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="completed"
                          checked={isCourseCompleted}
                          onCheckedChange={handleCompletedChange}
                          className="border-white data-[state=checked]:bg-green-500 data-[state=checked]:text-white "
                        />
                        <label
                          htmlFor="completed"
                          className="text-sm font-medium text-white cursor-pointer"
                        >
                          Course Completed
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="certificate"
                          checked={isCertificateIssued}
                          onCheckedChange={handleCertificateChange}
                          className="border-white data-[state=checked]:bg-blue-500 data-[state=checked]:text-white"
                        />
                        <label
                          htmlFor="certificate"
                          className="text-sm font-medium text-white cursor-pointer"
                        >
                          Certificate Issued
                        </label>
                      </div>
                    </div>
                    {/* Course Progress Bar */}
                    {(() => {
                      const assignedClassesNum = Number(assignedClasses);
                      const percent =
                        assignedClassesNum > 0
                          ? Math.round(
                              (completedTasks.length / assignedClassesNum) * 100
                            )
                          : 0;
                      return assignedClassesNum > 0 ? (
                        <div className="mt-2">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-[10px] text-white font-medium">
                              Course Progress
                            </span>
                            <span className="text-[10px] text-white font-semibold">
                              {percent}%
                            </span>
                          </div>
                          <div className="relative w-full h-5 bg-white bg-opacity-20 rounded-full border border-white border-opacity-40 shadow-inner overflow-hidden">
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-green-400 via-green-500 to-green-700 transition-all duration-700 flex items-center justify-end pr-2"
                              style={{
                                width: `${percent}%`,
                                minWidth: percent > 0 ? "2rem" : 0,
                              }}
                            >
                              <span
                                className={`text-xs font-normal ${percent > 50 ? "text-white" : "text-green-900"} transition-colors duration-700`}
                              >
                                {percent}%
                              </span>
                              {percent === 100 && (
                                <svg
                                  className="ml-1 w-4 h-4 text-white inline-block animate-bounce"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                              )}
                            </div>
                          </div>
                        </div>
                      ) : null;
                    })()}
                  </div>
                </div>
                <div className="mt-2 md:mt-0 flex justify-end">
                  <button
                    onClick={() => window.history.back()}
                    className="px-4 py-1.5 bg-white text-red-700 rounded-xl shadow hover:bg-red-50 hover:scale-105 transition-all flex items-center gap-2 font-semibold border border-red-200 text-sm"
                  >
                    <ArrowLeftCircle size={16} className="text-red-700" />
                    Back
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* Tabs Navigation */}
          <div className="max-w-8xl mx-auto px-2 sm:px-4 lg:px-8 mt-6">
            <div className="border-b border-gray-200 mb-6">
              <nav className="flex space-x-8" aria-label="Tabs">
                <button
                  className={`px-4 py-2 text-sm font-medium rounded-t-lg focus:outline-none transition-colors flex items-center gap-2 ${activeTab === 0 ? "bg-white text-red-700 border-b-2 border-red-700" : "text-gray-500 hover:text-red-700"}`}
                  onClick={() => setActiveTab(0)}
                >
                  <LayoutDashboard className="w-5 h-5" />
                  Dashboard
                </button>
                <button
                  className={`px-4 py-2 text-sm font-medium rounded-t-lg focus:outline-none transition-colors flex items-center gap-2 ${activeTab === 1 ? "bg-white text-red-700 border-b-2 border-red-700" : "text-gray-500 hover:text-red-700"}`}
                  onClick={() => setActiveTab(1)}
                >
                  <CheckSquare className="w-5 h-5" />
                  Completed
                </button>
              </nav>
            </div>
          </div>
          {/* Tab Content */}
          {activeTab === 0 && (
            <>
              {/* Summary Cards */}
              <div className="max-w-8xl mx-auto px-2 sm:px-4 lg:px-8 mt-0 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
                <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-red-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Assigned Classes
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        {classNumber || "N/A"}
                      </p>
                    </div>
                    <div className="bg-red-100 p-3 rounded-full">
                      <ClipboardCheck className="h-6 w-6 text-red-700" />
                    </div>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-green-500">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Completed
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        {completedTasks.length}
                      </p>
                    </div>
                    <div className="bg-green-100 p-3 rounded-full">
                      <BookOpen className="h-6 w-6 text-green-600" />
                    </div>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-yellow-500">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Ongoing
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        {ongoingTasks.length}
                      </p>
                    </div>
                    <div className="bg-yellow-100 p-3 rounded-full">
                      <CircleDot className="h-6 w-6 text-yellow-600" />
                    </div>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-indigo-500">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Remaining Classes
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        {remainingClasses}
                      </p>
                    </div>
                    <div className="bg-indigo-100 p-3 rounded-full">
                      <Hash className="h-6 w-6 text-indigo-600" />
                    </div>
                  </div>
                </div>
              </div>
              {/* Charts */}
              <div className="max-w-8xl mx-auto px-2 sm:px-4 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Pie Chart */}
                <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md border border-gray-100 w-full overflow-x-auto">
                  <div className="min-w-[320px]">
                    <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-red-700 border-b pb-2 flex items-center">
                      <div className="w-1 h-6 bg-red-700 rounded-full mr-2"></div>
                      Status Distribution
                    </h2>
                    {statusData.length > 0 ? (
                      <div className="h-64 sm:h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={statusData}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              outerRadius={120}
                              innerRadius={60}
                              fill="#8884d8"
                              dataKey="value"
                              label={({ name, percent }) =>
                                `${name}: ${(percent * 100).toFixed(0)}%`
                              }
                              paddingAngle={5}
                            >
                              {statusData.map((entry, index) => (
                                <Cell
                                  key={`cell-${index}`}
                                  fill={STATUS_COLORS[entry.name] || "#b91c1c"}
                                  stroke="none"
                                />
                              ))}
                            </Pie>
                            <Tooltip />
                            <Legend
                              verticalAlign="bottom"
                              height={36}
                              iconType="circle"
                            />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-48 sm:h-64 text-gray-500">
                        <p>No status data available</p>
                      </div>
                    )}
                  </div>
                </div>
                {/* Bar Chart */}
                <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md border border-gray-100 w-full overflow-x-auto">
                  <div className="min-w-[320px]">
                    <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-red-700 border-b pb-2 flex items-center">
                      <div className="w-1 h-6 bg-red-700 rounded-full mr-2"></div>
                      Tasks by Date
                    </h2>
                    {barData.length > 0 ? (
                      <div className="h-64 sm:h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={barData}
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                          >
                            <CartesianGrid
                              strokeDasharray="3 3"
                              stroke="#f0f0f0"
                            />
                            <XAxis
                              dataKey="date"
                              tick={{ fill: "#4B5563", fontSize: 12 }}
                              tickLine={{ stroke: "#E5E7EB" }}
                            />
                            <YAxis
                              tick={{ fill: "#4B5563", fontSize: 12 }}
                              tickLine={{ stroke: "#E5E7EB" }}
                              domain={[0, 2]}
                            />
                            <Tooltip />
                            <Legend />
                            <Bar
                              dataKey="complete"
                              fill="#991b1b"
                              name="Completed"
                              barSize={30}
                            />
                            <Bar
                              dataKey="ongoing"
                              fill="#991b1b"
                              name="Ongoing"
                              barSize={30}
                            />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-48 sm:h-64 text-gray-500">
                        <p>No bar chart data available</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
          {activeTab === 1 && (
            <div className="max-w-8xl mx-auto px-2 sm:px-4 lg:px-8 mb-8">
              {/* Completed Tasks */}
              <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md mb-8 ">
                <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-gray-800 border-b pb-2 ">
                  Completed Classes ({completedTasks.length})
                </h2>
                {completedTasks.length > 0 ? (
                  <div className="space-y-4">
                    {completedTasks.map((task, index) => {
                      const taskDate = new Date(task.dateTime);
                      const isValid = !isNaN(taskDate.getTime());
                      const today = new Date();
                      const isToday =
                        isValid &&
                        today.toDateString() === taskDate.toDateString();
                      const statusColor =
                        STATUS_COLORS[task.status] || "#6366F1";
                      return (
                        <div
                          key={index}
                          className="flex items-center p-4 border-l-4 rounded-r-lg shadow-sm transition-all hover:shadow-md bg-green-50"
                          style={{ borderLeftColor: statusColor }}
                        >
                          <div className="flex-1 mr-4">
                            <div className="font-medium text-gray-900">
                              {task.task}
                            </div>
                            <div className="text-sm text-gray-600 mt-1 flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              {isValid ? (
                                <>
                                  {isToday ? "Today, " : ""}
                                  {taskDate.toLocaleString(undefined, {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })}
                                </>
                              ) : (
                                "Date not specified"
                              )}
                            </div>
                          </div>
                          <div className="flex flex-col items-end">
                            <span className="mb-2 text-sm font-medium py-1 px-3 bg-indigo-50 text-indigo-700 rounded-full flex items-center gap-1">
                              <GraduationCap className="h-3 w-3" />
                              {task.course}
                            </span>
                            <span className="px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                              {task.status}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="py-16 text-center">
                    <ClipboardCheck className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-lg font-medium text-gray-900">
                      No completed Classes
                    </h3>
                    <p className="mt-1 text-gray-500">
                      No completed classes for this course yet.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
      {/* Animated Gradient Keyframes */}
      <style jsx>{`
        @keyframes gradient-spin {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .animate-gradient-spin {
          background-size: 200% 200%;
          animation: gradient-spin 3s linear infinite;
        }
      `}</style>
    </>
  );
};

export default Page;
