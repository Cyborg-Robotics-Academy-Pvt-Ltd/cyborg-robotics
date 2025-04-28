"use client";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { db } from "../../../firebaseConfig";
import {
  ClipboardCheck,
  BookOpen,
  Clock,
  AlertCircle,
  User,
  Mail,
  CheckCircle2,
  CircleDot,
  GraduationCap,
  Calendar,
  LayoutDashboard,
  ListTodo,
  CheckSquare,
} from "lucide-react";

// Define a type for the task
type Task = {
  course: string;
  task: string;
  dateTime: string;
  status: string;
};

// Define a type for student
interface Student {
  id: string;
  PrnNumber: string;
  username: string;
  email: string;
  tasks?: Task[];
}

// Define types for the chart data
type StatusData = {
  name: string;
  value: number;
};

type CourseData = {
  name: string;
  tasks: number;
};

// Define type for tooltip props
type TooltipProps = {
  active?: boolean;
  payload?: Array<{
    value: number;
    name?: string;
    payload?: {
      name: string;
      value: number;
    };
  }>;
  label?: string;
};

// Custom tooltip component for the BarChart
const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 border border-gray-200 shadow-md rounded-lg">
        <p className="font-medium text-gray-900">{label}</p>
        <p className="text-indigo-600 font-bold">{`Tasks: ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

// Custom tooltip for PieChart
const PieTooltip = ({ active, payload }: TooltipProps) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-4 border border-gray-200 shadow-md rounded-lg">
        <p className="font-medium text-gray-900">{data?.name || ""}</p>
        <p className="text-indigo-600 font-bold">{`Tasks: ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

const Page = ({ params }: { params: Promise<{ prn: string }> }) => {
  const { prn } = React.use(params);
  const [student, setStudent] = useState<Student | null>(null);
  const [statusData, setStatusData] = useState<StatusData[]>([]);
  const [courseData, setCourseData] = useState<CourseData[]>([]);
  const [upcomingTasks, setUpcomingTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [totalTasks, setTotalTasks] = useState<number>(0);
  const [completedTasks, setCompletedTasks] = useState<number>(0);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [completedTasksList, setCompletedTasksList] = useState<Task[]>([]);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        setLoading(true);
        const studentsRef = collection(db, "students");
        const q = query(studentsRef, where("PrnNumber", "==", prn));
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
          setError("No student found with this PRN number.");
          setLoading(false);
          return;
        }
        // Use the first document directly
        const doc = querySnapshot.docs[0];
        const data = doc.data();
        const studentData: Student = {
          id: doc.id,
          PrnNumber: data.PrnNumber || "",
          username: data.username || "",
          email: data.email || "",
          tasks: data.tasks || [],
        };

        setStudent(studentData);

        if (studentData.tasks && studentData.tasks.length > 0) {
          const allTasks = studentData.tasks;

          setTotalTasks(allTasks.length);
          setCompletedTasks(
            allTasks.filter((task: Task) => task.status === "complete").length
          );
          setCompletedTasksList(
            allTasks.filter((task: Task) => task.status === "complete")
          );

          // Process data for status chart
          const statusCount: Record<string, number> = {};
          allTasks.forEach((task: Task) => {
            statusCount[task.status] = (statusCount[task.status] || 0) + 1;
          });

          const statusChartData = Object.keys(statusCount).map((status) => ({
            name: status,
            value: statusCount[status],
          }));
          setStatusData(statusChartData);

          // Process data for course distribution chart
          const courseCount: Record<string, number> = {};
          allTasks.forEach((task: Task) => {
            courseCount[task.course] = (courseCount[task.course] || 0) + 1;
          });

          const courseChartData = Object.keys(courseCount).map((course) => ({
            name: course,
            tasks: courseCount[course],
          }));

          // Sort courses by task count (descending)
          courseChartData.sort((a, b) => b.tasks - a.tasks);
          setCourseData(courseChartData);

          // Get upcoming tasks (next 5 tasks that are not complete, sorted by date)
          const pendingTasks = allTasks.filter(
            (task: Task) => task.status !== "complete"
          );
          const sortedTasks = [...pendingTasks].sort((a, b) => {
            const dateA = new Date(a.dateTime).getTime();
            const dateB = new Date(b.dateTime).getTime();
            return !isNaN(dateA) && !isNaN(dateB) ? dateA - dateB : 0;
          });
          setUpcomingTasks(sortedTasks.slice(0, 5));
        }

        setLoading(false);
      } catch (err) {
        console.error("Error fetching student data:", err);
        setError(
          "Failed to load student dashboard data. Please try again later."
        );
        setLoading(false);
      }
    };

    fetchStudentData();
  }, [prn]);

  // Colors for the status pie chart
  const STATUS_COLORS: Record<string, string> = {
    complete: "#10B981", // green
    ongoing: "#FBBF24", // yellow/amber
  };

  if (loading) {
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
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center px-4">
        <AlertCircle className="text-yellow-500 w-12 h-12 mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">No Data Found</h2>
        <p className="text-gray-600 mb-4">No student found with PRN: {prn}</p>
        <button
          onClick={() => window.history.back()}
          className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Go Back
        </button>
      </div>
    );
  }

  // Safe access to status data counts
  const ongoingCount = statusData.find((s) => s.name === "ongoing")?.value || 0;

  return (
    <div className="bg-gray-50 min-h-screen pb-12 mt-20">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-700 py-8 px-4 sm:px-6 lg:px-8 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            <div>
              <h1 className="text-3xl font-bold">{student.username}</h1>
              <div className="mt-2 flex items-center space-x-4">
                <div className="flex items-center">
                  <User size={18} className="mr-2" />
                  <span>PRN: {student.PrnNumber}</span>
                </div>
                <div className="flex items-center">
                  <Mail size={18} className="mr-2" />
                  <span>{student.email}</span>
                </div>
              </div>
            </div>
            <div className="mt-4 md:mt-0">
              <button
                onClick={() => window.history.back()}
                className="px-4 py-2 bg-white text-indigo-700 rounded-lg hover:bg-indigo-50 transition-colors"
              >
                Back
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
        <div className="mb-6 border-b border-gray-200">
          <div className="flex space-x-4 overflow-x-auto">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`py-3 px-4 font-medium text-sm flex items-center gap-2 ${
                activeTab === "dashboard"
                  ? "border-b-2 border-indigo-600 text-indigo-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab("tasks")}
              className={`py-3 px-4 font-medium text-sm flex items-center gap-2 ${
                activeTab === "tasks"
                  ? "border-b-2 border-indigo-600 text-indigo-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <ListTodo className="h-4 w-4" />
              Upcoming Tasks
            </button>
            <button
              onClick={() => setActiveTab("completed")}
              className={`py-3 px-4 font-medium text-sm flex items-center gap-2 ${
                activeTab === "completed"
                  ? "border-b-2 border-indigo-600 text-indigo-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <CheckSquare className="h-4 w-4" />
              Completed
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {activeTab === "dashboard" && (
          <>
            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-indigo-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Total Tasks
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {totalTasks}
                    </p>
                  </div>
                  <div className="bg-indigo-100 p-3 rounded-full">
                    <ClipboardCheck className="h-6 w-6 text-indigo-600" />
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
                      {completedTasks}
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
                      {ongoingCount}
                    </p>
                  </div>
                  <div className="bg-yellow-100 p-3 rounded-full">
                    <Clock className="h-6 w-6 text-yellow-600" />
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Status Distribution Pie Chart */}
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h2 className="text-xl font-semibold mb-6 text-gray-800 border-b pb-2">
                  Task Status Distribution
                </h2>
                {statusData.length > 0 ? (
                  <div className="h-80">
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
                              fill={STATUS_COLORS[entry.name] || "#6366F1"}
                              stroke="none"
                            />
                          ))}
                        </Pie>
                        <Tooltip content={<PieTooltip />} />
                        <Legend
                          verticalAlign="bottom"
                          height={36}
                          iconType="circle"
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                    <p>No status data available</p>
                  </div>
                )}
              </div>

              {/* Course Distribution Bar Chart */}
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h2 className="text-xl font-semibold mb-6 text-gray-800 border-b pb-2">
                  Tasks by Course
                </h2>
                {courseData.length > 0 ? (
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={courseData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis domain={[0, 20]} />
                        <Tooltip content={<CustomTooltip />} />
                        <Bar
                          dataKey="tasks"
                          fill="#6366F1"
                          radius={[4, 4, 0, 0]}
                          barSize={30}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                    <p>No course data available</p>
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        {activeTab === "tasks" && (
          <div className="bg-white p-6 rounded-xl shadow-md mb-8">
            <h2 className="text-xl font-semibold mb-6 text-gray-800 border-b pb-2">
              Upcoming Tasks
            </h2>
            {upcomingTasks.length > 0 ? (
              <div className="space-y-4">
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
                      className={`flex items-center p-4 border-l-4 rounded-r-lg shadow-sm transition-all hover:shadow-md ${
                        isPast
                          ? "bg-red-50"
                          : isToday
                            ? "bg-yellow-50"
                            : "bg-gray-50"
                      }`}
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
                          className={`px-3 py-1 text-xs font-medium rounded-full flex items-center gap-1 ${
                            task.status === "complete"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
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
                  No upcoming tasks
                </h3>
                <p className="mt-1 text-gray-500">
                  This student has completed all tasks or none are assigned yet.
                </p>
              </div>
            )}
          </div>
        )}

        {activeTab === "completed" && (
          <div className="bg-white p-6 rounded-xl shadow-md mb-8">
            <h2 className="text-xl font-semibold mb-6 text-gray-800 border-b pb-2">
              Completed Tasks
            </h2>
            {completedTasksList.length > 0 ? (
              <div className="space-y-4">
                {completedTasksList.map((task, index) => {
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
                  No completed tasks
                </h3>
                <p className="mt-1 text-gray-500">
                  This student has not completed any tasks yet.
                </p>
              </div>
            )}
          </div>
        )}

        {upcomingTasks.length > 0 && activeTab === "dashboard" && (
          <div className="bg-white p-6 rounded-xl shadow-md mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">
                Next Upcoming Tasks
              </h2>
              <button
                onClick={() => setActiveTab("tasks")}
                className="text-sm text-indigo-600 font-medium hover:text-indigo-800"
              >
                View All
              </button>
            </div>
            <div className="space-y-4">
              {upcomingTasks.slice(0, 3).map((task, index) => {
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
                    className={`flex items-center p-4 border-l-4 rounded-r-lg shadow-sm transition-all hover:shadow-md ${
                      isPast
                        ? "bg-red-50"
                        : isToday
                          ? "bg-yellow-50"
                          : "bg-gray-50"
                    }`}
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
                        className={`px-3 py-1 text-xs font-medium rounded-full flex items-center gap-1 ${
                          task.status === "complete"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
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
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
