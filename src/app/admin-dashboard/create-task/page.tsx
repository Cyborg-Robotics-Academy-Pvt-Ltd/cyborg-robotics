"use client";
import React, { useState, useEffect, ChangeEvent, useCallback } from "react";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { app } from "../../../../firebaseConfig";
import { useRouter } from "next/navigation";
import { auth } from "../../../../firebaseConfig";
import toast, { Toaster } from "react-hot-toast";
import {
  MdDeleteForever,
  MdEditSquare,
  MdAdd,
  MdClose,
  MdDashboard,
  MdAssignment,
} from "react-icons/md";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import courses from "../../../../utils/courses";

interface Task {
  task: string;
  dateTime: string;
  status: "incomplete" | "in progress" | "complete";
  prn?: string;
  srNo?: number;
  username?: string;
  course?: string;
}

interface StudentData {
  PrnNumber: string;
  username: string;
  tasks?: Task[];
}

const Page = () => {
  const [task, setTask] = useState("");
  const [prn, setPrn] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [status, setStatus] = useState<Task["status"]>("incomplete");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<{
    index: number;
    prn: string;
    task: string;
    dateTime: string;
    status: Task["status"];
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [course, setCourse] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const router = useRouter();
  const db = getFirestore(app);

  const handleTaskChange = (e: ChangeEvent<HTMLInputElement>) =>
    setTask(e.target.value);
  const handlePrnChange = (e: ChangeEvent<HTMLInputElement>) =>
    setPrn(e.target.value);
  const handleDateTimeChange = (e: ChangeEvent<HTMLInputElement>) =>
    setDateTime(e.target.value);
  const handleStatusChange = (e: ChangeEvent<HTMLSelectElement>) =>
    setStatus(e.target.value as Task["status"]);
  const handleCourseChange = (e: ChangeEvent<HTMLSelectElement>) =>
    setCourse(e.target.value);
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) =>
    setSearchTerm(e.target.value);

  const fetchTasks = useCallback(async () => {
    try {
      setError(null);
      const tasksCollection = collection(db, "students");
      const querySnapshot = await getDocs(tasksCollection);
      const allTasks: Task[] = [];
      querySnapshot.forEach((doc) => {
        const studentData = doc.data() as StudentData;
        if (studentData.tasks) {
          studentData.tasks.forEach((task: Task, index: number) => {
            allTasks.push({
              ...task,
              prn: studentData.PrnNumber,
              username: studentData.username,
              srNo: index + 1,
            });
          });
        }
      });
      setTasks(allTasks);
    } catch (error) {
      console.error("Error fetching tasks: ", error);
      setError("Failed to fetch tasks. Please try again.");
    }
  }, [db]);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          router.push("/login");
          return;
        }

        const adminDoc = await getDoc(doc(db, "admins", user.uid));

        if (!adminDoc.exists() || adminDoc.data().role !== "admin") {
          router.push("/login");
          return;
        }

        await fetchTasks();
      } catch (error) {
        console.error("Error during authentication check:", error);
        setError("Authentication failed. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router, db, fetchTasks]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          <div className="text-xl font-medium text-indigo-700">
            Loading your dashboard...
          </div>
        </div>
      </div>
    );
  }

  const handleSubmit = async () => {
    try {
      if (!task.trim()) {
        toast.error("Task cannot be empty");
        return;
      }

      if (!prn.trim()) {
        toast.error("PRN number is required");
        return;
      }

      if (!dateTime) {
        toast.error("Date and time are required");
        return;
      }

      if (!course) {
        toast.error("Course is required");
        return;
      }

      console.log("Submitting task:", { task, prn, dateTime, status, course });
      const q = query(
        collection(db, "students"),
        where("PrnNumber", "==", prn)
      );
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const studentDoc = querySnapshot.docs[0];
        const studentRef = doc(db, "students", studentDoc.id);
        const studentData = studentDoc.data() as StudentData;
        console.log("Student data:", studentData);

        let updatedTasks;
        if (editingTask !== null) {
          // Find the task to update in student's tasks array
          const taskIndex =
            studentData.tasks?.findIndex(
              (t) =>
                t.task === editingTask.task &&
                t.dateTime === editingTask.dateTime &&
                t.status === editingTask.status
            ) ?? -1;

          if (taskIndex === -1) {
            throw new Error("Task not found");
          }

          // Update existing task
          updatedTasks = [...(studentData.tasks || [])];
          updatedTasks[taskIndex] = { task, dateTime, status, course };
        } else {
          // Add new task
          updatedTasks = studentData.tasks
            ? [...studentData.tasks, { task, dateTime, status, course }]
            : [{ task, dateTime, status, course }];
        }

        await updateDoc(studentRef, { tasks: updatedTasks });
        toast.success(
          editingTask
            ? "Task updated successfully!"
            : "Task added successfully!"
        );
        setIsModalOpen(false);
        setEditingTask(null);
        resetForm();
        fetchTasks();
      } else {
        toast.error("No student found with the provided PRN number.");
      }
    } catch (error) {
      console.error("Error handling task: ", error);
      toast.error("Error handling task. Please try again.");
    }
  };

  const resetForm = () => {
    setTask("");
    setPrn("");
    setDateTime("");
    setStatus("incomplete");
    setCourse("");
  };

  const handleEdit = (taskData: Task, index: number) => {
    setTask(taskData.task);
    setPrn(taskData.prn || "");
    setDateTime(taskData.dateTime);
    setStatus(taskData.status);
    setCourse(taskData.course || "");
    setEditingTask({
      index: index,
      prn: taskData.prn || "",
      task: taskData.task,
      dateTime: taskData.dateTime,
      status: taskData.status,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (taskData: Task) => {
    try {
      if (!taskData.prn) {
        toast.error("PRN number not found");
        return;
      }

      const q = query(
        collection(db, "students"),
        where("PrnNumber", "==", taskData.prn)
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const studentDoc = querySnapshot.docs[0];
        const studentRef = doc(db, "students", studentDoc.id);
        const studentData = studentDoc.data() as StudentData;

        // Filter out the task to be deleted
        const updatedTasks =
          studentData.tasks?.filter(
            (t) =>
              t.task !== taskData.task ||
              t.dateTime !== taskData.dateTime ||
              t.status !== taskData.status
          ) || [];

        await updateDoc(studentRef, { tasks: updatedTasks });
        toast.success("Task deleted successfully!");
        fetchTasks();
      } else {
        toast.error("Student not found");
      }
    } catch (error) {
      console.error("Error deleting task: ", error);
      toast.error("Error deleting task. Please try again.");
    }
  };

  // Filter tasks based on search term
  const filteredTasks = tasks.filter(
    (task) =>
      task.task.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.course?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Count tasks by status
  const completedTasks = tasks.filter(
    (task) => task.status === "complete"
  ).length;
  const inProgressTasks = tasks.filter(
    (task) => task.status === "in progress"
  ).length;
  const incompleteTasks = tasks.filter(
    (task) => task.status === "incomplete"
  ).length;

  // Function to sort tasks by date
  const sortTasksByDate = () => {
    const sortedTasks = [...tasks].sort((a, b) => {
      const dateA = new Date(a.dateTime).getTime();
      const dateB = new Date(b.dateTime).getTime();
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });
    setTasks(sortedTasks);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc"); // Toggle sort order
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-70 to-indigo-50 mt-20">
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#363636",
            color: "#fff",
            borderRadius: "8px",
            padding: "16px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
          },
          success: {
            iconTheme: {
              primary: "#10B981",
              secondary: "white",
            },
          },
          error: {
            iconTheme: {
              primary: "#EF4444",
              secondary: "white",
            },
          },
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-indigo-900 flex items-center">
            <MdDashboard className="mr-2 text-indigo-600" size={32} />
            Task Management Dashboard
          </h1>
          <p className="text-indigo-700 mt-2 text-lg font-light">
            Efficiently manage student tasks and track assignment progress
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 uppercase">
                  Completed Tasks
                </p>
                <p className="text-2xl font-bold text-gray-800 mt-1">
                  {completedTasks}
                </p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>
            <div className="mt-2">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{
                    width: `${tasks.length > 0 ? (completedTasks / tasks.length) * 100 : 0}%`,
                  }}
                ></div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-yellow-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 uppercase">
                  In Progress
                </p>
                <p className="text-2xl font-bold text-gray-800 mt-1">
                  {inProgressTasks}
                </p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-full">
                <svg
                  className="w-6 h-6 text-yellow-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
            <div className="mt-2">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-yellow-500 h-2 rounded-full"
                  style={{
                    width: `${tasks.length > 0 ? (inProgressTasks / tasks.length) * 100 : 0}%`,
                  }}
                ></div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-red-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 uppercase">
                  Incomplete
                </p>
                <p className="text-2xl font-bold text-gray-800 mt-1">
                  {incompleteTasks}
                </p>
              </div>
              <div className="bg-red-100 p-3 rounded-full">
                <svg
                  className="w-6 h-6 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
            </div>
            <div className="mt-2">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-red-500 h-2 rounded-full"
                  style={{
                    width: `${tasks.length > 0 ? (incompleteTasks / tasks.length) * 100 : 0}%`,
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <div className="w-full md:w-1/2">
            <div className="relative">
              <input
                type="text"
                placeholder="Search tasks, students or courses..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 rounded-lg shadow-sm focus:outline-none"
              />
              <div className="absolute left-3 top-3 text-gray-400">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>

            {error && (
              <div className="mt-4 bg-red-50 border-l-4 border-red-500 p-4 rounded">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-5 w-5 text-red-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
          <button
            onClick={sortTasksByDate}
            className="w-full md:w-auto flex items-center justify-center px-6 py-3 bg-red-800  text-white font-medium rounded-xl transition-colors duration-200 shadow-md group"
          >
            Sort by Date
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full md:w-auto flex items-center justify-center px-6 py-3 bg-red-800  text-white font-medium rounded-xl transition-colors duration-200 shadow-md group"
          >
            <MdAdd
              size={20}
              className="mr-2 group-hover:scale-110 transition-transform"
            />
            Add New Task
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-indigo-50">
                <TableRow>
                  <TableHead className="py-4 px-4 text-left text-xs font-semibold text-indigo-700 uppercase tracking-wider">
                    Sr No
                  </TableHead>
                  <TableHead className="py-4 px-4 text-left text-xs font-semibold text-indigo-700 uppercase tracking-wider">
                    Student Name
                  </TableHead>
                  <TableHead className="py-4 px-4 text-left text-xs font-semibold text-indigo-700 uppercase tracking-wider">
                    Tasks
                  </TableHead>
                  <TableHead className="py-4 px-4 text-left text-xs font-semibold text-indigo-700 uppercase tracking-wider">
                    Date and Time
                  </TableHead>
                  <TableHead className="py-4 px-4 text-left text-xs font-semibold text-indigo-700 uppercase tracking-wider">
                    Status
                  </TableHead>
                  <TableHead className="py-4 px-4 text-left text-xs font-semibold text-indigo-700 uppercase tracking-wider">
                    Course
                  </TableHead>
                  <TableHead className="py-4 px-4 text-left text-xs font-semibold text-indigo-700 uppercase tracking-wider">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTasks.length > 0 ? (
                  filteredTasks.map((task, index) => (
                    <TableRow
                      key={index}
                      className="hover:bg-indigo-50 transition-colors duration-150"
                    >
                      <TableCell className="py-4 px-4 text-sm text-gray-900 border-t">
                        {task.srNo}
                      </TableCell>
                      <TableCell className="py-4 px-4 text-sm text-gray-900 font-medium border-t">
                        {task.username}
                      </TableCell>
                      <TableCell className="py-4 px-4 text-sm text-gray-900 border-t">
                        <div className="max-w-xs truncate flex items-center">
                          <MdAssignment
                            className="mr-2 text-indigo-500"
                            size={16}
                          />
                          {task.task}
                        </div>
                      </TableCell>
                      <TableCell className="py-4 px-4 text-sm text-gray-500 border-t">
                        {new Date(task.dateTime).toLocaleString(undefined, {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </TableCell>
                      <TableCell className="py-4 px-4 text-sm border-t">
                        <span
                          className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            task.status === "complete"
                              ? "bg-green-100 text-green-800"
                              : task.status === "in progress"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                          }`}
                        >
                          {task.status}
                        </span>
                      </TableCell>
                      <TableCell className="py-4 px-4 text-sm text-gray-500 border-t">
                        {task.course}
                      </TableCell>
                      <TableCell className="py-4 px-4 text-sm border-t">
                        <div className="flex gap-3">
                          <button
                            onClick={() => handleEdit(task, index)}
                            className="p-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-md transition-colors"
                            title="Edit Task"
                          >
                            <MdEditSquare size={18} />
                          </button>
                          <button
                            onClick={() => {
                              if (
                                window.confirm(
                                  "Are you sure you want to delete this task?"
                                )
                              ) {
                                handleDelete(task);
                              }
                            }}
                            className="p-1.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-md transition-colors"
                            title="Delete Task"
                          >
                            <MdDeleteForever size={18} />
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className="py-16 text-center text-gray-500"
                    >
                      <div className="flex flex-col items-center">
                        <svg
                          className="w-12 h-12 text-gray-400 mb-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1}
                            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                          />
                        </svg>
                        <p className="text-lg font-medium">No tasks found</p>
                        <p className="text-sm text-gray-400 mt-1">
                          {searchTerm
                            ? "Try a different search term or"
                            : "Add a new task to get started"}
                        </p>
                        {searchTerm && (
                          <button
                            onClick={() => setSearchTerm("")}
                            className="mt-4 text-indigo-600 hover:text-indigo-800"
                          >
                            Clear search
                          </button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 overflow-hidden transform transition-all animate-fadeIn">
            <div className="flex justify-between items-center border-b px-6 py-4 bg-indigo-50">
              <h2 className="text-lg font-bold text-indigo-900 flex items-center">
                {editingTask ? (
                  <>
                    <MdEditSquare className="mr-2" size={20} />
                    Edit Task
                  </>
                ) : (
                  <>
                    <MdAdd className="mr-2" size={20} />
                    Add New Task
                  </>
                )}
              </h2>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setEditingTask(null);
                  resetForm();
                }}
                className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100 transition-colors"
              >
                <MdClose size={24} />
              </button>
            </div>

            <div className="px-6 py-4">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Task:
                  </label>
                  <input
                    type="text"
                    value={task}
                    onChange={handleTaskChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                    placeholder="Enter task description"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    PRN Number:
                  </label>
                  <input
                    type="text"
                    value={prn}
                    onChange={handlePrnChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                    placeholder="Enter student PRN"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date and Time:
                  </label>
                  <input
                    type="datetime-local"
                    value={dateTime}
                    onChange={handleDateTimeChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status:
                  </label>
                  <select
                    value={status}
                    onChange={handleStatusChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  >
                    <option value="incomplete">Incomplete</option>
                    <option value="in progress">In Progress</option>
                    <option value="complete">Complete</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Course:
                  </label>
                  <select
                    value={course}
                    onChange={handleCourseChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  >
                    <option value="">Select Course</option>
                    {courses.map((course) => (
                      <option key={course} value={course}>
                        {course}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 px-6 py-4 flex justify-end space-x-3">
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setEditingTask(null);
                  resetForm();
                }}
                className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors font-medium flex items-center"
              >
                {editingTask ? (
                  <>
                    <MdEditSquare className="mr-1" size={16} />
                    Update Task
                  </>
                ) : (
                  <>
                    <MdAdd className="mr-1" size={16} />
                    Add Task
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
