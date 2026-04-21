import { useState } from "react";
import useGeolocation from "./hooks/useGeolocation";
import usePlaces      from "./hooks/usePlaces";

import MapView       from "./components/MapView";
import MoodSelector  from "./components/MoodSelector";
import FilterBar     from "./components/FilterBar";
import PlaceCard     from "./components/PlaceCard";
import LoadingScreen from "./components/LoadingScreen";
import ErrorScreen   from "./components/ErrorScreen";

/**
 * App — root component for NearWise.
 *
 * Responsibilities are intentionally kept minimal here:
 *   1. Read user's geolocation via useGeolocation()
 *   2. Hold UI preference state (mood, filters)
 *   3. Delegate data logic to usePlaces()
 *   4. Render the layout
 *
 * All fetching, scoring, and filtering logic lives in usePlaces.js.
 */
function App() {
  // ── Geolocation ──────────────────────────────────────────────
  const { location, error: geoError, loading: geoLoading } = useGeolocation();

  // ── User preferences ─────────────────────────────────────────
  const [mood,        setMood]        = useState("work");
  const [minRating,   setMinRating]   = useState(0);
  const [maxDistance, setMaxDistance] = useState(5);

  // ── Places data (via custom hook) ────────────────────────────
  const { rankedPlaces, placesLoading, dataSource } = usePlaces(
    location,
    mood,
    minRating,
    maxDistance
  );

  // ── Early returns ─────────────────────────────────────────────
  if (geoLoading) return <LoadingScreen />;
  if (geoError)   return (
    <ErrorScreen
      message={geoError}
      onRetry={() => window.location.reload()}
    />
  );

  // ── Render ────────────────────────────────────────────────────
  return (
    <div className="app">

      {/* ── Header ── */}
      <header className="app-header">
        <div className="app-logo">
          <div className="app-logo-icon" aria-hidden="true">🗺️</div>
          <div className="app-logo-text">
            <span className="app-logo-title">NearWise</span>
            <span className="app-logo-sub">Mood-based place discovery</span>
          </div>
        </div>

        <div className="app-status" aria-live="polite">
          <div className={`status-dot${location ? "" : " offline"}`} />
          {location ? "Location active" : "No location"}
        </div>
      </header>

      {/* ── Main ── */}
      <main className="app-main">

        {/* Mood */}
        <p className="section-label">How are you feeling?</p>
        <MoodSelector mood={mood} setMood={setMood} />

        <div className="section-divider" />

        {/* Filters */}
        <p className="section-label">Refine results</p>
        <FilterBar
          minRating={minRating}
          setMinRating={setMinRating}
          maxDistance={maxDistance}
          setMaxDistance={setMaxDistance}
        />

        <div className="section-divider" />

        {/* Map */}
        {location && (
          <>
            <p className="section-label">Nearby on the map</p>
            <MapView location={location} places={rankedPlaces} />
            <div className="section-divider" />
          </>
        )}

        {/* Data source / loading feedback */}
        {placesLoading ? (
          <div className="places-loading" aria-live="polite">
            <div className="mini-spinner" aria-hidden="true" />
            Fetching live places near you…
          </div>
        ) : (
          <div className="data-banner" aria-live="polite">
            {dataSource === "live"
              ? "📡 Showing live data from OpenStreetMap"
              : "📦 Showing sample places — grant location access for live results"}
          </div>
        )}

        {/* Results */}
        <div className="results-header">
          <h2 className="results-title">Recommended Places</h2>
          <span className="results-count">{rankedPlaces.length} found</span>
        </div>

        {rankedPlaces.length === 0 ? (
          <div className="empty-state">
            <span className="empty-state-icon" aria-hidden="true">🔍</span>
            <p className="empty-state-text">No places match your current filters.</p>
          </div>
        ) : (
          <div className="place-list">
            {rankedPlaces.map((place, index) => (
              <PlaceCard
                key={place.id}
                place={place}
                mood={mood}
                rank={index + 1}
              />
            ))}
          </div>
        )}

      </main>
    </div>
  );
}

export default App;