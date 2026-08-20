"use client";

import React from "react";
import { Terminal, Cpu, ShieldCheck, Zap, ArrowDownRight, Sparkles, Activity } from "lucide-react";

export default function CyberHero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 flex flex-col justify-between cyber-grid border-b border-[#06B6D4]/20 overflow-hidden font-mono"
    >
      {/* Top Protocol Status Banner */}
      <div className="max-w-7xl mx-auto w-full flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10 text-xs text-slate-400">
        <div className="flex items-center gap-4">
          <span className="px-2.5 py-1 bg-[#06B6D4]/10 border border-[#06B6D4]/40 text-[#06B6D4] font-bold">
            [ PROTOCOL: V20.26 ]
          </span>
          <span className="hidden sm:inline text-white/20">|</span>
          <span className="hidden sm:inline">HIGH-FREQUENCY SYSTEMS & AI PIPELINE CORE</span>
        </div>

        <div className="flex items-center gap-2 text-[#22C55E] font-bold">
          <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-ping"></span>
          <span>AVAILABLE FOR HIRE & ARCHITECTURE CONTRACTS</span>
        </div>
      </div>

      {/* Main Cyber HUD Hero Grid */}
      <div className="max-w-7xl mx-auto w-full my-auto py-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        {/* Left Column: Cyber Monogram & Headline */}
        <div className="lg:col-span-7 space-y-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 text-xs text-[#06B6D4] font-bold">
              <Sparkles className="w-3.5 h-3.5 text-[#22C55E]" />
              <span>CYBERNETIC SYSTEMS DISPATCH // 2026</span>
            </div>

            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-black text-white tracking-tight uppercase leading-[1.08]">
              CODE AS <span className="text-[#06B6D4] text-cyan-glow">MATRIX</span>, <br />
              ARCHITECTURE AS <span className="text-[#22C55E]">SCIENCE</span>
            </h1>
          </div>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl font-sans">
            Sahilpreet Singh is a Software Systems Architect specializing in multi-tenant MERN stack platforms, high-frequency WebSockets, and AI speech-to-text ETL pipelines. Building scalable web infrastructure designed to process high concurrency workloads with zero latency compromise.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-4 text-xs">
            <a
              href="#projects"
              className="px-6 py-3.5 rounded-md bg-[#06B6D4] text-black font-bold flex items-center gap-2 shadow-[0_0_25px_rgba(6,182,212,0.4)] hover:bg-[#22C55E] transition-all hover:scale-105"
            >
              <span>DECRYPT PROJECT MATRIX</span>
              <ArrowDownRight className="w-4 h-4" />
            </a>

            <a
              href="#terminal"
              className="px-6 py-3.5 rounded-md bg-white/5 border border-white/10 hover:border-[#06B6D4]/50 text-white font-bold flex items-center gap-2 hover:bg-white/10 transition-all"
            >
              <Terminal className="w-4 h-4 text-[#06B6D4]" />
              <span>LAUNCH CLI TERMINAL</span>
            </a>
          </div>
        </div>

        {/* Right Column: Cyber Telemetry HUD Display Card */}
        <div className="lg:col-span-5">
          <div className="cyber-card cyber-hud-corner rounded-xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-[#06B6D4] animate-pulse" />
                <span className="text-xs font-bold text-white tracking-widest uppercase">
                  SYSTEM TELEMETRY HUD
                </span>
              </div>
              <span className="text-[11px] text-[#22C55E] font-bold">ONLINE</span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between p-3 bg-white/5 border border-white/5 rounded-md">
                <span className="text-slate-400">Node Environment</span>
                <span className="text-white font-bold">Next.js 16 / React 19</span>
              </div>

              <div className="flex justify-between p-3 bg-white/5 border border-white/5 rounded-md">
                <span className="text-slate-400">WebSocket Delay</span>
                <span className="text-[#06B6D4] font-bold">&lt; 15ms</span>
              </div>

              <div className="flex justify-between p-3 bg-white/5 border border-white/5 rounded-md">
                <span className="text-slate-400">Multi-Tenant Isolation</span>
                <span className="text-[#22C55E] font-bold">MongoDB Granular RBAC</span>
              </div>

              <div className="flex justify-between p-3 bg-white/5 border border-white/5 rounded-md">
                <span className="text-slate-400">AI STT Throughput</span>
                <span className="text-[#A855F7] font-bold">10,000+ Recs/Hr</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/10 text-center">
              <div className="p-3 bg-white/5 border border-white/5 rounded-md">
                <div className="text-xl font-bold text-[#06B6D4]">8+</div>
                <div className="text-[10px] text-slate-400">PROD APPS</div>
              </div>
              <div className="p-3 bg-white/5 border border-white/5 rounded-md">
                <div className="text-xl font-bold text-[#22C55E]">100%</div>
                <div className="text-[10px] text-slate-400">TEST PASS</div>
              </div>
              <div className="p-3 bg-white/5 border border-white/5 rounded-md">
                <div className="text-xl font-bold text-[#A855F7]">100%</div>
                <div className="text-[10px] text-slate-400">VERIFIED</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Ticker Line */}
      <div className="max-w-7xl mx-auto w-full pt-6 border-t border-white/10 text-xs text-slate-400 flex items-center justify-between">
        <div className="flex items-center gap-6 overflow-hidden">
          <span className="text-[#06B6D4] font-bold shrink-0">[ CORE ENGINE ]</span>
          <div className="flex items-center gap-6 text-slate-300 overflow-x-auto whitespace-nowrap hide-scrollbar">
            <span>FULLSTACK MERN</span>
            <span>•</span>
            <span>REALTIME SOCKET.IO</span>
            <span>•</span>
            <span>OPENAI WHISPER STT</span>
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
