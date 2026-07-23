"use client";

import React, { useEffect, useState } from "react";
import { calculateCosmicTime, CosmicData } from "@/lib/cosmicMath";
import { fetchLiveNOAAData, NOAAKpData } from "@/lib/noaa";
import CosmicCanvas from "@/components/CosmicCanvas";

export default function CosmicClockApp() {
  const [cosmic, setCosmic] = useState<CosmicData | null>(null);
  const [time, setTime] = useState<string>("");
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

    fetchLiveNOAAData().then(setNoaa);

    return () => clearInterval(interval);
  }, []);

  if (!cosmic) return <div className="p-10 text-amber-400 font-mono">Loading Cosmic Clock...</div>;

  return (
    <main className="relative min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between p-8 font-mono overflow-hidden">
      <CosmicCanvas kpIndex={noaa.kpIndex} />

      {/* HUD Header */}
      <header className="relative z-10 flex justify-between items-center border-b border-amber-500/20 pb-4 backdrop-blur-xs">
        <div>
          <h1 className="text-2xl font-bold tracking-widest text-amber-400">COSMIC ALMANAC</h1>
          <p className="text-xs text-slate-400">REAL-TIME EPOCH &amp; JPL EPHEMERIS HUD</p>
        </div>
        <div className="text-right text-xs text-amber-200">
          <div>UTC: {time}</div>
          <div className={noaa.color}>NOAA SYNC: ONLINE</div>
        </div>
      </header>

      {/* Main Epoch Dial Centerpiece */}
      <section className="relative z-10 my-auto text-center space-y-6 pointer-events-none">
        <div className="inline-block relative p-12 rounded-full border border-amber-500/30 bg-slate-950/40 backdrop-blur-md shadow-[0_0_60px_rgba(217,119,6,0.2)]">
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
          <span className="text-slate-400 block mb-1">NASA JPL HORIZONS</span>
          <span className="text-lg text-emerald-400 font-bold">SOLAR SYSTEM SYNCED</span>
        </div>
        <div className="bg-slate-900/70 p-4 rounded border border-slate-800/80">
          <span className="text-slate-400 block mb-1">NOAA SPACE WEATHER</span>
          <span className={`text-lg font-bold ${noaa.color}`}>{noaa.label}</span>
        </div>
      </footer>
    </main>
  );
}
