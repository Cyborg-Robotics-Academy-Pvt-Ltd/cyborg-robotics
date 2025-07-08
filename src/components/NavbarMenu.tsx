"use client";
import React, { useState, useEffect, useRef } from "react";
// Removed: import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import Link from "next/link";
import Image from "next/image";
import { ChevronUp, ChevronDown, AlignRight, X } from "lucide-react";
import { User } from "firebase/auth";
import styles from "./NavbarMenu.module.css";
import { MenuItem } from "./ui/navbar-menu";

// Define types for menu items
interface SubItem {
  href: string;
  label: string;
}

interface MenuItem {
  href?: string;
  label: string;
  subItems?: SubItem[];
}

interface NavbarMenuProps {
  user: User | null;
  userRole: string | null;
  handleSignOut: () => Promise<void>;
  menuItems: Array<{
    href?: string;
    label: string;
    subItems?: Array<{ href: string; label: string }>;
  }>;
}

const NavbarMenu: React.FC<NavbarMenuProps> = ({
  user,
  userRole,
  handleSignOut,
  menuItems,
}) => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  // GSAP refs
  const menuRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const submenuRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const submenuItemRefs = useRef<Record<string, HTMLDivElement[]>>({});

  // Effect to handle body overflow
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [menuOpen]);

  // GSAP animation for menu and overlay
  useEffect(() => {
    if (menuOpen) {
      if (overlayRef.current) {
        gsap.to(overlayRef.current, {
          opacity: 1,
          scale: 1,
          duration: 0.45,
          ease: "expo.inOut",
          pointerEvents: "auto",
          delay: 0.05,
          backdropFilter: "blur(8px) brightness(1.08)",
        });
      }
      if (menuRef.current) {
        gsap.to(menuRef.current, {
          x: 0,
          opacity: 1,
          duration: 0.45,
          ease: "expo.inOut",
        });
      }
    } else {
      if (overlayRef.current) {
        gsap.to(overlayRef.current, {
          opacity: 0,
          scale: 0.98,
          duration: 0.3,
          ease: "expo.inOut",
          pointerEvents: "none",
          delay: 0,
          backdropFilter: "blur(0px) brightness(1)",
        });
      }
      if (menuRef.current) {
        gsap.to(menuRef.current, {
          x: "-100%",
          opacity: 0,
          duration: 0.4,
          ease: "expo.inOut",
        });
      }
    }
  }, [menuOpen]);

  // Animate submenu open/close
  useEffect(() => {
    Object.keys(submenuRefs.current).forEach((label) => {
      const submenu = submenuRefs.current[label];
      // Only keep valid DOM nodes for GSAP
      const items = (submenuItemRefs.current[label] || []).filter(Boolean);
      if (!submenu) return;
      if (activeSubMenu === label) {
        gsap.to(submenu, {
          height: "auto",
          opacity: 1,
          duration: 0.5,
          ease: "expo.inOut",
          paddingTop: 8,
          paddingBottom: 8,
          pointerEvents: "auto",
          onStart: () => {
            if (items.length) {
              gsap.fromTo(
                items,
                { opacity: 0, y: -10 },
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.38,
                  stagger: 0.09,
                  ease: "expo.inOut",
                  delay: 0.08,
                }
              );
            }
          },
        });
      } else {
        if (items.length) {
          gsap.to(items, {
            opacity: 0,
            y: -10,
            duration: 0.22,
            stagger: { each: 0.06, from: "end" },
            ease: "expo.inOut",
            onComplete: () => {
              gsap.to(submenu, {
                height: 0,
                opacity: 0,
                duration: 0.38,
                ease: "expo.inOut",
                paddingTop: 0,
                paddingBottom: 0,
                pointerEvents: "none",
              });
            },
          });
        } else {
          gsap.to(submenu, {
            height: 0,
            opacity: 0,
            duration: 0.38,
            ease: "expo.inOut",
            paddingTop: 0,
            paddingBottom: 0,
            pointerEvents: "none",
          });
        }
        // Clear refs for closed submenu
        submenuItemRefs.current[label] = [];
      }
    });
  }, [activeSubMenu]);

  // Handler for menu toggle
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="relative block md:block lg:hidden">
      <div
        className={
          `fixed top-0 left-0 z-50 w-screen items-center h-16 py-1 flex justify-between px-4 transition-all duration-300 shadow-xl ` +
          (isScrolled
            ? "bg-white/40 backdrop-blur-xl border-b border-white/30"
            : "bg-white/30 backdrop-blur-md border-b border-white/10")
        }
        style={{ height: "60px" }}
      >
        <div className="flex items-center">
          <button
            onClick={toggleMenu}
            className="focus:outline-none focus:ring-2 focus:ring-red-800 focus:ring-opacity-50 rounded-md"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <AlignRight size={28} />
          </button>
          <Link href={"/"}>
            <Image
              alt="Company Logo"
              src={"/assets/logo.png"}
              height={110}
              width={110}
              className="p-1"
              priority={true}
            />
          </Link>
        </div>

        {user && userRole ? (
          <Link
            href={`/${userRole}-dashboard`}
            className="bg-red-800 px-3 py-1 rounded-full text-white"
          >
            <button aria-label="Dashboard">Dashboard</button>
          </Link>
        ) : (
          <Link
            href="/login"
            className="bg-red-800 px-4 py-2 rounded-full"
            title="Log In"
          >
            <button className="text-white">Log In</button>
          </Link>
        )}
      </div>

      {/* Overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-40"
        style={{
          background: "rgba(30, 30, 40, 0.35)", // more glassy
          backdropFilter: "blur(12px) brightness(1.08)", // stronger blur
          WebkitBackdropFilter: "blur(12px) brightness(1.08)", // Safari support
          opacity: 0,
          pointerEvents: "none",
          transform: "scale(0.98)",
          transition: "background 0.3s",
          border: "1px solid rgba(255,255,255,0.18)", // subtle border
        }}
        onClick={() => setMenuOpen(false)}
      />

      {/* Menu */}
      <div
        ref={menuRef}
        style={{
          transform: "translateX(-100%)",
          opacity: 0,
          borderTopRightRadius: 18,
          borderBottomRightRadius: 18,
          background: "rgba(255,255,255,0.22)", // more transparent
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.25)",
          backdropFilter: "blur(18px) saturate(1.2)", // stronger blur and a bit of saturation
          WebkitBackdropFilter: "blur(18px) saturate(1.2)", // Safari support
          border: "1px solid rgba(255,255,255,0.18)", // subtle border
        }}
        className="fixed top-0 left-0 w-72 h-screen z-50 overflow-y-scroll p-2 hide-scrollbar"
        role="navigation"
        aria-label="Main Navigation"
      >
        <Link href={"/"} className="">
          <Image
            src={"/assets/logo.png"}
            width={130}
            height={130}
            alt="Company Logo"
            loading="eager"
            quality={75}
            className="mx-auto p-1 mt-5 drop-shadow-lg"
          />
        </Link>
        <button
          onClick={() => setMenuOpen(false)}
          className="absolute right-2 top-2 bg-white shadow-xl p-1 rounded-full shadow-gray-300 hover:bg-red-100 active:scale-95 transition-all"
          aria-label="Close menu"
        >
          <X size={28} />
        </button>

        {/* Regular menu items with optimized animations */}
        {menuItems.map((item: MenuItem, idx) => (
          <div
            key={item.label}
            className={`mx-3 my-1 rounded-xl ${styles.menuItem} ${styles.menuItemAnimated} group`}
            style={{
              animationDelay: `${0.05 + idx * 0.03}s`,
            }}
          >
            {item.href ? (
              <Link
                href={item.href}
                className="block p-2 text-black font-semibold rounded-lg transition-all duration-150 hover:bg-red-50 active:bg-red-100 hover:pl-4"
                onClick={() => setMenuOpen(false)}
                aria-label={`Navigate to ${item.label}`}
              >
                {item.label}
              </Link>
            ) : (
              <div className="block p-2 text-black">
                <button
                  onClick={() => {
                    setActiveSubMenu(
                      activeSubMenu === item.label ? null : item.label
                    );
                  }}
                  className={`w-full text-left flex justify-between items-center rounded-lg transition-all duration-150 hover:bg-red-50 active:bg-red-100 ${activeSubMenu === item.label ? "border-l-4 border-red-700 pl-2 bg-red-50" : ""}`}
                  aria-label={`Toggle submenu for ${item.label}`}
                  aria-expanded={activeSubMenu === item.label}
                >
                  <span className="font-semibold">{item.label}</span>
                  {activeSubMenu === item.label ? (
                    <ChevronUp size={20} className="ml-2" />
                  ) : (
                    <ChevronDown size={20} className="ml-2" />
                  )}
                </button>
                {/* Submenu animation can be handled with CSS transitions or GSAP if needed */}
                {
                  <div
                    ref={(el) => {
                      submenuRefs.current[item.label] = el;
                    }}
                    className="ml-4 overflow-hidden bg-red-50/70 rounded-xl mt-1 styled-scrollbar overflow-y-auto"
                    style={{
                      height: 0,
                      opacity: 0,
                      paddingTop: 0,
                      paddingBottom: 0,
                      maxHeight: 240,
                    }}
                  >
                    {activeSubMenu === item.label &&
                      item.subItems &&
                      item.subItems.map((subItem, index) => (
                        <Link
                          key={subItem.label}
                          href={subItem.href}
                          className="block p-2 text-black rounded-md transition-all duration-150 hover:bg-red-100 active:bg-red-200 ml-2"
                          onClick={() => setMenuOpen(false)}
                          aria-label={`Navigate to ${subItem.label}`}
                        >
                          <div
                            ref={(el) => {
                              if (!submenuItemRefs.current[item.label])
                                submenuItemRefs.current[item.label] = [];
                              submenuItemRefs.current[item.label][index] = el!;
                            }}
                            style={{
                              opacity: 0,
                              transform: "translateY(-10px)",
                            }}
                          >
                            {subItem.label}
                          </div>
                        </Link>
                      ))}
                  </div>
                }
              </div>
            )}
          </div>
        ))}

        <div className="mx-3 mt-4">
          {user && (
            <button
              onClick={() => {
                handleSignOut();
                setMenuOpen(false);
              }}
              className="w-[60%] mx-auto bg-gradient-to-r from-red-700 to-red-500 px-4 py-2 rounded-full text-white shadow-lg hover:scale-105 active:scale-95 transition-all"
              aria-label="Log Out"
            >
              Log Out
            </button>
          )}
        </div>
      </div>

      {/* CSS animations are now handled by the imported CSS module */}
    </nav>
  );
};

export default NavbarMenu;
