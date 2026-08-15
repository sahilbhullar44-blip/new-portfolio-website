"use client";

import React from "react";
import { Code2, Server, Database, Cpu } from "lucide-react";
import { magazineSkills } from "@/app/data/systemData";

export default function CyberSkillsIndex() {
  return (
    <section id="skills" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12 font-mono">
      <div className="space-y-4 pb-6 border-b border-white/10">
        <div className="inline-flex items-center gap-2 text-xs font-bold text-[#06B6D4] tracking-widest uppercase">
          <span>03 // CAPABILITIES & TECH ENGINE MATRIX</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
          INDEX OF <span className="text-[#22C55E] text-green-glow">CAPABILITIES</span>
        </h2>

        <p className="text-slate-400 text-xs sm:text-sm font-sans max-w-2xl">
          Core technical domains, full-stack frameworks, database design patterns, and AI model implementations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {magazineSkills.map((domain, idx) => {
          const Icon = domain.icon;
          return (
            <div
              key={idx}
              className="cyber-card cyber-hud-corner rounded-xl p-6 sm:p-8 space-y-6"
            >
              <div className="flex items-start justify-between pb-4 border-b border-white/10">
                <div className="space-y-1">
                  <span className="text-xs font-bold text-[#06B6D4]">{domain.domain}</span>
                  <p className="text-slate-400 text-xs font-sans">{domain.description}</p>
                </div>
                <div className="p-2 rounded-md bg-white/5 border border-white/10 text-[#06B6D4]">
                  <Icon className="w-5 h-5" />
                </div>
              </div>

              <div className="space-y-4">
                {domain.skills.map((skill, sIdx) => (
                  <div
                    key={sIdx}
                    className="p-4 rounded-md bg-white/5 border border-white/5 space-y-2 hover:bg-white/10 transition-colors group"
                  >
                    <div className="flex items-center justify-between text-xs sm:text-sm">
                      <span className="font-bold text-white group-hover:text-[#06B6D4] transition-colors">
                        {skill.name}
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded bg-[#06B6D4]/10 border border-[#06B6D4]/40 text-[#06B6D4] font-bold">
                        {skill.level}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {skill.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded text-[10px] bg-white/5 text-slate-300 border border-white/5"
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
