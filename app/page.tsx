"use client";

import React, { useEffect, useState } from "react";
import { calculateCosmicTime, CosmicData } from "@/lib/cosmicMath";
import { fetchLiveNOAAData, NOAAKpData } from "@/lib/noaa";
import { audioEngine } from "@/lib/audioEngine";
import CosmicCanvas from "@/components/CosmicCanvas";
import CosmicConverter from "@/components/CosmicConverter";
import KaliYugaDrawer from "@/components/KaliYugaDrawer";

export default function CosmicClockApp() {
  const [cosmic, setCosmic] = useState<CosmicData | null>(null);
  const [time, setTime] = useState<string>("");
  const [isAudioActive, setIsAudioActive] = useState<boolean>(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [noaa, setNoaa] = useState<NOAAKpData>({
    kpIndex: 2.1,
    label: "SYNCING NOAA...",
    color: "text-amber-300",
    timeTag: "",
  });

  useEffect(() => {
    setCosmic(calculateCosmicTime());
    
    const interval = setInterval(() => {
      setTime(new Date().toUTCString());
    }, 1000);

    fetchLiveNOAAData().then((data) => {
      setNoaa(data);
      audioEngine.updateFrequency(data.kpIndex);
    });

    return () => clearInterval(interval);
  }, []);

  const handleAudioToggle = () => {
    const active = audioEngine.toggle(noaa.kpIndex);
    setIsAudioActive(active);
  };

  if (!cosmic) return <div className="p-10 text-amber-400 font-mono">Loading Cosmic Clock...</div>;

  return (
    <main className="relative min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between p-6 font-mono overflow-hidden">
      <CosmicCanvas kpIndex={noaa.kpIndex} />

      {/* Slide-Out Lore Drawer */}
      <KaliYugaDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />

      {/* Header */}
      <header className="relative z-10 flex justify-between items-start border-b border-amber-500/20 pb-4 backdrop-blur-xs">
        <div className="space-y-2">
          <div>
            <h1 className="text-xl font-bold tracking-widest text-amber-400">COSMIC ALMANAC</h1>
            <p className="text-[10px] text-slate-400">REAL-TIME EPOCH &amp; HARMONIC RESONANCE HUD</p>
          </div>
          
          {/* Dropdown Birthday Converter under Title */}
          <CosmicConverter />
        </div>
        
        <div className="flex items-center gap-4 text-right text-xs text-amber-200">
          <button
            onClick={handleAudioToggle}
            className={`px-3 py-1.5 rounded border transition-all duration-300 font-semibold cursor-pointer ${
              isAudioActive
                ? "border-emerald-400 bg-emerald-500/20 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                : "border-amber-500/40 bg-slate-900/60 text-amber-400 hover:border-amber-400"
            }`}
          >
            {isAudioActive ? "🔊 432Hz ON" : "🔇 432Hz OFF"}
          </button>

          <div>
            <div>UTC: {time}</div>
            <div className={noaa.color}>NOAA SYNC: ONLINE</div>
          </div>
        </div>
      </header>

      {/* Centered, Scaled-Down Epoch Badge */}
      <div className="relative z-10 my-auto text-center pointer-events-none">
        <button
          onClick={() => setIsDrawerOpen(true)}
          className="pointer-events-auto group inline-block px-8 py-5 rounded-2xl border border-amber-500/30 bg-slate-950/60 backdrop-blur-md shadow-[0_0_40px_rgba(217,119,6,0.15)] hover:border-amber-400 hover:shadow-[0_0_60px_rgba(245,158,11,0.3)] transition-all duration-300 cursor-pointer"
        >
          <div className="text-[10px] tracking-widest text-amber-500 mb-1 group-hover:text-amber-300 transition-colors">
            CURRENT EPOCH • <span className="underline">EXPLORE LORE</span>
          </div>
          <div className="text-3xl font-black tracking-wider text-amber-300 group-hover:scale-105 transition-transform">
            KALI YUGA
          </div>
          <div className="text-sm text-amber-100 mt-1">
            YEAR {cosmic.kaliYugaYear.toLocaleString()} <span className="text-slate-500">/ {cosmic.kaliYugaTotal.toLocaleString()}</span>
          </div>
          <div className="mt-2 text-[10px] text-amber-400/80 bg-amber-500/10 px-3 py-0.5 rounded-full inline-block border border-amber-500/20">
            PROGRESS: {cosmic.kaliYugaProgressPercent}%
          </div>
        </button>
      </div>

      {/* Telemetry Bar */}
      <footer className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-3 border-t border-amber-500/20 pt-3 text-[11px] backdrop-blur-xs">
        <div className="bg-slate-900/60 p-2.5 rounded border border-slate-800/80">
          <span className="text-slate-400 block mb-0.5">EARTH AGE</span>
          <span className="text-sm text-amber-300 font-bold">{cosmic.earthAgeYears.toLocaleString()} YRS</span>
        </div>
        <div className="bg-slate-900/60 p-2.5 rounded border border-slate-800/80">
          <span className="text-slate-400 block mb-0.5">AXIAL PRECESSION</span>
          <span className="text-sm text-amber-300 font-bold">~25,772 YRS</span>
        </div>
        <div className="bg-slate-900/60 p-2.5 rounded border border-slate-800/80">
          <span className="text-slate-400 block mb-0.5">RESONANT TONE</span>
          <span className="text-sm text-emerald-400 font-bold">432.0 Hz HARMONIC</span>
        </div>
        <div className="bg-slate-900/60 p-2.5 rounded border border-slate-800/80">
          <span className="text-slate-400 block mb-0.5">NOAA SPACE WEATHER</span>
          <span className={`text-sm font-bold ${noaa.color}`}>{noaa.label}</span>
        </div>
      </footer>
    </main>
  );
}
