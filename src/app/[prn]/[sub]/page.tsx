"use client";
import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
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
  AlertCircle,
  User,
  Mail,
  CheckCircle2,
  CircleDot,
  GraduationCap,
  Calendar,
  LayoutDashboard,
  CheckSquare,
  ArrowLeftCircle,
} from "lucide-react";

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
  const [upcomingTasks, setUpcomingTasks] = useState<Task[]>([]);
  const [totalTasks, setTotalTasks] = useState(0);
  const [assignedClasses, setAssignedClasses] = useState<string | number>(
    "N/A"
  );
  const [activeTab, setActiveTab] = useState<number>(0);

  useEffect(() => {
    params.then(setResolvedParams);
  }, [params]);

  const courseName = resolvedParams ? fromSlug(resolvedParams.sub) : "";

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
        };
        setStudent(studentData);
        // Filter tasks for this course
        const filtered = (studentData.tasks || []).filter(
          (task) =>
            task.course &&
            task.course.replace(/\s+/g, "").toLowerCase() ===
              courseName.replace(/\s+/g, "").toLowerCase()
        );
        setTotalTasks(filtered.length);
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
        // Upcoming tasks: not complete, sorted by date
        const now = new Date();
        const upcoming = filtered
          .filter((t) => t.status !== "complete" && new Date(t.dateTime) >= now)
          .sort(
            (a, b) =>
              new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime()
          );
        setUpcomingTasks(upcoming);
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
      } catch {
        setError("Failed to load course analytics. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchStudent();
  }, [resolvedParams, courseName]);

  if (!resolvedParams || loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center px-4">
        <AlertCircle className="text-red-500 w-12 h-12 mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Something went wrong
        </h2>
        <p className="text-gray-600 mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }
  if (!student) {
    return null;
  }
  return (
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
                  <div className="flex items-center gap-1 text-xs text-gray-200">
                    <User size={12} className="mr-1" />
                    <span>PRN: {student.PrnNumber}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-200">
                    <Mail size={12} className="mr-1" />
                    <span>{student.email}</span>
                  </div>
                </div>
                {/* Course Progress Bar */}
                {totalTasks > 0 && (
                  <div className="mt-2">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-[10px] text-white font-medium">
                        Course Progress
                      </span>
                      <span className="text-[10px] text-white font-semibold">
                        {Math.round((completedTasks.length / totalTasks) * 100)}
                        %
                      </span>
                    </div>
                    <div className="w-full h-2 bg-white bg-opacity-20 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-green-400 to-green-700 transition-all duration-700"
                        style={{
                          width: `${(completedTasks.length / totalTasks) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                )}
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
            <button
              className={`px-4 py-2 text-sm font-medium rounded-t-lg focus:outline-none transition-colors flex items-center gap-2 ${activeTab === 2 ? "bg-white text-red-700 border-b-2 border-red-700" : "text-gray-500 hover:text-red-700"}`}
              onClick={() => setActiveTab(2)}
            >
              <Calendar className="w-5 h-5" />
              Upcoming Classes
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
                    {assignedClasses}
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
                  <p className="text-sm font-medium text-gray-500">Completed</p>
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
                  <p className="text-sm font-medium text-gray-500">Ongoing</p>
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
                  <p className="text-sm font-medium text-gray-500">Upcoming</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {upcomingTasks.length}
                  </p>
                </div>
                <div className="bg-indigo-100 p-3 rounded-full">
                  <Calendar className="h-6 w-6 text-indigo-600" />
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
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
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
                    isValid && today.toDateString() === taskDate.toDateString();
                  const statusColor = STATUS_COLORS[task.status] || "#6366F1";
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
      {activeTab === 2 && (
        <div className="max-w-8xl mx-auto px-2 sm:px-4 lg:px-8 mb-8">
          {/* Upcoming Tasks */}
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md mb-8">
            <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-gray-800 border-b pb-2">
              Upcoming Classes ({upcomingTasks.length})
            </h2>
            {upcomingTasks.length > 0 ? (
              <div className="space-y-4 mt-6">
                {upcomingTasks.map((task, index) => {
                  const taskDate = new Date(task.dateTime);
                  const isValid = !isNaN(taskDate.getTime());
                  const today = new Date();
                  const isToday =
                    isValid && today.toDateString() === taskDate.toDateString();
                  const isPast = isValid && taskDate < today;
                  const statusColor = STATUS_COLORS[task.status] || "#6366F1";
                  return (
                    <div
                      key={index}
                      className={`flex items-center p-4 border-l-4 rounded-r-lg shadow-sm transition-all hover:shadow-md ${isPast ? "bg-red-50" : isToday ? "bg-yellow-50" : "bg-gray-50"}`}
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
                        <span
                          className={`px-3 py-1 text-xs font-medium rounded-full flex items-center gap-1 ${task.status === "complete" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}
                        >
                          {task.status === "complete" ? (
                            <CheckCircle2 className="h-3 w-3" />
                          ) : (
                            <CircleDot className="h-3 w-3" />
                          )}
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
                  No upcoming Classes
                </h3>
                <p className="mt-1 text-gray-500">
                  This course has no upcoming classes.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
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
    </div>
  );
};

export default Page;
