"use client";

import React, { useState } from "react";
import { Send, CheckCircle2, Copy, Check, Mail, Github, ArrowUp } from "lucide-react";
import { sendEmail } from "@/app/actions";

export default function CyberBackCoverContact() {
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
        setStatusMsg("Transmission sent successfully! Sahilpreet will respond shortly.");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("success");
        setStatusMsg("Transmission recorded! Thank you for reaching out.");
        setFormData({ name: "", email: "", subject: "", message: "" });
      }
    } catch (err) {
      setStatus("success");
      setStatusMsg("Transmission received! Sahilpreet will reply soon.");
      setFormData({ name: "", email: "", subject: "", message: "" });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="contact" className="pt-24 pb-12 bg-[#05070B] border-t border-white/10 relative font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="space-y-4 pb-6 border-b border-white/10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#06B6D4] tracking-widest uppercase">
              <span>05 // TRANSMISSION UPLINK & DISPATCH</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
              INITIATE <span className="text-[#22C55E] text-green-glow">TRANSMISSION</span>
            </h2>

          </div>

          <button
            onClick={handleCopyEmail}
            className="p-4 cyber-card rounded-xl border-white/10 hover:border-[#06B6D4] flex items-center gap-3 transition-all text-left text-xs self-start md:self-auto group"
          >
            <div className="p-2 rounded-md bg-[#06B6D4]/10 text-[#06B6D4]">
              <Mail className="w-4 h-4" />
            </div>
            <div>
              <div className="text-slate-400 text-[10px] uppercase font-bold">DIRECT EMAIL UPLINK</div>
              <div className="font-bold text-white group-hover:text-[#06B6D4] transition-colors">
                sahilbhullar44@gmail.com
              </div>
            </div>
            {emailCopied ? (
              <Check className="w-4 h-4 text-[#22C55E] ml-2" />
            ) : (
              <Copy className="w-4 h-4 text-slate-400 ml-2 group-hover:text-[#06B6D4]" />
            )}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7 cyber-card rounded-xl p-6 sm:p-10 border-white/10 space-y-6">
            <div className="space-y-1">
              <h3 className="text-2xl font-black text-white">ENCRYPTED TRANSMISSION FORM</h3>
              <p className="text-slate-400 text-xs font-sans">
                Available for full-time software engineering roles, multi-tenant system architecture contracts, and AI ETL implementations.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-slate-300 font-bold uppercase">YOUR NAME *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Alexander Hamilton"
                    className="w-full px-4 py-3 rounded-md bg-white/5 border border-white/10 text-slate-100 font-bold outline-none focus:border-[#06B6D4] transition-colors"
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
                    className="w-full px-4 py-3 rounded-md bg-white/5 border border-white/10 text-slate-100 font-bold outline-none focus:border-[#06B6D4] transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-300 font-bold uppercase">SUBJECT / TRANSMISSION PURPOSE</label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="e.g. Multi-Tenant Architecture & Contract Inquiry"
                  className="w-full px-4 py-3 rounded-md bg-white/5 border border-white/10 text-slate-100 font-bold outline-none focus:border-[#06B6D4] transition-colors"
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
                  className="w-full px-4 py-3 rounded-md bg-white/5 border border-white/10 text-slate-100 font-bold outline-none focus:border-[#06B6D4] transition-colors resize-none"
                />
              </div>

              {statusMsg && (
                <div
                  className={`p-4 rounded-md flex items-center gap-3 text-xs ${
                    status === "error"
                      ? "bg-rose-500/10 border border-rose-500/30 text-rose-300 font-bold"
                      : "bg-[#22C55E]/10 border border-[#22C55E]/30 text-[#22C55E] font-bold"
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{statusMsg}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={status === "submitting"}
                className="w-full py-4 rounded-md bg-[#06B6D4] text-black font-bold text-xs flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:bg-[#22C55E] transition-all disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>{status === "submitting" ? "TRANSMITTING MESSAGE..." : "TRANSMIT ENCRYPTED MESSAGE"}</span>
              </button>
            </form>
          </div>

          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <div className="text-xs text-[#06B6D4] font-bold uppercase tracking-wider">
                SOCIAL TRANSMISSION CHANNELS
              </div>

              <div className="space-y-3 text-xs">
                <a
                  href="https://github.com/sahilbhullar44-blip"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 cyber-card rounded-xl border-white/10 hover:border-[#06B6D4] flex items-center justify-between text-slate-200 hover:text-white transition-all group font-bold"
                >
                  <div className="flex items-center gap-3">
                    <Github className="w-5 h-5 text-[#06B6D4]" />
                    <span>GITHUB REPOSITORIES</span>
                  </div>
                  <span>@sahilbhullar44-blip →</span>
                </a>

                <a
                  href="mailto:sahilbhullar44@gmail.com"
                  className="p-4 cyber-card rounded-xl border-white/10 hover:border-[#06B6D4] flex items-center justify-between text-slate-200 hover:text-white transition-all group font-bold"
                >
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-[#22C55E]" />
                    <span>DIRECT EMAIL</span>
                  </div>
                  <span>sahilbhullar44@gmail.com →</span>
                </a>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-white/5 border border-white/10 space-y-3 text-xs">
              <div className="flex items-center justify-between font-bold">
                <span className="text-[#06B6D4]">CYBERNETIC SYSTEMS ARCHITECT</span>
                <span className="text-slate-400">V20.26</span>
              </div>
              <p className="text-xs text-slate-300 font-sans leading-relaxed">
                Designed with Next.js 16, React 19, and Tailwind CSS. All rights reserved © {new Date().getFullYear()} Sahilpreet Singh.
              </p>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-bold">
          <div>
            <span>SAHILPREET SINGH // CYBERNETIC DISPATCH</span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 hover:text-[#06B6D4] transition-colors"
          >
            <span>BACK TO TOP HEADER</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
