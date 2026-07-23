"use client";

import React, { useState } from "react";

interface KaliYugaDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function KaliYugaDrawer({ isOpen, onClose }: KaliYugaDrawerProps) {
  const [activeTab, setActiveTab] = useState<"lore" | "pods" | "cycles">("lore");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-lg bg-slate-900 border-l border-amber-500/30 h-full p-6 flex flex-col justify-between font-mono overflow-y-auto">
        <div>
          {/* Header */}
          <div className="flex justify-between items-center border-b border-amber-500/20 pb-4 mb-6">
            <div>
              <h2 className="text-lg font-bold text-amber-300">THE KALI YUGA CYCLE</h2>
              <p className="text-xs text-slate-400">EPOCHAL LORE &amp; AUDIO PODS</p>
            </div>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-amber-400 text-xl font-bold cursor-pointer"
            >
              ✕
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex gap-2 border-b border-slate-800 pb-3 mb-6">
            <button
              onClick={() => setActiveTab("lore")}
              className={`px-3 py-1 rounded text-xs cursor-pointer ${
                activeTab === "lore" ? "bg-amber-500/20 text-amber-300 border border-amber-500/40" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              📖 Lore &amp; Story
            </button>
            <button
              onClick={() => setActiveTab("pods")}
              className={`px-3 py-1 rounded text-xs cursor-pointer ${
                activeTab === "pods" ? "bg-amber-500/20 text-amber-300 border border-amber-500/40" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              🎧 Audio Pods
            </button>
            <button
              onClick={() => setActiveTab("cycles")}
              className={`px-3 py-1 rounded text-xs cursor-pointer ${
                activeTab === "cycles" ? "bg-amber-500/20 text-amber-300 border border-amber-500/40" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              🌌 The 4 Yugas
            </button>
          </div>

          {/* Content Sections */}
          {activeTab === "lore" && (
            <div className="space-y-4 text-xs text-slate-300 leading-relaxed">
              <p className="text-amber-200 font-semibold text-sm">
                Understanding the Age of Materialization
              </p>
              <p>
                In ancient cosmic reckoning, human consciousness moves through four vast ages (Yugas), repeating in natural harmonic cycles. The Kali Yuga is traditionally calculated as a 432,000-year epoch.
              </p>
              <p>
                Rather than viewing time as a flat linear progression from a singular explosion, these systems model time as cyclic—similar to seasons, solar orbits, and axial precession. Kali Yuga represents the densest phase of the cycle, where focus shifts toward material discovery, raw physical form, and dense sensory creation.
              </p>
              <div className="p-3 bg-slate-950 rounded border border-amber-500/20 text-amber-300/90 text-xs italic">
                "We do not invent cycles; we merely align our creations with their natural resonance."
              </div>
            </div>
          )}

          {activeTab === "pods" && (
            <div className="space-y-4">
              <div className="p-4 bg-slate-950 rounded border border-amber-500/20">
                <div className="text-xs font-bold text-amber-300 mb-1">POD #01: Harmonic Frequencies &amp; 432Hz</div>
                <div className="text-xs text-slate-400 mb-3">Duration: 3m 45s • Audio Short</div>
                <button className="px-3 py-1 bg-emerald-500/20 border border-emerald-400 text-emerald-300 rounded text-xs cursor-pointer hover:bg-emerald-500/30">
                  ▶ Play Audio Pod
                </button>
              </div>

              <div className="p-4 bg-slate-950 rounded border border-amber-500/20">
                <div className="text-xs font-bold text-amber-300 mb-1">POD #02: Axial Precession &amp; Great Years</div>
                <div className="text-xs text-slate-400 mb-3">Duration: 5m 12s • Visual Short</div>
                <button className="px-3 py-1 bg-emerald-500/20 border border-emerald-400 text-emerald-300 rounded text-xs cursor-pointer hover:bg-emerald-500/30">
                  ▶ Watch Video Short
                </button>
              </div>
            </div>
          )}

          {activeTab === "cycles" && (
            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-950 rounded border border-slate-800">
                <span className="text-emerald-400 font-bold block">1. Satya Yuga (1,728,000 Yrs)</span>
                <span className="text-slate-400">Age of Truth &amp; Pure Consciousness</span>
              </div>
              <div className="p-3 bg-slate-950 rounded border border-slate-800">
                <span className="text-blue-400 font-bold block">2. Treta Yuga (1,296,000 Yrs)</span>
                <span className="text-slate-400">Age of Refined Vital Energy</span>
              </div>
              <div className="p-3 bg-slate-950 rounded border border-slate-800">
                <span className="text-amber-400 font-bold block">3. Dvapara Yuga (864,000 Yrs)</span>
                <span className="text-slate-400">Age of Electric &amp; Atomic Knowledge</span>
              </div>
              <div className="p-3 bg-slate-950 rounded border border-amber-500/30 bg-amber-500/5">
                <span className="text-amber-300 font-bold block">4. Kali Yuga (432,000 Yrs) — CURRENT</span>
                <span className="text-slate-300">Age of Dense Materialization &amp; Physical Craft</span>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-6 border-t border-slate-800 text-center">
          <button
            onClick={onClose}
            className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs rounded transition-all cursor-pointer"
          >
            Close Story Exploration
          </button>
        </div>
      </div>
    </div>
  );
}
