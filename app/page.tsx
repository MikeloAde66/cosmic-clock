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
    <main className="relative min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between p-8 font-mono overflow-x-hidden">
      <CosmicCanvas kpIndex={noaa.kpIndex} />

      {/* Story Drawer Slide-Out */}
      <KaliYugaDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />

      {/* HUD Header */}
      <header className="relative z-10 flex justify-between items-center border-b border-amber-500/20 pb-4 backdrop-blur-xs">
        <div>
          <h1 className="text-2xl font-bold tracking-widest text-amber-400">COSMIC ALMANAC</h1>
          <p className="text-xs text-slate-400">REAL-TIME EPOCH &amp; HARMONIC RESONANCE HUD</p>
        </div>
        
        <div className="flex items-center gap-6 text-right text-xs text-amber-200">
          <button
            onClick={handleAudioToggle}
            className={`px-3 py-1.5 rounded border transition-all duration-300 font-semibold cursor-pointer ${
              isAudioActive
                ? "border-emerald-400 bg-emerald-500/20 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                : "border-amber-500/40 bg-slate-900/60 text-amber-400 hover:border-amber-400"
            }`}
          >
            {isAudioActive ? "🔊 432Hz HARMONIC: ON" : "🔇 432Hz HARMONIC: OFF"}
          </button>

          <div>
            <div>UTC: {time}</div>
            <div className={noaa.color}>NOAA SYNC: ONLINE</div>
          </div>
        </div>
      </header>

      {/* Main Interactive Centerpiece & Converter */}
      <div className="relative z-10 my-8 space-y-8">
        {/* Clickable Kali Yuga Central Dial */}
        <section className="text-center">
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="group relative inline-block p-12 rounded-full border border-amber-500/30 bg-slate-950/50 backdrop-blur-md shadow-[0_0_60px_rgba(217,119,6,0.2)] hover:border-amber-400 hover:shadow-[0_0_80px_rgba(245,158,11,0.35)] transition-all duration-300 cursor-pointer"
          >
            <div className="text-xs tracking-widest text-amber-500 mb-2 group-hover:text-amber-300 transition-colors">
              CURRENT EPOCH • <span className="underline">CLICK TO EXPLORE LORE</span>
            </div>
            <div className="text-5xl font-black tracking-wider text-amber-300 group-hover:scale-105 transition-transform">
              KALI YUGA
            </div>
            <div className="text-xl text-amber-100 mt-2">
              YEAR {cosmic.kaliYugaYear.toLocaleString()} <span className="text-slate-500">/ {cosmic.kaliYugaTotal.toLocaleString()}</span>
            </div>
            <div className="mt-4 text-xs text-amber-400/80 bg-amber-500/10 px-4 py-1 rounded-full inline-block border border-amber-500/20">
              PROGRESS: {cosmic.kaliYugaProgressPercent}%
            </div>
          </button>
        </section>

        {/* Interactive Cosmic Moment Converter */}
        <CosmicConverter />
      </div>

      {/* Real-Time Telemetry Footer */}
      <footer className="relative z-10 grid grid-cols-1 md:grid-cols-4 gap-4 border-t border-amber-500/20 pt-4 text-xs backdrop-blur-xs">
        <div className="bg-slate-900/70 p-4 rounded border border-slate-800/80">
          <span className="text-slate-400 block mb-1">EARTH TOTAL AGE</span>
          <span className="text-lg text-amber-300 font-bold">{cosmic.earthAgeYears.toLocaleString()} YRS</span>
        </div>
        <div className="bg-slate-900/70 p-4 rounded border border-slate-800/80">
          <span className="text-slate-400 block mb-1">AXIAL PRECESSION</span>
          <span className="text-lg text-amber-300 font-bold">~25,772 YRS</span>
        </div>
        <div className="bg-slate-900/70 p-4 rounded border border-slate-800/80">
          <span className="text-slate-400 block mb-1">RESONANT TONE</span>
          <span className="text-lg text-emerald-400 font-bold">432.0 Hz HARMONIC</span>
        </div>
        <div className="bg-slate-900/70 p-4 rounded border border-slate-800/80">
          <span className="text-slate-400 block mb-1">NOAA SPACE WEATHER</span>
          <span className={`text-lg font-bold ${noaa.color}`}>{noaa.label}</span>
        </div>
      </footer>
    </main>
  );
}
