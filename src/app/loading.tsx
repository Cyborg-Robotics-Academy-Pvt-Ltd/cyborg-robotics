"use client";

import { useEffect, useState, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export default function Loading() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoadingContent />
    </Suspense>
  );
}

function LoadingContent() {
  const [showLoader, setShowLoader] = useState(true);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 1000); // 3 seconds minimum loading time

    return () => clearTimeout(timer);
  }, [pathname, searchParams]); // Re-trigger on route changes

  if (!showLoader) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-[9999]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
}
