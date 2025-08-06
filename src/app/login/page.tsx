"use client";
import React, { useState, useEffect } from "react";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { auth, db } from "../../../firebaseConfig";
import {
  setDoc,
  serverTimestamp,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { FirebaseError } from "firebase/app";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import {
  Mail,
  Lock,
  User,
  BookOpen,
  Users,
  Shield,
  Eye,
  EyeOff,
} from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import AuthLoadingSpinner from "@/components/AuthLoadingSpinner";

const LoginPage = () => {
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { user, userRole, loading: authLoading } = useAuth();

  // Helper function to find user by email across all collections
  const findUserByEmail = async (userEmail: string) => {
    try {
      // First, try to find in standard role-based collections
      const roles = ["student", "trainer", "admin"];
      for (const role of roles) {
        const roleCollectionRef = collection(db, `${role}s`);
        const q = query(roleCollectionRef, where("email", "==", userEmail));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const userDoc = querySnapshot.docs[0];
          return {
            data: userDoc.data(),
            ref: userDoc.ref,
            collection: `${role}s`,
            role: role,
          };
        }
      }

      const collections = ["registrations", "renewals"]; // Add other collection names as needed

      for (const collectionName of collections) {
        const collectionRef = collection(db, collectionName);
        const q = query(collectionRef, where("email", "==", userEmail));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const userDoc = querySnapshot.docs[0];
          const userData = userDoc.data();
          return {
            data: userData,
            ref: userDoc.ref,
            collection: collectionName,
            role: userData.role || null,
          };
        }
      }

      return null;
    } catch (error) {
      console.error("Error finding user by email:", error);
      return null;
    }
  };

  // Redirect if already authenticated
  useEffect(() => {
    if (authLoading) return;

    if (user && userRole) {
      switch (userRole) {
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
    }
  }, [user, userRole, authLoading, router]);

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
      console.log(`Attempting login with role: ${selectedRole}`);
      console.log(
        `Attempting to sign in with email: ${email} and role: ${selectedRole}`
      );

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log(`User authenticated with ID: ${user.uid}`);

      // Find user by email across all collections
      const userInfo = await findUserByEmail(email);

      if (!userInfo) {
        await signOut(auth);
        toast.error("User not found in the system. Please contact admin.");
        setIsLoading(false);
        return;
      }

      // Check if user's role matches selected role
      if (userInfo.role !== selectedRole) {
        await signOut(auth);
        toast.error(
          `Access denied. You are registered as ${userInfo.role}, not ${selectedRole}.`
        );
        setIsLoading(false);
        return;
      }

      // Check other roles to ensure exclusivity (optional, based on your business logic)
      const roles = ["student", "trainer", "admin"];
      const otherRoles = roles.filter((role) => role !== selectedRole);

      for (const role of otherRoles) {
        const roleCollectionRef = collection(db, `${role}s`);
        const q = query(roleCollectionRef, where("email", "==", email));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          await signOut(auth);
          toast.error(
            "Access denied. You can only log in with your assigned role."
          );
          setIsLoading(false);
          return;
        }
      }

      // Update last login time
      try {
        await setDoc(
          userInfo.ref,
          { lastLogin: serverTimestamp() },
          { merge: true }
        );
      } catch (updateError) {
        console.log("Could not update last login time:", updateError);
        // Continue with login even if update fails
      }

      // Store role in localStorage
      localStorage.setItem("userRole", selectedRole);
      console.log(`Login successful, redirecting to ${selectedRole}-dashboard`);

      // Show success message
      toast.success(
        `Welcome back! Redirecting to ${selectedRole} dashboard...`
      );

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
      console.error("Login error:", error);
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case "auth/invalid-credential":
            setError(
              "Invalid email or password. Please check your credentials."
            );
            toast.error(
              "Invalid email or password. Please check your credentials."
            );
            break;
          case "auth/user-not-found":
            setError(
              "No account exists with this email. Please register first."
            );
            toast.error(
              "No account exists with this email. Please register first."
            );
            break;
          case "auth/wrong-password":
            setError("Incorrect password. Please try again.");
            toast.error("Incorrect password. Please try again.");
            break;
          case "auth/invalid-email":
            setError("Invalid email format. Please enter a valid email.");
            toast.error("Invalid email format. Please enter a valid email.");
            break;
          case "auth/too-many-requests":
            setError("Too many failed attempts. Please try again later.");
            toast.error("Too many failed attempts. Please try again later.");
            break;
          case "auth/network-request-failed":
            setError("Network error. Please check your connection.");
            toast.error("Network error. Please check your connection.");
            break;
          default:
            setError(error.message || "Failed to login");
            toast.error(error.message || "Failed to login");
        }
      } else {
        setError("Failed to login. Please try again.");
        toast.error("Failed to login. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "student":
        return <BookOpen className="h-5 w-5 text-red-600" />;
      case "trainer":
        return <Users className="h-5 w-5 text-red-700" />;
      case "admin":
        return <Shield className="h-5 w-5 text-red-800" />;
      default:
        return <User className="h-5 w-5 text-gray-600" />;
    }
  };

  // Show loading indicator while checking auth status
  if (authLoading) {
    return <AuthLoadingSpinner />;
  }

  // Only render login form after auth check is complete
  return (
    <div className="min-h-screen bg-white relative overflow-hidden pt-20">
      {/* Animated background elements */}
      <div className="absolute inset-0 ">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-1/4 left-1/4 w-64 h-64   "
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute bottom-1/4 right-1/4 w-80 h-80 "
        />
      </div>

      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-md"
        >
          <Card className="bg-white border border-gray-300 shadow-lg overflow-hidden">
            {/* Top accent line */}
            <div className="h-[7px] bg-gradient-to-r from-red-700 to-red-800"></div>

            <CardHeader className="space-y-6 pb-6 pt-8 px-8">
              {/* Logo section */}
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex justify-center"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-800 rounded-full blur-xl opacity-30"></div>
                  <Image
                    src="/assets/logo.png"
                    alt="Logo"
                    width={180}
                    height={180}
                    className="relative z-10 mx-auto8"
                  />
                </div>
              </motion.div>

              {/* Registration buttons section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-center space-y-4"
              >
                <h2 className="text-gray-800 text-xl font-semibold">
                  Registration
                </h2>
                <div className="flex justify-center gap-3">
                  <Link href="/registration/new">
                    <motion.button
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:from-red-700 hover:to-red-800"
                    >
                      New Registration
                    </motion.button>
                  </Link>
                  <Link href="/registration/renewal">
                    <motion.button
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:from-red-700 hover:to-red-800"
                    >
                      Renewal
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            </CardHeader>

            <CardContent className="px-8 pb-8">
              <motion.form
                onSubmit={handleLogin}
                className="space-y-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                {/* Existing user section */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <User className="h-5 w-5  text-red-700" />
                    <h3 className="text-gray-800 text-lg font-semibold">
                      Existing User Login
                    </h3>
                  </div>

                  {/* Role selection */}
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.7, duration: 0.5 }}
                    className="space-y-3"
                  >
                    <Label className="text-gray-800 font-medium">
                      Select your role:
                    </Label>
                    <RadioGroup
                      value={selectedRole}
                      onValueChange={handleRoleSelect}
                      className="grid grid-cols-1 gap-3"
                    >
                      {[
                        { value: "student", label: "Student" },
                        { value: "trainer", label: "Trainer" },
                        { value: "admin", label: "Administrator" },
                      ].map((role, index) => (
                        <motion.div
                          key={role.value}
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{
                            delay: 0.8 + index * 0.1,
                            duration: 0.5,
                          }}
                          className={`flex items-center space-x-3 p-4 rounded-xl border-2 transition-all duration-300 cursor-pointer ${
                            selectedRole === role.value
                              ? "border-red-700 bg-gray-100"
                              : "border-gray-200 bg-white hover:bg-gray-50"
                          }`}
                        >
                          <RadioGroupItem
                            value={role.value}
                            id={role.value}
                            className="border-2 border-red-800 hover:border-[#991b1b] hover:bg-[#991b1b] data-[state=checked]:bg-[#991b1b] data-[state=checked]:border-[#991b1b]"
                          />
                          {getRoleIcon(role.value)}
                          <Label
                            htmlFor={role.value}
                            className={`cursor-pointer font-medium flex-1 ${
                              selectedRole === role.value
                                ? "text-red-800"
                                : "text-gray-600"
                            }`}
                          >
                            {role.label}
                          </Label>
                        </motion.div>
                      ))}
                    </RadioGroup>
                  </motion.div>

                  {/* Email input */}
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 1.1, duration: 0.5 }}
                    className="space-y-2"
                  >
                    <Label
                      htmlFor="email"
                      className="text-gray-600 font-medium"
                    >
                      Email Address
                    </Label>
                    <div className="relative group">
                      <div className="absolute inset-0 bg-gray-200 rounded-xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                      <div className="relative flex items-center">
                        <Mail className="absolute left-4 h-5 w-5 text-gray-400 z-10" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="Enter your email address"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="pl-12 pr-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-800 placeholder-gray-400 focus:bg-gray-100 focus:border-gray-400 focus:ring-2 focus:ring-gray-400 transition-all duration-300"
                        />
                      </div>
                    </div>
                  </motion.div>

                  {/* Password input */}
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 1.2, duration: 0.5 }}
                    className="space-y-2"
                  >
                    <Label
                      htmlFor="password"
                      className="text-gray-600 font-medium"
                    >
                      Password
                    </Label>
                    <div className="relative group">
                      <div className="absolute inset-0 bg-gray-200 rounded-xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                      <div className="relative flex items-center">
                        <Lock className="absolute left-4 h-5 w-5 text-gray-400 z-10" />
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          placeholder="Enter your password"
                          className="pl-12 pr-12 py-3 bg-white border border-gray-300 rounded-xl text-gray-800 placeholder-gray-400 focus:bg-gray-100 focus:border-gray-400 focus:ring-2 focus:ring-gray-400 transition-all duration-300"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors duration-200 z-10"
                        >
                          {showPassword ? (
                            <EyeOff className="h-5 w-5" />
                          ) : (
                            <Eye className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Error message */}
                {error && (
                  <motion.div
                    className="text-red-600 text-sm text-center bg-red-100 py-3 rounded-xl border border-red-300"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {error}
                  </motion.div>
                )}

                {/* Sign in button */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1.3, duration: 0.5 }}
                >
                  <motion.div
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      type="submit"
                      className="w-full h-14 rounded-xl text-lg font-semibold bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-xl hover:shadow-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <div className="flex items-center justify-center space-x-3">
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                            className="rounded-full h-5 w-5 border-2 border-transparent border-t-white"
                          />
                          <span>Signing in...</span>
                        </div>
                      ) : (
                        <span className="flex items-center justify-center gap-2">
                          <User className="h-5 w-5" />
                          Sign In
                        </span>
                      )}
                    </Button>
                  </motion.div>
                </motion.div>
              </motion.form>
            </CardContent>
          </Card>

          {/* Footer text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.5 }}
            className="text-center text-gray-600 text-sm mt-6"
          >
            Secure authentication
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;
