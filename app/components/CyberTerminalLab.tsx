"use client";

import React, { useState, useRef, useEffect } from "react";
import { Terminal as TerminalIcon, CornerDownLeft, Copy, Check } from "lucide-react";

interface HistoryItem {
  command: string;
  output: React.ReactNode;
}

export default function CyberTerminalLab() {
  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      command: "whoami",
      output: (
        <div className="space-y-1 text-slate-300">
          <p className="text-[#06B6D4] font-bold">Sahilpreet Singh // Cybernetic Systems Architect</p>
          <p>Location: Punjab, India • Status: Available for Contracts / Hire</p>
          <p className="text-xs text-slate-400">Type <span className="text-[#22C55E] font-bold">help</span> to list commands.</p>
        </div>
      ),
    },
  ]);
  const [copied, setCopied] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim().toLowerCase();
    let response: React.ReactNode = null;

    switch (trimmed) {
      case "help":
        response = (
          <div className="space-y-1 text-slate-300 text-xs font-mono">
            <p className="text-[#06B6D4] font-bold">AVAILABLE DISPATCH COMMANDS:</p>
            <p><span className="text-[#22C55E] font-bold">whoami</span> - Developer bio & architecture focus</p>
            <p><span className="text-[#22C55E] font-bold">projects</span> - List of production platforms</p>
            <p><span className="text-[#22C55E] font-bold">skills</span> - High-level technology stack</p>
            <p><span className="text-[#22C55E] font-bold">contact</span> - Direct email & GitHub dispatches</p>
            <p><span className="text-[#22C55E] font-bold">clear</span> - Clear terminal buffer</p>
          </div>
        );
        break;

      case "whoami":
        response = (
          <div className="space-y-1 text-slate-300 text-xs font-mono">
            <p className="text-[#06B6D4] font-bold">Sahilpreet Singh</p>
            <p>Software Engineer building multi-tenant MERN platforms, WebSocket engines, and AI speech ETL pipelines.</p>
            <p>Specialization: MongoDB Aggregation, Node.js Async IO, React 19 / Next.js 16, Python Whisper.</p>
          </div>
        );
        break;

      case "projects":
        response = (
          <div className="space-y-1.5 text-slate-300 text-xs font-mono">
            <p className="text-[#06B6D4] font-bold">PRODUCTION DISPATCHES:</p>
            <p>• <span className="text-white font-bold">Tickmark.io</span> - Multi-tenant SaaS platform with RBAC & Agenda cron</p>
            <p>• <span className="text-white font-bold">Medfeed.ai</span> - AI Medical Speech-to-Text & Sentiment ETL</p>
            <p>• <span className="text-white font-bold">Amritsar.com</span> - Realtime YouTube Live Stream & Moderated Chat</p>
            <p>• <span className="text-white font-bold">Sofa Studio</span> - CAD Inventory Admin with TanStack Query</p>
            <p>• <span className="text-white font-bold">Shiv Shakti Fast Food</span> - Realtime Kitchen Display Ordering</p>
          </div>
        );
        break;

      case "skills":
        response = (
          <div className="space-y-1 text-slate-300 text-xs font-mono">
            <p className="text-[#06B6D4] font-bold">CORE ENGINE STACK:</p>
            <p>Frontend: React 19, Next.js 16, TypeScript, Tailwind CSS</p>
            <p>Backend: Node.js, Express, Socket.io, Python FastAPI, Agenda Cron</p>
            <p>Database: MongoDB (Aggregation Pipelines, Indexing), Redis</p>
            <p>AI: OpenAI Whisper STT, ChatGPT Function Calling</p>
          </div>
        );
        break;

      case "contact":
        response = (
          <div className="space-y-1 text-slate-300 text-xs font-mono">
            <p className="text-[#06B6D4] font-bold">DIRECT DISPATCH LINKS:</p>
            <p>Email: <a href="mailto:sahilbhullar44@gmail.com" className="text-[#22C55E] underline">sahilbhullar44@gmail.com</a></p>
            <p>GitHub: <a href="https://github.com/sahilbhullar44-blip" target="_blank" rel="noopener noreferrer" className="text-[#22C55E] underline">github.com/sahilbhullar44-blip</a></p>
          </div>
        );
        break;

      case "clear":
        setHistory([]);
        setInputVal("");
        return;

      case "":
        return;

      default:
        response = (
          <p className="text-rose-400 text-xs font-mono">
            Command not recognized: "{cmdStr}". Type <span className="text-[#06B6D4] underline cursor-pointer" onClick={() => handleCommand("help")}>help</span> for commands.
          </p>
        );
        break;
    }

    setHistory((prev) => [...prev, { command: cmdStr, output: response }]);
    setInputVal("");
  };

  const handleCopyCli = () => {
    navigator.clipboard.writeText("npx sahilpreet-cli");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="terminal" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 font-mono">
      <div className="space-y-2 pb-6 border-b border-white/10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#06B6D4] tracking-widest uppercase">
            <TerminalIcon className="w-3.5 h-3.5" />
            <span>04 // DISPATCHES & CLI LAB</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white uppercase">
            INTERACTIVE <span className="text-[#22C55E] text-green-glow">TERMINAL</span> HUD
          </h2>

        </div>

        <button
          onClick={handleCopyCli}
          className="text-xs px-4 py-2 rounded-md bg-white/5 border border-white/10 hover:border-[#06B6D4] text-slate-300 hover:text-white flex items-center gap-2 transition-all self-start md:self-auto font-bold"
        >
          {copied ? <Check className="w-4 h-4 text-[#22C55E]" /> : <Copy className="w-4 h-4 text-[#06B6D4]" />}
          <span>{copied ? "COPIED TO CLIPBOARD" : "npx sahilpreet-cli"}</span>
        </button>
      </div>

      <div className="cyber-card cyber-hud-corner rounded-xl p-0 overflow-hidden shadow-2xl">
        <div className="bg-[#0B0F19] px-4 py-3 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-[#22C55E]/80"></div>
            <span className="text-slate-400 text-xs ml-2">sahilpreet@cyber-hud:~</span>
          </div>
          <span className="text-[10px] text-[#06B6D4] font-bold">ZSH // V8.4</span>
        </div>

        <div className="p-6 space-y-4 max-h-[380px] overflow-y-auto bg-[#05070B]/90 min-h-[260px]">
          {history.map((item, idx) => (
            <div key={idx} className="space-y-2">
              <div className="flex items-center gap-2 text-slate-400">
                <span className="text-[#22C55E] font-bold">sahilpreet@hud:~$</span>
                <span className="text-white font-bold">{item.command}</span>
              </div>
              <div className="pl-4 border-l border-[#06B6D4]/40 py-1">{item.output}</div>
            </div>
          ))}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleCommand(inputVal);
            }}
            className="flex items-center gap-2 text-slate-200 pt-2"
          >
            <span className="text-[#22C55E] font-bold">sahilpreet@hud:~$</span>
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Type command ('help', 'projects', 'skills', 'contact')..."
              className="bg-transparent border-none outline-none flex-1 text-slate-100 placeholder:text-slate-600 font-mono text-xs font-bold"
            />
            <button type="submit" className="text-[#06B6D4] hover:text-white transition-colors">
              <CornerDownLeft className="w-4 h-4" />
            </button>
          </form>
          <div ref={bottomRef} />
        </div>

        <div className="bg-[#0B0F19] p-4 border-t border-white/10 flex flex-wrap items-center gap-2 text-[11px]">
          <span className="text-slate-400 font-bold uppercase">QUICK DISPATCH CHIPS:</span>
          {["whoami", "projects", "skills", "contact", "clear"].map((cmd) => (
            <button
              key={cmd}
              onClick={() => handleCommand(cmd)}
              className="px-2.5 py-1 rounded bg-white/5 border border-white/10 hover:bg-[#06B6D4] hover:text-black text-slate-300 font-bold transition-all"
            >
              {cmd}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
