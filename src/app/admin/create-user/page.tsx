"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "../../../../firebaseConfig";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
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
  const [classes, setClasses] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const calculatePasswordStrength = (pass: string) => {
    let strength = 0;
    if (pass.length >= 8) strength += 1;
    if (/[A-Z]/.test(pass)) strength += 1;
    if (/[0-9]/.test(pass)) strength += 1;
    if (/[^A-Za-z0-9]/.test(pass)) strength += 1;
    return strength;
  };

  useEffect(() => {
    const checkAuth = async () => {
      const user = auth.currentUser;
      if (!user) {
        router.push("/login");
        return;
      }

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

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (userRole === "trainer" && role !== "student") {
      setError("As a trainer, you can only create student accounts");
      setIsLoading(false);
      return;
    }

    try {
      const userDocRef = doc(db, role + "s", PrnNumber);
      await setDoc(userDocRef, {
        email,
        username,
        role,
        createdAt: serverTimestamp(),
        lastLogin: serverTimestamp(),
        uid: auth.currentUser?.uid,
        createdBy: auth.currentUser?.uid,
        createdByRole: userRole,
        classes,
        PrnNumber: PrnNumber,
      });

      setEmail("");
      setPassword("");
      setUsername("");
      setRole("student");
      setPrnNumber("");
      setClasses("");
      toast.success("User created successfully!");
    } catch (error) {
      if (error instanceof FirebaseError) {
        setError(error.message || "Failed to create user");
      } else {
        setError("Failed to create user");
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

  return (
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
            <UserPlusIcon className="h-8 w-8 text-red-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent">
            Create New User
          </h2>
          {userRole === "trainer" && (
            <p className="mt-3 text-sm text-gray-500 bg-yellow-50 py-2 px-3 rounded-lg inline-block animate-pulse">
              <span className="font-medium">Note:</span> As a trainer, you can
              only create student accounts
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
                  Username
                </label>
                <div className="relative transform transition-all duration-200 hover:scale-[1.01]">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    className="block w-full pl-4 pr-10 py-3 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-200 hover:border-red-300"
                    placeholder="Enter username"
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
                  Email address
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
                  Password
                </label>
                <div className="relative transform transition-all duration-200 hover:scale-[1.01]">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    className="block w-full pl-4 pr-10 py-3 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-200 hover:border-red-300"
                    placeholder="Enter password"
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
                <p className="mt-1 text-xs text-gray-500">
                  Password strength:{" "}
                  {passwordStrength === 0
                    ? "Very Weak"
                    : passwordStrength === 1
                      ? "Weak"
                      : passwordStrength === 2
                        ? "Medium"
                        : passwordStrength === 3
                          ? "Strong"
                          : "Very Strong"}
                </p>
              </div>
            </div>

            <div className="space-y-5 pt-5">
              <div className="group">
                <label
                  htmlFor="prn-number"
                  className="block text-sm font-medium text-gray-700 mb-1 group-hover:text-red-600 transition-colors duration-200"
                >
                  PRN Number
                </label>
                <input
                  id="prn-number"
                  name="prn"
                  type="tel"
                  autoComplete="tel"
                  required
                  className="block w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-200 hover:border-red-300 transform hover:scale-[1.01]"
                  placeholder="Enter PRN number"
                  value={PrnNumber}
                  onChange={(e) => setPrnNumber(e.target.value)}
                />
              </div>

              <div className="group">
                <label
                  htmlFor="Assign-classes"
                  className="block text-sm font-medium text-gray-700 mb-1 group-hover:text-red-600 transition-colors duration-200"
                >
                  Assign classes
                </label>
                <input
                  id="Assign-classes"
                  name="Assign classes"
                  required
                  className="block w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-200 hover:border-red-300 transform hover:scale-[1.01]"
                  placeholder="Assign classes"
                  value={classes}
                  onChange={(e) => setClasses(e.target.value)}
                />
              </div>

              <div className="group">
                <label className="block text-sm font-medium text-gray-700 mb-1 group-hover:text-red-600 transition-colors duration-200">
                  Select Role
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
            </div>
          </div>

          {error && (
            <div className="text-red-600 text-sm bg-red-50 p-4 rounded-xl border border-red-100 flex items-start space-x-2 animate-shake">
              <XCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent rounded-xl text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-200 font-medium text-base shadow-md disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
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
  );
};

export default CreateUser;
