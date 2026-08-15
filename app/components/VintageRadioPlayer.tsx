"use client";

import React from "react";
import { Radio, Play, Pause, SkipForward, Globe, Disc, Activity, Zap } from "lucide-react";
import { useRadio } from "../context/RadioContext";

export default function VintageRadioPlayer() {
  const {
    selectedCountry,
    selectedGenre,
    isPlaying,
    isTuning,
    isFetching,
    offlineError,
    currentStation,
    freqDisplay,
    vinylCrackleEnabled,
    streamPing,
    signalQuality,
    liveBufferLatency,
    togglePlay,
    handleNextStation,
    handleCountryChange,
    handleGenreChange,
    toggleVinylCrackle,
    measureStreamPing,
    COUNTRIES,
    GENRES,
  } = useRadio();

  return (
    <div className="no-print p-3 bg-[#FFFFFF] border-2 border-[#111111] font-mono text-xs shadow-[4px_4px_0px_#111111] space-y-3 text-[#111111]">
      {/* Main Bar Info */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className={`p-2 border border-[#111111] ${
              isPlaying
                ? "bg-[#E63946] text-white"
                : offlineError
                ? "bg-rose-700 text-white"
                : "bg-[#F7F5F0] text-[#111111]"
            }`}
          >
            <Radio className={`w-4 h-4 ${isPlaying ? "animate-pulse" : ""}`} />
          </div>

          <div className="space-y-0.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-1.5 py-0.5 bg-[#111111] text-[#F7F5F0] font-bold text-[10px] uppercase tracking-wider">
                {freqDisplay}
              </span>
              {isFetching && (
                <span className="px-2 py-0.5 bg-sky-100 text-sky-800 border border-sky-600 font-bold text-[10px] animate-pulse flex items-center gap-1">
                  <span>🔍 SEARCHING STATIONS...</span>
                </span>
              )}
              {!isFetching && isTuning && (
                <span className="px-2 py-0.5 bg-amber-100 text-amber-900 border border-amber-600 font-bold text-[10px] animate-pulse flex items-center gap-1">
                  <span>⚡ TUNING FREQUENCY...</span>
                </span>
              )}
              {!isFetching && !isTuning && isPlaying && !offlineError && (
                <span className="flex items-center gap-1 font-bold text-[10px] text-emerald-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-ping"></span>
                  ON AIR • LIVE BROADCAST
                </span>
              )}
              {!isFetching && !isTuning && !isPlaying && !offlineError && (
                <span className="px-2 py-0.5 bg-[#F7F5F0] text-[#111111] border border-[#111111] font-bold text-[10px] flex items-center gap-1">
                  <span>📻 TUNE IN TO LISTEN</span>
                </span>
              )}
              {offlineError && !isFetching && (
                <span className="px-2 py-0.5 bg-rose-100 text-rose-800 border border-rose-600 font-bold text-[10px]">
                  ⚠️ STREAM OFFLINE
                </span>
              )}
            </div>
            <div className="font-bold text-[#111111] text-xs flex items-center gap-1.5 truncate max-w-xs sm:max-w-md">
              <span className="truncate">{currentStation?.name || "Tuning Live Radio..."}</span>
              <span className="text-[#666666] font-normal text-[10px] shrink-0">
                ({currentStation?.country || selectedCountry})
              </span>
            </div>
          </div>
        </div>

        {/* Animated Vinyl Equalizer Soundbars */}
        {isPlaying && !offlineError && (
          <div className="hidden xl:flex items-end gap-1 h-5">
            <span className="w-1 bg-[#111111] animate-[bounce_0.6s_infinite_100ms] h-full"></span>
            <span className="w-1 bg-[#E63946] animate-[bounce_0.6s_infinite_300ms] h-3/4"></span>
            <span className="w-1 bg-[#111111] animate-[bounce_0.6s_infinite_200ms] h-full"></span>
            <span className="w-1 bg-[#E63946] animate-[bounce_0.6s_infinite_400ms] h-3/4"></span>
            <span className="w-1 bg-[#111111] animate-[bounce_0.6s_infinite_150ms] h-5/6"></span>
          </div>
        )}

        {/* Controls & Worldwide Tuner */}
        <div className="flex items-center gap-2">
          {/* Country Selector */}
          <select
            value={selectedCountry}
            onChange={(e) => handleCountryChange(e.target.value)}
            className="h-8 px-2 bg-[#F7F5F0] border border-[#111111] font-bold text-[11px] outline-none cursor-pointer"
          >
            {COUNTRIES.map((c) => (
              <option key={c.code} value={c.code}>
                {c.name}
              </option>
            ))}
          </select>

          {/* Genre Selector */}
          <select
            value={selectedGenre}
            onChange={(e) => handleGenreChange(e.target.value)}
            className="h-8 px-2 bg-[#F7F5F0] border border-[#111111] font-bold text-[11px] outline-none cursor-pointer"
          >
            {GENRES.map((g) => (
              <option key={g.tag} value={g.tag}>
                {g.name}
              </option>
            ))}
          </select>

          <button
            onClick={togglePlay}
            className={`h-8 px-3 font-bold text-xs flex items-center gap-1.5 transition-all shrink-0 ${
              isPlaying
                ? "bg-[#111111] text-[#F7F5F0] hover:bg-[#E63946]"
                : "bg-[#E63946] text-white hover:bg-[#111111] animate-pulse shadow-[2px_2px_0px_#111111]"
            }`}
            title={isPlaying ? "Pause Radio" : "Tune in to Live Radio"}
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 fill-current" />
                <span>PAUSE</span>
              </>
            ) : isFetching ? (
              <>
                <Radio className="w-3.5 h-3.5 animate-spin" />
                <span>SEARCHING...</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>TUNE IN</span>
              </>
            )}
          </button>

          <button
            onClick={handleNextStation}
            className="h-8 p-2 bg-[#F7F5F0] border border-[#111111] text-[#111111] hover:bg-[#111111] hover:text-white transition-colors shrink-0"
            title="Next Worldwide Station"
          >
            <SkipForward className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={toggleVinylCrackle}
            className={`h-8 px-2 border border-[#111111] font-bold text-[10px] flex items-center gap-1.5 transition-all shrink-0 ${
              vinylCrackleEnabled
                ? "bg-[#E63946] text-white shadow-[2px_2px_0px_#111111]"
                : "bg-[#F7F5F0] text-[#111111] hover:bg-[#111111] hover:text-white"
            }`}
            title="Toggle Vintage Analog Vinyl Crackle Sound Effect"
          >
            <Disc className={`w-3.5 h-3.5 ${vinylCrackleEnabled ? "animate-spin" : ""}`} />
            <span>VINYL: {vinylCrackleEnabled ? "ON" : "OFF"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
