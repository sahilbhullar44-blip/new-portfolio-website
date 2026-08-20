"use client";

import React from "react";
import Link from "next/link";
import { ArrowDownRight, Sparkles } from "lucide-react";
import AudioDispatchReader from "@/app/components/AudioDispatchReader";
import { magazineMetaData } from "@/app/data/systemData";

export default function NewspaperFrontPageHero() {
  return (
    <section id="cover" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10 newspaper-grid">
      {/* Front Page Headline Section */}
      <div className="space-y-4 text-center border-b border-[#111111]/30 pb-8">
        <div className="headline-badge inline-flex items-center gap-2 px-3 py-1 font-mono text-xs font-bold uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5 text-[#E63946]" />
          <span>FRONT PAGE LEAD STORY // SPECIAL DISPATCH</span>
        </div>

        <h1 className="font-serif-editorial font-black text-3xl sm:text-6xl lg:text-7xl tracking-tight text-[#111111] uppercase leading-[1.15] sm:leading-[1.05]">
          ENGINEERING SCALABLE <br />
          <span className="italic sm:underline decoration-[#E63946] decoration-4 sm:underline-offset-8">MULTI-TENANT ARCHITECTURE</span> <br />
          & AI SPEECH PIPELINES
        </h1>

        <p className="font-serif-editorial italic text-lg sm:text-xl text-[#444444] max-w-3xl mx-auto">
          "Sahilpreet Singh on building high-concurrency MERN platforms, zero-latency WebSocket engines, and automated medical sentiment pipelines."
        </p>

        {/* Audio Dispatch Broadcast Reader */}
        <div className="pt-4 max-w-3xl mx-auto">
          <AudioDispatchReader
            textToRead="Engineering scalable multi-tenant architecture and AI speech pipelines. Sahilpreet Singh is a Software Systems Architect specializing in multi-tenant MERN stack platforms, high-frequency WebSockets, and AI speech-to-text ETL pipelines. Over the past several years, I have designed and delivered over eight production applications including Tickmark.io and Medfeed.ai."
            title="FRONT PAGE AUDIO BROADCAST"
          />
        </div>
      </div>

      {/* 3-Column Newspaper Spread Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 items-start">
        {/* Column 1: Editorial Letter */}
        <div className="md:col-span-1 lg:col-span-4 space-y-4 pr-0 md:pr-6 md:border-r border-[#111111]/20">
          <div className="font-mono text-xs font-bold text-[#E63946] uppercase tracking-wider border-b border-[#111111] pb-1">
            01 // ARCHITECT'S LETTER
          </div>

          {/* Desktop Version - Shown on sm: and above */}
          <div className="hidden sm:block space-y-4">
            <div className="font-sans text-sm text-[#222222] leading-relaxed space-y-4">
              <p className="drop-cap">
                Sahilpreet Singh is a Software Systems Architect specializing in multi-tenant MERN stack platforms, high-frequency WebSockets, and AI speech-to-text ETL pipelines. Building scalable web infrastructure designed to process high concurrency workloads with zero latency compromise.
              </p>

              <p>
                Over the past several years, I've designed and delivered over 8 production applications spanning multi-tenant SaaS suites, high-concurrency live streaming backplanes, and automated AI sentiment pipelines.
              </p>
            </div>

            <div className="p-4 bg-[#FFFFFF] border border-[#111111] font-serif-editorial italic text-xs text-[#111111] space-y-1">
              <p>"Software architecture is not merely writing code; it is designing resilient systems that remain elegant under peak concurrency."</p>
              <div className="font-mono text-[10px] text-[#E63946] not-italic font-bold tracking-wider pt-1">
                — SAHILPREET SINGH // DISPATCH AUTHOR
              </div>
            </div>
          </div>

          {/* Mobile Version - Hidden on sm: and above */}
          <div className="sm:hidden space-y-4">
            <div className="typewriter-card p-4 border border-dashed rounded-sm space-y-4">
              <p className="font-sans text-sm text-[#222222] leading-relaxed">
                <span className="monogram-dropcap flex items-center justify-center w-10 h-10 font-serif-editorial font-bold text-2xl float-left mr-3 mt-1 select-none border border-[#E63946]/30">
                  S
                </span>
                ahilpreet Singh is a Software Systems Architect specializing in multi-tenant MERN stack platforms, high-frequency WebSockets, and AI speech-to-text ETL pipelines. Building scalable web infrastructure designed to process high concurrency workloads with zero latency compromise.
              </p>

              <p className="font-sans text-sm text-[#222222] leading-relaxed">
                Over the past several years, I've designed and delivered over 8 production applications spanning multi-tenant SaaS suites, high-concurrency live streaming backplanes, and automated AI sentiment pipelines.
              </p>

              <div className="text-right pt-2 font-serif-editorial italic text-xs text-[#555555]">
                Sincerely, <br />
                <span className="text-[#E63946] font-bold tracking-wider not-italic font-mono text-[9px]">SAHILPREET SINGH</span>
              </div>
            </div>

            <div className="relative py-5 border-y-2 editorial-double-border my-6">
              <span className="font-serif text-6xl text-[#E63946]/20 absolute top-0 left-2 select-none leading-none">“</span>
              <p className="font-serif-editorial italic text-xs text-[#111111] leading-relaxed text-center px-6 relative z-10">
                "Software architecture is not merely writing code; it is designing resilient systems that remain elegant under peak concurrency."
              </p>
              <div className="font-mono text-[9px] text-[#E63946] not-italic font-bold tracking-wider pt-1.5 text-center">
                — SAHILPREET SINGH // DISPATCH AUTHOR
              </div>
            </div>
          </div>
        </div>

        {/* Column 2: Lead Front Page Story Card */}
        <div className="md:col-span-1 lg:col-span-5 space-y-6 px-0 lg:px-4">
          <div className="font-mono text-xs font-bold text-[#111111] uppercase tracking-wider border-b border-[#111111] pb-1 flex items-center justify-between">
            <span>02 // FRONT PAGE FEATURE</span>
            <span className="text-[#E63946]">ISSUE #01</span>
          </div>

          <div className="newspaper-card p-4 sm:p-6 space-y-4">
            <div className="space-y-2">
              <span className="px-2.5 py-1 bg-[#E63946] text-white font-mono text-[10px] font-bold uppercase tracking-wider">
                COVER CASE STUDY
              </span>
              <h3 className="font-serif-editorial font-bold text-3xl text-[#111111]">
                Tickmark.io & Medfeed.ai
              </h3>
              <p className="font-mono text-xs text-[#555555]">
                Enterprise Multi-Tenant SaaS & Medical Speech-To-Text AI
              </p>
            </div>

            <p className="font-sans text-sm text-[#333333] leading-relaxed">
              Engineered with isolated MongoDB schema architecture, granular role-based access control (RBAC), timezone-aware Agenda cron services, and automated OpenAI Whisper speech-to-text ETL pipelines processing over 10,000 records/hour.
            </p>

            <div className="flex flex-wrap gap-1.5 pt-2">
              {["React 19", "Next.js 16", "Node.js", "MongoDB", "Whisper AI", "Socket.io"].map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-0.5 font-mono text-[11px] bg-[#F7F5F0] border border-[#111111] text-[#111111] font-semibold"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="pt-4 border-t border-[#111111]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono text-xs">
              <Link
                href="/projects"
                className="w-full sm:w-auto px-4 py-2 bg-[#111111] text-white font-bold flex items-center justify-center gap-2 hover:bg-[#E63946] transition-colors"
              >
                <span>READ FEATURE DISPATCHES</span>
                <ArrowDownRight className="w-4 h-4" />
              </Link>
              <span className="text-[#555555] font-bold text-center sm:text-right">STATUS: PRODUCTION</span>
            </div>
          </div>
        </div>

        {/* Column 3: Telemetry Stats & Barcode Tag */}
        <div className="md:col-span-2 lg:col-span-3 space-y-6 pl-0 lg:pl-6 border-t md:border-t lg:border-t-0 lg:border-l border-[#111111]/20 pt-8 lg:pt-0">
          <div className="font-mono text-xs font-bold text-[#111111] uppercase tracking-wider border-b border-[#111111] pb-1">
            03 // SYSTEM TELEMETRY
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4 font-mono text-xs">
            <div className="p-4 bg-[#FFFFFF] border border-[#111111]">
              <div className="text-3xl font-black text-[#111111]">8+</div>
              <div className="text-[11px] text-[#555555] uppercase font-bold">PROD APPS BUILT</div>
            </div>

            <div className="p-4 bg-[#FFFFFF] border border-[#111111]">
              <div className="text-3xl font-black text-[#E63946]">&lt;25ms</div>
              <div className="text-[11px] text-[#555555] uppercase font-bold">WEBSOCKET LATENCY</div>
            </div>

            <div className="p-4 bg-[#FFFFFF] border border-[#111111]">
              <div className="text-3xl font-black text-emerald-700">100%</div>
              <div className="text-[11px] text-[#555555] uppercase font-bold">TEST PASS RATE</div>
            </div>
          </div>

          <div className="p-4 bg-[#FFFFFF] border border-[#111111] space-y-2 text-center font-mono max-w-sm mx-auto lg:max-w-none">
            <div className="text-[10px] text-[#555555] uppercase font-bold">ISSN #2026-SAHILPREET</div>
            <div className="barcode-strip h-10 bg-repeat-x bg-[length:8px_100%] opacity-80"></div>
            <div className="text-[9px] text-[#555555] tracking-widest">PUBLISHED BY SAHILPREET DISPATCH</div>
          </div>
        </div>
      </div>
    </section>
  );
}
