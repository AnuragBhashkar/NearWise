/**
 * Mock places — used as fallback when the Overpass API is unavailable.
 *
 * Each entry includes lat/lng so markers render correctly on the map
 * even in offline/demo mode. Coordinates are approximate and centred
 * around Connaught Place, New Delhi (a neutral Indian reference point).
 *
 * In production, live data is fetched from OpenStreetMap via fetchNearbyPlaces().
 */
const mockPlaces = [
  {
    id: "mock-1",
    name: "Café Aroma",
    rating: 4.5,
    distance: 1.2,
    priceLevel: 2,
    openNow: true,
    type: "cafe",
    lat: 28.6342,
    lng: 77.2193,
  },
  {
    id: "mock-2",
    name: "WorkHub Co-working Café",
    rating: 4.2,
    distance: 0.8,
    priceLevel: 3,
    openNow: true,
    type: "cafe",
    lat: 28.6330,
    lng: 77.2175,
  },
  {
    id: "mock-3",
    name: "Street Bites",
    rating: 3.8,
    distance: 0.5,
    priceLevel: 1,
    openNow: false,
    type: "fast_food",
    lat: 28.6360,
    lng: 77.2210,
  },
  {
    id: "mock-4",
    name: "The Grand Bistro",
    rating: 4.7,
    distance: 2.1,
    priceLevel: 3,
    openNow: true,
    type: "restaurant",
    lat: 28.6310,
    lng: 77.2240,
  },
  {
    id: "mock-5",
    name: "Budget Eats Corner",
    rating: 3.9,
    distance: 0.4,
    priceLevel: 1,
    openNow: true,
    type: "fast_food",
    lat: 28.6370,
    lng: 77.2155,
  },
  {
    id: "mock-6",
    name: "Rosé Café",
    rating: 4.6,
    distance: 1.7,
    priceLevel: 2,
    openNow: true,
    type: "cafe",
    lat: 28.6295,
    lng: 77.2220,
  },
];

export default mockPlaces;