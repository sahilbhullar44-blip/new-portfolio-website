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
    <div
      className={`no-print p-4 bg-[#FFFFFF] border-2 border-[#111111] font-mono text-xs shadow-[4px_4px_0px_#111111] flex flex-wrap items-center justify-between gap-4 ${className}`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`p-2 border border-[#111111] ${
            isPlaying ? "bg-[#E63946] text-white" : "bg-[#F7F5F0] text-[#111111]"
          }`}
        >
          <Radio className={`w-4 h-4 ${isPlaying ? "animate-pulse" : ""}`} />
        </div>

        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-[#E63946] font-bold uppercase tracking-wider">
              {title}
            </span>
            {isPlaying && (
              <span className="flex items-center gap-1 font-bold text-[10px] text-emerald-700">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-ping"></span>
                ON AIR
              </span>
            )}
          </div>
          <div className="font-bold text-[#111111] text-xs">
            {isPlaying ? "TRANSMITTING VOICE DISPATCH..." : isPaused ? "BROADCAST PAUSED" : "LISTEN TO EDITORIAL AUDIO DISPATCH"}
          </div>
        </div>
      </div>

      {/* Vintage Radio Sound Bars Animation */}
      {isPlaying && (
        <div className="hidden sm:flex items-end gap-1 h-6">
          <span className="w-1 bg-[#111111] animate-[bounce_0.6s_infinite_100ms] h-full"></span>
          <span className="w-1 bg-[#E63946] animate-[bounce_0.6s_infinite_300ms] h-3/4"></span>
          <span className="w-1 bg-[#111111] animate-[bounce_0.6s_infinite_200ms] h-full"></span>
          <span className="w-1 bg-[#E63946] animate-[bounce_0.6s_infinite_400ms] h-1/2"></span>
          <span className="w-1 bg-[#111111] animate-[bounce_0.6s_infinite_150ms] h-5/6"></span>
        </div>
      )}

      {/* Audio Controls */}
      <div className="flex items-center gap-2">
        {!isPlaying ? (
          <button
            onClick={handlePlay}
            className="px-3 py-1.5 bg-[#111111] text-[#F7F5F0] font-bold flex items-center gap-1.5 hover:bg-[#E63946] transition-colors"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>PLAY DISPATCH</span>
          </button>
        ) : (
          <button
            onClick={handlePause}
            className="px-3 py-1.5 bg-[#111111] text-[#F7F5F0] font-bold flex items-center gap-1.5 hover:bg-[#E63946] transition-colors"
          >
            <Pause className="w-3.5 h-3.5 fill-current" />
            <span>PAUSE</span>
          </button>
        )}

        {(isPlaying || isPaused) && (
          <button
            onClick={handleStop}
            className="px-3 py-1.5 bg-[#F7F5F0] border border-[#111111] text-[#111111] font-bold flex items-center gap-1.5 hover:bg-[#111111] hover:text-white transition-colors"
          >
            <Square className="w-3.5 h-3.5 fill-current" />
            <span>STOP</span>
          </button>
        )}
      </div>
    </div>
  );
}
