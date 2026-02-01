function PlaceCard({ place, mood }) {
  const getTag = () => {
    if (mood === "work" && (place.type === "work" || place.type === "cafe")) {
      return "Best for Work";
    }
    if (mood === "date" && place.rating >= 4.5) {
      return "Great for Date";
    }
    if (mood === "quick" && place.distance <= 1) {
      return "Quick Bite Nearby";
    }
    if (mood === "budget" && place.priceLevel <= 2) {
      return "Budget Friendly";
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
        <div
          style={{
            display: "inline-block",
            backgroundColor: "#007bff",
            color: "white",
            padding: "4px 8px",
            borderRadius: "4px",
            fontSize: "12px",
            marginBottom: "6px",
          }}
        >
          {tag}
        </div>
      )}

      <p>⭐ Rating: {place.rating}</p>
      <p>📍 Distance: {place.distance} km</p>

      <div style={{ marginTop: "6px" }}>
        {place.openNow ? (
          <span style={{ color: "green", fontWeight: "bold" }}>Open</span>
        ) : (
          <span style={{ color: "red", fontWeight: "bold" }}>Closed</span>
        )}
      </div>
    </div>
  );
}

export default PlaceCard;