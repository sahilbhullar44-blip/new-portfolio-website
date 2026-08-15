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

export default function MagazineProjectsSpread() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [activeModalProject, setActiveModalProject] = useState<ProjectItem | null>(null);

  const filteredProjects =
    selectedCategory === "all"
      ? magazineProjects
      : magazineProjects.filter((p) => p.category === selectedCategory);

  const categories = [
    { id: "all", label: "ALL DISPATCHES", icon: Layers },
    { id: "fullstack", label: "FULLSTACK MERN", icon: Server },
    { id: "ai_ml", label: "AI & ML ETL", icon: Cpu },
    { id: "mobile", label: "MOBILE APPS", icon: Smartphone },
    { id: "tools", label: "TOOLS & INFRA", icon: Terminal },
  ];

  return (
    <section
      id="projects"
      className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16 relative"
    >
      {/* Header */}
      <div className="space-y-6 pb-8 border-b border-white/10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-[#E2B96B] tracking-widest uppercase">
            <span>02 // FEATURE ARTICLES & CASE STUDIES</span>
          </div>
          <h2 className="font-serif-editorial font-bold text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight">
            SELECTED <span className="text-gold-gradient italic">WORKS</span> & DISPATCHES
          </h2>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 font-mono text-xs">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2.5 rounded-xl border flex items-center gap-2 transition-all ${
                  isActive
                    ? "bg-[#E2B96B] border-[#E2B96B] text-black font-bold shadow-lg shadow-[#E2B96B]/20"
                    : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {filteredProjects.map((project, index) => (
          <div
            key={project.id}
            className={`magazine-card rounded-2xl p-6 sm:p-8 space-y-6 flex flex-col justify-between border-white/10 relative overflow-hidden group ${
              index === 0 ? "lg:col-span-2 bg-[#0F1118]" : ""
            }`}
          >
            <div className="flex items-center justify-between font-mono text-xs text-slate-400 border-b border-white/10 pb-4">
              <span className="text-[#E2B96B] font-bold tracking-wider">{project.issueTag}</span>
              <div className="flex items-center gap-3">
                <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-300">
                  {project.size}
                </span>
                <span>{project.date}</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <h3 className="font-serif-editorial font-bold text-2xl sm:text-3xl text-white group-hover:text-[#E2B96B] transition-colors">
                  {project.name}
                </h3>
                <p className="font-mono text-xs text-slate-400 font-medium">{project.tagline}</p>
              </div>

              <p className="text-slate-300 text-sm leading-relaxed font-sans">{project.editorialSummary}</p>

              <div className="space-y-2 pt-2">
                <div className="font-mono text-xs text-slate-400 font-bold uppercase tracking-wider">
                  SYSTEM ARCHITECTURE HIGHLIGHTS:
                </div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                  {project.architectureHighlights.slice(0, 3).map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#E2B96B] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border-l-2 border-[#E2B96B] italic font-serif-editorial text-xs text-slate-200 flex items-start gap-3">
                <Quote className="w-4 h-4 text-[#E2B96B] shrink-0 mt-0.5" />
                <span>"{project.pullQuote}"</span>
              </div>
            </div>

            <div className="space-y-6 pt-4 border-t border-white/10">
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-white/5 border border-white/10 text-slate-300"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
                {project.metrics ? (
                  <div className="flex items-center gap-4">
                    {project.metrics.slice(0, 2).map((m, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 text-slate-300">
                        <Zap className="w-3 h-3 text-[#E2B96B]" />
                        <span className="font-bold text-white">{m.value}</span>
                        <span className="text-[10px] text-slate-400">{m.label}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-emerald-400 font-semibold">{project.status}</div>
                )}

                <button
                  onClick={() => setActiveModalProject(project)}
                  className="px-5 py-2.5 rounded-xl bg-white/10 border border-white/15 hover:border-[#E2B96B] text-white hover:text-[#E2B96B] font-bold flex items-center gap-2 transition-all"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>READ STORY READER</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Reader */}
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
              className="bg-[#0F1118] border border-white/15 rounded-3xl max-w-4xl w-full p-6 sm:p-10 space-y-8 relative shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setActiveModalProject(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-3 pb-6 border-b border-white/10">
                <div className="flex items-center gap-3 font-mono text-xs text-[#E2B96B]">
                  <span>{activeModalProject.issueTag}</span>
                  <span>•</span>
                  <span>{activeModalProject.date}</span>
                </div>
                <h2 className="font-serif-editorial font-bold text-3xl sm:text-4xl text-white">
                  {activeModalProject.name}
                </h2>
                <p className="font-mono text-sm text-slate-400">{activeModalProject.tagline}</p>
              </div>

              <div className="space-y-6 text-slate-200 text-base leading-relaxed font-sans">
                <div className="space-y-2">
                  <h4 className="font-mono text-xs text-[#E2B96B] font-bold uppercase">EDITORIAL OVERVIEW</h4>
                  <p className="drop-cap">{activeModalProject.editorialSummary}</p>
                </div>

                <div className="space-y-3">
                  <h4 className="font-mono text-xs text-[#E2B96B] font-bold uppercase">TECHNICAL ARCHITECTURE</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {activeModalProject.architectureHighlights.map((item, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-start gap-2.5 text-xs text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-[#E2B96B] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-[#E2B96B]/10 border border-[#E2B96B]/20 italic font-serif-editorial text-lg text-white">
                  "{activeModalProject.pullQuote}"
                </div>

                <div className="space-y-3">
                  <h4 className="font-mono text-xs text-slate-400 font-bold uppercase">TECH STACK ENGINE</h4>
                  <div className="flex flex-wrap gap-2">
                    {activeModalProject.tech.map((t) => (
                      <span key={t} className="px-3 py-1.5 rounded-lg text-xs font-mono bg-white/10 border border-white/15 text-slate-200">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
                <div className="text-slate-400">
                  STATUS: <span className="text-emerald-400 font-bold">{activeModalProject.status}</span>
                </div>

                <div className="flex items-center gap-3">
                  {activeModalProject.liveUrl && (
                    <a
                      href={activeModalProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#E2B96B] to-[#C8993B] text-black font-bold flex items-center gap-2 shadow-lg hover:brightness-110 transition-all"
                    >
                      <span>VISIT LIVE APP</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                  <button
                    onClick={() => setActiveModalProject(null)}
                    className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold transition-colors"
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
