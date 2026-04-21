/**
 * LoadingScreen — shown while the browser Geolocation API is resolving
 * @param {string} message - Primary loading message
 * @param {string} subtext  - Secondary hint (e.g. browser permission prompt)
 */
function LoadingScreen({
  message = "Detecting your location…",
  subtext = "Allow location access when your browser asks",
}) {
  return (
    <div className="loading-screen" role="status" aria-live="polite">
      <div className="loading-logo" aria-hidden="true">🗺️</div>
      <div className="loading-spinner" aria-hidden="true" />
      <div className="loading-text">
        {message}
        {subtext && <div className="loading-subtext">{subtext}</div>}
      </div>
    </div>
  );
}

export default LoadingScreen;
