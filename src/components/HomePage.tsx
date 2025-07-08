"use client";
import React, { useEffect, useState } from "react";
import Carousel from "./Carousel";
import Features from "./Features";
import VisionSection from "./VisionSection";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FeedBack from "./FeedBack";
import GallerySection from "./GallerySection";
import Feature2 from "./Feature2";
import Footer from "./Footer";
import ScrollButton from "./ScrollButton";
import { useScrollDirection } from "../hooks/useScrollDirection";
import WhatWeOffer from "./WhatWeOffer";

gsap.registerPlugin(ScrollTrigger);

const HomePage: React.FC = () => {
  const { scrollDirection } = useScrollDirection();
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Refs for each section
  const featuresRef = useRef(null);
  const feature2Ref = useRef(null);
  const whatWeOfferRef = useRef(null);
  const visionSectionRef = useRef(null);
  const gallerySectionRef = useRef(null);
  const feedbackRef = useRef(null);
  const footerRef = useRef(null);

  // Animate floating buttons for smooth entrance
  const contactBtnRef = useRef(null);
  const whatsappBtnRef = useRef(null);

  const shouldShowButtons = isInitialLoad || scrollDirection === "down";

  useEffect(() => {
    // Set initial load to false after 2 seconds
    const timer = setTimeout(() => {
      setIsInitialLoad(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Animate each section when it comes into view with smoothness and stagger
    const sections = [
      featuresRef,
      feature2Ref,
      whatWeOfferRef,
      visionSectionRef,
      gallerySectionRef,
      feedbackRef,
      footerRef,
    ];
    gsap.set(
      sections.map((ref) => ref.current),
      { opacity: 0, y: 60 }
    );
    sections.forEach((ref) => {
      if (ref.current) {
        gsap.to(ref.current, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "expo.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 88%",
            toggleActions: "play none none none",
            once: true,
          },
        });
      }
    });
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  useEffect(() => {
    if (shouldShowButtons) {
      gsap.fromTo(
        contactBtnRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }
      );
      gsap.fromTo(
        whatsappBtnRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power3.out", delay: 0.1 }
      );
    }
  }, [shouldShowButtons]);

  return (
    <>
      <div className="bg-white text-black">
        <Carousel />
        <div ref={featuresRef}>
          <Features />
        </div>
        <div ref={feature2Ref}>
          <Feature2 />
        </div>
        <div ref={whatWeOfferRef}>
          <WhatWeOffer />
        </div>
        <div ref={visionSectionRef}>
          <VisionSection />
        </div>
        <div ref={gallerySectionRef}>
          <GallerySection />
        </div>
        <div ref={feedbackRef}>
          <FeedBack />
        </div>
        <div ref={footerRef}>
          <Footer />
        </div>
        {/* WhatsApp Floating Button */}
        {/*  */}
        <div className="fixed w-full bottom-1 right-4 items-center z-50 flex justify-between">
          {shouldShowButtons && (
            <div ref={contactBtnRef}>
              <Link href={"/contact-us"}>
                <div
                  className="bg-red-800 text-white h-8 shadow-xl hover:bg-white hover:text-black px-2 py-1 rounded-[8px] text-center mx-10"
                  style={{ transition: "transform 0.2s" }}
                >
                  <span className="text-center">BOOK FREE TRIAL NOW !</span>
                </div>
              </Link>
            </div>
          )}

          {shouldShowButtons && (
            <div className="md:mr-28 mr-8" ref={whatsappBtnRef}>
              <Link
                href="https://wa.me/917028511161?text=Hello%20Cyborg,%20I%20am%20looking%20for%20some%20help!%20(Enquiry)"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div>
                  <Image
                    src="/assets/whatsapp.png"
                    alt="WhatsApp Logo"
                    width={60}
                    height={60}
                    loading="lazy"
                    className="transition-opacity duration-300"
                  />
                </div>
              </Link>
            </div>
          )}

          <ScrollButton />
          <div className="fixed bottom-0 -right-2 p-4">
            <Link
              href="https://www.linkedin.com/in/shrikant11/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/mylogo.png"
                alt="Company Logo"
                width={20}
                height={20}
                loading="lazy"
                quality={75}
                className="opacity-20"
              />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
