import useGeolocation from "./hooks/useGeolocation";
import MapView from "./components/MapView";

function App() {
  const { location, error, loading } = useGeolocation();

  if (loading) {
    return <p>Getting your location...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>NearWise</h1>
      <MapView center={location} />
      <p>Latitude: {location.lat}</p>
      <p>Longitude: {location.lng}</p>
    </div>
  );
}

export default App;