import { useState, useEffect } from "react";
import mockPlaces            from "../data/mockPlaces";
import { fetchNearbyPlaces } from "../services/placesService";
import { calculateScore }    from "../utils/scoringLogic";

/**
 * usePlaces — custom hook that encapsulates all data-fetching, scoring,
 * and filtering logic for NearWise.
 *
 * Separating this from App.jsx keeps the component layer thin and makes
 * the business logic independently testable.
 *
 * @param {{ lat: number, lng: number } | null} location - User geolocation
 * @param {string}  mood        - Selected mood key
 * @param {number}  minRating   - Minimum rating filter (0 = no filter)
 * @param {number}  maxDistance - Maximum distance filter in km
 *
 * @returns {{
 *   rankedPlaces:  Array,   - Filtered, scored, and sorted places
 *   placesLoading: boolean, - True while fetching from Overpass API
 *   dataSource:    string,  - "live" | "mock"
 * }}
 */
function usePlaces(location, mood, minRating, maxDistance) {
  const [rawPlaces,     setRawPlaces]     = useState(mockPlaces);
  const [placesLoading, setPlacesLoading] = useState(false);
  const [dataSource,    setDataSource]    = useState("mock");

  // Fetch live data from OpenStreetMap when location becomes available
  useEffect(() => {
    if (!location) return;

    setPlacesLoading(true);

    fetchNearbyPlaces(location)
      .then((apiPlaces) => {
        if (apiPlaces.length > 0) {
          setRawPlaces(apiPlaces);
          setDataSource("live");
        }
        // 0 results → keep existing mock data (no-op)
      })
      .catch(() => {
        console.warn("[NearWise] Overpass API unavailable — showing sample data");
        setDataSource("mock");
      })
      .finally(() => setPlacesLoading(false));
  }, [location]);

  // ── Pipeline: intent filter → user filters → score → rank ─────

  // 1. Intent-based visibility: "quick" hides closed places upfront
  const intentFiltered =
    mood === "quick"
      ? rawPlaces.filter((p) => p.openNow)
      : rawPlaces;

  // 2. User-applied filters (rating + distance)
  const userFiltered = intentFiltered.filter(
    (p) => p.rating >= minRating && p.distance <= maxDistance
  );

  // 3. Score and rank
  const rankedPlaces = userFiltered
    .map((p) => ({ ...p, score: calculateScore(p, mood) }))
    .sort((a, b) => b.score - a.score);

  return { rankedPlaces, placesLoading, dataSource };
}

export default usePlaces;
