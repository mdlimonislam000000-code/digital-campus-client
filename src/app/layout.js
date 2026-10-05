"use client";

import { Geist, Geist_Mono } from "next/font/google";
import { usePathname } from "next/navigation";
import "./globals.css";
import Navbar from "@/components/Navbar";
import DipertmentNotice from "@/components/DepertmentNotice";
import MyCampusNotice from "@/components/MyCampusNotice";
import AllCampusNotice from "@/components/AllCampusNotice";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  const pathname = usePathname();
  
  // Ekhane '/register' ebong '/login' duitai properly check kora holo
  const isAuthPage = 
    pathname === "/login" || 
    pathname === "/register" || 
    pathname.startsWith("/sign-up");
    
  const isDashboard = pathname.startsWith("/dashboard");

  // Jodi login ba register page hoy, tahole shudhu form-er children-ti dekhabe, kono Navbar ba sidebar thakbe na
  if (isAuthPage) {
    return (
      <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
        <body className="min-h-screen flex items-center justify-center bg-gray-100">
          <main className="w-full">{children}</main>
        </body>
      </html>
    );
  }

  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-screen flex flex-col bg-gray-100">
        
        {/* Navbar */}
        <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
          <Navbar />
        </header>

        {isDashboard ? (
          <main className="flex-1 w-full">{children}</main>
        ) : (
          <div className="max-w-7xl w-full mx-auto flex justify-between px-2 sm:px-4 py-4 flex-1">
            {/* বাঁ পাশের নোটিশ সাইডবার */}
            <aside className="hidden md:block w-80 lg:w-88 sticky top-20 h-[calc(100vh-6rem)] overflow-y-auto pr-2 custom-scrollbar">
              <div className="flex flex-col space-y-4 pb-6">
                <DipertmentNotice />
                <MyCampusNotice />
                <AllCampusNotice />
              </div>
            </aside>

            {/* মূল কন্টেন্ট */}
            <main className="flex-1 mx-2 sm:mx-4">{children}</main>
          </div>
        )}
      </body>
    </html>
  );
}