import { useState } from "react";

/**
 * Rank visual config — gold/silver/bronze for top 3, muted for the rest
 */
const RANK_MAP = {
  1: { cls: "rank-1", trophy: "🥇" },
  2: { cls: "rank-2", trophy: "🥈" },
  3: { cls: "rank-3", trophy: "🥉" },
};

/**
 * Approximate maximum score a place can receive (used to normalise score bar).
 * Calculated from: rating(5)*0.4 + proximity(5)*0.3 + mood-max(1.8) ≈ 10
 */
const MAX_SCORE = 10;

/**
 * Returns true if the place's attributes qualify for the mood-specific tag
 * @param {Object} place
 * @param {string} mood
 */
function qualifiesForTag(place, mood) {
  switch (mood) {
    case "work":   return ["cafe", "work"].includes(place.type);
    case "date":   return place.rating >= 4.5;
    case "quick":  return place.distance <= 1;
    case "budget": return place.priceLevel <= 2;
    default:       return false;
  }
}

/**
 * Mood tag label + emoji mapping
 */
const MOOD_TAGS = {
  work:   { label: "Best for Work",      emoji: "💼" },
  date:   { label: "Great for Date",     emoji: "🕯️" },
  quick:  { label: "Quick Bite Nearby",  emoji: "⚡" },
  budget: { label: "Budget Friendly",    emoji: "💸" },
};

/**
 * PlaceCard — displays a single ranked place with score bar, tags, and
 *             an expandable "Why recommended?" explainability section.
 *
 * @param {Object}  place  - Place data object
 * @param {string}  mood   - Currently selected mood
 * @param {number}  rank   - 1-based ranking position in the results list
 */
function PlaceCard({ place, mood, rank }) {
  const [showWhy, setShowWhy] = useState(false);

  const rankStyle = RANK_MAP[rank] ?? { cls: "rank-other", trophy: null };
  const scorePct  = Math.min(100, Math.round((place.score / MAX_SCORE) * 100));
  const hasTag    = qualifiesForTag(place, mood);
  const moodTag   = MOOD_TAGS[mood];

  // Build explainability reasons list
  const reasons = [];
  if (place.rating >= 4)     reasons.push(`High rating (${place.rating}★)`);
  if (place.distance <= 2)   reasons.push(`Close to you (${place.distance.toFixed(1)} km)`);
  if (place.openNow)         reasons.push("Currently open");
  if (hasTag)                reasons.push(`Matches your "${mood}" mood`);

  return (
    <article className={`place-card${!place.openNow ? " dimmed" : ""}`}>

      {/* ── Rank column ── */}
      <div className="place-rank-col" aria-label={`Rank ${rank}`}>
        {rankStyle.trophy ? (
          <span className="place-rank-trophy" aria-hidden="true">{rankStyle.trophy}</span>
        ) : (
          <span className={`place-rank-num ${rankStyle.cls}`}>#{rank}</span>
        )}
      </div>

      {/* ── Card body ── */}
      <div className="place-card-body">

        {/* Header: name + badges */}
        <div className="place-card-header">
          <h3 className="place-name">{place.name}</h3>
          <div className="place-badges">
            {place.type && (
              <span className="place-type-badge">{place.type.replace("_", " ")}</span>
            )}
            <span className={`open-badge ${place.openNow ? "open" : "closed"}`}>
              ● {place.openNow ? "Open" : "Closed"}
            </span>
          </div>
        </div>

        {/* Meta: rating / distance / price */}
        <div className="place-meta">
          <span className="meta-item">⭐ <span>{place.rating}</span></span>
          <span className="meta-item">📍 <span>{place.distance.toFixed(1)} km</span></span>
          <span className="meta-item">💰 <span>{"$".repeat(place.priceLevel || 1)}</span></span>
        </div>

        {/* Match score bar */}
        <div className="score-section">
          <span className="score-label">MATCH</span>
          <div className="score-bar" role="progressbar" aria-valuenow={scorePct} aria-valuemin={0} aria-valuemax={100}>
            <div className="score-fill" style={{ width: `${scorePct}%` }} />
          </div>
          <span className="score-value">{place.score}</span>
        </div>

        {/* Mood tag (conditional) */}
        {hasTag && (
          <div className="place-tags">
            <span className="tag tag-mood">
              {moodTag.emoji} {moodTag.label}
            </span>
          </div>
        )}

        {/* Why recommended? (expandable) */}
        {reasons.length > 0 && (
          <div>
            <button
              className="why-toggle"
              onClick={() => setShowWhy((v) => !v)}
              aria-expanded={showWhy}
            >
              <span className={`why-arrow${showWhy ? " open" : ""}`} aria-hidden="true">▶</span>
              Why recommended?
            </button>
            {showWhy && (
              <ul className="why-list">
                {reasons.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
            )}
          </div>
        )}

      </div>
    </article>
  );
}

export default PlaceCard;