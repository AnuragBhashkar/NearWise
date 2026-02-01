import { GoogleMap, Marker, LoadScript } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

function MapView({ center }) {
  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={14}
      >
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
}

export default MapView;