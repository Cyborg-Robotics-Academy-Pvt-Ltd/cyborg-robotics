"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function Loading() {
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [pathname]);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white z-[9999]">
      <div className="relative">
        <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-3 border-red-800"></div>
      </div>
    </div>
  );
}
