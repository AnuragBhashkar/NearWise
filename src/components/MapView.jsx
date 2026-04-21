import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

/**
 * MapView — renders an OpenStreetMap Leaflet map centred on the user's location
 * with markers for each ranked place (only places that have valid coordinates).
 *
 * Leaflet's default icon paths are fixed via fixLeafletIcon.js, which is
 * imported globally in src/index.js.
 *
 * @param {{ lat: number, lng: number }} location - User's geolocation
 * @param {Array}                        places   - Ranked places array
 */
function MapView({ location, places }) {
  // Safety guard: only render if location coords are valid
  if (!location?.lat || !location?.lng) return null;

  // Filter to places that have map coordinates (live OSM data always does;
  // mock data also has lat/lng after the Phase 2 fix)
  const mappablePlaces = places.filter((p) => p.lat && p.lng);

  return (
    <div className="map-wrapper" role="region" aria-label="Map of nearby places">
      <MapContainer
        center={[location.lat, location.lng]}
        zoom={14}
        scrollWheelZoom={false}
        style={{ height: "340px", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {mappablePlaces.map((place) => (
          <Marker key={place.id} position={[place.lat, place.lng]}>
            <Popup>
              <strong>{place.name}</strong>
              ⭐ {place.rating} · 📍 {place.distance.toFixed(1)} km · {place.openNow ? "Open" : "Closed"}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default MapView;