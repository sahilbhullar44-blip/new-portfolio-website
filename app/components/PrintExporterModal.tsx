"use client";

import React, { useState } from "react";
import { Printer, Download, FileText, CheckCircle2, X, Sparkles, ShieldCheck, Newspaper } from "lucide-react";

interface PrintExporterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PrintExporterModal({ isOpen, onClose }: PrintExporterModalProps) {
  const [printMode, setPrintMode] = useState<"full" | "compact">("full");

  if (!isOpen) return null;

  const handleExecutePrint = () => {
    if (typeof window !== "undefined") {
      if (printMode === "compact") {
        document.body.classList.add("print-compact-mode");
      } else {
        document.body.classList.remove("print-compact-mode");
      }
      onClose();
      setTimeout(() => {
        window.print();
        setTimeout(() => {
          document.body.classList.remove("print-compact-mode");
        }, 1000);
      }, 150);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#111111]/80 backdrop-blur-sm no-print animate-fade-in font-mono">
      <div className="relative w-full max-w-xl bg-[#FFFFFF] border-4 border-[#111111] shadow-[8px_8px_0px_#111111] p-6 space-y-6 text-[#111111]">
        {/* Header Bar */}
        <div className="flex items-start justify-between gap-4 border-b-2 border-[#111111] pb-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 text-[10px] font-bold text-[#E63946] uppercase tracking-widest bg-[#F7F5F0] px-2 py-0.5 border border-[#111111]">
              <Newspaper className="w-3 h-3" />
              <span>OFFICIAL BROADSHEET EXPORTER</span>
            </div>
            <h2 className="font-serif-editorial text-2xl sm:text-3xl font-bold uppercase tracking-tight text-[#111111]">
              PRINT & EXPORT EDITION
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 bg-[#F7F5F0] border border-[#111111] hover:bg-[#111111] hover:text-[#FFFFFF] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Edition Mode Selector Options */}
        <div className="space-y-3">
          <div className="font-bold text-xs uppercase tracking-wider text-[#444444]">
            SELECT EXPORT PRINT FORMAT:
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Option 1: Full 2-Page Broadsheet */}
            <div
              onClick={() => setPrintMode("full")}
              className={`p-4 border-2 cursor-pointer transition-all ${
                printMode === "full"
                  ? "bg-[#F7F5F0] border-[#E63946] shadow-[4px_4px_0px_#E63946]"
                  : "bg-[#FFFFFF] border-[#111111] hover:border-[#E63946]"
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <FileText className="w-5 h-5 text-[#E63946]" />
                {printMode === "full" && <CheckCircle2 className="w-4 h-4 text-[#E63946]" />}
              </div>
              <div className="font-bold text-sm uppercase text-[#111111] mb-1">
                FULL 2-PAGE EDITION
              </div>
              <p className="text-[11px] text-[#555555] leading-relaxed">
                Complete broadsheet portfolio featuring lead headlines, technical articles, skill matrix, & full story.
              </p>
            </div>

            {/* Option 2: Compact 1-Page Resume */}
            <div
              onClick={() => setPrintMode("compact")}
              className={`p-4 border-2 cursor-pointer transition-all ${
                printMode === "compact"
                  ? "bg-[#F7F5F0] border-[#E63946] shadow-[4px_4px_0px_#E63946]"
                  : "bg-[#FFFFFF] border-[#111111] hover:border-[#E63946]"
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <Printer className="w-5 h-5 text-[#111111]" />
                {printMode === "compact" && <CheckCircle2 className="w-4 h-4 text-[#E63946]" />}
              </div>
              <div className="font-bold text-sm uppercase text-[#111111] mb-1">
                COMPACT FRONT PAGE
              </div>
              <p className="text-[11px] text-[#555555] leading-relaxed">
                High-density 1-page newspaper resume layout optimized for HR & rapid recruiter evaluation.
              </p>
            </div>
          </div>
        </div>

        {/* Tip Box */}
        <div className="p-3 bg-[#F7F5F0] border border-[#111111] text-[11px] text-[#333333] space-y-1">
          <div className="font-bold text-[#111111] flex items-center gap-1.5 uppercase">
            <Sparkles className="w-3.5 h-3.5 text-[#E63946]" />
            <span>PDF SAVING TIP:</span>
          </div>
          <p>
            In your browser's print dialog, select <span className="font-bold underline text-[#111111]">"Save as PDF"</span> as the destination to download an offline digital broadsheet PDF!
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2.5 bg-[#FFFFFF] border border-[#111111] font-bold text-xs uppercase hover:bg-[#F7F5F0] transition-colors"
          >
            CANCEL
          </button>
          <button
            onClick={handleExecutePrint}
            className="px-5 py-2.5 bg-[#E63946] text-white border-2 border-[#111111] font-bold text-xs uppercase flex items-center gap-2 hover:bg-red-700 transition-colors shadow-[3px_3px_0px_#111111]"
          >
            <Printer className="w-4 h-4" />
            <span>PRINT / SAVE PDF NOW</span>
          </button>
        </div>
      </div>
    </div>
  );
}
