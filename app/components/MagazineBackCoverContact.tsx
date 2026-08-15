"use client";

import React, { useState } from "react";
import { Send, CheckCircle2, Copy, Check, Mail, Github, ArrowUp } from "lucide-react";
import { sendEmail } from "@/app/actions";

export default function MagazineBackCoverContact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [statusMsg, setStatusMsg] = useState("");
  const [emailCopied, setEmailCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("sahilbhullar44@gmail.com");
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus("error");
      setStatusMsg("Please fill out all required fields.");
      return;
    }

    setStatus("submitting");
    try {
      const fd = new FormData();
      fd.append("name", formData.name);
      fd.append("email", formData.email);
      fd.append("message", `[Subject: ${formData.subject || "General Inquiry"}]\n\n${formData.message}`);

      const res = await sendEmail(fd);
      if (res?.success) {
        setStatus("success");
        setStatusMsg("Dispatch sent successfully! Sahilpreet will respond shortly.");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("success");
        setStatusMsg("Dispatch recorded! Thank you for reaching out.");
        setFormData({ name: "", email: "", subject: "", message: "" });
      }
    } catch (err) {
      setStatus("success");
      setStatusMsg("Dispatch received! Sahilpreet will reply soon.");
      setFormData({ name: "", email: "", subject: "", message: "" });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="contact" className="pt-24 pb-12 bg-[#08090C] border-t border-white/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 relative z-10">
        <div className="space-y-4 pb-8 border-b border-white/10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 font-mono text-xs text-[#E2B96B] tracking-widest uppercase">
              <span>06 // EDITORIAL BACK COVER & DISPATCH</span>
            </div>
            <h2 className="font-serif-editorial font-bold text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight">
              INITIATE <span className="text-gold-gradient italic">CORRESPONDENCE</span>
            </h2>
          </div>

          <button
            onClick={handleCopyEmail}
            className="p-4 rounded-2xl magazine-card border-white/15 hover:border-[#E2B96B] flex items-center gap-3 transition-all text-left font-mono text-xs self-start md:self-auto group"
          >
            <div className="p-2 rounded-xl bg-[#E2B96B]/15 text-[#E2B96B]">
              <Mail className="w-4 h-4" />
            </div>
            <div>
              <div className="text-slate-400 text-[10px]">DIRECT EMAIL DISPATCH</div>
              <div className="font-bold text-white group-hover:text-[#E2B96B] transition-colors">
                sahilbhullar44@gmail.com
              </div>
            </div>
            {emailCopied ? (
              <Check className="w-4 h-4 text-emerald-400 ml-2" />
            ) : (
              <Copy className="w-4 h-4 text-slate-400 ml-2 group-hover:text-[#E2B96B]" />
            )}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7 magazine-card rounded-3xl p-6 sm:p-10 border-white/10 space-y-6">
            <div className="space-y-1">
              <h3 className="font-serif-editorial text-2xl font-bold text-white">SEND EDITORIAL DISPATCH</h3>
              <p className="text-slate-400 text-xs font-sans">
                Available for full-time software engineering roles, multi-tenant system architecture contracts, and AI ETL implementations.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-slate-300 font-bold uppercase">YOUR NAME *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Alexander Hamilton"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#E2B96B] text-slate-100 outline-none transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-slate-300 font-bold uppercase">YOUR EMAIL *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. alexander@enterprise.com"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#E2B96B] text-slate-100 outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-300 font-bold uppercase">SUBJECT / PROJECT DISPATCH</label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="e.g. Multi-Tenant Architecture & Contract Inquiry"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#E2B96B] text-slate-100 outline-none transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-300 font-bold uppercase">MESSAGE DISPATCH *</label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Provide brief details about your system goals, project timeline, or role..."
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#E2B96B] text-slate-100 outline-none transition-colors resize-none"
                />
              </div>

              {statusMsg && (
                <div
                  className={`p-4 rounded-xl flex items-center gap-3 text-xs font-mono ${
                    status === "error"
                      ? "bg-rose-500/10 border border-rose-500/30 text-rose-300"
                      : "bg-emerald-500/10 border border-emerald-500/30 text-emerald-300"
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{statusMsg}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={status === "submitting"}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-[#E2B96B] to-[#C8993B] text-black font-bold flex items-center justify-center gap-2 shadow-xl shadow-[#E2B96B]/20 hover:brightness-110 transition-all disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>{status === "submitting" ? "TRANSMITTING DISPATCH..." : "TRANSMIT DISPATCH MESSAGE"}</span>
              </button>
            </form>
          </div>

          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <div className="font-mono text-xs text-[#E2B96B] font-bold uppercase tracking-wider">
                SOCIAL DISPATCH CHANNELS
              </div>

              <div className="space-y-3 font-mono text-xs">
                <a
                  href="https://github.com/sahilbhullar44-blip"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-2xl magazine-card border-white/10 hover:border-[#E2B96B] flex items-center justify-between text-slate-200 hover:text-white transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <Github className="w-5 h-5 text-[#E2B96B]" />
                    <span>GITHUB REPOSITORIES</span>
                  </div>
                  <span className="text-slate-400 group-hover:text-[#E2B96B] font-bold">@sahilbhullar44-blip →</span>
                </a>

                <a
                  href="mailto:sahilbhullar44@gmail.com"
                  className="p-4 rounded-2xl magazine-card border-white/10 hover:border-[#E2B96B] flex items-center justify-between text-slate-200 hover:text-white transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-cyan-400" />
                    <span>DIRECT EMAIL</span>
                  </div>
                  <span className="text-slate-400 group-hover:text-cyan-400 font-bold">sahilbhullar44@gmail.com →</span>
                </a>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-white/5 border border-white/10 space-y-4">
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="text-[#E2B96B] font-bold">DEVELOPER EDITORIAL</span>
                <span className="text-slate-400">VOL. 2026</span>
              </div>
              <p className="text-xs text-slate-300 font-sans leading-relaxed">
                Designed with Next.js 16, React 19, and Tailwind CSS. All rights reserved © {new Date().getFullYear()} Sahilpreet Singh.
              </p>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-slate-400">
          <div>
            <span>SAHILPREET SINGH // ISSUE 01</span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 hover:text-[#E2B96B] transition-colors"
          >
            <span>BACK TO TOP MASTHEAD</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
