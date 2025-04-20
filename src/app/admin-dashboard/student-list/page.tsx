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
import { app } from "../../../../firebaseConfig";
import {
  UsersRound,
  Search,
  ChevronDown,
  Download,
  MoreHorizontal,
  Mail,
  UserPlus,
} from "lucide-react";
import * as XLSX from "xlsx";

const Page = () => {
  interface Student {
    id: string;
    PrnNumber: string;
    username: string;
    email: string;
  }

  const [students, setStudents] = useState<Student[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [sortColumn, setSortColumn] = useState<
    "PrnNumber" | "username" | "email"
  >("PrnNumber");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    const fetchStudents = async () => {
      setLoading(true);
      try {
        const db = getFirestore(app);
        const studentsCollection = collection(db, "students");
        const studentSnapshot = await getDocs(studentsCollection);
        const studentList = studentSnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            PrnNumber: data.PrnNumber || "",
            username: data.username || "",
            email: data.email || "",
          } as Student;
        });
        setStudents(studentList);
      } catch (error) {
        console.error("Error fetching students:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  // Filter students based on search term
  const filteredStudents = students
    .filter(
      (student) =>
        student.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.PrnNumber.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const valA = a[sortColumn].toLowerCase();
      const valB = b[sortColumn].toLowerCase();

      if (sortDirection === "asc") {
        return valA > valB ? 1 : -1;
      } else {
        return valA < valB ? 1 : -1;
      }
    });

  const handleSort = (column: "PrnNumber" | "username" | "email") => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  // Function to handle Excel export
  const handleExport = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredStudents);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Students");
    XLSX.writeFile(workbook, "students.xlsx");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Dashboard header */}
      <div className="bg-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <UsersRound className="h-8 w-8" />
              <h1 className="text-2xl font-bold">Student Portal</h1>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <button className="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-xl px-4 py-2 text-sm font-medium flex items-center transition-colors">
                <UserPlus className="h-4 w-4 mr-2" />
                Add Student
              </button>
              <button className="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-xl px-4 py-2 text-sm font-medium flex items-center transition-colors">
                <Mail className="h-4 w-4 mr-2" />
                Message All
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page header */}
        <div className="md:flex md:items-center md:justify-between mb-6">
          <div className="flex-1 min-w-0">
            <h2 className="text-xl font-bold leading-7 text-gray-900 sm:text-2xl sm:truncate">
              Student Directory
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Manage and view all registered students in the system
            </p>
          </div>
          <div className="mt-4 flex md:mt-0 md:ml-4 space-x-3">
            <button
              className="inline-flex rounded-xl items-center px-4 py-2 border border-transparent  shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={handleExport}
            >
              <Download className="h-4 w-4 mr-2" />
              Export
            </button>
          </div>
        </div>

        {/* Search and stats card */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="p-5">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="flex-1 mb-4 md:mb-0 md:mr-4">
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    className="block w-full pl-8 pr-12 py-3 border border-gray-200 bg-white/90 backdrop-blur-sm rounded-xl text-gray-800 placeholder-gray-400 shadow-sm transition-all duration-200 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-400 focus:shadow-md focus:outline-none"
                    placeholder="Search by name, email or ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  {searchTerm && (
                    <button
                      className="absolute inset-y-0 right-0 flex items-center pr-3"
                      onClick={() => setSearchTerm("")}
                    >
                      <div className="hover:bg-gray-100 p-1 rounded-full transition-colors">
                        
                      </div>
                    </button>
                  )}
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
                <div className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full font-medium">
                  Total: {students.length}
                </div>
                <div className="bg-green-50 text-green-700 px-3 py-1 rounded-full font-medium">
                  Showing: {filteredStudents.length}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Table card */}
        <div className="bg-white shadow rounded-xl overflow-hidden">
          {loading ? (
            <div className="p-12 flex items-center justify-center">
              <div className="flex flex-col items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
                <p className="mt-4 text-gray-500">Loading student data...</p>
              </div>
            </div>
          ) : filteredStudents.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50 border-b border-gray-200">
                    <TableHead
                      className="font-semibold text-gray-600 py-3 px-4"
                      onClick={() => handleSort("PrnNumber")}
                    >
                      <div className="flex items-center cursor-pointer">
                        Student ID
                        {sortColumn === "PrnNumber" && (
                          <ChevronDown
                            className={`ml-1 h-4 w-4 transform ${sortDirection === "desc" ? "rotate-180" : ""}`}
                          />
                        )}
                      </div>
                    </TableHead>
                    <TableHead
                      className="font-semibold text-gray-600 py-3 px-4"
                      onClick={() => handleSort("username")}
                    >
                      <div className="flex items-center cursor-pointer">
                        Name
                        {sortColumn === "username" && (
                          <ChevronDown
                            className={`ml-1 h-4 w-4 transform ${sortDirection === "desc" ? "rotate-180" : ""}`}
                          />
                        )}
                      </div>
                    </TableHead>
                    <TableHead
                      className="font-semibold text-gray-600 py-3 px-4"
                      onClick={() => handleSort("email")}
                    >
                      <div className="flex items-center cursor-pointer">
                        Email
                        {sortColumn === "email" && (
                          <ChevronDown
                            className={`ml-1 h-4 w-4 transform ${sortDirection === "desc" ? "rotate-180" : ""}`}
                          />
                        )}
                      </div>
                    </TableHead>
                    <TableHead className="font-semibold text-gray-600 py-3 px-4 text-right">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudents.map((student) => (
                    <TableRow
                      key={student.id}
                      className="hover:bg-indigo-50 transition-colors border-b border-gray-100"
                    >
                      <TableCell className="font-mono text-gray-800 py-4">
                        {student.PrnNumber}
                      </TableCell>
                      <TableCell className="font-medium text-gray-900">
                        {student.username}
                      </TableCell>
                      <TableCell className="text-indigo-600">
                        {student.email}
                      </TableCell>
                      <TableCell className="text-right">
                        <button className="text-gray-400 hover:text-gray-500 focus:outline-none">
                          <MoreHorizontal className="h-5 w-5" />
                        </button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="p-12 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 text-indigo-600 mb-4">
                <UsersRound className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">
                No students found
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                {searchTerm
                  ? "Try adjusting your search terms to find what you're looking for."
                  : "No students are registered in the system yet."}
              </p>
              {searchTerm && (
                <button
                  className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-xl shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={() => setSearchTerm("")}
                >
                  Clear search
                </button>
              )}
            </div>
          )}

          {/* Footer */}
          {filteredStudents.length > 0 && !loading && (
            <div className="bg-gray-50 px-6 py-3 border-t border-gray-200 flex items-center justify-between">
              <p className="text-sm text-gray-500">
                Showing {filteredStudents.length} of {students.length} students
              </p>
              <div className="flex items-center space-x-2">
                <button
                  className="px-3 py-1 border border-gray-300 rounded-xl text-sm text-gray-700 hover:bg-gray-100"
                  disabled
                >
                  Previous
                </button>
                <button
                  className="px-3 py-1 border border-gray-300 rounded-xl text-sm text-gray-700 hover:bg-gray-100"
                  disabled
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
