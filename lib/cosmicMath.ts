export interface CosmicData {
  earthAgeYears: number;
  kaliYugaYear: number;
  kaliYugaTotal: number;
  kaliYugaProgressPercent: string;
  precessionYear: number;
}

export function calculateCosmicTime(): CosmicData {
  const currentYear = new Date().getFullYear();
  
  // Traditional Kali Yuga Start: 3102 BCE
  const kaliYugaStartBCE = 3102;
  const kaliYugaYear = currentYear + kaliYugaStartBCE;
  const kaliYugaTotal = 432000;
  const progressPercent = ((kaliYugaYear / kaliYugaTotal) * 100).toFixed(4);

  return {
    earthAgeYears: 4543000000 + (currentYear - 2000),
    kaliYugaYear,
    kaliYugaTotal,
    kaliYugaProgressPercent: progressPercent,
    precessionYear: 25772,
  };
}
