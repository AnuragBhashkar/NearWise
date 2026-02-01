export function calculateScore(place, mood) {
  let score = 0;

  // Base signals (common for all moods)
  score += place.rating * 0.4;            // quality
  score += (5 - place.distance) * 0.3;    // proximity

  // Mood-specific intelligence
  switch (mood) {
    case "work":
      if (place.type === "work" || place.type === "cafe") {
        score += 1.5;
      }
      if (place.openNow) {
        score += 0.5;
      }
      break;

    case "date":
      score += place.rating * 0.3;
      if (place.type === "cafe" || place.type === "restaurant") {
        score += 1.0;
      }
      break;

    case "quick":
  // Hard penalty for closed places
  if (!place.openNow) {
    score -= 5;
  }

  // Nearest place matters most
  score += (5 - place.distance) * 1.0;

  // Rating is least important here
  score += place.rating * 0.1;
  break;

    case "budget":
      score += (4 - place.priceLevel) * 0.6;
      break;

    default:
      break;
  }

  return score;
}