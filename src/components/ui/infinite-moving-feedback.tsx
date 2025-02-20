"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import Image from 'next/image';
import { RiDoubleQuotesL } from "react-icons/ri";

const QuoteItem = ({ item }: { item: { quote: string; name: string; image: string } }) => {
  return (
    <li
      className="w-[500px] max-w-full relative rounded-2xl border border-gray-300 flex-shrink-0 px-4 py-2 md:w-[500px] transition-transform duration-300 hover:scale-105 hover:shadow-md bg-white"
      key={item.name}
    >
      <blockquote>
        <div
          aria-hidden="true"
          className="user-select-none -z-1 pointer-events-none absolute -left-0.5 -top-0.5 h-[calc(100%_+_4px)] w-[calc(100%_+_4px)]"
        ></div>
        <div className="flex py-3">
          <div className="flex flex-col items-center h-28 w-32">
            <Image src={item.image} alt={item.name} width={80} height={80} className="rounded-full h-16 w-16" />
          </div>
          <div className="flex-1 mx-8">
            <div className="relative flex z-20 text-md leading-[1.4] text-gray-800 font-normal p-1 transition-all duration-300 h-24 overflow-hidden">
                             
             
              <span className="block">
              <RiDoubleQuotesL color="red"  className="mr-2 text-xl"/>
                {item.quote}
              </span>

            </div>
          </div>
          <div className="absolute bottom-2 right-2 text-red-500 font-seminormal">
           - {item.name}
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
    title: string;
    image: string;
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);

  useEffect(() => {
    addAnimation();
  }, []);
  const [start, setStart] = useState(false);
  function addAnimation() {
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
  }
  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards"
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse"
        );
      }
    }
  };
  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      }
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
          "flex min-w-full shrink-0 gap-4 py-2 w-max flex-nowrap",
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
