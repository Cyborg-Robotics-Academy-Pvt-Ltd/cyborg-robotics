"use client";
import React, { useEffect, useState, useMemo, useCallback } from "react";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { app } from "../../../../firebaseConfig";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Search,
  Loader2,
  ChevronUp,
  ChevronDown,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

interface Registration {
  id: string;
  studentName?: string;
  dateOfBirth?: string;
  currentAge?: string;
  schoolName?: string;
  class?: string;
  board?: string;
  fatherName?: string;
  fatherContact?: string;
  fatherEmail?: string;
  motherName?: string;
  motherContact?: string;
  motherEmail?: string;
  currentAddress?: string;
  permanentAddress?: string;
  studentPRN?: string;
  courseType?: string;
  dateOfJoining?: string;
  duration?: string; // Add missing properties
  sessions?: string;
  registrationFees?: string;
  courseFees?: string;
  amountPaid?: string;
  balanceAmount?: string;
  modeOfPayment?: string;
  acceptedBy?: string;
  remark?: string;
  trainers?: string; // Add trainers
  course?: string; // Add course
  type?: string; // Add type
  location?: string; // Add location
  preferredDay?: string;
  preferredTime?: string;
  studentRegistrationNo?: string; // Add studentRegistrationNo
}

const ITEMS_PER_PAGE = 10;

const Page = () => {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [filteredRegistrations, setFilteredRegistrations] = useState<
    Registration[]
  >([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Registration;
    direction: "asc" | "desc";
  } | null>(null);

  const fetchRegistrations = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const db = getFirestore(app);
      const registrationsCollection = collection(db, "registrations");
      const registrationsSnapshot = await getDocs(registrationsCollection);
      const registrationsList = registrationsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Registration, "id">),
      }));
      setRegistrations(registrationsList);
      setFilteredRegistrations(registrationsList);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching registrations:", err);
      setError("Failed to load registrations. Please try again later.");
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRegistrations();
  }, [fetchRegistrations]);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredRegistrations(registrations);
      setCurrentPage(1);
      return;
    }

    const lowercasedSearch = searchTerm.toLowerCase();
    const filtered = registrations.filter(
      (reg) =>
        reg.studentName?.toLowerCase().includes(lowercasedSearch) ||
        reg.fatherName?.toLowerCase().includes(lowercasedSearch) ||
        reg.motherName?.toLowerCase().includes(lowercasedSearch) ||
        reg.schoolName?.toLowerCase().includes(lowercasedSearch)
    );

    setFilteredRegistrations(filtered);
    setCurrentPage(1);
  }, [searchTerm, registrations]);

  const sortedRegistrations = useMemo(() => {
    if (!sortConfig) return filteredRegistrations;

    const sorted = [...filteredRegistrations].sort((a, b) => {
      const aValue = a[sortConfig.key] || "";
      const bValue = b[sortConfig.key] || "";
      if (sortConfig.direction === "asc") {
        return aValue.localeCompare(bValue);
      }
      return bValue.localeCompare(aValue);
    });

    return sorted;
  }, [filteredRegistrations, sortConfig]);

  const handleSort = (key: keyof Registration) => {
    setSortConfig((prev) => {
      if (prev?.key === key && prev.direction === "asc") {
        return { key, direction: "desc" };
      }
      return { key, direction: "asc" };
    });
  };

  const exportToExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Registrations");

    worksheet.columns = [
      { header: "Date of Registration", key: "dateOfRegistration", width: 20 },
      {
        header: "Student Registration No.",
        key: "studentRegistrationNo",
        width: 25,
      },
      { header: "Name of the Child", key: "studentName", width: 20 },
      { header: "Age", key: "currentAge", width: 10 },
      { header: "DOB", key: "dateOfBirth", width: 15 },
      { header: "Class", key: "class", width: 10 },
      { header: "School Name", key: "schoolName", width: 25 },
      { header: "Board", key: "board", width: 15 },
      { header: "Father's Name", key: "fatherName", width: 20 },
      { header: "Contact No.", key: "fatherContact", width: 15 },
      { header: "Father Email ID", key: "fatherEmail", width: 25 }, // Fixed key
      { header: "Mother's Name", key: "motherName", width: 20 },
      { header: "Contact No.", key: "motherContact", width: 15 },
      { header: "Email ID", key: "motherEmail", width: 25 },
      { header: "Current Address", key: "currentAddress", width: 30 },
      { header: "Permanent Address", key: "permanentAddress", width: 30 },
      { header: "Course", key: "course", width: 20 },
      { header: "Type", key: "type", width: 20 },
      { header: "Location", key: "location", width: 20 },
      { header: "Preferred Day", key: "preferredDay", width: 15 },
      { header: "Preferred Time", key: "preferredTime", width: 15 },
      { header: "Date of Joining", key: "dateOfJoining", width: 15 },
      { header: "Duration (Hrs)", key: "duration", width: 15 },
      { header: "No. of Sessions", key: "sessions", width: 15 },
      { header: "Registration Fees", key: "registrationFees", width: 20 },
      { header: "Course Fees", key: "courseFees", width: 15 },
      { header: "Amount Paid", key: "amountPaid", width: 15 },
      { header: "Balance Amount", key: "balanceAmount", width: 15 },
      { header: "Mode of Payment", key: "modeOfPayment", width: 20 },
      { header: "Accepted By", key: "acceptedBy", width: 15 },
      { header: "Remark", key: "remark", width: 20 },
      { header: "Trainers", key: "trainers", width: 20 },
    ];

    const headerRow = worksheet.getRow(1);
    headerRow.eachCell((cell) => {
      cell.font = { bold: true, color: { argb: "FFFFFFFF" } };
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "ff0c0c" },
      };
      cell.alignment = { vertical: "middle", horizontal: "center" };
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
    });

    const currentDate = new Date().toLocaleDateString(); // Get the current date in a readable format

    sortedRegistrations.forEach((reg) => {
      const row = worksheet.addRow({
        dateOfJoining: reg.dateOfJoining || "",
        duration: reg.duration || "",
        sessions: reg.sessions || "",
        registrationFees: reg.registrationFees || "",
        courseFees: reg.courseFees || "",
        amountPaid: reg.amountPaid || "",
        balanceAmount: reg.balanceAmount || "",
        modeOfPayment: reg.modeOfPayment || "",
        acceptedBy: reg.acceptedBy || "",
        remark: reg.remark || "",
        trainers: reg.trainers || "",
        fatherName: reg.fatherName || "",
        fatherEmail: reg.fatherEmail || "",
        motherName: reg.motherName || "",
        motherContact: reg.motherContact || "",
        motherEmail: reg.motherEmail || "",
        currentAddress: reg.currentAddress || "",
        permanentAddress: reg.permanentAddress || "",
        course: reg.course || "", // Ensure this matches the key in worksheet.columns
        type: reg.type || "", // Ensure this matches the key in worksheet.columns
        location: reg.location || "",
        preferredDay: reg.preferredDay || "",
        preferredTime: reg.preferredTime || "",
        dateOfRegistration: currentDate,
        studentRegistrationNo: reg.studentRegistrationNo || "",
        studentName: reg.studentName || "",
        currentAge: reg.currentAge || "",
        dateOfBirth: reg.dateOfBirth || "",
        class: reg.class || "",
        schoolName: reg.schoolName || "",
        board: reg.board || "",
        fatherContact: reg.fatherContact || "",
      });

      row.eachCell((cell) => {
        cell.alignment = { vertical: "middle", wrapText: true };
        cell.border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };

        // Force borders even for empty cells
        if (!cell.value) {
          cell.value = ""; // Ensure the cell is not null
        }
      });
    });

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, "Student_Registrations.xlsx");
  };

  const totalPages = Math.ceil(sortedRegistrations.length / ITEMS_PER_PAGE);
  const paginatedRegistrations = sortedRegistrations.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="container mx-auto px-4 py-12 max-w-7xl mt-20"
    >
      <Card className="shadow-lg border border-slate-100 rounded-2xl overflow-hidden bg-white">
        <CardHeader className="bg-gradient-to-r from-indigo-50 to-blue-50 p-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
            <CardTitle className="text-3xl font-bold text-slate-900 tracking-tight">
              Student Registrations
            </CardTitle>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <div className="relative w-full sm:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
                <Input
                  className="pl-10 pr-4 py-2.5 rounded-lg border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 text-base shadow-sm placeholder:text-slate-400"
                  placeholder="Search by name or school..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  aria-label="Search registrations"
                />
              </div>
              <div className="flex gap-4">
                <Button
                  onClick={fetchRegistrations}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-xl shadow-sm transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Refresh data"
                  disabled={loading}
                >
                  <RefreshCw
                    className={`h-5 w-5 mr-2 ${loading ? "animate-spin" : ""}`}
                  />
                  Refresh
                </Button>
                <Button
                  onClick={exportToExcel}
                  className="bg-red-600 hover:bg-red-700 text-white font-medium py-2.5 rounded-xl shadow-sm transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Export to Excel"
                  disabled={loading || sortedRegistrations.length === 0}
                >
                  Export to Excel
                </Button>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex justify-center items-center p-12 bg-slate-50">
              <Loader2 className="h-10 w-10 animate-spin text-indigo-600" />
              <span className="ml-3 text-lg text-slate-600 font-medium">
                Loading registrations...
              </span>
            </div>
          ) : error ? (
            <div className="p-10 text-center text-red-500 text-lg font-medium bg-red-50 rounded-b-2xl">
              {error}
            </div>
          ) : (
            <div>
              {/* Removed max-h-[650px] and overflow-x-auto */}
              <Table>
                <TableHeader className="bg-slate-50 sticky top-0 z-10 shadow-md">
                  <TableRow>
                    {[
                      { key: "studentName", label: "Student Name" },
                      { key: "dateOfBirth", label: "Date of Birth" },
                      { key: "currentAge", label: "Age" },
                      { key: "schoolName", label: "School" },
                      { key: "class", label: "Class" },
                      { key: "board", label: "Board" },
                      { key: null, label: "Parent Details" },
                      { key: null, label: "Contact Details" },
                    ].map((column) => (
                      <TableHead
                        key={column.label}
                        className="font-semibold text-slate-900 text-sm uppercase tracking-wider py-4 cursor-pointer hover:bg-slate-100 transition-colors duration-200 whitespace-nowrap"
                        onClick={() =>
                          column.key &&
                          handleSort(column.key as keyof Registration)
                        }
                      >
                        <div className="flex items-center gap-2">
                          {column.label}
                          {column.key &&
                            sortConfig?.key === column.key &&
                            (sortConfig.direction === "asc" ? (
                              <ChevronUp className="h-4 w-4 text-indigo-600" />
                            ) : (
                              <ChevronDown className="h-4 w-4 text-indigo-600" />
                            ))}
                        </div>
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedRegistrations.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={8} // Updated colSpan to 8 since PRN is removed from the table
                        className="text-center py-12 text-slate-600 text-base font-medium"
                      >
                        No registrations found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    paginatedRegistrations.map((registration) => (
                      <TableRow
                        key={registration.id}
                        className="border-b border-slate-100 hover:bg-indigo-50 transition-colors duration-200"
                      >
                        <TableCell className="font-medium text-slate-900 py-3.5 whitespace-nowrap">
                          {registration.studentName || "-"}
                        </TableCell>
                        <TableCell className="text-slate-600">
                          {registration.dateOfBirth || "-"}
                        </TableCell>
                        <TableCell className="text-slate-600">
                          {registration.currentAge || "-"}
                        </TableCell>
                        <TableCell className="text-slate-600">
                          {registration.schoolName || "-"}
                        </TableCell>
                        <TableCell className="text-slate-600">
                          {registration.class || "-"}
                        </TableCell>
                        <TableCell className="text-slate-600">
                          {registration.board || "-"}
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1.5">
                            <div>
                              <span className="font-medium text-slate-900">
                                Father:
                              </span>{" "}
                              {registration.fatherName || "-"}
                            </div>
                            <div>
                              <span className="font-medium text-slate-900">
                                Mother:
                              </span>{" "}
                              {registration.motherName || "-"}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1.5">
                            <div className="text-slate-600">
                              {registration.fatherContact ||
                                registration.motherContact ||
                                "-"}
                            </div>
                            <div className="text-xs text-slate-500 truncate max-w-xs">
                              {registration.currentAddress || "-"}
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
              <div className="flex flex-col sm:flex-row justify-between items-center p-6 bg-slate-50 text-sm text-slate-600">
                <div className="font-medium">
                  Showing {paginatedRegistrations.length} of{" "}
                  {sortedRegistrations.length} registrations
                </div>
                {totalPages > 1 && (
                  <div className="flex items-center gap-3 mt-4 sm:mt-0">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-slate-200 text-slate-700 hover:bg-indigo-600 hover:text-white transition-colors duration-300 disabled:opacity-50"
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(prev - 1, 1))
                      }
                      disabled={currentPage === 1}
                      aria-label="Previous page"
                    >
                      Previous
                    </Button>
                    <span className="font-medium">
                      Page {currentPage} of {totalPages}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-slate-200 text-slate-700 hover:bg-indigo-600 hover:text-white transition-colors duration-300 disabled:opacity-50"
                      onClick={() =>
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                      }
                      disabled={currentPage === totalPages}
                      aria-label="Next page"
                    >
                      Next
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default Page;
