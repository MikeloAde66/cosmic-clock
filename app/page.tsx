"use client";

import React, { useEffect, useState } from "react";
import { calculateCosmicTime, CosmicData } from "@/lib/cosmicMath";

export default function CosmicClockApp() {
  const [cosmic, setCosmic] = useState<CosmicData | null>(null);
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    setCosmic(calculateCosmicTime());
    const interval = setInterval(() => {
      setTime(new Date().toUTCString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!cosmic) return <div className="p-10 text-amber-400 font-mono">Loading Cosmic Clock...</div>;

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between p-8 font-mono">
      {/* HUD Header */}
      <header className="flex justify-between items-center border-b border-amber-500/20 pb-4">
        <div>
          <h1 className="text-2xl font-bold tracking-widest text-amber-400">COSMIC ALMANAC</h1>
          <p className="text-xs text-slate-400">REAL-TIME EPOCH & SOLAR SYSTEM HUD</p>
        </div>
        <div className="text-right text-xs text-amber-200">
          <div>UTC: {time}</div>
          <div className="text-emerald-400">NOAA SYNC: ACTIVE</div>
        </div>
      </header>

      {/* Main Epoch Dial Centerpiece */}
      <section className="my-auto text-center space-y-6">
        <div className="inline-block relative p-12 rounded-full border border-amber-500/30 bg-amber-950/10 backdrop-blur-md shadow-[0_0_50px_rgba(217,119,6,0.15)]">
          <div className="text-sm tracking-widest text-amber-500 mb-2">CURRENT EPOCH</div>
          <div className="text-5xl font-black tracking-wider text-amber-300">KALI YUGA</div>
          <div className="text-xl text-amber-100 mt-2">
            YEAR {cosmic.kaliYugaYear.toLocaleString()} <span className="text-slate-500">/ {cosmic.kaliYugaTotal.toLocaleString()}</span>
          </div>
          <div className="mt-4 text-xs text-amber-400/80 bg-amber-500/10 px-4 py-1 rounded-full inline-block border border-amber-500/20">
            PROGRESS: {cosmic.kaliYugaProgressPercent}%
          </div>
        </div>
      </section>

      {/* Real-Time Telemetry Footer */}
      <footer className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-amber-500/20 pt-4 text-xs">
        <div className="bg-slate-900/60 p-4 rounded border border-slate-800">
          <span className="text-slate-400 block mb-1">EARTH TOTAL AGE</span>
          <span className="text-lg text-amber-300 font-bold">{cosmic.earthAgeYears.toLocaleString()} YRS</span>
        </div>
        <div className="bg-slate-900/60 p-4 rounded border border-slate-800">
          <span className="text-slate-400 block mb-1">AXIAL PRECESSION CYCLE</span>
          <span className="text-lg text-amber-300 font-bold">~25,772 YRS (GREAT YEAR)</span>
        </div>
        <div className="bg-slate-900/60 p-4 rounded border border-slate-800">
          <span className="text-slate-400 block mb-1">NOAA SPACE WEATHER</span>
          <span className="text-lg text-emerald-400 font-bold">SOLAR QUIET (Kp 2.1)</span>
        </div>
      </footer>
    </main>
  );
}
