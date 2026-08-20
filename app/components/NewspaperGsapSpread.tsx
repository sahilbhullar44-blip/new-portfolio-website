"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Quote,
  ExternalLink,
  BookOpen,
  X,
  Server,
  Cpu,
  Smartphone,
  Terminal,
  Zap,
} from "lucide-react";
import { magazineProjects, magazineSkills, ProjectItem } from "@/app/data/systemData";

gsap.registerPlugin(ScrollTrigger);

export default function NewspaperGsapSpread() {
  const targetRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeModal, setActiveModal] = useState<ProjectItem | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const container = containerRef.current;
      if (!container) return;

      const totalPanels = container.children.length;

      // GSAP Horizontal Scroll Pinning for Newspaper Spreads
      gsap.to(container, {
        xPercent: -100 * (totalPanels - 1),
        ease: "none",
        scrollTrigger: {
          trigger: targetRef.current,
          pin: true,
          scrub: 0.8,
          snap: 1 / (totalPanels - 1),
          end: () => "+=" + container.offsetWidth,
        },
      });
    }, targetRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* Pinned Horizontal Scroll Container */}
      <section ref={targetRef} className="relative h-screen bg-[#F7F5F0] overflow-hidden gpu border-b-2 border-[#111111]">
        {/* Top Sticky Ribbon */}
        <div className="absolute top-0 left-0 right-0 z-30 px-6 py-3 bg-[#F7F5F0] border-b border-[#111111] flex items-center justify-between font-mono text-xs text-[#111111]">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#E63946] animate-ping"></span>
            <span className="text-[#E63946] font-bold tracking-widest">GSAP HORIZONTAL NEWSPAPER SPREAD</span>
            <span className="hidden sm:inline text-[#111111]/30">|</span>
            <span className="hidden sm:inline text-[#555555]">SCROLL DOWN TO FLIP PAGES HORIZONTALLY</span>
          </div>
          <div className="flex items-center gap-2 font-mono text-[11px] font-bold">
            <span>VOL. MMXXVI</span>
            <span>•</span>
            <span className="text-[#E63946]">PAGE 01 TO 05</span>
          </div>
        </div>

        {/* Horizontal Sliding Track */}
        <div
          ref={containerRef}
          className="flex h-full w-[500vw] text-[#111111] pt-12"
        >
          {/* ================= SPREAD 01: FRONT PAGE LEAD STORY ================= */}
          <div className="w-[100vw] h-full flex-shrink-0 p-8 sm:p-12 lg:p-16 flex flex-col justify-between newspaper-grid border-r-2 border-[#111111] relative">
            <div className="max-w-6xl mx-auto w-full my-auto space-y-8">
              <div className="flex items-center gap-3 font-mono text-xs text-[#E63946] font-bold tracking-widest uppercase">
                <Sparkles className="w-4 h-4 text-[#E63946]" />
                <span>PAGE 01 // FRONT PAGE DISPATCH</span>
              </div>

              <div className="space-y-4">
                <h1 className="font-serif-editorial font-black text-5xl sm:text-7xl lg:text-8xl tracking-tight text-[#111111] uppercase leading-none">
                  SAHILPREET <br />
                  <span className="italic underline decoration-[#E63946] decoration-4 underline-offset-8">SINGH</span>
                </h1>
                <p className="font-mono text-sm sm:text-base text-[#E63946] tracking-wider font-bold">
                  FULL-STACK MERN ARCHITECT // AI SYSTEMS ENGINEER
                </p>
              </div>

              <p className="text-[#222222] text-base sm:text-lg max-w-3xl leading-relaxed drop-cap font-sans">
                Engineering high-concurrency multi-tenant platforms, low-latency WebSocket engines, and AI speech-to-text ETL pipelines. Building deterministic code architectures that turn heavy computational workflows into seamless user experiences.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 font-mono text-xs">
                <div className="p-4 bg-[#FFFFFF] border border-[#111111]">
                  <div className="text-2xl font-black text-[#111111]">8+</div>
                  <div className="text-[11px] text-[#555555] font-bold">PROD APPS</div>
                </div>
                <div className="p-4 bg-[#FFFFFF] border border-[#111111]">
                  <div className="text-2xl font-black text-[#E63946]">&lt;25ms</div>
                  <div className="text-[11px] text-[#555555] font-bold">SOCKET DELAY</div>
                </div>
                <div className="p-4 bg-[#FFFFFF] border border-[#111111]">
                  <div className="text-2xl font-black text-emerald-700">10k+</div>
                  <div className="text-[11px] text-[#555555] font-bold">RECORDS/HR AI</div>
                </div>
                <div className="p-4 bg-[#FFFFFF] border border-[#111111]">
                  <div className="text-2xl font-black text-[#C69214]">100%</div>
                  <div className="text-[11px] text-[#555555] font-bold">TEST PASS</div>
                </div>
              </div>
            </div>

            <div className="max-w-6xl mx-auto w-full flex items-center justify-between font-mono text-xs text-[#555555] font-bold">
              <span>SCROLL DOWN TO FLIP PAGE →</span>
              <span className="text-[#E63946]">PAGE 01 / 05</span>
            </div>
          </div>

          {/* ================= SPREAD 02: FEATURE 01 (TICKMARK.IO) ================= */}
          <div className="w-[100vw] h-full flex-shrink-0 p-8 sm:p-12 lg:p-16 flex flex-col justify-between newspaper-grid border-r-2 border-[#111111] relative">
            <div className="max-w-6xl mx-auto w-full my-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-6">
                <div className="flex items-center gap-3 font-mono text-xs text-[#E63946] font-bold tracking-widest uppercase">
                  <span>PAGE 02 // COVER FEATURE STORY 01</span>
                </div>

                <div className="space-y-2">
                  <h2 className="font-serif-editorial font-bold text-4xl sm:text-6xl text-[#111111]">
                    Tickmark.io
                  </h2>
                  <p className="font-mono text-xs sm:text-sm text-[#555555] font-bold">
                    Enterprise Multi-Tenant SaaS & Operations Suite
                  </p>
                </div>

                <p className="text-[#222222] text-sm sm:text-base leading-relaxed font-sans">
                  Engineered with isolated MongoDB schema architecture, granular role-based access control (RBAC), and timezone-aware Agenda cron services for automated scheduling.
                </p>

                <div className="p-4 bg-[#FFFFFF] border-l-4 border-[#E63946] italic font-serif-editorial text-sm text-[#111111]">
                  "Designing multi-tenant architecture demands ruthless query optimization and rock-solid permission guardrails."
                </div>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {["React", "Node.js", "MongoDB", "Express", "Socket.io", "TypeScript", "RBAC", "Agenda Cron"].map((t) => (
                    <span key={t} className="px-3 py-1 font-mono text-xs bg-[#FFFFFF] border border-[#111111] font-bold text-[#111111]">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-5 space-y-4">
                <div className="newspaper-card p-6 sm:p-8 space-y-6">
                  <div className="flex items-center justify-between font-mono text-xs border-b border-[#111111]/20 pb-4">
                    <span className="text-[#E63946] font-bold">SYSTEM METRICS</span>
                    <span className="text-emerald-700 font-bold">PRODUCTION LIVE</span>
                  </div>

                  <div className="space-y-3 font-mono text-xs">
                    <div className="flex justify-between p-3 bg-[#F7F5F0] border border-[#111111]">
                      <span className="text-[#555555]">Verified Test Pass Rate</span>
                      <span className="text-[#111111] font-bold">100%</span>
                    </div>
                    <div className="flex justify-between p-3 bg-[#F7F5F0] border border-[#111111]">
                      <span className="text-[#555555]">Task Sync Delay</span>
                      <span className="text-[#E63946] font-bold">&lt; 15ms</span>
                    </div>
                    <div className="flex justify-between p-3 bg-[#F7F5F0] border border-[#111111]">
                      <span className="text-[#555555]">RBAC Roles</span>
                      <span className="text-emerald-700 font-bold">Dynamic Granular</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveModal(magazineProjects[0])}
                    className="w-full py-3.5 bg-[#111111] text-[#F7F5F0] font-mono text-xs font-bold flex items-center justify-center gap-2 hover:bg-[#E63946] transition-colors"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>OPEN FULL CASE STUDY</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="max-w-6xl mx-auto w-full flex items-center justify-between font-mono text-xs text-[#555555] font-bold">
              <span>FEATURE 01 // TICKMARK.IO</span>
              <span className="text-[#E63946]">PAGE 02 / 05</span>
            </div>
          </div>

          {/* ================= SPREAD 03: FEATURE 02 (MEDFEED.AI) ================= */}
          <div className="w-[100vw] h-full flex-shrink-0 p-8 sm:p-12 lg:p-16 flex flex-col justify-between newspaper-grid border-r-2 border-[#111111] relative">
            <div className="max-w-6xl mx-auto w-full my-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-6">
                <div className="flex items-center gap-3 font-mono text-xs text-[#E63946] font-bold tracking-widest uppercase">
                  <span>PAGE 03 // AI DISPATCH FEATURE 02</span>
                </div>

                <div className="space-y-2">
                  <h2 className="font-serif-editorial font-bold text-4xl sm:text-6xl text-[#111111]">
                    Medfeed.ai
                  </h2>
                  <p className="font-mono text-xs sm:text-sm text-[#555555] font-bold">
                    AI-Powered Medical ETL & Patient Sentiment Pipeline
                  </p>
                </div>

                <p className="text-[#222222] text-sm sm:text-base leading-relaxed font-sans">
                  Converts raw patient voice recordings into structured clinical insights using OpenAI Whisper speech-to-text and ChatGPT sentiment function-calling schemas.
                </p>

                <div className="p-4 bg-[#FFFFFF] border-l-4 border-[#E63946] italic font-serif-editorial text-sm text-[#111111]">
                  "AI in healthcare isn't just text generation—it's deterministic signal extraction from ambient human speech."
                </div>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {["Python", "ChatGPT API", "Whisper", "FastAPI", "MongoDB", "Node.js"].map((t) => (
                    <span key={t} className="px-3 py-1 font-mono text-xs bg-[#FFFFFF] border border-[#111111] font-bold text-[#111111]">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-5 space-y-4">
                <div className="newspaper-card p-6 sm:p-8 space-y-6">
                  <div className="flex items-center justify-between font-mono text-xs border-b border-[#111111]/20 pb-4">
                    <span className="text-[#E63946] font-bold">AI ETL PERFORMANCE</span>
                    <span className="text-emerald-700 font-bold">ACTIVE PIPELINE</span>
                  </div>

                  <div className="space-y-3 font-mono text-xs">
                    <div className="flex justify-between p-3 bg-[#F7F5F0] border border-[#111111]">
                      <span className="text-[#555555]">STT Audio Accuracy</span>
                      <span className="text-[#111111] font-bold">96.4%</span>
                    </div>
                    <div className="flex justify-between p-3 bg-[#F7F5F0] border border-[#111111]">
                      <span className="text-[#555555]">Processing Speed</span>
                      <span className="text-[#E63946] font-bold">4x Realtime</span>
                    </div>
                    <div className="flex justify-between p-3 bg-[#F7F5F0] border border-[#111111]">
                      <span className="text-[#555555]">Structured Output</span>
                      <span className="text-emerald-700 font-bold">100% Validated</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveModal(magazineProjects[1])}
                    className="w-full py-3.5 bg-[#111111] text-[#F7F5F0] font-mono text-xs font-bold flex items-center justify-center gap-2 hover:bg-[#E63946] transition-colors"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>OPEN FULL CASE STUDY</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="max-w-6xl mx-auto w-full flex items-center justify-between font-mono text-xs text-[#555555] font-bold">
              <span>FEATURE 02 // MEDFEED.AI</span>
              <span className="text-[#E63946]">PAGE 03 / 05</span>
            </div>
          </div>

          {/* ================= SPREAD 04: FEATURE 03 (AMRITSAR.COM) ================= */}
          <div className="w-[100vw] h-full flex-shrink-0 p-8 sm:p-12 lg:p-16 flex flex-col justify-between newspaper-grid border-r-2 border-[#111111] relative">
            <div className="max-w-6xl mx-auto w-full my-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-6">
                <div className="flex items-center gap-3 font-mono text-xs text-[#E63946] font-bold tracking-widest uppercase">
                  <span>PAGE 04 // REALTIME BROADCAST FEATURE 03</span>
                </div>

                <div className="space-y-2">
                  <h2 className="font-serif-editorial font-bold text-4xl sm:text-6xl text-[#111111]">
                    Amritsar.com
                  </h2>
                  <p className="font-mono text-xs sm:text-sm text-[#555555] font-bold">
                    High-Traffic Live Streaming & Content Moderation Hub
                  </p>
                </div>

                <p className="text-[#222222] text-sm sm:text-base leading-relaxed font-sans">
                  Built to support thousands of concurrent live streaming viewers with cluster-mode Express socket servers, Redis Pub/Sub, and YouTube API sync.
                </p>

                <div className="p-4 bg-[#FFFFFF] border-l-4 border-[#E63946] italic font-serif-editorial text-sm text-[#111111]">
                  "High-concurrency chat systems require minimal memory overhead per socket connection."
                </div>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {["Next.js", "Express", "TypeScript", "Socket.io", "Redis", "YouTube API"].map((t) => (
                    <span key={t} className="px-3 py-1 font-mono text-xs bg-[#FFFFFF] border border-[#111111] font-bold text-[#111111]">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-5 space-y-4">
                <div className="newspaper-card p-6 sm:p-8 space-y-6">
                  <div className="flex items-center justify-between font-mono text-xs border-b border-[#111111]/20 pb-4">
                    <span className="text-[#E63946] font-bold">BROADCAST CONCURRENCY</span>
                    <span className="text-emerald-700 font-bold">PRODUCTION LIVE</span>
                  </div>

                  <div className="space-y-3 font-mono text-xs">
                    <div className="flex justify-between p-3 bg-[#F7F5F0] border border-[#111111]">
                      <span className="text-[#555555]">Concurrent Viewers</span>
                      <span className="text-[#111111] font-bold">10,000+</span>
                    </div>
                    <div className="flex justify-between p-3 bg-[#F7F5F0] border border-[#111111]">
                      <span className="text-[#555555]">Broadcast Delay</span>
                      <span className="text-[#E63946] font-bold">&lt; 20ms</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveModal(magazineProjects[2])}
                    className="w-full py-3.5 bg-[#111111] text-[#F7F5F0] font-mono text-xs font-bold flex items-center justify-center gap-2 hover:bg-[#E63946] transition-colors"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>OPEN FULL CASE STUDY</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="max-w-6xl mx-auto w-full flex items-center justify-between font-mono text-xs text-[#555555] font-bold">
              <span>FEATURE 03 // AMRITSAR.COM</span>
              <span className="text-[#E63946]">PAGE 04 / 05</span>
            </div>
          </div>

          {/* ================= SPREAD 05: CLASSIFIEDS SKILLS INDEX ================= */}
          <div className="w-[100vw] h-full flex-shrink-0 p-8 sm:p-12 lg:p-16 flex flex-col justify-between newspaper-grid relative">
            <div className="max-w-6xl mx-auto w-full my-auto space-y-8">
              <div className="flex items-center gap-3 font-mono text-xs text-[#E63946] font-bold tracking-widest uppercase">
                <span>PAGE 05 // CLASSIFIEDS TECHNICAL INDEX</span>
              </div>

              <div className="space-y-2">
                <h2 className="font-serif-editorial font-bold text-4xl sm:text-6xl text-[#111111]">
                  CLASSIFIEDS <span className="italic underline decoration-[#E63946]">INDEX</span>
                </h2>
                <p className="font-mono text-xs sm:text-sm text-[#555555] font-bold">
                  Comprehensive architectural domains & technical stack
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {magazineSkills.map((domain, idx) => (
                  <div key={idx} className="newspaper-card p-5 space-y-3">
                    <div className="font-mono text-xs text-[#E63946] font-bold">{domain.domain}</div>
                    <div className="flex flex-wrap gap-1.5 font-mono text-xs">
                      {domain.skills.map((s) => (
                        <span key={s.name} className="px-2.5 py-1 bg-[#F7F5F0] border border-[#111111] font-bold text-[#111111]">
                          {s.name}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="max-w-6xl mx-auto w-full flex items-center justify-between font-mono text-xs text-[#555555] font-bold">
              <span>END OF HORIZONTAL SPREAD // SCROLL DOWN FOR LAB & CONTACT</span>
              <span className="text-[#E63946]">PAGE 05 / 05</span>
            </div>
          </div>
        </div>
      </section>

      {/* Reader Modal */}
      <AnimatePresence>
        {activeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/70 p-6 flex items-center justify-center overflow-y-auto"
          >
            <div className="bg-[#FFFFFF] border-2 border-[#111111] max-w-3xl w-full p-8 space-y-6 relative shadow-[10px_10px_0px_#111111]">
              <button
                onClick={() => setActiveModal(null)}
                className="absolute top-6 right-6 p-2 bg-[#111111] text-white hover:bg-[#E63946]"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-2 border-b-2 border-[#111111] pb-4">
                <span className="font-mono text-xs text-[#E63946] font-bold">{activeModal.issueTag}</span>
                <h3 className="font-serif-editorial text-3xl font-bold text-[#111111]">{activeModal.name}</h3>
                <p className="font-mono text-xs text-[#555555] font-bold">{activeModal.tagline}</p>
              </div>

              <div className="space-y-4 text-[#222222] text-sm font-sans leading-relaxed">
                <p className="drop-cap">{activeModal.editorialSummary}</p>
                <div className="p-4 bg-[#F7F5F0] border-l-4 border-[#E63946] italic font-serif-editorial text-[#111111]">
                  "{activeModal.pullQuote}"
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t-2 border-[#111111] font-mono text-xs">
                {activeModal.liveUrl && (
                  <a
                    href={activeModal.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-[#111111] text-white font-bold flex items-center gap-2 hover:bg-[#E63946]"
                  >
                    <span>LIVE APP</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
                <button
                  onClick={() => setActiveModal(null)}
                  className="px-4 py-2 bg-[#F7F5F0] border border-[#111111] text-[#111111] font-bold"
                >
                  CLOSE
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
