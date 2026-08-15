"use client";

import React, { useState, useEffect, useRef } from "react";
import { Feather, Stamp, MessageSquare, Send, CheckCircle2, Volume2, VolumeX } from "lucide-react";

export interface LedgerEntry {
  id: string;
  name: string;
  role: string;
  message: string;
  stamp: "APPROVED" | "TOP SECRET" | "EDITORIAL PICK" | "CERTIFIED DESI";
  date: string;
}

const INITIAL_ENTRIES: LedgerEntry[] = [
  {
    id: "leg-1",
    name: "Vikram Malhotra",
    role: "Senior Engineering Manager @ CloudCorp",
    message: "Sensational engineering architecture! The live edge radio streaming and multi-tenant telemetry are top tier.",
    stamp: "EDITORIAL PICK",
    date: "AUG 14, 2026",
  },
  {
    id: "leg-2",
    name: "Ananya Sharma",
    role: "Lead Fullstack Architect",
    message: "Loved the broadsheet dispatch UI aesthetics. Brilliant attention to real-time WebSockets and zero-cache stream design.",
    stamp: "APPROVED",
    date: "AUG 13, 2026",
  },
  {
    id: "leg-3",
    name: "Harpreet Singh",
    role: "DevOps Specialist",
    message: "Pure Punjabi FM radio streams + vintage tuning sound effects make this the most unique developer portfolio of 2026!",
    stamp: "CERTIFIED DESI",
    date: "AUG 12, 2026",
  },
];

const STAMP_STYLES = {
  APPROVED: "border-emerald-600 text-emerald-700 bg-emerald-50/80 rotate-[-4deg]",
  "TOP SECRET": "border-[#E63946] text-[#E63946] bg-red-50/80 rotate-[3deg]",
  "EDITORIAL PICK": "border-amber-600 text-amber-700 bg-amber-50/80 rotate-[-2deg]",
  "CERTIFIED DESI": "border-indigo-600 text-indigo-700 bg-indigo-50/80 rotate-[4deg]",
};

export default function PublicLedgerGuestbook() {
  const [entries, setEntries] = useState<LedgerEntry[]>(INITIAL_ENTRIES);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [message, setMessage] = useState("");
  const [stamp, setStamp] = useState<LedgerEntry["stamp"]>("APPROVED");
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  const audioCtxRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("public-ledger-entries");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setEntries(parsed);
          }
        } catch (e) {
          console.warn("Failed to parse ledger entries", e);
        }
      }
    }
  }, []);

  const getAudioContext = () => {
    if (!audioCtxRef.current && typeof window !== "undefined") {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        audioCtxRef.current = new AudioCtx();
      }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  };

  // Synthesize authentic mechanical typewriter key clack
  const playTypewriterKeySound = () => {
    if (!soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      // Sharp mechanical metallic noise burst
      osc.type = "sine";
      osc.frequency.setValueAtTime(450 + Math.random() * 300, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.03);

      filter.type = "bandpass";
      filter.frequency.setValueAtTime(1200 + Math.random() * 400, ctx.currentTime);
      filter.Q.setValueAtTime(3, ctx.currentTime);

      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.035);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.04);
    } catch {
      // Audio synth fallback
    }
  };

  // Synthesize vintage typewriter carriage bell ding on submit
  const playTypewriterBellSound = () => {
    if (!soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(2400, ctx.currentTime);

      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.85);
    } catch {
      // Audio synth fallback
    }
  };

  const handleKeyDown = () => {
    playTypewriterKeySound();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    playTypewriterBellSound();

    const newEntry: LedgerEntry = {
      id: `leg-${Date.now()}`,
      name: name.trim(),
      role: role.trim() || "Visiting Developer",
      message: message.trim(),
      stamp,
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }).toUpperCase(),
    };

    const updated = [newEntry, ...entries];
    setEntries(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem("public-ledger-entries", JSON.stringify(updated));
    }

    setName("");
    setRole("");
    setMessage("");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section id="guestbook" suppressHydrationWarning className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* Header */}
      <div suppressHydrationWarning className="space-y-4 pb-6 border-b-2 border-[#111111] flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 font-mono text-xs font-bold text-[#E63946] tracking-widest uppercase">
            <Feather className="w-3.5 h-3.5" />
            <span>04 // PUBLIC LEDGER & VISITOR LOG</span>
          </div>
          <h2 className="font-serif-editorial font-bold text-4xl sm:text-5xl lg:text-6xl text-[#111111] tracking-tight uppercase">
            THE PUBLIC <span className="italic underline decoration-[#E63946]">LEDGER</span>
          </h2>
        </div>

        <button
          onClick={() => setSoundEnabled(!soundEnabled)}
          className={`h-9 px-3 border font-mono font-bold text-xs flex items-center gap-2 transition-colors ${
            soundEnabled
              ? "bg-[#111111] text-[#F7F5F0] border-[#111111]"
              : "bg-[#FFFFFF] text-[#555555] border-[#111111] hover:text-[#111111]"
          }`}
          title="Toggle Mechanical Typewriter Audio Effects"
        >
          {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-[#E63946]" /> : <VolumeX className="w-3.5 h-3.5" />}
          <span>TYPEWRITER SOUND: {soundEnabled ? "ON" : "OFF"}</span>
        </button>
      </div>

      <div suppressHydrationWarning className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Form: Mechanical Typewriter Input Desk */}
        <div className="lg:col-span-5 newspaper-card p-6 sm:p-8 space-y-6 no-print">
          <div className="space-y-1 border-b border-[#111111]/20 pb-4">
            <div className="flex items-center gap-2 font-mono text-xs text-[#E63946] font-bold uppercase tracking-wider">
              <Stamp className="w-3.5 h-3.5" />
              <span>TYPE YOUR DISPATCH ENTRY</span>
            </div>
            <h3 className="font-serif-editorial font-bold text-2xl text-[#111111]">
              Sign the Editorial Ledger
            </h3>
            <p className="font-mono text-xs text-[#555555]">
              Type a public message below. Keystrokes generate authentic 1920s mechanical typewriter sounds!
            </p>
          </div>

          {submitted && (
            <div className="p-4 bg-emerald-50 border-2 border-emerald-600 text-emerald-800 font-mono text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>ENTRY STAMPED & RECORDED IN THE PUBLIC LEDGER!</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
            <div className="space-y-1.5">
              <label className="block text-[#111111] font-bold uppercase">
                YOUR NAME / ALIAS <span className="text-[#E63946]">*</span>
              </label>
              <input
                type="text"
                required
                value={name}
                onKeyDown={handleKeyDown}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Inspector Rajan"
                className="w-full h-10 px-3 bg-[#F7F5F0] border border-[#111111] text-[#111111] placeholder:text-[#888888] focus:outline-none focus:border-[#E63946] transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-[#111111] font-bold uppercase">
                TITLE / ORGANIZATION
              </label>
              <input
                type="text"
                value={role}
                onKeyDown={handleKeyDown}
                onChange={(e) => setRole(e.target.value)}
                placeholder="e.g. Staff Engineer @ TechCorp"
                className="w-full h-10 px-3 bg-[#F7F5F0] border border-[#111111] text-[#111111] placeholder:text-[#888888] focus:outline-none focus:border-[#E63946] transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-[#111111] font-bold uppercase">
                CHOOSE EDITORIAL INK STAMP
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(["APPROVED", "TOP SECRET", "EDITORIAL PICK", "CERTIFIED DESI"] as const).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => {
                      playTypewriterKeySound();
                      setStamp(s);
                    }}
                    className={`h-8 px-2 border font-bold text-[10px] uppercase transition-all ${
                      stamp === s
                        ? "bg-[#111111] text-white border-[#111111]"
                        : "bg-[#F7F5F0] text-[#333333] border-[#111111] hover:border-[#E63946]"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-[#111111] font-bold uppercase">
                DISPATCH MESSAGE <span className="text-[#E63946]">*</span>
              </label>
              <textarea
                required
                rows={4}
                value={message}
                onKeyDown={handleKeyDown}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message here..."
                className="w-full p-3 bg-[#F7F5F0] border border-[#111111] text-[#111111] placeholder:text-[#888888] focus:outline-none focus:border-[#E63946] transition-colors font-serif-editorial text-sm"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full h-11 bg-[#111111] text-[#F7F5F0] font-bold text-xs flex items-center justify-center gap-2 hover:bg-[#E63946] transition-colors shadow-[4px_4px_0px_#111111]"
            >
              <Send className="w-3.5 h-3.5 text-[#E63946]" />
              <span>STAMP & RECORD ENTRY</span>
            </button>
          </form>
        </div>

        {/* Right List: Vintage Ledger Pages */}
        <div suppressHydrationWarning className="lg:col-span-7 space-y-6">
          <div className="flex items-center justify-between font-mono text-xs text-[#555555] border-b border-[#111111]/20 pb-3">
            <span className="font-bold text-[#111111] uppercase tracking-wider">
              PUBLIC LEDGER DISPATCHES ({entries.length})
            </span>
            <span>PERSISTED TO INK STORAGE</span>
          </div>

          <div className="space-y-4">
            {entries.map((entry) => (
              <div
                key={entry.id}
                className="newspaper-card p-6 space-y-4 relative overflow-hidden group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <h4 className="font-serif-editorial font-bold text-lg text-[#111111] group-hover:text-[#E63946] transition-colors">
                      {entry.name}
                    </h4>
                    <p className="font-mono text-xs text-[#555555] font-semibold">{entry.role}</p>
                  </div>

                  <span className="font-mono text-[10px] text-[#888888] shrink-0 font-bold">
                    {entry.date}
                  </span>
                </div>

                <p className="font-serif-editorial text-sm text-[#222222] leading-relaxed italic">
                  "{entry.message}"
                </p>

                <div className="pt-2 flex items-center justify-between border-t border-[#111111]/10">
                  <span
                    className={`inline-block px-2.5 py-0.5 border-2 font-mono text-[9px] font-black tracking-widest uppercase shadow-sm ${
                      STAMP_STYLES[entry.stamp]
                    }`}
                  >
                    ✦ STAMP: {entry.stamp}
                  </span>

                  <span className="font-mono text-[10px] text-[#555555] uppercase font-bold flex items-center gap-1">
                    <MessageSquare className="w-3 h-3 text-[#E63946]" />
                    VERIFIED DISPATCH
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
