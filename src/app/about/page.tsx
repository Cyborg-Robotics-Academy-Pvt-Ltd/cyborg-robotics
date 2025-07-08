"use client";
import Image from "next/image";
import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
import Head from "next/head";
import Footer from "@/components/Footer";
import { InfiniteCertificateImages } from "@/components/ui/inifinite-moving-certificate";
import Link from "next/link";

const Page = () => {
  // Remove isVisible state

  // Refs for advanced animations
  const heroRef = useRef<HTMLDivElement | null>(null);
  const heroHeadingRef = useRef<HTMLHeadingElement | null>(null);
  const heroLogoRef = useRef<HTMLDivElement | null>(null);
  const heroBg1Ref = useRef<HTMLDivElement | null>(null);
  const heroBg2Ref = useRef<HTMLDivElement | null>(null);
  const heroFloat1Ref = useRef<HTMLDivElement | null>(null);
  const heroFloat2Ref = useRef<HTMLDivElement | null>(null);
  const statsRef = useRef<(HTMLDivElement | null)[]>([]);
  const aboutLeftRef = useRef<HTMLDivElement | null>(null);
  const aboutRightRef = useRef<HTMLDivElement | null>(null);
  const featuresRef = useRef<(HTMLDivElement | null)[]>([]);
  const recognitionRef = useRef<HTMLDivElement | null>(null);
  const ctaRef = useRef<HTMLDivElement | null>(null);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useLayoutEffect(() => {
    // Hero heading text reveal
    if (heroHeadingRef.current) {
      gsap.fromTo(
        heroHeadingRef.current.querySelectorAll(".reveal-word"),
        { y: 60, opacity: 0, clipPath: "inset(0 0 100% 0)" },
        {
          y: 0,
          opacity: 1,
          clipPath: "inset(0 0 0% 0)",
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          delay: 0.2,
        }
      );
    }
    // Hero logo subtle scale/rotate loop
    if (heroLogoRef.current) {
      gsap.to(heroLogoRef.current, {
        scale: 1.04,
        rotate: 2,
        duration: 2.5,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });
    }
    // Parallax background shapes
    if (heroBg1Ref.current && heroBg2Ref.current) {
      gsap.to(heroBg1Ref.current, {
        y: () => window.innerHeight * 0.08,
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "+=400",
          scrub: 0.5,
        },
      });
      gsap.to(heroBg2Ref.current, {
        y: () => -window.innerHeight * 0.06,
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "+=400",
          scrub: 0.5,
        },
      });
    }
    // Hero floating elements
    if (heroFloat1Ref.current) {
      gsap.to(heroFloat1Ref.current, {
        y: -15,
        opacity: 1,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "easeInOut",
      });
    }
    if (heroFloat2Ref.current) {
      gsap.to(heroFloat2Ref.current, {
        y: 20,
        opacity: 0.7,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "easeInOut",
      });
    }
    // Stats Section - staggered, scale/fade, glassmorphism
    gsap.fromTo(
      statsRef.current,
      { opacity: 0, y: 40, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.7,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: statsRef.current[0],
          start: "top 80%",
        },
        onStart: () => {
          // Animated counter for each stat
          statsRef.current.forEach((el) => {
            if (el) {
              const numberEl = el.querySelector(".stat-number");
              if (numberEl) {
                const dataValue = numberEl.getAttribute("data-value") || "0";
                const endValue = parseInt(dataValue.replace(/\D/g, ""), 10);
                const plus = dataValue.includes("+");
                const duration = 1.2;
                const counter = { val: 0 };
                gsap.to(counter, {
                  val: endValue,
                  duration,
                  ease: "power1.out",
                  onUpdate: function () {
                    const val = Math.floor(counter.val);
                    numberEl.textContent = plus
                      ? val.toString() + "+"
                      : val.toString();
                  },
                });
              }
            }
          });
        },
      }
    );
    // About Section
    if (aboutLeftRef.current) {
      gsap.fromTo(
        aboutLeftRef.current,
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          delay: 0.2,
          scrollTrigger: {
            trigger: aboutLeftRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }
    if (aboutRightRef.current) {
      gsap.fromTo(
        aboutRightRef.current,
        { x: 30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          delay: 0.4,
          scrollTrigger: {
            trigger: aboutRightRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }
    // Features Section - staggered, slide up, glassmorphism, micro-interaction
    gsap.fromTo(
      featuresRef.current,
      { opacity: 0, y: 40, scale: 0.97 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.7,
        stagger: 0.13,
        ease: "power2.out",
        scrollTrigger: {
          trigger: featuresRef.current[0],
          start: "top 80%",
        },
      }
    );
    // Features micro-interaction on hover
    featuresRef.current.forEach((el) => {
      if (el) {
        el.addEventListener("mouseenter", () => {
          gsap.to(el, {
            scale: 1.04,
            boxShadow: "0 8px 32px 0 rgba(153,27,27,0.15)",
            duration: 0.25,
          });
        });
        el.addEventListener("mouseleave", () => {
          gsap.to(el, {
            scale: 1,
            boxShadow: "0 4px 16px 0 rgba(153,27,27,0.08)",
            duration: 0.25,
          });
        });
      }
    });
    // Recognition Section
    if (recognitionRef.current) {
      gsap.fromTo(
        recognitionRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: recognitionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }
    // CTA Section
    if (ctaRef.current) {
      gsap.fromTo(
        ctaRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }
    // Button hover shine/scale effect
    buttonRefs.current.forEach((btn) => {
      if (btn) {
        btn.addEventListener("mouseenter", () => {
          gsap.to(btn, {
            scale: 1.06,
            boxShadow: "0 8px 32px 0 rgba(153,27,27,0.18)",
            duration: 0.18,
          });
        });
        btn.addEventListener("mouseleave", () => {
          gsap.to(btn, {
            scale: 1,
            boxShadow: "0 4px 16px 0 rgba(153,27,27,0.10)",
            duration: 0.18,
          });
        });
      }
    });
  }, []);
  const listItems = [
    { text: "12+ Years of Expertise", icon: "/assets/courses/experinces.png" },
    { text: "6000+ Students Trained", icon: "/assets/courses/trained.png" },
    { text: "100,000+ Classes Conducted", icon: "/assets/courses/class.png" },
    {
      text: "15+ Regional, National and International Awards and Competitions Won",
      icon: "/assets/courses/award.png",
    },
    {
      text: "Training for Competitions – Regional, National and International",
      icon: "/assets/courses/competition.png",
    },
    {
      text: "Certified Trainers and Instructors",
      icon: "/assets/courses/experinces.png",
    },
    {
      text: "Age-Appropriate Foundation and Career-Oriented Courses",
      icon: "/assets/courses/age.png",
    },
  ];

  const testimonials = [
    {
      image: "/assets/certificates/certificate (1).png",
      name: "Certificate of Appreciation, WRO India 2016- Football",
    },
    {
      image: "/assets/certificates/certificate (2).png",
      name: "Certificate of Appreciation, WRO India 2016- Regular Elementary",
    },
    {
      image: "/assets/certificates/certificate (3).png",
      name: "WRO, Qatar 2015",
    },
    {
      image: "/assets/certificates/certificate (4).png",
      name: "India Stem Foundation, Certificate of Recognition, 10th Indian Robot Olympiad",
    },
  ];

  const courses = [
    { name: "Lego Robotics", icon: "/assets/courses/lego.png" },
    { name: "Electronics", icon: "/assets/courses/electronics.png" },
    { name: "Arduino & IoT", icon: "/assets/courses/arduino.png" },
    { name: "Python & Java", icon: "/assets/courses/coding.png" },
    { name: "Web Design", icon: "/assets/courses/webdesign.png" },
    { name: "App Development", icon: "/assets/courses/appdesign.png" },
    { name: "3D Printing", icon: "/assets/courses/3dprinter.png" },
    { name: "Animation", icon: "/assets/courses/animation.png" },
  ];

  const stats = [
    { number: "12+", label: "Years Experience" },
    { number: "6000+", label: "Students Trained" },
    { number: "100,000+", label: "Classes Conducted" },
    { number: "15+", label: "Awards Won" },
  ];

  return (
    <>
      <Head>
        <title>About Us - Cyborg Robotics Academy</title>
        <meta
          name="description"
          content="Learn about Cyborg Robotics Academy, offering technical courses in robotics, electronics and programming for students of all ages."
        />
        <meta
          name="keywords"
          content="Robotics, Electronics, Programming, Courses, Education, Cyborg Robotics Academy"
        />
      </Head>
      <main
        role="main"
        aria-label="About Us Page"
        className="bg-gradient-to-b from-white to-red-50 min-h-screen animated-gradient"
      >
        {/* Hero Section - Now with white background */}
        <div
          ref={heroRef}
          className="relative bg-gradient-to-b from-white to-red-50 py-20 lg:py-32 border-b border-gray-100 overflow-hidden"
        >
          {/* Background Elements */}
          <div
            ref={heroBg1Ref}
            className="absolute top-0 right-0 w-64 h-64 bg-red-100 rounded-full -mr-32 -mt-32 opacity-50 parallax-bg"
          ></div>
          <div
            ref={heroBg2Ref}
            className="absolute bottom-0 left-0 w-48 h-48 bg-red-100 rounded-full -ml-24 -mb-24 opacity-50 parallax-bg"
          ></div>

          {/* Floating Elements */}
          <div
            ref={heroFloat1Ref}
            className="absolute top-40 right-20 w-8 h-8 bg-red-200 rounded-full hidden lg:block"
            style={{ opacity: 0.5 }}
          />
          <div
            ref={heroFloat2Ref}
            className="absolute bottom-32 left-1/4 w-12 h-12 bg-red-100 rounded-full hidden lg:block"
            style={{ opacity: 0.3 }}
          />

          <div className="container mx-auto px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center justify-between">
              <div className="lg:w-1/2 mb-12 lg:mb-0 z-10">
                <h1
                  ref={heroHeadingRef}
                  className="text-4xl lg:text-6xl font-bold mb-6 overflow-hidden"
                >
                  <span className="reveal-word inline-block">Shaping</span>{" "}
                  <span className="reveal-word inline-block">Future</span>{" "}
                  <span className="text-[#991b1b] relative">
                    <span className="reveal-word inline-block">Innovators</span>
                    <span
                      style={{
                        display: "block",
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        width: "100%",
                        height: 4,
                        background: "#991b1b",
                        transition: "width 0.8s cubic-bezier(0.4,0,0.2,1) 1s",
                      }}
                    />
                  </span>
                </h1>
                <p className="text-xl lg:text-2xl mb-8 text-gray-600 max-w-lg">
                  Empowering young minds through robotics, electronics and
                  programming since 2011
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/classroom-courses/bambino-coding">
                    <button
                      ref={(el) => {
                        buttonRefs.current[0] = el;
                      }}
                      className="bg-[#991b1b] hover:bg-[#7f1d1d] text-white px-8 py-4 rounded-xl font-medium transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 gsap-btn relative overflow-hidden"
                    >
                      Our Courses
                      <span className="shine absolute left-[-75%] top-0 h-full w-2/3 pointer-events-none"></span>
                    </button>
                  </Link>
                  <Link href="/contact-us">
                    <button
                      ref={(el) => {
                        buttonRefs.current[1] = el;
                      }}
                      className="border-2 border-[#991b1b] hover:bg-[#991b1b] hover:text-white text-[#991b1b] px-8 py-4 rounded-xl font-medium transition-all shadow-md hover:shadow-lg transform hover:-translate-y-1 gsap-btn relative overflow-hidden"
                    >
                      Contact Us
                      <span className="shine absolute left-[-75%] top-0 h-full w-2/3 pointer-events-none"></span>
                    </button>
                  </Link>
                </div>
              </div>

              <div className="lg:w-1/2 flex justify-center relative z-10">
                <div className="relative">
                  {/* Decorative Elements */}
                  <div
                    className="absolute -z-10 w-72 h-72 rounded-full bg-red-100 -left-10 -top-10"
                    ref={heroBg1Ref}
                  />
                  <div
                    className="absolute -z-10 w-32 h-32 rounded-full bg-red-200 right-0 top-1/2"
                    ref={heroBg2Ref}
                  />

                  {/* Logo/Image with Glow Effect */}
                  <div ref={heroLogoRef} className="relative">
                    <div
                      className="absolute inset-0 bg-red-200 rounded-xl filter blur-xl"
                      style={{ opacity: 0.3 }}
                    />
                    <Image
                      src="/assets/logo.png"
                      alt="Cyborg Robotics Academy"
                      width={400}
                      height={400}
                      className="rounded-xl relative z-10"
                    />
                  </div>

                  <div
                    className="absolute -z-10 w-48 h-48 rounded-full bg-gray-100 -right-5 -bottom-5"
                    style={{ opacity: 1 }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section - Enhanced with card design */}
        <div className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  ref={(el) => {
                    statsRef.current[index] = el;
                  }}
                  className="glass-card text-center p-6 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100"
                >
                  <h2
                    className="text-4xl lg:text-5xl font-bold text-[#991b1b] mb-2 stat-number"
                    data-value={stat.number}
                  >
                    0
                  </h2>
                  <p className="text-gray-600 font-medium">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="py-20 lg:py-24 container mx-auto px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div ref={aboutLeftRef} className="lg:w-1/2">
              <h2 className="text-3xl lg:text-4xl font-bold mb-6 inline-block relative">
                About Us
                <span className="absolute bottom-0 left-0 w-1/3 h-1 bg-[#991b1b]"></span>
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                Cyborg Robotics Academy Private Limited, based in Pune, offers a
                wide range of technical courses, including Lego Robotics,
                Electronics, Arduino, IoT, Python, Java, Web Design, App Design,
                3D Printing, Animation and Coding both in-person and online.
              </p>
              <p className="text-lg text-gray-700 mb-8">
                Our programs emphasize a{" "}
                <span className="font-semibold text-[#991b1b]">
                  Learning by Doing
                </span>{" "}
                approach, helping students develop problem-solving,
                decision-making and inquiry skills through hands-on experiences.
                Courses vary by age and include practical learning, building and
                programming robotic models while exploring real-life
                applications and concepts.
              </p>
              <button className="px-8 py-3 bg-[#991b1b] hover:bg-[#7f1d1d] text-white rounded-xl transition-all shadow-md hover:shadow-lg relative overflow-hidden">
                Learn More
                <span className="shine absolute left-[-75%] top-0 h-full w-2/3 pointer-events-none"></span>
              </button>
            </div>
            <div
              ref={aboutRightRef}
              className="lg:w-1/2 grid grid-cols-2 gap-6"
            >
              {courses.map((course, index) => (
                <div
                  key={index}
                  ref={(el) => {
                    if (el) {
                      gsap.fromTo(
                        el,
                        { opacity: 0, y: 20 },
                        {
                          opacity: 1,
                          y: 0,
                          duration: 0.5,
                          delay: index * 0.2,
                          scrollTrigger: {
                            trigger: el,
                            start: "top 80%",
                          },
                        }
                      );
                    }
                  }}
                  className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all flex items-center space-x-4 border border-gray-100"
                >
                  <div className="bg-red-50 p-3 rounded-full">
                    <Image
                      src={course.icon}
                      alt={course.name}
                      width={24}
                      height={24}
                    />
                  </div>
                  <span className="font-medium">{course.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Features Section - Enhanced with better visuals */}
        <div className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Why Choose{" "}
                <span className="text-[#991b1b]">Cyborg Robotics</span>
              </h2>
              <div className="w-24 h-1 bg-[#991b1b] mx-auto"></div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {listItems.map((item, index) => (
                <div
                  key={index}
                  ref={(el) => {
                    featuresRef.current[index] = el;
                  }}
                  className="glass-card p-6 rounded-xl shadow-sm hover:shadow-lg transition-all border border-gray-100 cursor-pointer"
                >
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="bg-red-50 p-3 rounded-full text-[#991b1b]">
                      <Image src={item.icon} alt="" width={28} height={28} />
                    </div>
                    <h3 className="font-bold text-lg">{item.text}</h3>
                  </div>
                  <p className="text-gray-600 pl-14">
                    {/* Adding a brief description for each feature */}
                    {index === 0 &&
                      "Over a decade of excellence in robotics education."}
                    {index === 1 &&
                      "A growing community of young innovators and tech enthusiasts."}
                    {index === 2 &&
                      "Comprehensive learning experiences across multiple domains."}
                    {index === 3 &&
                      "Recognized excellence at all competitive levels."}
                    {index === 4 &&
                      "Specialized training to prepare students for prestigious competitions."}
                    {index === 5 &&
                      "Expert instructors with industry and academic credentials."}
                    {index === 6 &&
                      "Tailored curriculum designed for various age groups and career paths."}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recognition Section */}
        <div ref={recognitionRef} className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Our <span className="text-[#991b1b]">National</span> and{" "}
                <span className="text-[#991b1b]">International</span>{" "}
                Recognition
              </h2>
              <div className="w-24 h-1 bg-[#991b1b] mx-auto mb-6"></div>
              <p className="text-center text-gray-600 max-w-3xl mx-auto">
                Our students have excelled at various competitions and events
                around the world, bringing home accolades and recognition for
                their innovative projects and technical skills.
              </p>
            </div>

            <InfiniteCertificateImages items={testimonials} />
          </div>
        </div>

        {/* CTA Section - Enhanced with card design */}
        <div ref={ctaRef} className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="bg-white rounded-2xl shadow-lg p-12 max-w-4xl mx-auto border border-gray-100 relative overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute -top-16 -right-16 w-32 h-32 bg-red-50 rounded-full"></div>
              <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-red-50 rounded-full"></div>

              <div className="relative z-10 text-center">
                <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                  Ready to Begin Your{" "}
                  <span className="text-[#991b1b]">Tech Journey</span>?
                </h2>

                <p className="text-xl mb-10 max-w-2xl mx-auto text-gray-600">
                  Join Cyborg Robotics Academy and discover the exciting world
                  of robotics, programming and electronics with our expert
                  guidance.
                </p>

                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Link
                    href="https://wa.me/917028511161?text=Hello%20Cyborg,%20I%20am%20looking%20for%20some%20help!%20(Enquiry)"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button
                      ref={(el) => {
                        buttonRefs.current[2] = el;
                      }}
                      className="bg-[#991b1b] text-white hover:bg-[#7f1d1d] px-8 py-3 rounded-xl font-medium transition-all shadow-md hover:shadow-lg gsap-btn relative overflow-hidden"
                    >
                      Enroll Now
                      <span className="shine absolute left-[-75%] top-0 h-full w-2/3 pointer-events-none"></span>
                    </button>
                  </Link>
                  <button
                    ref={(el) => {
                      buttonRefs.current[3] = el;
                    }}
                    className="border border-[#991b1b] text-[#991b1b] hover:bg-[#991b1b] hover:text-white px-8 py-3 rounded-xl font-medium transition-all shadow-sm hover:shadow-md gsap-btn relative overflow-hidden"
                  >
                    View Courses
                    <span className="shine absolute left-[-75%] top-0 h-full w-2/3 pointer-events-none"></span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <style jsx global>{`
        .glass-card {
          background: rgba(255, 255, 255, 0.55);
          box-shadow: 0 4px 16px 0 rgba(153, 27, 27, 0.08);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.25);
          transition:
            box-shadow 0.2s,
            background 0.2s;
        }
        .glass-card:hover {
          background: rgba(255, 255, 255, 0.7);
          box-shadow: 0 8px 32px 0 rgba(153, 27, 27, 0.15);
        }
        .shine {
          background: linear-gradient(
            120deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.5) 50%,
            rgba(255, 255, 255, 0) 100%
          );
          opacity: 0.7;
          filter: blur(1px);
          transition: none;
          z-index: 2;
          animation: none;
        }
        button:hover .shine,
        button:focus .shine,
        button:active .shine {
          animation: shine-move 0.7s cubic-bezier(0.4, 0, 0.2, 1);
        }
        @keyframes shine-move {
          0% {
            left: -75%;
          }
          100% {
            left: 110%;
          }
        }
        .animated-gradient {
          background: linear-gradient(120deg, #fff 0%, #ffe5e5 100%);
          background-size: 200% 200%;
          animation: gradientMove 8s ease-in-out infinite;
        }
        @keyframes gradientMove {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </>
  );
};

export default Page;
