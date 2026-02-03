export async function fetchNearbyPlaces({ lat, lng }) {
  const query = `
    [out:json];
    (
      node["amenity"="restaurant"](around:2000,${lat},${lng});
      node["amenity"="cafe"](around:2000,${lat},${lng});
      node["amenity"="fast_food"](around:2000,${lat},${lng});
    );
    out body;
  `;

  const response = await fetch(
    "https://overpass-api.de/api/interpreter",
    {
      method: "POST",
      body: query,
    }
  );

  const data = await response.json();

  return data.elements.map((el) => ({
    id: el.id,
    name: el.tags.name || el.tags.amenity || "Nearby Place",
    lat: el.lat,
    lng: el.lon,
    rating: Math.floor(Math.random() * 2) + 3, // fake rating (honest)
    distance: Math.random() * 4,
    openNow: true,
    priceLevel: Math.floor(Math.random() * 3) + 1,
    type: el.tags.amenity,
  }));
}