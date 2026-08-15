"use client";

import React from "react";
import { Code2, Server, Database, Cpu } from "lucide-react";
import { magazineSkills } from "@/app/data/systemData";
import AudioDispatchReader from "@/app/components/AudioDispatchReader";

export default function NewspaperSkillsIndex() {
  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      <div className="space-y-4 pb-6 border-b-2 border-[#111111]">
        <div className="inline-flex items-center gap-2 font-mono text-xs font-bold text-[#E63946] tracking-widest uppercase">
          <span>03 // CLASSIFIEDS & TECHNICAL INDEX</span>
        </div>
        <h2 className="font-serif-editorial font-bold text-4xl sm:text-5xl lg:text-6xl text-[#111111] tracking-tight uppercase">
          CLASSIFIEDS <span className="italic underline decoration-[#E63946]">INDEX</span> OF EXPERTISE
        </h2>
        <p className="font-serif-editorial italic text-base text-[#444444] max-w-2xl">
          Core technical domains, full-stack frameworks, database design patterns, and AI model implementations.
        </p>

        {/* Audio Dispatch Voice Reader */}
        <div className="pt-2">
          <AudioDispatchReader
            textToRead="Classifieds Index of Expertise. Core technical domains include Frontend Architecture with React 19, Next.js 16, TypeScript, and Tailwind CSS; Backend Systems with Node.js, Express, Socket.io WebSockets, and Agenda cron services; Database Architecture with MongoDB Aggregation Pipelines and Redis; and AI Integrations with OpenAI Whisper Speech-to-Text and ChatGPT function calling."
            title="CLASSIFIEDS AUDIO INDEX BROADCAST"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {magazineSkills.map((domain, idx) => {
          const Icon = domain.icon;
          return (
            <div
              key={idx}
              className="newspaper-card p-6 sm:p-8 space-y-6"
            >
              <div className="flex items-start justify-between pb-4 border-b border-[#111111]/20">
                <div className="space-y-1">
                  <span className="font-mono text-xs font-bold text-[#E63946]">{domain.domain}</span>
                  <p className="text-[#555555] text-xs font-sans">{domain.description}</p>
                </div>
                <div className="p-2 bg-[#F7F5F0] border border-[#111111] text-[#111111]">
                  <Icon className="w-5 h-5" />
                </div>
              </div>

              <div className="space-y-4">
                {domain.skills.map((skill, sIdx) => (
                  <div
                    key={sIdx}
                    className="p-4 bg-[#F7F5F0] border border-[#111111] space-y-2 hover:bg-[#FFFFFF] transition-colors group"
                  >
                    <div className="flex items-center justify-between font-mono text-sm">
                      <span className="font-bold text-[#111111] group-hover:text-[#E63946] transition-colors">
                        {skill.name}
                      </span>
                      <span className="text-xs px-2 py-0.5 bg-[#111111] text-[#F7F5F0] font-bold">
                        {skill.level}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1 pt-1">
                      {skill.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 font-mono text-[10px] bg-[#FFFFFF] border border-[#111111] text-[#333333] font-semibold"
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
