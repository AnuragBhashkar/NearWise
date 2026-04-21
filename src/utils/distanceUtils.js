/**
 * Haversine distance formula
 * Calculates the great-circle distance between two geographic coordinates.
 *
 * @param {number} lat1 - Latitude of point A (decimal degrees)
 * @param {number} lng1 - Longitude of point A (decimal degrees)
 * @param {number} lat2 - Latitude of point B (decimal degrees)
 * @param {number} lng2 - Longitude of point B (decimal degrees)
 * @returns {number} Distance in kilometres, rounded to 2 decimal places
 */
export function haversineDistance(lat1, lng1, lat2, lng2) {
  const R = 6371; // Earth's mean radius in km

  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return Number((R * c).toFixed(2));
}

/**
 * Converts decimal degrees to radians
 * @param {number} deg
 * @returns {number}
 */
function toRad(deg) {
  return deg * (Math.PI / 180);
}
