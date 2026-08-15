"use client";

import React, { useState, useRef } from "react";
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Radio, Search, Sparkles } from "lucide-react";

export interface CassetteTrack {
  id: string;
  side: "SIDE A" | "SIDE B";
  title: string;
  artist: string;
  duration: string;
  youtubeId: string;
}

const MIXTAPE_TRACKS: CassetteTrack[] = [
  {
    id: "tape-1",
    side: "SIDE A",
    title: "LOFI GIRL 24/7 CODING BEATS",
    artist: "YouTube Music Official Stream",
    duration: "LIVE STREAM",
    youtubeId: "jfKfPfyJRdk",
  },
  {
    id: "tape-2",
    side: "SIDE A",
    title: "DILJIT DOSANJH HITS & LOVER",
    artist: "Diljit Dosanjh Official",
    duration: "LIVE STREAM",
    youtubeId: "mH_LFkWxpI0",
  },
  {
    id: "tape-3",
    side: "SIDE B",
    title: "SIDHU MOOSE WALA - 295 / LAST RIDE",
    artist: "Sidhu Moose Wala Official",
    duration: "LIVE STREAM",
    youtubeId: "n_FCrCQ6-bA",
  },
  {
    id: "tape-4",
    side: "SIDE B",
    title: "COKE STUDIO PASOORI & SUFI",
    artist: "Ali Sethi x Shae Gill",
    duration: "LIVE STREAM",
    youtubeId: "5Eqb_-j3FDA",
  },
];

const SONG_SEARCH_DATABASE: Record<string, { id: string; title: string; artist: string }> = {
  "diljit": { id: "mH_LFkWxpI0", title: "Diljit Dosanjh - Lover & Top Punjabi Hits", artist: "Diljit Dosanjh Official" },
  "sidhu": { id: "n_FCrCQ6-bA", title: "Sidhu Moose Wala - 295 & The Last Ride", artist: "Sidhu Moose Wala Official" },
  "pasoori": { id: "5Eqb_-j3FDA", title: "Pasoori - Coke Studio Season 14", artist: "Ali Sethi x Shae Gill" },
  "coke": { id: "5Eqb_-j3FDA", title: "Coke Studio Sufi & Fusion Classics", artist: "Coke Studio Official" },
  "arijit": { id: "ClwsP54rWlg", title: "Arijit Singh Romantic & Sad Songs Medley", artist: "Arijit Singh Official" },
  "karan": { id: "vX2cDW8LUWk", title: "Karan Aujla - Softly / Tauba Tauba", artist: "Karan Aujla Official" },
  "lofi": { id: "jfKfPfyJRdk", title: "Lofi Girl 24/7 Chill Beats to Relax/Study", artist: "Lofi Girl Official" },
  "bhangra": { id: "mH_LFkWxpI0", title: "Bhangra Beats 24/7 Live Stream", artist: "Desi Dispatch" },
  "punjabi": { id: "n_FCrCQ6-bA", title: "Top Punjabi Classics & Hits", artist: "Punjabi Dispatch" },
  "synthwave": { id: "4xDzrJKXOOY", title: "Retro Synthwave late night coding wire", artist: "Cyberwave 80s" },
};

const PRESET_QUERIES = [
  "Diljit Dosanjh",
  "Sidhu Moose Wala",
  "Coke Studio Pasoori",
  "Arijit Singh",
  "Karan Aujla",
  "Lofi Chill Beats",
];

function extractYoutubeId(input: string): { id: string; title: string; artist: string } {
  const cleanInput = input.trim();
  
  // Check direct URL or video ID format
  const urlMatch = cleanInput.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
  if (urlMatch && urlMatch[1]) {
    return { id: urlMatch[1], title: `Custom Track: ${urlMatch[1]}`, artist: "YouTube Stream" };
  }

  // Check 11-char direct video ID
  if (/^[\w-]{11}$/.test(cleanInput)) {
    return { id: cleanInput, title: `Track ID: ${cleanInput}`, artist: "YouTube Stream" };
  }

  // Search keyword database
  const lower = cleanInput.toLowerCase();
  for (const [key, data] of Object.entries(SONG_SEARCH_DATABASE)) {
    if (lower.includes(key)) {
      return { id: data.id, title: data.title, artist: data.artist };
    }
  }

  // Default fallback stream
  return { id: "mH_LFkWxpI0", title: `Search Stream: "${cleanInput}"`, artist: "YouTube Music Dispatch" };
}

export default function RetroCassetteDeck() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [soundMuted, setSoundMuted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCustomTrack, setActiveCustomTrack] = useState<{ id: string; title: string; artist: string } | null>(null);

  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  const currentTrack = MIXTAPE_TRACKS[currentTrackIndex];

  // Web Audio API Mechanical Button Click
  const playMechanicalClick = () => {
    try {
      if (typeof window === "undefined") return;
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;

      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "square";
      osc.frequency.setValueAtTime(300, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.045);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch {
      // Audio synth fallback
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    playMechanicalClick();
    const resolved = extractYoutubeId(searchQuery);
    setActiveCustomTrack(resolved);
    setIsPlaying(true);
  };

  const triggerPresetSearch = (q: string) => {
    playMechanicalClick();
    setSearchQuery(q);
    const resolved = extractYoutubeId(q);
    setActiveCustomTrack(resolved);
    setIsPlaying(true);
  };

  const togglePlay = () => {
    playMechanicalClick();
    setIsPlaying(!isPlaying);
  };

  const handleNextTrack = () => {
    playMechanicalClick();
    setActiveCustomTrack(null);
    const nextIdx = (currentTrackIndex + 1) % MIXTAPE_TRACKS.length;
    setCurrentTrackIndex(nextIdx);
  };

  const handlePrevTrack = () => {
    playMechanicalClick();
    setActiveCustomTrack(null);
    const prevIdx = (currentTrackIndex - 1 + MIXTAPE_TRACKS.length) % MIXTAPE_TRACKS.length;
    setCurrentTrackIndex(prevIdx);
  };

  const toggleMute = () => {
    playMechanicalClick();
    setSoundMuted(!soundMuted);
  };

  // Derive embed URL with direct verified YouTube Video ID
  const getEmbedSrc = () => {
    const muteParam = soundMuted ? 1 : 0;
    const targetId = activeCustomTrack ? activeCustomTrack.id : currentTrack.youtubeId;
    return `https://www.youtube-nocookie.com/embed/${targetId}?autoplay=1&mute=${muteParam}&enablejsapi=1&loop=1&rel=0&modestbranding=1&iv_load_policy=3`;
  };

  const displayTitle = activeCustomTrack ? activeCustomTrack.title : currentTrack.title;
  const displayArtist = activeCustomTrack ? activeCustomTrack.artist : currentTrack.artist;

  return (
    <section id="cassette-deck" suppressHydrationWarning className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 no-print">
      {/* Header */}
      <div suppressHydrationWarning className="space-y-2 pb-4 border-b-2 border-[#111111] flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 font-mono text-xs font-bold text-[#E63946] tracking-widest uppercase">
            <Radio className="w-4 h-4 text-[#E63946]" />
            <span>05 // ANALOG MIXTAPE CASSETTE DECK</span>
          </div>
          <h2 className="font-serif-editorial font-bold text-3xl sm:text-4xl text-[#111111] tracking-tight uppercase">
            SAHILPREET'S <span className="italic underline decoration-[#E63946]">CASSETTE DECK</span>
          </h2>
        </div>

        <button
          onClick={toggleMute}
          className={`h-8 px-3 border font-mono font-bold text-[11px] flex items-center gap-2 transition-colors ${
            soundMuted ? "bg-[#E63946] text-white border-[#E63946]" : "bg-[#FFFFFF] text-[#111111] border-[#111111]"
          }`}
        >
          {soundMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-[#E63946]" />}
          <span>AUDIO: {soundMuted ? "MUTED" : "ON"}</span>
        </button>
      </div>

      {/* Cassette Deck Shell */}
      <div suppressHydrationWarning className="newspaper-card p-6 sm:p-8 bg-[#18181A] border-2 border-[#111111] space-y-6 text-[#F7F5F0]">
        {/* Live Search Bar */}
        <div className="space-y-3 bg-[#111111] p-4 border border-[#333336] rounded-md font-mono text-xs">
          <div className="flex items-center justify-between text-[#B5B2A8] font-bold text-[11px]">
            <span className="flex items-center gap-1.5 text-[#E63946]">
              <Search className="w-3.5 h-3.5" />
              SEARCH ANY SONG OR ARTIST WORLDWIDE:
            </span>
            <span className="hidden sm:inline text-emerald-500">✦ INSTANT MUSIC RESOLVER</span>
          </div>

          <form onSubmit={handleSearchSubmit} className="flex gap-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="e.g. Diljit Dosanjh, Sidhu Moose Wala, Coke Studio Pasoori, Lofi Chill..."
              className="flex-1 h-10 px-3 bg-[#18181A] border border-[#444448] text-[#F7F5F0] placeholder:text-[#666666] focus:outline-none focus:border-[#E63946] font-mono text-xs transition-colors"
            />
            <button
              type="submit"
              className="h-10 px-5 bg-[#E63946] text-white font-bold flex items-center gap-2 hover:bg-red-700 transition-colors shrink-0 shadow-[2px_2px_0px_#000000]"
            >
              <Search className="w-4 h-4" />
              <span>SEARCH & PLAY</span>
            </button>
          </form>

          {/* Quick Preset Song Chips */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <span className="text-[10px] text-[#888888] font-bold uppercase">QUICK PRESETS:</span>
            {PRESET_QUERIES.map((q) => (
              <button
                key={q}
                type="button"
                onClick={() => triggerPresetSearch(q)}
                className="px-2 py-0.5 bg-[#222225] border border-[#38383C] text-[#B5B2A8] hover:text-white hover:border-[#E63946] text-[10px] font-bold transition-all"
              >
                + {q}
              </button>
            ))}
          </div>
        </div>

        {/* Top Deck Brand & Status Display */}
        <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-xs border-b border-[#333336] pb-4">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 bg-[#E63946] text-white font-bold text-[10px] tracking-wider uppercase flex items-center gap-1">
              HI-FI STEREO
            </span>
            <span className="text-[#B5B2A8] font-bold truncate max-w-[320px]">
              {displayTitle}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className={`w-2.5 h-2.5 rounded-full ${isPlaying ? "bg-emerald-500 animate-pulse" : "bg-red-600"}`}></span>
            <span className="font-bold tracking-wider">{isPlaying ? "STREAMING LIVE" : "DECK PAUSED"}</span>
          </div>
        </div>

        {/* Cassette Window & Spinning Reels (Pure Audio Deck) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Cassette Tape Body (Left) */}
          <div className="lg:col-span-7 bg-[#111111] border-2 border-[#333336] p-6 rounded-md relative shadow-inner space-y-4">
            {/* Cassette Label Header */}
            <div className="bg-[#F7F5F0] text-[#111111] p-3 border border-[#333336] font-mono text-xs flex items-center justify-between font-bold">
              <span className="px-2 py-0.5 bg-[#111111] text-white text-[10px] uppercase">
                {activeCustomTrack ? "SEARCH TRACK" : currentTrack.side}
              </span>
              <span className="truncate max-w-[240px] uppercase">{displayTitle}</span>
              <span className="text-[#E63946]">{activeCustomTrack ? "LIVE" : currentTrack.duration}</span>
            </div>

            {/* Spinning Reel Mechanical Window (Pure Audio UI) */}
            <div className="h-44 bg-[#000000] border-2 border-[#333336] rounded p-4 flex items-center justify-around relative overflow-hidden">
              {/* Left Reel */}
              <div className="w-24 h-24 rounded-full border-4 border-[#333336] bg-[#1F1F22] flex items-center justify-center relative shadow-md">
                <div
                  className={`w-16 h-16 rounded-full border-2 border-dashed border-[#F7F5F0]/60 flex items-center justify-center ${
                    isPlaying ? "animate-spin" : ""
                  }`}
                  style={{ animationDuration: "3s" }}
                >
                  <div className="w-6 h-6 rounded-full bg-[#111111] border border-[#F7F5F0]"></div>
                </div>
              </div>

              {/* Tape Path Bridge */}
              <div className="flex-1 h-3 bg-[#4A2E1A] mx-4 border-y border-[#6B4426] relative flex items-center justify-center">
                <div className="w-full h-0.5 bg-[#8C5832] opacity-60"></div>
              </div>

              {/* Right Reel */}
              <div className="w-24 h-24 rounded-full border-4 border-[#333336] bg-[#1F1F22] flex items-center justify-center relative shadow-md">
                <div
                  className={`w-16 h-16 rounded-full border-2 border-dashed border-[#F7F5F0]/60 flex items-center justify-center ${
                    isPlaying ? "animate-spin" : ""
                  }`}
                  style={{ animationDuration: "3s" }}
                >
                  <div className="w-6 h-6 rounded-full bg-[#111111] border border-[#F7F5F0]"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Track Info & Mechanical Controls (Right) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2 border-b border-[#333336] pb-4 font-mono">
              <div className="text-[10px] text-[#E63946] font-bold uppercase tracking-widest flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                {activeCustomTrack ? "DYNAMIC SEARCH TRACK" : `PLAYING TRACK (${currentTrackIndex + 1}/${MIXTAPE_TRACKS.length})`}
              </div>
              <h3 className="font-serif-editorial font-bold text-2xl text-[#F7F5F0] truncate">
                {displayTitle}
              </h3>
              <p className="text-xs text-[#B5B2A8] font-semibold">{displayArtist}</p>
            </div>

            {/* Deck Physical Buttons */}
            <div className="grid grid-cols-3 gap-3 font-mono text-xs font-bold">
              <button
                onClick={handlePrevTrack}
                className="h-12 bg-[#222225] border border-[#444448] text-[#F7F5F0] flex items-center justify-center gap-1.5 hover:bg-[#E63946] hover:border-[#E63946] transition-colors active:translate-y-0.5"
                title="Rewind / Previous Preset Track"
              >
                <SkipBack className="w-4 h-4" />
                <span>REW</span>
              </button>

              <button
                onClick={togglePlay}
                className={`h-12 border flex items-center justify-center gap-1.5 transition-colors active:translate-y-0.5 ${
                  isPlaying
                    ? "bg-[#E63946] text-white border-[#E63946]"
                    : "bg-[#F7F5F0] text-[#111111] border-[#F7F5F0] hover:bg-[#E63946] hover:text-white hover:border-[#E63946]"
                }`}
                title={isPlaying ? "Pause Stream" : "Play Stream"}
              >
                {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
                <span>{isPlaying ? "PAUSE" : "PLAY"}</span>
              </button>

              <button
                onClick={handleNextTrack}
                className="h-12 bg-[#222225] border border-[#444448] text-[#F7F5F0] flex items-center justify-center gap-1.5 hover:bg-[#E63946] hover:border-[#E63946] transition-colors active:translate-y-0.5"
                title="Fast Forward / Next Preset Track"
              >
                <SkipForward className="w-4 h-4" />
                <span>FFWD</span>
              </button>
            </div>

            {/* Track Selector Buttons */}
            <div className="space-y-2 pt-2 font-mono text-[11px]">
              <div className="text-[10px] text-[#B5B2A8] uppercase font-bold">SELECT PRESET TRACKS:</div>
              <div className="grid grid-cols-2 gap-2">
                {MIXTAPE_TRACKS.map((t, idx) => (
                  <button
                    key={t.id}
                    onClick={() => {
                      playMechanicalClick();
                      setActiveCustomTrack(null);
                      setCurrentTrackIndex(idx);
                      setIsPlaying(true);
                    }}
                    className={`h-8 px-2 border font-bold text-[10px] text-left truncate transition-all ${
                      !activeCustomTrack && currentTrackIndex === idx
                        ? "bg-[#E63946] text-white border-[#E63946]"
                        : "bg-[#222225] text-[#B5B2A8] border-[#444448] hover:text-white"
                    }`}
                  >
                    {idx + 1}. {t.title}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Offscreen Direct YouTube Audio Engine (Pure Audio Deck, Zero Video) */}
        {isPlaying && (
          <div className="fixed -top-[9999px] -left-[9999px] w-[320px] h-[180px] pointer-events-none opacity-0 overflow-hidden">
            <iframe
              ref={iframeRef}
              src={getEmbedSrc()}
              title="YouTube Music Direct Audio Stream Engine"
              allow="autoplay; encrypted-media"
            />
          </div>
        )}
      </div>
    </section>
  );
}
