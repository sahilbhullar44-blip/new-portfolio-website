"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, BookOpen, Layers, User, Mail, Sparkles, Zap, ShieldCheck } from "lucide-react";

import NewspaperHeader from "@/app/components/NewspaperHeader";
import NewspaperFrontPageHero from "@/app/components/NewspaperFrontPageHero";
import VintageRadioPlayer from "@/app/components/VintageRadioPlayer";

import NewspaperArticlesSpread from "@/app/components/NewspaperArticlesSpread";
import NewspaperSkillsIndex from "@/app/components/NewspaperSkillsIndex";
import MagazineAboutStory from "@/app/components/MagazineAboutStory";
import NewspaperBackCoverContact from "@/app/components/NewspaperBackCoverContact";
import NewsroomCrosswordPuzzle from "@/app/components/NewsroomCrosswordPuzzle";

export default function NewspaperHomePage() {
  const editionSections = [
    {
      number: "SECTION 02",
      tag: "FEATURE DISPATCHES",
      title: "Enterprise Multi-Tenant SaaS & Medical AI Speech ETL",
      desc: "In-depth case studies on Tickmark.io, Medfeed.ai, Amritsar.com, Sofa Studio, and real-time ordering engines built with MERN stack & OpenAI Whisper.",
      icon: BookOpen,
      href: "/projects",
      cta: "EXPLORE ALL DISPATCHES Archive",
    },
    {
      number: "SECTION 03",
      tag: "CLASSIFIEDS INDEX",
      title: "Index of Technical Capabilities & Frameworks",
      desc: "Full taxonomy of engineering expertise across Frontend Architecture, Backend & Realtime WebSockets, MongoDB Aggregations, and AI Integrations.",
      icon: Layers,
      href: "/skills",
      cta: "VIEW CLASSIFIEDS INDEX",
    },
    {
      number: "SECTION 04",
      tag: "EDITORIAL PROFILE",
      title: "The Architect's Story & System Design Philosophy",
      desc: "An editorial exploration of Sahilpreet Singh's approach to designing resilient, multi-tenant software systems engineered for high concurrency.",
      icon: User,
      href: "/about",
      cta: "READ ARCHITECT STORY",
    },
    {
      number: "SECTION 05",
      tag: "CORRESPONDENCE",
      title: "Direct Dispatch Transmission & Social Links",
      desc: "Initiate direct correspondence for full-time software engineering roles, multi-tenant architecture consulting, and custom AI pipeline implementations.",
      icon: Mail,
      href: "/contact",
      cta: "SEND DIRECT CORRESPONDENCE",
    },
  ];

  const wireDispatches = [
    "TICKMARK.IO // MULTI-TENANT SAAS SUITE PRODUCTION LIVE",
    "MEDFEED.AI // 10K+ SPEECH RECORDS/HR STT PIPELINE OPERATIONAL",
    "AMRITSAR.COM // REALTIME SOCKET LATENCY MAINTAINED UNDER 25MS",
    "STACK // REACT 19 • NEXT.JS 16 • MONGODB AGGREGATIONS • SOCKET.IO",
  ];

  return (
    <main className="min-h-screen bg-[#F7F5F0] text-[#111111] selection:bg-[#111111] selection:text-[#F7F5F0] overflow-x-hidden relative font-sans space-y-16">
      {/* Front Page Lead Story & Broadsheet Hero */}
      <NewspaperFrontPageHero />

      {/* Newsroom Vintage AM Radio Player */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <VintageRadioPlayer />
      </div>

      {/* Breaking Wire Dispatch Ticker Bar */}
      <section className="newspaper-double-border bg-[#FFFFFF] py-3.5 px-4 overflow-hidden font-mono text-xs text-[#111111]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center gap-4">
          <div className="flex items-center gap-2 bg-[#E63946] text-white px-2.5 py-1 font-bold text-[10px] uppercase tracking-wider shrink-0">
            <Zap className="w-3 h-3 animate-pulse" />
            <span>WIRE TICKER</span>
          </div>

          <div className="flex-1 overflow-hidden">
            <div className="flex items-center gap-8 whitespace-nowrap animate-marquee font-bold text-[11px] text-[#333333]">
              {wireDispatches.concat(wireDispatches).map((item, idx) => (
                <span key={idx} className="flex items-center gap-3">
                  <span>{item}</span>
                  <span className="text-[#E63946]">•</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Today's Edition Index Grid (Unique Front-Page Navigation Hub) */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
        <div className="space-y-3 border-b-2 border-[#111111] pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 font-mono text-xs font-bold text-[#E63946] tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>TODAY'S PUBLICATION INDEX // MMXXVI EDITION</span>
            </div>
            <h2 className="font-serif-editorial font-bold text-4xl sm:text-5xl text-[#111111] tracking-tight uppercase">
              EXPLORE TODAY'S <span className="italic underline decoration-[#E63946]">DISPATCH SECTIONS</span>
            </h2>
          </div>
          <span className="font-mono text-xs text-[#555555] font-bold">5 SPECIAL SECTIONS AVAILABLE</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {editionSections.map((sec, idx) => {
            const Icon = sec.icon;
            return (
              <div
                key={idx}
                className="newspaper-card p-6 sm:p-8 space-y-6 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-[#111111]/20 pb-3 font-mono text-xs">
                    <span className="text-[#E63946] font-bold tracking-wider">{sec.number}</span>
                    <span className="px-2 py-0.5 bg-[#F7F5F0] border border-[#111111] font-bold text-[#111111]">
                      {sec.tag}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-[#F7F5F0] border border-[#111111] text-[#111111] group-hover:bg-[#E63946] group-hover:text-white transition-colors">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="font-serif-editorial font-bold text-2xl text-[#111111] group-hover:text-[#E63946] transition-colors">
                        {sec.title}
                      </h3>
                    </div>

                    <p className="font-sans text-sm text-[#444444] leading-relaxed pl-11">
                      {sec.desc}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#111111]/20">
                  <Link
                    href={sec.href}
                    className="w-full py-3 px-4 bg-[#111111] text-[#F7F5F0] font-mono text-xs font-bold flex items-center justify-between hover:bg-[#E63946] transition-colors"
                  >
                    <span>{sec.cta}</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Section 05: Sunday Editorial Dev Crossword & Puzzle */}
      <NewsroomCrosswordPuzzle />



      {/* Print-Only Complete Broadsheet Paper Sections (Included when printing PDF) */}
      <div className="hidden print:block space-y-12">
        <NewspaperArticlesSpread />
        <NewspaperSkillsIndex />
        <MagazineAboutStory />
        <NewspaperBackCoverContact />
      </div>

      {/* Front Page Compact Back Footer (Screen Only) */}
      <footer className="bg-[#111111] text-[#F7F5F0] py-12 px-4 sm:px-6 lg:px-8 border-t-2 border-[#111111] font-mono text-xs no-print">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="font-serif-editorial font-bold text-2xl text-white">THE SAHILPREET DISPATCH</h3>
            <p className="text-slate-400 text-xs font-sans">
              Printed & Digital Publication © {new Date().getFullYear()} Sahilpreet Singh. Built with Next.js 16 & React 19.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/contact"
              className="px-5 py-3 bg-[#E63946] text-white font-bold flex items-center gap-2 hover:bg-white hover:text-[#111111] transition-colors"
            >
              <span>SEND CORRESPONDENCE</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
