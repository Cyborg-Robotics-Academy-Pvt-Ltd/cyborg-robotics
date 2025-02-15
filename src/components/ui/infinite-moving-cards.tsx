"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import Image from "next/image";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "slow",
  pauseOnHover = true,
  className,
}: {
  items: {
    quote: string;
    name: string;
    title: string;
    imageUrl: string;
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);

  const [start, setStart] = useState(false);

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
        speed === "fast" ? "10s" : speed === "normal" ? "20s" : "30s";
      containerRef.current.style.setProperty("--animation-duration", duration);
    }
  };

  useEffect(() => {
    const addAnimation = () => {
      if (containerRef.current && scrollerRef.current) {
        const scrollerContent = Array.from(scrollerRef.current.children);

        // Clear existing duplicated items
        while (scrollerRef.current.children.length > items.length) {
          scrollerRef.current.removeChild(scrollerRef.current.lastChild!);
        }

        // Duplicate items
        scrollerContent.forEach((item) => {
          const duplicatedItem = item.cloneNode(true);
          scrollerRef.current?.appendChild(duplicatedItem);
        });

        getDirection();
        getSpeed();
        setStart(true);
      }
    };

    addAnimation();

    return () => {
      // Cleanup logic here
      if (scrollerRef.current) {
        while (scrollerRef.current.children.length > items.length) {
          scrollerRef.current.removeChild(scrollerRef.current.lastChild!);
        }
      }
    };
  }, [direction, speed, items.length]);

  return (
    <div
      ref={containerRef}
      className={cn(
        `scroller relative z-20 max-w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)] bg-white`,
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap mt-8",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items.map((item) => (
          <li
            className="w-[200px] max-w-full relative rounded-3xl border border-gray-300 h-auto flex-shrink-0 px-4 py-3 md:w-[210px] md:mx-4 bg-white transition-shadow duration-300 hover:shadow-xl"
            key={item.name}
          >
            <blockquote>
              <div
                aria-hidden="true"
                className="user-select-none -z-1 pointer-events-none absolute -left-0.5 -top-0.5 h-[calc(100%_+_4px)] w-[calc(100%_+_4px)]"
              ></div>

              <div className="relative z-20 mt-1 flex flex-col items-center">
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  width={120}
                  height={120}
                  className="rounded-3xl object-cover w-full h-44"
                />
                <span className="flex flex-col gap-1 my-4">
                  <span className="text-sm leading-[1.6] text-black font-normal">
                    {item.name}
                  </span>
                  <span className="text-sm leading-[1.6] text-black font-normal">
                    {item.title}
                  </span>
                </span>
              </div>
            </blockquote>
          </li>
        ))}
      </ul>
    </div>
  );
};
