export interface NOAAKpData {
  kpIndex: number;
  label: string;
  color: string;
  timeTag: string;
}

export async function fetchLiveNOAAData(): Promise<NOAAKpData> {
  try {
    const res = await fetch("https://services.swpc.noaa.gov/products/noaa-planetary-k-index.json", {
      next: { revalidate: 300 }, // Cache for 5 mins
    });
    const data = await res.json();
    
    // Extract the latest observation entry
    const latest = Array.isArray(data) ? data[data.length - 1] : null;
    const kpRaw = latest ? parseFloat(latest.kp_index || latest[1] || "2.1") : 2.1;
    const kp = isNaN(kpRaw) ? 2.1 : kpRaw;

    let label = "SOLAR QUIET";
    let color = "text-emerald-400";

    if (kp >= 6.0) {
      label = `GEOMAGNETIC STORM (Kp ${kp.toFixed(1)})`;
      color = "text-red-500 animate-pulse";
    } else if (kp >= 4.0) {
      label = `SOLAR ACTIVE (Kp ${kp.toFixed(1)})`;
      color = "text-amber-400";
    } else {
      label = `SOLAR QUIET (Kp ${kp.toFixed(1)})`;
      color = "text-emerald-400";
    }

    return {
      kpIndex: kp,
      label,
      color,
      timeTag: latest ? (latest.time_tag || latest[0] || "") : "",
    };
  } catch (error) {
    console.warn("NOAA API fetch fallback triggered:", error);
    return {
      kpIndex: 2.1,
      label: "SOLAR QUIET (Kp 2.1)",
      color: "text-emerald-400",
      timeTag: new Date().toISOString(),
    };
  }
}
