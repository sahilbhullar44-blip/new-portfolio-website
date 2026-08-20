"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowDownRight, Code2, Shield, Zap, Cpu } from "lucide-react";
import { magazineMetaData } from "@/app/data/systemData";

export default function MagazineHero() {
  return (
    <section
      id="cover"
      className="relative min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 flex flex-col justify-between magazine-grid border-b border-white/10 overflow-hidden"
    >
      {/* Top Issue Banner */}
      <div className="max-w-7xl mx-auto w-full flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10 font-mono text-xs text-slate-400">
        <div className="flex items-center gap-4">
          <span className="px-2.5 py-1 rounded bg-[#E2B96B] text-black font-bold tracking-wider">
            {magazineMetaData.issueNumber}
          </span>
          <span className="text-[#E2B96B] font-semibold">{magazineMetaData.volume}</span>
          <span className="hidden sm:inline text-white/20">|</span>
          <span className="hidden sm:inline">DEVELOPER EDITORIAL & CASE STUDIES</span>
        </div>
        <div className="flex items-center gap-2 text-emerald-400 font-semibold">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          <span>AVAILABLE FOR CONTRACTS & ROLES</span>
        </div>
      </div>

      {/* Main Cover Grid */}
      <div className="max-w-7xl mx-auto w-full my-auto py-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        {/* Left Column: Editorial Headline */}
        <div className="lg:col-span-7 space-y-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#E2B96B]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AWWWARDS EDITORIAL DISPATCH // 2026</span>
            </div>

            <h1 className="font-serif-editorial font-bold text-4xl sm:text-6xl xl:text-7xl tracking-tight text-white leading-[1.05]">
              CODE AS ART, <br />
              <span className="text-gold-gradient italic">ARCHITECTURE</span> <br />
              AS SCIENCE.
            </h1>
          </div>

          <div className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl drop-cap font-sans">
            Sahilpreet Singh is a Software Systems Architect specializing in multi-tenant MERN stack platforms, high-frequency WebSockets, and AI speech-to-text ETL pipelines. Building scalable web infrastructure designed to process high concurrency workloads with zero latency compromise.
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-4 font-mono text-xs">
            <a
              href="#projects"
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#E2B96B] to-[#C8993B] text-black font-bold flex items-center gap-2 shadow-xl shadow-[#E2B96B]/20 hover:scale-105 transition-all"
            >
              <span>EXPLORE CASE STUDIES</span>
              <ArrowDownRight className="w-4 h-4" />
            </a>

            <a
              href="#terminal"
              className="px-6 py-3.5 rounded-xl bg-white/5 border border-white/10 hover:border-[#E2B96B]/50 text-white font-semibold flex items-center gap-2 hover:bg-white/10 transition-all"
            >
              <Code2 className="w-4 h-4 text-[#E2B96B]" />
              <span>LAUNCH CLI LAB</span>
            </a>
          </div>
        </div>

        {/* Right Column: Magazine Cover Spotlight Card */}
        <div className="lg:col-span-5">
          <div className="magazine-card rounded-2xl p-6 sm:p-8 space-y-6 border-white/15">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#E2B96B]"></div>
                <span className="font-mono text-xs font-bold text-white tracking-widest">
                  FLAGSHIP DISPATCH
                </span>
              </div>
              <span className="font-mono text-[11px] text-[#E2B96B]">ISSUE #01</span>
            </div>

            <div className="space-y-4">
              <h3 className="font-serif-editorial text-2xl font-bold text-white">
                Tickmark.io & Medfeed.ai
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-sans">
                Engineered enterprise multi-tenant RBAC systems and AI-powered medical voice sentiment pipelines processing over 10,000 records/hour.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              {["React 19", "Next.js 16", "Node.js", "MongoDB", "Whisper AI", "Socket.io"].map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-white/5 border border-white/10 text-slate-300"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/10 font-mono text-center">
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                <div className="text-lg font-bold text-[#E2B96B]">8+</div>
                <div className="text-[10px] text-slate-400">PROD APPS</div>
              </div>
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                <div className="text-lg font-bold text-cyan-400">&lt;25ms</div>
                <div className="text-[10px] text-slate-400">LATENCY</div>
              </div>
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                <div className="text-lg font-bold text-emerald-400">100%</div>
                <div className="text-[10px] text-slate-400">TEST PASS</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Editorial Ticker */}
      <div className="max-w-7xl mx-auto w-full pt-6 border-t border-white/10 font-mono text-xs text-slate-400 flex items-center justify-between">
        <div className="flex items-center gap-6 overflow-hidden">
          <span className="text-[#E2B96B] font-bold shrink-0">CORE ENGINE //</span>
          <div className="flex items-center gap-6 text-slate-300 overflow-x-auto whitespace-nowrap hide-scrollbar">
            <span>FULLSTACK MERN</span>
            <span>•</span>
            <span>REALTIME SOCKET.IO</span>
            <span>•</span>
            <span>AI WHISPER & NLP ETL</span>
            <span>•</span>
            <span>MULTI-TENANT RBAC</span>
            <span>•</span>
            <span>AGENDA CRON WORKERS</span>
          </div>
        </div>
      </div>
    </section>
  );
}
