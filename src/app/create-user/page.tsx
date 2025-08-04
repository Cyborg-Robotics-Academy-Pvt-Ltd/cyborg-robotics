"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "../../../firebaseConfig";
import {
  doc,
  setDoc,
  getDoc,
  serverTimestamp,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import toast, { Toaster } from "react-hot-toast";
import {
  EyeIcon,
  EyeOffIcon,
  UserPlusIcon,
  ShieldCheckIcon,
  GraduationCap,
  UserIcon,
  XCircle,
} from "lucide-react";
import courses from "../../../utils/courses";
import Head from "next/head";

const CreateUser = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("student");
  const [error, setError] = useState("");
  const [userRole, setUserRole] = useState("student");
  const [PrnNumber, setPrnNumber] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [currentUser, setCurrentUser] = useState<
    import("firebase/auth").User | null
  >(null);
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [courseDetails, setCourseDetails] = useState<{
    [key: string]: { level: string; classNumber: string; status: string };
  }>({});
  const [prnExists, setPrnExists] = useState(false);
  const [prnChecking, setPrnChecking] = useState(false);

  const calculatePasswordStrength = (pass: string) => {
    let strength = 0;
    if (pass.length >= 8) strength += 1;
    if (/[A-Z]/.test(pass)) strength += 1;
    if (/[0-9]/.test(pass)) strength += 1;
    if (/[^A-Za-z0-9]/.test(pass)) strength += 1;
    return strength;
  };

  const checkPrnExists = async (prn: string) => {
    if (!prn || prn.trim() === "") {
      setPrnExists(false);
      setPrnChecking(false);
      return;
    }

    setPrnChecking(true);
    try {
      // Query students collection to check if PRN already exists
      const studentsRef = collection(db, "students");
      const q = query(studentsRef, where("PrnNumber", "==", prn.trim()));
      const querySnapshot = await getDocs(q);
      setPrnExists(!querySnapshot.empty);
    } catch (error) {
      console.error("Error checking PRN:", error);
      setPrnExists(false);
    } finally {
      setPrnChecking(false);
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      const user = auth.currentUser;
      if (!user) {
        router.push("/login");
        return;
      }

      // Store current user info
      setCurrentUser(user);

      const adminDoc = await getDoc(doc(db, "admins", user.uid));
      const trainerDoc = await getDoc(doc(db, "trainers", user.uid));

      if (!adminDoc.exists() && !trainerDoc.exists()) {
        router.push("/login");
        return;
      }

      if (adminDoc.exists()) {
        setUserRole("admin");
      } else {
        setUserRole("trainer");
      }
    };

    checkAuth();
  }, [router]);

  // Debounced PRN checking
  useEffect(() => {
    if (role === "student" && PrnNumber) {
      const timeoutId = setTimeout(() => {
        checkPrnExists(PrnNumber);
      }, 500); // Wait 500ms after user stops typing

      return () => clearTimeout(timeoutId);
    } else {
      setPrnExists(false);
      setPrnChecking(false);
    }
  }, [PrnNumber, role]);

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (userRole === "trainer" && role !== "student") {
      setError("As a trainer, you can only create student accounts");
      setIsLoading(false);
      return;
    }

    // Validate password strength
    if (passwordStrength < 2) {
      setError(
        "Password must be at least medium strength (8+ chars, uppercase, numbers)"
      );
      setIsLoading(false);
      return;
    }

    // Check if PRN already exists for students
    if (role === "student" && PrnNumber) {
      try {
        const studentsRef = collection(db, "students");
        const q = query(
          studentsRef,
          where("PrnNumber", "==", PrnNumber.trim())
        );
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          setError(
            "This PRN number is already registered with another account"
          );
          setIsLoading(false);
          return;
        }
      } catch (error) {
        console.error("Error checking PRN existence:", error);
        setError("Error checking PRN number. Please try again.");
        setIsLoading(false);
        return;
      }
    }

    try {
      // Create the user with Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const newUser = userCredential.user;

      // Store user data in appropriate Firestore collection
      const userDocRef = doc(db, role + "s", newUser.uid);
      await setDoc(userDocRef, {
        email: newUser.email,
        username,
        role,
        createdAt: serverTimestamp(),
        lastLogin: null,
        uid: newUser.uid,
        createdBy: currentUser?.uid,
        createdByRole: userRole,
        PrnNumber: PrnNumber,
        emailVerified: newUser.emailVerified,
        status: "ongoing",
        courses: selectedCourses.map((courseName) => ({
          name: courseName,
          level: courseDetails[courseName]?.level || "1",
          classNumber: courseDetails[courseName]?.classNumber || "",
          status: courseDetails[courseName]?.status || "ongoing",
        })),
      });

      // PRN is already stored in the student document, no need for separate mapping

      // Clear form
      setEmail("");
      setPassword("");
      setUsername("");
      setRole("student");
      setPrnNumber("");
      setPasswordStrength(0);
      setSelectedCourses([]);
      setCourseDetails({});

      toast.success(
        `${role.charAt(0).toUpperCase() + role.slice(1)} account created successfully!`
      );
    } catch (error) {
      console.error("Error creating user:", error);
      if (error instanceof FirebaseError) {
        // Handle specific Firebase Auth errors
        switch (error.code) {
          case "auth/email-already-in-use":
            setError("This email address is already registered");
            break;
          case "auth/invalid-email":
            setError("Please enter a valid email address");
            break;
          case "auth/operation-not-allowed":
            setError("Email/password accounts are not enabled");
            break;
          case "auth/weak-password":
            setError("Password is too weak. Please choose a stronger password");
            break;
          case "auth/too-many-requests":
            setError("Too many attempts. Please try again later");
            break;
          default:
            setError(error.message || "Failed to create user account");
        }
      } else {
        setError("Failed to create user account. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const getRoleIcon = (roleType: string) => {
    switch (roleType) {
      case "admin":
        return <ShieldCheckIcon className="w-5 h-5 text-purple-600" />;
      case "trainer":
        return <UserIcon className="w-5 h-5 text-blue-600" />;
      case "student":
        return <GraduationCap className="w-5 h-5 text-green-600" />;
      default:
        return <UserIcon className="w-5 h-5 text-gray-600" />;
    }
  };

  const getPasswordStrengthText = () => {
    switch (passwordStrength) {
      case 0:
        return "Very Weak";
      case 1:
        return "Weak";
      case 2:
        return "Medium";
      case 3:
        return "Strong";
      case 4:
        return "Very Strong";
      default:
        return "Very Weak";
    }
  };

  const getPasswordStrengthColor = () => {
    switch (passwordStrength) {
      case 0:
        return "text-red-600";
      case 1:
        return "text-red-500";
      case 2:
        return "text-yellow-500";
      case 3:
        return "text-green-500";
      case 4:
        return "text-emerald-600";
      default:
        return "text-red-600";
    }
  };

  return (
    <>
      <Head>
        <title>Create User | Cyborg Robotics Academy</title>
        <meta
          name="description"
          content="Create a new user account for Cyborg Robotics Academy."
        />
        <meta
          property="og:title"
          content="Create User | Cyborg Robotics Academy"
        />
        <meta
          property="og:description"
          content="Create a new user account for Cyborg Robotics Academy."
        />
        <meta property="og:type" content="website" />
      </Head>
      <main
        role="main"
        aria-label="Create User Page"
        className="min-h-screen bg-gray-50"
      >
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-white to-gray-100 py-12 px-4 sm:px-6 lg:px-8 md:mt-14">
          <Toaster
            position="top-center"
            reverseOrder={false}
            toastOptions={{
              duration: 5000,
              style: {
                background: "#FFF",
                color: "#333",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                borderRadius: "8px",
                padding: "16px",
              },
              success: {
                iconTheme: {
                  primary: "#10B981",
                  secondary: "#FFF",
                },
              },
              error: {
                iconTheme: {
                  primary: "#EF4444",
                  secondary: "#FFF",
                },
              },
            }}
          />

          <div className="max-w-lg w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl transition-all duration-300 border border-gray-100 hover:shadow-2xl">
            <div className="text-center transform transition-all duration-300 hover:scale-105">
              <div className="mx-auto bg-red-100 rounded-full p-3 w-16 h-16 flex items-center justify-center mb-4 animate-bounce">
                <UserPlusIcon className="h-8 w-8  text-red-800" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 tracking-tight bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
                Create New User
              </h2>
              {userRole === "trainer" && (
                <p className="mt-3 text-sm text-gray-500 bg-yellow-50 py-2 px-3 rounded-lg inline-block animate-pulse">
                  <span className="font-medium">Note:</span> As a trainer, you
                  can only create student accounts
                </p>
              )}
            </div>

            <form className="mt-8 space-y-6" onSubmit={handleSignup}>
              <div className="space-y-5 divide-y divide-gray-100">
                <div className="space-y-5 pb-5">
                  <div className="group">
                    <label
                      htmlFor="username"
                      className="block text-sm font-medium text-gray-700 mb-1 group-hover:text-red-600 transition-colors duration-200"
                    >
                      {role === "student" ? "Student Name *" : "Username *"}
                    </label>
                    <div className="relative transform transition-all duration-200 hover:scale-[1.01]">
                      <input
                        id="username"
                        name="username"
                        type="text"
                        required
                        minLength={3}
                        className="block w-full pl-4 pr-10 py-3 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-200 hover:border-red-300"
                        placeholder="Enter username (min 3 characters)"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <UserIcon className="h-5 w-5 text-gray-400 group-hover:text-red-500 transition-colors duration-200" />
                      </div>
                    </div>
                  </div>

                  <div className="group">
                    <label
                      htmlFor="email-address"
                      className="block text-sm font-medium text-gray-700 mb-1 group-hover:text-red-600 transition-colors duration-200"
                    >
                      Email address *
                    </label>
                    <input
                      id="email-address"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="block w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-200 hover:border-red-300 transform hover:scale-[1.01]"
                      placeholder="Enter email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="group">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700 mb-1 group-hover:text-red-600 transition-colors duration-200"
                    >
                      Password *
                    </label>
                    <div className="relative transform transition-all duration-200 hover:scale-[1.01]">
                      <input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="new-password"
                        required
                        minLength={8}
                        className="block w-full pl-4 pr-10 py-3 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-200 hover:border-red-300"
                        placeholder="Enter password (min 8 characters)"
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                          setPasswordStrength(
                            calculatePasswordStrength(e.target.value)
                          );
                        }}
                      />
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute inset-y-0 right-0 flex items-center pr-3 focus:outline-none"
                      >
                        {showPassword ? (
                          <EyeOffIcon className="h-5 w-5 text-gray-500 hover:text-red-500 transition-colors duration-200" />
                        ) : (
                          <EyeIcon className="h-5 w-5 text-gray-500 hover:text-red-500 transition-colors duration-200" />
                        )}
                      </button>
                    </div>
                    <div className="mt-2 flex gap-1">
                      {[...Array(4)].map((_, i) => (
                        <div
                          key={i}
                          className={`h-1 w-full rounded-full transition-all duration-300 ${
                            i < passwordStrength
                              ? passwordStrength === 1
                                ? "bg-red-500"
                                : passwordStrength === 2
                                  ? "bg-yellow-500"
                                  : passwordStrength === 3
                                    ? "bg-green-500"
                                    : "bg-emerald-500"
                              : "bg-gray-200"
                          }`}
                        />
                      ))}
                    </div>
                    <p className={`mt-1 text-xs ${getPasswordStrengthColor()}`}>
                      Password strength: {getPasswordStrengthText()}
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      Requirements: 8+ characters, uppercase, numbers, special
                      characters
                    </p>
                  </div>
                </div>

                <div className="space-y-5 pt-5">
                  <div className="group">
                    <label className="block text-sm font-medium text-gray-700 mb-1 group-hover:text-red-600 transition-colors duration-200">
                      Select Role *
                    </label>
                    <div className="relative transform transition-all duration-200 hover:scale-[1.01]">
                      <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="block w-full pl-4 pr-10 py-3 border border-gray-300 bg-white rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed appearance-none hover:border-red-300"
                        disabled={userRole === "trainer"}
                      >
                        <option value="student">Student</option>
                        {userRole === "admin" && (
                          <>
                            <option value="trainer">Trainer</option>
                            <option value="admin">Admin</option>
                          </>
                        )}
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        {getRoleIcon(role)}
                      </div>
                    </div>
                  </div>

                  {role === "student" && (
                    <>
                      <div className="group">
                        <label
                          htmlFor="prn-number"
                          className="block text-sm font-medium text-gray-700 mb-1 group-hover:text-red-600 transition-colors duration-200"
                        >
                          PRN Number *
                        </label>
                        <div className="relative">
                          <input
                            id="prn-number"
                            name="prn"
                            type="text"
                            required
                            className={`block w-full px-4 py-3 border rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 transition duration-200 transform hover:scale-[1.01] ${
                              prnExists
                                ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                                : prnChecking
                                  ? "border-yellow-500 focus:ring-yellow-500 focus:border-yellow-500"
                                  : PrnNumber && !prnExists
                                    ? "border-green-500 focus:ring-green-500 focus:border-green-500"
                                    : "border-gray-300 focus:ring-red-500 focus:border-red-500 hover:border-red-300"
                            }`}
                            placeholder="Enter PRN number"
                            value={PrnNumber}
                            onChange={(e) => setPrnNumber(e.target.value)}
                          />
                          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                            {prnChecking ? (
                              <svg
                                className="animate-spin h-5 w-5 text-yellow-500"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <circle
                                  className="opacity-25"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                ></circle>
                                <path
                                  className="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                              </svg>
                            ) : prnExists ? (
                              <XCircle className="h-5 w-5 text-red-500" />
                            ) : PrnNumber && !prnExists ? (
                              <svg
                                className="h-5 w-5 text-green-500"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            ) : null}
                          </div>
                        </div>
                        {prnChecking && (
                          <p className="mt-1 text-xs text-yellow-600">
                            Checking PRN availability...
                          </p>
                        )}
                        {prnExists && (
                          <p className="mt-1 text-xs text-red-600">
                            This PRN number is already registered
                          </p>
                        )}
                        {PrnNumber && !prnExists && !prnChecking && (
                          <p className="mt-1 text-xs text-green-600">
                            PRN number is available
                          </p>
                        )}
                      </div>

                      <div className="group">
                        <label
                          htmlFor="course"
                          className="block text-sm font-medium text-gray-700 mb-1 group-hover:text-red-600 transition-colors duration-200"
                        >
                          Courses *
                        </label>
                        <div className="relative transform transition-all duration-200 hover:scale-[1.01]">
                          <div className="max-h-[200px] overflow-y-auto border border-gray-300 rounded-xl p-2 bg-white">
                            {courses.map((courseName) => (
                              <div
                                key={courseName}
                                className="flex items-center space-x-2 py-1.5 px-2 hover:bg-gray-50 rounded-lg"
                              >
                                <input
                                  type="checkbox"
                                  id={`course-${courseName}`}
                                  checked={selectedCourses.includes(courseName)}
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      setSelectedCourses((prev) => [
                                        ...prev,
                                        courseName,
                                      ]);
                                      setCourseDetails((prev) => ({
                                        ...prev,
                                        [courseName]: {
                                          level: "1",
                                          classNumber: "",
                                          status: "ongoing",
                                        },
                                      }));
                                    } else {
                                      setSelectedCourses((prev) =>
                                        prev.filter((c) => c !== courseName)
                                      );
                                      setCourseDetails((prev) => {
                                        const newState = { ...prev };
                                        delete newState[courseName];
                                        return newState;
                                      });
                                    }
                                  }}
                                  className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                                />
                                <label
                                  htmlFor={`course-${courseName}`}
                                  className="text-sm text-gray-700 cursor-pointer select-none flex-grow"
                                >
                                  {courseName}
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                        {selectedCourses.length > 0 && (
                          <div className="mt-4 space-y-3">
                            <label className="block text-sm font-medium text-gray-700">
                              Selected Courses
                            </label>
                            {selectedCourses.map((courseName) => (
                              <div
                                key={courseName}
                                className="p-3 border border-gray-200 rounded-lg bg-gray-50"
                              >
                                <div className="flex justify-between items-center">
                                  <p className="text-sm font-medium text-gray-800">
                                    {courseName}
                                  </p>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setSelectedCourses((prev) =>
                                        prev.filter((c) => c !== courseName)
                                      );
                                      setCourseDetails((prev) => {
                                        const newState = { ...prev };
                                        delete newState[courseName];
                                        return newState;
                                      });
                                    }}
                                    className="ml-1 inline-flex items-center justify-center w-5 h-5 rounded-full hover:bg-red-200 focus:outline-none"
                                  >
                                    <span className="sr-only">
                                      Remove {courseName}
                                    </span>
                                    <XCircle className="h-4 w-4 text-gray-500 hover:text-red-600" />
                                  </button>
                                </div>
                                <div className="flex items-center space-x-2 mt-2">
                                  <select
                                    value={
                                      courseDetails[courseName]?.level || "1"
                                    }
                                    onChange={(e) =>
                                      setCourseDetails((prev) => ({
                                        ...prev,
                                        [courseName]: {
                                          ...prev[courseName],
                                          level: e.target.value,
                                        },
                                      }))
                                    }
                                    className="w-28 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                                  >
                                    <option value="1">Level 1</option>
                                    <option value="2">Level 2</option>
                                    <option value="3">Level 3</option>
                                  </select>
                                  <input
                                    type="text"
                                    value={
                                      courseDetails[courseName]?.classNumber ||
                                      ""
                                    }
                                    onChange={(e) =>
                                      setCourseDetails((prev) => ({
                                        ...prev,
                                        [courseName]: {
                                          ...prev[courseName],
                                          classNumber: e.target.value,
                                        },
                                      }))
                                    }
                                    placeholder="Class #"
                                    className="w-24 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                                  />
                                  <select
                                    value={
                                      courseDetails[courseName]?.status ||
                                      "ongoing"
                                    }
                                    onChange={(e) =>
                                      setCourseDetails((prev) => ({
                                        ...prev,
                                        [courseName]: {
                                          ...prev[courseName],
                                          status: e.target.value,
                                        },
                                      }))
                                    }
                                    className="w-28 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                                  >
                                    <option value="ongoing">Ongoing</option>
                                    <option value="complete">Complete</option>
                                  </select>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              </div>

              {error && (
                <div className="text-red-600 text-sm bg-red-50 p-4 rounded-xl border border-red-100 flex items-start space-x-2 animate-pulse">
                  <XCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div>
                <button
                  type="submit"
                  disabled={
                    isLoading ||
                    passwordStrength < 2 ||
                    (role === "student" && prnExists)
                  }
                  className="group relative w-full flex justify-center py-3 px-4 border border-transparent rounded-xl text-white bg-gradient-to-r from-red-600 to-red-800 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-200 font-medium text-base shadow-md disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    {isLoading ? (
                      <svg
                        className="animate-spin h-5 w-5 text-red-300"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    ) : (
                      <UserPlusIcon className="h-5 w-5 text-red-300 group-hover:text-red-200 transition-colors duration-200" />
                    )}
                  </span>
                  {isLoading ? "Creating User..." : "Create User"}
                </button>
              </div>
            </form>

            <div className="flex justify-center mt-4">
              <button
                onClick={() => router.back()}
                className="text-sm text-gray-600 hover:text-red-600 transition-colors duration-200 flex items-center space-x-1 group transform hover:scale-105"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 transform group-hover:-translate-x-1 transition-transform duration-200"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                <span>Go back</span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default CreateUser;
