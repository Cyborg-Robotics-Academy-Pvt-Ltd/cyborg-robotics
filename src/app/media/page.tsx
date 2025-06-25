"use client";
import MediaSection from "@/components/MediaSection";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const [canRender, setCanRender] = useState(false);

  useEffect(() => {
    const userRole =
      typeof window !== "undefined" ? localStorage.getItem("userRole") : null;
    if (userRole !== "admin" && userRole !== "trainer") {
      router.push("/login");
    } else {
      setCanRender(true);
    }
  }, [router]);

  if (!canRender) {
    return null;
  }

  return (
    <div>
      <MediaSection />
    </div>
  );
};

export default Page;
