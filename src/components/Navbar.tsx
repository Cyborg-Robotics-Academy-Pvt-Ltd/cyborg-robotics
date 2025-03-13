"use client";
import React, { useEffect, useState } from "react";

import { motion } from "framer-motion";
import { HoveredLink, Menu, MenuItem } from "./ui/navbar-menu";
import { cn } from "@/lib/utils";
import Image from "next/image";
import logo from "../../public/assets/logo.png";
import Link from "next/link";

import { auth } from "../../firebaseConfig";
import { signOut, User } from "firebase/auth";
import { useRouter } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { menuItems } from "../../utils/MenuItemsData";
import NavbarMenu from "./NavbarMenu";

export function NavbarDemo() {
  return (
    <div className="relative w-full flex items-center justify-center ">
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

  // Function to render menu items
  const renderMenuItems = (
    items: {
      href?: string;
      label: string;
      subItems?: { href: string; label: string }[];
    }[]
  ) => {
    return items.map((item) => {
      if (item.subItems) {
        return (
          <MenuItem
            setActive={setActive}
            active={active}
            item={item.label}
            key={item.label}
          >
            <div className="flex flex-col space-y-2 text-md">
              {item.subItems.map((subItem) => (
                <HoveredLink href={subItem.href} key={subItem.label}>
                  {subItem.label}
                </HoveredLink>
              ))}
            </div>
          </MenuItem>
        );
      }
      if (item.href) {
        return (
          <Link href={item.href} key={item.label}>
            <MenuItem setActive={setActive} active={active} item={item.label} />
          </Link>
        );
      }
      return null;
    });
  };

  return (
    <>
      {/* Desktop Navigation */}
      <motion.header
        className="w-full hidden sm:hidden md:hidden lg:block b fixed"
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
                {renderMenuItems(menuItems)}
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
      <NavbarMenu />
    </>
  );
};

export default Navbar;
