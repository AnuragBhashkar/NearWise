/**
 * config.js — centralised runtime configuration for NearWise.
 *
 * Keeping these values here (instead of scattered as magic numbers)
 * makes it easy to tune the scoring system or swap the API endpoint
 * without touching business logic files.
 */

/** Overpass API endpoint */
export const OVERPASS_API_URL = "https://overpass-api.de/api/interpreter";

/** Default search radius in metres when fetching nearby places */
export const DEFAULT_RADIUS_METERS = 2000;

/** Hard timeout for Overpass API requests in milliseconds */
export const FETCH_TIMEOUT_MS = 12000;

/**
 * Scoring weights — used by scoringLogic.js.
 * Centralised here so adjustments are reflected everywhere automatically.
 */
export const SCORE_WEIGHTS = {
  /** Coefficient for rating (quality signal) */
  rating: 0.4,
  /** Coefficient for proximity (5 − distance_km) */
  proximity: 0.3,
};

/**
 * Approximate maximum possible score (used for normalising the score bar).
 * Formula: max_rating(5)*0.4 + max_proximity(5)*0.3 + mood_bonus_max(≈1.8) ≈ 10
 */
export const MAX_SCORE = 10;
