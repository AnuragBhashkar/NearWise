import { MOODS } from "../constants/moods";

/**
 * MoodSelector — lets the user pick a dining intent that drives ranking
 * @param {string}   mood    - Currently selected mood key
 * @param {Function} setMood - State setter for mood
 */
function MoodSelector({ mood, setMood }) {
  return (
    <div className="mood-grid" role="group" aria-label="Select your mood">
      {MOODS.map((m) => (
        <button
          key={m.key}
          className={`mood-card${mood === m.key ? " active" : ""}`}
          onClick={() => setMood(m.key)}
          aria-pressed={mood === m.key}
          title={m.tag}
        >
          <span className="mood-emoji" aria-hidden="true">{m.emoji}</span>
          <span className="mood-label">{m.label}</span>
          <span className="mood-desc">{m.desc}</span>
        </button>
      ))}
    </div>
  );
}

export default MoodSelector;