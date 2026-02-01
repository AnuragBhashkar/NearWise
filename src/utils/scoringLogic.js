export function calculateScore(place, mood) {
  let score = 0;

  score += place.rating * 0.4;
  score += (5 - place.distance) * 0.3;

  if (mood === "budget") {
    score += (4 - place.priceLevel) * 0.2;
  }

  if (place.openNow) {
    score += 0.1;
  }

  return score;
}