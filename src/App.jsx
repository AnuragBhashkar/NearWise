import { useState } from "react";
import useGeolocation from "./hooks/useGeolocation";

import MoodSelector from "./components/MoodSelector";
import FilterBar from "./components/FilterBar";
import PlaceCard from "./components/PlaceCard";

import mockPlaces from "./data/mockPlaces";
import { calculateScore } from "./utils/scoringLogic";

function App() {
  const { location, error, loading } = useGeolocation();

  const [mood, setMood] = useState("work");
  const [minRating, setMinRating] = useState(0);
  const [maxDistance, setMaxDistance] = useState(5);

  if (loading) return <p>Getting your location...</p>;
  if (error) return <p>{error}</p>;

  // intent-based visibility
  const basePlaces =
    mood === "quick"
      ? mockPlaces.filter((place) => place.openNow)
      : mockPlaces;

  // user-applied filters
  const filteredPlaces = basePlaces.filter(
    (place) =>
      place.rating >= minRating && place.distance <= maxDistance
  );

  // score + rank
  const rankedPlaces = filteredPlaces
    .map((place) => ({
      ...place,
      score: calculateScore(place, mood),
    }))
    .sort((a, b) => b.score - a.score);

  return (
    <div style={{ padding: "20px" }}>
      <h1>NearWise</h1>

      <MoodSelector mood={mood} setMood={setMood} />

      <FilterBar
        minRating={minRating}
        setMinRating={setMinRating}
        maxDistance={maxDistance}
        setMaxDistance={setMaxDistance}
      />

      <h2>Recommended Places</h2>

      {rankedPlaces.map((place) => (
        <PlaceCard key={place.id} place={place} mood={mood} />
      ))}
    </div>
  );
}

export default App;