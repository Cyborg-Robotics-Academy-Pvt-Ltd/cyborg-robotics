import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { NavbarDemo } from "@/components/Navbar";

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  // Optional: Use as variable if you want to combine with other fonts
  // variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: "Cyborg Robotics Academy Private Limited",
  description:
    "Cyborg Robotics Academy Private Limited, based in Pune, offers technical courses like Lego Robotics, Electronics, Arduino, IoT, Python, Java, Web Design, App Design, 3D Printing, Animation and Coding. Our hands-on programs emphasize Learning by Doing to develop problem-solving and inquiry skills.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.className} antialiased`}>
        <NavbarDemo />

        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
