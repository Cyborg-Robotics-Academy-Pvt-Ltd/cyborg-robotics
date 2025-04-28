"use client";
import React, { useState, useEffect } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("student");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState("student");
  const [PrnNumber, setPrnNumber] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

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

      setLoading(false);
    };

    checkAuth();
  }, [router]);

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (userRole === "trainer" && role !== "student") {
      setError("As a trainer, you can only create student accounts");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      const userDocRef = doc(db, role + "s", user.uid);
      await setDoc(userDocRef, {
        email: user.email,
        username,
        role,
        createdAt: serverTimestamp(),
        lastLogin: serverTimestamp(),
        uid: user.uid,
        createdBy: auth.currentUser?.uid,
        createdByRole: userRole,
        PrnNumber,
      });

      setEmail("");
      setPassword("");
      setUsername("");
      setRole("student");
      setPrnNumber("");
      toast.success("User created successfully!");
    } catch (error) {
      if (error instanceof FirebaseError) {
        setError(error.message || "Failed to create user");
      } else {
        setError("Failed to create user");
      }
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

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="h-12 w-12 rounded-full border-4 border-t-red-500 border-r-gray-200 border-b-gray-200 border-l-gray-200 animate-spin mb-4"></div>
        <div className="text-xl font-medium text-gray-700">Loading...</div>
      </div>
    );
  }

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

      <div className="max-w-lg w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl transition-all duration-300 border border-gray-100">
        <div className="text-center">
          <div className="mx-auto bg-red-100 rounded-full p-3 w-16 h-16 flex items-center justify-center mb-4">
            <UserPlusIcon className="h-8 w-8 text-red-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
            Create New User
          </h2>
          {userRole === "trainer" && (
            <p className="mt-3 text-sm text-gray-500 bg-yellow-50 py-2 px-3 rounded-lg inline-block">
              <span className="font-medium">Note:</span> As a trainer, you can
              only create student accounts
            </p>
          )}
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSignup}>
          <div className="space-y-5">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Username
              </label>
              <div className="relative">
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  className="block w-full pl-4 pr-10 py-3 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-200"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <UserIcon className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>

            <div>
              <label
                htmlFor="email-address"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="block w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-200"
                placeholder="Enter email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  className="block w-full pl-4 pr-10 py-3 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-200"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 focus:outline-none"
                >
                  {showPassword ? (
                    <EyeOffIcon className="h-5 w-5 text-gray-500 hover:text-gray-700" />
                  ) : (
                    <EyeIcon className="h-5 w-5 text-gray-500 hover:text-gray-700" />
                  )}
                </button>
              </div>
              <p className="mt-1 text-xs text-gray-500">
                Password must be at least 6 characters
              </p>
            </div>

            <div>
              <label
                htmlFor="prn-number"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                PRN Number
              </label>
              <input
                id="prn-number"
                name="prn"
                type="tel"
                autoComplete="tel"
                required
                className="block w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-200"
                placeholder="Enter PRN number"
                value={PrnNumber}
                onChange={(e) => setPrnNumber(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Role
              </label>
              <div className="relative">
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="block w-full pl-4 pr-10 py-3 border border-gray-300 bg-white rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed appearance-none"
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

          {error && (
            <div className="text-red-600 text-sm bg-red-50 p-4 rounded-xl border border-red-100 flex items-start space-x-2">
              <XCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent rounded-xl text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-200 font-medium text-base shadow-md"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <UserPlusIcon className="h-5 w-5 text-red-300 group-hover:text-red-200" />
              </span>
              Create User
            </button>
          </div>
        </form>

        <div className="flex justify-center mt-4">
          <button
            onClick={() => router.back()}
            className="text-sm text-gray-600 hover:text-red-600 transition-colors duration-200 flex items-center space-x-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
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
