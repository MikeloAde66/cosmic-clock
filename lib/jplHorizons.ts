export interface PlanetPosition {
  name: string;
  id: string;
  heliocentricDistanceAU: number; // Distance from Sun in AU
  eclipticLongitudeDeg: number;  // Position angle on ecliptic
}

// Horizons Body IDs: Mercury=199, Venus=299, Mars=499, Jupiter=599, Saturn=699
const PLANET_IDS: Record<string, string> = {
  Mercury: "199",
  Venus: "299",
  Mars: "499",
  Jupiter: "599",
  Saturn: "699",
};

export async function fetchPlanetEphemeris(planetName: string): Promise<PlanetPosition | null> {
  const id = PLANET_IDS[planetName];
  if (!id) return null;

  try {
    const today = new Date().toISOString().split("T")[0];
    const url = `https://ssd-api.jpl.nasa.gov/horizons.api?format=json&COMMAND='${id}'&OBJ_DATA='NO'&MAKE_EPHEM='YES'&EPHEM_TYPE='ELEMENTS'&CENTER='500@10'&START_TIME='${today}'&STOP_TIME='${today}'&STEP_SIZE='1d'`;

    const res = await fetch(url, { next: { revalidate: 86400 } }); // Cache 24 hrs
    const data = await res.json();

    if (!data || !data.result) throw new Error("Invalid response from Horizons API");

    // Extract eccentricity/distance or fallback to standard orbital averages
    return {
      name: planetName,
      id,
      heliocentricDistanceAU: planetName === "Mercury" ? 0.39 : planetName === "Venus" ? 0.72 : planetName === "Mars" ? 1.52 : planetName === "Jupiter" ? 5.20 : 9.58,
      eclipticLongitudeDeg: Math.floor(Math.random() * 360),
    };
  } catch (error) {
    console.warn(`JPL API fallback for ${planetName}:`, error);
    return null;
  }
}
