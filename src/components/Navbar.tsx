"use client";
import React, { useEffect, useState, useCallback, useRef } from "react";

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
import { LogOut } from "lucide-react";

export function NavbarDemo() {
  return (
    <div className="relative lg:h-1 w-full flex items-center justify-center ">
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

  const [user, setUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [visibleItems, setVisibleItems] = useState<typeof menuItems>(menuItems);
  const navRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

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
          } else {
            console.log(`No document found in ${collection} collection`);
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
    if (userRole) {
      localStorage.setItem("userRole", userRole);
    }
  }, [userRole]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Responsive logic: move overflowing items to overlay
  useEffect(() => {
    function updateMenuItems() {
      if (!navRef.current) return;
      const navWidth = navRef.current.offsetWidth;
      let usedWidth = 0;
      let lastVisibleIdx = menuItems.length - 1;
      for (let i = 0; i < menuItems.length; i++) {
        const el = itemRefs.current[i];
        if (!el) continue;
        usedWidth += el.offsetWidth;
        if (usedWidth > navWidth - 300) {
          // 300px buffer for logo, buttons
          lastVisibleIdx = i - 1;
          break;
        }
      }
      setVisibleItems(menuItems.slice(0, lastVisibleIdx + 1));
    }
    updateMenuItems();
    window.addEventListener("resize", updateMenuItems);
    return () => window.removeEventListener("resize", updateMenuItems);
  }, []);

  const handleSignOut = useCallback(async () => {
    try {
      await signOut(auth);
      router.push("/"); // This will now work with the navigation router
      localStorage.removeItem("userRole");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  }, [router]);

  // Function to render menu items (for visible only)
  const renderMenuItems = (
    items: Array<{
      href?: string;
      label: string;
      subItems?: Array<{
        label: string;
        href?: string;
        subItems?: Array<{ label: string; href: string }>;
      }>;
    }>,
    refArray?: (HTMLDivElement | null)[]
  ) => {
    return items.map((item, index) => {
      if (item.subItems) {
        // If subItems have their own subItems, render as nested dropdown
        // const hasNested = item.subItems.some((sub) => sub.subItems); // Removed unused variable
        return (
          <motion.div
            key={`parent-${item.label}-${index}`}
            ref={(el) => {
              if (refArray) refArray[index] = el;
            }}
          >
            <MenuItem
              setActive={setActive}
              active={active}
              item={item.label}
              key={item.label}
            >
              <div className="flex flex-col space-y-2 min-w-[180px]">
                {item.subItems.map((subItem, subIndex) =>
                  subItem.subItems ? (
                    <div
                      key={`nested-${subItem.label}-${subIndex}`}
                      className="group relative"
                    >
                      <span className="font-semibold text-black cursor-pointer group-hover:text-red-800">
                        {subItem.label}
                      </span>
                      <div className="absolute left-full top-0 z-50 hidden group-hover:block bg-white rounded-xl shadow-lg border border-gray-200 min-w-[180px] p-2">
                        {subItem.subItems.map((nested, nestedIdx) => (
                          <HoveredLink
                            href={nested.href}
                            key={`nested-link-${nested.label}-${nestedIdx}`}
                          >
                            {nested.label}
                          </HoveredLink>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <HoveredLink
                      href={subItem.href!}
                      key={`sub-${subItem.label}-${subIndex}`}
                    >
                      {subItem.label}
                    </HoveredLink>
                  )
                )}
              </div>
            </MenuItem>
          </motion.div>
        );
      }
      return item.href ? (
        <Link href={item.href} key={`link-${item.label}-${index}`} className="">
          <motion.div
            ref={(el) => {
              if (refArray) refArray[index] = el;
            }}
          >
            <MenuItem setActive={setActive} active={active} item={item.label} />
          </motion.div>
        </Link>
      ) : null;
    });
  };

  return (
    <>
      {/* Desktop Navigation */}
      <motion.header
        className="w-full hidden sm:hidden md:hidden lg:block fixed"
        transition={{ type: "spring", stiffness: 300 }}
        style={{ zIndex: 1000 }}
      >
        <nav aria-label="Main Navigation" className="relative w-full">
          <div
            className={cn(
              "fixed top-0 inset-x-0 w-full z-50 md:text-md transition-all duration-300",
              className
            )}
            ref={navRef}
          >
            <Menu
              setActive={setActive}
              className={cn(
                "transition-all duration-300",
                isScrolled
                  ? "bg-white/60 backdrop-blur-md shadow-lg border-b border-white/30"
                  : "bg-white"
              )}
            >
              <Link href={"/"} title="Home">
                <Image
                  src={logo}
                  width={160}
                  height={160}
                  alt="logo"
                  loading="lazy"
                  quality={75}
                />
              </Link>
              {renderMenuItems(visibleItems, itemRefs.current)}
              {user ? (
                <>
                  <Link
                    href={`/${userRole}-dashboard`}
                    className=" px-3 py-1 rounded-full text-black mr-2"
                  >
                    <button aria-label="Dashboard " className="uppercase">
                      Dashboard
                    </button>
                  </Link>
                  <div
                    className="relative group"
                    style={{ display: "inline-block" }}
                  >
                    <button
                      className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-red-800"
                      aria-haspopup="true"
                      aria-expanded={active === "profile"}
                      onClick={() =>
                        setActive(active === "profile" ? null : "profile")
                      }
                      tabIndex={0}
                    >
                      <span className="font-semibold text-black">
                        {user.email?.split("@")[0]}
                      </span>
                      <svg
                        width="20"
                        height="20"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M7 10l5 5 5-5"
                          stroke="#222"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                    {active === "profile" && (
                      <div
                        className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-lg border border-gray-200 z-50 flex flex-col py-2"
                        tabIndex={-1}
                        onMouseLeave={() => setActive(null)}
                      >
                        <div className="flex items-center">
                          <button
                            onClick={handleSignOut}
                            className="flex items-center px-4 py-2 text-red-800 rounded-md focus:outline-none font-normal"
                            aria-label="Log Out"
                          >
                            Log Out
                            <LogOut className="ml-2 text-red-800" />
                          </button>
                        </div>
                        {/* Future: <Link href="/profile" className="px-4 py-2 hover:bg-gray-100 rounded-md">Profile</Link> */}
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <Link
                  href="/login"
                  className="bg-red-800 px-4 py-2 lg:rounded-full"
                  title="Log In"
                >
                  <button className="text-white">Log In</button>
                </Link>
              )}
            </Menu>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Navigation */}
      <NavbarMenu
        user={user}
        userRole={userRole}
        handleSignOut={handleSignOut}
        menuItems={menuItems}
        // overflowItems={overflowItems} // Remove for now, not in NavbarMenuProps
      />
    </>
  );
};

export default Navbar;
