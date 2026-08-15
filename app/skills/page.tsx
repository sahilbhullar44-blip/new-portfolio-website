"use client";

import React from "react";
import NewspaperSkillsIndex from "@/app/components/NewspaperSkillsIndex";
import NewspaperBackCoverContact from "@/app/components/NewspaperBackCoverContact";

export default function SkillsPage() {
  return (
    <main className="min-h-screen bg-[#F7F5F0] text-[#111111] selection:bg-[#111111] selection:text-[#F7F5F0] overflow-x-hidden relative font-sans">
      <NewspaperSkillsIndex />
      <NewspaperBackCoverContact />
    </main>
  );
}
