"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X, Palette, Radio } from "lucide-react";
import VintageRadioPlayer from "@/app/components/VintageRadioPlayer";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function NewspaperHeader() {
  const [mounted, setMounted] = useState(false);
  const [dateStr, setDateStr] = useState<string>("AUG 14, 2026");
  const [timeStr, setTimeStr] = useState<string>("12:12 AM IST");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [radioOpen, setRadioOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<"parchment" | "midnight" | "sepia">("parchment");
  const pathname = usePathname();

  const headerRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const frameObj = useRef({ frame: 1 });
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  // Preload all 240 transparent PNG frames into memory
  useEffect(() => {
    const totalFrames = 240;
    const loadedImages: HTMLImageElement[] = [];

    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image();
      const numStr = String(i).padStart(6, "0");
      img.src = `/frames/frame_${numStr}.png`;
      loadedImages.push(img);
    }
    imagesRef.current = loadedImages;

    const drawInit = () => {
      const canvas = canvasRef.current;
      if (canvas && loadedImages[0]) {
        const ctx = canvas.getContext("2d");
        if (ctx) {
          canvas.width = loadedImages[0].naturalWidth || 848;
          canvas.height = loadedImages[0].naturalHeight || 478;
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(loadedImages[0], 0, 0);
          console.log("Canvas initial frame drawn. Size:", canvas.width, canvas.height);
        }
      }
    };

    // Draw initial frame safely considering cache
    if (loadedImages[0]) {
      if (loadedImages[0].complete) {
        drawInit();
      } else {
        loadedImages[0].onload = drawInit;
      }
    }
  }, []);

  // GSAP 60 FPS Frame Sequence Timeline controlled by Hover
  useGSAP(
    () => {
      const canvas = canvasRef.current;
      const header = headerRef.current;
      if (!canvas || !header) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const renderFrame = (idx: number) => {
        const img = imagesRef.current[idx - 1];
        if (img) {
          if (canvas.width !== img.naturalWidth || canvas.height !== img.naturalHeight) {
            canvas.width = img.naturalWidth || 848;
            canvas.height = img.naturalHeight || 478;
          }
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0);
          console.log("Rendered frame:", idx);
        }
      };

      tweenRef.current = gsap.to(frameObj.current, {
        frame: 240,
        snap: "frame",
        ease: "none",
        duration: 10,
        paused: true,
        onUpdate: () => {
          renderFrame(Math.round(frameObj.current.frame));
        },
      });
    },
    { scope: headerRef }
  );

  useEffect(() => {
    setMounted(true);
    const savedTheme = (localStorage.getItem("dispatch-theme") as "parchment" | "midnight" | "sepia") || "parchment";
    setCurrentTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const handleThemeChange = (theme: "parchment" | "midnight" | "sepia") => {
    setCurrentTheme(theme);
    localStorage.setItem("dispatch-theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  };

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setDateStr(
        now.toLocaleDateString("en-US", {
          timeZone: "Asia/Kolkata",
          weekday: "short",
          month: "short",
          day: "2-digit",
          year: "numeric",
        }).toUpperCase()
      );
      setTimeStr(
        now.toLocaleTimeString("en-US", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const navItems = [
    { label: "01 // FRONT PAGE", href: "/" },
    { label: "02 // FEATURE STORIES", href: "/projects" },
    { label: "03 // CLASSIFIEDS INDEX", href: "/skills" },
    { label: "04 // ARCHITECT STORY", href: "/about" },
    { label: "05 // CORRESPONDENCE", href: "/contact" },
  ];

  const [weatherStr, setWeatherStr] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const cached = sessionStorage.getItem("dispatch-weather-cache");
      if (cached) {
        setWeatherStr(cached);
        return;
      }
    }

    async function fetchWeather() {
      try {
        const res = await fetch(
          "https://api.open-meteo.com/v1/forecast?latitude=31.634&longitude=74.8723&current=temperature_2m,relative_humidity_2m,weather_code"
        );
        if (res.ok) {
          const data = await res.json();
          if (data?.current?.temperature_2m !== undefined) {
            const temp = Math.round(data.current.temperature_2m);
            const humidity = data.current.relative_humidity_2m;
            const formatted = `WEATHER: ${temp}°C • ${humidity}% HUMIDITY`;
            setWeatherStr(formatted);
            if (typeof window !== "undefined") {
              sessionStorage.setItem("dispatch-weather-cache", formatted);
            }
            return;
          }
        }
      } catch (e) {
        console.warn("Open-Meteo fetch failed...", e);
      }

      try {
        const res = await fetch("https://wttr.in/Amritsar?format=%t+%C+%h");
        if (res.ok) {
          const text = await res.text();
          if (text && !text.includes("<") && !text.includes("DOCTYPE")) {
            const cleaned = text.replace("+", "").trim().toUpperCase();
            const formatted = `WEATHER: ${cleaned}`;
            setWeatherStr(formatted);
            if (typeof window !== "undefined") {
              sessionStorage.setItem("dispatch-weather-cache", formatted);
            }
          }
        }
      } catch (e) {
        console.warn("wttr format fetch failed", e);
      }
    }
    fetchWeather();
  }, []);

  return (
    <header ref={headerRef} suppressHydrationWarning className="w-full bg-[#F7F5F0] border-b-2 border-[#111111] font-mono text-xs text-[#111111]">
      {/* Global Breaking News Marquee Banner */}
      <div className="w-full bg-[#E63946] text-white py-1.5 px-4 overflow-hidden border-b border-[#111111] no-print">
        <div className="max-w-7xl mx-auto flex items-center gap-3">
          <span className="bg-[#111111] text-white px-2 py-0.5 font-bold text-[9px] uppercase tracking-widest shrink-0 animate-pulse">
            BREAKING NEWS
          </span>
          <div className="flex-1 overflow-hidden">
            <div className="flex items-center gap-8 whitespace-nowrap animate-marquee font-bold text-[11px] uppercase tracking-wider">
              {Array(4).fill("Developer Sahil continues to work behind the scenes. This portfolio is still under development — more updates coming soon.").map((text, idx) => (
                <span key={idx} className="flex items-center gap-4">
                  <span>{text}</span>
                  <span className="text-[#111111]">•</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Top Printed Metadata & Newsroom Telemetry Bar */}
      <div suppressHydrationWarning className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 border-b border-[#111111]/20 flex flex-wrap items-center justify-between gap-4 font-mono text-[11px] uppercase tracking-wider text-[#444444]">
        <div suppressHydrationWarning className="flex flex-wrap items-center gap-3">
          <span className="font-bold text-[#111111]">VOL. MMXXVI • NO. 01</span>
          <span>•</span>
          <span className="text-[#E63946] font-bold">NEWSROOM: AMRITSAR, INDIA</span>
          {weatherStr && (
            <>
              <span className="hidden md:inline">•</span>
              <span className="hidden md:inline text-[#555555]">{weatherStr}</span>
            </>
          )}
        </div>

        <div suppressHydrationWarning className="flex flex-wrap items-center gap-4">
          <span className="flex items-center gap-1.5 text-emerald-700 font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
            SYS: 99.9% UPTIME
          </span>
          <span>•</span>
          <span className="font-bold text-[#111111]">{mounted ? dateStr : "AUG 14, 2026"}</span>
          <span>•</span>
          <span className="font-bold text-[#E63946]">{mounted ? timeStr : "12:12 AM IST"}</span>
        </div>
      </div>

      {/* Permanently Embedded Newsroom Worldwide Radio Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 border-b border-[#111111]/20 no-print">
        <VintageRadioPlayer />
      </div>

      {/* Main Newspaper Banner Title */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center space-y-2">
        <Link href="/" className="inline-block group">
          <h1 className="font-serif-editorial font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-[#111111] uppercase leading-none group-hover:text-[#E63946] transition-colors">
            THE SAHILPREET DISPATCH
          </h1>
        </Link>
        <div className="font-serif-editorial italic text-sm sm:text-base text-[#444444] font-medium tracking-wide">
          "A Special Publication on Multi-Tenant Systems, Realtime Architecture & AI Infrastructure"
        </div>

        {/* 3D Animated Character resting cleanly on top of the horizontal divider line */}
        <div 
          className="absolute bottom-0 left-2 sm:left-6 md:left-10 pointer-events-auto cursor-pointer z-30 transform translate-y-0"
          onMouseEnter={() => {
            console.log("Hover ENTER. Tween active:", !!tweenRef.current);
            if (tweenRef.current) tweenRef.current.play();
          }}
          onMouseLeave={() => {
            console.log("Hover LEAVE. Tween active:", !!tweenRef.current);
            if (tweenRef.current) tweenRef.current.reverse();
          }}
        >
          <canvas
            ref={canvasRef}
            className="h-24 sm:h-28 md:h-32 lg:h-36 w-auto object-contain block"
          />
        </div>
      </div>

      {/* Double Border Divider Nav */}
      <div className="newspaper-double-border bg-[#F7F5F0] sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-4">
          {/* Desktop Nav Links (Single Horizontal Line) */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-6 font-mono text-[11px] xl:text-xs font-bold text-[#111111] whitespace-nowrap">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`h-9 flex items-center transition-colors relative group ${
                    isActive ? "text-[#E63946]" : "hover:text-[#E63946]"
                  }`}
                >
                  <span>{item.label}</span>
                  <span
                    className={`absolute bottom-0 left-0 h-0.5 bg-[#E63946] transition-all duration-200 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  ></span>
                </Link>
              );
            })}
          </nav>

          {/* Quick CTA Actions & Theme Switcher (Single Horizontal Line) */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Readership Ink Theme Switcher */}
            <div className="flex items-center h-9 px-1.5 bg-[#FFFFFF] border border-[#111111] font-mono text-[10px] font-bold shrink-0">
              <span className="px-1 text-[#555555] flex items-center gap-1">
                <Palette className="w-3 h-3 text-[#E63946]" />
                <span className="hidden sm:inline">INK:</span>
              </span>
              <button
                onClick={() => handleThemeChange("parchment")}
                className={`h-6 px-1.5 sm:px-2 flex items-center transition-colors ${
                  currentTheme === "parchment" ? "bg-[#111111] text-[#F7F5F0]" : "hover:text-[#E63946]"
                }`}
                title="Parchment Broadsheet Theme"
              >
                MORNING
              </button>
              <button
                onClick={() => handleThemeChange("midnight")}
                className={`h-6 px-1.5 sm:px-2 flex items-center transition-colors ${
                  currentTheme === "midnight" ? "bg-[#111111] text-[#F7F5F0]" : "hover:text-[#E63946]"
                }`}
                title="Midnight Dark Ink Theme"
              >
                MIDNIGHT
              </button>
              <button
                onClick={() => handleThemeChange("sepia")}
                className={`h-6 px-1.5 sm:px-2 flex items-center transition-colors ${
                  currentTheme === "sepia" ? "bg-[#111111] text-[#F7F5F0]" : "hover:text-[#E63946]"
                }`}
                title="Vintage Sepia Newsprint Theme"
              >
                SEPIA
              </button>
            </div>

            <button
              onClick={() => setRadioOpen(!radioOpen)}
              className={`h-9 px-3 border font-bold text-xs flex items-center gap-1.5 transition-colors shrink-0 ${
                radioOpen
                  ? "bg-[#E63946] text-white border-[#E63946]"
                  : "bg-[#FFFFFF] border-[#111111] text-[#111111] hover:bg-[#111111] hover:text-[#F7F5F0]"
              }`}
              title="Toggle Newsroom Worldwide AM Radio Tuner"
            >
              <Radio className={`w-3.5 h-3.5 ${radioOpen ? "animate-pulse" : "text-[#E63946]"}`} />
              <span className="hidden sm:inline">RADIO</span>
            </button>

            <Link
              href="/contact"
              className="h-9 px-3.5 bg-[#111111] text-[#F7F5F0] font-bold text-xs flex items-center gap-1.5 hover:bg-[#E63946] transition-colors shrink-0"
            >
              <span>SEND DISPATCH</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden h-9 px-2.5 border border-[#111111] text-[#111111] hover:bg-[#111111] hover:text-[#F7F5F0] transition-colors flex items-center justify-center shrink-0"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Worldwide Open Source Radio Player Drawer */}
      {radioOpen && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 border-b-2 border-[#111111] bg-[#F7F5F0] no-print">
          <VintageRadioPlayer />
        </div>
      )}

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="p-6 bg-[#FFFFFF] border-b-2 border-[#111111] space-y-3 font-mono text-xs lg:hidden">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block p-3 border border-[#111111] font-bold transition-all ${
                  isActive
                    ? "bg-[#111111] text-[#F7F5F0]"
                    : "text-[#111111] hover:bg-[#111111] hover:text-[#F7F5F0]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
