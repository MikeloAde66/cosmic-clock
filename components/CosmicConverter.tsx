"use client";

import React, { useState } from "react";

interface ConverterResult {
  kaliYugaSeconds: string;
  precessionArcSec: string;
  cosmicMomentQuote: string;
}

export default function CosmicConverter() {
  const [birthDate, setBirthDate] = useState<string>("");
  const [birthTime, setBirthTime] = useState<string>("");
  const [result, setResult] = useState<ConverterResult | null>(null);

  const calculateMoment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!birthDate) return;

    const birth = new Date(`${birthDate}T${birthTime || "00:00"}`);
    const now = new Date();
    const ageInYears = (now.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24 * 365.25);

    // Kali Yuga Total: 432,000 Years = 31,536,000,000 Cosmic Seconds
    // Ratio: 1 Earth Year = 0.002315 Kali Yuga Seconds
    const kySec = (ageInYears * 0.00231481).toFixed(6);
    
    // Axial Precession (25,772 Year Cycle) -> Arc Seconds of movement in user's lifetime
    const precessionSec = (ageInYears * (360 * 3600 / 25772)).toFixed(2);

    setResult({
      kaliYugaSeconds: kySec,
      precessionArcSec: precessionSec,
      cosmicMomentQuote: `In the 432,000-year Kali Yuga, your lifetime spans ${kySec} cosmic seconds while the Earth shifted ${precessionSec}" along its axial wobble.`,
    });
  };

  return (
    <div className="bg-slate-900/80 border border-amber-500/30 rounded-xl p-6 backdrop-blur-md max-w-2xl mx-auto my-8 shadow-[0_0_30px_rgba(217,119,6,0.15)] font-mono">
      <h2 className="text-xl font-bold text-amber-300 tracking-wider mb-2 text-center">
        COSMIC MOMENT CONVERTER
      </h2>
      <p className="text-xs text-slate-400 text-center mb-6">
        Map your personal existence onto the grand 432,000-year epochal scale.
      </p>

      <form onSubmit={calculateMoment} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-amber-400/80 mb-1">Your Birth Date</label>
            <input
              type="date"
              required
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="w-full bg-slate-950 border border-amber-500/30 rounded px-3 py-2 text-slate-200 text-sm focus:outline-none focus:border-amber-400"
            />
          </div>
          <div>
            <label className="block text-xs text-amber-400/80 mb-1">Birth Time (Optional)</label>
            <input
              type="time"
              value={birthTime}
              onChange={(e) => setBirthTime(e.target.value)}
              className="w-full bg-slate-950 border border-amber-500/30 rounded px-3 py-2 text-slate-200 text-sm focus:outline-none focus:border-amber-400"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-2.5 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400 text-amber-300 font-bold rounded transition-all cursor-pointer tracking-widest text-xs uppercase shadow-[0_0_15px_rgba(245,158,11,0.2)]"
        >
          Find My Cosmic Moment
        </button>
      </form>

      {result && (
        <div className="mt-6 p-4 rounded bg-slate-950/80 border border-amber-500/40 text-center space-y-4 animate-fadeIn">
          <div className="grid grid-cols-2 gap-2 text-left text-xs border-b border-slate-800 pb-3">
            <div>
              <span className="text-slate-500 block">KALI YUGA DURATION</span>
              <span className="text-amber-300 font-bold text-sm">{result.kaliYugaSeconds} Cosmic Secs</span>
            </div>
            <div>
              <span className="text-slate-500 block">AXIAL SHIFT</span>
              <span className="text-emerald-400 font-bold text-sm">{result.precessionArcSec} Arc Seconds</span>
            </div>
          </div>
          <p className="text-xs text-amber-100/90 italic leading-relaxed">
            "{result.cosmicMomentQuote}"
          </p>
        </div>
      )}
    </div>
  );
}
