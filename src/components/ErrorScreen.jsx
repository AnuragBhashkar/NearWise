/**
 * ErrorScreen — shown when geolocation is unavailable or denied
 * @param {string}   message  - The error message to display
 * @param {Function} onRetry  - Callback to retry (e.g. reload the page)
 */
function ErrorScreen({ message, onRetry }) {
  return (
    <div className="error-screen" role="alert">
      <div className="error-card">
        <span className="error-icon" aria-hidden="true">📍</span>

        <h2 className="error-title">Location Unavailable</h2>

        <p className="error-message">{message}</p>

        <p className="error-hint">
          NearWise needs your location to discover nearby cafés and restaurants.
          Enable location access in your browser settings and try again.
        </p>

        {onRetry && (
          <button className="retry-btn" onClick={onRetry}>
            Try Again
          </button>
        )}
      </div>
    </div>
  );
}

export default ErrorScreen;
