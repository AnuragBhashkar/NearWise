import useGeolocation from "./hooks/useGeolocation";

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
      <p>Latitude: {location.lat}</p>
      <p>Longitude: {location.lng}</p>
    </div>
  );
}

export default App;