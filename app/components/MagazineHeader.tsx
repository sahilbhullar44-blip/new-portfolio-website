"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight, Sparkles } from "lucide-react";

export default function MagazineHeader() {
  const [time, setTime] = useState<string>("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        }) + " IST"
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      clearInterval(interval);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navItems = [
    { label: "01 // COVER", href: "#cover" },
    { label: "02 // STORIES", href: "#projects" },
    { label: "03 // INDEX", href: "#skills" },
    { label: "04 // CLI LAB", href: "#terminal" },
    { label: "05 // CONTACT", href: "#contact" },
  ];

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
          isScrolled
            ? "bg-[#08090C]/95 border-white/10 py-3 shadow-2xl"
            : "bg-gradient-to-b from-[#08090C]/90 via-[#08090C]/40 to-transparent border-white/5 py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
          <a
            href="#cover"
            onClick={(e) => scrollToSection(e, "#cover")}
            className="flex items-center gap-3 group"
          >
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#E2B96B] to-[#C8993B] flex items-center justify-center font-mono font-bold text-black text-sm shadow-lg shadow-[#E2B96B]/20 group-hover:scale-105 transition-transform">
              SS
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-serif-editorial font-bold text-lg md:text-xl tracking-tight text-white group-hover:text-[#E2B96B] transition-colors">
                  SAHILPREET
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#E2B96B]/15 text-[#E2B96B] border border-[#E2B96B]/30">
                  ISSUE 01
                </span>
              </div>
              <span className="text-[10px] font-mono text-slate-400 tracking-wider hidden sm:block">
                EDITORIAL // FULL-STACK & AI ARCHITECT
              </span>
            </div>
          </a>

          <nav className="hidden lg:flex items-center gap-6 font-mono text-xs text-slate-300">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => scrollToSection(e, item.href)}
                className="hover:text-[#E2B96B] transition-colors relative py-1 group"
              >
                <span>{item.label}</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#E2B96B] group-hover:w-full transition-all duration-300"></span>
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <div className="hidden xl:flex items-center gap-2 font-mono text-[11px] text-slate-400 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>{time || "11:30 PM IST"}</span>
            </div>

            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, "#contact")}
              className="hidden sm:flex items-center gap-2 font-mono text-xs px-4 py-2 rounded-full bg-gradient-to-r from-[#E2B96B] to-[#C8993B] text-black font-semibold shadow-lg shadow-[#E2B96B]/20 hover:brightness-110 hover:scale-105 transition-all"
            >
              <span>DISPATCH EDITORIAL</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-white/5 border border-white/10 text-white hover:text-[#E2B96B] transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed inset-x-0 top-[65px] z-40 bg-[#08090C]/98 border-b border-white/10 p-6 shadow-2xl lg:hidden"
          >
            <div className="flex flex-col gap-4 font-mono text-sm">
              <div className="text-[11px] text-[#E2B96B] tracking-widest pb-2 border-b border-white/10">
                NAVIGATION DISPATCH
              </div>
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => scrollToSection(e, item.href)}
                  className="py-2.5 px-3 rounded-lg text-slate-200 hover:text-black hover:bg-[#E2B96B] transition-all flex items-center justify-between"
                >
                  <span>{item.label}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
