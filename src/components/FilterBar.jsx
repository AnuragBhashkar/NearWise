/**
 * FilterBar — user-controlled filters for rating and distance
 * Filters are applied after mood-based intent visibility in App.jsx
 *
 * @param {number}   minRating     - Minimum acceptable rating (0 = any)
 * @param {Function} setMinRating  - State setter
 * @param {number}   maxDistance   - Maximum distance in km (5 = any)
 * @param {Function} setMaxDistance - State setter
 */
function FilterBar({ minRating, setMinRating, maxDistance, setMaxDistance }) {
  return (
    <div className="filter-bar" role="group" aria-label="Filter places">

      {/* Rating filter */}
      <div className="filter-group">
        <span className="filter-icon" aria-hidden="true">⭐</span>
        <label className="filter-label" htmlFor="filter-rating">Min Rating</label>
        <select
          id="filter-rating"
          className="filter-select"
          value={minRating}
          onChange={(e) => setMinRating(Number(e.target.value))}
        >
          <option value={0}>Any</option>
          <option value={3.5}>3.5+</option>
          <option value={4}>4.0+</option>
          <option value={4.5}>4.5+</option>
        </select>
      </div>

      {/* Distance filter */}
      <div className="filter-group">
        <span className="filter-icon" aria-hidden="true">📍</span>
        <label className="filter-label" htmlFor="filter-distance">Max Distance</label>
        <select
          id="filter-distance"
          className="filter-select"
          value={maxDistance}
          onChange={(e) => setMaxDistance(Number(e.target.value))}
        >
          <option value={5}>Any</option>
          <option value={1}>1 km</option>
          <option value={2}>2 km</option>
          <option value={3}>3 km</option>
        </select>
      </div>

    </div>
  );
}

export default FilterBar;