"use client";

import React, { useState } from "react";

interface ConverterResult {
  kaliYugaSeconds: string;
  precessionArcSec: string;
  cosmicMomentQuote: string;
}

export default function CosmicConverter() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [birthDate, setBirthDate] = useState<string>("");
  const [birthTime, setBirthTime] = useState<string>("");
  const [result, setResult] = useState<ConverterResult | null>(null);

  const calculateMoment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!birthDate) return;

    const birth = new Date(`${birthDate}T${birthTime || "00:00"}`);
    const now = new Date();
    const ageInYears = (now.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24 * 365.25);

    const kySec = (ageInYears * 0.00231481).toFixed(6);
    const precessionSec = (ageInYears * ((360 * 3600) / 25772)).toFixed(2);

    setResult({
      kaliYugaSeconds: kySec,
      precessionArcSec: precessionSec,
      cosmicMomentQuote: `In the 432,000-year Kali Yuga, your lifetime spans ${kySec} cosmic seconds while Earth wobbled ${precessionSec}" along its axis.`,
    });
  };

  return (
    <div className="relative font-mono z-20">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-xs px-3 py-1.5 bg-slate-900/90 border border-amber-500/40 text-amber-300 hover:border-amber-400 rounded flex items-center gap-2 transition-all cursor-pointer shadow-lg"
      >
        <span>✨ Cosmic Birthday</span>
        <span className="text-[10px] text-amber-500">{isOpen ? "▲" : "▼"}</span>
      </button>

      {isOpen && (
        <div className="absolute top-10 left-0 w-80 bg-slate-900/95 border border-amber-500/40 rounded-lg p-4 shadow-[0_10px_30px_rgba(0,0,0,0.8)] backdrop-blur-md animate-fadeIn space-y-3">
          <div className="flex justify-between items-center border-b border-slate-800 pb-2">
            <h3 className="text-xs font-bold text-amber-300 tracking-wider">COSMIC MOMENT</h3>
            <button onClick={() => setIsOpen(false)} className="text-slate-500 hover:text-slate-300 text-xs">
              ✕
            </button>
          </div>

          <form onSubmit={calculateMoment} className="space-y-3 text-xs">
            <div>
              <label className="block text-[11px] text-slate-400 mb-1">Birth Date</label>
              <input
                type="date"
                required
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="w-full bg-slate-950 border border-amber-500/30 rounded px-2 py-1.5 text-slate-200 text-xs focus:outline-none focus:border-amber-400"
              />
            </div>
            <div>
              <label className="block text-[11px] text-slate-400 mb-1">Birth Time (Optional)</label>
              <input
                type="time"
                value={birthTime}
                onChange={(e) => setBirthTime(e.target.value)}
                className="w-full bg-slate-950 border border-amber-500/30 rounded px-2 py-1.5 text-slate-200 text-xs focus:outline-none focus:border-amber-400"
              />
            </div>

            <button
              type="submit"
              className="w-full py-1.5 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400 text-amber-300 font-bold rounded cursor-pointer text-xs uppercase"
            >
              Calculate
            </button>
          </form>

          {result && (
            <div className="pt-2 border-t border-slate-800 text-[11px] space-y-2">
              <div className="flex justify-between text-slate-400">
                <span>Epoch Secs:</span>
                <span className="text-amber-300 font-bold">{result.kaliYugaSeconds}s</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Axial Shift:</span>
                <span className="text-emerald-400 font-bold">{result.precessionArcSec}"</span>
              </div>
              <p className="text-[10px] text-slate-300 italic pt-1 border-t border-slate-800/60 leading-relaxed">
                "{result.cosmicMomentQuote}"
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
