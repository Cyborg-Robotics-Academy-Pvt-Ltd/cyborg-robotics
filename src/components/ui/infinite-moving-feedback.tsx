"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { RiDoubleQuotesL } from "react-icons/ri";
import { FaStar } from "react-icons/fa";

const QuoteItem = ({
  item,
}: {
  item: { quote: string; name: string; image: string; rating: number };
}) => {
  return (
    <li
      className="w-full sm:w-[500px] h-auto min-h-[150px] max-w-[600px] relative rounded-2xl border border-gray-300 flex-shrink-0 px-4 py-3 sm:px-6  transition-transform duration-300 hover:scale-105 hover:shadow-lg bg-white"
      key={item.name}
    >
      <blockquote className="flex items-start space-x-3 sm:space-x-4 h-full">
        {/* Profile Image */}
        <div className="flex-shrink-0">
          <Image
            src={item.image}
            alt={item.name}
            width={48}
            height={48}
            className="rounded-full h-12 w-12 sm:h-14 sm:w-14 border border-gray-200"
            priority
            placeholder="blur"
            blurDataURL={item.image}
          />
        </div>

        {/* Quote Content */}
        <div className="flex-1 flex flex-col justify-between min-h-[100px]">
          <div className="relative text-gray-800 text-xs sm:text-sm">
            <RiDoubleQuotesL className="text-red-500 text-xl sm:text-2xl inline" />
            <p className="text-left mx-3 sm:mx-4">{item.quote}</p>
          </div>

          {/* Rating */}
          <div className="flex items-center mt-1 sm:mt-2 space-x-1 mx-3 sm:mx-4">
            {Array.from({ length: item.rating }, (_, i) => (
              <FaStar
                key={i}
                className="text-yellow-500 text-xs sm:text-sm"
                size={16}
              />
            ))}
          </div>

          {/* Name */}
          <div className="mt-1 text-right text-red-500 font-semibold text-base sm:text-lg">
            ~ {item.name}
          </div>
        </div>
      </blockquote>
    </li>
  );
};

export const InfiniteFeedBack = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: {
    quote: string;
    name: string;
    image: string;
    rating: number;
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);

  const [start, setStart] = useState(false);

  const addAnimation = useCallback(() => {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }, [direction, speed]);

  useEffect(() => {
    addAnimation();
  }, [addAnimation]);

  const getDirection = () => {
    if (containerRef.current) {
      containerRef.current.style.setProperty(
        "--animation-direction",
        direction === "left" ? "forwards" : "reverse"
      );
    }
  };

  const getSpeed = () => {
    if (containerRef.current) {
      const duration =
        speed === "fast" ? "20s" : speed === "normal" ? "40s" : "80s";
      containerRef.current.style.setProperty("--animation-duration", duration);
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative z-20 w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_5%,white_95%,transparent)] bg-white",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex min-w-full shrink-0 gap-2 sm:gap-4 py-2 sm:py-2 w-max flex-nowrap",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items.map((item) => (
          <QuoteItem key={item.name} item={item} />
        ))}
      </ul>
    </div>
  );
};
