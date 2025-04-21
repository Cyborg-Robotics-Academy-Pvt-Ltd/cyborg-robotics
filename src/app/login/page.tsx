"use client";
import React, { useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { auth, db } from "../../../firebaseConfig";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { FirebaseError } from "firebase/app";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardTitle,
  CardHeader
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { Mail, Lock } from "lucide-react";
import Link from "next/link";

const LoginPage = () => {
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Check authentication state on mount
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // User is authenticated, check their role
        const roles = ["student", "trainer", "admin"];
        for (const role of roles) {
          const userDocRef = doc(db, `${role}s`, user.uid);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            localStorage.setItem("userRole", role);
            switch (role) {
              case "student":
                router.push("/student-dashboard");
                break;
              case "trainer":
                router.push("/trainer-dashboard");
                break;
              case "admin":
                router.push("/admin-dashboard");
                break;
            }
            return; // Exit after redirecting
          }
        }
        // If no role is found, sign out and show error
        await signOut(auth);
        toast.error("No valid role found for this user.");
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [router]);

  const handleRoleSelect = (value: string) => {
    setSelectedRole(value);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!selectedRole) {
      setError("Please select a role");
      toast.error("Please select a role");
      setIsLoading(false);
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
      const userDocRef = doc(db, `${selectedRole}s`, user.uid);
      const userDoc = await getDoc(userDocRef);

      // Check other roles to ensure exclusivity
      const roles = ["student", "trainer", "admin"];
      const otherRoles = roles.filter((role) => role !== selectedRole);
      const otherRoleChecks = await Promise.all(
        otherRoles.map((role) => getDoc(doc(db, `${role}s`, user.uid)))
      );

      if (otherRoleChecks.some((doc) => doc.exists())) {
        await signOut(auth);
        toast.error(
          "Access denied. You can only log in with your assigned role."
        );
        setIsLoading(false);
        return;
      }

      if (!userDoc.exists()) {
        await signOut(auth);  
        toast.error(
          `Access denied. You are not registered as a ${selectedRole}`
        );
        setIsLoading(false);
        return;
      }

      // Update last login time
      await setDoc(
        userDocRef,
        { lastLogin: serverTimestamp() },
        { merge: true }
      );

      // Store role in localStorage
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
          toast.error("Invalid role selected");
      }
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        toast.error(error.message || "Failed to login");
      } else {
        toast.error("Failed to login");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // Your existing JSX remains unchanged
    <div className="min-h-screen    flex pt-4 md:items-center justify-center md:mt-10 bg-gradient-to-br from-gray-100 to-gray-200 px-4 sm:px-8 lg:px-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="overflow-hidden border-none shadow-xl">
          <div className="bg-red-800 h-2 w-full"></div>
          <CardHeader className="space-y-2 flex flex-col items-center pb-4 pt-6">
            <motion.div
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-2"
            >
              <Image
                src="/assets/logo.png"
                alt="Logo"
                width={120}
                height={120}
                className="mx-auto"
              />    </motion.div>
            <CardTitle className="text-2xl font-bold text-gray-800">
              Welcome Back
            </CardTitle>
            <Link href={"/registration"} className="  text-black rounded-[10px] mt-24">
              <button>Registration Form</button>
               </Link>

          </CardHeader>
          <CardContent className="pb-8 px-6">
            <motion.form
              onSubmit={handleLogin}
              className="space-y-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="rounded-lg "
              >
                <p className="text-sm font-medium text-gray-700 mb-3">
                  Select your role:
                </p>
                <RadioGroup
                  value={selectedRole}
                  onValueChange={handleRoleSelect}
                  className="grid grid-cols-3 gap-8"
                >
                  <div className="flex items-center justify-center space-x-2 bg-white w-24 rounded-xl px-4 py-2 shadow-sm border border-gray-100 transition-all hover:border-red-200 hover:bg-red-50">
                    <RadioGroupItem
                      value="student"
                      id="student"
                      className="text-red-800 appearance-none checked:bg-red-800 checked:border-transparent border-2 rounded-full w-5 h-5"
                    />
                    <Label htmlFor="student" className="cursor-pointer text-xs">
                      Student
                    </Label>
                  </div>
                  <div className="flex items-center justify-center w-24 space-x-2 bg-white rounded-xl px-3 py-2 shadow-sm border border-gray-100 transition-all hover:border-red-200 hover:bg-red-50">
                    <RadioGroupItem
                      value="trainer"
                      id="trainer"
                      className="text-red-800 appearance-none checked:bg-red-800 checked:border-transparent border-2 rounded-full w-5 h-5"
                    />
                    <Label htmlFor="trainer" className="cursor-pointer">
                      Trainer
                    </Label>
                  </div>
                  <div className="flex items-center justify-center w-24 space-x-2 bg-white rounded-xl px-3 py-2 shadow-sm border border-gray-100 transition-all hover:border-red-200 hover:bg-red-50">
                    <RadioGroupItem
                      value="admin"
                      id="admin"
                      className="text-red-800 appearance-none checked:bg-red-800 checked:border-transparent border-2 rounded-full w-5 h-5"
                    />
                    <Label htmlFor="admin" className="cursor-pointer">
                      Admin
                    </Label>
                  </div>
                </RadioGroup>
              </motion.div>

              <div className="space-y-4">
                <motion.div
                  className="space-y-2 items-center"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  <Label htmlFor="email" className="text-gray-700 font-medium">
                    Email
                  </Label>
                  <div className="relative">
                    <div className="rounded-xl shadow-sm border border-gray-200 hover:border-red-200 bg-red-50 transition-all overflow-hidden">
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="pl-10 py-2 text-gray-500 rounded-xl border-0 focus:ring focus:ring-red-100 transition-all"
                      />
                    </div>
                    <Mail className="h-5 w-5 text-gray-400 absolute left-3 top-2" />
                  </div>
                </motion.div>

                <motion.div
                  className="space-y-2"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  <div className="flex justify-between items-center">
                    <Label
                      htmlFor="password"
                      className="text-gray-700 font-medium"
                    >
                      Password
                    </Label>
                  </div>
                  <div className="relative">
                    <div className="rounded-xl shadow-sm border border-gray-200 hover:border-red-200 bg-red-50 transition-all overflow-hidden">
                      <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="Enter your password"
                        className="pl-10 py-2 text-gray-500 rounded-xl border-0 focus:ring focus:ring-red-100 transition-all"
                      />
                    </div>
                    <Lock className="h-5 w-5 text-gray-400 absolute left-3 top-2" />
                  </div>
                </motion.div>
              </div>

              {error && (
                <motion.div
                  className="text-red-600 text-sm text-center bg-red-50 py-2 rounded-md"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {error}
                </motion.div>
              )}

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="pt-2"
              >
                <Button
                  type="submit"
                  className="w-full bg-red-800 h-12 rounded-full text-lg font-medium text-white hover:bg-red-700 transition-colors shadow-md hover:shadow-lg"
                  disabled={isLoading}
                >
                  {isLoading ? "Signing in..." : "Sign in"}
                </Button>
              </motion.div>
            </motion.form>
          </CardContent>
        </Card>
      </motion.div>
    
    </div>
  );
};

export default LoginPage;
