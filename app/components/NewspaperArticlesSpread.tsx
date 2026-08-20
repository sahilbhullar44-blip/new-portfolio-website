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
import AudioDispatchReader from "@/app/components/AudioDispatchReader";

export default function NewspaperArticlesSpread() {
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
    <section id="projects" suppressHydrationWarning className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* Header */}
      <div suppressHydrationWarning className="space-y-4 pb-6 border-b-2 border-[#111111] flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 font-mono text-xs font-bold text-[#E63946] tracking-widest uppercase">
            <span>02 // FEATURE ARTICLES & CASE STUDIES</span>
          </div>
          <h2 className="font-serif-editorial font-bold text-4xl sm:text-5xl lg:text-6xl text-[#111111] tracking-tight uppercase">
            SELECTED <span className="italic underline decoration-[#E63946]">WORKS</span> & DISPATCHES
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
                className={`px-3.5 py-2 border font-bold flex items-center gap-2 transition-all ${
                  isActive
                    ? "bg-[#111111] border-[#111111] text-[#F7F5F0]"
                    : "bg-[#FFFFFF] border-[#111111] text-[#111111] hover:bg-[#E63946] hover:text-white hover:border-[#E63946]"
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredProjects.map((project, index) => (
          <div
            key={project.id}
            className={`newspaper-card p-6 sm:p-8 space-y-6 flex flex-col justify-between relative overflow-hidden group ${
              index === 0 ? "md:col-span-2 bg-[#FFFFFF]" : ""
            }`}
          >
            <div className="flex items-center justify-between font-mono text-xs text-[#555555] border-b border-[#111111]/20 pb-3">
              <span className="text-[#E63946] font-bold tracking-wider">{project.issueTag}</span>
              <div className="flex items-center gap-3">
                <span className="px-2 py-0.5 bg-[#F7F5F0] border border-[#111111] font-bold text-[#111111]">
                  {project.size}
                </span>
                <span>{project.date}</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <h3 className="font-serif-editorial font-bold text-2xl sm:text-3xl text-[#111111] group-hover:text-[#E63946] transition-colors">
                  {project.name}
                </h3>
                <p className="font-mono text-xs text-[#555555] font-semibold">{project.tagline}</p>
              </div>

              <p className="font-sans text-sm text-[#333333] leading-relaxed">{project.editorialSummary}</p>

              <div className="space-y-2 pt-2">
                <div className="font-mono text-xs text-[#111111] font-bold uppercase tracking-wider">
                  SYSTEM ARCHITECTURE HIGHLIGHTS:
                </div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-sans text-[#222222]">
                  {project.architectureHighlights.slice(0, 3).map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#E63946] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 bg-[#F7F5F0] border-l-4 border-[#111111] italic font-serif-editorial text-xs text-[#111111]">
                "{project.pullQuote}"
              </div>
            </div>

            <div className="space-y-6 pt-4 border-t border-[#111111]/20">
              <div className="flex flex-wrap gap-1.5">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 font-mono text-[11px] bg-[#F7F5F0] border border-[#111111] text-[#111111] font-semibold"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
                {project.metrics ? (
                  <div className="flex items-center gap-4">
                    {project.metrics.slice(0, 2).map((m, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 text-[#111111]">
                        <Zap className="w-3.5 h-3.5 text-[#E63946]" />
                        <span className="font-bold">{m.value}</span>
                        <span className="text-[10px] text-[#555555] uppercase">{m.label}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-emerald-700 font-bold">{project.status}</div>
                )}

                <button
                  onClick={() => setActiveModalProject(project)}
                  className="px-4 py-2 bg-[#111111] text-[#F7F5F0] font-bold flex items-center gap-2 hover:bg-[#E63946] transition-colors"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>READ STORY READER</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Reader Modal */}
      <AnimatePresence>
        {activeModalProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/70 p-4 sm:p-6 md:p-10 flex items-center justify-center overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-[#FFFFFF] border-2 border-[#111111] rounded-none max-w-4xl w-full p-6 sm:p-10 space-y-8 relative shadow-[10px_10px_0px_#111111] max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setActiveModalProject(null)}
                className="absolute top-6 right-6 p-2 bg-[#111111] text-white hover:bg-[#E63946] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-3 pb-6 border-b-2 border-[#111111]">
                <div className="flex items-center gap-3 font-mono text-xs text-[#E63946] font-bold">
                  <span>{activeModalProject.issueTag}</span>
                  <span>•</span>
                  <span>{activeModalProject.date}</span>
                </div>
                <h2 className="font-serif-editorial font-bold text-3xl sm:text-4xl text-[#111111]">
                  {activeModalProject.name}
                </h2>
                <p className="font-mono text-sm text-[#555555] font-semibold">{activeModalProject.tagline}</p>
              </div>

              <div className="space-y-6 text-[#222222] text-base leading-relaxed font-sans">
                {/* Audio Dispatch Reader */}
                <AudioDispatchReader
                  textToRead={`${activeModalProject.name}. ${activeModalProject.tagline}. ${activeModalProject.editorialSummary}. ${activeModalProject.pullQuote}`}
                  title={`${activeModalProject.name.toUpperCase()} AUDIO DISPATCH`}
                />

                <div className="space-y-2">
                  <h4 className="font-mono text-xs text-[#E63946] font-bold uppercase">EDITORIAL OVERVIEW</h4>
                  <p className="drop-cap">{activeModalProject.editorialSummary}</p>
                </div>

                <div className="space-y-3">
                  <h4 className="font-mono text-xs text-[#111111] font-bold uppercase">TECHNICAL ARCHITECTURE</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {activeModalProject.architectureHighlights.map((item, idx) => (
                      <div key={idx} className="p-3 bg-[#F7F5F0] border border-[#111111] flex items-start gap-2.5 text-xs text-[#111111]">
                        <CheckCircle2 className="w-4 h-4 text-[#E63946] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-6 bg-[#F7F5F0] border-l-4 border-[#E63946] italic font-serif-editorial text-lg text-[#111111]">
                  "{activeModalProject.pullQuote}"
                </div>

                <div className="space-y-3">
                  <h4 className="font-mono text-xs text-[#555555] font-bold uppercase">TECH STACK ENGINE</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {activeModalProject.tech.map((t) => (
                      <span key={t} className="px-3 py-1 font-mono text-xs bg-[#F7F5F0] border border-[#111111] text-[#111111] font-bold">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t-2 border-[#111111] flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
                <div className="text-[#555555]">
                  STATUS: <span className="text-emerald-700 font-bold">{activeModalProject.status}</span>
                </div>

                <div className="flex items-center gap-3">
                  {activeModalProject.liveUrl && (
                    <a
                      href={activeModalProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 bg-[#111111] text-white font-bold flex items-center gap-2 hover:bg-[#E63946] transition-colors"
                    >
                      <span>VISIT LIVE APP</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                  <button
                    onClick={() => setActiveModalProject(null)}
                    className="px-5 py-2.5 bg-[#F7F5F0] border border-[#111111] text-[#111111] font-bold hover:bg-[#111111] hover:text-white transition-colors"
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
