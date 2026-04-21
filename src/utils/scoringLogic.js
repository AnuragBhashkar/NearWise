/**
 * Weighted scoring algorithm for ranking places by mood.
 *
 * Base signals (applied to all moods):
 *   - Rating  × 0.4  (quality indicator)
 *   - Proximity × 0.3  (5 − distance, so closer = higher)
 *
 * Mood-specific adjustments layer on top to shift ranking priorities.
 *
 * @param {Object} place - Place object with rating, distance, openNow, type, priceLevel
 * @param {string} mood  - "work" | "date" | "quick" | "budget"
 * @returns {number} Composite score, rounded to 2 decimal places
 */
export function calculateScore(place, mood) {
  let score = 0;

  // Base signals (common for all moods)
  score += place.rating * 0.4;           // quality
  score += (5 - place.distance) * 0.3;  // proximity (inverse of distance)

  // Mood-specific adjustments
  switch (mood) {

    case "work":
      // Prioritise quiet, productivity-friendly spots
      if (["cafe", "work"].includes(place.type)) {
        score += 1.5;
      }
      if (place.openNow) {
        score += 0.5;
      }
      break;

    case "date":
      // Ambience and quality matter more for dates
      score += place.rating * 0.3;
      if (["cafe", "restaurant"].includes(place.type)) {
        score += 1.0;
      }
      break;

    case "quick":
      // Speed and availability dominate; being closed is a hard disqualifier
      if (!place.openNow) {
        score -= 5;
      }
      if (place.type === "fast_food") {
        score += 1.0; // fast food is ideal for quick bites
      }
      score += (5 - place.distance) * 1.0; // proximity dominates
      score += place.rating * 0.1;          // rating is secondary
      break;

    case "budget":
      // Cheaper places preferred; priceLevel 1 = cheapest
      score += (4 - place.priceLevel) * 0.6;
      break;

    default:
      break;
  }

  return Number(score.toFixed(2));
}