"use client";

import React, { useState, useRef, useEffect } from "react";
import { Terminal as TerminalIcon, CornerDownLeft, Copy, Check, Radio, Zap } from "lucide-react";

interface HistoryItem {
  command: string;
  output: React.ReactNode;
}

export default function NewspaperTerminalLab() {
  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      command: "whoami",
      output: (
        <div className="space-y-1 text-[#222222]">
          <p className="text-[#E63946] font-bold">TELEGRAPH DISPATCH: Sahilpreet Singh // Full-Stack & AI Systems Architect</p>
          <p>Location: Amritsar, Punjab, India • Wire Status: Operational & Transmitting</p>
          <p className="text-xs text-[#555555]">Type <span className="text-[#E63946] font-bold">help</span> to transmit dispatch commands.</p>
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
          <div className="space-y-1 text-[#222222] text-xs">
            <p className="text-[#E63946] font-bold">TELEGRAPH WIRE DISPATCH COMMANDS:</p>
            <p><span className="font-bold text-[#111111]">whoami</span> - Developer dossier & core focus</p>
            <p><span className="font-bold text-[#111111]">projects</span> - Production platforms & case studies</p>
            <p><span className="font-bold text-[#111111]">skills</span> - High-throughput tech stack index</p>
            <p><span className="font-bold text-[#111111]">contact</span> - Transmit direct correspondence</p>
            <p><span className="font-bold text-[#111111]">clear</span> - Reset wire dispatch console</p>
          </div>
        );
        break;

      case "whoami":
        response = (
          <div className="space-y-1 text-[#222222] text-xs">
            <p className="text-[#E63946] font-bold">SAHILPREET SINGH // WIRE DOSSIER</p>
            <p>Software Engineer building multi-tenant MERN platforms, WebSocket engines, and AI speech ETL pipelines.</p>
            <p>Specialization: MongoDB Aggregations, Node.js Async IO, React 19 / Next.js 16, Whisper Speech-to-Text.</p>
          </div>
        );
        break;

      case "projects":
        response = (
          <div className="space-y-1.5 text-[#222222] text-xs">
            <p className="text-[#E63946] font-bold">WIRE DISPATCH COVERAGE:</p>
            <p>• <span className="font-bold">Tickmark.io</span> - Multi-tenant SaaS platform with RBAC & Agenda cron</p>
            <p>• <span className="font-bold">Medfeed.ai</span> - AI Medical Speech-to-Text & Sentiment ETL</p>
            <p>• <span className="font-bold">Amritsar.com</span> - Realtime YouTube Live Stream & Moderated Chat</p>
            <p>• <span className="font-bold">Sofa Studio</span> - CAD Inventory Admin with TanStack Query</p>
            <p>• <span className="font-bold">Shiv Shakti Fast Food</span> - Realtime Kitchen Order Dispatch</p>
          </div>
        );
        break;

      case "skills":
        response = (
          <div className="space-y-1 text-[#222222] text-xs">
            <p className="text-[#E63946] font-bold">TECHNICAL ENGINE CLASSIFICATION:</p>
            <p>Frontend: React 19, Next.js 16, TypeScript, Tailwind CSS, GSAP</p>
            <p>Backend: Node.js, Express, Socket.io, Python FastAPI, Agenda Cron</p>
            <p>Database: MongoDB (Aggregation Pipelines, Indexing), Redis</p>
            <p>AI: OpenAI Whisper STT, ChatGPT Function Calling</p>
          </div>
        );
        break;

      case "contact":
        response = (
          <div className="space-y-1 text-[#222222] text-xs">
            <p className="text-[#E63946] font-bold">WIRE CORRESPONDENCE UPLINK:</p>
            <p>Email: <a href="mailto:sahilbhullar44@gmail.com" className="text-[#E63946] underline font-bold">sahilbhullar44@gmail.com</a></p>
            <p>GitHub: <a href="https://github.com/sahilbhullar44-blip" target="_blank" rel="noopener noreferrer" className="text-[#E63946] underline font-bold">github.com/sahilbhullar44-blip</a></p>
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
          <p className="text-[#E63946] text-xs font-bold">
            Wire command not recognized: "{cmdStr}". Type <span className="underline cursor-pointer" onClick={() => handleCommand("help")}>help</span> for commands.
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
    <section id="terminal" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      <div className="space-y-2 pb-6 border-b-2 border-[#111111] flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 font-mono text-xs font-bold text-[#E63946] tracking-widest uppercase">
            <Radio className="w-3.5 h-3.5 text-[#E63946] animate-pulse" />
            <span>04 // NEWSROOM WIRE SERVICE // TELEGRAPH CONSOLE</span>
          </div>
          <h2 className="font-serif-editorial font-bold text-4xl sm:text-5xl text-[#111111] uppercase">
            THE TELEGRAPH <span className="italic underline decoration-[#E63946]">WIRE DISPATCH</span> CONSOLE
          </h2>
        </div>

        <button
          onClick={handleCopyCli}
          className="font-mono text-xs px-4 py-2 bg-[#111111] text-[#F7F5F0] font-bold flex items-center gap-2 hover:bg-[#E63946] transition-colors self-start md:self-auto"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-[#F7F5F0]" />}
          <span>{copied ? "CLI COMMAND COPIED" : "npx sahilpreet-cli"}</span>
        </button>
      </div>

      <div className="newspaper-card p-0 font-mono text-xs overflow-hidden">
        <div className="bg-[#111111] text-[#F7F5F0] px-4 py-3 border-b border-[#111111] flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold">
            <span className="w-2.5 h-2.5 rounded-full bg-[#E63946] animate-ping"></span>
            <span>telegraph@sahilpreet-dispatch:~</span>
          </div>
          <div className="flex items-center gap-3 text-[10px]">
            <span className="text-emerald-400 font-bold flex items-center gap-1">
              <Zap className="w-3 h-3" /> WIRE: ONLINE
            </span>
            <span className="text-[#888888]">TELEX V2026.1</span>
          </div>
        </div>

        <div className="p-6 space-y-4 max-h-[380px] overflow-y-auto bg-[#FFFFFF] min-h-[240px]">
          {history.map((item, idx) => (
            <div key={idx} className="space-y-2">
              <div className="flex items-center gap-2 text-[#555555]">
                <span className="text-[#E63946] font-bold">telegraph@dispatch:~$</span>
                <span className="text-[#111111] font-bold">{item.command}</span>
              </div>
              <div className="pl-4 border-l-2 border-[#111111] py-1">{item.output}</div>
            </div>
          ))}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleCommand(inputVal);
            }}
            className="flex items-center gap-2 text-[#111111] pt-2"
          >
            <span className="text-[#E63946] font-bold">telegraph@dispatch:~$</span>
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Type telegraph command ('help', 'projects', 'skills', 'contact')..."
              className="bg-transparent border-none outline-none flex-1 text-[#111111] placeholder:text-[#888888] font-mono text-xs font-bold"
            />
            <button type="submit" className="text-[#111111] hover:text-[#E63946] transition-colors">
              <CornerDownLeft className="w-4 h-4" />
            </button>
          </form>
          <div ref={bottomRef} />
        </div>

        <div className="bg-[#F7F5F0] p-4 border-t border-[#111111] flex flex-wrap items-center gap-2 text-[11px]">
          <span className="text-[#555555] font-bold uppercase">WIRE DISPATCH CHIPS:</span>
          {["whoami", "projects", "skills", "contact", "clear"].map((cmd) => (
            <button
              key={cmd}
              onClick={() => handleCommand(cmd)}
              className="px-2.5 py-1 bg-[#111111] text-[#F7F5F0] font-bold hover:bg-[#E63946] transition-all"
            >
              {cmd}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
