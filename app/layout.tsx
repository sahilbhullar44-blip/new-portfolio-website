import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "THE SAHILPREET DISPATCH - VOL. MMXXVI // Avant-Garde Newspaper Portfolio",
  description:
    "Official Editorial Publication & Portfolio of Sahilpreet Singh. Software Engineer specializing in MERN stack, high-frequency WebSockets, multi-tenant RBAC systems, and AI speech-to-text ETL pipelines.",
};

import { RadioProvider } from "./context/RadioContext";
import NewspaperHeader from "@/app/components/NewspaperHeader";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} antialiased bg-[#F7F5F0] text-[#111111] selection:bg-[#111111] selection:text-[#F7F5F0] min-h-screen flex flex-col justify-between overflow-x-hidden`}
      >
        <RadioProvider>
          <NewspaperHeader />
          <div suppressHydrationWarning className="flex-1">{children}</div>
        </RadioProvider>
      </body>
    </html>
  );
}



