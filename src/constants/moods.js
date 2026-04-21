/**
 * moods.js — single source of truth for all mood definitions.
 *
 * Imported by MoodSelector (for rendering buttons), PlaceCard (for tags),
 * and usePlaces (for intent-based filtering logic).
 */

/**
 * @typedef {Object} Mood
 * @property {string} key   - Internal identifier used in state and logic
 * @property {string} emoji - Display emoji
 * @property {string} label - User-facing short label
 * @property {string} desc  - Brief description shown under the card
 * @property {string} tag   - Explainability tag shown on matched place cards
 */

/** @type {Mood[]} */
export const MOODS = [
  {
    key:   "work",
    emoji: "💼",
    label: "Work Mode",
    desc:  "Quiet & productive",
    tag:   "Best for Work",
  },
  {
    key:   "date",
    emoji: "🕯️",
    label: "Date Night",
    desc:  "Romantic & elegant",
    tag:   "Great for Date",
  },
  {
    key:   "quick",
    emoji: "⚡",
    label: "Quick Bite",
    desc:  "Fast & close by",
    tag:   "Quick Bite Nearby",
  },
  {
    key:   "budget",
    emoji: "💸",
    label: "Budget",
    desc:  "Easy on the wallet",
    tag:   "Budget Friendly",
  },
];

/**
 * Convenience map for O(1) lookups by key (e.g., MOODS_MAP["work"])
 * @type {Object.<string, Mood>}
 */
export const MOODS_MAP = Object.fromEntries(MOODS.map((m) => [m.key, m]));
