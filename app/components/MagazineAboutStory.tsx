"use client";

import React from "react";
import { ShieldCheck, Zap, Cpu, Code2 } from "lucide-react";
import AudioDispatchReader from "@/app/components/AudioDispatchReader";

export default function MagazineAboutStory() {
  const principles = [
    {
      title: "Multi-Tenant Isolation",
      desc: "Architecting software where tenant data is isolated with MongoDB schema boundaries while maintaining shared infrastructure efficiency.",
      icon: ShieldCheck,
    },
    {
      title: "Realtime WebSocket Engine",
      desc: "Delivering instant bi-directional messaging with sub-25ms latency across thousands of simultaneous socket connections.",
      icon: Zap,
    },
    {
      title: "Deterministic AI Signals",
      desc: "Extracting structured clinical/business intelligence from unstructured audio streams using OpenAI Whisper & ChatGPT API.",
      icon: Cpu,
    },
    {
      title: "Clean Modern React",
      desc: "Constructing modular Next.js 16 components with strict TypeScript types, server actions, and fluid responsive layouts.",
      icon: Code2,
    },
  ];

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12 border-t-2 border-[#111111]">
      <div className="space-y-4 pb-6 border-b-2 border-[#111111]">
        <div className="inline-flex items-center gap-2 font-mono text-xs font-bold text-[#E63946] tracking-widest uppercase">
          <span>05 // THE ARCHITECT'S STORY & PHILOSOPHY</span>
        </div>
        <h2 className="font-serif-editorial font-bold text-4xl sm:text-5xl lg:text-6xl text-[#111111] tracking-tight uppercase">
          ENGINEERING <span className="italic underline decoration-[#E63946]">THE RESILIENT</span> FUTURE
        </h2>

        {/* Audio Dispatch Voice Reader */}
        <div className="pt-2">
          <AudioDispatchReader
            textToRead="The Architect's Story and Philosophy. Sahilpreet Singh's engineering journey is driven by an obsession with performance, clean system design, and building platforms that scale effortlessly. Over the past several years, I have designed and delivered over eight production applications spanning multi-tenant SaaS suites, high-concurrency live streaming backplanes, and automated AI sentiment pipelines."
            title="EDITORIAL PHILOSOPHY AUDIO BROADCAST"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-7 space-y-6 text-[#333333] leading-relaxed font-sans text-sm sm:text-base">
          <p className="drop-cap">
            My engineering journey is driven by an obsession with performance, clean system design, and building platforms that scale effortlessly. Over the past several years, I've designed and delivered over 8 production applications spanning multi-tenant SaaS suites, high-concurrency live streaming backplanes, and automated AI sentiment pipelines.
          </p>

          <p>
            Whether constructing timezone-aware meeting agenda cron services in Node.js or optimizing speech-to-text audio transcription models in Python, I focus on building robust architecture that eliminates operational friction for end users.
          </p>

          <div className="p-6 bg-[#FFFFFF] border-l-4 border-[#E63946] border-y border-r border-[#111111] italic font-serif-editorial text-lg text-[#111111] my-6 space-y-2">
            <p>"Software architecture is not merely writing functional code; it is designing resilient systems that remain elegant under peak concurrency."</p>
            <span className="font-mono text-xs text-[#E63946] not-italic font-bold tracking-wider block pt-2">
              — SAHILPREET SINGH // DISPATCH AUTHOR
            </span>
          </div>
        </div>

        <div className="lg:col-span-5 space-y-4">
          <div className="font-mono text-xs text-[#E63946] font-bold uppercase tracking-wider pb-2 border-b border-[#111111]">
            CORE ARCHITECTURE PRINCIPLES
          </div>

          <div className="grid grid-cols-1 gap-4">
            {principles.map((p, idx) => {
              const Icon = p.icon;
              return (
                <div
                  key={idx}
                  className="p-5 newspaper-card space-y-2 group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#F7F5F0] border border-[#111111] text-[#111111] group-hover:bg-[#E63946] group-hover:text-white transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h4 className="font-serif-editorial font-bold text-lg text-[#111111] group-hover:text-[#E63946] transition-colors">
                      {p.title}
                    </h4>
                  </div>
                  <p className="text-[#555555] text-xs font-sans leading-relaxed pl-11">{p.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
