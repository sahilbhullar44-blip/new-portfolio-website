"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  BookOpen,
  X,
  Layers,
  Zap,
  CheckCircle2,
  Quote,
  Server,
  Cpu,
  Smartphone,
  Terminal,
} from "lucide-react";
import { magazineProjects, ProjectItem } from "@/app/data/systemData";

export default function CyberProjectsSpread() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [activeModalProject, setActiveModalProject] = useState<ProjectItem | null>(null);

  const filteredProjects =
    selectedCategory === "all"
      ? magazineProjects
      : magazineProjects.filter((p) => p.category === selectedCategory);

  const categories = [
    { id: "all", label: "[ALL_DISPATCHES]", icon: Layers },
    { id: "fullstack", label: "[MERN_FULLSTACK]", icon: Server },
    { id: "ai_ml", label: "[AI_SPEECH_ETL]", icon: Cpu },
    { id: "mobile", label: "[MOBILE_APPS]", icon: Smartphone },
    { id: "tools", label: "[TOOLS_INFRA]", icon: Terminal },
  ];

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12 font-mono">
      {/* Header */}
      <div className="space-y-4 pb-6 border-b border-white/10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#06B6D4] tracking-widest uppercase">
            <span>02 // PROJECT MATRIX DISPATCH</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
            PRODUCTION <span className="text-[#06B6D4] text-cyan-glow">CASE STUDIES</span>
          </h2>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 text-xs">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-2 rounded-md border font-bold flex items-center gap-2 transition-all ${
                  isActive
                    ? "bg-[#06B6D4] border-[#06B6D4] text-black shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                    : "bg-white/5 border-white/10 text-slate-300 hover:border-[#06B6D4]/50 hover:text-white"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Projects Cyber Matrix Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {filteredProjects.map((project, index) => (
          <div
            key={project.id}
            className={`cyber-card cyber-hud-corner rounded-xl p-6 sm:p-8 space-y-6 flex flex-col justify-between group ${
              index === 0 ? "lg:col-span-2 bg-[#0B0F19]" : ""
            }`}
          >
            <div className="flex items-center justify-between text-xs text-slate-400 border-b border-white/10 pb-3">
              <span className="text-[#06B6D4] font-bold">{project.issueTag}</span>
              <div className="flex items-center gap-3">
                <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-300">
                  {project.size}
                </span>
                <span>{project.date}</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <h3 className="text-2xl sm:text-3xl font-black text-white group-hover:text-[#06B6D4] transition-colors">
                  {project.name}
                </h3>
                <p className="text-xs text-slate-400 font-semibold">{project.tagline}</p>
              </div>

              <p className="font-sans text-sm text-slate-300 leading-relaxed">{project.editorialSummary}</p>

              <div className="space-y-2 pt-2">
                <div className="text-xs text-[#22C55E] font-bold uppercase tracking-wider">
                  SYSTEM ARCHITECTURE SPECIFICATION:
                </div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300 font-sans">
                  {project.architectureHighlights.slice(0, 3).map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#06B6D4] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-md bg-white/5 border-l-2 border-[#06B6D4] italic font-serif text-xs text-slate-200">
                "{project.pullQuote}"
              </div>
            </div>

            <div className="space-y-6 pt-4 border-t border-white/10">
              <div className="flex flex-wrap gap-1.5">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 rounded-md text-[11px] bg-white/5 border border-white/10 text-slate-300 font-bold"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 text-xs">
                {project.metrics ? (
                  <div className="flex items-center gap-4">
                    {project.metrics.slice(0, 2).map((m, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 text-slate-200">
                        <Zap className="w-3.5 h-3.5 text-[#22C55E]" />
                        <span className="font-bold text-white">{m.value}</span>
                        <span className="text-[10px] text-slate-400 uppercase">{m.label}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-[#22C55E] font-bold">{project.status}</div>
                )}

                <button
                  onClick={() => setActiveModalProject(project)}
                  className="px-4 py-2 rounded-md bg-white/10 border border-white/15 hover:border-[#06B6D4] text-white hover:text-[#06B6D4] font-bold flex items-center gap-2 transition-all"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>READ DISPATCH READER</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Cyber Reader Modal */}
      <AnimatePresence>
        {activeModalProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 p-4 sm:p-6 md:p-10 flex items-center justify-center overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-[#0A0E18] border border-[#06B6D4]/40 rounded-xl max-w-4xl w-full p-6 sm:p-10 space-y-8 relative shadow-[0_0_50px_rgba(6,182,212,0.2)] max-h-[90vh] overflow-y-auto font-mono"
            >
              <button
                onClick={() => setActiveModalProject(null)}
                className="absolute top-6 right-6 p-2 rounded-md bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-3 pb-6 border-b border-white/10">
                <div className="flex items-center gap-3 text-xs text-[#06B6D4] font-bold">
                  <span>{activeModalProject.issueTag}</span>
                  <span>•</span>
                  <span>{activeModalProject.date}</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-black text-white">
                  {activeModalProject.name}
                </h2>
                <p className="text-sm text-slate-400 font-semibold">{activeModalProject.tagline}</p>
              </div>

              <div className="space-y-6 text-slate-200 text-sm leading-relaxed font-sans">
                <div className="space-y-2">
                  <h4 className="font-mono text-xs text-[#06B6D4] font-bold uppercase">EDITORIAL OVERVIEW</h4>
                  <p>{activeModalProject.editorialSummary}</p>
                </div>

                <div className="space-y-3 font-mono">
                  <h4 className="text-xs text-[#22C55E] font-bold uppercase">TECHNICAL SPECIFICATIONS</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {activeModalProject.architectureHighlights.map((item, idx) => (
                      <div key={idx} className="p-3 rounded-md bg-white/5 border border-white/10 flex items-start gap-2.5 text-xs text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-[#06B6D4] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-6 rounded-md bg-[#06B6D4]/10 border border-[#06B6D4]/30 italic font-serif text-lg text-white">
                  "{activeModalProject.pullQuote}"
                </div>

                <div className="space-y-3 font-mono">
                  <h4 className="text-xs text-slate-400 font-bold uppercase">TECH STACK ENGINE</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {activeModalProject.tech.map((t) => (
                      <span key={t} className="px-3 py-1 rounded-md text-xs bg-white/10 border border-white/15 text-slate-200 font-bold">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs">
                <div className="text-slate-400">
                  STATUS: <span className="text-[#22C55E] font-bold">{activeModalProject.status}</span>
                </div>

                <div className="flex items-center gap-3">
                  {activeModalProject.liveUrl && (
                    <a
                      href={activeModalProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 rounded-md bg-[#06B6D4] text-black font-bold flex items-center gap-2 shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:bg-[#22C55E] transition-all"
                    >
                      <span>VISIT LIVE APP</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                  <button
                    onClick={() => setActiveModalProject(null)}
                    className="px-5 py-2.5 rounded-md bg-white/10 hover:bg-white/20 text-white font-bold transition-colors"
                  >
                    CLOSE DISPATCH
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
