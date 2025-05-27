"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React, { useEffect, useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { app } from "../../../firebaseConfig";
import {
  UsersRound,
  Search,
  ChevronDown,
  Download,
  MoreHorizontal,
  UserPlus,
  XCircle,
  Filter,
  Eye,
  Edit,
  Trash2,
} from "lucide-react";
import * as XLSX from "xlsx";
import Link from "next/link";

const Page = () => {
  interface Task {
    course: string;
    dateTime: string;
    status: string;
    task: string;
  }

  interface Student {
    id: string;
    PrnNumber: string;
    username: string;
    email: string;
    completedTasks: number;
    ongoingTasks: number;
    tasks: Task[];
  }

  const [students, setStudents] = useState<Student[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [sortColumn, setSortColumn] = useState<
    "PrnNumber" | "username" | "email" | "completedTasks"
  >("PrnNumber");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [showDropdown, setShowDropdown] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchStudents = async () => {
      setLoading(true);
      try {
        const db = getFirestore(app);
        const studentsCollection = collection(db, "students");
        const studentSnapshot = await getDocs(studentsCollection);

        const studentList = studentSnapshot.docs.map((doc) => {
          const data = doc.data();
          console.log(`Fetching data for student: ${doc.id}`, data);

          // Get tasks directly from student document
          const tasks: Task[] = data.tasks || [];
          console.log(`Found ${tasks.length} tasks for student ${doc.id}`);

          let completedTasksCount = 0;
          let ongoingTasksCount = 0;

          tasks.forEach((task: Task) => {
            const status = (task.status || "").toLowerCase();
            if (status === "complete") {
              completedTasksCount++;
            } else if (status === "ongoing") {
              ongoingTasksCount++;
            }
            console.log(`Task for ${doc.id}:`, {
              course: task.course,
              status: task.status,
              task: task.task,
            });
          });

          console.log(`Student ${doc.id} task counts:`, {
            completed: completedTasksCount,
            ongoing: ongoingTasksCount,
            total: tasks.length,
          });

          return {
            id: doc.id,
            PrnNumber: data.PrnNumber || "",
            username: data.username || data.email?.split("@")[0] || "",
            email: data.email || "",
            completedTasks: completedTasksCount,
            ongoingTasks: ongoingTasksCount,
            tasks: tasks,
          } as Student;
        });

        console.log("Final student list with tasks:", studentList);
        setStudents(studentList);
      } catch (error) {
        console.error("Error fetching students:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  useEffect(() => {
    const handleClickOutside = () => {
      setShowDropdown(null);
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const filteredStudents = students
    .filter(
      (student) =>
        student.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.PrnNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.completedTasks.toString().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const valA =
        sortColumn === "completedTasks"
          ? a.completedTasks
          : a[sortColumn].toLowerCase();
      const valB =
        sortColumn === "completedTasks"
          ? b.completedTasks
          : b[sortColumn].toLowerCase();

      if (sortDirection === "asc") {
        return valA > valB ? 1 : -1;
      } else {
        return valA < valB ? 1 : -1;
      }
    });

  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
  const paginatedStudents = filteredStudents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSort = (
    column: "PrnNumber" | "username" | "email" | "completedTasks"
  ) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const handleExport = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredStudents);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Students");
    XLSX.writeFile(workbook, "students.xlsx");
  };

  const toggleDropdown = (studentId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setShowDropdown(showDropdown === studentId ? null : studentId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 font-sans">
      <header className="bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-white bg-opacity-20 p-3 rounded-xl">
                <UsersRound className="h-7 w-7" />
              </div>
              <h1 className="text-3xl font-bold tracking-tight">
                Student Portal
              </h1>
            </div>
            <div className="flex items-center space-x-3">
              <Link
                href="/admin/create-user"
                className="inline-flex items-center px-4 py-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-xl text-sm font-medium transition-all duration-200 hover:scale-105"
              >
                <UserPlus className="h-4 w-4 mr-2" />
                Add Student
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight sm:text-3xl">
              Student Directory
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Manage and view all registered students in the system
            </p>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-4">
            <button
              className="inline-flex items-center px-5 py-2.5 bg-red-600 text-white rounded-xl shadow-sm text-sm font-medium hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-200 hover:scale-105"
              onClick={handleExport}
              aria-label="Export student data to Excel"
            >
              <Download className="h-4 w-4 mr-2" />
              Export to Excel
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-8 p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex-1">
              <div className="relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-12 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                  placeholder="Search by name, email, PRN, or classes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  aria-label="Search students"
                />
                {searchTerm && (
                  <button
                    className="absolute inset-y-0 right-0 flex items-center pr-4"
                    onClick={() => setSearchTerm("")}
                    aria-label="Clear search"
                  >
                    <XCircle className="h-5 w-5 text-gray-400 hover:text-red-500 transition-colors" />
                  </button>
                )}
              </div>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div className="bg-red-50 text-red-700 px-4 py-2 rounded-full font-medium flex items-center">
                <UsersRound className="h-4 w-4 mr-2" />
                Students: {students.length}
              </div>
              <div className="bg-green-50 text-green-700 px-4 py-2 rounded-full font-medium flex items-center">
                <Filter className="h-4 w-4 mr-2" />
                Showing: {filteredStudents.length}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-xl border border-gray-100 overflow-hidden">
          {loading ? (
            <div className="p-12 flex flex-col items-center justify-center">
              <div className="animate-pulse space-y-4 w-full max-w-4xl">
                <div className="h-8 bg-gray-100 rounded w-full"></div>
                <div className="space-y-2">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="h-12 bg-gray-100 rounded w-full"
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          ) : paginatedStudents.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50 border-b border-gray-200">
                    <TableHead
                      className="font-semibold text-gray-700 py-4 px-6 cursor-pointer hover:text-red-600 transition-colors"
                      onClick={() => handleSort("PrnNumber")}
                    >
                      <div className="flex items-center">
                        PRN Number
                        {sortColumn === "PrnNumber" && (
                          <ChevronDown
                            className={`ml-2 h-4 w-4 transform transition-transform ${sortDirection === "desc" ? "rotate-180" : ""}`}
                          />
                        )}
                      </div>
                    </TableHead>
                    <TableHead
                      className="font-semibold text-gray-700 py-4 px-6 cursor-pointer hover:text-red-600 transition-colors"
                      onClick={() => handleSort("username")}
                    >
                      <div className="flex items-center">
                        Student Name
                        {sortColumn === "username" && (
                          <ChevronDown
                            className={`ml-2 h-4 w-4 transform transition-transform ${sortDirection === "desc" ? "rotate-180" : ""}`}
                          />
                        )}
                      </div>
                    </TableHead>
                    <TableHead
                      className="font-semibold text-gray-700 py-4 px-6 cursor-pointer hover:text-red-600 transition-colors"
                      onClick={() => handleSort("email")}
                    >
                      <div className="flex items-center">
                        Email Address
                        {sortColumn === "email" && (
                          <ChevronDown
                            className={`ml-2 h-4 w-4 transform transition-transform ${sortDirection === "desc" ? "rotate-180" : ""}`}
                          />
                        )}
                      </div>
                    </TableHead>
                    <TableHead
                      className="font-semibold text-gray-700 py-4 px-6 cursor-pointer hover:text-red-600 transition-colors"
                      onClick={() => handleSort("completedTasks")}
                    >
                      <div className="flex items-center">
                        Classes
                        {sortColumn === "completedTasks" && (
                          <ChevronDown
                            className={`ml-2 h-4 w-4 transform transition-transform ${sortDirection === "desc" ? "rotate-180" : ""}`}
                          />
                        )}
                      </div>
                    </TableHead>
                    <TableHead className="font-semibold text-gray-700 py-4 px-6 text-right">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedStudents.map((student) => (
                    <TableRow
                      key={student.id}
                      className="hover:bg-red-50 transition-colors duration-200 border-b border-gray-100"
                    >
                      <TableCell className="font-mono text-gray-800 py-4 px-6">
                        <Link
                          href={`/${student.PrnNumber}`}
                          className="font-medium text-red-600 hover:text-red-800 transition-colors hover:underline"
                        >
                          {student.PrnNumber}
                        </Link>
                      </TableCell>
                      <TableCell className="font-medium text-gray-900 py-4 px-6">
                        {student.username}
                      </TableCell>
                      <TableCell className="text-gray-600 py-4 px-6">
                        <a
                          href={`mailto:${student.email}`}
                          className="hover:text-red-600 transition-colors hover:underline"
                        >
                          {student.email}
                        </a>
                      </TableCell>
                      <TableCell className="text-gray-600 py-4 px-6">
                        <div className="space-y-2">
                          <span
                            className={`${
                              student.completedTasks > 15
                                ? "bg-red-100 text-red-700"
                                : "bg-green-100 text-green-700"
                            } px-3 py-1 rounded-full text-sm font-medium`}
                          >
                            Completed : {student.completedTasks}
                          </span>
                          {student.tasks
                            .filter(
                              (t) => t.status.toLowerCase() === "complete"
                            )
                            .slice(0, 1)
                            .map((task, i) => (
                              <div
                                key={i}
                                className="text-xs text-gray-500 mt-1"
                              >
                                Latest Completed: {task.course} - {task.task}
                              </div>
                            ))}
                        </div>
                      </TableCell>
                      <TableCell className="text-right py-4 px-6 relative">
                        <button
                          className="text-gray-500 hover:text-gray-700 focus:outline-none p-2 rounded-full hover:bg-gray-100 transition-colors"
                          onClick={(e) => toggleDropdown(student.id, e)}
                          aria-label={`More actions for ${student.username}`}
                        >
                          <MoreHorizontal className="h-5 w-5" />
                        </button>
                        {showDropdown === student.id && (
                          <div className="absolute right-6 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 py-1 z-10 animate-fadeIn">
                            <Link
                              href={`/${student.PrnNumber}`}
                              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-700 transition-colors"
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </Link>
                            <Link
                              href={`/edit/${student.id}`}
                              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-700 transition-colors"
                            >
                              <Edit className="h-4 w-4 mr-2" />
                              Edit Student
                            </Link>
                            <button className="flex items-center w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete Student
                            </button>
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="p-16 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 text-red-600 mb-4">
                <UsersRound className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                No Students Found
              </h3>
              <p className="mt-2 text-sm text-gray-600 max-w-md mx-auto">
                {searchTerm
                  ? "Try adjusting your search terms or check if the student is registered."
                  : "No students are currently registered in the system."}
              </p>
              <div className="mt-6 flex justify-center gap-3">
                {searchTerm && (
                  <button
                    className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-xl shadow-sm text-sm font-medium hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-200"
                    onClick={() => setSearchTerm("")}
                  >
                    Clear Search
                  </button>
                )}
                <Link
                  href="/admin/create-user"
                  className="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-xl shadow-sm text-sm font-medium hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all duration-200"
                >
                  <UserPlus className="h-4 w-4 mr-2" />
                  Add Student
                </Link>
              </div>
            </div>
          )}

          {paginatedStudents.length > 0 && !loading && (
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-sm text-gray-600">
                Showing {paginatedStudents.length} of {filteredStudents.length}{" "}
                students
              </p>
              <div className="flex items-center space-x-2">
                <button
                  className="px-4 py-2 border border-gray-300 rounded-xl text-sm text-gray-700 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={() => setCurrentPage((prev) => prev - 1)}
                  disabled={currentPage === 1}
                  aria-label="Previous page"
                >
                  Previous
                </button>
                <span className="text-sm text-gray-600">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  className="px-4 py-2 border border-gray-300 rounded-xl text-sm text-gray-700 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                  disabled={currentPage === totalPages}
                  aria-label="Next page"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Page;
