"use client";

import React, { useState, useEffect } from "react";
import { Terminal, ArrowUpRight, Cpu, ShieldCheck, Menu, X } from "lucide-react";

export default function CyberHeader() {
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
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      clearInterval(interval);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navItems = [
    { label: "[01_SYSTEM_CORE]", href: "#hero" },
    { label: "[02_PROJECT_MATRIX]", href: "#projects" },
    { label: "[03_CAPABILITIES]", href: "#skills" },
    { label: "[04_CLI_LAB]", href: "#terminal" },
    { label: "[05_TRANSMISSION]", href: "#contact" },
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
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b font-mono ${
        isScrolled
          ? "bg-[#05070B]/95 border-[#06B6D4]/30 py-3 shadow-[0_4px_25px_rgba(6,182,212,0.15)]"
          : "bg-gradient-to-b from-[#05070B]/90 to-transparent border-white/5 py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Cyber Logo HUD */}
        <a
          href="#hero"
          onClick={(e) => scrollToSection(e, "#hero")}
          className="flex items-center gap-3 group"
        >
          <div className="w-9 h-9 rounded-md bg-[#06B6D4]/10 border border-[#06B6D4]/50 flex items-center justify-center font-mono font-bold text-[#06B6D4] text-xs shadow-[0_0_15px_rgba(6,182,212,0.3)] group-hover:scale-105 transition-transform">
            SS
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm text-white tracking-widest group-hover:text-[#06B6D4] transition-colors">
                SAHILPREET
              </span>
              <span className="text-[10px] px-1.5 py-0.2 bg-[#22C55E]/10 border border-[#22C55E]/40 text-[#22C55E] font-semibold">
                V20.26
              </span>
            </div>
            <span className="text-[10px] text-slate-400 tracking-wider hidden sm:block">
              CYBERNETIC SYSTEMS ARCHITECT
            </span>
          </div>
        </a>

        {/* Desktop Nav HUD Links */}
        <nav className="hidden lg:flex items-center gap-6 text-xs text-slate-300">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => scrollToSection(e, item.href)}
              className="hover:text-[#06B6D4] transition-colors relative py-1 group"
            >
              <span>{item.label}</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#06B6D4] group-hover:w-full transition-all duration-200"></span>
            </a>
          ))}
        </nav>

        {/* HUD Telemetry Status */}
        <div className="flex items-center gap-4">
          <div className="hidden xl:flex items-center gap-2 text-[11px] text-slate-300 px-3 py-1.5 rounded-md bg-white/5 border border-white/10">
            <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-ping"></span>
            <span className="text-[#22C55E] font-bold">14MS</span>
            <span className="text-white/20">|</span>
            <span>{time || "12:00 AM IST"}</span>
          </div>

          <a
            href="#contact"
            onClick={(e) => scrollToSection(e, "#contact")}
            className="px-4 py-2 rounded-md bg-[#06B6D4] text-black font-bold text-xs flex items-center gap-2 shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:bg-[#22C55E] hover:shadow-[0_0_20px_rgba(34,197,94,0.4)] transition-all"
          >
            <span>INITIALIZE UPLINK</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>

          {/* Mobile Drawer Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-md bg-white/5 border border-white/10 text-white hover:text-[#06B6D4] transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="p-6 bg-[#05070B]/98 border-b border-[#06B6D4]/30 space-y-3 lg:hidden">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => scrollToSection(e, item.href)}
              className="block p-3 rounded-md bg-white/5 border border-white/10 text-slate-200 hover:text-[#06B6D4] hover:border-[#06B6D4]/50 font-bold transition-all"
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
