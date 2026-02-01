function PlaceCard({ place }) {
  return (
    <div>
      <h3>{place.name}</h3>
      <p>Rating: {place.rating}</p>
      <p>Distance: {place.distance} km</p>
      <p>{place.openNow ? "Open" : "Closed"}</p>
    </div>
  );
}

export default PlaceCard;