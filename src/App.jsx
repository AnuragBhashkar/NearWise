import { useState, useEffect } from "react";
import useGeolocation from "./hooks/useGeolocation";

import MapView from "./components/MapView";
import MoodSelector from "./components/MoodSelector";
import FilterBar from "./components/FilterBar";
import PlaceCard from "./components/PlaceCard";

import mockPlaces from "./data/mockPlaces";
import { calculateScore } from "./utils/scoringLogic";
import { fetchNearbyPlaces } from "./services/placesService";

function App() {
  // Get user location using browser Geolocation API
  const { location, error, loading } = useGeolocation();
  // Location is used for fetching nearby places via OpenStreetMap (Overpass API)

  // User preferences
  const [mood, setMood] = useState("work");
  const [minRating, setMinRating] = useState(0);
  const [maxDistance, setMaxDistance] = useState(5);

  // Places data (mock by default, replaced by live OSM data if available)
  const [places, setPlaces] = useState(mockPlaces);

  // Fetch nearby places when location becomes available
  useEffect(() => {
    if (!location) return;

    async function loadPlaces() {
      try {
        const apiPlaces = await fetchNearbyPlaces(location);
        setPlaces(apiPlaces);
      } catch (err) {
        console.error("Failed to fetch places, falling back to mock data");
      }
    }

    loadPlaces();
  }, [location]);

  // Loading & error states
  if (loading) return <p>Getting your location...</p>;
  if (error) return <p>{error}</p>;

  // 1️⃣ Intent-based visibility
  // For "quick" mood, show only open places
  const basePlaces =
    mood === "quick"
      ? places.filter((place) => place.openNow)
      : places;

  // 2️⃣ User-applied filters
  // NOTE: distance is approximate (mocked) for UI consistency
  const filteredPlaces = basePlaces.filter(
    (place) =>
      place.rating >= minRating &&
      place.distance <= maxDistance
  );

  // 3️⃣ Scoring + ranking
  const rankedPlaces = filteredPlaces
    .map((place) => ({
      ...place,
      score: calculateScore(place, mood),
    }))
    .sort((a, b) => b.score - a.score);

  return (
    <div style={{ padding: "20px" }}>
      <h1>NearWise</h1>

      {/* Mood selection */}
      <MoodSelector mood={mood} setMood={setMood} />

      {/* Filters */}
      <FilterBar
        minRating={minRating}
        setMinRating={setMinRating}
        maxDistance={maxDistance}
        setMaxDistance={setMaxDistance}
      />

      {/* Map View */}
      {location && (
        <MapView
          location={location}
          places={rankedPlaces}
        />
      )}

      <h2>Recommended Places</h2>

      {/* Empty state */}
      {rankedPlaces.length === 0 && (
        <p style={{ marginTop: "10px", color: "#666" }}>
          No places match your filters.
        </p>
      )}

      {/* Ranked list */}
      {rankedPlaces.map((place, index) => (
        <PlaceCard
          key={place.id}
          place={place}
          mood={mood}
          rank={index + 1}
        />
      ))}
    </div>
  );
}

export default App;