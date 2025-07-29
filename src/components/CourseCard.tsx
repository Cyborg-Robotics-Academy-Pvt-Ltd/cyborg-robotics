import React from "react";
import { BookOpen, Trophy } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface CourseData {
  classNumber: string;
  level: string;
  name: string;
  certificate?: boolean;
  completed?: boolean;
}

interface Student {
  PrnNumber: string;
  username: string;
  courses: CourseData[];
  courseClassNumbers?: {
    [key: string]: string;
  };
}

// Memoized utility functions
const toSlug = React.memo((courseName: string) => {
  if (typeof courseName !== "string" || !courseName) {
    return "";
  }
  return courseName
    .toLowerCase()
    .replace(/ & /g, "-and-")
    .replace(/ \+ /g, "-plus-")
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
});

toSlug.displayName = "toSlug";

const getLevelColor = React.memo((level: string) => {
  switch (level.toLowerCase()) {
    case "1":
    case "beginner":
      return "bg-green-50 text-green-700 border-green-200";
    case "2":
    case "intermediate":
      return "bg-blue-50 text-blue-700 border-blue-200";
    case "3":
    case "advanced":
      return "bg-purple-50 text-purple-700 border-purple-200";
    case "4":
    case "expert":
      return "bg-orange-50 text-orange-700 border-orange-200";
    default:
      return "bg-gray-50 text-gray-700 border-gray-200";
  }
});

getLevelColor.displayName = "getLevelColor";

const getLevelLabel = React.memo((level: string) => {
  switch (level.toLowerCase()) {
    case "1":
    case "beginner":
      return "Beginner";
    case "2":
    case "intermediate":
      return "Intermediate";
    case "3":
    case "advanced":
      return "Advanced";
    case "4":
    case "expert":
      return "Expert";
    default:
      return `Level ${level}`;
  }
});

getLevelLabel.displayName = "getLevelLabel";

interface CourseCardProps {
  course: CourseData;
  index: number;
  student: Student;
  isAdmin: boolean;
  userChecked: boolean;
  editingIndex: number | null;
  newClassNumber: string;
  loading: boolean;
  onEditClick: (index: number, classNumber: string) => void;
  onSave: (index: number) => void;
  onCancel: () => void;
  onNewClassNumberChange: (value: string) => void;
}

const CourseCard = React.memo<CourseCardProps>(
  ({
    course,
    index,
    student,
    isAdmin,
    userChecked,
    editingIndex,
    newClassNumber,
    loading,
    onEditClick,
    onSave,
    onCancel,
    onNewClassNumberChange,
  }) => {
    return (
      <div className="group relative bg-gray-50 border-2 border-gray-200 rounded-2xl p-6 hover:border-red-800/5 hover:bg-white hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 block cursor-pointer overflow-hidden">
        {/* Completed Badge */}
        {course && course.completed && (
          <div className="absolute top-3 right-3 z-30 flex items-center gap-2 bg-green-600 text-white text-sm font-bold px-4 py-1.5 rounded-full shadow-lg animate-bounce">
            <svg
              className="w-5 h-5 text-white"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
            Completed
          </div>
        )}
        {/* Certificate Badge */}
        {course.certificate && (
          <Image
            src="/assets/certificate.png"
            alt="Certificate"
            width={80}
            height={80}
            className="absolute top-2 right-1 object-contain mt-12 z-20"
            loading="lazy"
          />
        )}
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-red-800/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div
          className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg"
          style={{
            background: "#991b1b",
          }}
        >
          <span className="text-white font-bold text-sm">{index + 1}</span>
        </div>
        <div className="relative z-10 mb-6">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-xl"
            style={{
              background: "#991b1b",
            }}
          >
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          {/* Level Badge */}
          <div className="flex items-center mb-3">
            <div
              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getLevelColor(course.level)}`}
            >
              <Trophy className="w-3 h-3 mr-1" />
              {getLevelLabel(course.level)}
            </div>
          </div>
          {/* Only the course title is a link */}
          <Link
            href={`/${student.PrnNumber}/${toSlug(course.name)}?level=${course.level}`}
            className="text-xl font-bold mb-3 line-clamp-2 transition-colors duration-300 block hover:underline"
            style={{ color: "#991b1b" }}
          >
            {course.name}
          </Link>
        </div>
        <div className="relative z-10 bg-white rounded-xl p-4 group-hover:bg-gray-50 transition-all duration-300 border border-gray-200">
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-sm font-medium text-gray-600 transition-colors">
              Class Number
            </span>
            {/* Show Edit button only for admin */}
            {userChecked && isAdmin && editingIndex !== index && (
              <button
                className="ml-2 px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded hover:bg-yellow-200 border border-yellow-300 transition-all duration-200"
                onClick={(e) => {
                  e.preventDefault();
                  onEditClick(index, course.classNumber);
                }}
              >
                Edit
              </button>
            )}
          </div>
          {userChecked && isAdmin && editingIndex === index ? (
            <div className="flex items-center space-x-2">
              <input
                type="text"
                className="border rounded px-2 py-1 text-sm w-24"
                value={newClassNumber}
                onChange={(e) => onNewClassNumberChange(e.target.value)}
                disabled={loading}
              />
              <button
                className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded hover:bg-green-200 border border-green-300 transition-all duration-200"
                onClick={(e) => {
                  e.preventDefault();
                  onSave(index);
                }}
                disabled={loading}
              >
                {loading ? "Saving..." : "Save"}
              </button>
              <button
                className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded hover:bg-gray-200 border border-gray-300 transition-all duration-200"
                onClick={(e) => {
                  e.preventDefault();
                  onCancel();
                }}
                disabled={loading}
              >
                Cancel
              </button>
            </div>
          ) : (
            <p
              className="text-lg font-bold transition-colors duration-300 font-mono"
              style={{ color: "#991b1b" }}
            >
              {course.classNumber || "N/A"}
            </p>
          )}
        </div>
        {/* Subtle animation border */}
        <div className="absolute inset-0 rounded-2xl bg-red-800/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-sm"></div>
      </div>
    );
  }
);

CourseCard.displayName = "CourseCard";

export default CourseCard;
