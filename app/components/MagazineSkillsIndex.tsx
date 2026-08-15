"use client";

import React from "react";
import { Code2, Server, Database, Cpu } from "lucide-react";
import { magazineSkills } from "@/app/data/systemData";

export default function MagazineSkillsIndex() {
  return (
    <section id="skills" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16 relative">
      <div className="space-y-4 pb-8 border-b border-white/10">
        <div className="inline-flex items-center gap-2 font-mono text-xs text-[#E2B96B] tracking-widest uppercase">
          <span>03 // INDEX OF EXPERTISE & TECH ENGINE</span>
        </div>
        <h2 className="font-serif-editorial font-bold text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight">
          TABLE OF <span className="text-gold-gradient italic">CAPABILITIES</span>
        </h2>
        <p className="text-slate-400 text-sm font-sans max-w-2xl">
          Core technical domains, full-stack frameworks, database design patterns, and AI model implementations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {magazineSkills.map((domain, idx) => {
          const Icon = domain.icon;
          return (
            <div
              key={idx}
              className="magazine-card rounded-2xl p-6 sm:p-8 space-y-6 border-white/10 hover:border-[#E2B96B]/30 transition-all"
            >
              <div className="flex items-start justify-between pb-4 border-b border-white/10">
                <div className="space-y-1">
                  <span className="font-mono text-xs text-[#E2B96B] font-bold">{domain.domain}</span>
                  <p className="text-slate-400 text-xs font-sans">{domain.description}</p>
                </div>
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-[#E2B96B]">
                  <Icon className="w-5 h-5" />
                </div>
              </div>

              <div className="space-y-4">
                {domain.skills.map((skill, sIdx) => (
                  <div
                    key={sIdx}
                    className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-2 hover:bg-white/10 transition-colors group"
                  >
                    <div className="flex items-center justify-between font-mono text-sm">
                      <span className="font-bold text-white group-hover:text-[#E2B96B] transition-colors">
                        {skill.name}
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded bg-[#E2B96B]/15 text-[#E2B96B] border border-[#E2B96B]/30 font-semibold">
                        {skill.level}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {skill.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 text-slate-300 border border-white/5"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
