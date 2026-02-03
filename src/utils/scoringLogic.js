export function calculateScore(place, mood) {
  let score = 0;

  // Base signals (common for all moods)
  score += place.rating * 0.4;            // quality
  score += (5 - place.distance) * 0.3;    // proximity

  // Mood-specific adjustments
  switch (mood) {
    case "work":
      // Quiet & productivity-friendly places
      if (place.type === "work" || place.type === "cafe") {
        score += 1.5;
      }
      if (place.openNow) {
        score += 0.5;
      }
      break;

    case "date":
      // Ambience & quality matter more
      score += place.rating * 0.3;
      if (place.type === "cafe" || place.type === "restaurant") {
        score += 1.0;
      }
      break;

    case "quick":
      // Speed & availability matter most
      if (!place.openNow) {
        score -= 5; // hard penalty
      }
      score += (5 - place.distance) * 1.0; // proximity dominates
      score += place.rating * 0.1;         // rating less important
      break;

    case "budget":
      // Cheaper places preferred
      score += (4 - place.priceLevel) * 0.6;
      break;

    default:
      break;
  }

  return Number(score.toFixed(2));
}