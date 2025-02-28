"use client";
import React, { useState } from "react";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { auth, db } from "../../../firebaseConfig";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { FirebaseError } from "firebase/app";

const LoginPage = () => {
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleRoleSelect = (role: string) => {
    setSelectedRole(role);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!selectedRole) {
      setError("Please select a role");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      // Check if user exists in the selected role collection
      const userDocRef = doc(db, selectedRole + "s", user.uid);
      const userDoc = await getDoc(userDocRef);

      // Check if user exists in other role collections
      const roles = ["student", "trainer", "admin"];
      const otherRoles = roles.filter((role) => role !== selectedRole);

      const otherRoleChecks = await Promise.all(
        otherRoles.map((role) => getDoc(doc(db, role + "s", user.uid)))
      );

      // If user exists in any other role collection, deny access
      if (otherRoleChecks.some((doc) => doc.exists())) {
        await signOut(auth);
        setError("Access denied. You can only log in with your assigned role.");
        return;
      }

      if (!userDoc.exists()) {
        // If user document doesn't exist in the selected role collection
        await signOut(auth);
        setError(`Access denied. You are not registered as a ${selectedRole}`);
        return;
      }

      // Update last login time
      await setDoc(
        userDocRef,
        {
          lastLogin: serverTimestamp(),
        },
        { merge: true }
      );

      // Store the role in localStorage for future reference
      localStorage.setItem("userRole", selectedRole);

      // Redirect based on role
      switch (selectedRole) {
        case "student":
          router.push("/student-dashboard");
          break;
        case "trainer":
          router.push("/trainer-dashboard");
          break;
        case "admin":
          router.push("/admin-dashboard");
          break;
        default:
          setError("Invalid role selected");
      }
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        setError(error.message || "Failed to login");
      } else {
        setError("Failed to login");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <Image
            src="/assets/logo.png"
            alt="Logo"
            width={150}
            height={150}
            className="mx-auto"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>

        {/* Role Selection */}
        <div className="grid grid-cols-3 gap-4 mt-8">
          <button
            onClick={() => handleRoleSelect("student")}
            className={`p-4 text-center rounded-lg border-2 transition-all ${
              selectedRole === "student"
                ? "border-red-600 bg-red-50"
                : "border-gray-200 hover:border-red-400"
            }`}
          >
            <div className="font-semibold">Student</div>
          </button>
          <button
            onClick={() => handleRoleSelect("trainer")}
            className={`p-4 text-center rounded-lg border-2 transition-all ${
              selectedRole === "trainer"
                ? "border-red-600 bg-red-50"
                : "border-gray-200 hover:border-red-400"
            }`}
          >
            <div className="font-semibold">Trainer</div>
          </button>
          <button
            onClick={() => handleRoleSelect("admin")}
            className={`p-4 text-center rounded-lg border-2 transition-all ${
              selectedRole === "admin"
                ? "border-red-600 bg-red-50"
                : "border-gray-200 hover:border-red-400"
            }`}
          >
            <div className="font-semibold">Admin</div>
          </button>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <div className="text-red-600 text-sm text-center">{error}</div>
          )}

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
