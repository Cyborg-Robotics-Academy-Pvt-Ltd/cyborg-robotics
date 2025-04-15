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
  }>;
  label?: string;
};

// Custom tooltip component for the BarChart
const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border border-gray-200 shadow-sm rounded">
        <p className="font-medium">{label}</p>
        <p className="text-indigo-600">{`Tasks: ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

const TasksDashboard = () => {
  const [statusData, setStatusData] = useState<StatusData[]>([]);
  const [courseData, setCourseData] = useState<CourseData[]>([]);
  const [upcomingTasks, setUpcomingTasks] = useState<Task[]>([]);

  const auth = getAuth();
  const user = auth.currentUser;
  const loginEmail = user?.email;
  const studentsRef = collection(db, "students");
  const q = loginEmail
    ? query(studentsRef, where("email", "==", loginEmail))
    : null;

  useEffect(() => {
    if (!user) {
      window.location.href = "/login";
    }

    const fetchStudents = async () => {
      if (!q) return;
      const querySnapshot = await getDocs(q);
      const allTasks: Task[] = [];

      querySnapshot.forEach((doc) => {
        const studentData = doc.data();
        if (studentData.tasks && Array.isArray(studentData.tasks)) {
          allTasks.push(...studentData.tasks);
        }
      });

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
      allTasks
        .filter((task) => task.status === "complete")
        .forEach((task) => {
          courseCount[task.course] = (courseCount[task.course] || 0) + 1;
        });

      const courseChartData = Object.keys(courseCount).map((course) => ({
        name: course,
        tasks: courseCount[course],
      }));
      setCourseData(courseChartData);

      // Get upcoming tasks (next 5 tasks sorted by date)
      const sortedTasks = [...allTasks].sort(
        (a, b) =>
          new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime()
      );
      setUpcomingTasks(sortedTasks.slice(0, 5));
    };

    fetchStudents();
  }, [q, user]);

  // Colors for the status pie chart
  const COLORS = ["#10B981", "#FBBF24", "#EF4444"];
  const STATUS_COLORS: Record<string, string> = {
    complete: "#15803d",
    "in progress": "#FF9800",
    pending: "#F44336",
  };

  return (
    <div className="md:mt-28 px-6 flex flex-col items-center ">
      <h1 className="text-2xl font-bold text-indigo-800 mb-6">
        Tasks Dashboard
      </h1>

      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Status Distribution Pie Chart */}
        <div className="bg-white p-6 rounded-xl shadow-xl">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">
            Task Status Distribution
          </h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {statusData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        STATUS_COLORS[entry.name] ||
                        COLORS[index % COLORS.length]
                      }
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e5e7eb",
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Course Distribution Bar Chart */}
        <div className="bg-white p-6 rounded-xl shadow-xl">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">
            Tasks by Course
          </h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={courseData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 20]} />
                <Tooltip
                  content={<CustomTooltip />}
                  cursor={{ fill: "rgba(255, 100, 100, 0.1)" }}
                />
                <Bar dataKey="tasks" fill="#6366F1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Upcoming Tasks Section */}
      <div className="w-full max-w-6xl mt-8 bg-white p-6 rounded-xl shadow-xl">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">
          Upcoming Tasks
        </h2>
        {upcomingTasks.length > 0 ? (
          <div className="space-y-4">
            {upcomingTasks.map((task, index) => (
              <div
                key={index}
                className="flex items-center p-3 border-l-4 bg-gray-50 rounded-r-md shadow-sm"
                style={{
                  borderLeftColor: STATUS_COLORS[task.status] || "#6366F1",
                }}
              >
                <div className="flex-1">
                  <div className="font-medium text-gray-800">{task.task}</div>
                  <div className="text-sm text-gray-500">
                    {new Date(task.dateTime).toLocaleString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="mr-3 text-sm text-gray-600">
                    {task.course}
                  </span>
                  <span
                    className={`px-3 py-1 text-xs font-semibold rounded-full ${
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
            ))}
          </div>
        ) : (
          <div className="py-16 text-center text-gray-500">
            No upcoming tasks found.
          </div>
        )}
      </div>
    </div>
  );
};

export default TasksDashboard;
