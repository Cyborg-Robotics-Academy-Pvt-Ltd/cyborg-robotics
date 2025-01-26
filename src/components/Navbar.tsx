"use client";
import React, { useEffect, useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "./ui/navbar-menu";
import { cn } from "@/lib/utils";
import Image from "next/image";
import logo from "../../public/assets/logo.png";
import { FaChevronDown, FaBars, FaTimes } from "react-icons/fa";

export function NavbarDemo() {
  return (
    <div className="relative w-full flex items-center justify-center">
      <Navbar className="" />
    </div>
  );
}

const Navbar = ({
  className,
  itemposition,
}: {
  className?: string;
  itemposition?: string;
}) => {
  const [active, setActive] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const menuItems = [
    {
      title: "HOME",
      links: [
        { href: "/web-dev", text: "Web Development" },
        { href: "/interface-design", text: "Interface Design" },
        { href: "/seo", text: "Search Engine Optimization" },
        { href: "/branding", text: "Branding" },
      ],
    },
    {
      title: "ABOUT",
      links: [
        { href: "/web-dev", text: "Web Development" },
        { href: "/interface-design", text: "Interface Design" },
        { href: "/seo", text: "Search Engine Optimization" },
        { href: "/branding", text: "Branding" },
      ],
    },
    {
      title: "ONLINE COURSE",
      links: [
        { href: "/web-dev", text: "Web Development" },
        { href: "/interface-design", text: "Interface Design" },
        { href: "/seo", text: "Search Engine Optimization" },
        { href: "/branding", text: "Branding" },
      ],
    },
    {
      title: "CLASSROOM COURSE",
      links: [
        { href: "/web-dev", text: "Web Development" },
        { href: "/interface-design", text: "Interface Design" },
        { href: "/seo", text: "Search Engine Optimization" },
        { href: "/branding", text: "Branding" },
      ],
    },
    {
      title: "BLOG",
      links: [
        { href: "/web-dev", text: "Web Development" },
        { href: "/interface-design", text: "Interface Design" },
        { href: "/seo", text: "Search Engine Optimization" },
        { href: "/branding", text: "Branding" },
      ],
    },
    {
      title: "EVENT",
      links: [
        { href: "/web-dev", text: "Web Development" },
        { href: "/interface-design", text: "Interface Design" },
        { href: "/seo", text: "Search Engine Optimization" },
        { href: "/branding", text: "Branding" },
      ],
    },
    {
      title: "CONTACT US",
      links: [
        { href: "/hobby", text: "Hobby" },
        { href: "/individual", text: "Individual" },
        { href: "/team", text: "Team" },
        { href: "/enterprise", text: "Enterprise" },
      ],
    },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleDropdown = (title: string) => {
    setActiveDropdown(activeDropdown === title ? null : title);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <header className="w-full hidden md:block lg:block">
        {isMounted && (
          <div className="relative w-full">
            <div className={cn("fixed top-0 inset-x-0 w-full z-50", className)}>
              <Menu setActive={setActive}>
                <Image src={logo} width={120} height={120} alt="logo" />
                <MenuItem setActive={setActive} active={active} item="HOME">
                  <div className="flex flex-col space-y-4 text-sm">
                    <HoveredLink href="/web-dev">Web Development</HoveredLink>
                    <HoveredLink href="/interface-design">
                      Interface Design
                    </HoveredLink>
                    <HoveredLink href="/seo">
                      Search Engine Optimization
                    </HoveredLink>
                    <HoveredLink href="/branding">Branding</HoveredLink>
                  </div>
                </MenuItem>
                <MenuItem setActive={setActive} active={active} item="ABOUT">
                  <div className="flex flex-col space-y-4 text-sm">
                    <HoveredLink href="/web-dev">Web Development</HoveredLink>
                    <HoveredLink href="/interface-design">
                      Interface Design
                    </HoveredLink>
                    <HoveredLink href="/seo">
                      Search Engine Optimization
                    </HoveredLink>
                    <HoveredLink href="/branding">Branding</HoveredLink>
                  </div>
                </MenuItem>
                <MenuItem
                  setActive={setActive}
                  active={active}
                  item="ONLINE COURSE"
                >
                  <div className="flex flex-col space-y-4 text-sm">
                    <HoveredLink href="/web-dev">Web Development</HoveredLink>
                    <HoveredLink href="/interface-design">
                      Interface Design
                    </HoveredLink>
                    <HoveredLink href="/seo">
                      Search Engine Optimization
                    </HoveredLink>
                    <HoveredLink href="/branding">Branding</HoveredLink>
                  </div>
                </MenuItem>
                <MenuItem
                  setActive={setActive}
                  active={active}
                  item="CLASSROOM COURSE"
                >
                  <div className="flex flex-col space-y-4 text-sm">
                    <HoveredLink href="/web-dev">Web Development</HoveredLink>
                    <HoveredLink href="/interface-design">
                      Interface Design
                    </HoveredLink>
                    <HoveredLink href="/seo">
                      Search Engine Optimization
                    </HoveredLink>
                    <HoveredLink href="/branding">Branding</HoveredLink>
                  </div>
                </MenuItem>
                <MenuItem setActive={setActive} active={active} item="BLOG">
                  <div className="flex flex-col space-y-4 text-sm">
                    <HoveredLink href="/web-dev">Web Development</HoveredLink>
                    <HoveredLink href="/interface-design">
                      Interface Design
                    </HoveredLink>
                    <HoveredLink href="/seo">
                      Search Engine Optimization
                    </HoveredLink>
                    <HoveredLink href="/branding">Branding</HoveredLink>
                  </div>
                </MenuItem>
                <MenuItem setActive={setActive} active={active} item="EVENT">
                  <div className="flex flex-col space-y-4 text-sm">
                    <HoveredLink href="/web-dev">Web Development</HoveredLink>
                    <HoveredLink href="/interface-design">
                      Interface Design
                    </HoveredLink>
                    <HoveredLink href="/seo">
                      Search Engine Optimization
                    </HoveredLink>
                    <HoveredLink href="/branding">Branding</HoveredLink>
                  </div>
                </MenuItem>
                <MenuItem setActive={setActive} active={active} item="GALLERY">
                  <div className="text-sm grid grid-cols-2 gap-10 p-4">
                    <ProductItem
                      title="Algochurn"
                      href="https://algochurn.com"
                      src="https://assets.aceternity.com/demos/algochurn.webp"
                      description="Prepare for tech interviews like never before."
                    />
                    <ProductItem
                      title="Tailwind Master Kit"
                      href="https://tailwindmasterkit.com"
                      src="https://assets.aceternity.com/demos/tailwindmasterkit.webp"
                      description="Production ready Tailwind css components for your next project"
                    />
                    <ProductItem
                      title="Moonbeam"
                      href="https://gomoonbeam.com"
                      src="https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.51.31%E2%80%AFPM.png"
                      description="Never write from scratch again. Go from idea to blog in minutes."
                    />
                    <ProductItem
                      title="Rogue"
                      href="https://userogue.com"
                      src="https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.47.07%E2%80%AFPM.png"
                      description="Respond to government RFPs, RFIs and RFQs 10x faster using AI"
                    />
                  </div>
                </MenuItem>
                <MenuItem
                  setActive={setActive}
                  active={active}
                  item="CONTACT US"
                >
                  <div className="flex flex-col space-y-4 text-sm">
                    <HoveredLink href="/hobby">Hobby</HoveredLink>
                    <HoveredLink href="/individual">Individual</HoveredLink>
                    <HoveredLink href="/team">Team</HoveredLink>
                    <HoveredLink href="/enterprise">Enterprise</HoveredLink>
                  </div>
                </MenuItem>
              </Menu>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Navigation */}
      <header className="w-full block md:hidden lg:hidden fixed top-0 left-0 right-0 z-50 bg-[#E1AD01] shadow-md">
        <div className="flex items-center justify-between px-4 py-2">
          <Image src={logo} width={60} height={60} alt="logo" />{" "}
          {/* Adjusted width and height */}
          <button
            onClick={toggleMobileMenu}
            className="text-gray-600 focus:outline-none"
          >
            {isMobileMenuOpen ? (
              <FaTimes className="w-6 h-6 " />
            ) : (
              <FaBars className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`${
            isMobileMenuOpen ? "max-h-full w-full" : "max-h-0 w-0"
          } overflow-hidden transition-all duration-300 ease-in-out bg-white z-50`}
        >
          <div className=" py-2">
            {menuItems.map((item) => (
              <div key={item.title} className="border-b border-gray-200">
                <button
                  className="w-full py-3 flex items-center justify-between text-gray-600"
                  onClick={() => toggleDropdown(item.title)}
                >
                  <span>{item.title}</span>
                  <FaChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      activeDropdown === item.title ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`${
                    activeDropdown === item.title ? "max-h-screen" : "max-h-0"
                  } overflow-hidden transition-all duration-300 ease-in-out`}
                >
                  {item.links.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      className="block py-2 px-4 text-sm text-gray-500 hover:bg-gray-50"
                    >
                      {link.text}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* Mobile Spacer */}
      <div className="w-full h-16 md:hidden block lg:hidden"></div>
    </>
  );
};

export default Navbar;
