"use client";
import React, { useState, useEffect } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth, db } from "../../../../firebaseConfig";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { FirebaseError } from "firebase/app";
import toast, { Toaster } from "react-hot-toast";

const CreateUser = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState<string>("student");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState<string>("student");
  const [PrnNumber, setPrnNumber] = useState("");
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

  const handleSignup = async (e: React.FormEvent) => {
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
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        setError(error.message || "Failed to create user");
      } else {
        setError("Failed to create user");
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-2xl font-semibold text-gray-700 animate-pulse">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-200 md:py-12 px-4 sm:px-6 lg:px-8">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="max-w-lg w-full space-y-8 md:mt-12 bg-white p-8 rounded-3xl shadow-2xl transition-all duration-300">
        <div className="text-center">
          <h2 className="md:text-4xl text-2xl font-bold text-gray-900 tracking-tight">
            Create New User
          </h2>
          {userRole === "trainer" && (
            <p className="mt-3 text-sm text-gray-500">
              As a trainer, you can only create student accounts
            </p>
          )}
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSignup}>
          <div className="space-y-5">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-200"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="email-address"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-200"
                placeholder="Enter email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-200"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="prn-number"
                className="block text-sm font-medium text-gray-700"
              >
                PRN Number
              </label>
              <input
                id="prn-number"
                name="prn"
                type="tel"
                autoComplete="tel"
                required
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-200"
                placeholder="Enter PRN number"
                value={PrnNumber}
                onChange={(e) => setPrnNumber(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Select Role
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="mt-1 block w-full px-4 py-3 border border-gray-300 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed"
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
            </div>
          </div>

          {error && (
            <div className="text-red-600 text-sm text-center bg-red-50 p-3 rounded-lg">
              {error}
            </div>
          )}

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-200 font-semibold text-sm shadow-md"
            >
              Create User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateUser;
