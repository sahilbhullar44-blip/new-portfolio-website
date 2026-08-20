"use client";

import React, { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX, Play, Pause, Square, Radio, Sparkles } from "lucide-react";
import { useRadio } from "../context/RadioContext";

interface AudioDispatchReaderProps {
  textToRead: string;
  title?: string;
  className?: string;
}

export default function AudioDispatchReader({
  textToRead,
  title = "AUDIO DISPATCH BROADCAST",
  className = "",
}: AudioDispatchReaderProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [supported, setSupported] = useState(false);
  const radio = useRadio();
  const wasRadioPlayingRef = useRef(false);

  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      setSupported(true);
    }
  }, []);

  const handlePlay = () => {
    if (!supported) return;

    if (isPaused) {
      if (radio.isPlaying) {
        wasRadioPlayingRef.current = true;
        radio.togglePlay();
      }
      window.speechSynthesis.resume();
      setIsPlaying(true);
      setIsPaused(false);
      return;
    }

    if (radio.isPlaying) {
      wasRadioPlayingRef.current = true;
      radio.togglePlay();
    }

    window.speechSynthesis.cancel(); // Reset any ongoing speech

    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.rate = 0.95; // Slightly slower, clear newsroom delivery
    utterance.pitch = 1.0;

    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
      if (wasRadioPlayingRef.current) {
        wasRadioPlayingRef.current = false;
        if (!radio.isPlaying) {
          radio.togglePlay();
        }
      }
    };

    utterance.onerror = () => {
      setIsPlaying(false);
      setIsPaused(false);
      if (wasRadioPlayingRef.current) {
        wasRadioPlayingRef.current = false;
        if (!radio.isPlaying) {
          radio.togglePlay();
        }
      }
    };

    window.speechSynthesis.speak(utterance);
    setIsPlaying(true);
    setIsPaused(false);
  };

  const handlePause = () => {
    if (!supported) return;
    window.speechSynthesis.pause();
    setIsPlaying(false);
    setIsPaused(true);
  };

  const handleStop = () => {
    if (!supported) return;
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setIsPaused(false);
    if (wasRadioPlayingRef.current) {
      wasRadioPlayingRef.current = false;
      if (!radio.isPlaying) {
        radio.togglePlay();
      }
    }
  };

  if (!supported) return null;

  return (
    <>
      {/* Desktop Layout - Shown on sm: and above */}
      <div
        className={`hidden sm:flex no-print p-4 bg-[#FFFFFF] border border-[#111111] font-mono shadow-[4px_4px_0px_#111111] items-center justify-between gap-4 text-left ${className}`}
      >
        <div className="flex items-center gap-4">
          <div className="p-2.5 border border-[#111111]/20 text-[#111111]">
            <Radio className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] text-[#E63946] font-bold uppercase tracking-wider">
              {title}
            </div>
            <div className="font-bold text-[#111111] text-sm leading-tight">
              {isPlaying ? "TRANSMITTING VOICE DISPATCH..." : isPaused ? "BROADCAST PAUSED" : "LISTEN TO EDITORIAL AUDIO DISPATCH"}
            </div>
            {(isPlaying || isPaused) && (
              <div className="flex items-center gap-3 pt-1">
                <button
                  onClick={handleStop}
                  className="text-[10px] text-[#E63946] hover:text-[#111111] font-bold underline decoration-dotted transition-colors"
                >
                  [STOP BROADCAST]
                </button>
                {isPlaying && (
                  <div className="flex items-end gap-0.5 h-3">
                    <span className="w-0.5 audio-bar animate-[bounce_0.6s_infinite_100ms] h-full"></span>
                    <span className="w-0.5 bg-[#E63946] animate-[bounce_0.6s_infinite_300ms] h-3/4"></span>
                    <span className="w-0.5 audio-bar animate-[bounce_0.6s_infinite_200ms] h-full"></span>
                    <span className="w-0.5 bg-[#E63946] animate-[bounce_0.6s_infinite_400ms] h-1/2"></span>
                    <span className="w-0.5 audio-bar animate-[bounce_0.6s_infinite_150ms] h-5/6"></span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <button
          onClick={isPlaying ? handlePause : handlePlay}
          className={`px-4 py-2 font-bold text-xs border border-[#111111] shadow-[2px_2px_0px_#111111] flex items-center gap-2 transition-all shrink-0 ${
            isPlaying
              ? "bg-[#E63946] text-white hover:bg-[#111111]"
              : "bg-[#111111] text-white hover:bg-[#E63946]"
          }`}
        >
          {isPlaying ? (
            <>
              <Pause className="w-3 h-3 fill-current" />
              <span>PAUSE DISPATCH</span>
            </>
          ) : (
            <>
              <Play className="w-3 h-3 fill-current" />
              <span>PLAY DISPATCH</span>
            </>
          )}
        </button>
      </div>

      {/* Mobile Layout - Hidden on sm: and above */}
      <div
        className={`sm:hidden no-print p-3.5 bg-[#FFFFFF] border border-[#111111] font-mono shadow-[3px_3px_0px_#111111] flex items-center gap-4 text-left ${className}`}
      >
        <button
          onClick={isPlaying ? handlePause : handlePlay}
          className={`w-12 h-12 rounded-full border border-[#111111] flex items-center justify-center transition-colors shrink-0 ${
            isPlaying 
              ? "bg-[#E63946] text-white hover:bg-[#111111]" 
              : "bg-[#111111] text-white hover:bg-[#E63946]"
          }`}
          title={isPlaying ? "Pause Broadcast" : "Play Broadcast"}
        >
          {isPlaying ? (
            <Pause className="w-5 h-5 fill-current" />
          ) : (
            <Play className="w-5 h-5 fill-current ml-0.5" />
          )}
        </button>

        <div className="flex-1 min-w-0 space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[9px] text-[#E63946] font-bold uppercase tracking-wider whitespace-nowrap">
              {title}
            </span>
            {isPlaying && (
              <span className="inline-flex items-center gap-1 font-bold text-[9px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 border border-emerald-300">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-ping"></span>
                ON AIR
              </span>
            )}
            {isPaused && (
              <span className="inline-flex items-center gap-1 font-bold text-[9px] text-amber-700 bg-amber-50 px-1.5 py-0.5 border border-amber-300">
                PAUSED
              </span>
            )}
          </div>

          <div className="font-bold text-[#111111] text-xs leading-tight truncate">
            {isPlaying ? "TRANSMITTING VOICE DISPATCH..." : isPaused ? "BROADCAST PAUSED" : "LISTEN TO EDITORIAL READOUT"}
          </div>

          {(isPlaying || isPaused) && (
            <div className="flex items-center gap-3 pt-0.5">
              <button
                onClick={handleStop}
                className="text-[10px] text-[#E63946] hover:text-[#111111] font-bold underline decoration-dotted transition-colors"
              >
                [STOP BROADCAST]
              </button>
              
              {isPlaying && (
                <div className="flex items-end gap-0.5 h-3">
                  <span className="w-0.5 audio-bar animate-[bounce_0.6s_infinite_100ms] h-full"></span>
                  <span className="w-0.5 bg-[#E63946] animate-[bounce_0.6s_infinite_300ms] h-3/4"></span>
                  <span className="w-0.5 audio-bar animate-[bounce_0.6s_infinite_200ms] h-full"></span>
                  <span className="w-0.5 bg-[#E63946] animate-[bounce_0.6s_infinite_400ms] h-1/2"></span>
                  <span className="w-0.5 audio-bar animate-[bounce_0.6s_infinite_150ms] h-5/6"></span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
