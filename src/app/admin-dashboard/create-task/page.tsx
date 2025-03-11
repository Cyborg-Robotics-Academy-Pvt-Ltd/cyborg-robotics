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
import { MdDeleteForever, MdEditSquare } from "react-icons/md";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
interface Task {
  task: string;
  dateTime: string;
  status: "incomplete" | "in progress" | "complete";
  prn?: string;
  srNo?: number;
  username?: string;
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  const handleSubmit = async () => {
    try {
      console.log("Submitting task:", { task, prn, dateTime, status });
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
          updatedTasks[taskIndex] = { task, dateTime, status };
        } else {
          // Add new task
          updatedTasks = studentData.tasks
            ? [...studentData.tasks, { task, dateTime, status }]
            : [{ task, dateTime, status }];
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
  };

  const handleEdit = (taskData: Task, index: number) => {
    setTask(taskData.task);
    setPrn(taskData.prn || "");
    setDateTime(taskData.dateTime);
    setStatus(taskData.status);
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

  return (
    <div className="p-4 max-w-6xl mt-28 mx-auto space-y-4">
      <Toaster position="top-center" />
      <div className="flex justify-between items-center">
        <div>
          {error && (
            <div className="text-red-500 bg-red-100 p-2 rounded">{error}</div>
          )}
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-xl text-sm w-auto"
        >
          Add Task
        </button>
      </div>
      <div className="bg-white rounded-xl shadow-md overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Sr No</TableHead>
              <TableHead>Student Name</TableHead>
              <TableHead>Tasks</TableHead>
              <TableHead>Date and Time</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tasks.map((task, index) => (
              <TableRow key={index}>
                <TableCell>{task.srNo}</TableCell>
                <TableCell>{task.username}</TableCell>
                <TableCell>{task.task}</TableCell>
                <TableCell>
                  {new Date(task.dateTime).toLocaleString()}
                </TableCell>
                <TableCell>
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
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
                <TableCell>
                  <div className="flex flex-row gap-2">
                    <MdEditSquare
                      size={24}
                      className="text-blue-500 cursor-pointer"
                      onClick={() => handleEdit(task, index)}
                    />
                    <MdDeleteForever
                      size={24}
                      onClick={() => {
                        if (
                          window.confirm(
                            "Are you sure you want to delete this task?"
                          )
                        ) {
                          handleDelete(task);
                        }
                      }}
                      className="text-red-500 cursor-pointer"
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4">
              {editingTask ? "Edit Task" : "Add New Task"}
            </h2>

            <div className="flex flex-col mb-2">
              <label className="mb-1 font-bold text-sm">Task:</label>
              <input
                type="text"
                value={task}
                onChange={handleTaskChange}
                className="border border-gray-300 p-2 rounded"
              />
            </div>

            <div className="flex flex-col mb-2">
              <label className="mb-1 font-bold text-sm">PRN No:</label>
              <input
                type="text"
                value={prn}
                onChange={handlePrnChange}
                className="border border-gray-300 p-2 rounded"
              />
            </div>

            <div className="flex flex-col mb-2">
              <label className="mb-1 font-bold text-sm">
                Pick Date and Time:
              </label>
              <input
                type="datetime-local"
                value={dateTime}
                onChange={handleDateTimeChange}
                className="border border-gray-300 p-2 rounded"
              />
            </div>

            <div className="flex flex-col mb-2">
              <label className="mb-1 font-bold text-sm">Status:</label>
              <select
                value={status}
                onChange={handleStatusChange}
                className="border border-gray-300 p-2 rounded"
              >
                <option value="incomplete">Incomplete</option>
                <option value="in progress">In Progress</option>
                <option value="complete">Complete</option>
              </select>
            </div>

            <div className="flex justify-end mt-4">
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setEditingTask(null);
                  resetForm();
                }}
                className="bg-gray-400 text-white px-4 py-2 rounded mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                {editingTask ? "Update" : "Submit"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
