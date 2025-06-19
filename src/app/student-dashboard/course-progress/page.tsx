"use client";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
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
import { db } from "../../../../firebaseConfig";
import {
  ClipboardCheck,
  Clock,
  AlertCircle,
  CheckCircle,
  ListTodo,
  BarChart2,
} from "lucide-react";

// Define a type for the task
type Task = {
  course: string;
  task: string;
  dateTime: string;
  status: string;
};

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
        <p className="text-indigo-600 font-bold">{`Class: ${payload[0].value}`}</p>
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
        <p className="text-indigo-600 font-bold">{`Class: ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

type TabType = "dashboard" | "upcoming" | "completed";

const TasksDashboard = () => {
  const [statusData, setStatusData] = useState<StatusData[]>([]);
  const [courseData, setCourseData] = useState<CourseData[]>([]);
  const [upcomingTasks, setUpcomingTasks] = useState<Task[]>([]);
  const [completedTasks, setCompletedTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [totalTasks, setTotalTasks] = useState<number>(0);
  const [completedTasksCount, setCompletedTasksCount] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<TabType>("dashboard");
  const [studentName, setStudentName] = useState<string>("");

  const auth = getAuth();
  const user = auth.currentUser;
  const loginEmail = user?.email;

  useEffect(() => {
    if (!user) {
      window.location.href = "/login";
      return;
    }

    const fetchStudents = async () => {
      try {
        setLoading(true);

        // Get PRN from URL if present
        const urlParams = new URLSearchParams(window.location.search);
        const prn = urlParams.get("prn");

        const studentsRef = collection(db, "students");
        let q;

        if (prn) {
          // If PRN is provided, fetch that specific student
          q = query(studentsRef, where("PrnNumber", "==", prn));
        } else if (loginEmail) {
          // Otherwise fetch the logged-in user's data
          q = query(studentsRef, where("email", "==", loginEmail));
        } else {
          setError("No student identifier found");
          setLoading(false);
          return;
        }

        const querySnapshot = await getDocs(q);
        const allTasks: Task[] = [];

        if (querySnapshot.empty) {
          setLoading(false);
          setError("No student data found");
          return;
        }

        querySnapshot.forEach((doc) => {
          const studentData = doc.data();
          setStudentName(
            studentData.username ||
              studentData.email?.split("@")[0] ||
              "Student"
          );
          if (studentData.tasks && Array.isArray(studentData.tasks)) {
            allTasks.push(...studentData.tasks);
          }
        });

        const completedTasksList = allTasks.filter(
          (task) => task.status === "complete"
        );

        setTotalTasks(allTasks.length);
        setCompletedTasksCount(completedTasksList.length);
        setCompletedTasks(completedTasksList);

        // Process data for status chart
        const statusCount: Record<string, number> = {};
        allTasks.forEach((task) => {
          statusCount[task.status] = (statusCount[task.status] || 0) + 1;
        });

        const statusChartData = Object.keys(statusCount).map((status) => ({
          name: status,
          value: statusCount[status],
        }));
        setStatusData(statusChartData);

        // Process data for course distribution chart
        const courseCount: Record<string, number> = {};
        allTasks.forEach((task) => {
          courseCount[task.course] = (courseCount[task.course] || 0) + 1;
        });

        const courseChartData = Object.keys(courseCount).map((course) => ({
          name: course,
          tasks: courseCount[course],
        }));

        // Sort courses by task count (descending)
        courseChartData.sort((a, b) => b.tasks - a.tasks);
        setCourseData(courseChartData);

        // Get upcoming tasks (pending and in progress tasks, sorted by date)
        const pendingTasks = allTasks.filter(
          (task) => task.status !== "complete"
        );
        const sortedTasks = [...pendingTasks].sort((a, b) => {
          const dateA = new Date(a.dateTime).getTime();
          const dateB = new Date(b.dateTime).getTime();
          return !isNaN(dateA) && !isNaN(dateB) ? dateA - dateB : 0;
        });
        setUpcomingTasks(sortedTasks);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load dashboard data. Please try again later.");
        setLoading(false);
      }
    };

    fetchStudents();
  }, [loginEmail, user]);

  // Colors for the status pie chart
  const STATUS_COLORS: Record<string, string> = {
    complete: "#10B981", // green
    "in progress": "#FBBF24", // yellow/amber
    pending: "#EF4444", // red
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center px-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600 mb-4"></div>
        <h2 className="text-xl font-semibold text-gray-800">
          Loading your dashboard...
        </h2>
        <p className="text-gray-600 mt-2">
          Please wait while we fetch your data
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center px-4  ">
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

  // Safe access to status data counts
  const inProgressCount =
    statusData.find((s) => s.name === "in progress")?.value || 0;
  const pendingCount = statusData.find((s) => s.name === "pending")?.value || 0;

  // Render a task card
  const renderTaskCard = (task: Task, index: number) => {
    const taskDate = new Date(task.dateTime);
    const isValid = !isNaN(taskDate.getTime());
    const today = new Date();
    const isToday = isValid && today.toDateString() === taskDate.toDateString();
    const isPast = isValid && taskDate < today;
    const statusColor = STATUS_COLORS[task.status] || "#6366F1";

    return (
      <div
        key={index}
        className={`flex items-center p-4 border-l-4 rounded-lg shadow-sm transition-all hover:shadow-md  ${
          isPast ? "bg-red-50" : isToday ? "bg-yellow-50" : "bg-gray-50"
        }`}
        style={{ borderLeftColor: statusColor }}
      >
        <div className="flex-1 mr-4">
          <div className="font-medium text-gray-900">{task.task}</div>
          <div className="text-sm text-gray-600 mt-1 flex items-center">
            <Clock className="h-4 w-4 mr-1" />
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
          <span className="mb-2 text-sm font-medium py-1 px-3 bg-indigo-50 text-indigo-700 rounded-full">
            {task.course}
          </span>
          <span
            className={`px-3 py-1 text-xs font-medium rounded-full ${
              task.status === "complete"
                ? "bg-green-100 text-green-800"
                : task.status === "in progress"
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-red-100 text-red-800"
            }`}
          >
            {task.status}
          </span>
        </div>
      </div>
    );
  };

  // Render the dashboard tab content
  const renderDashboardTab = () => (
    <>
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-indigo-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Tasks</p>
              <p className="text-2xl font-bold text-gray-900">{totalTasks}</p>
            </div>
            <div className="bg-indigo-100 p-3 rounded-full">
              <ClipboardCheck className="h-6 w-6 text-indigo-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Completed</p>
              <p className="text-2xl font-bold text-gray-900">
                {completedTasksCount}
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-yellow-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">In Progress</p>
              <p className="text-2xl font-bold text-gray-900">
                {inProgressCount}
              </p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-full">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-red-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Pending</p>
              <p className="text-2xl font-bold text-gray-900">{pendingCount}</p>
            </div>
            <div className="bg-red-100 p-3 rounded-full">
              <AlertCircle className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 ">
        {/* Status Distribution Pie Chart */}
        <div className="bg-white p-6 rounded-xl shadow-md  ">
          <h2 className="text-xl font-semibold mb-6 p text-gray-800 border-b pb-2">
            Task Status Distribution
          </h2>
          {statusData.length > 0 ? (
            <div className="h-80  ">
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
            <div className="h-80 ">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={courseData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, "auto"]} />
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

      {/* Next 5 Upcoming Tasks Preview */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <div className="flex justify-between items-center mb-6 border-b pb-2">
          <h2 className="text-xl font-semibold text-gray-800">
            Next Upcoming Tasks
          </h2>
          <button
            className="text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center"
            onClick={() => setActiveTab("upcoming")}
          >
            View All <ArrowRight className="h-4 w-4 ml-1" />
          </button>
        </div>
        {upcomingTasks.length > 0 ? (
          <div className="space-y-4">
            {upcomingTasks
              .slice(0, 5)
              .map((task, index) => renderTaskCard(task, index))}
          </div>
        ) : (
          <div className="py-16 text-center">
            <CheckCircle className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">
              No upcoming tasks
            </h3>
            <p className="mt-1 text-gray-500">
              You&apos;ve completed all your tasks or none are assigned yet.
            </p>
          </div>
        )}
      </div>
    </>
  );

  // Render the upcoming tasks tab content
  const renderUpcomingTab = () => (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-6 text-gray-800 border-b pb-2">
        All Upcoming Tasks
      </h2>
      {upcomingTasks.length > 0 ? (
        <div className="space-y-4">
          {upcomingTasks.map((task, index) => renderTaskCard(task, index))}
        </div>
      ) : (
        <div className="py-16 text-center">
          <CheckCircle className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-lg font-medium text-gray-900">
            No upcoming tasks
          </h3>
          <p className="mt-1 text-gray-500">
            You&apos;ve completed all your tasks or none are assigned yet.
          </p>
        </div>
      )}
    </div>
  );

  // Render the completed tasks tab content
  const renderCompletedTab = () => (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-6 text-gray-800 border-b pb-2">
        Completed Tasks
      </h2>
      {completedTasks.length > 0 ? (
        <div className="space-y-4">
          {completedTasks.map((task, index) => renderTaskCard(task, index))}
        </div>
      ) : (
        <div className="py-16 text-center">
          <ClipboardCheck className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-lg font-medium text-gray-900">
            No completed tasks
          </h3>
          <p className="mt-1 text-gray-500">
            You haven&apos;t completed any tasks yet.
          </p>
        </div>
      )}
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen pb-12 mt-20">
      <div className="max-w-7xl mx-auto pt-10 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-indigo-800">
            {studentName} Tasks Dashboard
          </h1>
          <p className="text-gray-600 mt-1">
            Track progress and manage assignments
          </p>
          <span className="text-gray-500 text-xs">
            (You can track your child&apos;s progress here)
          </span>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8 bg-white rounded-xl shadow-md">
          <div className="flex border-b">
            <button
              className={`flex items-center justify-center px-6 py-4 text-sm font-medium transition-colors ${
                activeTab === "dashboard"
                  ? "text-indigo-600 border-b-2 border-indigo-600"
                  : "text-gray-500 hover:text-indigo-600"
              }`}
              onClick={() => setActiveTab("dashboard")}
            >
              <BarChart2 className="w-5 h-5 mr-2" />
              Dashboard
            </button>
            <button
              className={`flex items-center justify-center px-6 py-4 text-sm font-medium transition-colors ${
                activeTab === "upcoming"
                  ? "text-indigo-600 border-b-2 border-indigo-600"
                  : "text-gray-500 hover:text-indigo-600"
              }`}
              onClick={() => setActiveTab("upcoming")}
            >
              <ListTodo className="w-5 h-5 mr-2" />
              Upcoming Tasks
            </button>
            <button
              className={`flex items-center justify-center px-6 py-4 text-sm font-medium transition-colors ${
                activeTab === "completed"
                  ? "text-indigo-600 border-b-2 border-indigo-600"
                  : "text-gray-500 hover:text-indigo-600"
              }`}
              onClick={() => setActiveTab("completed")}
            >
              <CheckCircle className="w-5 h-5 mr-2" />
              Completed Tasks
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === "dashboard" && renderDashboardTab()}
        {activeTab === "upcoming" && renderUpcomingTab()}
        {activeTab === "completed" && renderCompletedTab()}
      </div>
    </div>
  );
};

// Missing ArrowRight import, let's add it
import { ArrowRight } from "lucide-react";

export default TasksDashboard;
