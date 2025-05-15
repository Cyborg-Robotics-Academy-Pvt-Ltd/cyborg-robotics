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

import { useRouter } from "next/navigation";

import toast, { Toaster } from "react-hot-toast";
import {
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

import {
  CheckCircle,
  Clock,
  Search,
  Trash,
  Edit,
  PlusCircle,
} from "lucide-react";
import courses from "../../utils/courses";
import { app, auth } from "../../firebaseConfig";
import { format } from "date-fns";

interface Task {
  task: string;
  dateTime: string;
  status: "ongoing" | "complete";
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

interface PrnSuggestion {
  prn: string;
  username: string;
}

const CreateTasks = () => {
  const [task, setTask] = useState("");
  const [prn, setPrn] = useState("");
  const [dateTime, setDateTime] = useState(
    format(new Date(), "yyyy-MM-dd'T'HH:mm")
  );
  const [status, setStatus] = useState<Task["status"]>("ongoing");
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
  const [course, setCourse] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [prnSuggestions, setPrnSuggestions] = useState<PrnSuggestion[]>([]);
  const [allPrns, setAllPrns] = useState<PrnSuggestion[]>([]);
  const router = useRouter();
  const db = getFirestore(app);

  const handleTaskChange = (e: ChangeEvent<HTMLInputElement>) =>
    setTask(e.target.value);
  const handlePrnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPrn(value);
    if (value.trim()) {
      const filteredSuggestions = allPrns.filter(
        (suggestion) =>
          suggestion.prn.toLowerCase().includes(value.toLowerCase()) ||
          suggestion.username.toLowerCase().includes(value.toLowerCase())
      );
      setPrnSuggestions(filteredSuggestions);
    } else {
      setPrnSuggestions([]);
    }
  };
  const handleDateTimeChange = (e: ChangeEvent<HTMLInputElement>) =>
    setDateTime(e.target.value);
  const handleStatusChange = (e: ChangeEvent<HTMLSelectElement>) =>
    setStatus(e.target.value as Task["status"]);
  const handleCourseChange = (e: ChangeEvent<HTMLSelectElement>) =>
    setCourse(e.target.value);
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) =>
    setSearchTerm(e.target.value);

  const fetchPrns = useCallback(async () => {
    try {
      const studentsCollection = collection(db, "students");
      const querySnapshot = await getDocs(studentsCollection);
      const prnList: PrnSuggestion[] = [];
      querySnapshot.forEach((doc) => {
        const studentData = doc.data() as StudentData;
        prnList.push({
          prn: studentData.PrnNumber,
          username: studentData.username,
        });
      });
      setAllPrns(prnList);
    } catch (error) {
      console.error("Error fetching PRN numbers: ", error);
      toast.error("Failed to fetch PRN numbers. Please try again.");
    }
  }, [db]);

  const fetchTasks = useCallback(async () => {
    try {
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
      toast.error("Failed to fetch tasks. Please try again.");
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
        const trainerDoc = await getDoc(doc(db, "trainers", user.uid));

        if (
          !adminDoc.exists() &&
          !trainerDoc.exists() &&
          adminDoc.data()?.role !== "admin" &&
          trainerDoc.data()?.role !== "trainers"
        ) {
          router.push("/login");
          return;
        }

        await Promise.all([fetchTasks(), fetchPrns()]);
      } catch (error) {
        console.error("Error during authentication check:", error);
        toast.error("Authentication failed. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router, db, fetchTasks, fetchPrns]);

  useEffect(() => {
    setDateTime(format(new Date(), "yyyy-MM-dd'T'HH:mm"));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-50">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-xl font-semibold text-indigo-800">
            Loading your dashboard...
          </p>
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

      const q = query(
        collection(db, "students"),
        where("PrnNumber", "==", prn)
      );
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const studentDoc = querySnapshot.docs[0];
        const studentRef = doc(db, "students", studentDoc.id);
        const studentData = studentDoc.data() as StudentData;

        let updatedTasks;
        if (editingTask !== null) {
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

          updatedTasks = [...(studentData.tasks || [])];
          updatedTasks[taskIndex] = { task, dateTime, status, course };
        } else {
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
    setStatus("ongoing");
    setCourse("");
    setPrnSuggestions([]);
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

  const filteredTasks = tasks.filter(
    (task) =>
      task.task.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.course?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const completedTasks = tasks.filter(
    (task) => task.status === "complete"
  ).length;
  const ongoingTasks = tasks.filter((task) => task.status === "ongoing").length;

  const sortTasksByDate = () => {
    const sortedTasks = [...tasks].sort((a, b) => {
      const dateA = new Date(a.dateTime).getTime();
      const dateB = new Date(b.dateTime).getTime();
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });
    setTasks(sortedTasks);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handlePrnSelect = (selectedPrn: string) => {
    setPrn(selectedPrn);
    setPrnSuggestions([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 p-6 md:p-8">
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#1F2937",
            color: "#fff",
            borderRadius: "8px",
            padding: "16px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
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

      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold text-gray-900 flex items-center">
            <MdDashboard className="mr-3 text-indigo-600" size={36} />
            Task Management Dashboard
          </h1>
          <p className="text-gray-600 mt-2 text-lg font-medium">
            Seamlessly manage student tasks and monitor progress with ease
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl shadow-lg p-6 transform hover:scale-105 transition-transform duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600 uppercase">
                  Completed Tasks
                </p>
                <p className="text-3xl font-bold text-gray-800 mt-1">
                  {completedTasks}
                </p>
              </div>
              <div className="bg-green-200 p-3 rounded-full">
                <CheckCircle className="w-6 h-6 text-green-700" />
              </div>
            </div>
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-green-600 h-2.5 rounded-full transition-all duration-500"
                  style={{
                    width: `${tasks.length > 0 ? (completedTasks / tasks.length) * 100 : 0}%`,
                  }}
                ></div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl shadow-lg p-6 transform hover:scale-105 transition-transform duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600 uppercase">
                  Ongoing Tasks
                </p>
                <p className="text-3xl font-bold text-gray-800 mt-1">
                  {ongoingTasks}
                </p>
              </div>
              <div className="bg-yellow-200 p-3 rounded-full">
                <Clock className="w-6 h-6 text-yellow-700" />
              </div>
            </div>
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-yellow-600 h-2.5 rounded-full transition-all duration-500"
                  style={{
                    width: `${tasks.length > 0 ? (ongoingTasks / tasks.length) * 100 : 0}%`,
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Action Buttons */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <div className="w-full md:w-1/2">
            <div className="relative">
              <input
                type="text"
                placeholder="Search tasks, students, or courses..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 text-gray-700 placeholder-gray-400"
              />
              <div className="absolute left-4 top-3.5 text-gray-400">
                <Search className="w-5 h-5" />
              </div>
            </div>
          </div>
          <div className="flex gap-4">
            <button
              onClick={sortTasksByDate}
              className="px-6 py-3 bg-white text-gray-700 font-semibold rounded-xl shadow-sm hover:bg-gray-100 hover:shadow-md transition-all duration-300"
            >
              Sort by Date ({sortOrder === "asc" ? "↑" : "↓"})
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl shadow-sm hover:bg-indigo-700 hover:shadow-md transition-all duration-300 flex items-center"
            >
              <PlusCircle size={20} className="mr-2" />
              Add New Task
            </button>
          </div>
        </div>

        {/* Tasks Table */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-gray-50">
                <TableRow>
                  <TableHead className="py-4 px-6 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Sr No
                  </TableHead>
                  <TableHead className="py-4 px-6 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Student Name
                  </TableHead>
                  <TableHead className="py-4 px-6 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Task
                  </TableHead>
                  <TableHead className="py-4 px-6 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Date & Time
                  </TableHead>
                  <TableHead className="py-4 px-6 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Status
                  </TableHead>
                  <TableHead className="py-4 px-6 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Course
                  </TableHead>
                  <TableHead className="py-4 px-6 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTasks.length > 0 ? (
                  filteredTasks.map((task, index) => (
                    <TableRow
                      key={index}
                      className="hover:bg-gray-50 transition-colors duration-200"
                    >
                      <TableCell className="py-4 px-6 text-sm text-gray-900 font-medium">
                        {task.srNo}
                      </TableCell>
                      <TableCell className="py airy-4 px-6 text-sm text-gray-900 font-medium">
                        {task.username}
                      </TableCell>
                      <TableCell className="py-4 px-6 text-sm text-gray-900">
                        <div className="flex items-center">
                          <MdAssignment
                            className="mr-2 text-indigo-600"
                            size={16}
                          />
                          {task.task}
                        </div>
                      </TableCell>
                      <TableCell className="py-4 px-6 text-sm text-gray-600">
                        {new Date(task.dateTime).toLocaleString(undefined, {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </TableCell>
                      <TableCell className="py-4 px-6 text-sm">
                        <span
                          className={`px-3 py-1 inline-flex text-xs font-semibold rounded-full ${
                            task.status === "complete"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {task.status}
                        </span>
                      </TableCell>
                      <TableCell className="py-4 px-6 text-sm text-gray-600">
                        {task.course}
                      </TableCell>
                      <TableCell className="py-4 px-6 text-sm">
                        <div className="flex gap-3">
                          <button
                            onClick={() => handleEdit(task, index)}
                            className="p-2 bg-blue-100 text-blue-600 hover:bg-blue-200 rounded-lg transition-colors duration-200"
                            title="Edit Task"
                          >
                            <Edit size={18} />
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
                            className="p-2 bg-red-100 text-red-600 hover:bg-red-200 rounded-lg transition-colors duration-200"
                            title="Delete Task"
                          >
                            <Trash size={18} />
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
                          className="w-12 h-12 text-gray-300 mb-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                          />
                        </svg>
                        <p className="text-lg font-semibold text-gray-600">
                          No tasks found
                        </p>
                        <p className="text-sm text-gray-400 mt-1">
                          {searchTerm
                            ? "Try a different search term or"
                            : "Add a new task to get started"}
                        </p>
                        {searchTerm && (
                          <button
                            onClick={() => setSearchTerm("")}
                            className="mt-4 text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
                          >
                            Clear Search
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

      {/* Modal for Adding/Editing Tasks */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 transition-opacity duration-300">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden transform transition-all duration-300 scale-95 animate-in">
            <div className="flex justify-between items-center border-b px-6 py-4 bg-gradient-to-r from-indigo-50 to-blue-50">
              <h2 className="text-xl font-bold text-gray-900 flex items-center">
                {editingTask ? (
                  <>
                    <MdEditSquare className="mr-2 text-indigo-600" size={24} />
                    Edit Task
                  </>
                ) : (
                  <>
                    <MdAdd className="mr-2 text-indigo-600" size={24} />
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
                className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
              >
                <MdClose size={24} />
              </button>
            </div>

            <div className="px-6 py-6">
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Task Description
                  </label>
                  <input
                    type="text"
                    value={task}
                    onChange={handleTaskChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-gray-700 placeholder-gray-400"
                    placeholder="Enter task description"
                  />
                </div>

                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    PRN Number
                  </label>
                  <input
                    type="text"
                    value={prn}
                    onChange={handlePrnChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-gray-700 placeholder-gray-400"
                    placeholder="Enter student PRN"
                  />
                  {prnSuggestions.length > 0 && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                      {prnSuggestions.map((suggestion) => (
                        <div
                          key={suggestion.prn}
                          onClick={() => handlePrnSelect(suggestion.prn)}
                          className="px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 cursor-pointer transition-colors duration-200"
                        >
                          <span className="font-medium">{suggestion.prn}</span>{" "}
                          - {suggestion.username}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Date and Time
                  </label>
                  <input
                    type="datetime-local"
                    value={dateTime}
                    onChange={handleDateTimeChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-gray-700"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Status
                  </label>
                  <select
                    value={status}
                    onChange={handleStatusChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-gray-700"
                  >
                    <option value="ongoing">Ongoing</option>
                    <option value="complete">Complete</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Course
                  </label>
                  <select
                    value={course}
                    onChange={handleCourseChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-gray-700"
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

            <div className="bg-gray-50 px-6 py-4 flex justify-end space-x-3 border-t">
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setEditingTask(null);
                  resetForm();
                }}
                className="px-5 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-100 hover:shadow-sm transition-all duration-200 font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-5 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 hover:shadow-sm transition-all duration-200 font-semibold flex items-center"
              >
                {editingTask ? (
                  <>
                    <MdEditSquare className="mr-2" size={18} />
                    Update Task
                  </>
                ) : (
                  <>
                    <MdAdd className="mr-2" size={18} />
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

export default CreateTasks;
