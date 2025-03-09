"use client";
import React, { useEffect, useState } from "react";

import { motion } from "framer-motion";
import { HoveredLink, Menu, MenuItem } from "./ui/navbar-menu";
import { cn } from "@/lib/utils";
import Image from "next/image";
import logo from "../../public/assets/logo.png";
import Link from "next/link";
import { GiHamburgerMenu } from "react-icons/gi";

import { auth } from "../../firebaseConfig";
import { signOut, User } from "firebase/auth";
import { useRouter } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";

export function NavbarDemo() {
  return (
    <div className="relative w-full flex items-center justify-center">
      <Navbar className="" />
    </div>
  );
}

const Navbar = ({
  className,
}: {
  className?: string;
  itemposition?: string;
}) => {
  const [active, setActive] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [user, setUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      console.log("Auth state changed, user:", user?.email);
      setUser(user);
      if (user) {
        // Check user role in different collections
        const collections = ["students", "trainers", "admins"];
        for (const collection of collections) {
          const docRef = doc(db, collection, user.uid);
          const docSnap = await getDoc(docRef);
          console.log(`Checking ${collection} collection:`, docSnap.exists());
          if (docSnap.exists()) {
            const role = collection.slice(0, -1);
            console.log("Found role:", role);
            setUserRole(role);
            break;
          }
        }
      } else {
        console.log("No user, setting role to null");
        setUserRole(null);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    console.log("Current userRole:", userRole);
  }, [userRole]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push("/"); // This will now work with the navigation router
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    // Disable background scrolling when the mobile menu is open
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* Desktop Navigation */}
      <motion.header
        className="w-full hidden md:block lg:block b fixed"
        transition={{ type: "spring", stiffness: 300 }}
        style={{ zIndex: 1000 }}
      >
        {isMounted && (
          <div className="relative w-full">
            <div className={cn("fixed top-0 inset-x-0 w-full z-50", className)}>
              <Menu setActive={setActive}>
                <Link href={"/"}>
                  <Image
                    src={logo}
                    width={160}
                    height={160}
                    alt="logo"
                    loading="lazy"
                  />
                </Link>
                <Link href="/">
                  <MenuItem setActive={setActive} active={active} item="HOME" />
                </Link>
                <Link href="/about">
                  <MenuItem
                    setActive={setActive}
                    active={active}
                    item="ABOUT"
                  />
                </Link>

                <MenuItem
                  setActive={setActive}
                  active={active}
                  item="ONLINE COURSE"
                >
                  <div className="flex flex-col space-y-2 text-md">
                    <HoveredLink href="/online-courses/bambino-coding">
                      Bambino Coding
                    </HoveredLink>
                    <HoveredLink href="/online-courses/animation-coding">
                      Animation & Coding
                    </HoveredLink>
                    <HoveredLink href="/online-courses/app-designing">
                      App Designing
                    </HoveredLink>
                    <HoveredLink href="/online-courses/web-designing">
                      Web Designing
                    </HoveredLink>
                    <HoveredLink href="/online-courses/python-language">
                      Python Language
                    </HoveredLink>
                    <HoveredLink href="/online-courses/java">Java</HoveredLink>
                    <HoveredLink href="/online-courses/artificial-intelligence">
                      Artificial Intelligence
                    </HoveredLink>
                    <HoveredLink href="/online-courses/machine-learning">
                      Machine Learning
                    </HoveredLink>
                  </div>
                </MenuItem>
                <MenuItem
                  setActive={setActive}
                  active={active}
                  item="CLASSROOM COURSE"
                >
                  <div className="flex flex-col space-y-2 text-md text-black">
                    <HoveredLink href="/classroom-courses/bambino-coding">
                      Bambino Coding
                    </HoveredLink>
                    <HoveredLink href="/classroom-courses/3d-printing">
                      3D Printing
                    </HoveredLink>
                    <HoveredLink href="/classroom-courses/early-simple-machines">
                      Early Simple Machines
                    </HoveredLink>
                    <HoveredLink href="/classroom-courses/robotics-ev3">
                      EV3 Robotics
                    </HoveredLink>
                    <HoveredLink href="/classroom-courses/animation-coding">
                      Animation & Coding
                    </HoveredLink>
                    <HoveredLink href="/classroom-courses/simple-powered-machines">
                      Simple & Powered Machines
                    </HoveredLink>
                    <HoveredLink href="/classroom-courses/spike-pneumatics">
                      Spike Essential + Pneumatics
                    </HoveredLink>
                    <HoveredLink href="/classroom-courses/spike-prime">
                      Spike Prime
                    </HoveredLink>
                    <HoveredLink href="/classroom-courses/iot">IOT</HoveredLink>
                    <HoveredLink href="/classroom-courses/app-designing">
                      App Designing
                    </HoveredLink>
                    <HoveredLink href="/classroom-courses/app-lab">
                      App Lab
                    </HoveredLink>
                    <HoveredLink href="/classroom-courses/android-studio">
                      Android Studio
                    </HoveredLink>
                    <HoveredLink href="/classroom-courses/electronics">
                      Electronics
                    </HoveredLink>
                    <HoveredLink href="/classroom-courses/arduino">
                      Arduino
                    </HoveredLink>
                    <HoveredLink href="/classroom-courses/web-designing">
                      Web Designing
                    </HoveredLink>
                    <HoveredLink href="/classroom-courses/industrial-animation-scripting">
                      Industrial Animation And Scripting
                    </HoveredLink>
                    <HoveredLink href="/classroom-courses/java">
                      Java
                    </HoveredLink>
                    <HoveredLink href="/classroom-courses/python-language">
                      Python Language
                    </HoveredLink>
                    <HoveredLink href="/classroom-courses/artificial-intelligence">
                      Artificial Intelligence
                    </HoveredLink>
                    <HoveredLink href="/classroom-courses/machine-learning">
                      Machine Learning
                    </HoveredLink>
                  </div>
                </MenuItem>
                <Link href="/blogs">
                  <MenuItem setActive={setActive} active={active} item="BLOG" />
                </Link>

                <Link href="/events">
                  <MenuItem
                    setActive={setActive}
                    active={active}
                    item="EVENTS"
                  />
                </Link>

                <Link href="/gallery">
                  <MenuItem
                    setActive={setActive}
                    active={active}
                    item="GALLERY"
                  />
                </Link>

                <Link href="/contact-us">
                  <MenuItem
                    setActive={setActive}
                    active={active}
                    item="CONTACT US"
                  />
                </Link>

                {user ? (
                  <>
                    <Link href={`/${userRole}-dashboard`}>
                      <MenuItem
                        setActive={setActive}
                        active={active}
                        item="DASHBOARD"
                      />
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="bg-red-800 px-4 py-2 rounded-full text-white"
                    >
                      Log Out
                    </button>
                  </>
                ) : (
                  <Link
                    href="/login"
                    className="bg-red-800 px-4 py-2 rounded-full"
                  >
                    <button className="text-white">Log In</button>
                  </Link>
                )}
              </Menu>
            </div>
          </div>
        )}
      </motion.header>

      {/* Mobile Navigation */}
      <header className="w-screen block md:hidden lg:hidden fixed top-0 left-0 right-0 z-50 bg-white shadow-sm py-2">
        <div className="flex justify-between items-center w-screen h-14 px-4 ">
          <Image src={logo} width={150} height={150} alt="logo" priority />
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="bg-white shadow-xl px-3 py-2 shadow-gray-300 item-center flex justify-center rounded-xl"
          >
            <GiHamburgerMenu className="text-2xl" />
          </button>
        </div>
      </header>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <motion.div className="absolute  top-0 -right-2 w-64 h-screen  z-50 rounded-md bg-red-800 flex-1 flex-col"></motion.div>
      )}

      {/* <div className="w-full h-16 md:hidden block lg:hidden"></div> */}
    </>
  );
};

export default Navbar;
