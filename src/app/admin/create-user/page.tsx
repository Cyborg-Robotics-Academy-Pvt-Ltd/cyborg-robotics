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
  const [username, setUsername] = useState(""); // Added username state
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
        username, // Added username to Firestore
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
      setUsername(""); // Clear username field
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create New User
          </h2>
          {userRole === "trainer" && (
            <p className="mt-2 text-center text-sm text-gray-600">
              As a trainer, you can only create student accounts
            </p>
          )}
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSignup}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="mb-4">
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="prn-number" className="sr-only">
                PRN Number
              </label>
              <input
                id="prn-number"
                name="prn"
                type="tel"
                autoComplete="tel"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                placeholder="PRN Number"
                value={PrnNumber}
                onChange={(e) => setPrnNumber(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Select Role
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
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

          {error && (
            <div className="text-red-600 text-sm text-center">{error}</div>
          )}

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-3xl text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
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
