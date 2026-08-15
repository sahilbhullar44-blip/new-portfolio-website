"use client";

import React, { useState, useRef, useEffect } from "react";
import { Trophy, CheckCircle2, RotateCcw, HelpCircle, ArrowRight, Flame, RefreshCw, Calendar, Sparkles, Newspaper } from "lucide-react";

interface CrosswordClue {
  id: string;
  number: number;
  direction: "across" | "down";
  word: string;
  clue: string;
  row: number;
  col: number;
  length: number;
}

interface CrosswordData {
  date: string;
  edition: string;
  themeTitle: string;
  difficulty?: string;
  memoryInsights?: string;
  grid: (string | null)[][];
  cellNumbers: (number | null)[][];
  clues: CrosswordClue[];
}

const INITIAL_PUZZLE: CrosswordData = {
  date: new Date().toISOString().split("T")[0],
  edition: "DAILY DISPATCH // ISSUE #501",
  themeTitle: "Real-Time Event Streams & Distributed Caching",
  difficulty: "SENIOR LEVEL",
  memoryInsights: "Event-Driven WebSocket Architecture",
  grid: [
    ["K", "A", "F", "K", "A"],
    ["E", null, "A", null, "S"],
    ["R", "E", "S", "E", "T"],
    ["N", null, "T", null, "O"],
    ["E", "V", "E", "N", "T"],
  ],
  cellNumbers: [
    [1, null, 2, null, 4],
    [null, null, null, null, null],
    [3, null, null, null, null],
    [null, null, null, null, null],
    [5, null, null, null, null],
  ],
  clues: [
    { id: "1-across", number: 1, direction: "across", word: "KAFKA", clue: "High-throughput distributed event streaming platform.", row: 0, col: 0, length: 5 },
    { id: "3-across", number: 3, direction: "across", word: "RESET", clue: "Git command or HTTP response resetting stream status.", row: 2, col: 0, length: 5 },
    { id: "5-across", number: 5, direction: "across", word: "EVENT", clue: "Asynchronous message trigger in pub/sub broker engines.", row: 4, col: 0, length: 5 },
    { id: "1-down", number: 1, direction: "down", word: "KERNE", clue: "Operating system core managing low-level hardware I/O.", row: 0, col: 0, length: 5 },
    { id: "2-down", number: 2, direction: "down", word: "FASTE", clue: "Compiled execution performance in assembly pipelines.", row: 0, col: 2, length: 5 },
    { id: "4-down", number: 4, direction: "down", word: "ASTOT", clue: "Topological ordering in asynchronous task graphs.", row: 0, col: 4, length: 5 },
  ],
};

export default function NewsroomCrosswordPuzzle() {
  const [puzzleData, setPuzzleData] = useState<CrosswordData>(INITIAL_PUZZLE);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [grid, setGrid] = useState<string[][]>([
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
  ]);

  const [selectedCell, setSelectedCell] = useState<{ r: number; c: number }>({ r: 0, c: 0 });
  const [activeDirection, setActiveDirection] = useState<"across" | "down">("across");
  const [activeClueId, setActiveClueId] = useState<string>("1-across");
  const [isSolved, setIsSolved] = useState(false);
  const [checkedResults, setCheckedResults] = useState<{ [key: string]: boolean }>({});

  const inputsRef = useRef<(HTMLInputElement | null)[][]>([
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
  ]);

  const fetchDailyPuzzle = async (force: boolean = false) => {
    setIsGenerating(true);
    try {
      const url = `/api/crossword/daily?timestamp=${Date.now()}${force ? "&force=true" : ""}`;
      let data: any = null;
      try {
        const res = await window.fetch(url);
        data = await res.json();
      } catch {
        // Fallback for rogue browser extensions that crash window.fetch
        data = await new Promise<any>((resolve) => {
          try {
            const xhr = new XMLHttpRequest();
            xhr.open("GET", url);
            xhr.onload = () => {
              try {
                resolve(JSON.parse(xhr.responseText));
              } catch {
                resolve({});
              }
            };
            xhr.onerror = () => resolve({});
            xhr.send();
          } catch {
            resolve({});
          }
        });
      }

      if (data && data.success && data.data) {
        setPuzzleData(data.data);
        setGrid([
          ["", "", "", "", ""],
          ["", "", "", "", ""],
          ["", "", "", "", ""],
          ["", "", "", "", ""],
          ["", "", "", "", ""],
        ]);
        setIsSolved(false);
        setCheckedResults({});
        if (data.data.clues && data.data.clues.length > 0) {
          setActiveClueId(data.data.clues[0].id);
          setActiveDirection(data.data.clues[0].direction);
          setSelectedCell({ r: data.data.clues[0].row, c: data.data.clues[0].col });
        }
      }
    } catch {
      // Retain current playable state
    } finally {
      setIsGenerating(false);
    }
  };

  useEffect(() => {
    fetchDailyPuzzle(false);
  }, []);

  // Mechanical Web Audio Synthesizers
  const playTypewriterClick = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(450 + Math.random() * 80, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.04);
    } catch {
      // Audio fallback
    }
  };

  const playVictoryFanfare = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6

      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.12);

        gain.gain.setValueAtTime(0, ctx.currentTime + i * 0.12);
        gain.gain.linearRampToValueAtTime(0.15, ctx.currentTime + i * 0.12 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.12 + 0.4);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime + i * 0.12);
        osc.stop(ctx.currentTime + i * 0.12 + 0.45);
      });
    } catch {
      // Audio fallback
    }
  };

  const checkVictoryCondition = (currentGrid: string[][]) => {
    let allCorrect = true;
    for (let r = 0; r < 5; r++) {
      for (let c = 0; c < 5; c++) {
        if (puzzleData.grid[r]?.[c] !== null && puzzleData.grid[r]?.[c] !== undefined) {
          if (currentGrid[r][c].toUpperCase() !== puzzleData.grid[r][c]?.toUpperCase()) {
            allCorrect = false;
            break;
          }
        }
      }
    }

    if (allCorrect && !isSolved) {
      setIsSolved(true);
      playVictoryFanfare();
    }
  };

  const handleCellChange = (r: number, c: number, val: string) => {
    if (puzzleData.grid[r]?.[c] === null) return;

    const char = val.slice(-1).toUpperCase();
    const newGrid = grid.map((rowArr, rowIdx) =>
      rowArr.map((cellVal, colIdx) => (rowIdx === r && colIdx === c ? char : cellVal))
    );

    setGrid(newGrid);
    playTypewriterClick();
    checkVictoryCondition(newGrid);

    // Auto-advance cursor
    if (char !== "") {
      if (activeDirection === "across") {
        for (let nextC = c + 1; nextC < 5; nextC++) {
          if (puzzleData.grid[r]?.[nextC] !== null) {
            setSelectedCell({ r, c: nextC });
            inputsRef.current[r][nextC]?.focus();
            break;
          }
        }
      } else {
        for (let nextR = r + 1; nextR < 5; nextR++) {
          if (puzzleData.grid[nextR]?.[c] !== null) {
            setSelectedCell({ r: nextR, c });
            inputsRef.current[nextR][c]?.focus();
            break;
          }
        }
      }
    }
  };

  const handleKeyDown = (r: number, c: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && grid[r][c] === "") {
      if (activeDirection === "across" && c > 0) {
        for (let prevC = c - 1; prevC >= 0; prevC--) {
          if (puzzleData.grid[r]?.[prevC] !== null) {
            setSelectedCell({ r, c: prevC });
            inputsRef.current[r][prevC]?.focus();
            break;
          }
        }
      } else if (activeDirection === "down" && r > 0) {
        for (let prevR = r - 1; prevR >= 0; prevR--) {
          if (puzzleData.grid[prevR]?.[c] !== null) {
            setSelectedCell({ r, c: prevR });
            inputsRef.current[prevR][c]?.focus();
            break;
          }
        }
      }
    } else if (e.key === "ArrowRight" && c < 4) {
      if (puzzleData.grid[r]?.[c + 1] !== null) {
        setSelectedCell({ r, c: c + 1 });
        inputsRef.current[r][c + 1]?.focus();
      }
    } else if (e.key === "ArrowLeft" && c > 0) {
      if (puzzleData.grid[r]?.[c - 1] !== null) {
        setSelectedCell({ r, c: c - 1 });
        inputsRef.current[r][c - 1]?.focus();
      }
    } else if (e.key === "ArrowDown" && r < 4) {
      if (puzzleData.grid[r + 1]?.[c] !== null) {
        setSelectedCell({ r: r + 1, c });
        inputsRef.current[r + 1][c]?.focus();
      }
    } else if (e.key === "ArrowUp" && r > 0) {
      if (puzzleData.grid[r - 1]?.[c] !== null) {
        setSelectedCell({ r: r - 1, c });
        inputsRef.current[r - 1][c]?.focus();
      }
    }
  };

  const handleSelectClue = (clue: CrosswordClue) => {
    setActiveClueId(clue.id);
    setActiveDirection(clue.direction);
    setSelectedCell({ r: clue.row, c: clue.col });
    inputsRef.current[clue.row]?.[clue.col]?.focus();
  };

  const handleCheckAnswers = () => {
    const results: { [key: string]: boolean } = {};
    for (let r = 0; r < 5; r++) {
      for (let c = 0; c < 5; c++) {
        if (puzzleData.grid[r]?.[c] !== null && puzzleData.grid[r]?.[c] !== undefined) {
          const key = `${r}-${c}`;
          results[key] = grid[r][c].toUpperCase() === puzzleData.grid[r][c]?.toUpperCase();
        }
      }
    }
    setCheckedResults(results);
    setTimeout(() => {
      setCheckedResults({});
    }, 4000);
  };

  const handleRevealLetter = () => {
    const { r, c } = selectedCell;
    if (puzzleData.grid[r]?.[c] !== null && puzzleData.grid[r]?.[c] !== undefined) {
      const correctChar = puzzleData.grid[r][c]!;
      const newGrid = grid.map((rowArr, rowIdx) =>
        rowArr.map((cellVal, colIdx) => (rowIdx === r && colIdx === c ? correctChar : cellVal))
      );
      setGrid(newGrid);
      playTypewriterClick();
      checkVictoryCondition(newGrid);
    }
  };

  const handleResetPuzzle = () => {
    setGrid([
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
    ]);
    setIsSolved(false);
    setCheckedResults({});
  };

  return (
    <section id="crossword-puzzle" suppressHydrationWarning className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* Editorial Section Header (Standard Broadsheet Layout) */}
      <div suppressHydrationWarning className="space-y-4 pb-6 border-b-2 border-[#111111] flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 font-mono text-xs font-bold text-[#E63946] tracking-widest uppercase">
            <span>05 // THE NEWSROOM SUNDAY PUZZLE</span>
          </div>
          <h2 className="font-serif-editorial font-bold text-4xl sm:text-5xl lg:text-6xl text-[#111111] tracking-tight uppercase">
            DEV <span className="italic underline decoration-[#E63946]">CROSSWORD</span> & TELEGRAPH
          </h2>
        </div>

        {/* Right Header Metadata & Controls */}
        <div className="flex items-center gap-2 font-mono text-xs shrink-0">
          <span className="h-9 px-3 bg-[#FFFFFF] border border-[#111111] font-bold text-[#111111] inline-flex items-center gap-1.5 shadow-[2px_2px_0px_#111111] shrink-0">
            <Calendar className="w-3.5 h-3.5 text-[#E63946]" />
            <span>{puzzleData.date}</span>
          </span>
          <button
            onClick={() => fetchDailyPuzzle(true)}
            disabled={isGenerating}
            className="h-9 px-4 bg-[#E63946] text-white font-bold hover:bg-[#111111] transition-colors inline-flex items-center gap-2 border border-[#111111] shadow-[2px_2px_0px_#111111] disabled:opacity-50 shrink-0"
            title="Generate a fresh new dev crossword edition"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isGenerating ? "animate-spin" : ""}`} />
            <span>{isGenerating ? "GENERATING..." : "NEW PUZZLE"}</span>
          </button>
        </div>
      </div>

      {/* Dynamic Theme Banner Strip */}
      <div className="bg-[#FFFFFF] border-2 border-[#111111] shadow-[4px_4px_0px_#111111] p-3 sm:px-6 flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
        <div className="flex flex-wrap items-center gap-3">
          <span className="px-2 py-0.5 bg-[#111111] text-[#F7F5F0] font-bold text-[10px] uppercase tracking-wider">
            {puzzleData.edition}
          </span>
          <span className="font-serif-editorial text-lg sm:text-xl font-bold uppercase tracking-tight text-[#111111]">
            {puzzleData.themeTitle}
          </span>
        </div>
        <div className="flex items-center gap-2 text-[#555555] font-bold text-[11px]">
          <Newspaper className="w-3.5 h-3.5 text-[#E63946]" />
          <span>5×5 BROADSHEET MESH</span>
        </div>
      </div>

      {/* Main Newspaper Crossword Layout (Always Open & Playable) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-[#FFFFFF] border-2 border-[#111111] shadow-[6px_6px_0px_#111111] p-6 sm:p-8">
        {/* Left Column: 5x5 Crossword Grid */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center space-y-4">
          <div className="grid grid-cols-5 gap-1 bg-[#111111] p-1.5 border-4 border-[#111111] max-w-[320px] sm:max-w-[360px] w-full aspect-square">
            {grid.map((rowArr, r) =>
              rowArr.map((cellVal, c) => {
                const isBlack = puzzleData.grid[r]?.[c] === null;
                const isSelected = selectedCell.r === r && selectedCell.c === c;
                const cellNumber = puzzleData.cellNumbers?.[r]?.[c];
                const checkState = checkedResults[`${r}-${c}`];

                if (isBlack) {
                  return <div key={`${r}-${c}`} className="bg-[#111111] w-full h-full" />;
                }

                return (
                  <div
                    key={`${r}-${c}`}
                    onClick={() => {
                      setSelectedCell({ r, c });
                      inputsRef.current[r]?.[c]?.focus();
                    }}
                    className={`relative w-full h-full bg-[#FFFFFF] flex items-center justify-center cursor-pointer transition-colors border ${
                      isSelected
                        ? "bg-amber-100 border-[#E63946] ring-2 ring-[#E63946]"
                        : "border-[#111111] hover:bg-neutral-50"
                    } ${checkState === true ? "bg-emerald-100" : checkState === false ? "bg-rose-100" : ""}`}
                  >
                    {cellNumber && (
                      <span className="absolute top-0.5 left-1 font-mono text-[9px] font-bold text-[#111111] select-none leading-none">
                        {cellNumber}
                      </span>
                    )}
                    <input
                      ref={(el) => {
                        if (inputsRef.current[r]) {
                          inputsRef.current[r][c] = el;
                        }
                      }}
                      type="text"
                      maxLength={1}
                      value={cellVal}
                      onChange={(e) => handleCellChange(r, c, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(r, c, e)}
                      className="w-full h-full text-center font-mono font-black text-xl sm:text-2xl uppercase bg-transparent outline-none select-none text-[#111111]"
                    />
                  </div>
                );
              })
            )}
          </div>

          {/* Controls Bar */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2 font-mono text-xs">
            <button
              onClick={handleCheckAnswers}
              className="px-3 py-1.5 bg-[#111111] text-[#F7F5F0] font-bold border border-[#111111] hover:bg-[#E63946] transition-colors flex items-center gap-1"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>CHECK ANSWERS</span>
            </button>
            <button
              onClick={handleRevealLetter}
              className="px-3 py-1.5 bg-[#FFFFFF] text-[#111111] font-bold border border-[#111111] hover:bg-amber-50 transition-colors flex items-center gap-1"
            >
              <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
              <span>REVEAL LETTER</span>
            </button>
            <button
              onClick={handleResetPuzzle}
              className="px-3 py-1.5 bg-[#FFFFFF] text-[#111111] font-bold border border-[#111111] hover:bg-rose-50 transition-colors flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#E63946]" />
              <span>RESET</span>
            </button>
          </div>
        </div>

        {/* Right Column: Across & Down Editorial Clues */}
        <div className="lg:col-span-6 space-y-6 font-mono text-xs">
          {/* Across Clues */}
          <div className="space-y-2">
            <div className="font-bold text-[#E63946] uppercase tracking-wider border-b border-[#111111] pb-1 flex items-center justify-between">
              <span>ACROSS // HORIZONTAL DISPATCHES</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
            <div className="space-y-1.5">
              {puzzleData.clues?.filter((c) => c.direction === "across").map((clue) => (
                <div
                  key={clue.id}
                  onClick={() => handleSelectClue(clue)}
                  className={`p-2 border transition-all cursor-pointer ${
                    activeClueId === clue.id
                      ? "bg-amber-50 border-[#E63946] font-bold"
                      : "bg-[#F7F5F0] border-[#111111]/20 hover:border-[#111111]"
                  }`}
                >
                  <span className="text-[#E63946] font-bold mr-1.5">{clue.number}.</span>
                  <span className="text-[#111111]">{clue.clue}</span>
                  <span className="text-[#666666] text-[10px] ml-1.5">({clue.length} Letters)</span>
                </div>
              ))}
            </div>
          </div>

          {/* Down Clues */}
          <div className="space-y-2">
            <div className="font-bold text-[#111111] uppercase tracking-wider border-b border-[#111111] pb-1 flex items-center justify-between">
              <span>DOWN // VERTICAL WIRES</span>
              <ArrowRight className="w-3.5 h-3.5 rotate-90" />
            </div>
            <div className="space-y-1.5">
              {puzzleData.clues?.filter((c) => c.direction === "down").map((clue) => (
                <div
                  key={clue.id}
                  onClick={() => handleSelectClue(clue)}
                  className={`p-2 border transition-all cursor-pointer ${
                    activeClueId === clue.id
                      ? "bg-amber-50 border-[#E63946] font-bold"
                      : "bg-[#F7F5F0] border-[#111111]/20 hover:border-[#111111]"
                  }`}
                >
                  <span className="text-[#E63946] font-bold mr-1.5">{clue.number}.</span>
                  <span className="text-[#111111]">{clue.clue}</span>
                  <span className="text-[#666666] text-[10px] ml-1.5">({clue.length} Letters)</span>
                </div>
              ))}
            </div>
          </div>

          {/* Solved Banner Easter Egg */}
          {isSolved && (
            <div className="p-4 bg-emerald-50 border-2 border-emerald-600 text-emerald-900 space-y-2 animate-bounce">
              <div className="flex items-center gap-2 font-bold text-sm">
                <Flame className="w-5 h-5 text-[#E63946]" />
                <span>EXTRA! EXTRA! PUZZLE 100% SOLVED!</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                Congratulations! You solved today's Dev Crossword on {puzzleData.themeTitle}. Sahilpreet is ready to join your engineering crew!
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
