function MoodSelector({ mood, setMood }) {
  const moods = [
    { key: "work", label: "Work" },
    { key: "date", label: "Date" },
    { key: "quick", label: "Quick Bite" },
    { key: "budget", label: "Budget" },
  ];

  return (
    <div style={{ marginBottom: "20px" }}>
      {moods.map((m) => (
        <button
          key={m.key}
          onClick={() => setMood(m.key)}
          style={{
            marginRight: "10px",
            padding: "8px 14px",
            borderRadius: "6px",
            border: "1px solid #333",
            cursor: "pointer",
            backgroundColor: mood === m.key ? "#333" : "#fff",
            color: mood === m.key ? "#fff" : "#000",
            fontWeight: mood === m.key ? "bold" : "normal",
          }}
        >
          {m.label}
        </button>
      ))}
    </div>
  );
}

export default MoodSelector;