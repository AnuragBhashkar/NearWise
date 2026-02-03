import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

function MapView({ location, places }) {
  // 🔒 Safety check: render map only if location is valid
  if (!location || !location.lat || !location.lng) {
    return null;
  }

  return (
    <MapContainer
      center={[location.lat, location.lng]}
      zoom={14}
      style={{
        height: "320px",
        width: "100%",
        borderRadius: "10px",
        overflow: "hidden",
        marginBottom: "20px",
      }}
    >
      <TileLayer
        attribution="© OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Render markers only for places with valid coordinates */}
      {places
        .filter((place) => place.lat && place.lng)
        .map((place) => (
          <Marker
            key={place.id}
            position={[place.lat, place.lng]}
          >
            <Popup>{place.name}</Popup>
          </Marker>
        ))}
    </MapContainer>
  );
}

export default MapView;