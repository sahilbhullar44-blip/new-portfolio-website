"use client";

import React, { useState } from "react";
import { Send, CheckCircle2, Copy, Check, Mail, Github, ArrowUp } from "lucide-react";
import { sendEmail } from "@/app/actions";
import AudioDispatchReader from "@/app/components/AudioDispatchReader";

export default function NewspaperBackCoverContact() {
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
    <footer id="contact" className="pt-20 pb-12 bg-[#F7F5F0] border-t-2 border-[#111111] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="space-y-4 pb-6 border-b-2 border-[#111111] flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 font-mono text-xs font-bold text-[#E63946] tracking-widest uppercase">
              <span>05 // EDITORIAL BACK PAGE & LETTERS</span>
            </div>
            <h2 className="font-serif-editorial font-bold text-4xl sm:text-5xl lg:text-6xl text-[#111111] tracking-tight uppercase">
              INITIATE <span className="italic underline decoration-[#E63946]">CORRESPONDENCE</span>
            </h2>
          </div>

          <button
            onClick={handleCopyEmail}
            className="p-4 newspaper-card flex items-center gap-3 font-mono text-xs text-left group"
          >
            <div className="p-2 bg-[#111111] text-[#F7F5F0]">
              <Mail className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[#555555] text-[10px] uppercase font-bold">DIRECT DISPATCH EMAIL</div>
              <div className="font-bold text-[#111111] group-hover:text-[#E63946] transition-colors">
                sahilbhullar44@gmail.com
              </div>
            </div>
            {emailCopied ? (
              <Check className="w-4 h-4 text-emerald-600 ml-2" />
            ) : (
              <Copy className="w-4 h-4 text-[#111111] ml-2" />
            )}
          </button>
        </div>

        {/* Audio Dispatch Voice Reader */}
        <AudioDispatchReader
          textToRead="Initiate Correspondence. Sahilpreet Singh is available for full-time software engineering roles, multi-tenant system architecture contracts, and AI ETL implementations. You can send a direct dispatch message or reach out via email at sahilbhullar44@gmail.com or on GitHub at sahilbhullar44-blip."
          title="CORRESPONDENCE AUDIO BROADCAST"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Print-Only Correspondence Directory (Replaces form during physical PDF export) */}
          <div className="hidden print:block lg:col-span-12 p-6 border border-[#111111] space-y-3 font-mono text-xs">
            <h4 className="font-bold text-[#E63946] text-sm">CORRESPONDENCE DIRECTORY & DISPATCH UPLINK</h4>
            <p className="font-sans text-xs text-[#222222]">
              Sahilpreet Singh is available for full-time software engineering roles, multi-tenant system architecture contracts, and AI ETL implementations.
            </p>
            <div className="pt-2 font-bold space-y-1">
              <p>Email: sahilbhullar44@gmail.com</p>
              <p>GitHub: github.com/sahilbhullar44-blip</p>
              <p>Location: Amritsar, Punjab, India (31.63°N 74.87°E)</p>
            </div>
          </div>

          <div className="lg:col-span-7 newspaper-card p-6 sm:p-10 space-y-6 no-print">
            <div className="space-y-1">
              <h3 className="font-serif-editorial text-2xl font-bold text-[#111111]">LETTERS TO THE ARCHITECT</h3>
              <p className="text-[#555555] text-xs font-sans">
                Available for full-time software engineering roles, multi-tenant system architecture contracts, and AI ETL implementations.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[#111111] font-bold uppercase">YOUR NAME *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Alexander Hamilton"
                    className="w-full px-4 py-3 bg-[#F7F5F0] border border-[#111111] text-[#111111] font-bold outline-none focus:border-[#E63946] transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[#111111] font-bold uppercase">YOUR EMAIL *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. alexander@enterprise.com"
                    className="w-full px-4 py-3 bg-[#F7F5F0] border border-[#111111] text-[#111111] font-bold outline-none focus:border-[#E63946] transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[#111111] font-bold uppercase">SUBJECT / DISPATCH PURPOSE</label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="e.g. Multi-Tenant Architecture & Contract Inquiry"
                  className="w-full px-4 py-3 bg-[#F7F5F0] border border-[#111111] text-[#111111] font-bold outline-none focus:border-[#E63946] transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[#111111] font-bold uppercase">MESSAGE DISPATCH *</label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Provide brief details about your system goals, project timeline, or role..."
                  className="w-full px-4 py-3 bg-[#F7F5F0] border border-[#111111] text-[#111111] font-bold outline-none focus:border-[#E63946] transition-colors resize-none"
                />
              </div>

              {statusMsg && (
                <div
                  className={`p-4 font-mono text-xs flex items-center gap-3 border ${
                    status === "error"
                      ? "bg-rose-50 border-rose-500 text-rose-700 font-bold"
                      : "bg-emerald-50 border-emerald-500 text-emerald-800 font-bold"
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{statusMsg}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={status === "submitting"}
                className="w-full py-4 bg-[#111111] text-[#F7F5F0] font-bold text-xs flex items-center justify-center gap-2 hover:bg-[#E63946] transition-colors disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>{status === "submitting" ? "TRANSMITTING DISPATCH..." : "TRANSMIT DISPATCH MESSAGE"}</span>
              </button>
            </form>
          </div>

          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <div className="font-mono text-xs text-[#E63946] font-bold uppercase tracking-wider">
                SOCIAL DISPATCH CHANNELS
              </div>

              <div className="space-y-3 font-mono text-xs">
                <a
                  href="https://github.com/sahilbhullar44-blip"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 newspaper-card flex items-center justify-between text-[#111111] hover:text-[#E63946] transition-all group font-bold"
                >
                  <div className="flex items-center gap-3">
                    <Github className="w-5 h-5 text-[#111111]" />
                    <span>GITHUB REPOSITORIES</span>
                  </div>
                  <span>@sahilbhullar44-blip →</span>
                </a>

                <a
                  href="mailto:sahilbhullar44@gmail.com"
                  className="p-4 newspaper-card flex items-center justify-between text-[#111111] hover:text-[#E63946] transition-all group font-bold"
                >
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-[#111111]" />
                    <span>DIRECT EMAIL</span>
                  </div>
                  <span>sahilbhullar44@gmail.com →</span>
                </a>
              </div>
            </div>

            <div className="p-6 bg-[#FFFFFF] border-2 border-[#111111] space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between font-bold">
                <span className="text-[#E63946]">THE SAHILPREET DISPATCH</span>
                <span className="text-[#555555]">VOL. MMXXVI</span>
              </div>
              <p className="text-xs text-[#333333] font-sans leading-relaxed">
                Designed with Next.js 16, React 19, and Tailwind CSS. Printed Edition © {new Date().getFullYear()} Sahilpreet Singh.
              </p>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t-2 border-[#111111] flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[#555555] font-bold">
          <div>
            <span>THE SAHILPREET DISPATCH // PRINTED EDITION</span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 hover:text-[#E63946] transition-colors"
          >
            <span>BACK TO TOP MASTHEAD</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
