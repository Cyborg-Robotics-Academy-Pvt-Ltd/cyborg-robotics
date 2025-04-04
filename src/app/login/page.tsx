"use client";
import React, { useState } from "react";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
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
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";

const LoginPage = () => {
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleRoleSelect = (value: string) => {
    setSelectedRole(value);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!selectedRole) {
      toast.error("Please select a role");
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
        toast.error(
          "Access denied. You can only log in with your assigned role."
        );
        return;
      }

      if (!userDoc.exists()) {
        // If user document doesn't exist in the selected role collection
        await signOut(auth);
        toast.error(
          `Access denied. You are not registered as a ${selectedRole}`
        );
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
          toast.error("Invalid role selected");
      }
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        toast.error(error.message || "Failed to login");
      } else {
        toast.error("Failed to login");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-8 lg:px-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1 flex flex-col items-center">
            <motion.div
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Image
                src="/assets/logo.png"
                alt="Logo"
                width={150}
                height={150}
                className="mx-auto"
              />
            </motion.div>
            <CardTitle className="text-2xl font-bold">Sign in</CardTitle>
            <CardDescription>
              Choose your role and enter your credentials
            </CardDescription>
          </CardHeader>
          <CardContent>
            <motion.form
              onSubmit={handleLogin}
              className="space-y-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <div className="space-y-4">
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <RadioGroup
                    value={selectedRole}
                    onValueChange={handleRoleSelect}
                    className="grid grid-cols-3 gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="student" id="student" />
                      <Label htmlFor="student">Student</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="trainer" id="trainer" />
                      <Label htmlFor="trainer">Trainer</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="admin" id="admin" />
                      <Label htmlFor="admin">Admin</Label>
                    </div>
                  </RadioGroup>
                </motion.div>

                <motion.div
                  className="space-y-2"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </motion.div>

                <motion.div
                  className="space-y-2"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </motion.div>
              </div>

              {error && (
                <motion.div
                  className="text-red-600 text-sm text-center"
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
              >
                <Button
                  type="submit"
                  className="w-full bg-red-800 h-12 rounded-full text-lg text-white hover:text-black"
                >
                  Sign in
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
