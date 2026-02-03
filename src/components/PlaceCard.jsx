function PlaceCard({ place, mood }) {
  const getTag = () => {
    switch (mood) {
      case "work":
        if (["work", "cafe"].includes(place.type)) {
          return "Best for Work";
        }
        break;

      case "date":
        if (place.rating >= 4.5) {
          return "Great for Date";
        }
        break;

      case "quick":
        if (place.distance <= 1) {
          return "Quick Bite Nearby";
        }
        break;

      case "budget":
        if (place.priceLevel <= 2) {
          return "Budget Friendly";
        }
        break;

      default:
        return null;
    }
    return null;
  };

  const tag = getTag();

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "12px",
        marginBottom: "10px",
        borderRadius: "6px",
        opacity: place.openNow ? 1 : 0.6,
      }}
    >
      <h3>{place.name}</h3>

      {tag && (
        <span
          style={{
            display: "inline-block",
            backgroundColor: "#007bff",
            color: "#fff",
            padding: "4px 8px",
            borderRadius: "4px",
            fontSize: "12px",
            marginBottom: "6px",
          }}
        >
          {tag}
        </span>
      )}

      <p>⭐ Rating: {place.rating}</p>
      <p>📍 Distance: {place.distance.toFixed(1)} km</p>

      <div style={{ marginTop: "8px", fontSize: "13px" }}>
  <strong>Why recommended?</strong>
  <ul>
    {place.rating >= 4 && <li>High rating</li>}
    {place.distance <= 2 && <li>Close to your location</li>}
    {place.openNow && <li>Currently open</li>}
    {tag && <li>Matches your "{mood}" mood</li>}
  </ul>
</div>

      <p style={{ fontWeight: "bold", color: place.openNow ? "green" : "red" }}>
        {place.openNow ? "Open" : "Closed"}
      </p>
    </div>
  );
}

export default PlaceCard;