function FilterBar({ minRating, setMinRating, maxDistance, setMaxDistance }) {
  return (
    <div style={{ marginBottom: "20px" }}>
      <label style={{ marginRight: "20px" }}>
        ⭐ Min Rating:
        <select
          value={minRating}
          onChange={(e) => setMinRating(Number(e.target.value))}
          style={{ marginLeft: "8px" }}
        >
          <option value={0}>All</option>
          <option value={3.5}>3.5+</option>
          <option value={4}>4.0+</option>
          <option value={4.5}>4.5+</option>
        </select>
      </label>

      <label>
        📍 Max Distance:
        <select
          value={maxDistance}
          onChange={(e) => setMaxDistance(Number(e.target.value))}
          style={{ marginLeft: "8px" }}
        >
          <option value={5}>Any</option>
          <option value={1}>1 km</option>
          <option value={2}>2 km</option>
          <option value={3}>3 km</option>
        </select>
      </label>
    </div>
  );
}

export default FilterBar;